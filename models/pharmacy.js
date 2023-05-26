module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pharmacy', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },

      name: {
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