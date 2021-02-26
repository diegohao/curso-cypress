it('sem testes ainda', () => { })

const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000);
    })
}

const System = () => {
    console.log('Init');
    getSomething().then(some => {
        console.log(`Something is ${some}`)
    })
    console.log('End')
}

System();