const courses = [
    {
        id: '1',
        title: "Lập trình Web Cơ bản",
        description: "Học cách xây dựng website từ đầu với HTML, CSS và JavaScript.",
        level: "Cơ bản",
        price: "Miễn phí",
        rating: "★★★★★ 4.5",
        duration: "10 giờ",
        instructor: "Nguyễn Văn A",
        image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg", // Hình ảnh code lập trình
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: '2',
        title: "Phân tích Dữ liệu với Python",
        description: "Học Pandas, NumPy, Matplotlib để phân tích dữ liệu.",
        level: "Trung cấp",
        price: "Có phí",
        rating: "★★★★☆ 4.2",
        duration: "15 giờ",
        instructor: "Trần Thị B",
        image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg", // Hình ảnh phân tích dữ liệu
        videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2"
    },
    {
        id: '3',
        title: "Thiết kế UI/UX",
        description: "Học Figma và nguyên tắc thiết kế giao diện người dùng.",
        level: "Cơ bản",
        price: "Miễn phí",
        rating: "★★★★★ 4.7",
        duration: "8 giờ",
        instructor: "Lê Văn C",
        image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg", // Hình ảnh thiết kế giao diện
        videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3"
    },
    {
        id: '4',
        title: "Thiết kế UI/UX",
        description: "Học Figma và nguyên tắc thiết kế giao diện người dùng.",
        level: "Cơ bản",
        price: "Miễn phí",
        rating: "★★★★★ 4.7",
        duration: "8 giờ",
        instructor: "Lê Văn C",
        image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg", // Hình ảnh thiết kế giao diện
        videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3"
    }
];

function renderCourseList() {
    const courseList = document.getElementById('course-list');
    if (!courseList) return;

    courseList.innerHTML = courses.map(course => `
        <a href="courses-detail.html?id=${course.id}" class="bg-gradient-to-r from-gray-400 to-blue-900 text-white rounded-lg shadow course-card hover-scale p-4">
            <img src="${course.image}" alt="Course Image" class="w-full h-40 object-cover rounded-lg mb-4" loading="lazy">
            <h4 class="text-lg font-semibold">${course.title}</h4>
            <p class="text-gray-200">${course.description}</p>
            <p class="text-sm text-gray-100">Cấp độ: ${course.level}</p>
            <p class="text-sm text-gray-100">Giá: ${course.price}</p>
            <p class="text-sm text-gray-100">Đánh giá: ${course.rating}</p>
        </a>
    `).join('');
}

function loadCourseDetails() {
    const courseId = new URLSearchParams(window.location.search).get('id');
    const course = courses.find(c => c.id === courseId) || courses[0]; // Fallback to first course if ID not found

    document.getElementById('course-title').textContent = course.title;
    document.getElementById('course-description').textContent = course.description;
    document.getElementById('course-level').textContent = course.level;
    document.getElementById('course-price').textContent = course.price;
    document.getElementById('course-rating').textContent = course.rating;
    document.getElementById('course-duration').textContent = course.duration;
    document.getElementById('course-instructor').textContent = course.instructor;
    document.getElementById('course-image').src = course.image;

    // Handle "Bắt đầu học" button click
    const startCourseBtn = document.getElementById('start-course-btn');
    if (startCourseBtn) {
        startCourseBtn.addEventListener('click', () => {
            const videoSection = document.getElementById('video-section');
            const videoIframe = document.getElementById('course-video');
            videoIframe.src = course.videoUrl;
            videoSection.classList.remove('hidden');
            videoSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Initialize based on the current page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('course-list')) {
        renderCourseList();
    } else if (document.getElementById('course-title')) {
        loadCourseDetails();
    }
});