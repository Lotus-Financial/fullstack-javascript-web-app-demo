import sinon from 'sinon';

import { healthcheckGET } from '../../../../routes/healthcheck/healthcheck.router.js';

const { assert, createSandbox } = sinon;

const sandbox = createSandbox();

describe('Unit Tests - healthcheck.router', () => {
  describe('Success cases', () => {
    let req;
    let res;
    let sendStub;

    beforeEach(() => {
      req = {};
      res = {};
      sendStub = sandbox.stub();
      
      res.send = sendStub;
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return the string "Blue Skies Core is UP!"', () => {
      healthcheckGET(req, res);

      assert.calledOnce(sendStub);
      assert.calledWith(sendStub, 'Blue Skies Core is UP!');
    });
  });
});
