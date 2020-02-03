const AWS = require('aws-sdk');
  var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
  if (process.env.AWS_SAM_LOCAL) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: `{ "time": "00:30:00", "status": 'inactive', 'id': '001'}`
    };
  }


  if (event.pathParameters && event.pathParameters.targetId) {
    let item = {};
    let params = {
      Key: { target: { S: event.pathParameters.targetId } },
      TableName: process.env.DIFFUSER_TABLE
    };

    await ddb.getItem(params)
      .promise()
      .then(function (data) {
        console.log('Retrieved state from DynamoDB');
        console.log(data);
        item = data.Item;
      })
      .catch(function (err) {
        console.error('Retrieving state from DynamoDB', err);
        item = err;
      });

    if (item.targetDate) {
      var formattedDate = displayFormatter(
        item.targetDate.S,
        parseInt(item.duration.S),
        (item.ticking.S === 'true')
      );

      var status = '';
      if (item.ticking.S === 'true' && formattedDate === '00:00:00') {
        status = 'inactive';
      } else if (item.ticking.S === 'true' && formattedDate !== '00:00:00') {
        status = 'active';
      } else if (item.ticking.S === 'false') {
        status = 'frozen';
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: `{
        "time": "${formattedDate}",
        "id": "${item.target.S}",
        "status": "${status}"
      }`
      };
    }

    return {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: `{ "time": "", "active": false}`
    };
  }

  let params = {
    ExpressionAttributeValues: {
      ':t': { S: 'target' }
    },
    FilterExpression: 'begins_with(target, :t)',
    TableName: process.env.DIFFUSER_TABLE
  };
  let returnItems = [];
  let error;
  await ddb.scan(params)
    .promise()
    .then(function (data) {
      console.log('Retrieved state from DynamoDB');
      console.log(data);
      data.Items.forEach(function (item) {
        var formattedDate = displayFormatter(
          item.targetDate.S,
          parseInt(item.duration.S),
          (item.ticking.S === 'true')
        );

        var status = '';
        if (item.ticking.S === 'true' && formattedDate === '00:00:00') {
          status = 'inactive';
        } else if (item.ticking.S === 'true' && formattedDate !== '00:00:00') {
          status = 'active';
        } else if (item.ticking.S === 'false') {
          status = 'frozen';
        }

        returnItems.push({
          'name': item.name.S,
          'time': formattedDate,
          'status': status,
          'id': item.target.S
        });
      });
    })
    .catch(function (err) {
      console.error('Retrieving state from DynamoDB', err);
      error = err;
    });

  if (error) {
    return {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: `{ "time": "00:00:00", "status": "inactive"}`
    };
  } else {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(returnItems)
    };
  }
};
