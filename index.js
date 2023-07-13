const getPokemon = async() => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const pokeData = await response.json();

    return pokeData.results;
};

const render = (pokeArray) => {
    const pokeToLi = pokeArray.map((singlePokemon) => {
        const urlSplit = singlePokemon.url.split('/');
        const pokeID = urlSplit[6]
        return `<a href='' data-number='${pokeID}'><li>${singlePokemon.name}</li></a>`;
    }).join('');
    
    const ul = document.querySelector('ul');
    ul.innerHTML = pokeToLi;
};

const linkListeners = () => {
    const pokeLinks = document.querySelectorAll('a');
    for (let i = 0; i < pokeLinks.length; i++) {
        const singlePokelink = pokeLinks[i];
        singlePokelink.addEventListener('click', async(event) => {
            event.preventDefault();
            const pokeNum = singlePokelink.dataset.number;
            const linkResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`);
            const linkData = await linkResponse.json();
            const section = document.querySelector('section');
            section.innerText = JSON.stringify(linkData, null, 2);
        });
    };
};

const init = async() => {
    render(await getPokemon());
    linkListeners();
};

init();