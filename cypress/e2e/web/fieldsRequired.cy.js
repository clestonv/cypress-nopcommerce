/// <reference types="cypress" />

describe('Campos Obrigatorios', () => {
    const message = require('../../fixtures/messageValidate.json');
    const error = require('../../fixtures/selectorErrors.json');
    beforeEach(() => {
      cy.visit('/register?returnUrl=%2Fregister')
    });
    
    it('CT01 - Campos obrigatorios vazio', () => {    
        cy.generateUser();
        cy.fixture('user').then((user) => {
          cy.registerUser({ day: user.birthday, month: user.birthmonth, year: user.birthyear, company: user.company});
        })
           
        cy.errorMsg({selector: error.firstNameError, message: message.firstNameRequired});
        cy.errorMsg({selector: error.lastNameError, message: message.lastNameRequired});
        cy.errorMsg({selector: error.emailError, message: message.emailRequired});
        cy.errorMsg({selector: error.confirmPasswordError, message: message.confirmPasswordRequired});
    })
  })