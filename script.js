/* ==========================================================================
   Ghar Aangan - Interactivity and Form Logic Script
   ========================================================================== */

// Supabase Configuration
// Replace these placeholders with your actual Supabase URL and Anon Key
const SUPABASE_URL = 'https://nliyrssnkfaghwyqvsrm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5saXlyc3Nua2ZhZ2h3eXF2c3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MjE4ODYsImV4cCI6MjA5ODk5Nzg4Nn0.0SjFK9e5k766kXz1huQ59ACQvB6LU8XsW9Jc_D1W0Zk';
let supabaseClient = null;

if (typeof window.supabase !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initScrollAnimations();
    initFaqAccordion();
    initFormValidation();
    initMobileCtaScroll();
    initMobilePrebookScroll();
    logVisit();
});

/* ==========================================================================
   1. Countdown Timer Logic
   ========================================================================== */
function initCountdown() {
    // Target date: August 5, 2026 at 00:00:00 (Local Time)
    const targetDate = new Date('August 5, 2026 00:00:00').getTime();

    // DOM Elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            // Target date reached
            clearInterval(timerInterval);
            document.getElementById('countdown').innerHTML = `<div class="launch-completed-msg">WE HAVE LAUNCHED!</div>`;
            return;
        }

        // Time calculations
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Format numbers to always display 2 digits
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Run immediately and set interval
    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
}

/* ==========================================================================
   2. Scroll Triggered Reveal Animations
   ========================================================================== */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }
}

/* ==========================================================================
   3. FAQ Accordion Toggle
   ========================================================================== */
function initFaqAccordion() {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // Collapse all other questions
            questions.forEach(otherQuestion => {
                otherQuestion.classList.remove('active');
                otherQuestion.nextElementSibling.classList.remove('show');
            });

            // Toggle selected question
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('show');
            }
        });
    });
}

/* ==========================================================================
   4. Form Validation & Local Storage Check (Duplicate Prevention)
   ========================================================================== */
function initFormValidation() {
    const form = document.getElementById('prebook-form');
    const nameInput = document.getElementById('full-name');
    const mobileInput = document.getElementById('mobile-number');
    const quantitySelect = document.getElementById('ghee-quantity');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');

    const modal = document.getElementById('success-modal');
    const modalSuccessMsg = document.getElementById('modal-success-msg');
    const savedMobileEl = document.getElementById('saved-mobile');
    const savedQuantityEl = document.getElementById('saved-quantity');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (!form) return;

    // Direct input check helpers
    nameInput.addEventListener('input', () => {
        validateField(nameInput, nameInput.value.trim().length > 1, 'name-error');
    });

    mobileInput.addEventListener('input', () => {
        // Filter out non-digits immediately
        mobileInput.value = mobileInput.value.replace(/\D/g, '');
        const isValidMobile = /^[6-9]\d{9}$/.test(mobileInput.value);
        validateField(mobileInput, isValidMobile, 'mobile-error');
    });

    quantitySelect.addEventListener('change', () => {
        validateField(quantitySelect, quantitySelect.value !== '', 'quantity-error');
    });

    function validateField(inputElement, condition, errorId) {
        const group = inputElement.closest('.input-group');
        const errorSpan = document.getElementById(errorId);
        
        if (condition) {
            group.classList.remove('error');
            return true;
        } else {
            group.classList.add('error');
            return false;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Perform final check
        const isNameValid = validateField(nameInput, nameInput.value.trim().length > 1, 'name-error');
        const isMobileValid = validateField(mobileInput, /^[6-9]\d{9}$/.test(mobileInput.value), 'mobile-error');
        const isQtyValid = validateField(quantitySelect, quantitySelect.value !== '', 'quantity-error');

        if (!isNameValid || !isMobileValid || !isQtyValid) {
            // Find first error group and focus it
            const firstError = form.querySelector('.input-group.error input, .input-group.error select');
            if (firstError) firstError.focus();
            return;
        }

        const name = nameInput.value.trim();
        const mobile = mobileInput.value.trim();
        const quantity = quantitySelect.value;

        // Duplicate prevention using local storage
        let bookings = JSON.parse(localStorage.getItem('gharaangan_prebookings') || '[]');
        const isDuplicate = bookings.some(booking => booking.mobile === mobile);

        if (isDuplicate) {
            const mobileGroup = mobileInput.closest('.input-group');
            const mobileError = document.getElementById('mobile-error');
            mobileError.textContent = "This mobile number has already pre-booked. We'll contact you soon!";
            mobileGroup.classList.add('error');
            mobileInput.focus();
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        btnSpinner.classList.remove('hidden');

        // Helper function to complete pre-booking in UI
        function completePrebooking() {
            // Save booking locally
            bookings.push({ name, mobile, quantity, date: new Date().toISOString() });
            localStorage.setItem('gharaangan_prebookings', JSON.stringify(bookings));

            // Populate success modal
            savedMobileEl.textContent = `+91 ${mobile.substring(0, 5)}-${mobile.substring(5)}`;
            savedQuantityEl.textContent = quantity;
            modalSuccessMsg.innerHTML = `Congratulations <strong>${name}</strong>! Your batch reservation has been securely registered. We will send updates to your mobile number before our launch on <strong>5th August 2026</strong>.`;

            // Reset Form
            form.reset();
            
            // Remove error styles just in case
            document.querySelectorAll('.input-group').forEach(group => group.classList.remove('error'));

            // Show Success Modal
            modal.classList.add('active');

            // Restore button state
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnSpinner.classList.add('hidden');
        }

        if (supabaseClient) {
            // Real Supabase insert query
            supabaseClient
                .from('prebookings')
                .insert([
                    { full_name: name, mobile_number: mobile, quantity: quantity }
                ])
                .then(({ error }) => {
                    if (error) {
                        console.error('Supabase Error:', error);
                        alert('Supabase Database Error: ' + (error.message || 'Unknown error') + '\nDetails: ' + (error.details || 'None'));
                        
                        // Restore button state on error
                        submitBtn.disabled = false;
                        btnText.classList.remove('hidden');
                        btnSpinner.classList.add('hidden');
                    } else {
                        completePrebooking();
                    }
                })
                .catch(err => {
                    console.error('Execution Error:', err);
                    alert('Connection/Script Error: ' + (err.message || err));
                    
                    submitBtn.disabled = false;
                    btnText.classList.remove('hidden');
                    btnSpinner.classList.add('hidden');
                });
        } else {
            // Local fallback simulation (when Supabase URL is not replaced yet)
            console.log('Running local fallback simulation. Setup Supabase project keys to link.');
            setTimeout(completePrebooking, 1500);
        }
    });

    // Close Modal on Button click or backdrop click
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

/* ==========================================================================
   5. Sticky Mobile CTA scroll controller
   ========================================================================== */
function initMobileCtaScroll() {
    const ctaBar = document.getElementById('mobile-cta-bar');
    const prebookSection = document.getElementById('prebook');

    if (!ctaBar || !prebookSection) return;

    window.addEventListener('scroll', () => {
        // Only trigger on mobile viewports
        if (window.innerWidth > 768) {
            ctaBar.classList.remove('active');
            return;
        }

        const scrollPos = window.scrollY;
        const prebookRect = prebookSection.getBoundingClientRect();
        
        // Show CTA bar after scrolling 500px, but hide it when pre-book form is visible in viewport
        const formIsVisible = prebookRect.top < window.innerHeight && prebookRect.bottom > 0;

        if (scrollPos > 500 && !formIsVisible) {
            ctaBar.classList.add('active');
        } else {
            ctaBar.classList.remove('active');
        }
    });
}

/* ==========================================================================
   6. Visitor Tracking Logic (IP & Geolocation Logger)
   ========================================================================== */
async function logVisit() {
    // Prevent double logging within the same session
    if (sessionStorage.getItem('gharaangan_session_visited')) {
        return;
    }

    let ipData = {
        ip_address: 'Unknown',
        country: 'Unknown',
        city: 'Unknown',
        region: 'Unknown'
    };

    try {
        // Fetch location data from ipapi.co
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
            const data = await res.json();
            ipData.ip_address = data.ip || 'Unknown';
            ipData.country = data.country_name || 'Unknown';
            ipData.city = data.city || 'Unknown';
            ipData.region = data.region || 'Unknown';
        }
    } catch (err) {
        console.warn('Primary IP location lookup failed, attempting fallback...', err);
        try {
            // Fallback: ipinfo.io
            const res = await fetch('https://ipinfo.io/json');
            if (res.ok) {
                const data = await res.json();
                ipData.ip_address = data.ip || 'Unknown';
                ipData.country = data.country || 'Unknown';
                ipData.city = data.city || 'Unknown';
                ipData.region = data.region || 'Unknown';
            }
        } catch (fallbackErr) {
            console.error('All IP location providers failed:', fallbackErr);
        }
    }

    if (supabaseClient) {
        try {
            const { error } = await supabaseClient
                .from('site_visits')
                .insert([
                    {
                        ip_address: ipData.ip_address,
                        country: ipData.country,
                        city: ipData.city,
                        region: ipData.region,
                        user_agent: navigator.userAgent
                    }
                ]);
            
            if (!error) {
                sessionStorage.setItem('gharaangan_session_visited', 'true');
            } else {
                console.error('Database failed to log visit:', error);
            }
        } catch (dbErr) {
            console.error('Error logging visit to database:', dbErr);
        }
    }
}

/* ==========================================================================
   7. Mobile Prebook Smooth Scroll Offset
   ========================================================================== */
function initMobilePrebookScroll() {
    function scrollToForm(smooth = true) {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            const targetForm = document.getElementById('prebook-form');
            if (targetForm) {
                targetForm.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'center' });
            }
        }
    }

    // 1. Intercept link clicks on mobile
    document.querySelectorAll('a[href="#prebook"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                e.preventDefault();
                scrollToForm(true);
                // Update URL hash silently
                history.pushState(null, null, '#prebook');
            }
        });
    });

    // 2. Intercept page load with hash #prebook
    if (window.location.hash === '#prebook') {
        // Wait for rendering to complete before running scroll
        setTimeout(() => {
            scrollToForm(true);
        }, 600);
    }
}

