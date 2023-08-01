const { Op, UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize');
const { PhysicianModel, UserModel } = require('../db/sequelize')

exports.findAllPhysicians = (req, res) => {
    console.log(req.query)
  if(req.query.search){
      PhysicianModel.findAll({ where: { 
        [Op.or]: [
            { last_name: { [Op.like]: `%${req.query.search}%` } },
            { first_name: { [Op.like]: `%${req.query.search}%` } },
            { specialty: { [Op.like]: `%${req.query.search}%` } },
            { city: { [Op.like]: `%${req.query.search}%` } },
            { zipcode: { [Op.like]: `%${req.query.search}%` } },
            ], 
        } })
      .then((elements)=>{
          if(!elements.length){
              return res.json({message: "Aucune médecin ne correspond à votre recherche"})    
          }
          const msg = 'La liste des médecins a bien été récupérée en base de données.'
          res.json({message: msg, data: elements})
      })
      .catch((error) => {
            console.log(error);
          const msg = 'Une erreur est survenue.'
          res.status(500).json({message: msg})
      })
  } else {
      PhysicianModel.findAll({include: UserModel})
      .then((elements)=>{
          const msg = 'La liste des médecins a été récupérée en base de données.'
          res.json({message: msg, data: elements})
      })
      .catch((error) => {
          const msg = 'Une erreur est survenue pour la liste des médecins.'
          res.status(500).json({message: msg})
      })
  }
}

exports.createPhysician = (req, res) => {
    UserModel.create({
        username: req.body.username,
        password: req.body.password,
        roles: req.body.roles,
    })
    .then((user)=>{
        PhysicianModel.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            specialty: req.body.specialty,
            address: req.body.address,
            zipcode: req.body.zipcode,
            city: req.body.city,
            phone_number: req.body.phone_number,
            verification_number: req.body.verification_number,
            UserId: user.id
        })
        .then((el) => {
            const msg = 'Un médecin a bien été ajouté.'
            res.json({ message: msg, data: el })
        })
        .catch(error => {
            if(error instanceof UniqueConstraintError || error instanceof ValidationError){
                return res.status(400).json({message: error.message, data: error})
            } 
            res.status(500).json(error)
        })
    })
}

exports.findPhysicianByPk = (req, res) => {
  PhysicianModel.findByPk(req.params.id)
      .then(element => {
          if (element === null) {
              const message = `Le médecin demandé n'existe pas.`
              res.status(404).json({ message })
          } else {
              const message = "Un médecin a bien été trouvé."
              res.json({ message, data: element });
          }
      })
      .catch(error => {
          const message = `La liste des médecins n'a pas pu se charger. Reessayez ulterieurement.`
          res.status(500).json({ message, data: error })
      })
}
