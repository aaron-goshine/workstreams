const AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
  let params = {
    Key: { linkId: { S: 'latest' } },
    TableName: process.env.WORK_STREAMS_STATS_TABLE
  };

  let item = {};
  await ddb.getItem(params)
    .promise()
    .then(function (data) {
      console.log('Retrieved state from DynamoDB');

      item = {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: data.Item.value.S
      };
    })
    .catch(function (err) {
      console.error('Retrieving state from DynamoDB', err);
      item = {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.parse(err)
      };
    });
  return item;
};
