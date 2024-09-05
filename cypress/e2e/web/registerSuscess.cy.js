/// <reference types="cypress" />

describe('Registro com Sucesso', () => {
  beforeEach(() => {
    cy.visit('/register?returnUrl=%2Fregister')
  });
  
  it('CT01 - Todos os Campos Preenchidos corretamente', () => {    
    cy.generateUser();
    cy.fixture('user').then((user) => {
      cy.registerUser({ firstName: user.username, lastName: user.lastname, day: user.birthday, month: user.birthmonth, year: user.birthyear, email: user.email, company: user.company, password: user.password });
    })
       
    cy.get('.zone-name-title').should('be.visible')
    
      // cy.get("#register-button").click(); // Clica no botão de registro
      // cy.get('span[data-valmsg-for="FirstName"]').should("be.visible").and("have.text", 'First name is required.');
      // cy.get('span[data-valmsg-for="LastName"]').should("be.visible").and("have.text", 'Last name is required.');
  })
})