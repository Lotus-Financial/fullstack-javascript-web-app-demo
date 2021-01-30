const { assert, createSandbox } = require('sinon');
const { expect } = require('chai');

const faker = require('faker');

const errorTestingUtil = require('../../../helpers/errorTestingUtil');

const db = require('../../../../db/models');
const Gizmo = db.Gizmo;
const customErrors = require('../../../../api/helpers/errors/customErrors');
const examplesService = require('../../../../api/services/examples/examples.service');

const sandbox = createSandbox();

describe('Unit Tests - examples.service', () => {
  const gizmo1 = { id: 1 };
  gizmo1.get = sandbox.stub().returnsThis();
  const gizmo2 = { id: 2 };
  gizmo2.get = sandbox.stub().returnsThis();
  const gizmo3 = { id: 3};
  gizmo3.get = sandbox.stub().returnsThis();
  const gizmos = [ gizmo1, gizmo2, gizmo3 ];

  beforeEach(() => {
    sandbox.stub(customErrors, 'NotFoundError').throws('NotFound');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('examples.service.listGizmos', () => {
    beforeEach(() => {
      sandbox.stub(Gizmo, 'findAll').resolves(gizmos);
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
        const error = await errorTestingUtil(examplesService.retrieveGizmo, gizmo1.id);

        expect(error.name).to.equal('NotFound');
      });

      it('should create a new instance of NotFoundError with the correct arguments when no gizmo is found', async () => {
        await errorTestingUtil(examplesService.retrieveGizmo, gizmo1.id);

        assert.calledWith(customErrors.NotFoundError, 'Gizmo', gizmo1.id);
      });
    });
  });

  describe('examples.service.createGizmo', () => {
    let gizmo;

    beforeEach(() => {
      gizmo = { id: faker.random.number(), name: faker.random.word(), type: faker.random.word() };
      sandbox.stub(Gizmo, 'create').resolves(gizmo);
    });

    describe('Success cases', () => {
      it('should call Gizmo.create with the correct args', async () => {
        await examplesService.createGizmo(gizmo);

        assert.calledWith(Gizmo.create, gizmo);
      });

      it('should return the created gizmo', async () => {
        const createdGizmo = await examplesService.createGizmo(gizmo);

        expect(createdGizmo).to.deep.equal(gizmo);
      });
    });
  });
  
  describe('examples.service.updateGizmo', () => {
    let gizmoUpdates;
    let updatedGizmo;

    beforeEach(() => {
      gizmoUpdates = { name: faker.random.word(), type: faker.random.word() };
      updatedGizmo = { ...gizmoUpdates, id: faker.random.number() }

      updatedGizmo.get = sandbox.stub().resolvesThis();
      gizmoUpdates.update = sandbox.stub().resolves(updatedGizmo);

      sandbox.stub(Gizmo, 'update').resolves(updatedGizmo);
    });

    describe('Success cases', () => {
      beforeEach(() => {
        sandbox.stub(Gizmo, 'findByPk').resolves(gizmoUpdates);
      });

      it('should call Gizmo.findByPk with the correct args', async () => {
        await examplesService.updateGizmo(gizmo1.id, gizmoUpdates);
  
        assert.calledWith(Gizmo.findByPk, gizmo1.id);
      });

      it('should call update on the found gizmo with the correct args', async () => {
        await examplesService.updateGizmo(gizmo1.id, gizmoUpdates);

        assert.calledWith(gizmoUpdates.update, gizmoUpdates);
      });

      it('should resolve with the updated gizmo', async () => {
        const testGizmo = await examplesService.updateGizmo(gizmo1.id);
  
        expect(testGizmo).to.deep.equal(updatedGizmo);
      });
    });

    describe('Failure cases', () => {
      beforeEach(() => {
        sandbox.stub(Gizmo, 'findByPk').resolves(null);
      });

      it('should throw an error when no gizmo is found', async () => {
        const error = await errorTestingUtil(examplesService.updateGizmo, gizmo1.id, gizmoUpdates);

        expect(error.name).to.equal('NotFound');
      });

      it('should create a new instance of NotFoundError with the correct arguments when no gizmo is found', async () => {
        await errorTestingUtil(examplesService.updateGizmo, gizmo1.id, gizmoUpdates);

        assert.calledWith(customErrors.NotFoundError, 'Gizmo', gizmo1.id);
      });
    });
  });

  describe('examples.service.deleteGizmo', () => {
    let gizmoToDelete;

    beforeEach(() => {
      gizmoToDelete = { destroy: sandbox.stub() };
    });

    describe('Success cases', () => {
      it('should call Gizmo.findByPk with the correct args', async () => {
        sandbox.stub(Gizmo, 'findByPk').resolves(gizmoToDelete);

        await examplesService.deleteGizmo(gizmo1.id);
  
        assert.calledWith(Gizmo.findByPk, gizmo1.id);
      });

      it('should call Gizmo.destroy', async () => {
        sandbox.stub(Gizmo, 'findByPk').resolves(gizmoToDelete);

        await examplesService.deleteGizmo(gizmo1.id);

        assert.calledOnce(gizmoToDelete.destroy);
      })

      it('should return "No gizmo found." if no gizmo is found in database', async () => {
        sandbox.stub(Gizmo, 'findByPk').resolves(null);

        const message = await examplesService.deleteGizmo(gizmo1.id);

        expect(message).to.equal('No gizmo found to delete.');
      });

      it('should resolve with "Gizmo deleted." if gizmo has been deleted', async () => {
        sandbox.stub(Gizmo, 'findByPk').resolves(gizmoToDelete);

        const message = await examplesService.deleteGizmo(gizmo1.id);

        expect(message).to.equal('Gizmo deleted.');
      });
    });
  });
});
