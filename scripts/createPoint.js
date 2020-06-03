
//Dados de Entidade
function populateUFs () {
  const ufSelect = document.querySelector ("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    // formato normal: .then ( (res) => { return res.json () })
    .then ( res => res.json () ) //formato compacto
    .then ( states => {
      //`${}` = interpolação
      for(let state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    } )
}

populateUFs ()

function getCities (event) {
  const citySelect = document.querySelector ("select[name=city]")
  const stateInput = document.querySelector ("input[name=state]")

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options [indexOfSelectedState].text

  const uFValue = event.target.value
  const urlCities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uFValue}/municipios`

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true

  fetch(urlCities)
    .then ( res => res.json () )
    .then ( cities => {
      for(let city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }
      citySelect.disabled = false
    } )
}

document
  .querySelector ("select[name=uf]")
  .addEventListener ("change", getCities)


//Ítens de Coleta
// Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (let item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}
const collectedItens = document.querySelector ("input[name=itens]")
let selectedItems = []

function handleSelectedItem (event) {
  const itemLi = event.target

  //toggle = Adicionar ou remover uma classe de acordo com o modo atual
  //add = Só adicionar / remove = Só remover
  itemLi.classList.toggle ("selected")

  const itemId = event.target.dataset.id

  //Verificar se existem items selecionados, se sim pegar itens selecionados
  const alreadySelected = selectedItems.findIndex ( item => {
    return item == itemId //== : comparação
  }) //Forma reduzida: item => item == itemId

  // se já estiverem selecionados, remover a seleção
  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter (item => item != itemId)
    selectedItems = filteredItems
  }

  // se n estiver selecionados, adicionar à seleção
  else {
    selectedItems.push (itemId)
  }

  // atualizar o campo escondido com os itens selecionados
  collectedItens.value = selectedItems
}