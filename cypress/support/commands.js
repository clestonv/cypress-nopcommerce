const { faker } = require('@faker-js/faker');
const register = require('../fixtures/pageRegister.json');
const user = require('../fixtures/user.json');

Cypress.Commands.add('registerUser', ({firstName, lastName, day, month, year, email, company, password})=> {
    
    function getRandomGenderId() {
        const genderIds = [register.genderMale, register.genderFemale];        
        const randomIndex = Math.floor(Math.random() * genderIds.length);
      
        return genderIds[randomIndex];
    }
      
    const randomGenderId = getRandomGenderId();

    cy.get(randomGenderId).click(); // Clica no botão de gênero aleatorio
    
    if(firstName == user.username){
        cy.get(register.firstName).type(firstName); // Preenche o campo do primeiro nome
    }
    if(lastName == user.lastname){
        cy.get(register.lastName).type(lastName); // Preenche o campo do último nome
    }
    
    cy.get(register.dateOfBirthDay).select(day); // Seleciona o dia de nascimento
    cy.get(register.dateOfBirthMonth).select(month); // Seleciona o mês de nascimento
    cy.get(register.dateOfBirthYear).select(year); // Seleciona o ano de nascimento
    
    cy.get(`${register.dateOfBirthDay} option:selected`).should('have.text', day) // Seleciona o dia de nascimento
    cy.get(`${register.dateOfBirthMonth} option:selected`).should('have.text', month) // Seleciona o mês de nascimento
    cy.get(`${register.dateOfBirthYear} option:selected`).should('have.text', year) // Seleciona o ano de nascimento

    if(email == user.email){
        cy.get(register.email).type(email); // Preenche o campo de email
    }
    
    cy.get(register.companyName).type(company); // Preenche o campo de nome da empresa
    
    cy.get(register.newsletter).check();
    
    if(password == user.password ){
        cy.get(register.password).type( password,{log: false});
    }
    if(password == user.password){
        cy.get(register.confirmPassword).type( password, {log: false});

    }
    

    cy.get(register.registerButton).click()
    
});

Cypress.Commands.add('generateUser', () => {
    function desestruturarData(dataISO) {
        const data = new Date(dataISO);
        const meses = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
      
        const ano = data.getUTCFullYear();
        const mes = meses[data.getUTCMonth()]; // Pega o nome do mês a partir do índice
        const dia = data.getUTCDate();
      
        return { ano, mes, dia };
    }
      
    const dataISO = faker.date.birthdate();
    const { ano, mes, dia } = desestruturarData(dataISO);

    const user = {
        username: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        birthday: dia.toString(),
        birthmonth: mes,
        birthyear: ano.toString(),
        company: faker.company.buzzPhrase(),
      };
    
    cy.writeFile('cypress/fixtures/user.json', user)

})

Cypress.Commands.add("errorMsg", ({ selector, message }) => {
    cy.get(selector).should("be.visible").and("have.text", message);
});