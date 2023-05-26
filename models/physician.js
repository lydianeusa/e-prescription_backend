module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Physician', {
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

      specialty: {
          type: DataTypes.STRING,
          allowNull: true
      },

      address: {
          type: DataTypes.STRING,
          allowNull: true
      },

      zipcode: {
        type: DataTypes.STRING,
        allowNull: true
      },

      city: {
        type: DataTypes.STRING,
        allowNull: true
     },

      phone_number: {
        type: DataTypes.STRING,
        allowNull: true
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true
      }
    })
}