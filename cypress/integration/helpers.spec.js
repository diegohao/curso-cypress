/// <reference types="cypress" />

describe('Helpers', () => {
	it('Wrap', () => {
		const obj = { nome: 'User', idade: 29 }
		expect(obj).to.have.property('nome')
		cy.wrap(obj).should('have.property', 'nome')

		cy.visit('https://wcaquino.me/cypress/componentes.html')
		cy.get(#FormNome).then($el => {
			cy.wrap($el).type('Funciona via Cypress')
		})

		const promise = new Promise((resolve, reject) => {
			setTimeOut(() => {
				resolve(10)
			}, 500)
		})

		cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro'))
		cy.wrap(promise).then(ret => console.log(ret))
		cy.get('#buttonList').then(() => console.log('Encontrei o segundo'))
		cy.wrap(1).should(num => {
			return 2
		}).should('be.equal', 1)
	})

	it('Its...', () => {
		cons obj = { nome: 'User', idade: 29 }
		cy.wrap(obj).should('have.property', 'nome', 'User')
		cy.wrap(obj).its('nome').should('be.equal', 'User')
		cons obj2 = { nome: 'User', idade: 29, endereco: { rua: 'Wall Street' } }
		cy.wrap(obj2).its('endereco').should('have.property', 'rua')
		cy.wrap(obj2).its('endereco').its('rua').should('contain', 'Wall Street')
		cy.wrap(obj2).its('endereco.rua').should('contain', 'Wall Street')

		cy.visit('https://wcaquino.me/cypress/componentes.html')
		cy.title().its('length').should('be.equal', 20)
	})

	it.only('Invoke...', () => {
		const getValue = () => 1;
		const soma = (a, b) => a + b;

		cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)
		cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7)
	})
})