// AOS.init({
//     anchorPlacement: 'bottom-bottom' // Makes animations trigger from bottom of viewport
// });

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    speed: 800,
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
    },
});





// Counter animation function
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Intersection Observer for triggering animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.ex-box h2');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            });
            observer.unobserve(entry.target); // Stop observing after animation
        }
    });
}, observerOptions);

// Start observing the about section
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about-bottom');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});



   // Mobile Menu Toggle

   const hamburgerMenu = document.querySelector('.hamburger-menu');

   const navMenu = document.querySelector('.nav-menu');

   const navOverlay = document.querySelector('.nav-overlay');

   // const servicesLink = document.querySelector('.group > a');

   // const servicesDropdown = document.querySelector('.group > ul');

   // const servicesGroup = document.querySelector('.group');

   //

   // Desktop dropdown functionality (Multiple dropdown support)

   const dropdownGroups = document.querySelectorAll('.group');

   function closeAllDropdowns(except = null) {

       dropdownGroups.forEach(group => {

           if (group !== except) {

               group.classList.remove('active');

               const dropdown = group.querySelector('.services-dropdown');

               if (dropdown) {

                   dropdown.classList.remove('show');

               }

           }

       });

   }

   dropdownGroups.forEach(group => {

       const trigger = group.querySelector('.services-dropdown-trigger');

       const dropdown = group.querySelector('.services-dropdown');

       if (!trigger || !dropdown) return;

       trigger.addEventListener('click', (e) => {

           if (window.innerWidth > 1200) {

               e.preventDefault();

               const isActive = group.classList.contains('active');

               closeAllDropdowns(group);

               if (isActive) {

                   group.classList.remove('active');

                   dropdown.classList.remove('show');

               } else {

                   group.classList.add('active');

                   dropdown.classList.add('show');

               }

           } else {

               e.preventDefault();

               dropdown.classList.toggle('active');

           }

       });

   });

   // Close outside click

   document.addEventListener('click', (e)=>{

       if(window.innerWidth > 1200){

           const clickedInside = [...dropdownGroups].some(group =>

               group.contains(e.target)

           );

           if(!clickedInside){

               closeAllDropdowns();

           }

       }

   });

   //

   const megaMenuToggler = document.querySelectorAll('.mm-toggler');

   megaMenuToggler.forEach(toggler => {

       toggler.addEventListener('click', (e) => {

           toggler.classList.toggle('active');

       });

   });

   function toggleMenu() {

       hamburgerMenu.classList.toggle('active');

       navMenu.classList.toggle('active');

       navOverlay.classList.toggle('active');

       document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';

   }

   // Desktop dropdown functionality

   // function toggleDesktopDropdown() {

   //     if (window.innerWidth > 1200) {

   //         const isActive = servicesGroup.classList.contains('active');

   //         // Close any other open dropdowns

   //         document.querySelectorAll('.group.active').forEach(group => {

   //             if (group !== servicesGroup) {

   //                 group.classList.remove('active');

   //                 group.querySelector('ul').classList.remove('show');

   //             }

   //         });

   //         // Toggle current dropdown

   //         if (isActive) {

   //             servicesGroup.classList.remove('active');

   //             servicesDropdown.classList.remove('show');

   //         } else {

   //             servicesGroup.classList.add('active');

   //             servicesDropdown.classList.add('show');

   //         }

   //     }

   // }

   // Close dropdown when clicking outside

   document.addEventListener('click', (e) => {

       if (window.innerWidth > 1200) {

           if (!servicesGroup.contains(e.target)) {

               servicesGroup.classList.remove('active');

               servicesDropdown.classList.remove('show');

           }

       }

   });

   // Handle mobile menu

   hamburgerMenu.addEventListener('click', toggleMenu);

   // navOverlay.addEventListener('click', toggleMenu);

   // Handle services dropdown - click for desktop, click for mobile

   // servicesLink.addEventListener('click', (e) => {

   //     if (window.innerWidth > 1200) {

   //         e.preventDefault();

   //         toggleDesktopDropdown();

   //     } else {

   //         e.preventDefault();

   //         servicesDropdown.classList.toggle('active');

   //     }

   // });

   // Close menu when clicking on a link

   // const navLinks = document.querySelectorAll('.nav-menu a:not(.group > a)');

   // navLinks.forEach(link => {

   //     link.addEventListener('click', () => {

   //         if (window.innerWidth <= 1200) {

   //             toggleMenu();

   //         } else {

   //             // Close dropdown on desktop when clicking a link

   //             servicesGroup.classList.remove('active');

   //             servicesDropdown.classList.remove('show');

   //         }

   //     });

   // });

   // Handle window resize

   window.addEventListener('resize', () => {

       if (window.innerWidth > 1200) {

           // Reset mobile menu state

           hamburgerMenu.classList.remove('active');

           navMenu.classList.remove('active');

           document.body.style.overflow = '';

           servicesDropdown.classList.remove('active');

       } else {

           // Reset desktop dropdown state on mobile

           servicesGroup.classList.remove('active');

           servicesDropdown.classList.remove('show');

       }

   });



const formmmmm = document.getElementById('contactForm');
if (formmmmm) {
    formmmmm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Reset any previous error states
        resetErrorStates();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Collect form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            website: document.getElementById('website').value,
            service: document.getElementById('service') ? document.getElementById('service').value : " " ,
            budget: document.getElementById('budget') ? document.getElementById('budget').value : " " ,
            timeline: document.getElementById('timeline') ? document.getElementById('timeline').value : " " ,
            message: document.getElementById('message').value
        };

        // Send the form data
        fetch('https://www.digimarketing.sg/rest/contact-form.php', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === "200") {
                    showMessage('submitSuccessMessage');
                    document.getElementById('contactForm').reset();
                } else {
                    showMessage('submitErrorMessage');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('submitErrorMessage');
            });
    });

    function validateForm() {
        let isValid = true;

        // Required fields validation
        const requiredFields = ['firstName', 'email', 'service', 'message'];
        requiredFields.forEach(field => {
            const element = document.getElementById(field);
            if (!element.value.trim()) {
                showError(element, 'This field is required');
                isValid = false;
            }
        });

        // Email validation
        const email = document.getElementById('email');
        if (email.value.trim() && !isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Website URL validation (if provided)
        const website = document.getElementById('website');
        if (website.value.trim() && !isValidURL(website.value)) {
            showError(website, 'Please enter a valid URL');
            isValid = false;
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    function showError(element, message) {
        // Add error class to the parent field-row
        const fieldRow = element.closest('.field-row');
        fieldRow.classList.add('error');

        // Create or update error message
        let errorDiv = fieldRow.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            fieldRow.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    function resetErrorStates() {
        // Remove all error states and messages
        document.querySelectorAll('.field-row.error').forEach(row => {
            row.classList.remove('error');
            const errorMessage = row.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    }

    function showMessage(type) {
        // type: 'submitSuccessMessage' or 'submitErrorMessage'
        let message = '';
        let toastClass = '';
        let icon = '';
        if (type === 'submitSuccessMessage') {
            message = 'Thank you! Your message has been sent successfully.';
            toastClass = 'toast-success';
            icon = '✅';
        } else {
            message = 'Sorry, there was an error sending your message. Please try again later.';
            toastClass = 'toast-error';
            icon = '❌';
        }
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast-message ${toastClass}`;
        toast.innerHTML = `<span class='toast-icon'>${icon}</span> ${message}`;
        toastContainer.appendChild(toast);
        // Remove after animation
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }
}

// // PSG Modal Functionality
// let psgModalShown = false;

// // Function to detect if user is in Singapore
// async function isUserInSingapore() {
//     try {
//         // First try to get location from IP geolocation
//         const response = await fetch('https://ipapi.co/json/');
//         const data = await response.json();

//         if (data.country_code === 'SG') {
//             return true;
//         }



//         return false;
//     } catch (error) {
//         console.log('Location detection failed, defaulting to show modal');
//         // If geolocation fails, show the modal anyway to be safe
//         return true;
//     }
// }

// // Function to show PSG modal
// function showPSGModal() {
//     if (psgModalShown) return;

//     const modal = document.getElementById('psgModal');
//     if (modal) {
//         modal.style.display = 'flex';
//         psgModalShown = true;

//         // Store in localStorage that modal has been shown
//         localStorage.setItem('psgModalShown', 'true');

//         // Track modal view event
//         if (typeof gtag !== 'undefined') {
//             gtag('event', 'psg_modal_view', {
//                 'event_category': 'engagement',
//                 'event_label': 'singapore_users'
//             });
//         }
//     }
// }

// // Function to close PSG modal
// function closePSGModal() {
//     const modal = document.getElementById('psgModal');
//     if (modal) {
//         modal.style.display = 'none';

//         // Track modal close event
//         if (typeof gtag !== 'undefined') {
//             gtag('event', 'psg_modal_close', {
//                 'event_category': 'engagement',
//                 'event_label': 'singapore_users'
//             });
//         }
//     }
// }

// // Function to track PSG modal CTA click
// function trackPSGModalCTA() {
//     if (typeof gtag !== 'undefined') {
//         gtag('event', 'psg_modal_cta_click', {
//             'event_category': 'conversion',
//             'event_label': 'singapore_users'
//         });
//     }
// }

// // Function to remove trailing slash from URL
// function removeTrailingSlash() {
//     const currentUrl = window.location.href;
//     const currentPath = window.location.pathname;

//     // Check if URL ends with a slash and it's not just the root path
//     if (currentPath.endsWith('/') && currentPath !== '/') {
//         // Remove the trailing slash
//         const newPath = currentPath.slice(0, -1);
//         const newUrl = window.location.origin + newPath + window.location.search + window.location.hash;

//         // Redirect to the URL without trailing slash
//         window.history.replaceState({}, '', newUrl);
//     }
// }

// // Initialize PSG modal functionality
// document.addEventListener('DOMContentLoaded', async function() {
//     // Remove trailing slash from URL if present
//     removeTrailingSlash();

//     // Check if modal has already been shown in this session
//     const modalAlreadyShown = localStorage.getItem('psgModalShown');

//     if (!modalAlreadyShown) {
//         // Check if user is in Singapore
//         const isSingapore = await isUserInSingapore();

//         if (isSingapore) {
//             // Show modal after 5 seconds
//             setTimeout(() => {
//                 showPSGModal();
//             }, 5000);
//         }
//     }

//     // Add click event listeners for PSG modal CTA
//     const psgModalCTA = document.querySelector('.psg-modal-btn-primary');
//     if (psgModalCTA) {
//         psgModalCTA.addEventListener('click', trackPSGModalCTA);
//     }

//     // Close modal when clicking outside
//     const psgModal = document.getElementById('psgModal');
//     if (psgModal) {
//         psgModal.addEventListener('click', function(e) {
//             if (e.target === psgModal) {
//                 closePSGModal();
//             }
//         });
//     }

//     // Close modal with Escape key
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape') {
//             closePSGModal();
//         }
//     });
// });

// // Reset modal shown status after 24 hours (for testing purposes, you can change this)
// setInterval(() => {
//     const lastShown = localStorage.getItem('psgModalShown');
//     if (lastShown) {
//         const now = new Date().getTime();
//         const lastShownTime = parseInt(lastShown);
//         const hoursPassed = (now - lastShownTime) / (1000 * 60 * 60);

//         if (hoursPassed >= 24) {
//             localStorage.removeItem('psgModalShown');
//         }
//     }
// }, 60000); // Check every minute




// Function to show PSG modal
function showPSGModal() {
    const modal = document.getElementById('psgModal');
    if (modal) {
        modal.style.display = 'flex';

        // Optional: Google Analytics tracking if gtag is loaded
        if (typeof gtag !== 'undefined') {
            gtag('event', 'psg_modal_view', {
                'event_category': 'engagement',
                'event_label': 'all_users'
            });
        }
    }
}

// Function to close PSG modal
function closePSGModal() {
    const modal = document.getElementById('psgModal');
    if (modal) {
        modal.style.display = 'none';

        // Optional: Track close
        if (typeof gtag !== 'undefined') {
            gtag('event', 'psg_modal_close', {
                'event_category': 'engagement',
                'event_label': 'all_users'
            });
        }
    }
}

// Function to track CTA click
function trackPSGModalCTA() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'psg_modal_cta_click', {
            'event_category': 'conversion',
            'event_label': 'all_users'
        });
    }
}

// Initialize PSG modal functionality
document.addEventListener('DOMContentLoaded', function () {
    // Show modal after 5 seconds
    setTimeout(() => {
        showPSGModal();
    }, 5000);

    // Add click event listener for CTA button
    const psgModalCTA = document.querySelector('.psg-modal-btn-primary');
    if (psgModalCTA) {
        psgModalCTA.addEventListener('click', trackPSGModalCTA);
    }

    // Close modal when clicking outside
    const psgModal = document.getElementById('psgModal');
    if (psgModal) {
        psgModal.addEventListener('click', function (e) {
            if (e.target === psgModal) {
                closePSGModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closePSGModal();
        }
    });
});








// Year


document.getElementById("current-year").textContent = new Date().getFullYear();