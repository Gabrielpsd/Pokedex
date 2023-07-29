const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const next = document.querySelector('.btn-next');
const prev = document.querySelector('.btn-prev');

let searchPokemon = Math.random() * 1010;
searchPokemon = Math.floor(searchPokemon);

const fetchPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'carregrando ...';

    const APIResposnse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(APIResposnse.status != 200)
        return;

    const data = await APIResposnse.json();

    return data;
}

const render = async pokemon =>{

    const data = await fetchPokemon(pokemon);

    if(data)
    {
        pokemonName.innerHTML = (data.name);
        pokemonNumber.innerHTML = (data.id);
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }
    else
    {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';

    }

}

render(searchPokemon);

form.addEventListener('submit',(event => {

    event.preventDefault();

    render(input.value.toLowerCase());

    input.value = '';

}));

prev.addEventListener('click', ()=>{

    if(searchPokemon == 1 )
        return;

    searchPokemon--;

    console.log(searchPokemon);
    render(searchPokemon);
})

next.addEventListener('click', ()=>{

    if(searchPokemon == 1010)
        return;

    searchPokemon++;
    

    render(searchPokemon);
})

