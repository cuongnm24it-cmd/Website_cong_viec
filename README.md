# SkillConnect - Nền tảng Tuyển dụng & Kỹ năng số

## 🎯 Mục tiêu dự án

SkillConnect là một nền tảng web toàn diện kết nối ứng viên tìm việc với doanh nghiệp, đồng thời cung cấp kho học liệu và khóa học kỹ năng số để phát triển sự nghiệp. Website được xây dựng với công nghệ hiện đại, giao diện thân thiện và tính năng đa dạng.

## 🌟 Tính năng chính

### ✅ Đã hoàn thành

#### 🏠 Trang chủ (index.html)
- Hero section với slogan "Find Jobs, Build Skills, Shape Your Future"
- Hiển thị thống kê (việc làm, công ty, ứng viên, khóa học) với animation
- Featured jobs và courses sections
- Responsive design với dark/light mode
- Smooth scrolling và animations

#### 💼 Trang việc làm (jobs.html)
- Danh sách việc làm với pagination
- Tìm kiếm theo từ khóa, địa điểm
- Bộ lọc thông minh:
  - Loại công việc (full-time, part-time, contract, internship)
  - Hình thức làm việc (remote, onsite, hybrid)
  - Ngành nghề
- Sắp xếp theo (mới nhất, nổi bật, mức lương)
- View modes (grid/list)
- Lưu việc làm yêu thích
- Job cards với đầy đủ thông tin

#### 📄 Trang chi tiết công việc (job-detail.html)
- Thông tin chi tiết về công việc
- Mô tả, yêu cầu, quyền lợi
- Company information sidebar
- Related jobs suggestions
- Apply form với upload CV
- Share và save functionality
- Application tracking

#### 🎓 Trang khóa học (skills.html)
- Danh mục khóa học theo lĩnh vực
- Tìm kiếm và filter khóa học
- Bộ lọc theo:
  - Cấp độ (beginner, intermediate, advanced)
  - Giá (miễn phí/có phí)
  - Đánh giá
- Course cards với ratings và thông tin chi tiết
- Course detail modal
- Newsletter subscription

#### 📞 Trang liên hệ (contact.html)
- Contact form với validation
- Thông tin liên hệ đầy đủ
- Social media links
- FAQ section với accordion
- Newsletter signup
- Interactive elements

#### 👤 Authentication System
- Đăng ký/Đăng nhập với localStorage simulation
- Phân quyền user (candidate/employer)
- User profile management
- Session management
- Demo users có sẵn

#### 🎨 UI/UX Features
- Dark/Light mode toggle với localStorage
- Responsive design (desktop, tablet, mobile)
- Smooth animations và transitions
- Modern glassmorphism effects
- Consistent design system
- Loading states và error handling

## 🛠 Công nghệ sử dụng

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling với custom properties
- **JavaScript (ES6+)**: Client-side functionality
- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: Icon library
- **Google Fonts**: Typography (Inter font family)

### Data Management
- **RESTful Table API**: CRUD operations
- **localStorage**: Client-side data persistence
- **JSON**: Data exchange format

### Tools & Libraries
- **Tailwind CSS CDN**: Rapid styling
- **Font Awesome CDN**: Icons
- **Google Fonts**: Web fonts

## 📊 Database Schema

### Tables

#### 1. users
```javascript
{
  id: "text",
  email: "text",
  fullName: "text", 
  userType: "candidate|employer",
  avatar: "text",
  phone: "text",
  location: "text",
  skills: "array",
  experience: "text",
  education: "text",
  bio: "text",
  companyName: "text", // employer only
  companySize: "text", // employer only
  industry: "text",    // employer only
  savedJobs: "array"
}
```

#### 2. jobs
```javascript
{
  id: "text",
  title: "text",
  company: "text",
  location: "text",
  salary: "text",
  type: "full-time|part-time|contract|internship",
  workMode: "remote|onsite|hybrid",
  category: "text",
  description: "rich_text",
  requirements: "rich_text",
  benefits: "rich_text",
  skills: "array",
  deadline: "datetime",
  status: "active|closed|draft",
  employerId: "text",
  companyLogo: "text",
  featured: "bool",
  applicants: "number"
}
```

#### 3. courses
```javascript
{
  id: "text",
  title: "text",
  description: "rich_text",
  instructor: "text",
  category: "text",
  level: "beginner|intermediate|advanced",
  duration: "text",
  price: "number",
  thumbnail: "text",
  videoUrl: "text",
  materials: "array",
  skills: "array",
  rating: "number",
  students: "number",
  featured: "bool",
  status: "active|draft|archived"
}
```

#### 4. applications
```javascript
{
  id: "text",
  jobId: "text",
  candidateId: "text",
  status: "pending|reviewed|interview|rejected|accepted",
  coverLetter: "rich_text",
  resumeUrl: "text",
  notes: "text",
  interviewDate: "datetime"
}
```

#### 5. newsletters
```javascript
{
  id: "text",
  email: "text",
  name: "text",
  subscribed: "bool",
  preferences: "array"
}
```

## 🚀 Cách chạy dự án

### 1. Setup cơ bản
```bash
# Clone hoặc download project
# Không cần build process vì sử dụng static files

# Mở trực tiếp index.html trong browser
# Hoặc sử dụng live server
```

### 2. Sử dụng Live Server (Recommended)
```bash
# Nếu có VS Code với Live Server extension
# Click chuột phải vào index.html > "Open with Live Server"

# Hoặc sử dụng Python simple server
python -m http.server 8000

# Hoặc Node.js serve
npx serve .
```

### 3. Demo Users
Website có sẵn 2 tài khoản demo:

**Ứng viên:**
- Email: `candidate@demo.com`
- Password: `123456`

**Nhà tuyển dụng:**
- Email: `employer@demo.com` 
- Password: `123456`

## 📱 Tính năng Responsive

Website được thiết kế responsive cho:
- **Desktop**: >= 1024px
- **Tablet**: 768px - 1023px  
- **Mobile**: < 768px

### Breakpoints chính:
- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+

## 🎨 Design System

### Colors
- **Primary**: Blue shades (#2563eb, #3b82f6)
- **Secondary**: Purple, Green accents
- **Gray scale**: Modern gray palette
- **Status colors**: Red, Green, Yellow, Blue

### Typography
- **Font family**: Inter (Google Fonts)
- **Font weights**: 300, 400, 500, 600, 700
- **Responsive sizing**: Base 16px, scales up on larger screens

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Multiple variants and states
- **Forms**: Clean inputs with focus states
- **Modals**: Centered overlays with backdrop
- **Navigation**: Sticky header with mobile menu

## 🔧 API Endpoints

Website sử dụng RESTful Table API với các endpoints:

### Jobs
- `GET /tables/jobs` - List jobs with pagination/filtering
- `GET /tables/jobs/{id}` - Get job details
- `POST /tables/jobs` - Create job (employers only)
- `PUT /tables/jobs/{id}` - Update job
- `DELETE /tables/jobs/{id}` - Delete job

### Courses  
- `GET /tables/courses` - List courses
- `POST /tables/courses` - Create course
- `PUT /tables/courses/{id}` - Update course

### Users
- `GET /tables/users` - List users
- `POST /tables/users` - Register user
- `PUT /tables/users/{id}` - Update profile

### Applications
- `POST /tables/applications` - Submit application
- `GET /tables/applications` - List applications

## 📁 Cấu trúc thư mục

```
skillconnect/
├── index.html              # Trang chủ
├── jobs.html               # Danh sách việc làm  
├── job-detail.html         # Chi tiết công việc
├── skills.html             # Khóa học & kỹ năng
├── contact.html            # Liên hệ
├── js/
│   ├── main.js            # JavaScript chính
│   ├── auth.js            # Authentication
│   ├── jobs.js            # Jobs functionality
│   ├── job-detail.js      # Job detail functionality
│   └── skills.js          # Skills/courses functionality
└── README.md              # Tài liệu dự án
```

## 🎯 Hướng phát triển tiếp theo

### Tính năng có thể mở rộng:
1. **User Profiles**: Trang profile chi tiết cho candidates và employers
2. **Advanced Search**: Tìm kiếm AI-powered với ML recommendations  
3. **Real-time Chat**: Messaging system giữa candidates và employers
4. **Video Interviews**: Tích hợp video call cho phỏng vấn online
5. **Skill Assessments**: Bài test kỹ năng và certification
6. **Company Pages**: Trang công ty chi tiết với reviews
7. **Analytics Dashboard**: Dashboard cho employers và candidates
8. **Mobile App**: React Native hoặc Flutter app
9. **Payment System**: Xử lý thanh toán cho premium features
10. **Email Notifications**: System gửi email tự động

### Technical improvements:
1. **Backend API**: Node.js/Express hoặc Python/Django
2. **Database**: PostgreSQL hoặc MongoDB  
3. **Authentication**: JWT tokens, OAuth integration
4. **File Upload**: Cloud storage (AWS S3, Cloudinary)
5. **Search Engine**: Elasticsearch cho advanced search
6. **Caching**: Redis cho performance optimization
7. **Testing**: Unit tests và integration tests
8. **CI/CD**: Automated deployment pipeline

## 🤝 Đóng góp

Dự án được xây dựng với mục đích demo và học tập. Các cải tiến có thể bao gồm:

1. **Code optimization**: Refactor JavaScript modules
2. **Performance**: Image optimization, lazy loading
3. **Accessibility**: ARIA labels, keyboard navigation
4. **SEO**: Meta tags, structured data
5. **Security**: Input validation, XSS protection

## 📄 License

Dự án này được tạo cho mục đích demo và học tập.

## 📞 Liên hệ

Để biết thêm thông tin về dự án, vui lòng liên hệ qua:
- Website: [SkillConnect Demo]
- Email: info@skillconnect.demo

---

⭐ **SkillConnect - Kết nối tài năng, Phát triển kỹ năng, Xây dựng tương lai!**