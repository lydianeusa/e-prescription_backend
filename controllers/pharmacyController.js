

const { Op, UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize');
const { PharmacyModel, UserModel} = require('../db/sequelize')

exports.findAllPharmacies = (req, res) => {
  if(req.query.search){
    const searchQuery = req.query.search;
      PharmacyModel.findAll({ where:{           
        [Op.or]: [
        { name: { [Op.like]: `%${searchQuery}%` } },
        { city: { [Op.like]: `%${searchQuery}%` } },
        { zipcode: { [Op.like]: `%${searchQuery}%` } },
        ], 
        } })
      .then((elements)=>{
          if(!elements.length){
              return res.json({message: "Aucune paharmacie ne correspond à votre recherche"})    
          }
          const msg = 'La liste des pharmacies a bien été récupérée en base de données.'
          res.json({message: msg, data: elements})
      })
      .catch((error) => {
          const msg = 'Une erreur est survenue.'
          res.status(500).json({message: msg, error})
      })
  } else {
      PharmacyModel.findAll({include: UserModel})
      .then((elements)=>{
          const msg = 'La liste des pharmacies a été récupérée en base de données.'
          res.json({message: msg, data: elements})
      })
      .catch((error) => {
          const msg = 'Une erreur est survenue pour la liste des pharmacies.'
          res.status(500).json({message: msg, error})
      })
  }
}

exports.createPharmacy = (req, res) => {
    UserModel.create({
        username: req.body.username,
        password: req.body.password,
        roles: req.body.roles,
      }).then((user)=>{
  PharmacyModel.create({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      zipcode: req.body.zipcode,
      city: req.body.city,
      phone_number: req.body.phone_number,
      verification_number: req.body.verification_number,
      UserId: user.id,
  }).then((element) => {
      const msg = 'Une pharmacie a bien été ajoutée.'
      res.json({ message: msg, data: element })
  }).catch(error => {
      if(error instanceof UniqueConstraintError || error instanceof ValidationError){
          return res.status(400).json({message: error.message, data: error})
      } 
      res.status(500).json(error)
  })
    })
}

exports.findPharmacyByPk = (req, res) => {
    PharmacyModel.findByPk(req.params.id)
        .then(element => {
            if (element === null) {
                const message = `La pahrmacie demandée n'existe pas.`
                res.status(404).json({ message })
            } else {
                const message = "Une pharmacie a bien été trouvée."
                res.json({ message, data: element });
            }
        })
        .catch(error => {
            const message = `La liste des pharmacies n'a pas pu se charger. Reessayez ulterieurement.`
            res.status(500).json({ message, data: error })
        })
}

