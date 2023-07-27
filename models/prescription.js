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
        PatientId:{
            type: DataTypes.INTEGER,
            allowNull: false
       },
       PhysicianId:{
            type: DataTypes.INTEGER,
            allowNull: false
       }, 
       PharmacyId:{
            type: DataTypes.INTEGER,
            allowNull: false
       }
    }
    )
}