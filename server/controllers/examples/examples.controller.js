import examplesService from '../../services/examples/examples.service.js';

const examplesController = {};

examplesController.listGizmos = () => examplesService.retrieveGizmos();

examplesController.retrieveGizmo = name => examplesService.retrieveGizmo(name);

examplesController.createGizmo = gizmo => examplesService.createGizmo(gizmo);

examplesController.updateGizmo = gizmo => examplesService.updateGizmo(gizmo);

examplesController.deleteGizmo = name => examplesService.deleteGizmo(name);

export default examplesController;
