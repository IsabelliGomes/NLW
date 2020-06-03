
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

  fetch(urlCities)
    .then ( res => res.json () )
    .then ( cities => {
      for(let city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
      }
      citySelect.disabled = false
    } )
}

document
  .querySelector ("select[name=uf]")
  .addEventListener ("change", getCities)
  