// CSS styles
const style = document.createElement("style");
style.innerHTML = `
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.4);
        transition: background 0.4s ease;
    }

    dialog[open] {
        animation: fadeIn 0.4s ease forwards;
    }

    dialog.closing {
        animation: fadeOut 0.3s ease forwards;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }

    .modalContent {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    }

    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100%;
    }

    .close {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }

    .hero-button {
        font-size: 14px;
        padding: 12px 24px;
        color: white;
        background-color: #4b8e3d; /* Regular green */
        border: 2px solid #2e5c24;
        box-shadow: 0px 0px 0 2px #2e5c24;
        cursor: pointer;
        outline: none;
        text-transform: uppercase;
        user-select: none;
    }

    .hero-button:hover {
        background-color: #5da347; /* Hover green */
    }

    .hero-button:focus {
        outline: 2px solid #66ccff; /* Blue focus ring */
        outline-offset: 2px;
    }

    .hero-button:disabled {
        background-color: #e7dcdc;
        color: #aaa;
        border-color: #c5b9b9;
        box-shadow: none;
        cursor: not-allowed;
    }

    .hero-button:active {
        box-shadow: 1px 1px 0 #2e5c24;
        transform: translate(2px, 2px);
    }

    .step-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
    }

    .step-wrapper {
        display: flex;
        align-items: center;
        position: relative;
    }

    .step-line {
        width: 50px;
        height: 3px;
        background-color: #bbb;
        transition: background-color 0.3s ease, width 0.4s ease;
    }

    .step-dot {
        height: 35px;
        width: 35px;
        background-color: #bbb;
        border-radius: 50%;
        transition: background-color 0.3s ease, transform 0.3s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .step-dot.active {
        background-color:rgb(0, 98, 255);
    }

    .step-dot.completed {
        background-color:rgb(0, 98, 255);
    }

    .step-line.active {
        background-color:rgb(0, 98, 255);
    }

    .step-checkmark {
        position: absolute;
        top: -4px;
        right: -4px;
        background: green;
        border-radius: 50%;
        padding: 2px;
        display: none;
    }
    .step-dot.completed .step-checkmark {
        display: block;
    }

    .step-label {
        margin-left: 8px;
        font-weight: normal;
        transition: font-weight 0.2s ease;
    }

    .step-label.active {
        font-weight: bold;
    }

    input {
        border: 1px solid;
    }

    textarea {
        border: 1px solid;
    }

    input[type="checkbox"] {
        width: 16px;
        height: 16px;
        appearance: auto;
        -webkit-appearance: checkbox;
        margin-right: 8px;
        border: none;
    }

    .hs-form-field {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        justify-content: space-evenly;
    }
`;
document.head.appendChild(style);

// Replace form and inject modal content
document.querySelector("#hbspt-form-1746635261000-1695140298").innerHTML = `
    <header>
        <h1>Hello Conversion!</h1>
    </header>
    <p>Click on the button below to contact us</p>
    <div class="header__links--contact" id='formStart'>
        <a class="hero-button" id="showFormModal" href="#">Click here</a>
    </div>
`;

// Modal variables
const dynamicModal = document.querySelectorAll(".contact-form__form")[0];
const modalButton = document.querySelector("#formStart");

// Create initial design of modal
dynamicModal.style.minWidth = "max-content";
dynamicModal.style.maxHeight = "fit-content";
modalButton.style.display = "flex";
modalButton.style.justifyContent = "flex-end";

// add 'glass wall' effect
dynamicModal.style.boxShadow = "0 0 0 100vmax rgba(0, 0, 0, .3)";
dynamicModal.style.zIndex = 9999;

// Apply transition first
dynamicModal.style.transition = "box-shadow 0.5s ease";
// Set initial box-shadow to none (transparent)
dynamicModal.style.boxShadow = "0 0 0 100vmax rgba(0, 0, 0, 0)";
// Force layout reflow to ensure the transition will animate
dynamicModal.offsetHeight;
// Then apply the target shadow (with dim)
dynamicModal.style.boxShadow = "0 0 0 100vmax rgba(0, 0, 0, .3)";

// Modal implementation
const dialog = document.createElement("dialog");
dialog.innerHTML = `
<div class="modal">
    <div class="modalContent">
        <span class="close" id="closeButton">
            <a class="button" id="closeButtonIcon" href="#">&times;</a>
        </span>

        <div class="step-container">
            <div class="step-wrapper">
                <div class="step-dot">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11 10.9794C11 10.4271 11.4477 9.97937 12 9.97937C12.5523 9.97937 13 10.4271 13 10.9794V16.9794C13 17.5317 12.5523 17.9794 12 17.9794C11.4477 17.9794 11 17.5317 11 16.9794V10.9794Z"
                            fill="currentColor"
                        />
                        <path
                            d="M12 6.05115C11.4477 6.05115 11 6.49886 11 7.05115C11 7.60343 11.4477 8.05115 12 8.05115C12.5523 8.05115 13 7.60343 13 7.05115C13 6.49886 12.5523 6.05115 12 6.05115Z"
                            fill="currentColor"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
                <span class="step-label">
                    User Info
                </span>
                <div class="step-line"></div>
            </div>
            <div class="step-wrapper">
                <div class="step-dot">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17 9H7V7H17V9Z" fill="currentColor" />
                        <path d="M7 13H17V11H7V13Z" fill="currentColor" />
                        <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 18V2H22V18H16V22H14C11.7909 22 10 20.2091 10 18H2ZM12 16V18C12 19.1046 12.8954 20 14 20V16H20V4H4V16H12Z"
                        fill="currentColor"
                        />
                    </svg>
                </div>
                <span class="step-label">
                    Inquiry
                </span>
                <div class="step-line"></div>
            </div>
            <div class="step-wrapper">
                <div class="step-dot">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16 13H14C14 14.1046 13.1046 15 12 15C10.8954 15 10 14.1046 10 13H8C8 15.2091 9.79086 17 12 17C14.2091 17 16 15.2091 16 13Z"
                            fill="currentColor"
                        />
                        <path
                            d="M10 10C10 10.5523 9.55228 11 9 11C8.44772 11 8 10.5523 8 10C8 9.44771 8.44772 9 9 9C9.55228 9 10 9.44771 10 10Z"
                            fill="currentColor"
                        />
                        <path
                            d="M15 11C15.5523 11 16 10.5523 16 10C16 9.44771 15.5523 9 15 9C14.4477 9 14 9.44771 14 10C14 10.5523 14.4477 11 15 11Z"
                            fill="currentColor"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
                <span class="step-label">
                    Complete
                </span>
            </div>
        </div>

        <form id="hsForm" novalidate>
            <!-- Step 1 -->
            <div class="form-step step-1">
                <fieldset class="form-columns-2">
                <!-- First Name -->
                <div class="hs-form-field">
                    <label>First name<span class="hs-form-required">*</span></label>
                    <input type="text" name="firstname" required placeholder="First name" />
                </div>
                <!-- Last Name -->
                <div class="hs-form-field">
                    <label>Last name</label>
                    <input type="text" name="lastname" placeholder="Last name" />
                </div>
                </fieldset>
                <fieldset class="form-columns-1">
                <!-- Email -->
                <div class="hs-form-field">
                    <label>Work Email<span class="hs-form-required">*</span></label>
                    <input type="email" name="email" required placeholder="Work email" />
                </div>
                </fieldset>
            </div>

            <!-- Step 2 -->
            <div class="form-step step-2" style="display:none;">
                <fieldset class="form-columns-1">
                    <div class="hs-form-field">
                        <label>How can we help you?</label>
                        <textarea name="help" placeholder="Tell us more about how we can help" required></textarea>
                    </div>
                    <div class="hs-form-field">
                        <label>How did you hear about us?</label>
                        <input type="text" name="referral" placeholder="e.g., Google, LinkedIn" required />
                    </div>
                    <div class="hs-form-field">
                        <input type="checkbox" name="consent" />
                        <label>
                            Yes, I would like to receive updates from Conversion.
                        </label>
                    </div>
                    <br />
                    <div class="hs-form-field">
                    <p>
                        I agree to accept the
                        <a href="https://conversion.com/privacy-policy/" target="_blank">Privacy Terms</a>.
                    </p>
                    </div>
                </fieldset>
            </div>


            <!-- Step 3 -->
            <div class="form-step step-3" style="display:none;text-align:center;">
                <h2>Thank you!</h2>
                <p>Your message has been submitted. We'll get back to you soon.</p>
            </div>

            <!-- Navigation buttons -->
            <div style="overflow:auto;margin-top:20px;">
                <div style="display: flex; justify-content: space-between">
                    <button type="button" id="prevBtn">Previous</button>
                    <button type="button" id="nextBtn">Next</button>
                </div>
            </div>
        </form>
    </div>
</div>
`;
document.body.appendChild(dialog);

// Add checkmark overlays
dialog.querySelectorAll(".step-dot").forEach(dot => {
    const check = document.createElement("span");
    check.className = "step-checkmark";
    check.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
            <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.4-1.4z"/>
        </svg>
    `;
    dot.appendChild(check);
});

document.querySelector("#showFormModal").addEventListener("click", () => {
  dialog.showModal();
});

// Add event listener to close button
const closeButton = document.querySelector("#closeButton");
closeButton.addEventListener("click", () => {
  dialog.classList.add("closing");
  setTimeout(() => {
    dialog.close();
    dialog.classList.remove("closing");
  }, 300); // Match fadeOut duration
});

let currentStep = 0;
const steps = dialog.querySelectorAll(".form-step");
const dotElements = dialog.querySelectorAll(".step-dot");
const lineElements = dialog.querySelectorAll(".step-line");

const showStep = (n) => {
    steps.forEach((step, index) => {
        step.style.display = index === n ? "block" : "none";
    });

    dotElements.forEach((dot, index) => {
        dot.classList.toggle("active", index === n);
        dot.classList.toggle("completed", index < n);
    });

    lineElements.forEach((line, index) => {
        line.classList.toggle("active", index < n);
    });

    const nextBtn = dialog.querySelector("#nextBtn");
    const prevBtn = dialog.querySelector("#prevBtn");
    const labelElements = dialog.querySelectorAll(".step-label");

    labelElements.forEach((label, index) => {
        label.classList.toggle("active", index === n);
    });    

    prevBtn.style.display = n === 0 || n === steps.length - 1 ? "none" : "inline";

    if (n === steps.length - 1) {
        nextBtn.textContent = "Close";
    } else if (n === steps.length - 2) {
        nextBtn.textContent = "Submit";
    } else {
        nextBtn.textContent = "Next";
    }
};

const nextPrev = (n) => {
    const form = dialog.querySelector("#hsForm");
    
    if (currentStep === steps.length - 1) {
        dialog.classList.add("closing");
        setTimeout(() => {
        dialog.close();
        dialog.classList.remove("closing");
        }, 300);
        return;
    }
    
    if (n === 1 && !validateStep()) return;
    
    if (currentStep === 1 && n === 1) {
        const formData = new FormData(form);
        fetch(form.action || 'https://forms-eu1.hsforms.com/submissions/v3/public/submit/formsnext/multipart/9358319/e259701f-aa68-4328-8ebf-013c47468869', {
        method: 'POST',
        body: formData
        })
        .then(response => {
            if (response.ok) {
            currentStep += n;
            showStep(currentStep);
            } else {
            alert("There was a problem submitting the form.");
            }
        })
        .catch(error => {
            console.error("Submission error:", error);
            alert("There was a problem submitting the form.");
        });
        return;
    }
    
    currentStep += n;
    showStep(currentStep);
    };

const validateStep = () => {
    const fields = steps[currentStep].querySelectorAll("input, textarea");
    let valid = true;

    fields.forEach((field) => {
    if (field.hasAttribute("required") && !field.value.trim()) {
        field.style.borderColor = "red";
        valid = false;
    } else {
        field.style.borderColor = "";
    }
    });

    if (valid) {
        dotElements[currentStep].classList.add("active");
        if (currentStep < lineElements.length) {
            lineElements[currentStep].classList.add("active");
        }
    }

    return valid;
};

dialog.querySelector("#nextBtn").addEventListener("click", () => nextPrev(1));
dialog.querySelector("#prevBtn").addEventListener("click", () => nextPrev(-1));
showStep(currentStep);
