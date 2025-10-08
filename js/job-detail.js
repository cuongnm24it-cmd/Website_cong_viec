// Job Detail Page functionality

let currentJob = null;
let jobId = null;

// Initialize job detail page
document.addEventListener('DOMContentLoaded', function() {
    jobId = getUrlParameter('id');
    
    if (!jobId) {
        showJobNotFound();
        return;
    }
    
    loadJobDetail();
    setupEventListeners();
});

function setupEventListeners() {
    // Resume upload
    const resumeUpload = document.getElementById('resume-upload');
    if (resumeUpload) {
        resumeUpload.addEventListener('change', handleResumeUpload);
    }
    
    // User dropdown toggle
    const userAvatar = document.getElementById('user-avatar');
    const userDropdown = document.getElementById('user-dropdown');
    
    if (userAvatar && userDropdown) {
        userAvatar.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('hidden');
        });
        
        document.addEventListener('click', function() {
            userDropdown.classList.add('hidden');
        });
    }
}

// Load job detail from API
async function loadJobDetail() {
    try {
        const response = await getData('jobs', { 
            search: jobId,
            limit: 1
        });
        
        if (response && response.data && response.data.length > 0) {
            // Find job by exact ID match
            currentJob = response.data.find(job => job.id === jobId);
            
            if (currentJob) {
                displayJobDetail();
                loadRelatedJobs();
                updateSaveButton();
            } else {
                showJobNotFound();
            }
        } else {
            showJobNotFound();
        }
    } catch (error) {
        console.error('Error loading job detail:', error);
        showNotification('Có lỗi xảy ra khi tải thông tin công việc', 'error');
        showJobNotFound();
    }
}

// Display job detail
function displayJobDetail() {
    if (!currentJob) return;
    
    // Update page title
    document.title = `${currentJob.title} - ${currentJob.company} - SkillConnect`;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-title').textContent = currentJob.title;
    
    // Company logo
    const companyLogo = currentJob.companyLogo || 'https://via.placeholder.com/80x80/3b82f6/ffffff?text=C';
    document.getElementById('company-logo').src = companyLogo;
    document.getElementById('company-logo').alt = currentJob.company;
    document.getElementById('company-logo-sidebar').src = companyLogo;
    document.getElementById('company-logo-sidebar').alt = currentJob.company;
    
    // Job title and company
    document.getElementById('job-title').textContent = currentJob.title;
    document.getElementById('company-name').textContent = currentJob.company;
    document.getElementById('company-name-sidebar').textContent = currentJob.company;
    
    // Featured badge
    const featuredBadge = document.getElementById('featured-badge');
    if (currentJob.featured) {
        featuredBadge.classList.remove('hidden');
    }
    
    // Job details
    document.getElementById('job-location').textContent = currentJob.location;
    document.getElementById('job-salary').textContent = currentJob.salary;
    document.getElementById('company-location').textContent = currentJob.location;
    document.getElementById('company-industry').textContent = currentJob.category;
    
    // Job type and work mode
    const jobTypeText = getJobTypeText(currentJob.type);
    const workModeText = getWorkModeText(currentJob.workMode);
    
    document.getElementById('job-type-badge').innerHTML = `
        <i class="fas fa-clock mr-2"></i>${jobTypeText}
    `;
    document.getElementById('work-mode-badge').innerHTML = `
        <i class="fas fa-laptop-house mr-2"></i>${workModeText}
    `;
    
    // Skills
    const skillsContainer = document.getElementById('job-skills');
    skillsContainer.innerHTML = '';
    currentJob.skills.forEach(skill => {
        const skillBadge = document.createElement('span');
        skillBadge.className = 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm';
        skillBadge.textContent = skill;
        skillsContainer.appendChild(skillBadge);
    });
    
    // Job content
    document.getElementById('job-description').innerHTML = formatContent(currentJob.description);
    document.getElementById('job-requirements').innerHTML = formatContent(currentJob.requirements);
    document.getElementById('job-benefits').innerHTML = formatContent(currentJob.benefits);
    
    // Job info sidebar
    document.getElementById('job-category').textContent = currentJob.category;
    document.getElementById('applicants-count').textContent = `${currentJob.applicants || 0} người`;
    document.getElementById('job-deadline').textContent = formatDate(currentJob.deadline);
    document.getElementById('job-posted-date').textContent = formatDate(currentJob.created_at);
    
    // Modal job info
    document.getElementById('modal-job-title').textContent = currentJob.title;
    document.getElementById('modal-company-name').textContent = currentJob.company;
    
    // Show job content
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('job-content').classList.remove('hidden');
    
    // Check if deadline has passed
    checkJobDeadline();
}

// Load related jobs
async function loadRelatedJobs() {
    try {
        const response = await getData('jobs', {
            limit: 4,
            status: 'active'
        });
        
        if (response && response.data) {
            // Filter out current job and find jobs from same category or company
            const relatedJobs = response.data
                .filter(job => 
                    job.id !== currentJob.id && 
                    (job.category === currentJob.category || job.company === currentJob.company)
                )
                .slice(0, 3);
            
            displayRelatedJobs(relatedJobs);
        }
    } catch (error) {
        console.error('Error loading related jobs:', error);
    }
}

// Display related jobs
function displayRelatedJobs(jobs) {
    const container = document.getElementById('related-jobs');
    container.innerHTML = '';
    
    if (jobs.length === 0) {
        container.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-sm">Không có việc làm liên quan</p>';
        return;
    }
    
    jobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow';
        
        jobElement.innerHTML = `
            <h4 class="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">${job.title}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">${job.company}</p>
            <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>${job.location}</span>
                <span>${job.salary}</span>
            </div>
            <a href="job-detail.html?id=${job.id}" class="block mt-3 text-primary-600 dark:text-primary-400 text-sm hover:underline">
                Xem chi tiết
            </a>
        `;
        
        container.appendChild(jobElement);
    });
}

// Format content for display
function formatContent(content) {
    if (!content) return '';
    
    // Convert line breaks to HTML
    return content
        .split('\n')
        .map(line => {
            line = line.trim();
            if (line.startsWith('- ')) {
                return `<li class="ml-4">${line.substring(2)}</li>`;
            }
            return line ? `<p class="mb-2">${line}</p>` : '';
        })
        .join('');
}

// Get job type display text
function getJobTypeText(type) {
    const types = {
        'full-time': 'Toàn thời gian',
        'part-time': 'Bán thời gian',
        'contract': 'Hợp đồng',
        'internship': 'Thực tập'
    };
    return types[type] || type;
}

// Get work mode display text
function getWorkModeText(mode) {
    const modes = {
        'remote': 'Remote',
        'onsite': 'Onsite',
        'hybrid': 'Hybrid'
    };
    return modes[mode] || mode;
}

// Check if job deadline has passed
function checkJobDeadline() {
    const deadline = new Date(currentJob.deadline);
    const now = new Date();
    
    if (deadline < now) {
        const applyBtn = document.getElementById('apply-btn');
        applyBtn.innerHTML = '<i class="fas fa-calendar-times mr-2"></i>Hết hạn ứng tuyển';
        applyBtn.disabled = true;
        applyBtn.classList.remove('bg-primary-600', 'hover:bg-primary-700');
        applyBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
        
        // Add warning message
        const deadlineElement = document.getElementById('job-deadline');
        deadlineElement.innerHTML = formatDate(currentJob.deadline) + ' <span class="text-red-600 font-semibold">(Đã hết hạn)</span>';
    }
}

// Toggle save job
async function toggleSaveJob() {
    if (!Auth.isAuthenticated()) {
        showNotification('Vui lòng đăng nhập để lưu việc làm', 'warning');
        showLoginModal();
        return;
    }
    
    const isJobSaved = Auth.isJobSaved(currentJob.id);
    
    if (isJobSaved) {
        const success = await Auth.unsaveJob(currentJob.id);
        if (success) {
            updateSaveButton();
        }
    } else {
        const success = await Auth.saveJob(currentJob.id);
        if (success) {
            updateSaveButton();
        }
    }
}

// Update save button state
function updateSaveButton() {
    const saveBtn = document.getElementById('save-btn');
    const saveIcon = document.getElementById('save-icon');
    const saveText = document.getElementById('save-text');
    
    if (!Auth.isAuthenticated()) {
        saveText.textContent = 'Lưu việc làm';
        saveIcon.className = 'fas fa-heart mr-2';
        saveBtn.classList.remove('border-red-500', 'text-red-500');
        saveBtn.classList.add('border-gray-300', 'dark:border-gray-600', 'text-gray-700', 'dark:text-gray-300');
        return;
    }
    
    const isJobSaved = Auth.isJobSaved(currentJob?.id);
    
    if (isJobSaved) {
        saveText.textContent = 'Đã lưu';
        saveIcon.className = 'fas fa-heart mr-2';
        saveBtn.classList.remove('border-gray-300', 'dark:border-gray-600', 'text-gray-700', 'dark:text-gray-300');
        saveBtn.classList.add('border-red-500', 'text-red-500');
    } else {
        saveText.textContent = 'Lưu việc làm';
        saveIcon.className = 'fas fa-heart mr-2';
        saveBtn.classList.remove('border-red-500', 'text-red-500');
        saveBtn.classList.add('border-gray-300', 'dark:border-gray-600', 'text-gray-700', 'dark:text-gray-300');
    }
}

// Show application modal
function showApplicationModal() {
    if (!Auth.isAuthenticated()) {
        showNotification('Vui lòng đăng nhập để ứng tuyển', 'warning');
        showLoginModal();
        return;
    }
    
    const user = Auth.getCurrentUser();
    if (user && user.userType !== 'candidate') {
        showNotification('Chỉ ứng viên mới có thể ứng tuyển việc làm', 'error');
        return;
    }
    
    // Check if deadline has passed
    const deadline = new Date(currentJob.deadline);
    const now = new Date();
    
    if (deadline < now) {
        showNotification('Công việc này đã hết hạn ứng tuyển', 'error');
        return;
    }
    
    showModal('application-modal');
}

// Close application modal
function closeApplicationModal() {
    closeModal('application-modal');
    
    // Reset form
    document.getElementById('application-form').reset();
    document.getElementById('resume-file-info').classList.add('hidden');
}

// Handle resume upload
function handleResumeUpload(event) {
    const file = event.target.files[0];
    const fileInfo = document.getElementById('resume-file-info');
    
    if (file) {
        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            showNotification('Chỉ chấp nhận file PDF, DOC hoặc DOCX', 'error');
            event.target.value = '';
            return;
        }
        
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('Kích thước file không được vượt quá 5MB', 'error');
            event.target.value = '';
            return;
        }
        
        // Show file info
        fileInfo.innerHTML = `
            <i class="fas fa-file-pdf mr-1"></i>
            <span>${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
        `;
        fileInfo.classList.remove('hidden');
    } else {
        fileInfo.classList.add('hidden');
    }
}

// Submit job application
async function submitApplication(event) {
    event.preventDefault();
    
    if (!Auth.isAuthenticated()) {
        showNotification('Vui lòng đăng nhập để ứng tuyển', 'warning');
        return;
    }
    
    const coverLetter = document.getElementById('cover-letter').value;
    const resumeFile = document.getElementById('resume-upload').files[0];
    
    if (!coverLetter.trim()) {
        showNotification('Vui lòng viết thư xin việc', 'error');
        return;
    }
    
    try {
        // Create application data
        const applicationData = {
            jobId: currentJob.id,
            candidateId: Auth.getCurrentUser().id,
            status: 'pending',
            coverLetter: coverLetter.trim(),
            resumeUrl: resumeFile ? `resume_${Date.now()}_${resumeFile.name}` : '', // Simulate file upload
            notes: '',
            interviewDate: ''
        };
        
        // Submit application via API
        await postData('applications', applicationData);
        
        // Update job applicants count
        if (currentJob.applicants !== undefined) {
            currentJob.applicants++;
            document.getElementById('applicants-count').textContent = `${currentJob.applicants} người`;
            
            // Update job in API
            try {
                const jobsResponse = await getData('jobs');
                const apiJob = jobsResponse.data.find(job => job.id === currentJob.id);
                if (apiJob) {
                    await updateData('jobs', apiJob.id, {
                        ...apiJob,
                        applicants: currentJob.applicants
                    });
                }
            } catch (updateError) {
                console.error('Error updating job applicants count:', updateError);
            }
        }
        
        closeApplicationModal();
        showNotification('Nộp hồ sơ thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.', 'success');
        
        // Disable apply button to prevent duplicate applications
        const applyBtn = document.getElementById('apply-btn');
        applyBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Đã ứng tuyển';
        applyBtn.disabled = true;
        applyBtn.classList.remove('bg-primary-600', 'hover:bg-primary-700');
        applyBtn.classList.add('bg-green-600', 'cursor-not-allowed');
        
    } catch (error) {
        console.error('Error submitting application:', error);
        showNotification('Có lỗi xảy ra khi nộp hồ sơ. Vui lòng thử lại.', 'error');
    }
}

// Share job
function shareJob() {
    if (navigator.share) {
        navigator.share({
            title: `${currentJob.title} - ${currentJob.company}`,
            text: `Xem việc làm: ${currentJob.title} tại ${currentJob.company}`,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Đã copy link việc làm vào clipboard', 'success');
        }).catch(() => {
            showNotification('Không thể copy link', 'error');
        });
    }
}

// Show job not found
function showJobNotFound() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('job-not-found').classList.remove('hidden');
}

// Listen for auth status changes to update save button
document.addEventListener('DOMContentLoaded', function() {
    // Update save button when auth status changes
    const originalCheckAuthStatus = Auth.checkAuthStatus;
    Auth.checkAuthStatus = function() {
        originalCheckAuthStatus.call(this);
        updateSaveButton();
    };
});

// Export functions for global use
window.toggleSaveJob = toggleSaveJob;
window.showApplicationModal = showApplicationModal;
window.closeApplicationModal = closeApplicationModal;
window.submitApplication = submitApplication;
window.shareJob = shareJob;