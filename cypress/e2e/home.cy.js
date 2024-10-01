describe('home', () => {
  it('webapp deve estar online', () => {
    cy.visit('http://127.0.0.1:3000')

    cy.title().should('eq', 'Gerencie suas tarefas com Mark L')

  })
})