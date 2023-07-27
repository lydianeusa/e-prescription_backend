module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Patient', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true
      },     
      first_name: {
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
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      UserId:{
        type: DataTypes.INTEGER,
        allowNull: true
      }
    })
}