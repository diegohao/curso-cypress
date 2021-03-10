/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import '../../support/buildEnv'

describe('Should test at a frontend level', () => {
    after(() => {
      cy.clearLocalStorage()
    })      
    
    beforeEach(() => {
      buildEnv()
      cy.login('a@a', 'senha errada')
      cy.get(loc.MENU.HOME).click()
    })

    it('Should create an account', () => {      
      cy.route({
        method: 'POST',
        url: '/contas',
        response: { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 }
      }).as('saveConta')

      cy.acessarMenuConta()

      cy.route({
        method: 'GET',
        url: '/contas',
        response: [
          { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
          { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 },
          { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 }
        ]
      }).as('contasSaved')

      cy.inserirConta('Conta de teste')
      cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Should update an account', () => {      
      cy.route({
        method: 'PUT',
        url: 'contas/**',
        response: { id: 1, nome: 'Conta alterada', visivel: true, usuario_id: 1 }
      })
      
      cy.acessarMenuConta()
      
      cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Banco')).click()
      cy.get(loc.CONTAS.NOME)
        .clear()
        .type('Conta alterada')
      cy.get(loc.CONTAS.BTN_SALVAR).click()
      cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Should not create an account with same name', () => {
    })

    it('Should create a transaction', () => {
    })

    it('Should get balance', () => {
    })
    
    it('Should remove a transaction', () => {
    })
})
