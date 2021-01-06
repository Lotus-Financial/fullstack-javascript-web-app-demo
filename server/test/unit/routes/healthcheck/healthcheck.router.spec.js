import chai from 'chai';
import sinon from 'sinon';
import express from 'express';

import healthcheckRouter from '../../../../routes/healthcheck/healthcheck.router';

const { expect } = chai;
const { createSandbox, stub } = sinon;

const sandbox = createSandbox();

describe(' Unit Tests - healthcheck.router', () => {
  describe('Success cases', () => {
    beforeEach(() => {
      const routerStub = stub(express, 'Router');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return the string "Blue Skies Core is UP!"', () => {
      
    });
  });
});
