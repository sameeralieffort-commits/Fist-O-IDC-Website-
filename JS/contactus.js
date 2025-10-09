const phoneInput = document.querySelector("#mobileInput");
const iti = window.intlTelInput(phoneInput, {
    initialCountry: "in",
    preferredCountries: ["in", "us", "gb"],
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    // Add this option to disable formatting
    formatOnDisplay: false,
    autoFormat: false,
    nationalMode: false
});

// MOST AGGRESSIVE METHOD: Continuous monitoring
let isProcessing = false;

// Monitor and clean the input continuously
const cleanInput = () => {
    if (isProcessing) return;
    isProcessing = true;
    
    const start = phoneInput.selectionStart;
    const end = phoneInput.selectionEnd;
    const oldValue = phoneInput.value;
    const newValue = oldValue.replace(/\D/g, '');
    
    if (oldValue !== newValue) {
        phoneInput.value = newValue;
        
        // Restore cursor position
        const diff = oldValue.length - newValue.length;
        phoneInput.setSelectionRange(
            Math.max(0, start - diff),
            Math.max(0, end - diff)
        );
    }
    
    isProcessing = false;
};

// Run cleanup every 10ms (very aggressive)
setInterval(cleanInput, 10);

// Keydown prevention
phoneInput.addEventListener('keydown', function(e) {
    const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 
        'Tab', 'Home', 'End', 'Enter', 'Escape'
    ];
    
    if (allowedKeys.includes(e.key)) {
        return true;
    }
    
    if (e.ctrlKey || e.metaKey) {
        return true;
    }
    
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    }
}, true); // Use capture phase

// Keypress prevention
phoneInput.addEventListener('keypress', function(e) {
    const charCode = e.which || e.keyCode;
    if (charCode < 48 || charCode > 57) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    }
}, true); // Use capture phase

// Input event
phoneInput.addEventListener('input', function(e) {
    cleanInput();
}, true);

// Paste handling
phoneInput.addEventListener('paste', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const pastedData = (e.clipboardData || window.clipboardData).getData('text');
    const numericOnly = pastedData.replace(/\D/g, '');
    
    const start = this.selectionStart;
    const end = this.selectionEnd;
    const currentValue = this.value;
    
    const newValue = currentValue.substring(0, start) + numericOnly + currentValue.substring(end);
    this.value = newValue;
    
    const newCursorPos = start + numericOnly.length;
    this.setSelectionRange(newCursorPos, newCursorPos);
}, true);

// Drop handling
phoneInput.addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedData = e.dataTransfer.getData('text');
    const numericOnly = droppedData.replace(/\D/g, '');
    
    this.value = numericOnly;
}, true);

// Update mobile label position
phoneInput.addEventListener('focus', () => {
    const label = phoneInput.parentElement.querySelector('label');
    const flagContainer = document.querySelector('.iti__selected-country');
    if (flagContainer && label) {
        const width = flagContainer.offsetWidth;
        label.style.left = (width + 13) + 'px';
        label.style.top = '-5px';
        label.style.fontSize = '0.89rem';
        label.style.color = 'var(--primary)';
    }
});

phoneInput.addEventListener('blur', () => {
    if (!phoneInput.value) {
        const label = phoneInput.parentElement.querySelector('label');
        const flagContainer = document.querySelector('.iti__selected-country');
        if (flagContainer && label) {
            const width = flagContainer.offsetWidth;
            label.style.left = (width + 13) + 'px';
            label.style.top = '50%';
            label.style.transform = 'translateY(-50%)';
            label.style.fontSize = '1rem';
            label.style.color = 'var(--text-light)';
        }
    }
});

// Handle form submission
const form = document.getElementById('contactForm');
const output = document.getElementById('output');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Final cleanup before validation
    phoneInput.value = phoneInput.value.replace(/\D/g, '');

    // Get phone details
    const countryData = iti.getSelectedCountryData();
    document.getElementById('fullMobileInput').value = iti.getNumber();
    document.getElementById('countryNameInput').value = countryData.name;
    document.getElementById('countryCodeInput').value = countryData.dialCode;
    document.getElementById('countryISOInput').value = countryData.iso2;

    // Validate phone
    if (!iti.isValidNumber()) {
        output.className = 'full-row error';
        output.textContent = 'Please enter a valid phone number';
        output.style.display = 'block';
        return;
    }

    // Collect form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log('Form Data:', data);

    // Show success message
    output.className = 'full-row success';
    output.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
    output.style.display = 'block';

    // Reset form after 3 seconds
    setTimeout(() => {
        form.reset();
        iti.setNumber('');
        output.style.display = 'none';
    }, 3000);
});

// Set initial mobile label position
window.addEventListener('load', () => {
    const label = phoneInput.parentElement.querySelector('label');
    const flagContainer = document.querySelector('.iti__selected-country');
    if (flagContainer && label) {
        const width = flagContainer.offsetWidth;
        label.style.left = (width + 13) + 'px';
        label.style.top = '50%';
        label.style.transform = 'translateY(-50%)';
    }
});


