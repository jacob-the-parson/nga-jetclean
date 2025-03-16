// Integrated Quote and Calculator Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all quote-related components
    initIntegratedQuoteCalculator();
    initSimpleServiceCalculator();
    
    /**
     * Comprehensive Integrated Quote Calculator with Form Submission
     */
    function initIntegratedQuoteCalculator() {
        // Elements
        const squareFeetInput = document.getElementById('square-feet');
        const serviceCheckboxes = document.querySelectorAll('input[name="services[]"]');
        const extraCheckboxes = document.querySelectorAll('input[name="extras[]"]');
        const calculateBtn = document.getElementById('calculate-btn');
        const resultDiv = document.getElementById('calculator-result');
        const estimatedPriceField = document.getElementById('estimated-price');
        const quoteForm = document.getElementById('integrated-quote-form');
        
        // Add "coming soon" class to the commercial service option - this is now handled in HTML
        // const commercialOption = document.querySelector('.service-option:has(#commercial)');
        // if (commercialOption) {
        //     commercialOption.classList.add('coming-soon');
        // }
        
        // Initialize event listeners
        if (calculateBtn) {
            calculateBtn.addEventListener('click', calculateEstimate);
        }
        
        if (quoteForm) {
            quoteForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Calculate the estimate based on selected services
        function calculateEstimate() {
            const squareFeet = parseInt(squareFeetInput.value) || 0;
            
            if (squareFeet < 100) {
                alert('Please enter a valid square footage (minimum 100 sq ft)');
                return;
            }
            
            // Check if at least one service is selected
            const selectedServices = Array.from(serviceCheckboxes)
                .filter(checkbox => checkbox.checked && checkbox.id !== 'commercial');
                
            if (selectedServices.length === 0) {
                alert('Please select at least one service');
                return;
            }
            
            // Calculate base price
            let basePrice = 0;
            selectedServices.forEach(service => {
                switch(service.value) {
                    case 'house-wash':
                        basePrice += squareFeet * 0.15;
                        break;
                    case 'driveway':
                        basePrice += squareFeet * 0.20;
                        break;
                    case 'roof':
                        basePrice += squareFeet * 0.25;
                        break;
                    case 'deck':
                        basePrice += squareFeet * 0.30;
                        break;
                }
            });
            
            // Add extras
            let extrasPrice = 0;
            const selectedExtras = Array.from(extraCheckboxes).filter(checkbox => checkbox.checked);
            
            selectedExtras.forEach(extra => {
                switch(extra.value) {
                    case 'sanitize':
                        extrasPrice += 25;
                        break;
                    case 'sealing':
                        extrasPrice += squareFeet * 0.10;
                        break;
                    case 'gutter':
                        extrasPrice += 45;
                        break;
                }
            });
            
            // Calculate total
            const totalPrice = basePrice + extrasPrice;
            const minPrice = Math.round(totalPrice * 0.9);
            const maxPrice = Math.round(totalPrice * 1.1);
            
            // Store the price range in the hidden field
            if (estimatedPriceField) {
                estimatedPriceField.value = `$${minPrice} - $${maxPrice}`;
            }
            
            // Also update the visible price range field
            const priceRangeDisplay = document.getElementById('price-range-display');
            if (priceRangeDisplay) {
                priceRangeDisplay.value = `$${minPrice} - $${maxPrice}`;
            }
            
            // Display the result
            if (resultDiv) {
                resultDiv.innerHTML = `
                    <h4>Estimated Price Range</h4>
                    <div class="price">$${minPrice} - $${maxPrice}</div>
                    <p>This estimate is based on the information provided. Complete the form to get a personalized quote.</p>
                `;
                
                // Show the result
                resultDiv.style.display = 'block';
                
                // Scroll to contact form
                const contactFormColumn = document.querySelector('.contact-form');
                if (contactFormColumn) {
                    contactFormColumn.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }
        
        // Handle form submission
        function handleFormSubmit(e) {
            // If no estimate has been calculated, calculate one automatically
            if (estimatedPriceField && !estimatedPriceField.value) {
                calculateEstimate();
                
                // Prevent form submission to allow user to see estimate first
                e.preventDefault();
                return;
            }
            
            // Form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                e.preventDefault();
                return;
            }
            
            // Form would submit normally if we don't prevent default
            // In a real implementation, you might want to use AJAX to submit the form
            
            // For this demo, let's just show an alert
            alert('Your quote request has been submitted! We will contact you shortly.');
        }
    }
    
    /**
     * Simple Service Calculator (from additional-components.js)
     */
    function initSimpleServiceCalculator() {
        const calculator = document.getElementById('service-calculator');
        
        if (calculator) {
            const calculateBtn = calculator.querySelector('#calculate-btn');
            const resultDiv = calculator.querySelector('#calculator-result');
            
            calculateBtn.addEventListener('click', () => {
                // Get form values
                const squareFeet = parseInt(calculator.querySelector('#square-feet').value) || 0;
                const serviceType = calculator.querySelector('#service-type').value;
                const extras = Array.from(calculator.querySelectorAll('input[name="extras"]:checked'))
                    .map(input => input.value);
                
                // Calculate estimated price
                let basePrice = 0;
                switch(serviceType) {
                    case 'house-wash':
                        basePrice = squareFeet * 0.15;
                        break;
                    case 'driveway':
                        basePrice = squareFeet * 0.20;
                        break;
                    case 'roof':
                        basePrice = squareFeet * 0.25;
                        break;
                    case 'deck':
                        basePrice = squareFeet * 0.30;
                        break;
                }
                
                // Add extras
                let extrasPrice = 0;
                extras.forEach(extra => {
                    if (extra === 'sanitize') extrasPrice += 25;
                    if (extra === 'sealing') extrasPrice += squareFeet * 0.10;
                    if (extra === 'gutter') extrasPrice += 45;
                });
                
                const totalPrice = basePrice + extrasPrice;
                const minPrice = Math.round(totalPrice * 0.9);
                const maxPrice = Math.round(totalPrice * 1.1);
                
                // Display result
                resultDiv.innerHTML = `
                    <div class="result-card">
                        <h4>Estimated Price Range</h4>
                        <div class="price">$${minPrice} - $${maxPrice}</div>
                        <p>This estimate is based on the information provided. For an accurate quote, please contact us directly.</p>
                        <a href="#contact" class="btn btn-primary">Request Quote</a>
                    </div>
                `;
                resultDiv.style.display = 'block';
            });
        }
    }
}); 