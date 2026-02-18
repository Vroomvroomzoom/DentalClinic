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

// Smart Directions — reusable OS-aware function
function openNativeNavigator() {
    // UPDATE THESE with your real clinic coordinates and address
    const lat = 40.758895;
    const lng = -73.987319;
    const address = '123 Dental Avenue, City Center';

    const userAgent = navigator.userAgent || navigator.vendor || '';

    if (/iPad|iPhone|iPod/.test(userAgent)) {
        // iOS → Apple Maps
        window.location.href = `maps://maps.apple.com/?daddr=${lat},${lng}&q=${encodeURIComponent(address)}`;
    } else if (/android/i.test(userAgent)) {
        // Android → Native intent (user picks Waze, Google Maps, etc.)
        window.location.href = `geo:${lat},${lng}?q=${encodeURIComponent(address)}`;
    } else {
        // Desktop / Other → Google Maps in a new tab
        const win = window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
        if (win) win.opener = null;
    }
}

// Wire directions to section button
const getDirectionsBtn = document.getElementById('getDirectionsBtn');
if (getDirectionsBtn) {
    getDirectionsBtn.addEventListener('click', openNativeNavigator);
}

// Wire directions to action bar button
const actionDirectionsBtn = document.getElementById('actionDirectionsBtn');
if (actionDirectionsBtn) {
    actionDirectionsBtn.addEventListener('click', openNativeNavigator);
}

// Scroll Spy — highlight active nav link based on current section
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Animated Counter for Stats Row
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        if (counter.dataset.animated) return;

        const rect = counter.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;

        counter.dataset.animated = 'true';
        const target = parseFloat(counter.dataset.target);
        const isDecimal = counter.dataset.decimal === 'true';
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out curve
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            if (isDecimal) {
                counter.textContent = current.toFixed(1);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                if (isDecimal) {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
        }

        requestAnimationFrame(update);
    });
}

window.addEventListener('scroll', animateCounters);
animateCounters();

// Dynamic Copyright Year (moved from inline script for CSP compliance)
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Clinic Open/Closed Status
function updateClinicStatus() {
    const statusEl = document.getElementById('clinic-status');
    if (!statusEl) return;

    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours + minutes / 60; // e.g. 9:30 = 9.5

    let isOpen = false;

    if (day >= 1 && day <= 5) {
        // Mon–Fri: 9:00 AM – 6:00 PM
        isOpen = time >= 9 && time < 18;
    } else if (day === 6) {
        // Sat: 10:00 AM – 2:00 PM
        isOpen = time >= 10 && time < 14;
    }
    // Sunday: closed

    if (isOpen) {
        statusEl.className = 'clinic-status open';
        statusEl.innerHTML = '<span class="status-dot" aria-hidden="true"></span> Open Now';
    } else {
        statusEl.className = 'clinic-status closed';
        statusEl.innerHTML = '<span class="status-dot" aria-hidden="true"></span> Closed';
    }
}

updateClinicStatus();
setInterval(updateClinicStatus, 60000); // Update every minute
