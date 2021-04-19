let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(item) {
    if (typeof item === "object") {
      pokemonList.push(item);
    } else alert("not possible");
  }

  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let listPokemon = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(listItem);
    listItem.appendChild(button);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (json) {
        console.log(json);
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });

        console.log(pokemonList);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  //get the modal
  let modal = document.getElementById("mymodal");

  let span = document.getElementsByClassName("close"){0};

  modal.style.display = "block";

  span.onclick = function() {
modal.style.display = "none";
  }

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();
pokemonRepository.loadList().then(function () {
  let list = pokemonRepository.getAll();
  list.forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
// pokemonRepository.loadList().then(function(){
// pokemonRepository.getAll().forEach(function(pokemon){
// pokemonRepository.addListItem(pokemon);
// });
