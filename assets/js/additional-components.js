// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initFaqAccordions();
    initProcessTimeline();
    initServiceCalculator();
    initServiceMap();
    initMaterialTabs();
    initSeasonalTabs();
});

// FAQ Accordion functionality
function initFaqAccordions() {
    const accordions = document.querySelectorAll('.faq-item');
    
    if (accordions.length) {
        accordions.forEach(accordion => {
            const header = accordion.querySelector('.faq-question');
            header.addEventListener('click', () => {
                accordion.classList.toggle('active');
                const content = accordion.querySelector('.faq-answer');
                if (accordion.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = 0;
                }
            });
        });
    }
}

// Service Process Timeline interactions
function initProcessTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length) {
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.classList.add('active');
            });
            
            item.addEventListener('mouseleave', () => {
                item.classList.remove('active');
            });
        });
    }
}

// Service Area Map functionality
function initServiceMap() {
    // This would typically connect to a mapping API like Google Maps
    // For the sample, we'll just add some basic interactivity
    const mapRegions = document.querySelectorAll('.map-region');
    const regionInfo = document.querySelector('.region-info');
    
    if (mapRegions.length && regionInfo) {
        mapRegions.forEach(region => {
            region.addEventListener('mouseenter', () => {
                const regionName = region.getAttribute('data-region');
                const regionDesc = region.getAttribute('data-description');
                
                regionInfo.innerHTML = `
                    <h4>${regionName}</h4>
                    <p>${regionDesc}</p>
                `;
                regionInfo.style.display = 'block';
                region.classList.add('active');
            });
            
            region.addEventListener('mouseleave', () => {
                region.classList.remove('active');
                regionInfo.style.display = 'none';
            });
        });
    }
}

// Service Calculator functionality
function initServiceCalculator() {
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
            
            // Calculate estimated price (this would be replaced with your actual pricing logic)
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
            
            // Display result
            resultDiv.innerHTML = `
                <div class="result-card">
                    <h4>Estimated Price Range</h4>
                    <div class="price">$${Math.round(totalPrice * 0.9)} - $${Math.round(totalPrice * 1.1)}</div>
                    <p>This estimate is based on the information provided. For an accurate quote, please contact us directly.</p>
                    <a href="#" class="btn btn-primary">Request Quote</a>
                </div>
            `;
            resultDiv.style.display = 'block';
        });
    }
}

// Material Tabs functionality
function initMaterialTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get the tab to show
                const tabToShow = btn.getAttribute('data-tab');
                
                // Show the corresponding content
                const content = document.getElementById(`${tabToShow}-content`);
                if (content) {
                    content.classList.add('active');
                }
            });
        });
    }
}

// Seasonal Tabs functionality
function initSeasonalTabs() {
    const seasonTabs = document.querySelectorAll('.season-tab');
    const seasonContents = document.querySelectorAll('.season-content');
    
    if (seasonTabs.length) {
        seasonTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                seasonTabs.forEach(t => t.classList.remove('active'));
                seasonContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Get the season to show
                const seasonToShow = tab.getAttribute('data-season');
                
                // Show the corresponding content
                const content = document.getElementById(`${seasonToShow}-content`);
                if (content) {
                    content.classList.add('active');
                }
            });
        });
    }
}