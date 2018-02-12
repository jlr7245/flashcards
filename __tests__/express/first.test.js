const request = require('supertest');

const app = require('../../server');

describe('my new api', () => {
  it('hello test', async () => {
    const req = await request(app).get('/')
    expect(req.status).toEqual(200)
    expect(typeof req.text).toBe('string')
    expect(req.text).toBe('Hello WOrld!')
  })
})
