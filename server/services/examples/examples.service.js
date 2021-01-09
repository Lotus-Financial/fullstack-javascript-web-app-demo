const db = require('../../db/models');
const Gizmo = db.Gizmo;

const examplesService = {};

examplesService.retrieveGizmos = async () => {
  const gizmos = await Gizmo.findAll();
  const plainGizmos = gizmos.map(gizmo => gizmo.get({ plain: true}));
  return plainGizmos;
};

examplesService.retrieveGizmo = name => {}

examplesService.createGizmo = gizmo => {};

examplesService.updateGizmo = gizmo => {}

examplesService.deleteGizmo = name => {}

module.exports = examplesService;
