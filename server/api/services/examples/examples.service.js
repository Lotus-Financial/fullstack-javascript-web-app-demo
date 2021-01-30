const db = require('../../../db/models');
const Gizmo = db.Gizmo;

const customErrors = require('../../helpers/errors/customErrors');

const examplesService = {};

const findGizmo = async id => {
  const gizmo = await Gizmo.findByPk(id);
  if (gizmo === null) {
    throw new customErrors.NotFoundError('Gizmo', id);
  }
  return gizmo;
}

examplesService.listGizmos = async () => {
  const gizmos = await Gizmo.findAll();
  const plainGizmos = gizmos.map(gizmo => gizmo.get({ plain: true}));
  return plainGizmos;
};

examplesService.retrieveGizmo = async id => {
  const gizmo = await findGizmo(id);

  return gizmo.get({ plain: true });
}

examplesService.createGizmo = async gizmo => {
  const createdGizmo = await Gizmo.create(gizmo);
  return createdGizmo;
};

examplesService.updateGizmo = async (id, gizmoUpdates) => {
  const originalGizmo = await findGizmo(id);

  const updatedGizmo = await originalGizmo.update(gizmoUpdates);

  return updatedGizmo.get({ plain: true });
}

examplesService.deleteGizmo = async id => {}

module.exports = examplesService;
