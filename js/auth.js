// Authentication system for SkillConnect

// Current user state
let currentUser = null;

// Initialize authentication
function initAuth() {
    checkAuthStatus();
}

// Check if user is authenticated
function checkAuthStatus() {
    const userData = getFromStorage('currentUser');
    if (userData) {
        currentUser = userData;
        updateUIForAuthenticatedUser();
    } else {
        updateUIForGuestUser();
    }
}

// Update UI for authenticated user
function updateUIForAuthenticatedUser() {
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const userName = document.getElementById('user-name');
    
    if (authButtons) authButtons.style.display = 'none';
    if (userMenu) {
        userMenu.style.display = 'block';
        userMenu.classList.remove('hidden');
    }
    if (userName && currentUser) {
        userName.textContent = currentUser.fullName;
    }
    
    // Update mobile menu
    updateMobileMenuForAuth(true);
}

// Update UI for guest user
function updateUIForGuestUser() {
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    
    if (authButtons) authButtons.style.display = 'flex';
    if (userMenu) {
        userMenu.style.display = 'none';
        userMenu.classList.add('hidden');
    }
    
    // Update mobile menu
    updateMobileMenuForAuth(false);
}

// Update mobile menu based on auth status
function updateMobileMenuForAuth(isAuthenticated) {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;
    
    const authSection = mobileMenu.querySelector('.border-t');
    if (!authSection) return;
    
    if (isAuthenticated && currentUser) {
        authSection.innerHTML = `
            <div class="pt-2">
                <div class="flex items-center px-3 py-2">
                    <img class="h-8 w-8 rounded-full mr-3" src="https://via.placeholder.com/32x32/3b82f6/ffffff?text=U" alt="User">
                    <span class="text-gray-900 dark:text-gray-100 font-medium">${currentUser.fullName}</span>
                </div>
                <a href="profile.html" class="text-gray-600 dark:text-gray-300 block px-3 py-2 text-base font-medium">
                    Hồ sơ của tôi
                </a>
                <button onclick="logout()" class="text-red-600 dark:text-red-400 block px-3 py-2 text-base font-medium w-full text-left">
                    Đăng xuất
                </button>
            </div>
        `;
    } else {
        authSection.innerHTML = `
            <div class="pt-2">
                <button onclick="showLoginModal()" class="text-gray-600 dark:text-gray-300 block px-3 py-2 text-base font-medium w-full text-left">
                    Đăng nhập
                </button>
                <button onclick="showRegisterModal()" class="text-primary-600 dark:text-primary-400 block px-3 py-2 text-base font-medium w-full text-left">
                    Đăng ký
                </button>
            </div>
        `;
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Validate inputs
    if (!validateEmail(email)) {
        showNotification('Email không hợp lệ', 'error');
        return;
    }
    
    if (!validatePassword(password)) {
        showNotification('Mật khẩu phải có ít nhất 6 ký tự', 'error');
        return;
    }
    
    try {
        // Simulate login by checking if user exists in localStorage
        const users = getFromStorage('registeredUsers', []);
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Successful login
            currentUser = user;
            setToStorage('currentUser', user);
            updateUIForAuthenticatedUser();
            closeModal('login-modal');
            showNotification('Đăng nhập thành công!', 'success');
            
            // Redirect based on user type
            if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
                // Stay on homepage
            } else if (user.userType === 'employer' && window.location.pathname.includes('profile')) {
                // Employer can stay on profile page
            } else if (user.userType === 'candidate' && window.location.pathname.includes('profile')) {
                // Candidate can stay on profile page
            }
        } else {
            showNotification('Email hoặc mật khẩu không chính xác', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Có lỗi xảy ra khi đăng nhập', 'error');
    }
}

// Handle register form submission
async function handleRegister(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('register-fullname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const userType = document.getElementById('register-usertype').value;
    
    // Validate inputs
    if (!fullName.trim()) {
        showNotification('Vui lòng nhập họ tên', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Email không hợp lệ', 'error');
        return;
    }
    
    if (!validatePassword(password)) {
        showNotification('Mật khẩu phải có ít nhất 6 ký tự', 'error');
        return;
    }
    
    try {
        // Check if user already exists
        const users = getFromStorage('registeredUsers', []);
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
            showNotification('Email này đã được đăng ký', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: 'user_' + Date.now(),
            fullName: fullName.trim(),
            email: email,
            password: password, // In real app, this should be hashed
            userType: userType,
            avatar: 'https://via.placeholder.com/100x100/3b82f6/ffffff?text=' + fullName.charAt(0).toUpperCase(),
            createdAt: new Date().toISOString(),
            phone: '',
            location: '',
            bio: '',
            skills: [],
            experience: '',
            education: '',
            savedJobs: [],
            // Employer specific fields
            companyName: userType === 'employer' ? '' : undefined,
            companySize: userType === 'employer' ? '' : undefined,
            industry: userType === 'employer' ? '' : undefined
        };
        
        // Save user to localStorage
        users.push(newUser);
        setToStorage('registeredUsers', users);
        
        // Also save to users table via API
        try {
            await postData('users', {
                email: newUser.email,
                fullName: newUser.fullName,
                userType: newUser.userType,
                avatar: newUser.avatar,
                phone: newUser.phone,
                location: newUser.location,
                skills: newUser.skills,
                experience: newUser.experience,
                education: newUser.education,
                bio: newUser.bio,
                companyName: newUser.companyName || '',
                companySize: newUser.companySize || '',
                industry: newUser.industry || '',
                savedJobs: newUser.savedJobs
            });
        } catch (apiError) {
            console.error('Error saving to API:', apiError);
        }
        
        // Auto login after successful registration
        currentUser = newUser;
        setToStorage('currentUser', newUser);
        updateUIForAuthenticatedUser();
        closeModal('register-modal');
        showNotification('Đăng ký thành công! Chào mừng bạn đến với SkillConnect!', 'success');
        
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Có lỗi xảy ra khi đăng ký', 'error');
    }
}

// Handle logout
function logout() {
    currentUser = null;
    removeFromStorage('currentUser');
    updateUIForGuestUser();
    showNotification('Đã đăng xuất thành công', 'info');
    
    // Redirect to homepage if on protected page
    if (window.location.pathname.includes('profile')) {
        window.location.href = 'index.html';
    }
}

// Check if user is authenticated
function isAuthenticated() {
    return currentUser !== null;
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Require authentication for certain pages
function requireAuth() {
    if (!isAuthenticated()) {
        showNotification('Vui lòng đăng nhập để truy cập trang này', 'warning');
        showLoginModal();
        return false;
    }
    return true;
}

// Require specific user type
function requireUserType(requiredType) {
    if (!isAuthenticated()) {
        showNotification('Vui lòng đăng nhập để truy cập trang này', 'warning');
        showLoginModal();
        return false;
    }
    
    if (currentUser.userType !== requiredType) {
        const typeName = requiredType === 'employer' ? 'nhà tuyển dụng' : 'ứng viên';
        showNotification(`Trang này chỉ dành cho ${typeName}`, 'error');
        return false;
    }
    
    return true;
}

// Update user profile
async function updateUserProfile(profileData) {
    if (!isAuthenticated()) {
        throw new Error('User not authenticated');
    }
    
    try {
        // Update current user object
        Object.assign(currentUser, profileData);
        
        // Update localStorage
        setToStorage('currentUser', currentUser);
        
        // Update registered users list
        const users = getFromStorage('registeredUsers', []);
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            setToStorage('registeredUsers', users);
        }
        
        // Try to update via API
        try {
            // Find user in API by email
            const apiUsers = await getData('users', { search: currentUser.email });
            if (apiUsers.data && apiUsers.data.length > 0) {
                const apiUser = apiUsers.data[0];
                await updateData('users', apiUser.id, {
                    fullName: currentUser.fullName,
                    phone: currentUser.phone || '',
                    location: currentUser.location || '',
                    skills: currentUser.skills || [],
                    experience: currentUser.experience || '',
                    education: currentUser.education || '',
                    bio: currentUser.bio || '',
                    companyName: currentUser.companyName || '',
                    companySize: currentUser.companySize || '',
                    industry: currentUser.industry || '',
                    savedJobs: currentUser.savedJobs || []
                });
            }
        } catch (apiError) {
            console.error('Error updating user via API:', apiError);
        }
        
        return currentUser;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
}

// Save job to user's saved jobs
async function saveJob(jobId) {
    if (!isAuthenticated()) {
        showNotification('Vui lòng đăng nhập để lưu việc làm', 'warning');
        showLoginModal();
        return false;
    }
    
    if (!currentUser.savedJobs) {
        currentUser.savedJobs = [];
    }
    
    if (currentUser.savedJobs.includes(jobId)) {
        showNotification('Công việc này đã được lưu trước đó', 'info');
        return false;
    }
    
    currentUser.savedJobs.push(jobId);
    
    try {
        await updateUserProfile({ savedJobs: currentUser.savedJobs });
        showNotification('Đã lưu công việc thành công', 'success');
        return true;
    } catch (error) {
        console.error('Error saving job:', error);
        showNotification('Có lỗi xảy ra khi lưu công việc', 'error');
        return false;
    }
}

// Remove job from saved jobs
async function unsaveJob(jobId) {
    if (!isAuthenticated() || !currentUser.savedJobs) {
        return false;
    }
    
    currentUser.savedJobs = currentUser.savedJobs.filter(id => id !== jobId);
    
    try {
        await updateUserProfile({ savedJobs: currentUser.savedJobs });
        showNotification('Đã bỏ lưu công việc', 'info');
        return true;
    } catch (error) {
        console.error('Error removing saved job:', error);
        showNotification('Có lỗi xảy ra khi bỏ lưu công việc', 'error');
        return false;
    }
}

// Check if job is saved
function isJobSaved(jobId) {
    return isAuthenticated() && currentUser.savedJobs && currentUser.savedJobs.includes(jobId);
}

// Initialize demo users if none exist
function initDemoUsers() {
    const users = getFromStorage('registeredUsers', []);
    
    if (users.length === 0) {
        const demoUsers = [
            {
                id: 'user_demo_1',
                fullName: 'Nguyễn Văn An',
                email: 'candidate@demo.com',
                password: '123456',
                userType: 'candidate',
                avatar: 'https://via.placeholder.com/100x100/3b82f6/ffffff?text=A',
                createdAt: new Date().toISOString(),
                phone: '0901234567',
                location: 'Hồ Chí Minh',
                bio: 'Tôi là một developer đam mê công nghệ với 3 năm kinh nghiệm.',
                skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
                experience: '3 năm kinh nghiệm làm việc tại các startup công nghệ',
                education: 'Cử nhân Công nghệ Thông tin - ĐH Bách Khoa',
                savedJobs: []
            },
            {
                id: 'user_demo_2',
                fullName: 'Trần Thị Bình',
                email: 'employer@demo.com',
                password: '123456',
                userType: 'employer',
                avatar: 'https://via.placeholder.com/100x100/059669/ffffff?text=B',
                createdAt: new Date().toISOString(),
                phone: '0907654321',
                location: 'Hà Nội',
                bio: 'HR Manager tại TechViet Solutions với 5 năm kinh nghiệm tuyển dụng.',
                companyName: 'TechViet Solutions',
                companySize: '50-100 nhân viên',
                industry: 'Công nghệ thông tin',
                skills: [],
                experience: '',
                education: '',
                savedJobs: []
            }
        ];
        
        setToStorage('registeredUsers', demoUsers);
    }
}

// Initialize authentication when script loads
document.addEventListener('DOMContentLoaded', function() {
    initDemoUsers();
    initAuth();
});

// Export auth functions
window.Auth = {
    handleLogin,
    handleRegister,
    logout,
    isAuthenticated,
    getCurrentUser,
    requireAuth,
    requireUserType,
    updateUserProfile,
    saveJob,
    unsaveJob,
    isJobSaved,
    checkAuthStatus
};