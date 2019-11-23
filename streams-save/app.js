var AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const tableName = process.env.WORK_STREAMS_TABLE;

exports.handler = async (event) => {
  let lastState;
  await ddb.getItem({
    Key: { state: { S: 'latest' } },
    TableName: tableName
  })
    .promise()
    .then(async function (data) {
      console.log('data', data);
      console.log('Retrieved state from DynamoDB');
      if (data && data.Item) {
        lastState = data.Item.value.S;
        // re insert the lastState with a time stamp
        await ddb.putItem({
          TableName: tableName,
          Item: { state: { S: String(Date.now()) }, value: { S: lastState } }
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
    body: event.body
  };

  return response;
};
