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
    transform: translateY(100px);
    font-family: sans-serif;
    z-index: 9999;
    max-height: 60vh;
    overflow-y: auto;
  }

  #bottomDrawer.open {
    transform: translateY(0);
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
    min-width: 280px;
    background: #f5f5f5;
    padding: 16px;
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
    const slide = document.createElement('div');
    slide.className = 'drawerSlide';
    slide.innerHTML = `<h3>Loading...</h3>`;
    gliderTrack.appendChild(slide);

    const data = await dataFetch(url);
    slide.innerHTML = `
      <h3>${data.name}</h3>
      <img src="${data.sprites.front_default}" alt="${data.name}" width="100" />
    `;
  }

  // Initialize Glider after content loads
  new Glider(gliderTrack, {
    slidesToShow: 3,
    slidesToScroll: 3,
    draggable: true,
    arrows: {
      prev: drawer.querySelector('.glider-prev'),
      next: drawer.querySelector('.glider-next')
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}

loadSlides();
