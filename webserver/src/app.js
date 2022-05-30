import http from 'http'
import https from 'https'
import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'

import router from './routes'

const config = {
	port: process.env.PORT || 443,
	ip: '0.0.0.0',
}

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/assets', express.static(path.resolve('./build/assets')))
app.use('/static', express.static(path.resolve('./build/static')))

app.use('/', router)

app.use(queryErrorHandler())
app.use(bodyErrorHandler())


// const options = {
//   key: fs.readFileSync('/etc/ssl/private/incedokey.key'),
//   cert: fs.readFileSync('/etc/ssl/private/incedoname.crt')
// }


const httpServer = http.createServer(app)
// const httpServer = http.createServer(function (req, res) {
//     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//     res.end();
// })
// const httpsServer = https.createServer({}, app)

// httpsServer.listen(config.port, config.ip, () => {
// 	console.log(`listening on at ${config.ip}:${config.port} `)
// })

httpServer.listen(8094, '0.0.0.0')

export default app