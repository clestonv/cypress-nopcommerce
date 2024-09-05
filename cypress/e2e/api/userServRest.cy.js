// - POST
// - PUT
// - GET
// - DELETE
describe('API Test - Cadastro de Usuário', () => {
    it('Deve cadastrar um novo usuário com sucesso', () => {
        cy.generateUser()
      const url = 'https://serverest.dev/usuarios';
      cy.fixture('user').then((user) => {
        const userData = {
            nome: user.fullname ,
            email: user.email,
            password: user.password,
            administrador: 'true'
        };

              // Fazendo a requisição POST para criar o usuário
      cy.request({
        method: 'POST',
        url: url,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: userData
      }).then((response) => {
        // Verifica o status da resposta
        expect(response.status).to.eq(201); // Espera que o status seja 201 (Criado)
        
        // Valida os dados da resposta
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id'); // Verifica se existe um ID gerado para o usuário

        cy.writeFile('cypress/fixtures/userAPI.json',{id: response.body._id})
      });
      });
  

    });

    it('Deve obter um usuário específico com sucesso', () => {
        const url = `https://serverest.dev/usuarios/${userAPI.id}`;
        const userAPI = require('../../fixtures/userAPI.json');
    
        // Fazendo a requisição GET para obter o usuário
        cy.request({
          method: 'GET',
          url: url,
          headers: {
            accept: 'application/json'
          }
        }).then((response) => {
          // Verifica o status da resposta
          expect(response.status).to.eq(200); // Espera que o status seja 200 (OK)
    
          // Valida os dados da resposta, ajustando conforme os dados retornados pela API
          expect(response.body).to.have.property('nome'); // Verifica se o campo 'nome' existe
          expect(response.body).to.have.property('email'); // Verifica se o campo 'email' existe
          expect(response.body).to.have.property('password'); // Verifica se o campo 'password' existe
          expect(response.body).to.have.property('administrador'); // Verifica se o campo 'administrador' existe
        });
    });

    it('Deve atualizar um usuário específico com sucesso', () => {
        const userAPI = require('../../fixtures/userAPI.json');
        cy.generateUser()
        
        const url = `https://serverest.dev/usuarios/${userAPI.id}`;
        cy.fixture('user').then((user) => {
            const userData = {
                nome: user.fullname ,
                email: user.email,
                password: user.password,
                administrador: 'true'
            };

            cy.request({
                method: 'PUT',
                url: url,
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: userData
              }).then((response) => {
                expect(response.status).to.eq(200);

                expect(response.body).to.have.property('message', 'Registro alterado com sucesso');
                
              });
        })
        
    });

    it('Deve deletar um usuário específico com sucesso', () => {
        const userAPI = require('../../fixtures/userAPI.json');
        cy.fixture('userAPI').then((userAPI) => {
            const url = `https://serverest.dev/usuarios/${userAPI.id}`;

                    // Fazendo a requisição DELETE para excluir o usuário
        cy.request({
            method: 'DELETE',
            url: url,
            headers: {
              accept: 'application/json'
            }
          }).then((response) => {
            // Verifica o status da resposta
            expect(response.status).to.eq(200); // Espera que o status seja 200 (OK)
      
            // Valida a mensagem de sucesso na resposta
            expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
          });
        })
        
    

      });
  });
  