var AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
var ssm = new AWS.SSM();

const tableName = process.env.WORK_STREAMS_TABLE;
exports.handler = async (event) => {
  const ssmObject = await ssm.getParameter({ Name: 'workstreamsParameters' })
    .promise();

  if (ssmObject.Parameter.Value !== event.headers['x-magic-key']) {
    return {
      statusCode: 403,
      body: 'you need magic to do that'
    };
  }
  let lastState;
  await ddb.getItem({
    Key: { state: { S: 'latest' } },
    TableName: tableName
  }).promise()
    .then(async function (data) {
      console.log('Retrieved state from DynamoDB');
      if (data && data.Item) {
        lastState = data.Item.value.S;
        let d = new Date();
        await ddb.putItem({
          TableName: tableName,
          Item: { state: {
            S: String((d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear()) },
          value: { S: lastState }
          }
        }).promise();
      }
    })
    .catch(function (err) {
      console.error('Retrieving state from DynamoDB', err);
    });

  // re insert the new state as latest
  await ddb.putItem({
    TableName: tableName,
    Item: { state: { S: 'latest' }, value: { S: event.body } }
  }).promise();

  const response = {
    statusCode: 200,
    body: event.state
  };

  return response;
};
