const knex = require('knex')
const configuration = require('../../knexfile')

// compara a variavel ambiente criada pelo cross-env para definir se estaremos usando o DB de teste ou de desenvolvimento
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

const connection = knex(config)

module.exports = connection