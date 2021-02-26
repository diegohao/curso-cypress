/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at a functional level', () => {
    before(() => {
        cy.login('a@a', 'a')
        cy.resetApp()
    })

    it('Should create an account', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Should update an account', () => {
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Should not create an account with same name', () => {
        cy.inserirConta('Conta alterada')
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Insert movimentation', () => {
        cy.get('[data-test=menu-movimentacao] > .fas')
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Primeira movimentação')
        cy.get(loc.MOVIMENTACAO.VALOR).type(200)
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Diego')
        cy.get(loc.MOVIMENTACAO.CONTA_ALTERAR)
            .click()
            .select('conta alterada')
        cy.get('[data-test=status]').click()
        cy.get('[data-test=status]').click()
    })
})