module.exports = (sequelize, Sequelize) => {
  const Gizmo = sequelize.define('Gizmo', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING
    }
  });

  return Gizmo
};
