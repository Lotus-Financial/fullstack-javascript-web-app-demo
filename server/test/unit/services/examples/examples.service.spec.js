const { assert, createSandbox } = require('sinon');
const { expect } = require('chai');

const db = require('../../../../db/models');
const Gizmo = db.Gizmo;
const customErrors = require('../../../../api/helpers/errors/customErrors');
const examplesService = require('../../../../api/services/examples/examples.service');

const sandbox = createSandbox();

describe('Unit Tests - examples.service', () => {
  const gizmo1 = { id: 1 };
  gizmo1.get = () => gizmo1;
  const gizmo2 = { id: 2 };
  gizmo2.get = () => gizmo2;
  const gizmo3 = { id: 3};
  gizmo3.get = () => gizmo3;
  const gizmos = [ gizmo1, gizmo2, gizmo3 ];

  afterEach(() => {
    sandbox.restore();
  });

  describe('examples.service.listGizmos', () => {
    let findAllStub;

    beforeEach(() => {
      findAllStub = sandbox.stub(Gizmo, 'findAll').resolves(gizmos);
    });
  

    it('should call Gizmo.findAll once', async () => {
      await examplesService.listGizmos();

      assert.calledOnce(Gizmo.findAll);
    });

    it('should resolve with the list of retrieved gizmos', async () => {
      const retrievedGizmos = await examplesService.listGizmos();
      
      expect(retrievedGizmos).to.deep.equal(gizmos);
    });
  });

  describe('examples.service.retrieveGizmo', () => {
    beforeEach(() => {
      sandbox.stub(customErrors, 'NotFoundError').throws('NotFound');
    });

    describe('Success cases', () => {
      beforeEach(() => {
        sandbox.stub(Gizmo, 'findByPk').resolves(gizmo1);
      });

      it('should call Gizmo.findByPk with the correct args', async () => {
        await examplesService.retrieveGizmo(gizmo1.id);
  
        assert.calledWith(Gizmo.findByPk, gizmo1.id);
      });  

      it('should resolve with the retrieved gizmo', async () => {
        const retrievedGizmo = await examplesService.retrieveGizmo(gizmo1.id);
  
        expect(retrievedGizmo).to.deep.equal(gizmo1);
      });
    });

    describe('Failure cases', () => {
      beforeEach(() => {
        sandbox.stub(Gizmo, 'findByPk').resolves(null);
      });

      it('should throw an error when no gizmo is found', async () => {
        try {
          await examplesService.retrieveGizmo(gizmo1.id);
        } catch (e) {
          expect(e).to.be.instanceOf(Error);
          expect(e.name).to.equal('NotFound');
        }
      });

      it('should create a new instance of NotFoundError with the correct arguments when no gizmo is found', async () => {
        try {
          await examplesService.retrieveGizmo(gizmo1.id);
        } catch (e) {
          assert.calledWith(customErrors.NotFoundError, 'Gizmo', gizmo1.id);
        }
      });
    });
  });

  describe('examples.service.createGizmo', () => {
    describe('Success cases', () => {
    
    });

    describe('Failure cases', () => {
    
    });
  });
});
