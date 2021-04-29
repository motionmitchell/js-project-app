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
    button.setAttribute("aria-label", `see more details about ${pokemon.name}`);
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#bootstrap-modal");

    listItem.classList.add("group-list-item");
    button.classList.add("btn", "btn-primary");
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

  //   //get the modal
  let myModal = document.getElementById("bootstrap-modal");
  let myInput = document.getElementById("myInput");

  myModal.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });
  let modal = document.getElementById("bootstrap-modal");
  console.log(modal);
  let span = document.getElementsByClassName("btn-close")[0];
  console.log(span);
  let pokemonModalName = document.getElementsByClassName("modal-title")[0];
  let pokemonModalImage = document.getElementsByClassName("modal-image")[0];
  let pokemonModalHeight = document.getElementById("modal-content");
  console.log(pokemonModalName);
  span.onclick = function () {
    modal.style.display = "none";
  };

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      modal.style.display = "block";
      pokemonModalName.setAttribute("aria-label", pokemon.name);
      pokemonModalName.innerText = pokemon.name;
      pokemonModalImage.src = pokemon.imageUrl;
      pokemonModalImage.setAttribute("aria-label", `image of ${pokemon.name}`);
      pokemonModalHeight.innerText = `Pokemon Height: ${pokemon.height}`;
      console.log(pokemon.height);
    });
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
