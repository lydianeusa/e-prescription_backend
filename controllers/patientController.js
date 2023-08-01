
const { Op, UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize');
const { PatientModel, UserModel, PrescriptionModel } = require('../db/sequelize')

exports.findAllPatients = (req, res) => {
    console.log(req.query)

  if(req.query.search){
    const searchQuery = req.query.search;
      PatientModel.findAll({ where: 
            {[Op.or]: [
                { last_name: { [Op.like]: `%${searchQuery}%` } },
                { first_name: { [Op.like]: `%${searchQuery}%` } },
                { birth_date: { [Op.like]: `%${searchQuery}%` } },
                { email: { [Op.like]: `%${searchQuery}%` } },
            ]},
            include: [PrescriptionModel]
        })
      .then((elements)=>{
          if(!elements.length){
              return res.json({message: "Aucun patient ne correspond à votre recherche"})    
          }
          const msg = 'Le patient a bien été récupérée en base de données.'
          res.json({message: msg, data: elements})
      })
      .catch((error) => {
          const msg = 'Une erreur est survenue.'
          res.status(500).json({message: msg, error})
      })
  } else {
      PatientModel.findAll({include: [UserModel, PrescriptionModel]})
      .then((elements)=>{
          const msg = 'La liste des patients a été récupérée en base de données.'
          res.json({message: msg, data: elements})
      })
      .catch((error) => {
          const msg = 'Une erreur est survenue pour la liste des patients.'
          res.status(500).json({message: msg, error})
      })
  }
}



exports.createPatient = (req, res) => {
    UserModel.create({
        username: req.body.username,
        password: req.body.password,
        roles: req.body.roles,
      }).then((user)=>{
  PatientModel.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      address: req.body.address,
      zipcode: req.body.zipcode,
      city: req.body.city,
      phone_number: req.body.phone_number,
      birth_date: req.body.birth_date,
      UserId: user.id
  }).then((element) => {
      const msg = 'Un patient a bien été ajouté.'
      res.json({ message: msg, data: element })
  }).catch(error => {
      if(error instanceof UniqueConstraintError || error instanceof ValidationError){
          return res.status(400).json({message: error.message, data: error})
      } 
      res.status(500).json(error)
  })
    });
}

exports.findPatientByPk = (req, res) => {
    PatientModel.findByPk(req.params.id,
        {include: PrescriptionModel} )
        .then(element => {
            if (element === null) {
                const message = `Le patient demandé n'existe pas.`
                res.status(404).json({ message })
            } else {
                const message = "Un patient a bien été trouvé."
                res.json({ message, data: element });
            }
        })
        .catch(error => {
            const message = `La liste des patients n'a pas pu se charger. Reessayez ulterieurement.`
            res.status(500).json({ message, data: error })
        })
}
  

exports.updatePatient = (req, res) => {
    PatientModel.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then((element) => {
        if(element === null){
            const msg = "Le patient demandé n'existe pas."
            res.json({message: msg})
        } else {
            const msg = "Le patient a bien été modifié."
            res.json({message: msg, data: element})
        }
    }).catch((error) => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})
        } 
        const msg = "Impossible de mettre à jour le patient."
        res.status(500).json({message: msg})
    })
}

exports.deletePatient = (req, res) => {
    PatientModel.findByPk(req.params.id)
        .then(element => {
            if (element === null) {
                const message = `Le patient demandée n'existe pas.`
                return res.status(404).json({ message })
            }
            return PatientModel.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(() => {
                    const message = `Le patient a bien été supprimée.`
                    res.json({ message, data: element });
                })
        })
        .catch(error => {
            const message = `Impossible de supprimer l'ordonnance.`
            res.status(500).json({ message, data: error })
        })
}
