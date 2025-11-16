const courses = [
    {
        id: '1',
        title: "Lập trình Web Cơ bản",
        description: "Học cách xây dựng website từ đầu với HTML, CSS và JavaScript. Khóa học này bao gồm các khái niệm cơ bản, các thẻ HTML, cách tạo style với CSS và lập trình tương tác với JavaScript.",
        level: "Cơ bản",
        price: "Miễn phí",
        rating: "★★★★★ 4.5",
        duration: "10 giờ",
        instructor: "Nguyễn Văn A",
        image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
        curriculum: [
            {
                id: '1-1',
                title: "Bài 1: Giới thiệu HTML",
                videoUrl: "https://www.youtube.com/embed/okqEVeNqBhw",
                textContent: "HTML là viết tắt của HyperText Markup Language. Nó là ngôn ngữ đánh dấu tiêu chuẩn cho các trang web. HTML mô tả cấu trúc của một trang web bằng cách sử dụng các phần tử HTML.",
                quiz: null // Không có quiz cho bài này
            },
            {
                id: '1-2',
                title: "Bài 2: Các thẻ HTML cơ bản",
                videoUrl: "https://www.youtube.com/embed/g0gPgyQtT-A",
                textContent: "Các thẻ HTML quan trọng bao gồm <h1> đến <h6> cho tiêu đề, <p> cho đoạn văn, <a> cho liên kết, và <img> cho hình ảnh. Mỗi thẻ có một mục đích cụ thể.",
                quiz: null // Không có quiz cho bài này
            },
            {
                id: '1-3',
                title: "Bài 3: Giới thiệu CSS",
                videoUrl: "https://www.youtube.com/embed/OEV8gHsKGDc",
                textContent: "CSS (Cascading Style Sheets) được sử dụng để định dạng và tạo kiểu cho các trang web. Bạn có thể thay đổi màu sắc, phông chữ, bố cục và nhiều hơn nữa.",
                quiz: {
                    questions: [
                        {
                            question: "CSS là viết tắt của cụm từ nào?",
                            options: [
                                "Cascading Style Sheets",
                                "Creative Style Sheets",
                                "Computer Style Sheets",
                                "Colorful Style Sheets"
                            ],
                            correctAnswer: 0 // Index của đáp án đúng (bắt đầu từ 0)
                        },
                        {
                            question: "Thuộc tính nào dùng để thay đổi màu nền của một phần tử?",
                            options: [
                                "color",
                                "font-style",
                                "background-color"
                            ],
                            correctAnswer: 2
                        }
                    ]
                }
            }
        ]
    },
    {
        id: '2',
        title: "Phân tích Dữ liệu với Python",
        description: "Học cách sử dụng các thư viện Python mạnh mẽ như Pandas, NumPy, và Matplotlib để phân tích, trực quan hóa và xử lý dữ liệu.",
        level: "Trung cấp",
        price: "Có phí",
        rating: "★★★★☆ 4.2",
        duration: "15 giờ",
        instructor: "Trần Thị B",
        image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
        curriculum: [
            {
                id: '2-1',
                title: "Bài 1: Giới thiệu Pandas",
                videoUrl: "https://www.youtube.com/embed/LwX2yV-XgWw",
                textContent: "Pandas là một thư viện Python mạnh mẽ để phân tích dữ liệu. Cấu trúc dữ liệu chính là DataFrame, cho phép bạn đọc, ghi và thao tác dữ liệu có cấu trúc một cách dễ dàng.",
                quiz: null
            },
            {
                id: '2-2',
                title: "Bài 2: Thao tác DataFrame",
                videoUrl: "https://www.youtube.com/embed/vmEHCJofFgc",
                textContent: "Học cách chọn cột, lọc hàng, nhóm dữ liệu (group by) và xử lý các giá trị bị thiếu (missing values) trong DataFrame.",
                quiz: {
                    questions: [
                        {
                            question: "Hàm nào dùng để đọc tệp CSV trong Pandas?",
                            options: [
                                "pd.read_csv()",
                                "pd.open_csv()",
                                "pd.load_csv()"
                            ],
                            correctAnswer: 0
                        },
                        {
                            question: "Hàm nào dùng để hiển thị 5 hàng đầu tiên của DataFrame 'df'?",
                            options: [
                                "df.show(5)",
                                "df.head()",
                                "df.top(5)"
                            ],
                            correctAnswer: 1
                        }
                    ]
                }
            }
        ]
    },
    {
        id: '3',
        title: "Thiết kế UI/UX",
        description: "Học các nguyên tắc cơ bản của thiết kế giao diện (UI) và trải nghiệm người dùng (UX). Sử dụng công cụ Figma để tạo ra các thiết kế đẹp và hiệu quả.",
        level: "Cơ bản",
        price: "Miễn phí",
        rating: "★★★★★ 4.7",
        duration: "8 giờ",
        instructor: "Lê Văn C",
        image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
        curriculum: [
            {
                id: '3-1',
                title: "Bài 1: Nguyên tắc thiết kế",
                videoUrl: "https://www.youtube.com/embed/QRR-1O-hHAY",
                textContent: "Tìm hiểu về các nguyên tắc cơ bản của thiết kế như độ tương phản, căn chỉnh, lặp lại và sự gần gũi (C.R.A.P).",
                quiz: null
            },
            {
                id: '3-2',
                title: "Bài 2: Làm quen với Figma",
                videoUrl: "https://www.youtube.com/embed/eZ-h-i3dY-Y",
                textContent: "Figma là một công cụ thiết kế giao diện dựa trên nền tảng web. Học cách tạo frame, sử dụng các công cụ vẽ cơ bản và tạo mẫu (prototype) đơn giản.",
                quiz: {
                    questions: [
                        {
                            question: "Figma là công cụ thiết kế hoạt động chủ yếu trên nền tảng nào?",
                            options: [
                                "Chỉ Windows",
                                "Chỉ MacOS",
                                "Trình duyệt Web (Cloud-based)"
                            ],
                            correctAnswer: 2
                        }
                    ]
                }
            }
        ]
    },
    {
        id: '4',
        title: "Khóa học React Nâng cao",
        description: "Đi sâu vào các khái niệm React như Hooks, Context API, và tối ưu hóa hiệu suất.",
        level: "Nâng cao",
        price: "Có phí",
        rating: "★★★★★ 4.8",
        duration: "20 giờ",
        instructor: "Đặng Thị D",
        image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
        curriculum: [
            {
                id: '4-1',
                title: "Bài 1: Ôn tập Hooks",
                videoUrl: "https://www.youtube.com/embed/TNha-Y4Fj9Q",
                textContent: "Ôn lại cách sử dụng useState, useEffect và tìm hiểu các hooks nâng cao như useMemo, useCallback.",
                quiz: null
            },
            {
                id: '4-2',
                title: "Bài 2: Quản lý State với Context API",
                videoUrl: "https://www.youtube.com/embed/5LrDIWkE_SU",
                textContent: "Học cách sử dụng Context API để quản lý state toàn cục (global state) mà không cần dùng Redux.",
                quiz: {
                     questions: [
                        {
                            question: "Context API được dùng để giải quyết vấn đề gì trong React?",
                            options: [
                                "Tối ưu hóa hình ảnh",
                                "Định tuyến (Routing)",
                                "Truyền prop (Prop Drilling)"
                            ],
                            correctAnswer: 2
                        }
                    ]
                }
            }
        ]
    },
    {
        id: '5',
        title: "Nhập môn AWS Cloud",
        description: "Tìm hiểu các dịch vụ cốt lõi của Amazon Web Services (AWS) như EC2 (máy chủ ảo), S3 (lưu trữ), và VPC (mạng ảo).",
        level: "Cơ bản",
        price: "Miễn phí",
        rating: "★★★★☆ 4.4",
        duration: "12 giờ",
        instructor: "Phạm Văn E",
        image: "https://images.pexels.com/photos/58984/pexels-photo-58984.jpeg",
        curriculum: [
            {
                id: '5-1',
                title: "Bài 1: Cloud Computing là gì?",
                videoUrl: "https://www.youtube.com/embed/mxT238QtsKc",
                textContent: "Điện toán đám mây (Cloud Computing) là việc cung cấp các tài nguyên máy tính—như máy chủ, lưu trữ, cơ sở dữ liệu—qua Internet. AWS là nhà cung cấp đám mây hàng đầu hiện nay.",
                quiz: null
            },
            {
                id: '5-2',
                title: "Bài 2: Dịch vụ lưu trữ S3",
                videoUrl: "https://www.youtube.com/embed/j-VlMhSS4gY",
                textContent: "Amazon S3 (Simple Storage Service) là dịch vụ lưu trữ đối tượng (object storage) có khả năng mở rộng, bảo mật và hiệu suất cao. Bạn có thể dùng S3 để lưu trữ ảnh, video, tệp tin backup...",
                quiz: {
                    questions: [
                        {
                            question: "S3 là viết tắt của dịch vụ nào?",
                            options: [
                                "Simple Storage Service",
                                "Secure Storage Service",
                                "Simple Server Storage"
                            ],
                            correctAnswer: 0
                        },
                         {
                            question: "Trong S3, dữ liệu được lưu trữ trong các 'kho' gọi là gì?",
                            options: [
                                "Folders (Thư mục)",
                                "Buckets (Xô)",
                                "Containers (Thùng chứa)"
                            ],
                            correctAnswer: 1
                        }
                    ]
                }
            },
            {
                id: '5-3',
                title: "Bài 3: Máy chủ ảo EC2",
                videoUrl: "https://www.youtube.com/embed/GDr-Iu--P88",
                textContent: "Amazon EC2 (Elastic Compute Cloud) cho phép bạn thuê các máy chủ ảo (gọi là 'Instances') để chạy ứng dụng của mình. Bạn có thể chọn HĐH, cấu hình CPU, RAM theo nhu...cầu.",
                quiz: {
                    questions: [
                        {
                            question: "EC2 là viết tắt của dịch vụ nào?",
                            options: [
                                "Elastic Cloud Computing",
                                "Elastic Compute Cloud",
                                "External Compute Cloud"
                            ],
                            correctAnswer: 1
                        }
                    ]
                }
            }
        ]
    },
    {
        id: '6',
        title: "Lập trình Backend với Node.js",
        description: "Xây dựng các API RESTful mạnh mẽ bằng Node.js, Express và kết nối cơ sở dữ liệu MongoDB.",
        level: "Trung cấp",
        price: "Có phí",
        rating: "★★★★★ 4.7",
        duration: "18 giờ",
        instructor: "Vũ Thị F",
        image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
        curriculum: [
            {
                id: '6-1',
                title: "Bài 1: Giới thiệu Node.js & NPM",
                videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
                textContent: "Node.js là một môi trường chạy JavaScript phía máy chủ (server-side) dựa trên V8 Engine của Chrome. NPM (Node Package Manager) là trình quản lý thư viện lớn nhất thế giới.",
                quiz: null
            },
            {
                id: '6-2',
                title: "Bài 2: Xây dựng máy chủ Express",
                videoUrl: "https://www.youtube.com/embed/S2T_P1r_hB8",
                textContent: "Express.js là một framework web tối giản và linh hoạt cho Node.js, giúp xây dựng API và ứng dụng web một cách nhanh chóng.",
                quiz: {
                    questions: [
                        {
                            question: "Express.js được dùng để làm gì?",
                            options: [
                                "Tạo giao diện người dùng (UI)",
                                "Quản lý cơ sở dữ liệu",
                                "Xây dựng web server và API"
                            ],
                            correctAnswer: 2
                        },
                         {
                            question: "Lệnh nào dùng để cài đặt Express?",
                            options: [
                                "npm install express",
                                "npm start express",
                                "node install express"
                            ],
                            correctAnswer: 0
                        }
                    ]
                }
            }
        ]
    }
];

function renderCourseList() {
    const courseList = document.getElementById('course-list');
    if (!courseList) return;

    courseList.innerHTML = courses.map(course => `
        <a href="courses-detail.html?id=${course.id}" class="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover-scale transition-transform duration-300 course-card">
            <img src="${course.image}" alt="${course.title}" class="w-full h-40 object-cover" loading="lazy">
            <div class="p-4">
                <h4 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">${course.title}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">${course.description.substring(0, 70)}...</p>
                <div class="flex justify-between items-center text-sm text-gray-700 dark:text-gray-400">
                    <span><i class="fas fa-signal mr-1"></i> ${course.level}</span>
                    <span><i class="fas fa-star mr-1"></i> ${course.rating.split(' ')[1]}</span>
                </div>
                <div class="mt-2 text-lg font-bold ${course.price === 'Miễn phí' ? 'text-green-600 dark:text-green-400' : 'text-primary-600 dark:text-primary-400'}">
                    ${course.price}
                </div>
            </div>
        </a>
    `).join('');
}

// ----- HÀM MỚI ĐỂ XUẤT PDF -----
// Hàm này sẽ tạo một bản "in" của nội dung bài học và xuất ra PDF
function handleExportPDF(lesson) {
    // Kiểm tra xem thư viện đã tải chưa
    if (typeof window.jspdf === 'undefined' || typeof window.html2canvas === 'undefined') {
        alert("Thư viện PDF chưa tải xong. Vui lòng thử lại sau giây lát.");
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // 1. Tạo một container tạm thời để chứa tất cả HTML cần xuất
    // Container này sẽ được "chụp ảnh"
    const exportContainer = document.createElement('div');
    exportContainer.style.width = '210mm'; // Kích thước A4
    exportContainer.style.padding = '20px';
    exportContainer.style.color = '#000'; // Đảm bảo PDF không bị màu text trắng (khi ở dark mode)
    exportContainer.style.background = '#fff';

    // 2. Thêm tiêu đề bài học
    const titleEl = document.createElement('h1');
    titleEl.textContent = lesson.title;
    exportContainer.appendChild(titleEl);

    // 3. Thêm nội dung "Bài đọc"
    if (lesson.textContent) {
        const textTitle = document.createElement('h2');
        textTitle.textContent = "Nội dung bài đọc";
        textTitle.style.marginTop = '20px';
        exportContainer.appendChild(textTitle);
        
        // Lấy nội dung từ tab-content-text
        const textContent = document.getElementById('tab-content-text').cloneNode(true);
        exportContainer.appendChild(textContent);
    }

    // 4. Thêm nội dung "Kiểm tra"
    if (lesson.quiz && lesson.quiz.questions.length > 0) {
        const quizTitle = document.createElement('h2');
        quizTitle.textContent = "Bài kiểm tra";
        quizTitle.style.marginTop = '20px';
        exportContainer.appendChild(quizTitle);
        
        // Lấy nội dung form quiz (chỉ câu hỏi và lựa chọn)
        const quizContent = document.getElementById('quiz-questions-container').cloneNode(true);
        
        // Loại bỏ các radio button để tránh lỗi render, chỉ giữ lại văn bản
        quizContent.querySelectorAll('input[type="radio"]').forEach(radio => radio.remove());
        quizContent.querySelectorAll('label').forEach(label => {
            label.style.border = '1px solid #ccc';
            label.style.marginBottom = '5px';
        });

        exportContainer.appendChild(quizContent);
    }
    
    // 5. Thêm container tạm thời vào body (cần thiết cho html2canvas)
    // Đặt nó ra ngoài màn hình để người dùng không thấy
    exportContainer.style.position = 'absolute';
    exportContainer.style.left = '-9999px';
    exportContainer.style.top = '0';
    document.body.appendChild(exportContainer);

    // 6. Tạo PDF từ container tạm thời
    // Chúng ta dùng html2canvas để vẽ container này, sau đó jsPDF sẽ thêm ảnh đó vào PDF
    window.html2canvas(exportContainer, {
        scale: 2, // Tăng độ phân giải
        useCORS: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Thêm trang mới nếu nội dung quá dài
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        // 7. Lưu file
        doc.save(`${lesson.id}_${lesson.title}.pdf`);
        
        // 8. Xóa container tạm thời
        document.body.removeChild(exportContainer);
    }).catch(err => {
        console.error("Không thể tạo PDF:", err);
        alert("Đã xảy ra lỗi khi xuất PDF.");
        document.body.removeChild(exportContainer);
    });
}


function loadCourseDetails() {
    const courseId = new URLSearchParams(window.location.search).get('id');
    const course = courses.find(c => c.id === courseId) || courses[0]; // Fallback nếu không tìm thấy ID

    if (!course) {
        console.error("Không tìm thấy khóa học!");
        return;
    }

    // THÊM MỚI: Biến để lưu bài học hiện tại đang được xem
    let currentLoadedLesson = null;

    // Tải thông tin khóa học chính
    document.getElementById('course-title').textContent = course.title;
    document.getElementById('course-description').textContent = course.description;
    document.getElementById('course-level').textContent = course.level;
    document.getElementById('course-price').textContent = course.price;
    document.getElementById('course-rating').textContent = course.rating;
    document.getElementById('course-duration').textContent = course.duration;
    document.getElementById('course-instructor').textContent = course.instructor;
    document.getElementById('course-image').src = course.image;
    document.getElementById('course-image').alt = course.title;

    // ----- LOGIC NỘI DUNG KHÓA HỌC -----

    const curriculumList = document.getElementById('curriculum-list');
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    
    // THÊM MỚI: Tìm nút export PDF
    const exportPdfBtn = document.getElementById('export-pdf-btn');

    if (!curriculumList || !progressText || !progressBar || !exportPdfBtn) {
        console.error("Không tìm thấy các thành phần của nội dung khóa học.");
        return;
    }

    // THÊM MỚI: Gắn sự kiện click cho nút PDF
    exportPdfBtn.addEventListener('click', () => {
        if (currentLoadedLesson) {
            handleExportPDF(currentLoadedLesson);
        } else {
            alert("Vui lòng chọn một bài học để tải.");
        }
    });

    // Tải tiến độ đã lưu từ localStorage
    const completedLessonsKey = `completed_course_${course.id}`;
    let completedLessons = JSON.parse(localStorage.getItem(completedLessonsKey)) || [];
    const totalLessons = course.curriculum.length;
    
    // Key để lưu điểm quiz
    const quizScoresKey = `quiz_scores_course_${course.id}`;
    let quizScores = JSON.parse(localStorage.getItem(quizScoresKey)) || {};

    // Hàm cập nhật tiến trình
    function updateProgress() {
        const completedCount = completedLessons.length;
        const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
        
        progressText.textContent = `Hoàn thành: ${completedCount}/${totalLessons} (${percentage}%)`;
        progressBar.style.width = `${percentage}%`;
    }

    // Render danh sách bài học
    curriculumList.innerHTML = course.curriculum.map((lesson, index) => {
        const isCompleted = completedLessons.includes(lesson.id);
        return `
            <div class="lesson-item flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" data-lesson-index="${index}">
                <input type="checkbox" id="lesson-${lesson.id}" data-lesson-id="${lesson.id}" class="mr-3" ${isCompleted ? 'checked' : ''}>
                <label for="lesson-${lesson.id}" class="flex-1 cursor-pointer">${lesson.title}</label>
            </div>
        `;
    }).join('');

    // Lấy các element của tab
    const tabs = {
        video: document.getElementById('tab-video'),
        text: document.getElementById('tab-text'),
        quiz: document.getElementById('tab-quiz')
    };
    const tabPanels = {
        video: document.getElementById('tab-content-video'),
        text: document.getElementById('tab-content-text'),
        quiz: document.getElementById('tab-content-quiz')
    };
    
    // Lấy các element của video và text
    const videoPlayer = document.getElementById('course-video-player');
    const textContentEl = document.getElementById('tab-content-text');

    // LẤY CÁC ELEMENT CỦA QUIZ
    const quizForm = document.getElementById('quiz-form');
    const quizContainer = document.getElementById('quiz-questions-container');
    const quizResult = document.getElementById('quiz-result');
    const quizScoreText = document.getElementById('quiz-score-text');
    const quizRetryBtn = document.getElementById('quiz-retry-btn');
    
    // Hàm render quiz
    function renderQuizForm(lesson, container) {
        container.innerHTML = ''; // Xóa câu hỏi cũ
        lesson.quiz.questions.forEach((q, index) => {
            const questionId = `q-${lesson.id}-${index}`;
            const optionsHtml = q.options.map((option, i) => `
                <label class="block p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    <input type="radio" name="${questionId}" value="${i}" class="mr-2" required>
                    ${option}
                </label>
            `).join('');

            container.innerHTML += `
                <div class="question-block">
                    <p class="font-semibold mb-2">${index + 1}. ${q.question}</p>
                    <div class="space-y-2">
                        ${optionsHtml}
                    </div>
                </div>
            `;
        });
    }

    // Hàm để tải nội dung bài học
    function loadLessonContent(lesson) {
        // THÊM MỚI: Cập nhật bài học hiện tại
        currentLoadedLesson = lesson;

        // 1. Xử lý Video
        if (lesson.videoUrl) {
            videoPlayer.src = lesson.videoUrl;
            tabs.video.classList.remove('hidden');
        } else {
            videoPlayer.src = "";
            tabs.video.classList.add('hidden');
        }
        
        // 2. Xử lý Text
        if (lesson.textContent) {
            textContentEl.innerHTML = `<p class="whitespace-pre-line">${lesson.textContent}</p>`;
            tabs.text.classList.remove('hidden');
        } else {
            textContentEl.innerHTML = "<p>Không có nội dung bài đọc cho bài này.</p>";
            tabs.text.classList.add('hidden');
        }

        // 3. XỬ LÝ QUIZ
        if (lesson.quiz && lesson.quiz.questions.length > 0) {
            tabs.quiz.classList.remove('hidden');
            
            // Kiểm tra xem đã có điểm lưu chưa
            const savedScore = quizScores[lesson.id];
            
            if (savedScore) {
                // Nếu có, hiển thị kết quả
                const { score, totalQuestions } = savedScore;
                const percentage = (score / totalQuestions) * 100;
                quizScoreText.innerHTML = `Bạn đã trả lời đúng <strong>${score}/${totalQuestions}</strong> câu (${percentage.toFixed(0)}%). (Kết quả đã lưu)`;
                quizResult.classList.remove('hidden');
                quizForm.classList.add('hidden');
            } else {
                // Nếu không, hiển thị form quiz
                quizResult.classList.add('hidden');
                quizForm.classList.remove('hidden');
                quizForm.reset();
                renderQuizForm(lesson, quizContainer); // Render câu hỏi
            }
            
            // Xử lý nộp bài (onsubmit)
            quizForm.onsubmit = (e) => {
                e.preventDefault();
                let score = 0;
                const formData = new FormData(quizForm);
                
                lesson.quiz.questions.forEach((q, index) => {
                    const questionId = `q-${lesson.id}-${index}`;
                    const userAnswer = formData.get(questionId); // Sẽ là "0", "1", "2"...
                    
                    if (userAnswer !== null && parseInt(userAnswer) === q.correctAnswer) {
                        score++;
                    }
                });
                
                const totalQuestions = lesson.quiz.questions.length;
                const percentage = (score / totalQuestions) * 100;
                
                // Hiển thị kết quả
                quizScoreText.innerHTML = `Bạn đã trả lời đúng <strong>${score}/${totalQuestions}</strong> câu (${percentage.toFixed(0)}%).`;
                quizResult.classList.remove('hidden');
                quizForm.classList.add('hidden');
                
                // Lưu điểm vào object và localStorage
                quizScores[lesson.id] = { score, totalQuestions };
                localStorage.setItem(quizScoresKey, JSON.stringify(quizScores));
            };

            // Xử lý làm lại (onclick)
            quizRetryBtn.onclick = () => {
                // Xóa điểm đã lưu
                delete quizScores[lesson.id];
                localStorage.setItem(quizScoresKey, JSON.stringify(quizScores));
                
                // Hiển thị lại form
                quizResult.classList.add('hidden');
                quizForm.classList.remove('hidden');
                quizForm.reset();
                renderQuizForm(lesson, quizContainer); // Render lại câu hỏi
            };

        } else {
            // Không có quiz cho bài này
            tabs.quiz.classList.add('hidden');
            quizContainer.innerHTML = ''; // Xóa nội dung quiz cũ
            quizResult.classList.add('hidden'); // Ẩn kết quả cũ
            quizForm.classList.add('hidden'); // Ẩn form
            quizForm.onsubmit = (e) => e.preventDefault(); // Vô hiệu hóa submit
        }
        
        // 4. Kiểm tra tab active
        const activeTabEl = document.querySelector('.tab-btn.active-tab');
        if (activeTabEl && activeTabEl.classList.contains('hidden')) {
            // Nếu tab đang active bị ẩn, chuyển sang tab đầu tiên nhìn thấy được
            if (!tabs.video.classList.contains('hidden')) {
                activateTab('video');
            } else if (!tabs.text.classList.contains('hidden')) {
                activateTab('text');
            } else if (!tabs.quiz.classList.contains('hidden')) {
                activateTab('quiz');
            }
        }
    }
    
    // Hàm để kích hoạt tab
    function activateTab(tabName) {
        Object.keys(tabs).forEach(key => {
            const tab = tabs[key];
            const panel = tabPanels[key];
            if (key === tabName) {
                tab.classList.add('active-tab');
                tab.classList.remove('inactive-tab');
                panel.classList.remove('hidden');
            } else {
                tab.classList.remove('active-tab');
                tab.classList.add('inactive-tab');
                panel.classList.add('hidden');
            }
        });
    }

    // Gắn sự kiện click cho các tab
    Object.keys(tabs).forEach(key => {
        if(tabs[key]) {
            tabs[key].addEventListener('click', () => activateTab(key));
        }
    });

    // Gắn sự kiện click cho các bài học
    curriculumList.querySelectorAll('.lesson-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.type === 'checkbox') return; // Bỏ qua nếu click vào checkbox

            // Cập nhật trạng thái active
            curriculumList.querySelectorAll('.lesson-item').forEach(i => i.classList.remove('active-lesson'));
            item.classList.add('active-lesson');
            
            const lessonIndex = item.getAttribute('data-lesson-index');
            const lesson = course.curriculum[lessonIndex];
            loadLessonContent(lesson);
        });
    });

    // Gắn sự kiện change cho các checkbox (để lưu tiến độ)
    curriculumList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const lessonId = e.target.getAttribute('data-lesson-id');
            if (e.target.checked) {
                if (!completedLessons.includes(lessonId)) {
                    completedLessons.push(lessonId);
                }
            } else {
                completedLessons = completedLessons.filter(id => id !== lessonId);
            }
            localStorage.setItem(completedLessonsKey, JSON.stringify(completedLessons));
            updateProgress(); // Cập nhật thanh tiến trình
        });
    });

    // Tải bài học đầu tiên và kích hoạt tab đầu tiên
    if (course.curriculum && course.curriculum.length > 0) {
        loadLessonContent(course.curriculum[0]);
        curriculumList.querySelector('.lesson-item').classList.add('active-lesson');
        
        // Kích hoạt tab đầu tiên có nội dung
        if (!tabs.video.classList.contains('hidden')) {
            activateTab('video');
        } else if (!tabs.text.classList.contains('hidden')) {
            activateTab('text');
        } else if (!tabs.quiz.classList.contains('hidden')) {
            activateTab('quiz');
        }
    } else {
        const contentSection = document.getElementById('course-content-section');
        if (contentSection) {
            contentSection.innerHTML = '<p>Nội dung khóa học này đang được cập nhật.</p>';
        }
    }
    
    // Cập nhật tiến trình lần đầu khi tải trang
    updateProgress();
}

// Khởi tạo dựa trên trang hiện tại
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('course-list')) {
        renderCourseList();
    } else if (document.getElementById('course-title')) {
        loadCourseDetails();
    }
});
