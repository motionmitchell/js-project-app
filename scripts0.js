let pokemonList = [
  { name: "bulbasaur", height: 7, type: ["grass"] },
  { name: "Charmeleon", height: 1.1, type: ["fire"] },
  { name: "squirtle", height: 0.5, type: ["water"] }
];
//this is an edit commit//

let pokemonSizeThreshold = 0.7;

for(let i = 0; i <= pokemonList.length; i++){
    let pokemonString = `${pokemonList[i].name} ( Height: ${ pokemonList[i].height} )`;
    let pokeman = pokemonList[i].height >= pokemonSizeThreshold ? `<p> ${pokemonString} - Wow, that’s big! </p>` : `<p> ${pokemonString} </p>`;
    document.write(pokeman);