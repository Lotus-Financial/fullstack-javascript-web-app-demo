const { expect } = require('chai');
const { assert, createSandbox } = require('sinon');

const faker = require('faker');

const examplesController = require('../../../../api/controllers/examples/examples.controller.js');

const { createGizmoPOST, deleteGizmoDELETE, listGizmosGET, retrieveGizmoGET, updateGizmoPUT } = require('../../../../api/routes/examples/examples.router.js').callbacks;

const customErrors = require('../../../../api/helpers/errors/customErrors');

const sandbox = createSandbox();

describe('Unit Tests - examples.router', () => {
  let req;
  let res;
  let nextStub;
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
    beforeEach(() => {
      sandbox.stub(examplesController, 'retrieveGizmo').returns(gizmo1);
    })

    describe('Success cases', () => {
      it('should call examplesController.retrieveGizmo with the correct args', async () => {
        const gizmoId = 1;
        req.params.id = gizmoId;
        await retrieveGizmoGET(req, res);
        
        assert.calledWith(examplesController.retrieveGizmo, gizmoId)
      });

      it('should respond with a 200 status and the retrieved gizmo', async () => {
        const gizmoId = 1;
        req.params.id = gizmoId;
        await retrieveGizmoGET(req, res);

        assert.calledWith(statusStub, 200);
        assert.calledWith(sendStub, gizmo1);
      });
    });

    describe('Failure cases', () => {
      it('should throw RequestIdValidationError when gizmo id is invalid', async () => {
        const invalidGizmoId = null;
        req.params.id = invalidGizmoId;

        try {
          await retrieveGizmoGET(req, res);
        } catch (e) {
          expect(e.name).to.equal('IdValidationError');
        }
      });

      it('should create a new instance of RequestIdValidationError with the correct arguments when gizmo id is invalid', async () => {
        const invalidGizmoId = null;
        req.params.id = invalidGizmoId;

        try {
          await retrieveGizmoGET(req, res, nextStub);
        } catch (e) {
          assert.calledWith(customErrors.RequestIdValidationError, 'gizmo', invalidGizmoId);
        }
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

      it('should throw RequestResourceValidationError when gizmo data is invalid', async () => {
        try {
          await createGizmoPOST(req, res);
        } catch (e) {
          expect(e.name).to.equal('ResourceValidationError');
        }
      });

      it('should create a new instance of RequestResourceValidationError with the correct arguments when gizmo data is invalid', async () => {
        try {
          await createGizmoPOST(req, res, nextStub);
        } catch (e) {
          assert.calledWith(customErrors.RequestResourceValidationError, 'gizmo', '"name" must be a string');
        }
      });
    });
  });

  describe('updateGizmoPUT', () => {
    describe('Success cases', () => {
      it('should call examplesController.updateGizmo with the correct args', async () => {
        const gizmoToUpdate = {};
        req.body.data = gizmoToUpdate;
        await updateGizmoPUT(req, res);

        assert.calledWith(examplesController.updateGizmo, gizmoToUpdate);
      });

      it('should respond with a 200 status and the updated gizmo', async () => {
        await updateGizmoPUT(req, res);

        assert.calledWith(statusStub, 200);
        assert.calledWith(sendStub, gizmo3);
      });
    });
  });

  describe('deleteGizmoDELETE', () => {
    describe('Success cases', () => {
      it('should call examplesController.updateGizmo with the correct args', async () => {
        const gizmoToDeleteId = 1;
        req.params.id = gizmoToDeleteId;
        await deleteGizmoDELETE(req, res);

        assert.calledWith(examplesController.deleteGizmo, gizmoToDeleteId);
      });

      it('should respond with a 200 status and the updated gizmo', async () => {
        await deleteGizmoDELETE(req, res);

        assert.calledWith(statusStub, 200);
        assert.calledWith(sendStub, gizmo1);
      });
    });
  });
});
