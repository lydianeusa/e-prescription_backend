module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Prescription', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
  
        medicine_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
  
        dosage: {
            type: DataTypes.STRING,
            allowNull: true
        },
  
        frequency: {
          type: DataTypes.STRING,
          allowNull: true
        },
  
        duration: {
            type: DataTypes.STRING,
            allowNull: true
        },
  
      //   PatientId:{
      //     type: DataTypes.INTEGER,
      //       // model: 'patients', // <<< Note, its table's name, not object name
      //       // key: 'id', // <<< Note, its a column name
      
      //     allowNull: false
      //  },
  
      //  PhysicianId:{
      //         type: DataTypes.INTEGER,
      //       //   model: 'physicians', // <<< Note, its table's name, not object name
      //       //   key: 'id', // <<< Note, its a column name
      //         allowNull: false
      //  },
  
      //  PharmacyId:{
      //         type: DataTypes.INTEGER,
      //       //   model: 'pharmacies', // <<< Note, its table's name, not object name
      //       //   key: 'id', // <<< Note, its a column name
      //         allowNull: false
      //  }
      }
      )
  }