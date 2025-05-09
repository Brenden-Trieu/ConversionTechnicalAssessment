// 1. Inject styles and Glider.js
const gliderCss = document.createElement('link');
gliderCss.rel = 'stylesheet';
gliderCss.href = 'https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.css';
document.head.appendChild(gliderCss);

const gliderScript = document.createElement('script');
gliderScript.src = 'https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.js';
document.head.appendChild(gliderScript);

// Add styles
const style = document.createElement('style');
style.textContent = `
  #bottomDrawer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid #ccc;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.3);
    transition: transform 0.4s ease;
    transform: translateY(85%);
    font-family: sans-serif;
    z-index: 9999;
    max-height: 60vh;
    overflow-y: hidden;
  }

  #bottomDrawer.open {
    transform: translateY(0);
    overflow-y: auto;
  }

  #drawerToggle {
    text-align: center;
    background: #007bff;
    color: white;
    padding: 20px;
    cursor: pointer;
    font-size: 18px;
  }

  #chevron {
    display: inline-block;
    transition: transform 0.4s ease;
  }

  #bottomDrawer.open #chevron {
    transform: rotate(180deg);
  }

  .glider-contain {
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    padding: 0 20px 20px;
  }

  .glider {
    display: flex;
    gap: 1rem;
  }

  .drawerSlide {
    position: relative;
    min-width: 280px;
    background: #f5f5f5;
    padding: 16px;
    padding-bottom: 40px;
    margin-bottom: 20px;
    border-radius: 8px;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
    overflow: hidden;
  }

  .glider-prev, .glider-next {
    background: #007bff;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    margin: 10px;
  }

  .flip-container {
    perspective: 1000px;
  }

  .flip-inner {
    position: relative;
    width: 100%;
    height: 250px;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-container.flipped .flip-inner {
    transform: rotateY(180deg);
  }

  .flip-front, .flip-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 8px;
  }

  .flip-front {
    background: #f5f5f5;
  }

  .flip-back {
    background: #e0e0e0;
    transform: rotateY(180deg);
  }

  .flipCard {
    align-items: center;
    background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
    border: 0;
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    box-sizing: border-box;
    color: #FFFFFF;
    display: flex;
    font-family: Phantomsans, sans-serif;
    font-size: 20px;
    justify-content: center;
    line-height: 1em;
    max-width: 100%;
    min-width: 140px;
    padding: 3px;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    cursor: pointer;
  }

  .flipCard:active,
  .flipCard:hover {
    outline: 0;
  }

  .flipCard span {
    background-color: rgb(5, 6, 45);
    padding: 16px 24px;
    border-radius: 6px;
    width: 100%;
    height: 100%;
    transition: 300ms;
  }

  .flipCard:hover span {
    background: none;
  }

  @media (min-width: 768px) {
    .flipCard {
      font-size: 24px;
      min-width: 196px;
    }
  }
}
`;
document.head.appendChild(style);

// Remove existing drawer if present
const existing = document.getElementById('bottomDrawer');
if (existing) existing.remove();

// Create drawer
const drawer = document.createElement('div');
drawer.id = 'bottomDrawer';
drawer.innerHTML = `
  <div id="drawerToggle">
    <span id="chevron">&#9650;</span>
  </div>
  <div id="drawerContent">
    <div class="glider-contain">
      <button class="glider-prev" aria-label="Previous">&laquo;</button>
      <div class="glider"></div>
      <button class="glider-next" aria-label="Next">&raquo;</button>
    </div>
  </div>
`;
document.body.appendChild(drawer);

// Toggle behavior
const toggleBtn = drawer.querySelector('#drawerToggle');
toggleBtn.addEventListener('click', () => {
  drawer.classList.toggle('open');
  console.log('Drawer is now', drawer.classList.contains('open') ? 'open' : 'closed');
});

// Fetch data function
async function dataFetch(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("error at fetch");
  } 
  return await response.json();
}

// Load and display slides
async function loadSlides() {
  const listOfData = await dataFetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=983');
  const urls = listOfData.results.map(item => item.url);
  const gliderTrack = drawer.querySelector('.glider');

  for (const url of urls) {
    const pokemonData = await dataFetch(url); // sprite, etc.
    const speciesData = await dataFetch(pokemonData.species.url); // flavor text
    const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || 'No description available.';

    const slide = document.createElement('div');
    slide.className = 'drawerSlide';
    slide.innerHTML = `
      <div class="flip-container">
        <div class="flip-inner">
          <div class="flip-front">
            <h3>${pokemonData.name}</h3>
            <p>${flavorText}</p>
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" width="100" />
            <button class="flipCard">Flip Card</button>
          </div>
          <div class="flip-back">
            <h3>${pokemonData.name} (Back)</h3>
            <p>Height: ${pokemonData.height}</p>
            <p>Weight: ${pokemonData.weight}</p>
            <button class="flipCard">Back</button>
          </div>
        </div>
      </div>
    `;

    const container = slide.querySelector('.flip-container');
    const buttons = slide.querySelectorAll('.flipCard');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        container.classList.toggle('flipped');
      });
    });

    gliderTrack.appendChild(slide);
  }

  // Initialize Glider after all slides are added
  new Glider(gliderTrack, {
    slidesToShow: 4,
    slidesToScroll: 3,
    draggable: true,
    arrows: {
      prev: drawer.querySelector('.glider-prev'),
      next: drawer.querySelector('.glider-next')
    }
  });
}

loadSlides();


