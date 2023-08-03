const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { UserModel, PhysicianModel, PatientModel, PharmacyModel } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

// exports.login = (req, res) => {
//     if(!req.body.username || !req.body.password){
//         const msg = "Veuillez fournir un nom d'utilisateur et un mot de passe."
//         return res.status(400).json({message: msg})
//     }  
//     UserModel.findOne({ where : {username: req.body.username}})
//         .then(user => {
//             if(!user){
//                 const msg = "L'utilisateur demandé n'existe pas."
//                 return res.status(404).json({message: msg})
//             }
//             bcrypt.compare(req.body.password, user.password)
//                 .then(isValid => {
//                     if(!isValid){
//                         const msg = "Information incorrecte."
//                         return res.status(404).json({message: msg})
//                     }
//                     // json web token
//                     const token = jwt.sign({
//                         data: user.id
//                       }, privateKey, { expiresIn: '24h' });
//                     const msg = "L'utilisateur a été connecté avec succès."
//                     user.password = "hidden"
//                     return res.json({message: msg, user, token})
//                 })
//         })
//         .catch(error => {
//             const msg = "L'utilisateur n'a pas pu se connecter."
//             return res.status(500).json({message: msg, error})
//         })
// }

exports.login = (req, res) => {
    if(!req.body.username || !req.body.password){
        const msg = "Veuillez fournir un nom d'utilisateur et un mot de passe."
        return res.status(400).json({message: msg})
    }  
    UserModel.findOne({ where : {username: req.body.username}})
        .then(user => {
            if(!user){
                const msg = "L'utilisateur demandé n'existe pas."
                return res.status(404).json({message: msg})
            }
            if (!user.roles || user.roles.length === 0) {
                const msg = "User role not found.";
                return res.status(404).json({ message: msg });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(isValid => {
                    if(!isValid){
                        const msg = "Information incorrecte."
                        return res.status(404).json({message: msg})
                    }
                    // json web token
                    const token = jwt.sign(
                        {
                            data: {
                                id: user.id,
                                username: user.username,
                            },
                            role: user.roles[0],
                        }, 
                      privateKey, { expiresIn: '24h' });
                    const msg = "L'utilisateur a été connecté avec succès."
                    user.password = "hidden"
                    return res.json({message: msg, user, token})
                })
        })
        .catch(error => {
            const msg = "L'utilisateur n'a pas pu se connecter."
            return res.status(500).json({message: msg, error})
        })
}

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            return UserModel.create({
                email: req.body.email,
                username: req.body.username,
                password: hash,
                roles: req.body.roles,      
            })
            .then((user)=> {
                if (req.body.roles.includes("physician")) {
                    return PhysicianModel.create({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        specialty: req.body.specialty,
                        address: req.body.address,
                        zipcode: req.body.zipcode,
                        city: req.body.city,
                        phone_number: req.body.phone_number,
                        verification_number: req.body.verification_number,
                        UserId: user.id
                    });
                } else if (req.body.roles.includes("patient")) {
                    return PatientModel.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    address: req.body.address,
                    zipcode: req.body.zipcode,
                    city: req.body.city,
                    phone_number: req.body.phone_number,
                    birth_date: req.body.birth_date,
                    UserId: user.id
                    })
                } else if (req.body.roles.includes("pharmacist")) {
                    return PharmacyModel.create({
                        name: req.body.name,
                        address: req.body.address,
                        zipcode: req.body.zipcode,
                        city: req.body.city,
                        phone_number: req.body.phone_number,
                        verification_number: req.body.verification_number,
                        UserId: user.id, 
                    });
                }
            })
            .then((userCreated) => {
                const message = `L'utilisateur ${userCreated.username} a bien été créé` 
                userCreated.password = 'hidden';
                return res.json({message, data: userCreated})
            })            
            .catch(error => {
                if(error instanceof UniqueConstraintError || error instanceof ValidationError){
                    return res.status(400).json({message: error.message, data: error})
                } 
                const message = "Un problème est survenu lors de la création du profil"
                return res.status(500).json({message, data:error})
            });
        })
        .catch(error => {
            const message = "Un problème est survenu lors de la création du profil";
            return res.status(500).json({ message, data: error });
    });
};

// exports.protect = (req, res, next) => {
//     const authorizationHeader = req.headers.authorization

//     if(!authorizationHeader){
//         const message = "Un jeton est nécessaire pour accéder à la ressource"
//         return res.status(401).json({message})
//     }
//     try {
//         const token = authorizationHeader.split(' ')[1];
//         const decoded = jwt.verify(token, privateKey)
//         req.userId = decoded.data;
//         console.log(req.userId)
//     } catch (err) {
//         const message = "Jeton invalide"
//         return res.status(403).json({message, data: err})
//     }
//     return next();
// }

// authController.js
exports.protect = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('Received token:', token);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token using the same secret key and algorithm used for signing
    const decoded = jwt.verify(token, privateKey);
    req.user = decoded; // Assuming the decoded JWT includes the user object

    next();
} catch (err) {
    console.error('Error verifying token:', err); // Add this line to log any errors
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      // Check if the user's role matches any of the specified roles
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          status: 'fail',
          message: 'Droits insuffisants' // Insufficient rights
        });
      }
      next();
    };
  };
  

// exports.restrictTo = (...roles) => {
//     return (req, res, next) => {
//         UserModel.findByPk(req.userId)
//             .then(user => {
//                 console.log("User Roles:", user.roles);
//                 if(!user || !roles.every(role => user.roles.includes(role))){
//                     const message = "Droits insuffisants";
//                     return res.status(403).json({message}) 
//                 }
//                 return next();
//             })
//             .catch(err => {
//                 const message = "Erreur lors de l'autorisation"
//                 res.status(500).json({message, data: err})
//             })    
//     }
// }


// exports.restrictToOwnUser = (req, res, next) => {
//     ReviewModel.findByPk(req.params.id)
//         .then(review => { 
//             if(!review){
//                 const message = `Le commentaire n°${req.params.id} n'existe pas`
//                 return res.status(404).json({message})
//             }
//             if(review.UserId != req.userId){
//                 const message = "Tu n'es pas le créateur de cette ressource";
//                 return res.status(403).json({message}) 
//             }
//             return next();
//         })
//         .catch(err => {
//             const message = "Erreur lors de l'autorisation"
//             res.status(500).json({message, data: err})
//         })    
// }