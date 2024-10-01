/// <reference types="cypress" />

//Switc de teste
describe('tarefas', () => {

     // cy.visit é para acessa a página web

    // It defini os tetes que são executados
    it('deve cadastrar uma nova tarefa', () => {

        const tasksName = 'Ler um livro de node.js'

        // fazendo requisição com api através http
        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: {name: 'Ler um livro de node.js'}  
        }).then(response =>{
            expect(response.status).to.eq(204)
        })

        cy.once('uncaught:exception', () => false);
      
        cy.createTask(tasksName)

        // Verificar se o campo existe na tela
        // Contains verifica um campo específico
        cy.contains('main div p','Ler um livro de node.js')
            .should('be.visible')
    })

    it('não deve permitir tarefa duplicadas', ()=>{

        const tasksName = 'Estudar Javascript'

        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: {name: 'Estudar Javascript'}  
        }).then(response =>{
            expect(response.status).to.eq(204)
        })

        //Dado que eu tenho uma tarefa duplicada
        cy.request({
            url:'http://localhost:3333/tasks',
            method: 'POST',
            body: { name: 'Estudar Javascript', is_done: false}
        }).then(response =>{
            expect(response.status).to.eq(201)
        })

        //Quando faço o cadastro dessa tarefa
        cy.createTask(tasksName)

        //Então
        // Campo testes dentro HTML e verificar 
        // se o campos está visivel(should) e valida o campos
        cy.get('.swal2-html-container')
        .should('be.visible')
        .should('have.text', 'Task already exists!')
    })

    it('campo obrigatório', ()=> {
        cy.createTask();

        
        cy.isRequired('This is a required field')
    })
})
