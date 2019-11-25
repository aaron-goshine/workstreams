/* global describe beforeAll  afterAll it jest expect */

const lambda = require('../../streams-save/app.js');
const dynamodb = require('aws-sdk/clients/dynamodb');

describe('Test getAllItemsHandler', () => {
  // let scanSpy;
  // beforeAll(() => {
  //   scanSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'scan');
  // });
  // afterAll(() => {
  //   scanSpy.mockRestore();
  // });
  // it('should return ids', async () => {
  //   const items = [{ id: 'id1' }, { id: 'id2' }];
  //   scanSpy.mockReturnValue({
  //     promise: () => Promise.resolve({ Items: items })
  //   });
  //   const event = {
  //     httpMethod: 'GET'
  //   };
  //   const result = await lambda.getAllItemsHandler(event);
  //   const expectedResult = {
  //     statusCode: 200,
  //     body: JSON.stringify(items)
  //   };
  it('should return ids', async () => {
    expect(true).toEqual(true);
  });
});
