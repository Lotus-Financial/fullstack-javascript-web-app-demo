const { expect } = require('chai');
const { assert, createSandbox } = require('sinon');

const faker = require('faker');

const errorTestingUtil = require('../../../helpers/errorTestingUtil');

const examplesController = require('../../../../api/controllers/examples/examples.controller.js');

const { createGizmoPOST, deleteGizmoDELETE, listGizmosGET, retrieveGizmoGET, updateGizmoPUT } = require('../../../../api/routes/examples/examples.router.js').callbacks;

const customErrors = require('../../../../api/helpers/errors/customErrors');

const sandbox = createSandbox();

describe('Unit Tests - examples.router', () => {
  let req;
  let res;
  let statusStub;
  let sendStub;

  const gizmo1 = {};
  const gizmo2 = {};
  const gizmo3 = {};
  const gizmos = [ gizmo1, gizmo2, gizmo3 ];

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {};
    sendStub = sandbox.stub();
    statusStub = sandbox.stub().returns(res);
    res.status = statusStub;
    res.send = sendStub;
    
    sandbox.stub(examplesController, 'listGizmos').resolves(gizmos);
    sandbox.stub(examplesController, 'createGizmo').returns(gizmo2);
    sandbox.stub(examplesController, 'updateGizmo').returns(gizmo3);
    sandbox.stub(examplesController, 'deleteGizmo').returns(gizmo1);

    sandbox.stub(customErrors, 'RequestIdValidationError').throws('IdValidationError');
    sandbox.stub(customErrors, 'RequestResourceValidationError').throws('ResourceValidationError');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('listGizmosGET', () => {
    describe('Success cases', () => {
      it('should call examplesController.listGizmos', async () => {
        await listGizmosGET(req, res);

        assert.calledOnce(examplesController.listGizmos);
      });

      it('should respond with a 200 status and the list of gizmos', async () => {
        await listGizmosGET(req, res);

        assert.calledWith(statusStub, 200);
        assert.calledWith(sendStub, gizmos);
      });
    });
  });

  describe('retrieveGizmoGET', () => {
    let gizmoId;

    beforeEach(() => {
      gizmoId = faker.random.number();
      req.params.id = gizmoId;

      sandbox.stub(examplesController, 'retrieveGizmo').returns(gizmo1);
    });

    describe('Success cases', () => {
      it('should call examplesController.retrieveGizmo with the correct args', async () => {
        await retrieveGizmoGET(req, res);
        
        assert.calledWith(examplesController.retrieveGizmo, gizmoId)
      });

      it('should respond with a 200 status and the retrieved gizmo', async () => {
        await retrieveGizmoGET(req, res);

        assert.calledWith(statusStub, 200);
        assert.calledWith(sendStub, gizmo1);
      });
    });

    describe('Failure cases', () => {
      const invalidGizmoId = null;

      beforeEach(() => {
        req.params.id = invalidGizmoId;
      });

      it('should throw RequestIdValidationError when gizmo id is invalid', async () => {
        const error = await errorTestingUtil(retrieveGizmoGET, req, res);

        expect(error.name).to.equal('IdValidationError');
      });

      it('should create a new instance of RequestIdValidationError with the correct arguments when gizmo id is invalid', async () => {
        await errorTestingUtil(retrieveGizmoGET, req, res);

        assert.calledWith(customErrors.RequestIdValidationError, 'gizmo', invalidGizmoId);
      });
    });
  });
 
  describe('createGizmoPOST', () => {
    describe('Success cases', () => {
      let goodGizmoToCreate;
      beforeEach(() => {
        goodGizmoToCreate = {
          name: faker.random.word(),
          type: faker.random.word()
        }

        req.body.data = goodGizmoToCreate;
      });

      it('should call examplesController.createGizmo with the correct args', async () => {
        await createGizmoPOST(req, res);

        assert.calledWith(examplesController.createGizmo, goodGizmoToCreate);
      });
      
      it('should respond with a 201 status and the created gizmo', async () => {
        await createGizmoPOST(req, res);

        assert.calledWith(statusStub, 201);
        assert.calledWith(sendStub, gizmo2);
      });
    });

    describe('Failure cases', () => {
      let badGizmoToCreate;

      beforeEach(() => {
        badGizmoToCreate = {
          name: faker.random.number(),
        };

        req.body.data = badGizmoToCreate;
      });

      it('should throw RequestResourceValidationError when gizmo create data is invalid', async () => {
        const error = await errorTestingUtil(createGizmoPOST, req, res);

        expect(error.name).to.equal('ResourceValidationError');
      });

      it('should create a new instance of RequestResourceValidationError with the correct arguments when gizmo create data is invalid', async () => {
        await errorTestingUtil(createGizmoPOST, req, res);
        
        assert.calledWith(customErrors.RequestResourceValidationError, 'gizmo', '"name" must be a string');
      });
    });
  });

  describe('updateGizmoPUT', () => {
    let gizmoId;

    beforeEach(() => {
      gizmoId = faker.random.number();

      req.params.id = gizmoId;
    });

    describe('Success cases', () => {
      let gizmoUpdateData;

      beforeEach(() => {
        gizmoId = faker.random.number();
        gizmoUpdateData = {
          name: faker.random.word(),
          type: faker.random.word()
        };

        req.params.id = gizmoId;
        req.body.data = gizmoUpdateData;
      });

      it('should call examplesController.updateGizmo with the correct args', async () => {
        await updateGizmoPUT(req, res);

        assert.calledWith(examplesController.updateGizmo, gizmoId, gizmoUpdateData);
      });

      it('should respond with a 200 status and the updated gizmo', async () => {
        await updateGizmoPUT(req, res);

        assert.calledWith(statusStub, 200);
        assert.calledWith(sendStub, gizmo3);
      });
    });

    describe('Failure cases', () => {
      let badGizmoUpdateData;

      beforeEach(() => {
        badGizmoUpdateData = {
          name: faker.random.word(),
          type: faker.random.number()
        };

        req.body.data = badGizmoUpdateData;
      });

      it('should throw RequestIdValidationError when gizmo id is invalid', async () => {
        req.params.id = null;
        const error = await errorTestingUtil(updateGizmoPUT, req, res);

        expect(error.name).to.equal('IdValidationError');
      });

      it('should create a new instance of RequestIdValidationError with the correct arguments when gizmo id is invalid', async () => {
        const invalidGizmoId = null;
        req.params.id = invalidGizmoId;
        await errorTestingUtil(updateGizmoPUT, req, res);

        assert.calledWith(customErrors.RequestIdValidationError, 'gizmo', invalidGizmoId);
      });

      it('should throw RequestResourceValidationError when gizmo update data is invalid', async () => {
        const error = await errorTestingUtil(updateGizmoPUT, req, res);

        expect(error.name).to.equal('ResourceValidationError');
      });

      it('should create a new instance of RequestResourceValidationError with the correct arguments when gizmo update data is invalid', async () => {
        await errorTestingUtil(updateGizmoPUT, req, res);

        assert.calledWith(customErrors.RequestResourceValidationError, 'gizmo', '"type" must be a string');
      });
    });
  });

  describe('deleteGizmoDELETE', () => {
    describe('Success cases', () => {
      let gizmoId;

      beforeEach(() => {
        gizmoId = faker.random.number();
        req.params.id = gizmoId;
      });

      it('should call examplesController.deleteGizmo with the correct args', async () => {
        await deleteGizmoDELETE(req, res);

        assert.calledWith(examplesController.deleteGizmo, gizmoId);
      });

      it('should respond with a 200 status and the deleted gizmo', async () => {
        await deleteGizmoDELETE(req, res);

        assert.calledWith(statusStub, 200);
        assert.calledWith(sendStub, gizmo1);
      });
    });

    describe('Failure cases', () => {
      let invalidGizmoId;

      beforeEach(() => {
        invalidGizmoId = faker.random.word();
        req.params.id = invalidGizmoId;
      });

      it('should throw RequestIdValidationError when gizmo id is invalid', async () => {
        const error = await errorTestingUtil(deleteGizmoDELETE, req, res);

        expect(error.name).to.equal('IdValidationError');
      });

      it('should create a new instance of RequestIdValidationError with the correct arguments when gizmo id is invalid', async () => {
        await errorTestingUtil(deleteGizmoDELETE, req, res);

        assert.calledWith(customErrors.RequestIdValidationError, 'gizmo', invalidGizmoId);
      });
    });
  });
});
