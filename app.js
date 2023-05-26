const express = require('express')
const app = express()
const morgan = require('morgan')
const serveFavicon = require('serve-favicon')
const path = require('path')
const cors = require('cors')
const sequelize = require('./db/sequelize')
const port = 3001

sequelize.initDb();



app
    .use(express.json())
    .use(morgan('dev'))
    .use(serveFavicon(__dirname + '/favicon.ico'))
    .use(cors())

const prescriptionRouter = require('./routes/prescriptionRoutes')
const patientRouter = require('./routes/patientRoutes')
const pharmacyRouter = require('./routes/pharmacyRoutes')
const physicianRouter = require('./routes/physicianRoutes')
const userRouter = require('./routes/userRoutes')

app
  .use('/api/prescriptions', prescriptionRouter)
  .use('/api/patients', patientRouter)
  .use('/api/pharmacies', pharmacyRouter)
  .use('/api/physicians', physicianRouter)
  .use('/api/users', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})