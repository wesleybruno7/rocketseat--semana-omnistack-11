const req = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {

    // executa o migration no DB test antes de executar cada teste (para criar todas as tabelas/colunas que faltarem)
    beforeEach( async () => {
        // await connection.migrate.rollback() // zera o DB - como preciso de dados para saber se os demais testes estao ok deixei comentado
        await connection.migrate.latest() // atualiza ou cria as tabelas e colunas do DB
    })

    // finaliza a conexao com o DB test apos terminar todos os testes
    afterAll( async () => {
        await connection.destroy()
    })

    // cria uma nova ONG
    it('should be able to create a new ONG', async () => {
        const res = await req(app)
            .post('/ongs')
            .send({
                name: "ONG",
                email: "teste@teste.com.br",
                whatsapp: "17000000000",
                city: "São José do Rio Preto",
                uf: "SP"
            })

        console.log(res.body)

        expect(res.body).toHaveProperty('id')
        expect(res.body.id).toHaveLength(8)
    })

    // mostra todos os incidents da ONG com id f63b0c40
    it('should be able to show a list of incidents by ONG', async () => {
        const res = await req(app)
            .get('/profile')
            .set('Authorization', 'f63b0c40')

        console.log(res.body)
    })

    // cria um novo incident para o id f63b0c40
    it('should be able to create a new incident at specific ONG', async () => {
        const res = await req(app)
            .post('/incidents')
            .set('Authorization', 'f63b0c40')
            .send({
                title: "Caso teste",
                description: "Detalhes do caso - criado para testar se a validacao esta correta",
	            value: 120
            })

        console.log(res.body)

        expect(res.body).toHaveProperty('id')

    })

    // lista todos os incident criados no DB Test
    it('should be able to list all incident', async () => {
        const res = await req(app)
            .get('/incidents')

        console.log(res.body)

    })
})