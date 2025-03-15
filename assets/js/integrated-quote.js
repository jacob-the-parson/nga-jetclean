// Integrated Quote Calculator and Form Functionality
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Initialize
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
        estimatedPriceField.value = `$${minPrice} - $${maxPrice}`;
        
        // Also update the visible price range field
        const priceRangeDisplay = document.getElementById('price-range-display');
        if (priceRangeDisplay) {
            priceRangeDisplay.value = `$${minPrice} - $${maxPrice}`;
        }
        
        // Display the result
        resultDiv.innerHTML = `
            <h4>Estimated Price Range</h4>
            <div class="price">$${minPrice} - $${maxPrice}</div>
            <p>This estimate is based on the information provided. Complete the form to get a personalized quote.</p>
        `;
        
        // Show the result
        resultDiv.style.display = 'block';
        
        // Scroll to contact form
        document.querySelector('.contact-form-column').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Handle form submission
    function handleFormSubmit(e) {
        // If no estimate has been calculated, calculate one automatically
        if (!estimatedPriceField.value) {
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
}); 