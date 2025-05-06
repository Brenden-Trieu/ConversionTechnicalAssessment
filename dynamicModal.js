// Replace form and inject modal content
document.querySelector("#hbspt-form-1746476489000-1525090073").innerHTML = `
    <header>
        <h1>Hello Conversion!</h1>
    </header>
    <p>Click on the button below to contact us</p>
    <div class="header__links--contact" id='formStart'>
        <a class="button" id="showFormModal" href="#">Click here</a>
    </div>
`;

// Modal variables
const dynamicModal = document.querySelectorAll('.contact-form__form')[0];
const modalButton = document.querySelector('#formStart');

// Create initial design of modal
dynamicModal.style.minWidth = 'max-content';
dynamicModal.style.maxHeight = 'fit-content';
modalButton.style.display = 'flex';
modalButton.style.justifyContent = 'flex-end';

// add 'glass wall' effect
dynamicModal.style.boxShadow = '0 0 0 100vmax rgba(0, 0, 0, .3)';
dynamicModal.style.zIndex = 9999;

// Apply transition first
dynamicModal.style.transition = 'box-shadow 0.5s ease';
// Set initial box-shadow to none (transparent)
dynamicModal.style.boxShadow = '0 0 0 100vmax rgba(0, 0, 0, 0)';
// Force layout reflow to ensure the transition will animate
dynamicModal.offsetHeight; // This line is necessary
// Then apply the target shadow (with dim)
dynamicModal.style.boxShadow = '0 0 0 100vmax rgba(0, 0, 0, .3)';

// Modal implementation
const dialog = document.createElement('dialog');
dialog.innerHTML = `
    <div class="modal">
        <div class="modalContent">
        <span class="close" id="closeButton">
            <a class="button" id="closeButtonIcon" href="#">&times;</a>
        </span>
            <p>Some text in the Modal..</p>
        </div>
    </div>
`;
document.body.appendChild(dialog);

document.querySelector('#showFormModal').addEventListener('click', () => {
    dialog.showModal();
})

// Add event listener to close button
const closeButton = document.querySelector('#closeButton');
closeButton.addEventListener('click', () => {
  dialog.close();
});
