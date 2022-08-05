
botoesHeader(produtos)
function botoesHeader(arr) {
    const secaoBotoes = document.querySelector("#botoesContainer")
    secaoBotoes.addEventListener("click", (event) => {
        let nomeBotao = event.target.innerText
        let secao = arr.filter((element) => { return element.secao == nomeBotao })
        let todos = arr.filter((element) => { return element })
        if (secao.length > 0) {
            listarProdudos(secao, criaCardProduto)
        } else if (secao.length == 0) {
            listarProdudos(todos, criaCardProduto)
        }
    })
};

pesquisarInteceptar(produtos)
function pesquisarInteceptar(arr) {
    const buscarVitrine = document.querySelector(".campoBuscaPorNome")

    buscarVitrine.addEventListener("input", (event) => {
        let valorPesquisa = event.target.value.toLowerCase().trim()
        let verificarPesquisa = arr.filter((element) => {
            return element.nome.toLowerCase().includes(valorPesquisa) ||
                element.secao.toLowerCase().includes(valorPesquisa) ||
                element.categoria.toLowerCase().includes(valorPesquisa)
        })
        listarProdudos(verificarPesquisa, criaCardProduto)
    })
};


listarProdudos(produtos, criaCardProduto);
function listarProdudos(arr, callback) {
    const divContainerUl = document.querySelector(".containerListaProdutos")
    const ul = divContainerUl.querySelector("ul")


    ul.innerHTML = ""
    let pendurandoCard = arr.forEach((element) => { ul.append(callback(element)) })

};

const itensCarrinho = []

function criaCardProduto(arr) {
    const li = document.createElement("li")
    const img = document.createElement("img")
    const h3 = document.createElement("h3")
    const secao = document.createElement("p")
    const componentes = document.createElement("ol")
    const footerCard = document.createElement("div")
    const preco = document.createElement("span")
    const comprar = document.createElement("button")
    const liComp = arr.componentes.map((elem) => {
        let componentesSelecionados = document.createElement("li")
        componentesSelecionados.innerText = elem
        componentes.append(componentesSelecionados)
    })

    img.src = arr.img
    h3.innerText = arr.nome
    secao.innerText = arr.secao
    preco.innerText = arr.preco
    comprar.innerText = "Comprar"
    comprar.setAttribute("id", arr.id)

    comprar.addEventListener('click', (event) => {
        if (event.target.id == arr.id) {
            criarCardCarrinho(arr)
        }

    })

    footerCard.append(preco, comprar)
    li.append(img, h3, secao, componentes, footerCard)
    return li
};



function criarCardCarrinho(arr) {

    const li = document.createElement("li")
    const divCarrinho = document.createElement("div")
    const imgProduto = document.createElement("img")
    const divDescricao = document.createElement("div")
    const h3 = document.createElement("h3")
    const secaoSpan = document.createElement("span")
    const precoProdt = document.createElement("p")
    const divRemover = document.createElement("div")
    const imgLixeira = document.createElement("img")


    divCarrinho.classList.add("carrinho--content")
    divRemover.classList.add("carrinho--remover")

    let { id, nome, preco, secao, categoria, img, precoPromocao } = arr

    li.setAttribute("id", id)
    h3.innerText = nome
    imgProduto.src = img
    secaoSpan.innerText = secao
    precoProdt.innerText = preco
    imgLixeira.src = "./src/img/cesto-de-lixo.png"

    divRemover.append(imgLixeira)
    divDescricao.append(h3, secaoSpan, precoProdt)
    divCarrinho.append(imgProduto, divDescricao)
    li.append(divCarrinho, divRemover)
    listandoCardCarrinho(li, arr, divRemover)
}

function listandoCardCarrinho(liCard, arr, removerLi) {
    const ulCarrinho = document.querySelector(".carrinho")

    const removerCarrinhoVazio = document.querySelector('.carrinho--vazio')
    
    if(removerCarrinhoVazio){
        removerCarrinhoVazio.remove()
    }

    console.log(removerCarrinhoVazio)

    ulCarrinho.append(liCard)
    itensCarrinho.push(liCard)

    verificarCarrinhoVazio(itensCarrinho)

    quantidadeItensCarrinho(itensCarrinho.length)
    removerItensCarrinho(arr, removerLi, liCard)
}

function removerItensCarrinho(arr, remover, card) {

    remover.addEventListener('click', () => {
        let index = () => {
            let indexInterno = 0
            for (let i = 0; i < itensCarrinho.length; i++) {
                if (itensCarrinho[i] === card) {
                    indexInterno += i
                }
            }
            return indexInterno
        }

        itensCarrinho.splice(index(), 1)
        quantidadeItensCarrinho(itensCarrinho.length)
        card.remove()
        verificarCarrinhoVazio(itensCarrinho)

    })
}

function quantidadeItensCarrinho(value) {
    const quantidade = document.querySelector('.quantidade')
    quantidade.innerText = value
    somaItensCarrinho()
}

function somaItensCarrinho() {
    const valorTotal = document.querySelector(".carrinho__total--value")

    let valor = 0
    let receber = []
    itensCarrinho.forEach((elem) => { receber.push(parseInt(elem.querySelector('p').innerText)) })
    receber.forEach((elem) => { valor += elem })

    valorTotal.innerText = `R$ ${valor},00`
}

verificarCarrinhoVazio(itensCarrinho)

function verificarCarrinhoVazio(value) {
    const carrinho          = document.querySelector('.carrinho') 
    const quantidadeValor   = document.querySelector('.carrinho--total')

    const divContainer      = document.createElement("div")
    const divCarrinhoVazio  = document.createElement('div')
    const imgSacola         = document.createElement('img')
    const textCarrinhoVazio = document.createElement('p')

    divContainer.classList.add('carrinho--vazio')
    divCarrinhoVazio.classList.add('carrinho__vazio--container')


    imgSacola.src               = "./src/img/sacola-de-compras.png"
    textCarrinhoVazio.innerText = 'Por enquanto não temos produtos no carrinho'

    divCarrinhoVazio.append(imgSacola, textCarrinhoVazio)
    divContainer.append(divCarrinhoVazio)


    if(value.length == 0){
        quantidadeValor.classList.add("none")
        carrinho.innerHTML = ""
        carrinho.append(divContainer)
    }else {
        quantidadeValor.classList.remove("none")
    }
}