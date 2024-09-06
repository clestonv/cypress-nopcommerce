Cypress.Commands.add("userPostPut", ({ baseUrl, verbo })=> {
    cy.generateUser()
    cy.fixture('user').then((user) => {
      const userData = {
          nome: user.fullname ,
          email: user.email,
          password: user.password,
          administrador: 'true'
      };
    // Fazendo a requisição POST para criar o usuário
    cy.request({
      method: verbo,
      url: baseUrl,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: userData
    }).then((response) => {
    
        });
    });
});

Cypress.Commands.add("userDeleteGet", ({ baseUrl, verbo })=> {

    // Fazendo a requisição GET para obter o usuário
    cy.request({
      method: verbo,
      url: baseUrl,
      headers: {
        accept: 'application/json'
      }
    }).then((response) => {
        expect(response.status).to.eq(200); // Espera que o status seja 200 (OK)
    });
});