// Jobs page functionality

let currentJobs = [];
let filteredJobs = [];
let currentPage = 1;
let itemsPerPage = 9;
let viewMode = 'grid';
let currentFilters = {
    search: '',
    location: '',
    category: '',
    jobTypes: [],
    workModes: [],
    sort: 'newest'
};

// Initialize jobs page
document.addEventListener('DOMContentLoaded', function() {
    initJobsPage();
    setupEventListeners();
    loadJobs();
});

function initJobsPage() {
    // Set initial view mode
    setViewMode('grid');
    
    // Apply URL parameters if any
    const searchParam = getUrlParameter('search');
    const locationParam = getUrlParameter('location');
    const categoryParam = getUrlParameter('category');
    
    if (searchParam) {
        document.getElementById('search-input').value = searchParam;
        currentFilters.search = searchParam;
    }
    
    if (locationParam) {
        document.getElementById('location-select').value = locationParam;
        currentFilters.location = locationParam;
    }
    
    if (categoryParam) {
        document.getElementById('category-filter').value = categoryParam;
        currentFilters.category = categoryParam;
    }
}

function setupEventListeners() {
    // Search input with debounce
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            currentFilters.search = this.value;
            applyFilters();
        }, 500));
    }
    
    // Location select
    const locationSelect = document.getElementById('location-select');
    if (locationSelect) {
        locationSelect.addEventListener('change', function() {
            currentFilters.location = this.value;
            applyFilters();
        });
    }
    
    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            currentFilters.category = this.value;
            applyFilters();
        });
    }
    
    // Job type filters
    document.querySelectorAll('.job-type-filter').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                currentFilters.jobTypes.push(this.value);
            } else {
                currentFilters.jobTypes = currentFilters.jobTypes.filter(type => type !== this.value);
            }
            applyFilters();
        });
    });
    
    // Work mode filters
    document.querySelectorAll('.work-mode-filter').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                currentFilters.workModes.push(this.value);
            } else {
                currentFilters.workModes = currentFilters.workModes.filter(mode => mode !== this.value);
            }
            applyFilters();
        });
    });
    
    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentFilters.sort = this.value;
            applyFilters();
        });
    }
    
    // Enter key for search
    searchInput?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchJobs();
        }
    });
}

// Load jobs from API
async function loadJobs() {
    showLoading(document.getElementById('jobs-container'));
    
    try {
        const response = await getData('jobs', { 
            limit: 100, // Load all jobs for client-side filtering
            status: 'active'
        });
        
        if (response && response.data) {
            currentJobs = response.data;
            filteredJobs = [...currentJobs];
            applyFilters();
        } else {
            showNoResults();
        }
    } catch (error) {
        console.error('Error loading jobs:', error);
        showError('Có lỗi xảy ra khi tải việc làm');
    }
}

// Coordinates for locations (hardcode or fetch from geocode API)
const locationCoords = {
  'Hồ Chí Minh': [10.7769, 106.7009],
  'Hà Nội': [21.0285, 105.8048],
  // Add more
};

function renderMap() {
  const mapContainer = document.getElementById('jobs-map');
  if (!mapContainer) return;

  const map = L.map('jobs-map').setView([16.0471, 108.2062], 5); // Center Vietnam

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Add markers for jobs
  filteredJobs.forEach(job => {
    const coords = locationCoords[job.location];
    if (coords) {
      L.marker(coords).addTo(map)
        .bindPopup(`<b>${job.company}</b><br>${job.title}<br>${job.location}`);
    }
  });
}

// Apply all filters
function applyFilters() {
    filteredJobs = currentJobs.filter(job => {
        // Search filter
        if (currentFilters.search) {
            const searchTerm = currentFilters.search.toLowerCase();
            const matchesSearch = 
                job.title.toLowerCase().includes(searchTerm) ||
                job.company.toLowerCase().includes(searchTerm) ||
                job.description.toLowerCase().includes(searchTerm) ||
                job.skills.some(skill => skill.toLowerCase().includes(searchTerm));
            
            if (!matchesSearch) return false;
        }
        
        // Location filter
        if (currentFilters.location && job.location !== currentFilters.location) {
            return false;
        }
        
        // Category filter
        if (currentFilters.category && job.category !== currentFilters.category) {
            return false;
        }
        
        // Job type filter
        if (currentFilters.jobTypes.length > 0 && !currentFilters.jobTypes.includes(job.type)) {
            return false;
        }
        
        // Work mode filter
        if (currentFilters.workModes.length > 0 && !currentFilters.workModes.includes(job.workMode)) {
            return false;
        }
        
        return true;
    });
    
    // Apply sorting
    applySorting();
    
    // Update URL
    updateUrlParameters();
    
    // Reset to first page
    currentPage = 1;
    
    // Render jobs
    renderJobs();
    updateJobsCount();
    renderPagination();
    renderMap();
}

// Apply sorting to filtered jobs
function applySorting() {
    switch (currentFilters.sort) {
        case 'newest':
            filteredJobs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
        case 'featured':
            filteredJobs.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return new Date(b.created_at) - new Date(a.created_at);
            });
            break;
        case 'salary':
            filteredJobs.sort((a, b) => {
                const getSalaryValue = (salaryString) => {
                    const numbers = salaryString.match(/\d+/g);
                    return numbers ? parseInt(numbers[numbers.length - 1]) : 0;
                };
                return getSalaryValue(b.salary) - getSalaryValue(a.salary);
            });
            break;
    }
}

// Update URL parameters
function updateUrlParameters() {
    const params = {};
    
    if (currentFilters.search) params.search = currentFilters.search;
    if (currentFilters.location) params.location = currentFilters.location;
    if (currentFilters.category) params.category = currentFilters.category;
    
    updateUrl(params);
}

// Render jobs based on current page and view mode
function renderJobs() {
    const container = document.getElementById('jobs-container');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const jobsToShow = filteredJobs.slice(startIndex, endIndex);
    
    if (jobsToShow.length === 0) {
        showNoResults();
        return;
    }
    
    hideNoResults();
    hideLoading();
    
    container.innerHTML = '';
    
    if (viewMode === 'grid') {
        container.className = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6';
        jobsToShow.forEach(job => {
            const jobCard = createJobCard(job);
            container.appendChild(jobCard);
        });
    } else {
        container.className = 'space-y-4';
        jobsToShow.forEach(job => {
            const jobCard = createJobListItem(job);
            container.appendChild(jobCard);
        });
    }
}

// Create job card for grid view
function createJobCard(job) {
    const div = document.createElement('div');
    div.className = 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover-scale border border-gray-200 dark:border-gray-700';
    
    const isJobSaved = Auth.isJobSaved(job.id);
    const saveButtonClass = isJobSaved 
        ? 'text-red-500 hover:text-red-700' 
        : 'text-gray-400 hover:text-red-500';
    
    div.innerHTML = `
        <div class="flex items-start justify-between mb-4">
            <img src="${job.companyLogo || 'https://via.placeholder.com/50x50/3b82f6/ffffff?text=C'}" 
                 alt="${job.company}" class="w-12 h-12 rounded-lg">
            <div class="flex space-x-2">
                ${job.featured ? '<span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Nổi bật</span>' : ''}
                <button onclick="toggleSaveJob('${job.id}')" class="p-1 ${saveButtonClass} transition-colors" title="${isJobSaved ? 'Bỏ lưu' : 'Lưu việc làm'}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">${job.title}</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-2">${job.company}</p>
        <div class="flex flex-wrap gap-2 mb-3">
            <span class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
                <i class="fas fa-map-marker-alt mr-1"></i>${job.location}
            </span>
            <span class="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded text-sm">
                ${job.salary}
            </span>
        </div>
        <div class="flex flex-wrap gap-2 mb-3">
            <span class="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-sm">
                ${job.type === 'full-time' ? 'Toàn thời gian' : job.type === 'part-time' ? 'Bán thời gian' : job.type === 'contract' ? 'Hợp đồng' : 'Thực tập'}
            </span>
            <span class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded text-sm">
                ${job.workMode === 'remote' ? 'Remote' : job.workMode === 'onsite' ? 'Onsite' : 'Hybrid'}
            </span>
        </div>
        <div class="flex flex-wrap gap-1 mb-4">
            ${job.skills.slice(0, 3).map(skill => 
                `<span class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs">${skill}</span>`
            ).join('')}
            ${job.skills.length > 3 ? `<span class="text-gray-500 text-xs px-2 py-1">+${job.skills.length - 3}</span>` : ''}
        </div>
        <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span><i class="fas fa-users mr-1"></i>${job.applicants || 0} ứng tuyển</span>
            <span><i class="fas fa-calendar mr-1"></i>Hạn: ${formatDate(job.deadline)}</span>
        </div>
        <a href="job-detail.html?id=${job.id}" class="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            Xem chi tiết
        </a>
    `;
    
    return div;
}

// Create job list item for list view
function createJobListItem(job) {
    const div = document.createElement('div');
    div.className = 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700';
    
    const isJobSaved = Auth.isJobSaved(job.id);
    const saveButtonClass = isJobSaved 
        ? 'text-red-500 hover:text-red-700' 
        : 'text-gray-400 hover:text-red-500';
    
    div.innerHTML = `
        <div class="flex items-start space-x-4">
            <img src="${job.companyLogo || 'https://via.placeholder.com/60x60/3b82f6/ffffff?text=C'}" 
                 alt="${job.company}" class="w-16 h-16 rounded-lg">
            <div class="flex-1">
                <div class="flex items-start justify-between">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${job.title}</h3>
                        <p class="text-gray-600 dark:text-gray-300">${job.company}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        ${job.featured ? '<span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Nổi bật</span>' : ''}
                        <button onclick="toggleSaveJob('${job.id}')" class="p-2 ${saveButtonClass} transition-colors" title="${isJobSaved ? 'Bỏ lưu' : 'Lưu việc làm'}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="flex flex-wrap gap-2 mt-2 mb-3">
                    <span class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
                        <i class="fas fa-map-marker-alt mr-1"></i>${job.location}
                    </span>
                    <span class="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded text-sm">
                        ${job.salary}
                    </span>
                    <span class="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-sm">
                        ${job.type === 'full-time' ? 'Toàn thời gian' : job.type === 'part-time' ? 'Bán thời gian' : job.type === 'contract' ? 'Hợp đồng' : 'Thực tập'}
                    </span>
                    <span class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded text-sm">
                        ${job.workMode === 'remote' ? 'Remote' : job.workMode === 'onsite' ? 'Onsite' : 'Hybrid'}
                    </span>
                </div>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">${job.description.substring(0, 150)}...</p>
                <div class="flex items-center justify-between">
                    <div class="flex flex-wrap gap-1">
                        ${job.skills.slice(0, 4).map(skill => 
                            `<span class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs">${skill}</span>`
                        ).join('')}
                        ${job.skills.length > 4 ? `<span class="text-gray-500 text-xs px-2 py-1">+${job.skills.length - 4}</span>` : ''}
                    </div>
                    <a href="job-detail.html?id=${job.id}" class="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-lg font-medium transition-colors">
                        Xem chi tiết
                    </a>
                </div>
            </div>
        </div>
    `;
    
    return div;
}

// Toggle save job
async function toggleSaveJob(jobId) {
    const isJobSaved = Auth.isJobSaved(jobId);
    
    if (isJobSaved) {
        const success = await Auth.unsaveJob(jobId);
        if (success) {
            renderJobs(); // Re-render to update save button states
        }
    } else {
        const success = await Auth.saveJob(jobId);
        if (success) {
            renderJobs(); // Re-render to update save button states
        }
    }
}

// Set view mode (grid or list)
function setViewMode(mode) {
    viewMode = mode;
    
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');
    
    if (mode === 'grid') {
        gridBtn.classList.add('bg-white', 'dark:bg-gray-600', 'text-primary-600');
        listBtn.classList.remove('bg-white', 'dark:bg-gray-600', 'text-primary-600');
    } else {
        listBtn.classList.add('bg-white', 'dark:bg-gray-600', 'text-primary-600');
        gridBtn.classList.remove('bg-white', 'dark:bg-gray-600', 'text-primary-600');
    }
    
    renderJobs();
}

// Search jobs
function searchJobs() {
    const searchTerm = document.getElementById('search-input').value;
    const location = document.getElementById('location-select').value;
    
    currentFilters.search = searchTerm;
    currentFilters.location = location;
    
    applyFilters();
}

// Clear all filters
function clearFilters() {
    // Reset form elements
    document.getElementById('search-input').value = '';
    document.getElementById('location-select').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('sort-select').value = 'newest';
    
    // Reset checkboxes
    document.querySelectorAll('.job-type-filter, .work-mode-filter').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset filters object
    currentFilters = {
        search: '',
        location: '',
        category: '',
        jobTypes: [],
        workModes: [],
        sort: 'newest'
    };
    
    applyFilters();
}

// Update jobs count display
function updateJobsCount() {
    const countElement = document.getElementById('jobs-count');
    if (countElement) {
        countElement.textContent = filteredJobs.length;
    }
}

// Render pagination
function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = `
        <div class="flex items-center space-x-2">
            <button onclick="goToPage(${currentPage - 1})" 
                    ${currentPage === 1 ? 'disabled' : ''} 
                    class="px-3 py-2 text-gray-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-left"></i>
            </button>
    `;
    
    // Show page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        paginationHTML += `<button onclick="goToPage(1)" class="px-3 py-2 text-gray-500 hover:text-primary-600">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span class="px-3 py-2 text-gray-500">...</span>`;
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const isActive = i === currentPage;
        paginationHTML += `
            <button onclick="goToPage(${i})" 
                    class="px-3 py-2 ${isActive 
                        ? 'bg-primary-600 text-white' 
                        : 'text-gray-500 hover:text-primary-600'
                    } rounded">
                ${i}
            </button>
        `;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="px-3 py-2 text-gray-500">...</span>`;
        }
        paginationHTML += `<button onclick="goToPage(${totalPages})" class="px-3 py-2 text-gray-500 hover:text-primary-600">${totalPages}</button>`;
    }
    
    paginationHTML += `
            <button onclick="goToPage(${currentPage + 1})" 
                    ${currentPage === totalPages ? 'disabled' : ''} 
                    class="px-3 py-2 text-gray-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

// Go to specific page
function goToPage(page) {
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderJobs();
    renderPagination();
    
    // Scroll to top of jobs section
    document.getElementById('jobs-container').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Show loading state
function showLoading(container) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.remove('hidden');
    }
    if (container) {
        container.innerHTML = '';
    }
}

// Hide loading state
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
    }
}

// Show no results message
function showNoResults() {
    const noResults = document.getElementById('no-results');
    const jobsContainer = document.getElementById('jobs-container');
    
    if (noResults) {
        noResults.classList.remove('hidden');
    }
    if (jobsContainer) {
        jobsContainer.innerHTML = '';
    }
    
    hideLoading();
}

// Hide no results message
function hideNoResults() {
    const noResults = document.getElementById('no-results');
    if (noResults) {
        noResults.classList.add('hidden');
    }
}

// Show error message
function showError(message) {
    showNotification(message, 'error');
    hideLoading();
}

// Export functions for global use
window.searchJobs = searchJobs;
window.clearFilters = clearFilters;
window.setViewMode = setViewMode;
window.toggleSaveJob = toggleSaveJob;
window.goToPage = goToPage;