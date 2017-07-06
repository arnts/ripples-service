import * as supertest from 'supertest'
import app from './app'

describe('App', () => {
    it('works', () =>
        supertest(app)
            .get('/api/v1/ping')
            .expect('Content-Type', /json/)
            .expect(200)
    )
})