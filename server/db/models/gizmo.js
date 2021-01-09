module.exports = (sequelize, Sequelize) => {
  const Gizmo = sequelize.define('gizmo', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING
    }
  });

  return Gizmo
}
