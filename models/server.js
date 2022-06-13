const express = require('express')
const cors = require('cors')
class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.usersRoutePath = '/api/users'
        //Midlewares
        this.middlewares();
        // Rutas de la app
        this.routes()
    }

    middlewares() {

        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use( express.json())

        //Directorio public
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usersRoutePath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server corriendo en', this.port)
        })
    }
}

module.exports = Server;