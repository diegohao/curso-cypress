/// <reference types="cypress" />

describe('Cypress basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        // .pause()
        cy.title().debug().should('to.equal', 'Campo de Treinamento')
        cy.title().and('contain', 'Campo')
        
        let syncTitle

        //TODO imprimir o log do console
        cy.title().then(title => {
            console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title
        })

        //TODO escrever o title em um campo de texto
        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })
    })

    it('Find element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple').click().should('have.value', 'Obrigado!')
    })
})