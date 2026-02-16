// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Accessibility: Toggle aria-expanded
        const isExpanded = mobileMenu.classList.contains('active');
        mobileMenu.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
    }));
}

// Comparison Sliders
document.querySelectorAll('.comparison-container').forEach(container => {
    const slider = container.querySelector('.slider-range');
    const imgBefore = container.querySelector('.img-before');
    const sliderLine = container.querySelector('.slider-line');
    const sliderIcon = container.querySelector('.slider-icon');

    function updateSlider() {
        const val = slider.value;
        // Update clip-path to reveal 'before' image based on slider value
        // The 'before' image is on top. We clip it from the right.
        imgBefore.style.clipPath = `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`;

        // Move the visible line and icon
        sliderLine.style.left = `${val}%`;
        sliderIcon.style.left = `${val}%`;
    }

    slider.addEventListener('input', updateSlider);

    // Initialize
    updateSlider();
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isExpanded = question.getAttribute('aria-expanded') === 'true';

        // Close all other open items (optional, but good for "flush" style)
        document.querySelectorAll('.faq-question').forEach(item => {
            if (item !== question) {
                item.setAttribute('aria-expanded', 'false');
                item.nextElementSibling.style.maxHeight = null;
            }
        });

        // Toggle current item
        question.setAttribute('aria-expanded', !isExpanded);

        if (!isExpanded) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Reveal Animation on Scroll
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}



window.addEventListener('scroll', reveal);

// Trigger once on load
reveal();

// --- Analytics Tracking ---

// Track WhatsApp Clicks
const whatsappBtn = document.querySelector('.whatsapp-float');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
        if (typeof gtag === 'function') {
            gtag('event', 'click_whatsapp', {
                'event_category': 'Contact',
                'event_label': 'WhatsApp Floating Button'
            });
        }
        if (typeof clarity === 'function') {
            clarity('event', 'click_whatsapp');
        }
        console.log('Analytics: WhatsApp Clicked');
    });
}

// Track Phone Number Clicks
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (typeof gtag === 'function') {
            gtag('event', 'click_call', {
                'event_category': 'Contact',
                'event_label': 'Phone Number Link'
            });
        }
        console.log('Analytics: Phone Call Clicked');
    });
});


// Form Validation & AJAX Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerText;
        const formNote = contactForm.querySelector('.form-note');

        // Basic validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const formAction = contactForm.action;

        // check if the form action is the default placeholder 
        if (formAction.includes('YOUR_FORM_ID')) {
            setTimeout(() => {
                alert(`Thank you, ${name}! This is a demo. To make this work, you need to sign up for Formspree and update the form action URL in index.html.`);
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1000);
            return;
        }

        try {
            const response = await fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formNote.innerText = "Thank you! Your message has been sent.";
                formNote.style.color = "green";
                contactForm.reset();

                // --- TRACKING: Form Success ---
                if (typeof gtag === 'function') {
                    gtag('event', 'generate_lead', {
                        'event_category': 'Form',
                        'event_label': 'Contact Form Submission'
                    });
                }
                if (typeof clarity === 'function') {
                    clarity('event', 'generate_lead');
                }
                console.log('Analytics: Lead Generated');
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    formNote.innerText = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    formNote.innerText = "Oops! There was a problem submitting your form";
                }
                formNote.style.color = "red";
            }
        } catch (error) {
            formNote.innerText = "Oops! There was a problem submitting your form";
            formNote.style.color = "red";
        } finally {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;

            // Clear success message after 5 seconds
            setTimeout(() => {
                formNote.innerText = "We will get back to you within 24 hours.";
                formNote.style.color = "";
            }, 5000);
        }
    });
}
