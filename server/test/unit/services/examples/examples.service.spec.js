const { assert, createSandbox } = require('sinon');
const { expect } = require('chai');

const db = require('../../../../db/models');
const Gizmo = db.Gizmo;
const examplesService = require('../../../../services/examples/examples.service');

const sandbox = createSandbox();

describe('Unit Tests - examples.service', () => {
  const gizmo1 = {};
  gizmo1.get = () => gizmo1;
  const gizmo2 = {};
  gizmo2.get = () => gizmo2;
  const gizmo3 = {};
  gizmo3.get = () => gizmo3;
  const gizmos = [ gizmo1, gizmo2, gizmo3 ];

  let findAllStub;

  beforeEach(() => {
    findAllStub = sandbox.stub(Gizmo, 'findAll').resolves(gizmos);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('examples.service.listGizmos', () => {
    it('should call Gizmo.findAll once', async () => {
      await examplesService.listGizmos();
      assert.calledOnce(Gizmo.findAll);
    });

    it('should resolve with the list of retrieved gizmos', async () => {
      const retrievedGizmos = await examplesService.listGizmos();
      
      expect(retrievedGizmos).to.deep.equal(gizmos);
    });
  });


});
