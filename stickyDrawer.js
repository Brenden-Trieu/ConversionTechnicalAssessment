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
  *, *::before, *::after {
    box-sizing: border-box;
  }

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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: #007bff;
    color: white;
    padding: 20px;
    cursor: pointer;
    font-size: 18px;
    position: relative;
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

  #gliderCounter {
    font-size: 14px;
    font-weight: bold;
    color: white;
  }

  .drawerSlide {
    color: #000;
    position: relative;
    background: #f5f5f5;
    padding: 16px;
    padding-bottom: 40px;
    margin-bottom: 20px;
    border-radius: 8px;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
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

  .glider-next {
    margin-right: 20px;
  }

  .glider-prev {
    margin-left: 20px;
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
    color: #000;
  }

  .flip-back {
    background: #e0e0e0;
    color: #000;
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

  /* Responsive Layout */
  @media (max-width: 767px) {
    .glider-contain {
      padding: 0 10px 20px;
    }

    .glider {
      gap: 0.5rem;
    }

    .drawerSlide {
      width: 90%;
      margin-bottom: 10px;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .glider-contain {
      padding: 0 20px 20px;
    }

    .glider {
      gap: 1rem;
    }

    .drawerSlide {
      width: 45%;
      margin-bottom: 10px;
    }
  }

  @media (min-width: 1024px) {
    .glider-contain {
      padding: 0 20px 20px;
    }

    .glider {
      gap: 1rem;
    }

    .drawerSlide {
      width: 280px;
      margin-bottom: 20px;
    }
  }

  .tooltip {
    visibility: hidden;
    width: 220px;
    background-color: #333 !important;
    color: #fff;
    text-align: left;
    border-radius: 6px;
    padding: 8px;
    position: absolute;
    z-index: 10000;
    top: 10px;
    left: 50%;
    transform: translateX(-50%) translateY(5px);
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    font-size: 13px;
    pointer-events: none;
  }

  .drawerSlide:hover .tooltip {
    visibility: visible !important;
    opacity: 1 !important;
    transform: translateX(-50%) translateY(0);
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
    <button class="glider-prev" aria-label="Previous">&laquo;</button>
    <span id="gliderCounter">Page 1 of ?</span>
    <button class="glider-next" aria-label="Next">&raquo;</button>
  </div>
  <div id="drawerContent">
    <div class="glider-contain">
      <div class="glider"></div>
    </div>
  </div>
`;
document.body.appendChild(drawer);

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // If scrolled to the bottom and drawer is open, close it
  if (scrollPosition >= documentHeight - 2 && drawer.classList.contains('open')) {
    drawer.classList.remove('open');
    console.log('Drawer closed on scroll to bottom');
  }
});

// Toggle behavior
const toggleBtn = drawer.querySelector('#drawerToggle');
toggleBtn.addEventListener('click', (e) => {
  const isArrow = e.target.closest('.glider-prev, .glider-next');
  if (!isArrow) {
    drawer.classList.toggle('open');
    console.log('Drawer is now', drawer.classList.contains('open') ? 'open' : 'closed');
  }
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
  const gliderTrack = drawer.querySelector('.glider');

  // Fetch list of Pokémon
  const listOfData = await dataFetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=983');
  const urls = listOfData.results.map(item => item.url);

  // Fetch all Pokémon details
  const pokemonResults = await Promise.all(urls.map(async url => {
    const pokemonData = await dataFetch(url);
    const speciesData = await dataFetch(pokemonData.species.url);
    return { pokemonData, speciesData };
  }));

  // Build slide elements
  pokemonResults.forEach(({ pokemonData, speciesData }) => {
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
      <div class="tooltip">${flavorText}</div>
    `;

    const container = slide.querySelector('.flip-container');
    slide.querySelectorAll('.flipCard').forEach(btn => {
      btn.addEventListener('click', () => {
        container.classList.toggle('flipped');
      });
    });

    gliderTrack.appendChild(slide);
  });

  // Wait for layout
  requestAnimationFrame(() => {
    setTimeout(() => {
      const counter = drawer.querySelector('#gliderCounter');

      const gliderSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        arrows: {
          prev: drawer.querySelector('.glider-prev'),
          next: drawer.querySelector('.glider-next')
        },
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4
            }
          }
        ]
      };

      const glider = new Glider(gliderTrack, gliderSettings);

      const totalSlides = glider.slides.length;
      const totalPages = Math.ceil(totalSlides / glider.opt.slidesToScroll);
      counter.textContent = `Page 1 of ${totalPages}`;

      const gliderContain = drawer.querySelector('.glider-contain');
      gliderContain.addEventListener('glider-slide-visible', function (event) {
        const currentPage = Math.floor(event.detail.slide / glider.opt.slidesToScroll) + 1;
        counter.textContent = `Page ${currentPage} of ${totalPages}`;
      });
    }, 0);
  });
}


gliderScript.onload = () => {
  loadSlides();
};

