var AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });

exports.handler = async (event) => {
  var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

  let params = {
    Key: { state: { S: 'latest' } },
    TableName: process.env.WORK_STREAMS_TABLE
  };

  let body = { 'message': 'nothing for you ' };
  await ddb.getItem(params)
    .promise()
    .then(function (data) {
      console.log('Retrieved state from DynamoDB');
      console.log(data.Item.value.S);
      body = JSON.parse(data.Item.value.S);
    })
    .catch(function (err) {
      console.error('Retrieving state from DynamoDB', err);
      body = err;
    });

  const response = {
    headers: { 'Content-Type': 'application/json' },
    statusCode: 200,
    body: JSON.stringify(body)
  };

  return response;
};
