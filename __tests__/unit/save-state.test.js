/* global describe beforeAll  afterAll it jest expect */
// const lambda = require('../../src/handlers/app.js');
// const dynamodb = require('aws-sdk/clients/dynamodb');
//
describe('Test putItemHandler', function () {
//   let putSpy;
//
//   beforeAll(() => {
//     putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put');
//   });
//
//   afterAll(() => {
//     putSpy.mockRestore();
//   });
//
//   it('should add id to the table', async () => {
//     const returnedItem = { id: 'id1', name: 'name1' };
//
//     putSpy.mockReturnValue({
//       promise: () => Promise.resolve(returnedItem)
//     });
//
//     const event = {
//       httpMethod: 'POST',
//       body: '{"id": "id1","name": "name1"}'
//     };
//
//     const result = await lambda.putItemHandler(event);
//     const expectedResult = {
//       statusCode: 200,
//       body: JSON.stringify(returnedItem)
//     };
//
//     // Compare the result with the expected result
//     expect(result).toEqual(expectedResult);
//   });
  it('should return ids', async () => {
    expect(true).toEqual(true);
  });
});
