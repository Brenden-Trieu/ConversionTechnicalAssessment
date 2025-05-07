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

  /* Make circles that indicate the steps of the form: */
    .step {
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbbbbb;
        border: none;
        border-radius: 50%;
        display: inline-block;
        opacity: 0.5;
    }

      /* Mark the active step: */
    .step.active {
        opacity: 1;
    }

    /* Mark the steps that are finished and valid: */
    .step.finish {
        background-color: #04aa6d;
    }
`;
document.head.appendChild(style);

// Replace form and inject modal content
document.querySelector("#hbspt-form-1746555701000-3108487564").innerHTML = `
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

      <div style="text-align:center;margin-top:20px;">
        <span class="step"></span>
        <span class="step"></span>
        <span class="step"></span>
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
            <!-- Message -->
            <div class="hs-form-field">
              <label>How can we help you?</label>
              <textarea name="help" placeholder="Tell us more about how we can help"></textarea>
            </div>
          </fieldset>
          <fieldset class="form-columns-1">
            <!-- Referral -->
            <div class="hs-form-field">
              <label>How did you hear about us?</label>
              <input type="text" name="referral" placeholder="e.g., Google, LinkedIn" />
            </div>
          </fieldset>
        </div>

        <!-- Step 3 -->
        <div class="form-step step-3" style="display:none;">
          <fieldset class="form-columns-1">
            <!-- Checkbox -->
            <div class="hs-form-field">
              <label>
                <input type="checkbox" name="consent" />
                Yes, I would like to receive updates from Conversion.
              </label>
            </div>
          </fieldset>
          <div class="hs-form-field">
            <p>
              I agree to accept the
              <a href="https://conversion.com/privacy-policy/" target="_blank">Privacy Terms</a>.
            </p>
          </div>
        </div>

        <!-- Navigation buttons -->
        <div style="overflow:auto;margin-top:20px;">
          <div style="float:right;">
            <button type="button" id="prevBtn">Previous</button>
            <button type="button" id="nextBtn">Next</button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

document.body.appendChild(dialog);

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
const stepIndicators = dialog.querySelectorAll(".step");

const showStep = (n) => {
  steps.forEach((step, index) => {
    step.style.display = index === n ? "block" : "none";
    stepIndicators[index].classList.toggle("active", index === n);
  });

  dialog.querySelector("#prevBtn").style.display = n === 0 ? "none" : "inline";
  const nextBtn = dialog.querySelector("#nextBtn");
  nextBtn.textContent = n === steps.length - 1 ? "Submit" : "Next";
};

const nextPrev = (n) => {
  if (n === 1 && !validateStep()) return;

  currentStep += n;

  if (currentStep >= steps.length) {
    dialog.querySelector("#hsForm").submit();
    return;
  }

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

  if (valid) stepIndicators[currentStep].classList.add("finish");
  return valid;
};

dialog.querySelector("#nextBtn").addEventListener("click", () => nextPrev(1));
dialog.querySelector("#prevBtn").addEventListener("click", () => nextPrev(-1));
showStep(currentStep);
