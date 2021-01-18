const examplesService = require('../../services/examples/examples.service.js');

const examplesController = {};

examplesController.listGizmos = async () => await examplesService.retrieveGizmos();

examplesController.retrieveGizmo = async name => await examplesService.retrieveGizmo(name);

examplesController.createGizmo = async gizmo => await examplesService.createGizmo(gizmo);

examplesController.updateGizmo = async gizmo => await examplesService.updateGizmo(gizmo);

examplesController.deleteGizmo = async name => await examplesService.deleteGizmo(name);

module.exports = examplesController;
