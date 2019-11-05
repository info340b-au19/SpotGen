// Fetch API data
let url = 'https://pokeapi.co/api/v2/pokemon/ditto';

async function getData() {
    let data = await fetch(url);
    const json = await data.json();
    console.log(json);
    let pokemon = json.forms[0].name;
    let name = json.abilities[0].ability.name;
    let weight = json.weight;
    let baseExperience = json.base_experience;
    let ability = json.abilities[1].ability.name;
    console.log('Hello! ' + 'My name is ' + pokemon);
    console.log('I am an ' + name + ' who is ' + weight + ' pounds with '
    + baseExperience + ' base experience' );
    console.log('My ability is ' + ability);
    return weight;
}

let content = getData();

console.log('hello' + content);

// function test() {
//     let ability = content.abilities;
//     console.log(ability);
// }

// test();
