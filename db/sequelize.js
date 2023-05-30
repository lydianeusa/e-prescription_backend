const bcrypt = require('bcrypt');

const patients = require('../mock-patients');
const pharmacies = require('../mock-pharmacies');
const physicians = require('../mock-physicians');
const prescriptions = require('../mock-prescriptions');

const { Sequelize, DataTypes } = require('sequelize');
const UserModelSequelize = require('../models/user');
const PatientModelSequelize = require('../models/patient');
const PharmacyModelSequelize = require('../models/pharmacy');
const PhysicianModelSequelize = require('../models/physician');
const PrescriptionModelSequelize = require('../models/prescription');


const sequelize = new Sequelize('e_prescription', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

const UserModel = UserModelSequelize(sequelize, DataTypes)
const PatientModel = PatientModelSequelize(sequelize, DataTypes)
const PharmacyModel = PharmacyModelSequelize(sequelize, DataTypes)
const PhysicianModel = PhysicianModelSequelize(sequelize, DataTypes)
const PrescriptionModel = PrescriptionModelSequelize(sequelize, DataTypes)

PatientModel.hasMany(PrescriptionModel, {
    foreignKey: {
        allowNull: false
    }
  });
PrescriptionModel.belongsTo(PatientModel); 

PhysicianModel.hasMany(PrescriptionModel, {
    foreignKey: {
        allowNull: false
    }
  });
PrescriptionModel.belongsTo(PhysicianModel); 

PharmacyModel.hasMany(PrescriptionModel, {
    foreignKey: {
        allowNull: false
    }
  });
PrescriptionModel.belongsTo(PharmacyModel); 


const initDb = () => {
    return sequelize.sync({force: true})
    .then(() => {
        bcrypt.hash('mdp', 10)
        .then((hash) => {
            UserModel.create({
                username: 'lydiane',
                password: hash,
                roles: ['user']
            })
        })
        .catch(err => console.log(err))
    })
    .then(() => {    
        physicians.forEach((element) => {
            PhysicianModel.create({
                id: element.id,
                first_name: element.first_name,
                last_name: element.last_name,
                specialty: element.specialty,
                address: element.address,
                zipcode: element.zipcode,
                city: element.city,
                phone_number: element.phone_number,
                email: element.email,
            })
        });
    })
    .then(() => {
        pharmacies.forEach((element) => {
            PharmacyModel.create({
                id: element.id,
                name: element.name,
                address: element.address,
                zipcode: element.zipcode,
                city: element.city,
                phone_number: element.phone_number,
                email: element.email,
            })
        });
    })
    .then(() => {
        patients.forEach((element) => {
            PatientModel.create({
                id: element.id,
                first_name: element.first_name,
                last_name: element.last_name,
                birth_date: element.birth_date,
                email: element.email,
            })
        });
        PatientModel.create({
            id: 4,
            first_name: "Stéphane",
            last_name: "Durand",
            birth_date: "2000-05-05",
            email: "stephane@gmail.com",
        })
        .then(() => {
            prescriptions.forEach((element) => {
                PrescriptionModel.create({
                    id: element.id,
                    medicine_name: element.medicine_name,
                    dosage: element.dosage,
                    duration: element.duration,
                    frequency: element.frequency,
                    PhysicianId: element.PhysicianId,
                    PharmacyId: element.PharmacyId,
                    PatientId: element.PatientId
                })
            });
        })


    })
    .catch(error => console.log(error))
}

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = {
    sequelize, PatientModel, PhysicianModel, PharmacyModel, UserModel, initDb, PrescriptionModel
}