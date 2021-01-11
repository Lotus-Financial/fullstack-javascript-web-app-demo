const { assert, createSandbox } = require('sinon');

const examplesController = require('../../../../controllers/examples/examples.controller.js');

const { createGizmoPOST, deleteGizmoDELETE, listGizmosGET, retrieveGizmoGET, updateGizmoPUT } = require('../../../../routes/examples/examples.router.js').callbacks;

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
    sandbox.stub(examplesController, 'retrieveGizmo').returns(gizmo1);
    sandbox.stub(examplesController, 'createGizmo').returns(gizmo2);
    sandbox.stub(examplesController, 'updateGizmo').returns(gizmo3);
    sandbox.stub(examplesController, 'deleteGizmo').returns(gizmo1);
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
    describe('Success cases', () => {
      it('should call examplesController.retrieveGizmo with the correct args', () => {
        const gizmoName = 'Drone'
        req.params.name = gizmoName;
        retrieveGizmoGET(req, res);
        
        assert.calledWith(examplesController.retrieveGizmo, gizmoName)
      });

      it('should respond with a 200 status and the retrieved gizmo', () => {
        retrieveGizmoGET(req, res);

        assert.calledWith(statusStub, 200);
        assert.calledWith(sendStub, gizmo1);
      });
    });
  });
 
  describe('createGizmoPOST', () => {
    describe('Success cases', () => {
      it('should call examplesController.createGizmo with the correct args', () => {
        const gizmoToCreate = {};
        req.body.data = gizmoToCreate;
        createGizmoPOST(req, res);

        assert.calledWith(examplesController.createGizmo, gizmoToCreate);
      });
      
      it('should respond with a 201 status and the created gizmo', () => {
        createGizmoPOST(req, res);

        assert.calledWith(statusStub, 201);
        assert.calledWith(sendStub, gizmo2);
      });
    });
  });

  describe('updateGizmoPUT', () => {
    describe('Success cases', () => {
      it('should call examplesController.updateGizmo with the correct args', () => {
        const gizmoToUpdate = {};
        req.body.data = gizmoToUpdate;
        updateGizmoPUT(req, res);

        assert.calledWith(examplesController.updateGizmo, gizmoToUpdate);
      });

      it('should respond with a 200 status and the updated gizmo', () => {
        updateGizmoPUT(req, res);

        assert.calledWith(statusStub, 200);
        assert.calledWith(sendStub, gizmo3);
      });
    });
  });

  describe('deleteGizmoDELETE', () => {
    describe('Success cases', () => {
      it('should call examplesController.updateGizmo with the correct args', () => {
        const gizmoToDelete = 'Virtual Reality Headset';
        req.params.name = gizmoToDelete;
        deleteGizmoDELETE(req, res);

        assert.calledWith(examplesController.deleteGizmo, gizmoToDelete);
      });

      it('should respond with a 200 status and the updated gizmo', () => {
        deleteGizmoDELETE(req, res);

        assert.calledWith(statusStub, 200);
        assert.calledWith(sendStub, gizmo1);
      });
    });
  });
});
