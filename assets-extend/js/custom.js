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
const servicesLink = document.querySelector('.group > a');
const servicesDropdown = document.querySelector('.group > ul');
const servicesGroup = document.querySelector('.group');
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
function toggleDesktopDropdown() {
    if (window.innerWidth > 1200) {
        const isActive = servicesGroup.classList.contains('active');
        
        // Close any other open dropdowns
        document.querySelectorAll('.group.active').forEach(group => {
            if (group !== servicesGroup) {
                group.classList.remove('active');
                group.querySelector('ul').classList.remove('show');
            }
        });
        
        // Toggle current dropdown
        if (isActive) {
            servicesGroup.classList.remove('active');
            servicesDropdown.classList.remove('show');
        } else {
            servicesGroup.classList.add('active');
            servicesDropdown.classList.add('show');
        }
    }
}

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
servicesLink.addEventListener('click', (e) => {
    if (window.innerWidth > 1200) {
        e.preventDefault();
        toggleDesktopDropdown();
    } else {
        e.preventDefault();
        servicesDropdown.classList.toggle('active');
    }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a:not(.group > a)');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1200) {
            toggleMenu();
        } else {
            // Close dropdown on desktop when clicking a link
            servicesGroup.classList.remove('active');
            servicesDropdown.classList.remove('show');
        }
    });
});

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
            service: document.getElementById('service').value,
            // budget: document.getElementById('budget').value,
            timeline: document.getElementById('timeline').value,
            message: document.getElementById('message').value
        };

        // Send the form data
        fetch('https://www.digimarketing.sg/funding/contact-form.php', {
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
            message = 'Thank you! Your Request has been sent successfully.';
            toastClass = 'toast-success';
            icon = '✅';
        } else {
            message = 'Sorry, there was an error sending your Request. Please try again later.';
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

// Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('fundingModal');
    const modalClose = document.getElementById('modalClose');
    const fundingForm = document.getElementById('fundingForm');
    const submitBtn = document.querySelector('.modal-submit-btn');

    // Open modal - handle multiple buttons
    const modalButtons = document.querySelectorAll('.funding-modal-btn');
    modalButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });

    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form submission
    if (fundingForm) {
        fundingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitFundingForm();
        });
    }

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset form
        fundingForm.reset();
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Hide success message if exists
        const successMsg = document.querySelector('.success-message');
        if (successMsg) {
            successMsg.style.display = 'none';
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function submitFundingForm() {
        // Validate form
        if (!validateModalForm()) {
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Collect form data
        const formData = {
            firstName: document.getElementById('modalFirstName').value,
            lastName: document.getElementById('modalLastName').value,
            email: document.getElementById('modalEmail').value,
            phone: document.getElementById('modalPhone').value,
            website: document.getElementById('modalWebsite').value,
            service: document.getElementById('modalService').value,
            timeline: document.getElementById('modalTimeline').value,
            message: document.getElementById('modalMessage').value,
            formType: 'funding'
        };

        // Send the form data
        fetch('https://www.digimarketing.sg/funding/contact-form.php', {
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
                showSuccessMessage();
                // Close modal after 2 seconds
                setTimeout(() => {
                    closeModal();
                }, 2000);
            } else {
                showErrorMessage();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage();
        })
        .finally(() => {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        });
    }

    function validateModalForm() {
        let isValid = true;

        // Required fields validation
        const requiredFields = ['modalFirstName', 'modalEmail', 'modalPhone', 'modalService', 'modalTimeline', 'modalMessage'];
        requiredFields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (!element.value.trim()) {
                showFieldError(element, 'This field is required');
                isValid = false;
            } else {
                clearFieldError(element);
            }
        });

        // Email validation
        const email = document.getElementById('modalEmail');
        if (email.value.trim() && !isValidEmail(email.value)) {
            showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Phone validation
        const phone = document.getElementById('modalPhone');
        if (phone.value.trim() && !isValidPhone(phone.value)) {
            showFieldError(phone, 'Please enter a valid phone number');
            isValid = false;
        }

        // Website URL validation (if provided)
        const website = document.getElementById('modalWebsite');
        if (website.value.trim() && !isValidURL(website.value)) {
            showFieldError(website, 'Please enter a valid URL');
            isValid = false;
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    function showFieldError(element, message) {
        const formGroup = element.closest('.form-group');
        formGroup.classList.add('error');
        
        let errorDiv = formGroup.querySelector('.field-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            formGroup.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    function clearFieldError(element) {
        const formGroup = element.closest('.form-group');
        formGroup.classList.remove('error');
        const errorDiv = formGroup.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    function showSuccessMessage() {
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = '🎉 Thank you! Your funding application has been submitted successfully. We\'ll get back to you soon!';
        successMsg.style.display = 'block';
        
        const modalBody = document.querySelector('.modal-body');
        modalBody.appendChild(successMsg);
    }

    function showErrorMessage() {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.innerHTML = '❌ Sorry, there was an error submitting your application. Please try again later.';
        errorMsg.style.display = 'block';
        errorMsg.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        errorMsg.style.color = 'white';
        errorMsg.style.padding = '20px';
        errorMsg.style.borderRadius = '12px';
        errorMsg.style.textAlign = 'center';
        errorMsg.style.marginTop = '20px';
        errorMsg.style.fontWeight = '600';
        
        const modalBody = document.querySelector('.modal-body');
        modalBody.appendChild(errorMsg);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorMsg.parentNode) {
                errorMsg.remove();
            }
        }, 5000);
    }
});