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
      cy.route({
        method: 'POST',
        url: '/contas',
        response: { "error": "Já existe uma conta com esse nome!" },
        status: 400
      }).as('saveContaMesmoNome')
      
      cy.acessarMenuConta()
      
      cy.inserirConta('Conta mesmo nome')
      cy.get(loc.CONTAS.BTN_SALVAR).click()
      cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
      cy.route({
        method: 'POST',
        url: '/transacoes',
        response: { id:2,descricao:'desc',envolvido:'int',observacao:null,tipo:'REC',data_transacao:'2020-04-20T03:00:00.000Z',data_pagamento:'2020-04-20T03:00:00.000Z',valor:'0.05',status:false,conta_id:2,usuario_id:1,transferencia_id:null,parcelamento_id:null }
      })
        
      cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: [
          {conta:'Conta para movimentacoes',id:91355,descricao:'Movimentacao para exclusao',envolvido:'AAA',observacao:null,tipo:'DESP',data_transacao:'2020-04-20T03:00:00.000Z',data_pagamento:'2020-04-20T03:00:00.000Z',valor:'-1500.00',status:true,conta_id:108548,usuario_id:9638,transferencia_id:null,parcelamento_id:null},
          {conta:'Conta com movimentacao',id:91356,descricao:'Movimentacao de conta',envolvido:'BBB',observacao:null,tipo:'DESP',data_transacao:'2020-04-20T03:00:00.000Z',data_pagamento:'2020-04-20T03:00:00.000Z',valor:'-1500.00',status:true,conta_id:108549,usuario_id:9638,transferencia_id:null,parcelamento_id:null},
          {conta:'Conta para saldo',id:91357,descricao:'Movimentacao 1, calculo saldo',envolvido:'CCC',observacao:null,tipo:'REC',data_transacao:'2020-04-20T03:00:00.000Z',data_pagamento:'2020-04-20T03:00:00.000Z',valor:'3500.00',status:false,conta_id:108550,usuario_id:9638,transferencia_id:null,parcelamento_id:null},
          {conta:'Conta para saldo',id:91358,descricao:'Movimentacao 2, calculo saldo',envolvido:'DDD',observacao:null,tipo:'DESP',data_transacao:'2020-04-20T03:00:00.000Z',data_pagamento:'2020-04-20T03:00:00.000Z',valor:'-1000.00',status:true,conta_id:108550,usuario_id:9638,transferencia_id:null,parcelamento_id:null},
          {conta:'Conta para saldo',id:91359,descricao:'Movimentacao 3, calculo saldo',envolvido:'EEE',observacao:null,tipo:'REC',data_transacao:'2020-04-20T03:00:00.000Z',data_pagamento:'2020-04-20T03:00:00.000Z',valor:'1534.00',status:true,conta_id:108550,usuario_id:9638,transferencia_id:null,parcelamento_id:null},
          {conta:'Conta para extrato',id:91360,descricao:'Movimentacao para extrato',envolvido:'FFF',observacao:null,tipo:'DESP',data_transacao:'2020-04-20T03:00:00.000Z',data_pagamento:'2020-04-20T03:00:00.000Z',valor:'-220.00',status:true,conta_id:108551,usuario_id:9638,transferencia_id:null,parcelamento_id:null}
        ]
      })
      
      cy.get(loc.MENU.MOVIMENTACAO).click()
      
      cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
      cy.get(loc.MOVIMENTACAO.VALOR).type('123')
      cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
      cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
      cy.get(loc.MOVIMENTACAO.STATUS).click()
      cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
      cy.get(loc.MESSAGE).should('contain', 'sucesso')
        
      cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
      cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('Should get balance', () => {
    })
    
    it('Should remove a transaction', () => {
    })
})
