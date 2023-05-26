const { Op, UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize');
const { PhysicianModel, sequelize } = require('../db/sequelize')

exports.findAllPhysicians = (req, res) => {
  if(req.query.search){
      // notre recherche avec paramètres
      PhysicianModel.findAll({ where: { last_name: {[Op.like] : `%${req.query.search}%`} } })
      .then((elements)=>{
          if(!elements.length){
              return res.json({message: "Aucune médecin ne correspond à votre recherche"})    
          }
          const msg = 'La liste des médecins a bien été récupérée en base de données.'
          res.json({message: msg, data: elements})
      })
      .catch((error) => {
          const msg = 'Une erreur est survenue.'
          res.status(500).json({message: msg})
      })
  } else {
      PhysicianModel.findAll()
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
  let newPhysician = req.body;

  PhysicianModel.create({
      first_name: newPhysician.first_name,
      last_name: newPhysician.last_name,
      specialty: newPhysician.specialty,
      address: newPhysician.address,
      zipcode: newPhysician.zipcode,
      city: newPhysician.city,
      phone_number: newPhysician.phone_number,
      email: newPhysician.email
  }).then((el) => {
      const msg = 'Un médecin a bien été ajouté.'
      res.json({ message: msg, data: el })
  }).catch(error => {
      if(error instanceof UniqueConstraintError || error instanceof ValidationError){
          return res.status(400).json({message: error.message, data: error})
      } 
      res.status(500).json(error)
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
