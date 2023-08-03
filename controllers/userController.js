const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { UserModel } = require('../db/sequelize')


exports.findAllUsers = (req, res) => {
    if(req.query.search){
        const searchQuery = req.query.search;
            UserModel.findAll({ where: 
                {[Op.or]: { username: { [Op.like]: `%${searchQuery}%` } },
                },
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
        UserModel.scope('withoutPassword').findAll()
        .then((elements)=>{
            const msg = 'La liste des utilisateurs a bien été récupérée en base de données.'
            res.json({message: msg, data: elements})
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({message: msg})
        })
    }
}
