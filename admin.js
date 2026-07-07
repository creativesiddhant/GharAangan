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

// 2. Dashboard Global State
let bookingsData = [];
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

const adminEmailDisplay = document.getElementById('admin-email-display');
const logoutBtn = document.getElementById('logout-btn');
const realtimeAlert = document.getElementById('realtime-alert');

const kpiTotalBookings = document.getElementById('kpi-total-bookings');
const kpiTotalLiters = document.getElementById('kpi-total-liters');
const kpiPopularPkg = document.getElementById('kpi-popular-pkg');

const tableSearchInput = document.getElementById('table-search');
const exportCsvBtn = document.getElementById('export-csv-btn');
const bookingsTableBody = document.getElementById('bookings-table-body');

// Quick session check to prevent login screen flash on page refresh
const projectRef = 'nliyrssnkfaghwyqvsrm';
const hasSession = localStorage.getItem(`sb-${projectRef}-auth-token`) !== null;
if (hasSession && loginContainer && dashboardContainer) {
    loginContainer.classList.add('hidden');
    dashboardContainer.classList.remove('hidden');
}

/* ==========================================================================
   4. Authentication State Watcher
   ========================================================================== */
if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange((event, session) => {
        if (session && session.user) {
            // User is authenticated successfully
            adminEmailDisplay.textContent = session.user.email;
            loginContainer.classList.add('hidden');
            dashboardContainer.classList.remove('hidden');
            
            // Fetch initial database records
            fetchBookings();
            
            // Set up real-time table notifications
            initRealtimeSubscription();
        } else {
            // User is logged out
            loginContainer.classList.remove('hidden');
            dashboardContainer.classList.add('hidden');
            
            // Clean up real-time channel
            if (realtimeChannel) {
                supabaseClient.removeChannel(realtimeChannel);
                realtimeChannel = null;
            }
        }
    });
}

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
            loginSubmitBtn.disabled = false;
            loginBtnText.classList.remove('hidden');
            loginBtnSpinner.classList.add('hidden');
        }
    } catch (err) {
        console.error('Unexpected auth exception:', err);
        loginErrorMsg.classList.remove('hidden');
        loginSubmitBtn.disabled = false;
        loginBtnText.classList.remove('hidden');
        loginBtnSpinner.classList.add('hidden');
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
            bookingsTableBody.innerHTML = `<tr><td colspan="5" class="table-no-data-row">Error fetching data. Check RLS Policies.</td></tr>`;
            return;
        }

        bookingsData = data || [];
        updateDashboardView();
    } catch (err) {
        console.error('Fetch exception:', err);
        bookingsTableBody.innerHTML = `<tr><td colspan="5" class="table-no-data-row">An unexpected error occurred.</td></tr>`;
    }
}

// Update stats, charts, and bookings list
function updateDashboardView() {
    updateKPIs();
    renderCharts();
    renderBookingsTable();
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
        return name.includes(filter) || mobile.includes(filter);
    });

    if (filteredData.length === 0) {
        bookingsTableBody.innerHTML = `<tr><td colspan="5" class="table-no-data-row">No bookings match search criteria.</td></tr>`;
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

        // Cells
        row.innerHTML = `
            <td class="date-cell">${formattedDate}</td>
            <td style="font-weight: 600;">${escapeHtml(booking.full_name)}</td>
            <td>+91 ${escapeHtml(booking.mobile_number)}</td>
            <td><span class="qty-badge">${escapeHtml(booking.quantity)}</span></td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <a href="tel:+91${booking.mobile_number}" class="btn-dial" title="Call Customer">
                        <i class="fa-solid fa-phone"></i>
                    </a>
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

    realtimeChannel = supabaseClient.channel('prebookings-live-channel')
        .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'prebookings'
        }, payload => {
            console.log('Real-time Insert Payload:', payload);
            
            // Push new booking to top of array
            bookingsData.unshift(payload.new);
            
            // Update Dashboard Visuals
            updateDashboardView();

            // Trigger visual banner sound / display notification
            triggerRealtimeBanner();
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
    csvContent += "Date & Time,Full Name,Mobile Number,Quantity Selected\n";

    bookingsData.forEach(booking => {
        const date = new Date(booking.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const name = `"${booking.full_name.replace(/"/g, '""')}"`;
        const mobile = `"${booking.mobile_number}"`;
        const qty = `"${booking.quantity}"`;
        
        csvContent += `${date},${name},${mobile},${qty}\n`;
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

// 11. Delete Pre-booking Action (authenticated users only via RLS)
window.deleteBooking = async function(id) {
    if (!supabaseClient) return;

    const confirmDelete = confirm("Are you sure you want to delete this pre-booking entry? This action cannot be undone.");
    if (!confirmDelete) return;

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
};
