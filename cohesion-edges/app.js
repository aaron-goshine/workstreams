const AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
  let params = {
    TableName: process.env.WORK_STREAMS_TABLE
  };

  let error;
  await ddb.scan(params)
    .promise()
    .then(async function (data) {
      console.log('Retrieved state from DynamoDB');
      let links = {};
      let uniquePlayers = {};
      data.Items.forEach(function (item) {
        let jsonItem = JSON.parse(item.value.S);
        let players = jsonItem.usersConfig;
        let discardedIndex = jsonItem.streamConfig.findIndex(function (stream) {
          return stream.title === 'OFF';
        });

        for (var i = 0; i < players.length; i++) {
          uniquePlayers[players[i].id] = players[i];
          for (var j = i + 1; j < players.length; j++) {
            let s1 = players[i].currentPosition.split(',')[1];
            let s2 = players[j].currentPosition.split(',')[1];
            if (discardedIndex === s1 || discardedIndex === s2) {
              continue;
            }

            if (s1 === s2) {
              let uniqueId = players[i].id + '-' + players[j].id;
              if (links[uniqueId]) {
                links[uniqueId].weight++;
              } else {
                links[uniqueId] = {
                  linksId: uniqueId,
                  source: players[i].id,
                  target: players[j].id,
                  weight: 1
                };
              }
            }
          }
        }
      });

      var value = { S: JSON.stringify({ players: uniquePlayers, links: links }) };
      await ddb.putItem({
        TableName: process.env.WORK_STREAMS_STATS_TABLE,
        Item: { linkId: { S: 'latest' }, value: value }
      }).promise();
    })
    .catch(function (err) {
      console.error('Retrieving state from DynamoDB', err);
      error = err;
    });

  if (error) {
    return {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: `{"message": ${error}}`
    };
  } else {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: `{}`
    };
  }
};
