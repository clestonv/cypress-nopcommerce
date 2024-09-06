/// <reference types="cypress" />

describe('API Test - Cadastro de Usuário', () => {
    it('Deve cadastrar um novo usuário com sucesso', () => {
      cy.userPostPut({ baseUrl: 'https://serverest.dev/usuarios', verbo: 'POST' }).then((response) => {
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id');
        cy.writeFile('cypress/fixtures/userAPI.json', { id: response.body._id })
      });
    });

    it('Deve obter um usuário específico com sucesso', () => {
      cy.fixture('userAPI').then((userAPI) => {
        cy.userDeleteGet({baseUrl: `https://serverest.dev/usuarios/${userAPI.id}`, verbo: 'GET' }).then((response) => {
          
          // Valida os dados da resposta, ajustando conforme os dados retornados pela API
          expect(response.body).to.have.property('nome'); // Verifica se o campo 'nome' existe
          expect(response.body).to.have.property('email'); // Verifica se o campo 'email' existe
          expect(response.body).to.have.property('password'); // Verifica se o campo 'password' existe
          expect(response.body).to.have.property('administrador'); // Verifica se o campo 'administrador' existe
        });        
      });      
    });

    it('Deve atualizar um usuário específico com sucesso', () => {
      cy.fixture('userAPI').then((userAPI) => {
        cy.userPostPut({ baseUrl: `https://serverest.dev/usuarios/${userAPI.id}`, verbo: 'PUT' }).then((response) => {
          expect(response.body).to.have.property('message', 'Registro alterado com sucesso');        
          expect(response.body.message).to.eq('Registro alterado com sucesso');        
        });
      });        
    });

    it('Deve deletar um usuário específico com sucesso', () => {
      cy.fixture('userAPI').then((userAPI) => {
        cy.userDeleteGet({baseUrl: `https://serverest.dev/usuarios/${userAPI.id}`, verbo: 'DELETE'}).then((response) => {
          
          expect(response.body).to.have.property('message', 'Registro excluído com sucesso');        
          expect(response.body.message).to.eq('Registro excluído com sucesso');     
        });        
      });  
        
    

      });
  });
  