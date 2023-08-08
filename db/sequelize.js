const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const UserModelSequelize = require('../models/user');
const PatientModelSequelize = require('../models/patient');
const PharmacyModelSequelize = require('../models/pharmacy');
const PhysicianModelSequelize = require('../models/physician');
const PrescriptionModelSequelize = require('../models/prescription');

const sequelize = new Sequelize('e_prescription2', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false,
});

const UserModel = UserModelSequelize(sequelize, DataTypes);
const PatientModel = PatientModelSequelize(sequelize, DataTypes);
const PharmacyModel = PharmacyModelSequelize(sequelize, DataTypes);
const PhysicianModel = PhysicianModelSequelize(sequelize, DataTypes);
const PrescriptionModel = PrescriptionModelSequelize(sequelize, DataTypes);

UserModel.hasMany(PatientModel, {
  foreignKey: {
    allowNull: false,
  },
});
PatientModel.belongsTo(UserModel);

UserModel.hasMany(PhysicianModel, {
  foreignKey: {
    allowNull: false,
  },
});
PhysicianModel.belongsTo(UserModel);

UserModel.hasMany(PharmacyModel, {
  foreignKey: {
    allowNull: false,
  },
});
PharmacyModel.belongsTo(UserModel);

PatientModel.hasMany(PrescriptionModel, {
  foreignKey: {
    allowNull: false,
  },
});
PrescriptionModel.belongsTo(PatientModel);

PhysicianModel.hasMany(PrescriptionModel, {
  foreignKey: {
    allowNull: false,
  },
});
PrescriptionModel.belongsTo(PhysicianModel);

PharmacyModel.hasMany(PrescriptionModel, {
  foreignKey: {
    allowNull: false,
  },
});
PrescriptionModel.belongsTo(PharmacyModel);

const initDb = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database tables created.');

    const hash = await bcrypt.hash('mdp', 10);

    const adminUser = await UserModel.create({
      email: 'lydiane@gmail.com',
      username: 'lydiane',
      password: hash,
      address: '3, rue Dufour',
      zipcode: '33700',
      city: 'Mérignac',
      phone_number: '0556545223',
      roles: ['admin'],
    });

    const users = [
      {
        id: 2,
        username: 'bertrand',
        password: hash,
        roles: ['physician'],
      },
      {
        id:3,
        username: 'laurence',
        password: hash,
        roles: ['physician'],
      },
      {
        id: 4,
        username: 'oree',
        password: hash,
        roles: ['patient'],
      },
      {
        id: 5,
        username: 'lola',
        password: hash,
        roles: ['patient'],
      },
      {
        id: 6,
        username: 'alexis',
        password: hash,
        roles: ['patient'],
      },
      {
        id: 7,
        username: 'peychotte',
        password: hash,
        roles: ['pharmacist'],
      },
      {
        id: 8,
        username: 'mondesir',
        password: hash,
        roles: ['pharmacist'],
      },
      {
        id: 9,
        username: 'lafayette',
        password: hash,
        roles: ['pharmacist'],
      },
      {
        id:10,
        username: 'pierre',
        password: hash,
        roles: ['physician'],
      },
      {
        id:11,
        username: 'yland',
        password: hash,
        roles: ['patient'],
      }
    ];

    const pharmacies = [
      {
      name: "Montdesir",
      email: "mondesir@gmail.com",
      verification_number: 11278,
      address: "3 place Montdésir",
      zipcode: "33000",
      city: "Bordeaux",
      phone_number: "0552364198",
      UserId: 8,
      },
      {      
      name: "Peychotte",
      email: "peychotte@gmail.com",
      verification_number: 54478,
      address: "5 avenue Les Eyquems",
      zipcode: "33700",
      city: "Mérignac",
      phone_number: "0552364198",
      UserId: 7,
      },
      {      
        name: "Lafayette",
        email: "lafayette@gmail.com",
        verification_number: 59479,
        address: "10 rue Sainte Catherine",
        zipcode: "33000",
        city: "Bordeaux",
        phone_number: "0552364194",
        UserId: 9,
        }
    ];

    const physicians = [
      {
        last_name: 'Durand',
        first_name: 'Bertrand',
        email: 'durand@gmail.com',
        specialty: 'Dermatologue',
        address: '20 rue McCarthy',
        zipcode: '33000',
        city: 'Bordeaux',
        phone_number: '0552364194',
        verification_number: 1123254478,
        UserId: 2,
      },
      {
        last_name: 'Legrand',
        first_name: 'Laurence',
        email: 'laurence@gmail.com',
        specialty: 'Ophtalmologue',
        address: '7 rue Fernand Marin',
        zipcode: '33000',
        city: 'Bordeaux',
        phone_number: '0552364498',
        verification_number: 1123554475,
        UserId: 3,
      },
      {
        last_name: 'Dupond',
        first_name: 'Pierre',
        email: 'pierre@gmail.com',
        specialty: 'Généraliste',
        address: '80 rue Murat',
        zipcode: '33700',
        city: 'Mérignac',
        phone_number: '0552367492',
        verification_number: 1123556475,
        UserId: 10,
      }
    ];

    const patients = [
      {
        id: 1,
        last_name: "Deguitre",
        first_name: "Orée",
        email: "oree@gmail.com",
        birth_date: "2010-04-08",
        address: "293 avenue de Foncastel",
        zipcode: "33700",
        city: "Mérignac",
        phone_number: "0552364198",
        UserId: 4,
      },
      {
        id:2,
        last_name: "Dujardin",
        first_name: "Lola",
        email: "lola@gmail.com",
        address: "17 rue Alfred de Vigny",
        zipcode: "33000",
        city: "Bordeaux",
        phone_number: "0552364196",
        birth_date: "1980-07-06",
        UserId: 5,
      },
      {
        id:3,
        last_name: "Funkelstein",
        first_name: "Alexis",
        email: "alexis@gmail.com",
        birth_date: "1990-10-01",
        address: "200 avenue de Verdun",
        zipcode: "33000",
        city: "Bordeaux",
        phone_number: "0552364198",
        UserId: 6,
      },
      {
        id: 4,
        last_name: "Deguitre",
        first_name: "Yland",
        email: "yland@gmail.com",
        birth_date: "2008-03-07",
        address: "293 avenue de Foncastel",
        zipcode: "33700",
        city: "Mérignac",
        phone_number: "0552364198",
        UserId: 11,
      }
    ]

    const prescriptions = [
      {
        medicine_name: "Smecta",
        dosage: "200 mg",
        frequency: "un fois par jour, le matin",
        duration: "5 jours",
        PatientId: 1,
        PhysicianId: 1,
        PharmacyId: 1
    },
    {
        medicine_name: "Doliprane",
        dosage: "1 ml",
        frequency: "si besoin",
        duration: "",
        PatientId: 2,
        PhysicianId: 2,
        PharmacyId: 2
    },
    {
        medicine_name: "Prozac",
        dosage: "200 mg",
        frequency: "un fois par jour, le matin",
        duration: "6 mois",
        PatientId: 2,
        PhysicianId: 2,
        PharmacyId: 1
    },
    {
        medicine_name: "Amoxicilline",
        dosage: "20 g par jour",
        frequency: "matin et soir",
        duration: "7 jours",
        PatientId: 3,
        PhysicianId: 2,
        PharmacyId: 1
    }
    ]

    for (const userData of users) {
      const user = await UserModel.create(userData);
      // console.log('User created:', user);
    }

    for (const element of pharmacies) {
      const createdPharmacy = await PharmacyModel.create(element);
      // console.log('Pharmacy created:', createdPharmacy);
    }
  
      for (const element of physicians) {
        const createdPhysician = await PhysicianModel.create(element);
        // console.log('Physician created:', createdPhysician);
      }
  
      for (const element of patients) {
        const createdPatient = await PatientModel.create(element);
        // console.log('Patient created:', createdPatient);
      }
  
      for (const element of prescriptions) {
        const createdPrescription = await PrescriptionModel.create(element);
        // console.log('Prescription created:', createdPrescription);
      }

    console.log('Data initialization completed.');
  } catch (error) {
    console.error('Error during data initialization:', error);
  }
};

sequelize
  .authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = {
  sequelize,
  UserModel,
  PatientModel,
  PhysicianModel,
  PharmacyModel,
  initDb,
  PrescriptionModel,
};
