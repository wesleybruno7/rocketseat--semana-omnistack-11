/* ANOTACOES
* SQLite
* Driver: SELECT * FROM users
* Query Builder: table('users').select('*')
*
* instalando DB: http://knexjs.org/
* 1 - npm install knex
* 2 - npm install sqlite3
* 3 - npx knex init
*
* Criando migration na aplicação com SQlite
* 1 - cria mos uma pasta migrations dentro da pasta database
* 2 - no arquivo knexfile.js adicionamos o codigo: 
*
* migrations: {
*   directory: '.src/database/migrations'
* },
* useNullAsDefault: true,
*
* 3 - executamos o comando: npx knex migrate:make create_ongs
* 4 - alteramos o arquivo gerado na pasta com as informações referentes ao que precisamos fazer com o bd (criar tabelas, colunas .. alterar etc)
* 5 - para executar o migration (depois de alterado o arquvio gerado na pasta database/migrations), basta executar o comando: npx knex migrate:latest
*/

const express = require('express')
const cors = require('cors')// modulo de segurança - determina quem pode acessar esta aplicação
const { errors } = require('celebrate')
const routes = require('./routes')

const app = express()

app.use(cors())
// app.use(cors({ origin: 'http://url-do-servidor.com' })) // se quiser limitar acesso da api
app.use(express.json())
app.use(routes)
app.use(errors())

module.exports = app