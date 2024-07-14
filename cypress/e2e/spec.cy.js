describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-testid="login"]').should("exist")

    cy.get('input#email')
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Enter your email')
      .type('admin@store.com').should('have.value', 'admin@store.com')

    cy.get('input#password')
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Enter your password')
      .type('123456').should('have.value', '123456')   

      cy.get('[data-testid="submit"]').click()

      cy.get('div.home')
            .should('be.visible')
    
            cy.get('div.sidebar')
            .should('be.visible')

            cy.get('[data-testid="user"]').click()

    cy.url().should('include','/users')

    cy.get('div.datatableTitle')
    .contains('USERS')

    cy.get('[data-testid="categories"]').click()
    cy.url().should('include','/categories')

            cy.get('a.link').click()

            cy.get('div.Input')
            .type('Dessert')

            cy.get('[data-testid="jalan"]').click()
    
     cy.get('div.mylist')
     cy.contains('Delete').click()

     cy.get('[data-testid="categories"]').click()

     cy.get('div.mydatatable')
     .should('be.visible')
     
     cy.get('div.widget')
     .should('be.visible')

  })
})