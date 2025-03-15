// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Handle dropdown menu toggles on mobile
    const dropdownLinks = document.querySelectorAll('.nav-menu li.has-dropdown > a');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default and toggle dropdown on mobile
            if (window.innerWidth <= 1100) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('open');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.menu-toggle') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor click behavior
            e.preventDefault();
            
            // Close mobile menu if it's open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Active Menu Item on Scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Add box shadow to navigation on scroll
        const nav = document.querySelector('nav');
        if (scrollPosition > 0) {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        // Update active menu item based on scroll position
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Simple form validation for contact form
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');
            
            // Simple validation
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                isValid = false;
                nameInput.style.borderColor = '#ff3860';
            } else {
                nameInput.style.borderColor = '#ddd';
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = '#ff3860';
            } else {
                emailInput.style.borderColor = '#ddd';
            }
            
            if (!messageInput.value.trim()) {
                isValid = false;
                messageInput.style.borderColor = '#ff3860';
            } else {
                messageInput.style.borderColor = '#ddd';
            }
            
            // If form is valid, simulate form submission
            if (isValid) {
                // In a real application, you would send the form data to a server here
                alert('Thank you for your message! We will contact you soon.');
                contactForm.reset();
            }
        });
    }
    
    // Newsletter form in footer
    const newsletterForm = document.querySelector('.footer-newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = '#ff3860';
            } else {
                // In a real application, you would send the email to a server here
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add animation to features on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Add animation class when elements come into view
    function animateOnScroll() {
        featureCards.forEach(card => {
            if (isInViewport(card) && !card.classList.contains('animated')) {
                card.classList.add('animated');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on load
    animateOnScroll();
    
    // Image slideshow functionality for Cards with image slideshows
    const slideshowContainers = document.querySelectorAll('.image-slideshow-container');
    
    // Apply staggered timing to slideshow cards
    slideshowContainers.forEach((container, index) => {
        const slideshowImages = container.querySelectorAll('.slideshow-img');
        let currentImageIndex = 0;
        
        // Function to show next image in slideshow
        function showNextImage() {
            // Hide all images
            slideshowImages.forEach(img => {
                img.style.opacity = '0';
            });
            
            // Increment index and loop back to 0 if needed
            currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
            
            // Show current image
            slideshowImages[currentImageIndex].style.opacity = '1';
            
            console.log(`Slideshow ${index + 1} rotated to image ${currentImageIndex + 1} of ${slideshowImages.length}`);
        }
        
        // Stagger the start times - 1 second delay for each subsequent slideshow
        const staggerDelay = 1000 * index;
        
        // Initial delay before we start the interval
        setTimeout(() => {
            // Start the slideshow rotation
            const slideshowInterval = setInterval(showNextImage, 3000);
            
            // Store the interval reference on the container element for cleanup if needed
            container.dataset.intervalId = slideshowInterval;
            
            console.log(`Started slideshow ${index + 1} after ${staggerDelay}ms delay`);
        }, staggerDelay);
    });
    
    // Before/After image rotation for any remaining cards with before/after containers
    const beforeAfterContainers = document.querySelectorAll('.image-wrapper .before-after-container');
    
    // Apply staggered timing to before/after cards, starting after the slideshows
    beforeAfterContainers.forEach((container, index) => {
        const beforeImg = container.querySelector('.before-img');
        const afterImg = container.querySelector('.after-img');
        
        // Skip if images don't exist
        if (!beforeImg || !afterImg) {
            console.warn(`Before/After container ${index + 1} missing images`);
            return;
        }
        
        let isShowingBefore = true;
        
        // Function to handle rotation
        function rotateImages() {
            if (isShowingBefore) {
                // Transition to after image
                beforeImg.style.opacity = '0';
                afterImg.style.opacity = '1';
            } else {
                // Transition to before image
                beforeImg.style.opacity = '1';
                afterImg.style.opacity = '0';
            }
            isShowingBefore = !isShowingBefore;
            console.log(`Before/After container ${index + 1} rotated to ${isShowingBefore ? 'before' : 'after'}`);
        }
        
        // Start after all slideshows, with staggered timing
        // Each before/after container gets a 1 second delay after the previous one
        const staggerDelay = 1000 * (slideshowContainers.length + index);
        
        // Initial delay before we start the interval
        setTimeout(() => {
            // Auto rotate between before and after images
            const rotateInterval = setInterval(rotateImages, 3000);
            
            // Store the interval reference on the container element for cleanup if needed
            container.dataset.intervalId = rotateInterval;
            
            console.log(`Started rotation for Before/After container ${index + 1} after ${staggerDelay}ms delay`);
        }, staggerDelay);
    });
    
    // Owner image slideshow with enhanced transitions
    const ownerSlideshowContainer = document.querySelector('.owner-slideshow-container');
    if (ownerSlideshowContainer) {
        const ownerImages = ownerSlideshowContainer.querySelectorAll('.owner-slideshow-img');
        let currentOwnerIndex = 0;
        
        // Initialize the first image as active
        ownerImages[0].classList.add('active');
        
        // Function to handle the owner slideshow with enhanced transitions
        function rotateOwnerImages() {
            // Remove all classes first
            ownerImages.forEach(img => {
                img.classList.remove('active', 'prev');
            });
            
            // Set the previous image
            const prevIndex = currentOwnerIndex;
            ownerImages[prevIndex].classList.add('prev');
            
            // Update to next image
            currentOwnerIndex = (currentOwnerIndex + 1) % ownerImages.length;
            
            // Activate the new image
            ownerImages[currentOwnerIndex].classList.add('active');
            
            console.log(`Owner slideshow rotated to image ${currentOwnerIndex + 1} of ${ownerImages.length}`);
        }
        
        // Reduced initial delay to 800ms and keep 5 second interval for subsequent rotations
        // This makes the first image change much sooner while maintaining the regular timing after
        setTimeout(() => {
            // Start the rotation
            setInterval(rotateOwnerImages, 5000);
            console.log('Started owner slideshow with enhanced transitions');
        }, 800);
    }
    
    // Add a function to enhance the mobile tab scrolling experience
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Get the target tab from the data attribute
            const target = button.getAttribute('data-tab');
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(target).classList.add('active');
            
            // Scroll the active tab into view on mobile - center it if possible
            if (window.innerWidth <= 768) {
                const tabNavigation = button.parentElement;
                const buttonRect = button.getBoundingClientRect();
                const navRect = tabNavigation.getBoundingClientRect();
                
                // Calculate the scroll position to center the button
                const scrollLeft = (buttonRect.left + button.offsetWidth/2) - (navRect.left + tabNavigation.offsetWidth/2);
                
                // Smooth scroll to the position
                tabNavigation.scrollTo({
                    left: tabNavigation.scrollLeft + scrollLeft,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set the first tab as active by default if none are active
    if (!document.querySelector('.tab-btn.active')) {
        const firstTab = document.querySelector('.tab-btn');
        if (firstTab) {
            firstTab.click();
        }
    }
}); 