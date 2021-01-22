const db = require('../../../db/models');
const Gizmo = db.Gizmo;

const customErrors = require('../../helpers/errors/customErrors');

const examplesService = {};

examplesService.listGizmos = async () => {
  const gizmos = await Gizmo.findAll();
  const plainGizmos = gizmos.map(gizmo => gizmo.get({ plain: true}));
  return plainGizmos;
};

examplesService.retrieveGizmo = async id => {
  const gizmo = await Gizmo.findByPk(id);
  if (gizmo === null) {
    throw new customErrors.NotFoundError('Gizmo', id);
  }
  const plainGizmo = gizmo.get({ plain: true });
  return plainGizmo;
}

examplesService.createGizmo = async gizmo => {
  const createdGizmo = await Gizmo.create(gizmo);
  return createdGizmo;
};

examplesService.updateGizmo = async gizmo => {}

examplesService.deleteGizmo = async id => {}

module.exports = examplesService;
