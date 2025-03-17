// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Store initial scroll position
    let initialScrollPosition = window.scrollY;
    let isInitialLoadComplete = false;

    // Function to restore scroll position
    function restoreScrollPosition() {
        if (!isInitialLoadComplete && initialScrollPosition > 0) {
            window.scrollTo(0, initialScrollPosition);
        }
    }

    // Initialize scroll animations immediately but with loading state tracking
    function initScrollAnimationsWithLoading() {
        const animatedElements = document.querySelectorAll('.feature-card, .video-item');
        
        // Add hover effect for desktop
        if (window.innerWidth > 767) {
            animatedElements.forEach(element => {
                if (element.classList.contains('feature-card')) {
                    element.addEventListener('mouseenter', () => {
                        element.classList.add('highlight');
                    });
                    element.addEventListener('mouseleave', () => {
                        if (!element.classList.contains('in-view')) {
                            element.classList.remove('highlight');
                        }
                    });
                }
            });
        }

        // Track loading state per section
        animatedElements.forEach(element => {
            const images = element.getElementsByTagName('img');
            let sectionImagesLoaded = 0;
            const totalSectionImages = images.length;

            function handleSectionImageLoad() {
                sectionImagesLoaded++;
                if (sectionImagesLoaded === totalSectionImages) {
                    // Section is fully loaded, check if in viewport
                    if (isInViewport(element)) {
                        element.classList.add('in-view');
                        if (element.classList.contains('feature-card')) {
                            element.classList.add('highlight');
                        }
                    }
                }
            }

            // Check images in this section
            Array.from(images).forEach(img => {
                if (img.complete) {
                    handleSectionImageLoad();
                } else {
                    img.addEventListener('load', handleSectionImageLoad);
                    img.addEventListener('error', handleSectionImageLoad);
                }
            });

            // If no images, initialize immediately
            if (totalSectionImages === 0) {
                if (isInViewport(element)) {
                    element.classList.add('in-view');
                    if (element.classList.contains('feature-card')) {
                        element.classList.add('highlight');
                    }
                }
            }
        });

        // Add scroll event listener with throttling
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScrollAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Initialize critical content first
    initScrollAnimationsWithLoading();
    initializeSlideshows();

    // Track overall page load for scroll position restoration
    window.addEventListener('load', () => {
        isInitialLoadComplete = true;
        restoreScrollPosition();
    });

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
                // Ensure hardware acceleration for smoother animations
                navMenu.style.transform = 'translateX(0)';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // Reset transform for mobile optimization
                navMenu.style.transform = 'translateX(-100%)';
            }
        });
    }
    
    // Handle dropdown menu toggles
    const dropdownLinks = document.querySelectorAll('.nav-menu li.has-dropdown > a');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Always prevent default for dropdown parent links
            e.preventDefault();
            
            // Toggle dropdown on mobile
            if (window.innerWidth <= 1100) {
                const parent = this.parentElement;
                parent.classList.toggle('open');
            } else {
                // For desktop, toggle active-dropdown class
                const parent = this.parentElement;
                
                // Close all other dropdowns first
                dropdownLinks.forEach(otherLink => {
                    if (otherLink !== link) {
                        otherLink.parentElement.classList.remove('active-dropdown');
                    }
                });
                
                // Toggle the clicked dropdown
                parent.classList.toggle('active-dropdown');
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        // Close mobile menu when clicking outside
        if (!event.target.closest('.nav-menu') && !event.target.closest('.menu-toggle') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            // Reset transform for mobile optimization
            navMenu.style.transform = 'translateX(-100%)';
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        // Close desktop dropdowns when clicking outside
        if (!event.target.closest('.nav-menu li.has-dropdown')) {
            dropdownLinks.forEach(link => {
                link.parentElement.classList.remove('active-dropdown');
            });
        }
    });
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if this is a dropdown parent link (except for Services which is now a direct link)
            if (link.parentElement.classList.contains('has-dropdown') && link === link.parentElement.querySelector('a')) {
                return;
            }
            
            // Prevent default anchor click behavior
            e.preventDefault();
            
            // Close mobile menu if it's open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                // Reset transform for mobile optimization
                navMenu.style.transform = 'translateX(-100%)';
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Close any open dropdowns
            dropdownLinks.forEach(link => {
                link.parentElement.classList.remove('active-dropdown');
                link.parentElement.classList.remove('open');
            });
            
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
        if (!isInitialLoadComplete) {
            initialScrollPosition = window.scrollY;
            return;
        }

        const scrollPosition = window.scrollY;
        
        // Add box shadow to navigation on scroll
        const nav = document.querySelector('nav');
        if (scrollPosition > 0) {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        // Add 'scrolled' class for CTA button animation when scrolled down
        if (scrollPosition > 200) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
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
    
    // Add animation to features on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Element is considered in view when it's 30% visible
        const threshold = windowHeight * 0.4;
        
        return (
            rect.top <= (windowHeight - threshold) &&
            rect.bottom >= threshold
        );
    }
    
    // Handle scroll animations for mobile
    function handleScrollAnimations() {
        const isMobile = window.innerWidth <= 767;
        const animatedElements = document.querySelectorAll('.feature-card, .video-item');
        
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                if (!element.classList.contains('in-view')) {
                    element.classList.add('in-view');
                    element.classList.remove('out-view');
                    
                    // Add highlight class for border effect
                    if (element.classList.contains('feature-card')) {
                        element.classList.add('highlight');
                        
                        // Reset animation for water drop effect
                        const afterElement = element.querySelector('::after');
                        if (afterElement) {
                            afterElement.style.animation = 'none';
                            // Force reflow
                            void afterElement.offsetWidth;
                            afterElement.style.animation = null;
                        }
                    }
                }
            } else if (isMobile) {
                if (element.classList.contains('in-view')) {
                    element.classList.add('out-view');
                    element.classList.remove('in-view');
                    // Remove highlight class when out of view on mobile
                    if (element.classList.contains('feature-card')) {
                        element.classList.remove('highlight');
                    }
                }
            }
        });
    }
    
    // Initialize slideshows
    function initializeSlideshows() {
        const slideshowContainers = document.querySelectorAll('.image-slideshow-container');
        
        slideshowContainers.forEach((container, containerIndex) => {
            // Use picture elements for slideshow images
            const slideshowPictures = container.querySelectorAll('.slideshow-img');
            const skeleton = container.querySelector('.image-skeleton');
            let currentIndex = 0;
            let imagesLoaded = 0;
            
            // Handle image loading for each picture element
            slideshowPictures.forEach(picture => {
                const img = picture.querySelector('img');
                if (!img) return;
                
                if (img.complete) {
                    handleImageLoad(picture);
                } else {
                    img.addEventListener('load', () => handleImageLoad(picture));
                }
                
                img.addEventListener('error', () => {
                    console.error('Error loading image:', img.src);
                    imagesLoaded++;
                    checkAllImagesLoaded();
                });
            });
            
            function handleImageLoad(picture) {
                imagesLoaded++;
                picture.classList.add('loaded');
                
                // Show first image immediately once loaded
                if (imagesLoaded === 1) {
                    picture.style.display = 'block';
                    picture.style.opacity = '1';
                } else {
                    picture.style.display = 'none';
                    picture.style.opacity = '0';
                }
                
                checkAllImagesLoaded();
            }
            
            function checkAllImagesLoaded() {
                // Remove skeleton when all images are loaded
                if (imagesLoaded === slideshowPictures.length && skeleton) {
                    skeleton.style.display = 'none';
                }
            }
            
            // Slideshow rotation with fade transition
            function rotateImages() {
                const currentSlide = slideshowPictures[currentIndex];
                const nextIndex = (currentIndex + 1) % slideshowPictures.length;
                const nextSlide = slideshowPictures[nextIndex];
                
                // Prepare next slide
                nextSlide.style.display = 'block';
                nextSlide.style.opacity = '0';
                
                // Trigger reflow to ensure transitions work
                void nextSlide.offsetWidth;
                
                // Fade out current slide
                currentSlide.style.opacity = '0';
                
                // Fade in next slide
                nextSlide.style.opacity = '1';
                
                // After transition, hide the old slide
                setTimeout(() => {
                    currentSlide.style.display = 'none';
                }, 500); // Match this to your CSS transition duration
                
                currentIndex = nextIndex;
            }
            
            // Start rotation after a staggered delay
            if (slideshowPictures.length > 1) {
                // Add 1.5 second offset for each slideshow
                const staggerDelay = containerIndex * 1500;
                
                // Set initial styles for smooth transitions
                slideshowPictures.forEach(picture => {
                    picture.style.transition = 'opacity 0.5s ease-in-out';
                    picture.style.position = 'absolute';
                    picture.style.top = '0';
                    picture.style.left = '0';
                    picture.style.width = '100%';
                    picture.style.height = '100%';
                });
                
                setTimeout(() => {
                    setInterval(rotateImages, 3000);
                    console.log(`Started slideshow ${containerIndex + 1} after ${staggerDelay}ms delay`);
                }, staggerDelay);
            }
        });
    }
    
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
            const targetElement = document.getElementById(target + '-content'); // Add '-content' suffix
            if (targetElement) { // Check if the element exists
                // Remove active class from all content elements
                tabContents.forEach(content => content.classList.remove('active'));
                // Add active class to the target content
                targetElement.classList.add('active');
            }
            
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