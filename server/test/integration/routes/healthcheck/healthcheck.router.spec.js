import request from 'supertest';

import app from '../../../../index.js';

describe('Integration Tests - healthcheck.router', () => {
  describe('Success cases', () => {
    it('should return the string "Blue Skies Core is UP!"', async () => {
      await request(app)
        .get('/healthcheck')
        .expect(200, 'Blue Skies Core is UP!')
    });
  });
});
