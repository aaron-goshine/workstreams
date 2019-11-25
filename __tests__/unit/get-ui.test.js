/* global describe it expect */
const lambda = require('../../streams-ui/app.js');

describe('Test getByIdHandler', () => {
  it('should get item by id', async () => {
    let event = {};
    const result = await lambda.handler(event);
    expect(result.body).toEqual(expect.stringContaining('<!DOCTYPE html>'));
  });
});
