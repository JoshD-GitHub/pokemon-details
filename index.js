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

            const ulReset = document.querySelector('ul');
            ulReset.innerHTML = '';

            const section = document.querySelector('section');

            const h1 = document.createElement('h1');
            h1.innerText = linkData.name;
            section.appendChild(h1);
            
            const img = document.createElement('img');
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNum}.png`;
            section.appendChild(img);

            const br = document.createElement('br');
            section.appendChild(br);
            
            const button = document.createElement('button');
            button.innerText = 'Go Back';
            section.appendChild(button);
            
            buttonListener();
        });
    };
};

const buttonListener = () => {
    const button = document.querySelector('button');
    button.addEventListener('click', () => {
        const sectionReset = document.querySelector('section');
        sectionReset.innerHTML = '';
        init();
    });
};

const init = async() => {
    render(await getPokemon());
    linkListeners();
};

init();