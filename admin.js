/* ==========================================================================
   Ghar Aangan - Super Admin Dashboard Script
   ========================================================================== */

// 1. Supabase Initialization
const SUPABASE_URL = 'https://nliyrssnkfaghwyqvsrm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5saXlyc3Nua2ZhZ2h3eXF2c3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MjE4ODYsImV4cCI6MjA5ODk5Nzg4Nn0.0SjFK9e5k766kXz1huQ59ACQvB6LU8XsW9Jc_D1W0Zk';

let supabaseClient = null;
if (typeof window.supabase !== 'undefined') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Indian States and Cities dataset for auto-complete select option
const indianStatesAndCities = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada", "Anantapur", "Eluru"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Namsai", "Tawang"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar"],
    "Chandigarh": ["Chandigarh"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Jagdalpur", "Ambikapur", "Dhamtari"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Silvassa", "Daman", "Diu"],
    "Delhi": ["New Delhi", "Delhi Cantt.", "Dwarka", "Rohini", "Vasant Kunj", "Saket", "Janakpuri", "Karol Bagh", "Shahdara"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh", "Gandhidham", "Anand", "Morbi"],
    "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Nahan", "Baddi"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Udhampur"],
    "Jharkhand": ["Jamshedpur", "Dhanbad", "Ranchi", "Bokaro Steel City", "Deoghar", "Phusro", "Hazaribagh", "Giridih"],
    "Karnataka": ["Bengaluru", "Hubballi-Dharwad", "Mysuru", "Kalaburagi", "Mangaluru", "Belagavi", "Davangere", "Ballari", "Tumakuru", "Shivamogga"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Alappuzha", "Palakkad", "Malappuram", "Kannur"],
    "Ladakh": ["Leh", "Kargil"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Pimpri-Chinchwad", "Nashik", "Kalyan-Dombivli", "Vasai-Virar", "Aurangabad", "Navi Mumbai", "Solapur", "Kolhapur"],
    "Manipur": ["Imphal", "Thoubal", "Kakching"],
    "Meghalaya": ["Shillong", "Tura", "Jowai"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
    "Nagaland": ["Dimapur", "Kohima", "Mokokchung", "Wokha"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada"],
    "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Pathankot", "Moga"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Sikar", "Sri Ganganagar"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tiruppur", "Erode", "Vellore", "Thoothukudi", "Nagercoil"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar"],
    "Tripura": ["Agartala", "Dharmanagar", "Udaipur"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Noida", "Greater Noida", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Jhansi"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Haldwani", "Roorkee", "Rudrapur", "Kashipur", "Rishikesh"],
    "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Siliguri", "Asansol", "Durgapur", "Maheshtala", "Rajpur Sonarpur", "Gopalpur", "Bhatpara", "Kharagpur"]
};

function bindStateCityAutocomplete(stateElement, cityElement, datalistElement) {
    if (!stateElement || !cityElement || !datalistElement) return;

    stateElement.addEventListener('change', () => {
        const selectedState = stateElement.value;
        cityElement.value = ''; // clear previous city selection
        datalistElement.innerHTML = ''; // clear previous options

        if (selectedState && indianStatesAndCities[selectedState]) {
            indianStatesAndCities[selectedState].forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                datalistElement.appendChild(option);
            });
        }
    });
}

// 2. Dashboard Global State
let bookingsData = [];
let visitsData = [];
let quantityChart = null;
let timelineChart = null;
let realtimeChannel = null;

// 3. DOM Elements
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('dashboard-container');
const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('admin-email');
const loginPasswordInput = document.getElementById('admin-password');
const loginErrorMsg = document.getElementById('login-error-msg');
const loginSubmitBtn = document.getElementById('login-submit-btn');
const loginBtnText = loginSubmitBtn.querySelector('.btn-text');
const loginBtnSpinner = loginSubmitBtn.querySelector('.btn-spinner');

// Helper to reset login submit button state
function resetLoginButtonState() {
    if (loginSubmitBtn) loginSubmitBtn.disabled = false;
    if (loginBtnText) loginBtnText.classList.remove('hidden');
    if (loginBtnSpinner) loginBtnSpinner.classList.add('hidden');
    if (loginPasswordInput) loginPasswordInput.value = '';
}

const adminEmailDisplay = document.getElementById('admin-email-display');
const logoutBtn = document.getElementById('logout-btn');
const realtimeAlert = document.getElementById('realtime-alert');

const kpiTotalBookings = document.getElementById('kpi-total-bookings');
const kpiTotalLiters = document.getElementById('kpi-total-liters');
const kpiPopularPkg = document.getElementById('kpi-popular-pkg');
const kpiTotalVisitors = document.getElementById('kpi-total-visitors');
const visitorsTableBody = document.getElementById('visitors-table-body');
const clearVisitsBtn = document.getElementById('clear-visits-btn');

const tableSearchInput = document.getElementById('table-search');
const exportCsvBtn = document.getElementById('export-csv-btn');
const bookingsTableBody = document.getElementById('bookings-table-body');

/* ==========================================================================
   Cookie Helpers for Persistent Sessions
   ========================================================================== */
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax; Secure";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name + '=; Max-Age=-99999999; path=/; SameSite=Lax; Secure';
}

// Quick session check to prevent login screen flash on page refresh
const hasCachedSession = Object.keys(localStorage).some(key => key.includes('auth-token') || key.includes('supabase')) || (getCookie('sb-admin-access-token') && getCookie('sb-admin-refresh-token'));
if (hasCachedSession && loginContainer && dashboardContainer) {
    loginContainer.classList.add('hidden');
    dashboardContainer.classList.remove('hidden');
}


/* ==========================================================================
   4. Authentication State Watcher & Session Restoration
   ========================================================================== */
async function restoreSession() {
    if (!supabaseClient) return;
    
    try {
        let currentSession = null;
        
        // 1. Get the current session from Supabase memory/localStorage
        const { data: { session } } = await supabaseClient.auth.getSession();
        currentSession = session;
        
        // 2. If no session is found, check if we have persistent cookies to restore
        if (!currentSession) {
            const accessToken = getCookie('sb-admin-access-token');
            const refreshToken = getCookie('sb-admin-refresh-token');
            
            if (accessToken && refreshToken) {
                console.log('Attempting to restore session from cookies...');
                const { data, error } = await supabaseClient.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken
                });
                
                if (!error && data.session) {
                    currentSession = data.session;
                    console.log('Session successfully restored from cookies.');
                } else {
                    console.warn('Failed to restore session from cookies:', error ? error.message : 'No session returned');
                    eraseCookie('sb-admin-access-token');
                    eraseCookie('sb-admin-refresh-token');
                }
            }
        }
        
        // 3. Handle session state UI updates
        if (currentSession && currentSession.user) {
            console.log('Session restored successfully:', currentSession.user.email);
            adminEmailDisplay.textContent = currentSession.user.email;
            loginContainer.classList.add('hidden');
            dashboardContainer.classList.remove('hidden');
            if (bookingsData.length === 0) {
                fetchBookings();
            }
            if (visitsData.length === 0) {
                fetchVisits();
            }
            if (!realtimeChannel) {
                initRealtimeSubscription();
            }
        } else {
            console.log('No valid session, showing login.');
            loginContainer.classList.remove('hidden');
            dashboardContainer.classList.add('hidden');
            resetLoginButtonState();
        }
    } catch (err) {
        console.error('Session restore exception:', err);
        loginContainer.classList.remove('hidden');
        dashboardContainer.classList.add('hidden');
        resetLoginButtonState();
    }
}

if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange((event, session) => {
        console.log('Auth State Changed:', event, session ? session.user.email : 'null');
        if (session && session.user) {
            // Save session tokens to cookies (valid for 7 days)
            setCookie('sb-admin-access-token', session.access_token, 7);
            setCookie('sb-admin-refresh-token', session.refresh_token, 7);

            // User is authenticated successfully
            adminEmailDisplay.textContent = session.user.email;
            loginContainer.classList.add('hidden');
            dashboardContainer.classList.remove('hidden');
            
            // Only fetch if data is empty (to avoid double fetch during restoreSession)
            if (bookingsData.length === 0) {
                fetchBookings();
            }
            if (visitsData.length === 0) {
                fetchVisits();
            }
            
            // Set up real-time table notifications
            if (!realtimeChannel) {
                initRealtimeSubscription();
            }
        } else if (event === 'SIGNED_OUT' || (event !== 'INITIAL_SESSION' && !session)) {
            // Erase cookies
            eraseCookie('sb-admin-access-token');
            eraseCookie('sb-admin-refresh-token');

            // Explicitly logged out or no session
            loginContainer.classList.remove('hidden');
            dashboardContainer.classList.add('hidden');
            bookingsData = [];
            visitsData = [];
            resetLoginButtonState();
            
            // Clean up real-time channel
            if (realtimeChannel) {
                supabaseClient.removeChannel(realtimeChannel);
                realtimeChannel = null;
            }
        }
    });
}

// Call restoreSession immediately on load
restoreSession();

// Login Form Submit handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!supabaseClient) return;

    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value.trim();

    if (!email || !password) return;

    // Reset login states
    loginErrorMsg.classList.add('hidden');
    loginSubmitBtn.disabled = true;
    loginBtnText.classList.add('hidden');
    loginBtnSpinner.classList.remove('hidden');

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error('Authentication error:', error.message);
            loginErrorMsg.classList.remove('hidden');
            resetLoginButtonState();
        }
    } catch (err) {
        console.error('Unexpected auth exception:', err);
        loginErrorMsg.classList.remove('hidden');
        resetLoginButtonState();
    }
});

// Logout Button handler
logoutBtn.addEventListener('click', async () => {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
});

/* ==========================================================================
   5. Database Fetching & Updating Logic
   ========================================================================== */
async function fetchBookings() {
    if (!supabaseClient) return;

    try {
        const { data, error } = await supabaseClient
            .from('prebookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching bookings:', error.message);
            bookingsTableBody.innerHTML = `<tr><td colspan="6" class="table-no-data-row">Error fetching data. Check RLS Policies.</td></tr>`;
            return;
        }

        bookingsData = data || [];
        updateDashboardView();
    } catch (err) {
        console.error('Fetch exception:', err);
        bookingsTableBody.innerHTML = `<tr><td colspan="6" class="table-no-data-row">An unexpected error occurred.</td></tr>`;
    }
}

async function fetchVisits() {
    if (!supabaseClient) return;

    try {
        // 1. Delete visitor logs older than 12 hours to save DB space
        const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();
        const { error: deleteError } = await supabaseClient
            .from('site_visits')
            .delete()
            .lt('created_at', twelveHoursAgo);

        if (deleteError) {
            console.warn('Error cleaning up old visitor logs:', deleteError.message);
        }

        // 2. Fetch the remaining visits (from the last 12 hours)
        const { data, error } = await supabaseClient
            .from('site_visits')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching visits:', error.message);
            if (visitorsTableBody) {
                visitorsTableBody.innerHTML = `<tr><td colspan="5" class="table-no-data-row">Error fetching data. Check RLS Policies.</td></tr>`;
            }
            return;
        }

        visitsData = data || [];

        // 3. Fetch the total lifetime visitors count via RPC function
        let totalVisitorsCount = visitsData.length;
        const { data: totalCount, error: rpcError } = await supabaseClient
            .rpc('get_total_visitors');

        if (!rpcError && totalCount !== null) {
            totalVisitorsCount = totalCount;
        } else {
            console.warn('Error fetching total visitors via RPC, falling back to local count:', rpcError?.message);
        }

        updateVisitsView(totalVisitorsCount);
    } catch (err) {
        console.error('Fetch visits exception:', err);
        if (visitorsTableBody) {
            visitorsTableBody.innerHTML = `<tr><td colspan="5" class="table-no-data-row">An unexpected error occurred.</td></tr>`;
        }
    }
}

function updateVisitsView(totalCount) {
    if (kpiTotalVisitors) {
        kpiTotalVisitors.textContent = totalCount !== undefined ? totalCount : visitsData.length;
    }
    renderVisitsTable();
}

function renderVisitsTable() {
    if (!visitorsTableBody) return;
    visitorsTableBody.innerHTML = '';

    if (visitsData.length === 0) {
        visitorsTableBody.innerHTML = `<tr><td colspan="5" class="table-loading-row" style="color: var(--text-muted);">No visitors recorded yet.</td></tr>`;
        return;
    }

    const recentVisits = visitsData.slice(0, 100);

    recentVisits.forEach(visit => {
        const row = document.createElement('tr');
        
        const date = new Date(visit.created_at);
        const formattedDate = date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }) + ' ' + date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const parsedUA = parseUserAgent(visit.user_agent);

        const city = visit.city || 'Unknown';
        const region = visit.region || 'Unknown';
        const country = visit.country || 'Unknown';
        const locationStr = (city === 'Unknown' && region === 'Unknown') 
            ? 'Unknown Location' 
            : `${city}, ${region}`;

        row.innerHTML = `
            <td class="date-cell">${formattedDate}</td>
            <td style="font-family: monospace; font-weight: 500;">${escapeHtml(visit.ip_address)}</td>
            <td>
                <span class="location-badge" style="font-weight: 600; color: var(--primary-green);">
                    ${escapeHtml(country)}
                </span>
            </td>
            <td>${escapeHtml(locationStr)}</td>
            <td style="font-size: 0.85rem; color: var(--text-muted);" title="${escapeHtml(visit.user_agent)}">${escapeHtml(parsedUA)}</td>
        `;

        visitorsTableBody.appendChild(row);
    });
}

function parseUserAgent(ua) {
    if (!ua) return 'Unknown';
    
    let os = 'Unknown';
    let browser = 'Unknown';
    
    if (ua.indexOf('Windows') !== -1) os = 'Windows';
    else if (ua.indexOf('Macintosh') !== -1) os = 'macOS';
    else if (ua.indexOf('iPhone') !== -1) os = 'iOS';
    else if (ua.indexOf('Android') !== -1) os = 'Android';
    else if (ua.indexOf('Linux') !== -1) os = 'Linux';
    
    if (ua.indexOf('Firefox') !== -1) browser = 'Firefox';
    else if (ua.indexOf('SamsungBrowser') !== -1) browser = 'Samsung Browser';
    else if (ua.indexOf('Chrome') !== -1) browser = 'Chrome';
    else if (ua.indexOf('Safari') !== -1) browser = 'Safari';
    else if (ua.indexOf('Edge') !== -1 || ua.indexOf('Edg') !== -1) browser = 'Edge';
    else if (ua.indexOf('Trident') !== -1) browser = 'Internet Explorer';
    
    if (os !== 'Unknown' && browser !== 'Unknown') {
        return `${browser} on ${os}`;
    } else if (os !== 'Unknown') {
        return `Browser on ${os}`;
    } else if (browser !== 'Unknown') {
        return browser;
    }
    return 'Unknown Device';
}

// Update stats, charts, and bookings list
function updateDashboardView() {
    try {
        updateKPIs();
    } catch (e) {
        console.error('Error updating KPIs:', e);
    }
    
    try {
        renderCharts();
    } catch (e) {
        console.error('Error rendering charts:', e);
    }
    
    try {
        renderBookingsTable();
    } catch (e) {
        console.error('Error rendering bookings table:', e);
    }
}

/* ==========================================================================
   6. KPI Calculators
   ========================================================================== */
function updateKPIs() {
    // KPI 1: Total count
    const totalCount = bookingsData.length;
    kpiTotalBookings.textContent = totalCount;

    // KPI 2: Total Liters
    let totalLiters = 0;
    const qtyCounts = {};

    bookingsData.forEach(booking => {
        const qty = booking.quantity;
        qtyCounts[qty] = (qtyCounts[qty] || 0) + 1;

        if (qty === '500ml') {
            totalLiters += 0.5;
        } else if (qty === '1 Litre') {
            totalLiters += 1.0;
        } else if (qty === '2 Litres') {
            totalLiters += 2.0;
        } else if (qty === '5 Litres') {
            totalLiters += 5.0;
        }
    });

    kpiTotalLiters.textContent = `${totalLiters} L`;

    // KPI 3: Popular package
    let popularPkg = 'None';
    let maxCount = 0;

    for (const [pkg, count] of Object.entries(qtyCounts)) {
        if (count > maxCount) {
            maxCount = count;
            popularPkg = pkg;
        }
    }
    
    kpiPopularPkg.textContent = popularPkg;
}

/* ==========================================================================
   7. Chart.js Graphs Monitor
   ========================================================================== */
function renderCharts() {
    // 7A. Package demand distribution datasets
    const qtyCounts = {
        '500ml': 0,
        '1 Litre': 0,
        '2 Litres': 0,
        '5 Litres': 0
    };

    bookingsData.forEach(booking => {
        if (qtyCounts[booking.quantity] !== undefined) {
            qtyCounts[booking.quantity]++;
        }
    });

    const labels = Object.keys(qtyCounts);
    const dataValues = Object.values(qtyCounts);

    // Destroy existing chart to prevent canvas reuse errors
    if (quantityChart) quantityChart.destroy();

    const qtyCtx = document.getElementById('quantityChart').getContext('2d');
    quantityChart = new Chart(qtyCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Jars / Tins Pre-booked',
                data: dataValues,
                backgroundColor: [
                    'rgba(212, 175, 55, 0.7)',  // Gold
                    'rgba(30, 63, 32, 0.7)',    // Forest Green
                    'rgba(92, 75, 62, 0.7)',    // Earthy Brown
                    'rgba(46, 204, 113, 0.7)'   // Soft Green
                ],
                borderColor: [
                    '#D4AF37',
                    '#1E3F20',
                    '#5C4B3E',
                    '#2ECC71'
                ],
                borderWidth: 1.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, color: '#5C4B3E' },
                    grid: { color: '#EBE4DA' }
                },
                x: {
                    ticks: { color: '#5C4B3E' },
                    grid: { display: false }
                }
            }
        }
    });

    // 7B. Daily Trend line chart dataset
    const dailyTrend = {};
    
    // Sort chronologically (oldest to newest for plotting timeline)
    const sortedData = [...bookingsData].reverse();

    sortedData.forEach(booking => {
        if (!booking.created_at) return;
        const dateStr = new Date(booking.created_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short'
        });
        dailyTrend[dateStr] = (dailyTrend[dateStr] || 0) + 1;
    });

    const timelineLabels = Object.keys(dailyTrend);
    const timelineValues = Object.values(dailyTrend);

    if (timelineChart) timelineChart.destroy();

    const timeCtx = document.getElementById('timelineChart').getContext('2d');
    timelineChart = new Chart(timeCtx, {
        type: 'line',
        data: {
            labels: timelineLabels,
            datasets: [{
                label: 'New Bookings',
                data: timelineValues,
                fill: true,
                backgroundColor: 'rgba(30, 63, 32, 0.1)',
                borderColor: '#1E3F20',
                borderWidth: 2,
                tension: 0.3,
                pointBackgroundColor: '#D4AF37',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, color: '#5C4B3E' },
                    grid: { color: '#EBE4DA' }
                },
                x: {
                    ticks: { color: '#5C4B3E' },
                    grid: { display: false }
                }
            }
        }
    });
}

/* ==========================================================================
   8. Registry Table Renderer with Search Filters
   ========================================================================== */
function renderBookingsTable() {
    const filter = tableSearchInput.value.toLowerCase().trim();
    bookingsTableBody.innerHTML = '';

    const filteredData = bookingsData.filter(booking => {
        const name = (booking.full_name || '').toLowerCase();
        const mobile = (booking.mobile_number || '').toLowerCase();
        const city = (booking.city || '').toLowerCase();
        const state = (booking.state || '').toLowerCase();
        return name.includes(filter) || mobile.includes(filter) || city.includes(filter) || state.includes(filter);
    });

    if (filteredData.length === 0) {
        bookingsTableBody.innerHTML = `<tr><td colspan="6" class="table-no-data-row">No bookings match search criteria.</td></tr>`;
        return;
    }

    filteredData.forEach(booking => {
        const row = document.createElement('tr');
        
        // Date Formatter
        const date = new Date(booking.created_at);
        const formattedDate = date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }) + ' ' + date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Location formatting
        const city = booking.city ? escapeHtml(booking.city) : '';
        const state = booking.state ? escapeHtml(booking.state) : '';
        const locationStr = (city && state) ? `${city}, ${state}` : (city || state || '—');

        // Cells
        row.innerHTML = `
            <td class="date-cell">${formattedDate}</td>
            <td style="font-weight: 600;">${escapeHtml(booking.full_name)}</td>
            <td>+91 ${escapeHtml(booking.mobile_number)}</td>
            <td>${locationStr}</td>
            <td><span class="qty-badge">${escapeHtml(booking.quantity)}</span></td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <a href="tel:+91${booking.mobile_number}" class="btn-dial" title="Call Customer">
                        <i class="fa-solid fa-phone"></i>
                     </a>
                    <button class="btn-edit" onclick="openEditBookingModal(${booking.id})" title="Edit Pre-booking" style="background-color: var(--accent-light); color: var(--gold); border: 1px solid rgba(212,175,55,0.3); border-radius: var(--border-radius-sm); padding: 8px; width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: var(--transition-smooth);">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteBooking(${booking.id})" title="Delete Pre-booking">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;

        bookingsTableBody.appendChild(row);
    });
}

// Search keyup filter
tableSearchInput.addEventListener('keyup', renderBookingsTable);

// Escapes HTML tags to prevent XSS in table names
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

/* ==========================================================================
   9. Supabase Real-time Listener (Instant updates on mobile screen)
   ========================================================================== */
function initRealtimeSubscription() {
    if (!supabaseClient) return;

    realtimeChannel = supabaseClient.channel('dashboard-live-channel')
        .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'prebookings'
        }, payload => {
            console.log('Real-time Insert Payload:', payload);
            
            // Push new booking to top of array if not already present
            const alreadyExists = bookingsData.some(b => b.id === payload.new.id);
            if (!alreadyExists) {
                bookingsData.unshift(payload.new);
                updateDashboardView();
                triggerRealtimeBanner();
            }
        })
        .on('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'prebookings'
        }, payload => {
            console.log('Real-time Update Payload:', payload);
            const idx = bookingsData.findIndex(b => b.id === payload.new.id);
            if (idx !== -1) {
                bookingsData[idx] = payload.new;
                updateDashboardView();
            } else {
                fetchBookings();
            }
        })
        .on('postgres_changes', {
            event: 'DELETE',
            schema: 'public',
            table: 'prebookings'
        }, payload => {
            console.log('Real-time Delete Payload:', payload);
            const deletedId = payload.old.id;
            bookingsData = bookingsData.filter(booking => booking.id !== deletedId);
            updateDashboardView();
        })
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'site_visits'
        }, payload => {
            console.log('Real-time Visitor Payload:', payload);
            if (payload.eventType === 'INSERT') {
                visitsData.unshift(payload.new);
                // Increment the UI counter for a new lifetime visit
                if (kpiTotalVisitors) {
                    const currentVal = parseInt(kpiTotalVisitors.textContent, 10) || 0;
                    kpiTotalVisitors.textContent = currentVal + 1;
                }
                renderVisitsTable();
            } else if (payload.eventType === 'DELETE') {
                if (payload.old && payload.old.id) {
                    visitsData = visitsData.filter(visit => visit.id !== payload.old.id);
                } else {
                    fetchVisits();
                    return;
                }
                // Do not decrement total visitors count on delete as it is a lifetime total
                renderVisitsTable();
            }
        })
        .subscribe();
}

function triggerRealtimeBanner() {
    realtimeAlert.classList.remove('hidden');
    
    // Auto collapse after 5 seconds
    setTimeout(() => {
        realtimeAlert.classList.add('hidden');
    }, 5000);
}

/* ==========================================================================
   10. CSV Exporter Utility
   ========================================================================== */
exportCsvBtn.addEventListener('click', () => {
    if (bookingsData.length === 0) {
        alert('No pre-bookings available to export.');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date & Time,Full Name,Mobile Number,City,State,Quantity Selected\n";

    bookingsData.forEach(booking => {
        const date = new Date(booking.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const name = `"${(booking.full_name || '').replace(/"/g, '""')}"`;
        const mobile = `"${booking.mobile_number || ''}"`;
        const city = `"${(booking.city || '').replace(/"/g, '""')}"`;
        const state = `"${(booking.state || '').replace(/"/g, '""')}"`;
        const qty = `"${booking.quantity || ''}"`;
        
        csvContent += `${date},${name},${mobile},${city},${state},${qty}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    
    const timestamp = new Date().toISOString().substring(0, 10);
    link.setAttribute("download", `Ghar_Aangan_Prebookings_${timestamp}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Helper for custom confirmation modal
function showConfirm(title, message, onConfirm) {
    const modal = document.getElementById('confirm-modal');
    const titleEl = document.getElementById('confirm-title');
    const messageEl = document.getElementById('confirm-message');
    const cancelBtn = document.getElementById('confirm-cancel-btn');
    const okBtn = document.getElementById('confirm-ok-btn');
    
    if (!modal || !titleEl || !messageEl || !cancelBtn || !okBtn) {
        // Fallback to standard confirm
        if (confirm(message)) {
            onConfirm();
        }
        return;
    }
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    // Clear previous event listeners by cloning
    const newCancelBtn = cancelBtn.cloneNode(true);
    const newOkBtn = okBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
    okBtn.parentNode.replaceChild(newOkBtn, okBtn);
    
    modal.classList.add('active');
    
    newCancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    newOkBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        onConfirm();
    });
    
    // Also close on overlay click
    const handleBackdrop = (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.removeEventListener('click', handleBackdrop);
        }
    };
    modal.addEventListener('click', handleBackdrop);
}

// 11. Delete Pre-booking Action (authenticated users only via RLS)
window.deleteBooking = async function(id) {
    if (!supabaseClient) return;

    showConfirm(
        "Delete Pre-booking",
        "Are you sure you want to delete this pre-booking entry? This action cannot be undone.",
        async () => {
            try {
                const { error } = await supabaseClient
                    .from('prebookings')
                    .delete()
                    .eq('id', id);

                if (error) {
                    console.error('Error deleting booking:', error.message);
                    alert('Failed to delete booking: ' + error.message);
                } else {
                    // Delete locally from bookingsData array to trigger instant UI refresh
                    bookingsData = bookingsData.filter(booking => booking.id !== id);
                    updateDashboardView();
                }
            } catch (err) {
                console.error('Delete exception:', err);
                alert('An unexpected error occurred while deleting.');
            }
        }
    );
};

// 12. Clear Visitor Logs Action (authenticated users only via RLS)
if (clearVisitsBtn) {
    clearVisitsBtn.addEventListener('click', () => {
        if (!supabaseClient) return;

        showConfirm(
            "Clear Visitor Logs",
            "Are you sure you want to clear ALL visitor logs? This action cannot be undone.",
            async () => {
                try {
                    const { error } = await supabaseClient
                        .from('site_visits')
                        .delete()
                        .gt('id', 0);

                    if (error) {
                        console.error('Error clearing visits:', error.message);
                        alert('Failed to clear visitor logs: ' + error.message);
                    } else {
                        visitsData = [];
                        // Re-fetch to ensure the RPC total count is maintained and view is updated
                        fetchVisits();
                        alert('Visitor logs cleared successfully.');
                    }
                } catch (err) {
                    console.error('Clear visits exception:', err);
                    alert('An unexpected error occurred while clearing visitor logs.');
                }
            }
        );
    });
}

/* ==========================================================================
   13. Add Manual Booking Functionality
   ========================================================================== */
const addBookingModal = document.getElementById('add-booking-modal');
const addBookingBtn = document.getElementById('add-booking-btn');
const closeBookingModalXBtn = document.getElementById('close-modal-x-btn');
const closeBookingModalBtn = document.getElementById('close-add-booking-modal');
const manualBookingForm = document.getElementById('manual-booking-form');

const manualNameInput = document.getElementById('manual-full-name');
const manualMobileInput = document.getElementById('manual-mobile-number');
const manualQuantitySelect = document.getElementById('manual-quantity');

const manualNameGroup = document.getElementById('manual-name-group');
const manualMobileGroup = document.getElementById('manual-mobile-group');
const manualQuantityGroup = document.getElementById('manual-quantity-group');

const submitManualBookingBtn = document.getElementById('submit-manual-booking-btn');
const submitBtnText = submitManualBookingBtn ? submitManualBookingBtn.querySelector('.btn-text') : null;
const submitBtnSpinner = submitManualBookingBtn ? submitManualBookingBtn.querySelector('.btn-spinner') : null;

// Toggle Modal Open
if (addBookingBtn) {
    addBookingBtn.addEventListener('click', () => {
        if (addBookingModal) {
            // Reset validation states and inputs
            resetManualForm();
            addBookingModal.classList.add('active');
        }
    });
}

// Toggle Modal Close
function closeManualBookingModal() {
    if (addBookingModal) {
        addBookingModal.classList.remove('active');
    }
}

if (closeBookingModalXBtn) {
    closeBookingModalXBtn.addEventListener('click', closeManualBookingModal);
}

if (closeBookingModalBtn) {
    closeBookingModalBtn.addEventListener('click', closeManualBookingModal);
}

// Close Modal on backdrop click
if (addBookingModal) {
    addBookingModal.addEventListener('click', (e) => {
        if (e.target === addBookingModal) {
            closeManualBookingModal();
        }
    });
}

// Reset Form Inputs and Errors
function resetManualForm() {
    if (manualBookingForm) {
        manualBookingForm.reset();
    }
    
    // Clear validation error classes
    if (manualNameGroup) manualNameGroup.classList.remove('invalid');
    if (manualMobileGroup) manualMobileGroup.classList.remove('invalid');
    if (manualQuantityGroup) manualQuantityGroup.classList.remove('invalid');
    
    // Restore button state
    if (submitManualBookingBtn) {
        submitManualBookingBtn.disabled = false;
    }
    if (submitBtnText) {
        submitBtnText.classList.remove('hidden');
    }
    if (submitBtnSpinner) {
        submitBtnSpinner.classList.add('hidden');
    }
}

// Form Validation and Submission
if (manualBookingForm) {
    manualBookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        const fullName = manualNameInput.value.trim();
        const mobileNumber = manualMobileInput.value.trim();
        const quantity = manualQuantitySelect.value;
        const cityVal = document.getElementById('manual-city') ? document.getElementById('manual-city').value.trim() : '';
        const stateVal = document.getElementById('manual-state') ? document.getElementById('manual-state').value.trim() : '';
        
        // 1. Validate Name
        if (!fullName) {
            if (manualNameGroup) manualNameGroup.classList.add('invalid');
            isValid = false;
        } else {
            if (manualNameGroup) manualNameGroup.classList.remove('invalid');
        }
        
        // 2. Validate Mobile (10-digit, starting with 6-9)
        const mobilePattern = /^[6-9]\d{9}$/;
        if (!mobileNumber || !mobilePattern.test(mobileNumber)) {
            if (manualMobileGroup) manualMobileGroup.classList.add('invalid');
            isValid = false;
        } else {
            if (manualMobileGroup) manualMobileGroup.classList.remove('invalid');
        }
        
        // 3. Validate Quantity
        if (!quantity) {
            if (manualQuantityGroup) manualQuantityGroup.classList.add('invalid');
            isValid = false;
        } else {
            if (manualQuantityGroup) manualQuantityGroup.classList.remove('invalid');
        }
        
        if (!isValid) return;
        
        // Disable button and show spinner
        if (submitManualBookingBtn) {
            submitManualBookingBtn.disabled = true;
        }
        if (submitBtnText) {
            submitBtnText.classList.add('hidden');
        }
        if (submitBtnSpinner) {
            submitBtnSpinner.classList.remove('hidden');
        }
        
        try {
            if (!supabaseClient) {
                alert('Supabase client is not initialized.');
                resetManualForm();
                return;
            }
            
            // Insert new booking
            const { data, error } = await supabaseClient
                .from('prebookings')
                .insert([
                    { full_name: fullName, mobile_number: mobileNumber, quantity: quantity, city: cityVal, state: stateVal }
                ])
                .select();
                
            console.log('[ManualBooking] Insert response:', { data, error });

            if (error) {
                console.error('Error inserting manual booking:', error.message);
                alert('Failed to add pre-booking: ' + error.message);
                
                // Restore button state
                if (submitManualBookingBtn) {
                    submitManualBookingBtn.disabled = false;
                }
                if (submitBtnText) {
                    submitBtnText.classList.remove('hidden');
                }
                if (submitBtnSpinner) {
                    submitBtnSpinner.classList.add('hidden');
                }
            } else {
                // Success: Close modal and show success alert
                closeManualBookingModal();
                
                // If real-time did not update (e.g. not connected), we manually reload
                let addedLocally = false;
                if (data && data.length > 0) {
                    const alreadyExists = bookingsData.some(b => b.id === data[0].id);
                    if (!alreadyExists) {
                        bookingsData.unshift(data[0]);
                        updateDashboardView();
                        addedLocally = true;
                    }
                }
                
                if (!addedLocally) {
                    await fetchBookings();
                }
                
                alert('Pre-booking successfully recorded!');
            }
        } catch (err) {
            console.error('Insert manual booking exception:', err);
            alert('An unexpected error occurred while adding manual booking.');
            
            // Restore button state
            if (submitManualBookingBtn) {
                submitManualBookingBtn.disabled = false;
            }
            if (submitBtnText) {
                submitBtnText.classList.remove('hidden');
            }
            if (submitBtnSpinner) {
                submitBtnSpinner.classList.add('hidden');
            }
        }
    });
}

// Clear invalid class on input/change
if (manualNameInput) {
    manualNameInput.addEventListener('input', () => {
        if (manualNameInput.value.trim()) {
            if (manualNameGroup) manualNameGroup.classList.remove('invalid');
        }
    });
}

if (manualMobileInput) {
    manualMobileInput.addEventListener('input', () => {
        const mobilePattern = /^[6-9]\d{9}$/;
        if (mobilePattern.test(manualMobileInput.value.trim())) {
            if (manualMobileGroup) manualMobileGroup.classList.remove('invalid');
        }
    });
}

if (manualQuantitySelect) {
    manualQuantitySelect.addEventListener('change', () => {
        if (manualQuantitySelect.value) {
            if (manualQuantityGroup) manualQuantityGroup.classList.remove('invalid');
        }
    });
}

/* ==========================================================================
   14. Edit Pre-booking Functionality
   ========================================================================== */
const editBookingModal = document.getElementById('edit-booking-modal');
const closeEditModalXBtn = document.getElementById('close-edit-modal-x-btn');
const closeEditModalBtn = document.getElementById('close-edit-booking-modal');
const editBookingForm = document.getElementById('edit-booking-form');

const editBookingIdInput = document.getElementById('edit-booking-id');
const editNameInput = document.getElementById('edit-full-name');
const editMobileInput = document.getElementById('edit-mobile-number');
const editCityInput = document.getElementById('edit-city');
const editStateInput = document.getElementById('edit-state');
const editQuantitySelect = document.getElementById('edit-quantity');

const editNameGroup = document.getElementById('edit-name-group');
const editMobileGroup = document.getElementById('edit-mobile-group');
const editQuantityGroup = document.getElementById('edit-quantity-group');

const submitEditBookingBtn = document.getElementById('submit-edit-booking-btn');
const editSubmitBtnText = submitEditBookingBtn ? submitEditBookingBtn.querySelector('.btn-text') : null;
const editSubmitBtnSpinner = submitEditBookingBtn ? submitEditBookingBtn.querySelector('.btn-spinner') : null;

window.openEditBookingModal = function(id) {
    const booking = bookingsData.find(b => b.id === id);
    if (!booking) return;

    // Reset errors
    if (editNameGroup) editNameGroup.classList.remove('invalid');
    if (editMobileGroup) editMobileGroup.classList.remove('invalid');
    if (editQuantityGroup) editQuantityGroup.classList.remove('invalid');

    // Populate fields
    editBookingIdInput.value = booking.id;
    editNameInput.value = booking.full_name || '';
    editMobileInput.value = booking.mobile_number || '';
    
    // Select state dropdown value
    const stateVal = booking.state || '';
    editStateInput.value = stateVal;
    
    // Clear datalist and populate it with cities of this state
    const editCityDatalist = document.getElementById('edit-city-datalist');
    if (editCityDatalist) {
        editCityDatalist.innerHTML = '';
        if (stateVal && indianStatesAndCities[stateVal]) {
            indianStatesAndCities[stateVal].forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                editCityDatalist.appendChild(option);
            });
        }
    }
    
    editCityInput.value = booking.city || '';
    editQuantitySelect.value = booking.quantity || '';

    // Show modal
    if (editBookingModal) {
        editBookingModal.classList.add('active');
    }
};

function closeEditBookingModal() {
    if (editBookingModal) {
        editBookingModal.classList.remove('active');
    }
}

if (closeEditModalXBtn) closeEditModalXBtn.addEventListener('click', closeEditBookingModal);
if (closeEditModalBtn) closeEditModalBtn.addEventListener('click', closeEditBookingModal);

if (editBookingModal) {
    editBookingModal.addEventListener('click', (e) => {
        if (e.target === editBookingModal) {
            closeEditBookingModal();
        }
    });
}

if (editBookingForm) {
    editBookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isValid = true;
        const id = parseInt(editBookingIdInput.value, 10);
        const fullName = editNameInput.value.trim();
        const mobileNumber = editMobileInput.value.trim();
        const city = editCityInput.value.trim();
        const state = editStateInput.value.trim();
        const quantity = editQuantitySelect.value;

        // Validate fields
        if (!fullName) {
            if (editNameGroup) editNameGroup.classList.add('invalid');
            isValid = false;
        } else {
            if (editNameGroup) editNameGroup.classList.remove('invalid');
        }

        const mobilePattern = /^[6-9]\d{9}$/;
        if (!mobileNumber || !mobilePattern.test(mobileNumber)) {
            if (editMobileGroup) editMobileGroup.classList.add('invalid');
            isValid = false;
        } else {
            if (editMobileGroup) editMobileGroup.classList.remove('invalid');
        }

        if (!quantity) {
            if (editQuantityGroup) editQuantityGroup.classList.add('invalid');
            isValid = false;
        } else {
            if (editQuantityGroup) editQuantityGroup.classList.remove('invalid');
        }

        if (!isValid) return;

        // Loading state
        if (submitEditBookingBtn) submitEditBookingBtn.disabled = true;
        if (editSubmitBtnText) editSubmitBtnText.classList.add('hidden');
        if (editSubmitBtnSpinner) editSubmitBtnSpinner.classList.remove('hidden');

        try {
            if (!supabaseClient) {
                alert('Supabase client is not initialized.');
                closeEditBookingModal();
                return;
            }

            const { data, error } = await supabaseClient
                .from('prebookings')
                .update({
                    full_name: fullName,
                    mobile_number: mobileNumber,
                    city: city,
                    state: state,
                    quantity: quantity
                })
                .eq('id', id)
                .select();

            console.log('[EditBooking] Update response:', { data, error });

            if (error) {
                console.error('Error updating booking:', error.message);
                alert('Failed to update booking: ' + error.message);
            } else {
                // Update locally
                const updatedRow = data && data[0];
                let updated = false;
                if (updatedRow) {
                    const idx = bookingsData.findIndex(b => b.id === id);
                    if (idx !== -1) {
                        bookingsData[idx] = updatedRow;
                        updateDashboardView();
                        updated = true;
                    }
                }
                
                // Fallback: If not updated locally (e.g. data returned is empty due to RLS select), reload from DB
                if (!updated) {
                    await fetchBookings();
                }
                
                closeEditBookingModal();
            }
        } catch (err) {
            console.error('Update exception:', err);
            alert('An unexpected error occurred while saving changes.');
        } finally {
            if (submitEditBookingBtn) submitEditBookingBtn.disabled = false;
            if (editSubmitBtnText) editSubmitBtnText.classList.remove('hidden');
            if (editSubmitBtnSpinner) editSubmitBtnSpinner.classList.add('hidden');
        }
    });
}

// Bind autocomplete for Manual Booking Modal
bindStateCityAutocomplete(
    document.getElementById('manual-state'),
    document.getElementById('manual-city'),
    document.getElementById('manual-city-datalist')
);

// Bind autocomplete for Edit Booking Modal
bindStateCityAutocomplete(
    document.getElementById('edit-state'),
    document.getElementById('edit-city'),
    document.getElementById('edit-city-datalist')
);

