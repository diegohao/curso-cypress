const locators = {
    LOGIN: {
        USER: '.input-group > .form-control',
        PASSWORDRD: ':nth-child(2) > .form-control',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]'
    },
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        XP_BTN_ALTERAR: "//table//td[contains(., 'Conta de teste')]/..//i[@class='far fa-edit']"
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test=menu-movimentacao] > .fas',
        VALOR: '[data-test=menu-movimentacao] > .fas',
        INTERESSADO: '[data-test=menu-movimentacao] > .fas',
        CONTA_ALTERAR: '[data-test=menu-movimentacao] > .fas'
    },
    MESSAGE: '.toast-message'
}

export default locators;