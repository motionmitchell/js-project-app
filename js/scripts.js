//1.5 update down//

let pokemonRepository= (function(){
  let pokemonList = [];

  let pokemon = "";
  
  //1.5 update up//

let pokemonList = [
  { name: "bulbasaur", height: .6, type: ["grass"] },
  { name: "Charmeleon", height: .6, type: ["fire"] },
  { name: "squirtle", height: 0.7, type: ["water"] }
];
//This is the newst code for 1.5 down//

function add(item){
  if(typeof item === "object"){
  pokemonList.push(item)
 }
 else alert("not possible")
};

function getAll(){
  return pokemonList
}
function addListItem(pokemon){
  let listPokemon = document.querySelector(".pokemon-list");
  let listItem = document.createElement("li")
   let button = document.createElement("button");
    button.innerText= pokemon.name ;
    button.classList.add(".button-class")
   listPokemon.appendChild(listItem);
   listItem.appendChild(button);

   button.addEventListener("click",function(event){
       showDetails(pokemon)
   });
  }
function showDetails(pokemon){
   console.log(pokemon.name)
}

return {
  add: add,
  getAll: getAll,
  addListItem:addListItem
}

})();

function findWater(user){
if(user.type === "water"){
  return user
}
}


pokemonRepository.getAll().forEach(function(pokemon){
pokemonRepository.addListItem(pokemon);
});


let dragons=pokemonRepository.getAll().filter(findWater);


//Newest code for 1.5 up//