const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const imagesRoute = require('./routes/images')

dotenv.config()

const port = 8080

const app = express()
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true
}))
app.use("/images", imagesRoute)

// const server = app.listen(port, () => {
//     console.log("gettyBoards images microservice running on port: " + port)
// })

// require('dns').lookup(require('os').hostname(), function (err, add, fam) {
//     console.log('addr: ' + add);
// })

// process.on('SIGTERM', () => {
//     server.close(() => {
//     })
// });

module.exports = app