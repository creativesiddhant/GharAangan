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
    initRecentBookingsNotifications();
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

            // Trigger recent booking notification event
            window.dispatchEvent(new CustomEvent('new-prebooking', { 
                detail: { full_name: name, quantity: quantity } 
            }));

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

/* ==========================================================================
   7. Recent Bookings Real-Time Notification Logic
   ========================================================================== */
function initRecentBookingsNotifications() {
    // List of cities for deterministic location mapping when database does not have city info
    const IndianCities = ["Delhi", "Mumbai", "Bengaluru", "Dehradun", "Haldwani", "Pune", "Jaipur", "Rishikesh", "Noida", "Gurugram", "Ahmedabad", "Chandigarh", "Lucknow", "Kolkata", "Chennai", "Hyderabad", "Haridwar", "Nainital", "Almora", "Roorkee"];
    
    // Rich list of realistic premium pre-seeded bookings to build initial hype
    const PreSeededBookings = [
        { name: "Rahul", city: "Delhi", quantity: "2 Litres" },
        { name: "Priya", city: "Dehradun", quantity: "1 Litre" },
        { name: "Aarav", city: "Mumbai", quantity: "500ml" },
        { name: "Amit", city: "Haldwani", quantity: "2 Litres" },
        { name: "Neha", city: "Bengaluru", quantity: "1 Litre" },
        { name: "Siddharth", city: "Pune", quantity: "5 Litres" },
        { name: "Ananya", city: "Jaipur", quantity: "1 Litre" },
        { name: "Rajesh", city: "Rishikesh", quantity: "2 Litres" },
        { name: "Kiran", city: "Gurugram", quantity: "500ml" },
        { name: "Meera", city: "Noida", quantity: "1 Litre" },
        { name: "Vikram", city: "Haridwar", quantity: "5 Litres" },
        { name: "Deepa", city: "Ahmedabad", quantity: "2 Litres" },
        { name: "Rohit", city: "Chandigarh", quantity: "1 Litre" },
        { name: "Sneha", city: "Delhi", quantity: "2 Litres" },
        { name: "Vijay", city: "Lucknow", quantity: "5 Litres" },
        { name: "Shreya", city: "Kolkata", quantity: "1 Litre" },
        { name: "Raj", city: "Hyderabad", quantity: "2 Litres" },
        { name: "Pooja", city: "Nainital", quantity: "500ml" }
    ];

    let bookingsPool = [...PreSeededBookings];
    let newBookingsQueue = [];
    let displayedCount = 0;
    const maxSessionNotifications = 8; // Session cap for auto-played notifications to remain premium and non-intrusive
    
    // Create notification container
    const container = document.createElement('div');
    container.className = 'booking-toast-container';
    document.body.appendChild(container);

    // Hash name to get a consistent Indian city (so "Rahul" always maps to the same city on multiple page loads)
    function getCityForName(name) {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % IndianCities.length;
        return IndianCities[index];
    }

    // Standardize quantity strings to clean short-form (e.g. "2 Litres" instead of "2 Litres (2 x 1L Tins)")
    function cleanQuantity(qty) {
        if (!qty) return "1 Litre";
        const match = qty.match(/^(\d+(?:\.\d+)?\s*(?:Litre|Litres|ml|g|kg))/i);
        return match ? match[1] : qty;
    }

    // Load recent actual bookings from Supabase database to dynamically include real names/quantities
    async function loadHistoricBookings() {
        if (!supabaseClient) return;
        try {
            const { data, error } = await supabaseClient
                .from('prebookings')
                .select('full_name, quantity')
                .order('created_at', { ascending: false })
                .limit(20);

            if (error) throw error;
            if (data && data.length > 0) {
                const formattedReal = data.map(b => {
                    const fullName = b.full_name || "Someone";
                    const firstName = fullName.split(' ')[0];
                    const qty = cleanQuantity(b.quantity);
                    const city = getCityForName(fullName);
                    return { name: firstName, city: city, quantity: qty };
                });
                // Seed real bookings at the front of the rotation pool
                bookingsPool = [...formattedReal, ...PreSeededBookings];
            }
        } catch (err) {
            console.warn('Real-time notification database load fallback:', err);
        }
    }

    let currentToast = null;
    let toastTimeout = null;

    // Build and slide in a notification toast
    function showNotification(booking, isNew = false) {
        // Enforce notification limits on automatic/seeded notifications (live/real-time updates always show)
        if (displayedCount >= maxSessionNotifications && !isNew) return;

        // Animate out the active toast if present
        if (currentToast) {
            currentToast.classList.remove('active');
            const oldToast = currentToast;
            setTimeout(() => oldToast.remove(), 600);
            clearTimeout(toastTimeout);
        }

        const toast = document.createElement('div');
        toast.className = 'booking-toast';
        
        toast.innerHTML = `
            <div class="booking-toast-icon">
                <i class="fa-solid fa-check"></i>
            </div>
            <div class="booking-toast-content">
                <strong>${booking.name}</strong> from <strong>${booking.city}</strong> recently pre-booked <strong>${booking.quantity}</strong> of our ghee.
            </div>
            <button class="booking-toast-close" title="Close Notification">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

        container.appendChild(toast);
        currentToast = toast;

        // Slide in animation delay
        setTimeout(() => toast.classList.add('active'), 50);
        if (!isNew) displayedCount++;

        // Manual Close trigger
        const closeBtn = toast.querySelector('.booking-toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.remove('active');
            setTimeout(() => toast.remove(), 600);
            if (currentToast === toast) currentToast = null;
            clearTimeout(toastTimeout);
        });

        // Auto fade out timer (6 seconds display time)
        toastTimeout = setTimeout(() => {
            toast.classList.remove('active');
            setTimeout(() => toast.remove(), 600);
            if (currentToast === toast) currentToast = null;
        }, 6000);
    }

    // Pull from real-time queue or pick from previous/historic pool
    function showNextNotification() {
        if (newBookingsQueue.length > 0) {
            const nextNew = newBookingsQueue.shift();
            showNotification(nextNew, true);
        } else {
            if (bookingsPool.length === 0) return;
            // Draw a random booking from the pool
            const randomIndex = Math.floor(Math.random() * bookingsPool.length);
            const booking = bookingsPool[randomIndex];
            showNotification(booking, false);
        }
    }

    // Formats and queues a brand new pre-booking
    function handleNewBookingNotification(dbBooking) {
        const fullName = dbBooking.full_name || "Someone";
        const firstName = fullName.split(' ')[0];
        const qty = cleanQuantity(dbBooking.quantity);
        const city = getCityForName(fullName);
        const newBooking = { name: firstName, city: city, quantity: qty };
        
        // Push to real-time display queue
        newBookingsQueue.push(newBooking);

        // Prepend to pool so it rotates in later
        bookingsPool.unshift(newBooking);

        // Display immediately (smooth offset if another toast is active)
        if (currentToast) {
            setTimeout(showNextNotification, 1000);
        } else {
            showNextNotification();
        }
    }

    // Intercept local submissions (so the browser owner instantly sees their booking reflected)
    window.addEventListener('new-prebooking', (e) => {
        if (e.detail) {
            handleNewBookingNotification(e.detail);
        }
    });

    // Start scheduler
    loadHistoricBookings().then(() => {
        // Initial delay before showing the first booking
        setTimeout(() => {
            showNextNotification();
            
            // Loop at an elegant, premium interval (every 45 seconds) to avoid spamming
            setInterval(() => {
                showNextNotification();
            }, 45000);
        }, 8000);
    });

    // Subscribe to live inserts via Supabase Realtime channel
    if (supabaseClient) {
        try {
            supabaseClient
                .channel('public-prebookings-realtime')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'prebookings' }, payload => {
                    if (payload.new) {
                        handleNewBookingNotification(payload.new);
                    }
                })
                .subscribe();
        } catch (e) {
            console.warn('Realtime pre-bookings channel offline:', e);
        }
    }
}


