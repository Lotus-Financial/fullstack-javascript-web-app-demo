const examplesService = require('../../services/examples/examples.service.js');

const examplesController = {};

examplesController.listGizmos = async () => await examplesService.retrieveGizmos();

examplesController.retrieveGizmo = name => examplesService.retrieveGizmo(name);

examplesController.createGizmo = gizmo => examplesService.createGizmo(gizmo);

examplesController.updateGizmo = gizmo => examplesService.updateGizmo(gizmo);

examplesController.deleteGizmo = name => examplesService.deleteGizmo(name);

module.exports = examplesController;
