import examplesData from '../../mocks/examples/gizmos.example.json';

const examplesService = {};

examplesService.retrieveGizmos = () => examplesData.gizmos;

examplesService.retrieveGizmo = name => examplesData.gizmos.find(el => el.name === name)

examplesService.createGizmo = gizmo => {
  examplesData.gizmos.push(gizmo)
  return examplesData.gizmos.slice(-1)[0];
};

examplesService.updateGizmo = gizmo => {
  const gizmoToUpdate = examplesData.gizmos.find(el => el.name === gizmo.name);
  Object.keys(gizmo).forEach(key => gizmoToUpdate[key] = gizmo[key])
  return gizmoToUpdate;
}

examplesService.deleteGizmo = name => {
  const deleteInd = examplesData.gizmos.findIndex(el => el.name === name);
  if (deleteInd >= 0) {
    const deletedGizmo = examplesData.gizmos.splice(deleteInd, 1)
    return deletedGizmo;
  }
  return null;
}

export default examplesService;
