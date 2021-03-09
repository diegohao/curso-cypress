/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at a frontend level', () => {
    before(() => {
      cy.server()
      cy.route({
        method: 'POST',
        url: 'signin',
        response: {
          id: 1000,
          nome: 'Usuário falso',
          token: 'Uma string muito grande que não deveria ser aceita'
        }
      }).as('signin')
      
      cy.route({
        method: 'GET',
        url: '/saldo',
        response: [{
          conta_id: 999,
          conta: "Carteira",
          saldo: "100.00"
        },
        {
          conta_id: 9909,
          conta: "Banco",
          saldo: "1000000.00"
        }
        ]
      }).as('saldo')
      cy.login('a@a', 'senha errada')
    })
    
    beforeEach(() => {
    })

    it('Should create an account', () => {
    })

    it('Should update an account', () => {
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
