import examplesData from '../../mocks/examples/gizmos.example.json';

const examplesService = {};

examplesService.retrieveGizmos = () => examplesData.gizmos;

examplesService.retrieveGizmo = name => examplesData.gizmos.find(el => el.name === name)

export default examplesService;
