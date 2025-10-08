  const phoneInput = document.querySelector("#mobileInput");
        const iti = window.intlTelInput(phoneInput, {
            initialCountry: "in",
            preferredCountries: ["in", "us", "gb"],
            separateDialCode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });

        // Update mobile label position
        phoneInput.addEventListener('focus', () => {
            const label = document.querySelector('.mobile-label');
            const flagContainer = document.querySelector('.iti__selected-country');
            if (flagContainer) {
                const width = flagContainer.offsetWidth;
                label.style.left = (width + 13) + 'px';
                label.style.top = '-5px';
                label.style.fontSize = '0.89rem';
                label.style.color = 'var(--primary)';
            }
        });

        phoneInput.addEventListener('blur', () => {
            if (!phoneInput.value) {
                const label = document.querySelector('.mobile-label');
                const flagContainer = document.querySelector('.iti__selected-country');
                if (flagContainer) {
                    const width = flagContainer.offsetWidth;
                    label.style.left = (width + 13) + 'px';
                    label.style.top = '50%';
                    label.style.transform = 'translateY(-50%)';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--text-light)';
                }
            }
        });

        // Handle enquiry type change
        const enquiryType = document.getElementById('enquiryType');
        const othersInput = document.getElementById('others');

        enquiryType.addEventListener('change', function() {
            if (this.value === 'others') {
                othersInput.disabled = false;
                othersInput.classList.remove('inactive-border');
            } else {
                othersInput.disabled = true;
                othersInput.classList.add('inactive-border');
                othersInput.value = '';
            }
        });

        // Handle form submission
        const form = document.getElementById('contactForm');
        const output = document.getElementById('output');

        form.addEventListener('submit', function(e) {
            e.preventDefault();

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

            // Show success message (in real scenario, you'd send this to a server)
            output.className = 'full-row success';
            output.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
            output.style.display = 'block';

            // Reset form after 3 seconds
            setTimeout(() => {
                form.reset();
                output.style.display = 'none';
            }, 3000);
        });

        // Set initial mobile label position
        window.addEventListener('load', () => {
            const label = document.querySelector('.mobile-label');
            const flagContainer = document.querySelector('.iti__selected-country');
            if (flagContainer) {
                const width = flagContainer.offsetWidth;
                label.style.left = (width + 13) + 'px';
                label.style.top = '50%';
                label.style.transform = 'translateY(-50%)';
            }
        });