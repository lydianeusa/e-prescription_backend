const bcrypt = require('bcrypt');

const users = require('../mock-user');
const pharmacies = require('../mock-pharmacies');
const physicians = require('../mock-physicians');
const prescriptions = require('../mock-prescriptions');
const patients = require ('../mock-patients');

const { Sequelize, DataTypes } = require('sequelize');
const UserModelSequelize = require('../models/user');
const PatientModelSequelize = require('../models/patient');
const PharmacyModelSequelize = require('../models/pharmacy');
const PhysicianModelSequelize = require('../models/physician');
const PrescriptionModelSequelize = require('../models/prescription');


const sequelize = new Sequelize('e_prescription2', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

const UserModel = UserModelSequelize(sequelize, DataTypes)
const PatientModel = PatientModelSequelize(sequelize, DataTypes)
const PharmacyModel = PharmacyModelSequelize(sequelize, DataTypes)
const PhysicianModel = PhysicianModelSequelize(sequelize, DataTypes)
const PrescriptionModel = PrescriptionModelSequelize(sequelize, DataTypes)

UserModel.hasMany(PatientModel, {
    foreignKey: {
        allowNull: false
    }
  });
PatientModel.belongsTo(UserModel); 

UserModel.hasMany(PhysicianModel, {
    foreignKey: {
        allowNull: false
    }
  });
PhysicianModel.belongsTo(UserModel); 

UserModel.hasMany(PharmacyModel, {
    foreignKey: {
        allowNull: false
    }
  });
PharmacyModel.belongsTo(UserModel); 

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

const initDb = async () => {
    try {
      await sequelize.sync({ force: true });
      console.log('Database tables created.');
  
      const hash = await bcrypt.hash('mdp', 10);
      const user = await UserModel.create({
        email: 'lydiane@gmail.com',
        username: 'lydiane',
        password: hash,
        address: '3, rue Dufour',
        zipcode: '33700',
        city: 'Mérignac',
        phone_number: '0556545223',
        roles: ['admin', 'patient', 'physician', 'pharmacist']
      });
      console.log('Admin user created:', user);
  
      for (const element of users) {
        const createdUser = await UserModel.create(element);
        console.log('User created:', createdUser);
      }
  
      for (const element of pharmacies) {
        const createdPharmacy = await PharmacyModel.create(element);
        console.log('Pharmacy created:', createdPharmacy);
      }
  
      for (const element of physicians) {
        const createdPhysician = await PhysicianModel.create(element);
        console.log('Physician created:', createdPhysician);
      }
  
      for (const element of patients) {
        const createdPatient = await PatientModel.create(element);
        console.log('Patient created:', createdPatient);
      }
  
      for (const element of prescriptions) {
        const createdPrescription = await PrescriptionModel.create(element);
        console.log('Prescription created:', createdPrescription);
      }
  
      console.log('Data initialization completed.');
    } catch (error) {
      console.error('Error during data initialization:', error);
    }
  };
  

// const initDb = () => {
//     return sequelize.sync({force: true})

//     .then(() => {    
//         users.forEach((element) => {
//             UserModel.create({
//                 id: element.id,
//                 email: element.email,
//                 username: element.username,
//                 password: element.password,    
//                 address: element.address,
//                 zipcode: element.zipcode,
//                 city: element.city,
//                 phone_number: element.phone_number,
//                 roles: element.roles,
//              })
//         })
//     })
//     .then(() => {
//         bcrypt.hash('mdp', 10)
//         .then((hash) => {
//             UserModel.create({
//                 email: 'lydiane@gmail.com',                
//                 username: 'lydiane',
//                 password: hash,
//                 address: '3, rue Dufour',
//                 zipcode: '33700',
//                 city: 'Mérignac',
//                 phone_number: '0556545223',
//                 roles: ['admin']
//             })
//         })
//     })
//     .then(() => {
//         pharmacies.forEach((element) => {
//           PharmacyModel.create({
//             id: element.id,
//             name: element.name,
//             verification_number: element.verification_number,
//             UserId: element.UserId, 
//           })
//         })
//     })

//     .then(() => {
//         physicians.forEach((element) => {
//             PhysicianModel.create({
//                 id: element.id,
//                 last_name: element.last_name,
//                 first_name: element.first_name,
//                 specialty: element.specialty,
//                 verification_number: element.verification_number,
//                 UserId: element.UserId,
//             })
//         })
//     })
//     .then(() => {
//         patients.forEach((element) => {
//             PatientModel.create({
//                 id: element.id,
//                 last_name: element.last_name,
//                 first_name: element.first_name,
//                 birth_date: element.birth_date,
//                 UserId: element.UserId,
//             })
//         });
//         PatientModel.create({
//             id: 4,
//             last_name: "Durien",
//             first_name: "Stéphane",
//             birth_date: "2000-05-05",
//             UserId: null,
//         })
//         .then(() => {
//                 prescriptions.forEach((element) => {
//                     PrescriptionModel.create({
//                         id: element.id,
//                         medicine_name: element.medicine_name,
//                         dosage: element.dosage,
//                         duration: element.duration,
//                         frequency: element.frequency,
//                         PhysicianId: element.PhysicianId,
//                         PharmacyId: element.PharmacyId,
//                         PatientId: element.PatientId
//                     })
//                 })
//         })
//     })
//     .catch(error => console.log(error))
// }


sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = {
    sequelize, 
    UserModel, 
    PatientModel, 
    PhysicianModel, 
    PharmacyModel, 
    initDb, 
    PrescriptionModel
}