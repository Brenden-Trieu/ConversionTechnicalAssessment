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
    transform: translateY(100px); /* Hidden state */
    font-family: sans-serif;
    z-index: 9999;
    }

    #bottomDrawer.open {
    transform: translateY(0); /* Shown state */
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

    #drawerContent {
    padding: 20px;
    }
`;
document.head.appendChild(style);

// Remove existing drawer if it already exists
const existing = document.getElementById('bottomDrawer');
if (existing) existing.remove();

// Create drawer element
const drawer = document.createElement('div');
drawer.id = 'bottomDrawer';
drawer.innerHTML = `
    <div id="drawerToggle">
        <span id="chevron">&#9650;</span>
    </div>
    <div id="drawerContent">
    <p>This is the drawer content. You can add anything here.</p>
    </div>
`;
document.body.appendChild(drawer);

// Toggle behavior
const toggleBtn = drawer.querySelector('#drawerToggle');
toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    console.log('Drawer is now', drawer.classList.contains('open') ? 'open' : 'closed');
});