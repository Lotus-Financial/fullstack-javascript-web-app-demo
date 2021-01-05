import examplesService from '../../services/examples/examples.service.js';

const examplesController = {};

examplesController.listGizmos = () => {
  return examplesService.retrieveGizmos();
};

examplesController.retrieveGizmo = name => {
  return examplesService.retrieveGizmo(name);
}

export default examplesController;
