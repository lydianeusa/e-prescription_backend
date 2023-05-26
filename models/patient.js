module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Patient', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },

      first_name: {
        type: DataTypes.STRING,
        allowNull: true
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: true
      },

      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true
      }
    })
}