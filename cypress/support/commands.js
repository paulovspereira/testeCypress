// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createTask',(tasksName= '') => {
    // Acessa pagina html
    cy.visit('http://127.0.0.1:3000')

    if(tasksName !== ''){
        cy.get('input[placeholder="Add a new Task"]')
        .type(tasksName) // preenche o campo texto
    }
    // Fazer o botão funcionar através da funnção contains
    cy.contains('button', 'Create').click()
})

Cypress.Commands.add('isRequired', (text) =>{

    // Pega campo teste no HTML
    cy.get('input[placeholder="Add a new Task"]')
    .invoke('prop', 'validationMessage')
    .should((text) => {

        expect(
            'This is a required field'
        ).to.eq(text)
    })
})