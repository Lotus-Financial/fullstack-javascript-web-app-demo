const db = require('../../db/models');
const Gizmo = db.Gizmo;

const examplesService = {};

examplesService.retrieveGizmos = async () => {
  const gizmos = await Gizmo.findAll();
  const plainGizmos = gizmos.map(gizmo => gizmo.get({ plain: true}));
  return plainGizmos;
};

examplesService.retrieveGizmo = id => {
  const gizmo = await Gizmo.findByPk(id);
  const plainGizmo = gizmo.get({ plain: true });
  return plainGizmo;
}

examplesService.createGizmo = gizmo => {};

examplesService.updateGizmo = gizmo => {}

examplesService.deleteGizmo = id => {}

module.exports = examplesService;
