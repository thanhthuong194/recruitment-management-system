# Hệ thống Ứng tuyển - Recruitment Management System

## Tính năng mới: Form ứng tuyển công khai + Upload CV

### 📋 Tổng quan

Hệ thống đã được bổ sung tính năng cho phép ứng viên:
- Xem danh sách tin tuyển dụng công khai (không cần đăng nhập)
- Nộp hồ sơ ứng tuyển trực tuyến
- Upload CV (PDF, Word)
- HR/Admin/Hiệu trưởng quản lý hồ sơ ứng viên

---

## 🚀 Các endpoint API mới

### Backend (Spring Boot)

#### 1. **Job Postings - Xem tin tuyển dụng**
```http
GET /api/jobs/public
```
- **Public**: Không cần authentication
- **Response**: Danh sách các job postings đang mở (`status = "Đang mở"`)

#### 2. **Upload CV**
```http
POST /api/files/upload-cv
```
- **Public**: Không cần authentication
- **Content-Type**: `multipart/form-data`
- **Body**: `file` (PDF, DOC, DOCX, max 5MB)
- **Response**:
```json
{
  "filePath": "/uploads/cv/uuid-filename.pdf",
  "message": "File uploaded successfully"
}
```

#### 3. **Submit Application**
```http
POST /api/applications/submit
```
- **Public**: Không cần authentication
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "fullName": "Nguyễn Văn A",
  "dateOfBirth": "2000-01-01",
  "email": "email@example.com",
  "phone": "0912345678",
  "position": "Giảng viên CNTT",
  "department": "Khoa Công nghệ thông tin",
  "address": "Hà Nội",
  "cpa": 3.5,
  "sex": "Nam",
  "cvPath": "/uploads/cv/uuid-filename.pdf",
  "positionID": 1
}
```

#### 4. **Get Candidates** (HR/Admin/Rector only)
```http
GET /api/candidates
```
- **Requires**: Authentication
- **Response**: Danh sách tất cả ứng viên

#### 5. **Get Applications** (HR/Admin/Rector only)
```http
GET /api/applications
```
- **Requires**: Authentication
- **Response**: Danh sách tất cả hồ sơ ứng tuyển

#### 6. **Update Application Status** (HR/Admin/Rector only)
```http
PUT /api/applications/{id}/status
```
- **Body**:
```json
{
  "status": "Đã duyệt"
}
```
- Các trạng thái: `Đang xét`, `Đã duyệt`, `Từ chối`

#### 7. **Delete Candidate** (Admin only)
```http
DELETE /api/candidates/{id}
```

---

## 🖥️ Frontend Routes

### Public Routes (Không cần đăng nhập)

#### 1. `/jobs` - Danh sách tin tuyển dụng
- Component: `PublicJobsPage.jsx`
- Hiển thị các job postings đang mở
- Nút "Ứng tuyển ngay" cho mỗi vị trí

#### 2. `/apply/:jobId` - Form ứng tuyển
- Component: `ApplicationFormPage.jsx`
- Form điền thông tin cá nhân
- Upload CV
- Validation và error handling

### Protected Routes (Cần đăng nhập)

#### 3. `/candidates` - Quản lý hồ sơ ứng viên
- Component: `CandidatesManagementPage.jsx`
- **Quyền truy cập**: HR, Admin, Rector
- **Tính năng**:
  - Xem danh sách ứng viên
  - Tìm kiếm, lọc theo trạng thái
  - Cập nhật trạng thái hồ sơ (Đang xét/Đã duyệt/Từ chối)
  - Xem chi tiết ứng viên
  - Tải CV
  - Xóa ứng viên (Admin only)

---

## 📁 Cấu trúc file

### Backend
```
backend/src/main/java/com/recruitment/recruitment_backend/
├── controller/
│   ├── ApplicationController.java      # API ứng tuyển
│   ├── CandidateController.java       # API ứng viên
│   ├── JobPostingController.java      # API job postings
│   └── FileUploadController.java      # API upload file
├── service/
│   ├── ApplicationService.java
│   ├── CandidateService.java
│   ├── JobPostingService.java
│   └── FileStorageService.java        # Service upload file
├── repository/
│   ├── ApplicationRepository.java
│   ├── CandidateRepository.java
│   ├── JobPostingRepository.java
│   └── JobPositionRepository.java
├── dto/
│   ├── ApplicationDTO.java
│   ├── ApplicationSubmitRequest.java
│   ├── CandidateDTO.java
│   └── JobPostingDTO.java
└── model/
    ├── Application.java
    ├── Candidate.java
    ├── JobPosting.java
    └── JobPosition.java
```

### Frontend
```
frontend/recruitment-frontend/src/
├── pages/
│   ├── PublicJobsPage.jsx            # Trang xem jobs (public)
│   ├── ApplicationFormPage.jsx        # Form ứng tuyển (public)
│   └── CandidatesManagementPage.jsx  # Quản lý hồ sơ (protected)
├── services/
│   ├── ApplicationService.js
│   ├── CandidateService.js
│   ├── JobPostingService.js
│   └── FileUploadService.js
└── routes/
    └── AppRoutes.js                  # Routing mới
```

---

## ⚙️ Cấu hình

### Backend - application.properties
```properties
# File Upload Configuration
spring.servlet.multipart.enabled=true
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB
file.upload-dir=uploads/cv
```

### Frontend - .env (optional)
```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

---

## 🔄 Quy trình sử dụng

### Quy trình ứng viên nộp hồ sơ:

1. **HR đăng thông báo tuyển dụng** (Job Posting)
   - Vào `/recruitment/notifications`
   - Tạo thông báo từ recruitment plan đã được duyệt

2. **Ứng viên xem danh sách tuyển dụng**
   - Truy cập `/jobs` (không cần đăng nhập)
   - Xem thông tin: vị trí, số lượng, GPA yêu cầu, deadline

3. **Ứng viên nộp hồ sơ**
   - Click "Ứng tuyển ngay"
   - Điền form thông tin cá nhân
   - Upload CV (PDF/Word, max 5MB)
   - Submit

4. **HR/Admin/Rector xem và xét duyệt**
   - Đăng nhập vào hệ thống
   - Vào `/candidates`
   - Xem danh sách, tìm kiếm, lọc
   - Cập nhật trạng thái: "Đang xét" → "Đã duyệt" hoặc "Từ chối"
   - Tải CV để xem chi tiết

---

## 🔐 Phân quyền

| Chức năng | Ứng viên (Public) | HR | Admin | Rector |
|-----------|-------------------|-----|-------|--------|
| Xem job postings | ✅ | ✅ | ✅ | ✅ |
| Nộp hồ sơ | ✅ | ✅ | ✅ | ✅ |
| Xem danh sách ứng viên | ❌ | ✅ | ✅ | ✅ |
| Cập nhật trạng thái hồ sơ | ❌ | ✅ | ✅ | ✅ |
| Tải CV | ❌ | ✅ | ✅ | ✅ |
| Xóa ứng viên | ❌ | ❌ | ✅ | ❌ |

---

## 🧪 Test API với Postman/cURL

### 1. Upload CV
```bash
curl -X POST http://localhost:8080/api/files/upload-cv \
  -F "file=@/path/to/cv.pdf"
```

### 2. Submit Application
```bash
curl -X POST http://localhost:8080/api/applications/submit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Nguyễn Văn A",
    "dateOfBirth": "2000-01-01",
    "email": "test@example.com",
    "phone": "0912345678",
    "position": "Giảng viên",
    "department": "CNTT",
    "address": "Hà Nội",
    "cpa": 3.5,
    "sex": "Nam",
    "cvPath": "/uploads/cv/xxx.pdf"
  }'
```

### 3. Get Active Jobs
```bash
curl http://localhost:8080/api/jobs/public
```

---

## 📝 Database Schema

### Bảng `Candidates`
```sql
candidateID     INT (PK, Auto-increment)
fullName        VARCHAR(50)
dateOfBirth     DATE
email           VARCHAR(50) UNIQUE
phone           VARCHAR(15) UNIQUE
position        VARCHAR(50)
department      VARCHAR(50)
address         VARCHAR(255)
cpa             FLOAT
sex             VARCHAR(10)
cvPath          VARCHAR(255)
```

### Bảng `Applications`
```sql
applicationID   INT (PK, Auto-increment)
candidateID     INT (FK -> Candidates)
positionID      INT (FK -> JobPositions)
applyDate       DATE
status          VARCHAR(20)  -- 'Đang xét', 'Đã duyệt', 'Từ chối'
```

---

## 🚨 Lưu ý

1. **File Upload**: 
   - Thư mục `uploads/cv` sẽ được tự động tạo khi start backend
   - Chỉ chấp nhận PDF và Word (.doc, .docx)
   - Giới hạn 5MB mỗi file

2. **Email & Phone Unique**:
   - Nếu ứng viên đã tồn tại (email trùng), hệ thống sẽ tái sử dụng candidate record
   - Tạo application mới với candidate đã có

3. **CORS**:
   - Tất cả controller đều có `@CrossOrigin(origins = "*")`
   - Production nên chỉ định cụ thể domain frontend

4. **Security**:
   - Public endpoints: `/api/jobs/public/**`, `/api/applications/submit`, `/api/files/upload-cv`
   - Protected endpoints: `/api/candidates/**`, `/api/applications` (cần authentication)

---

## 📞 Hỗ trợ

Nếu có vấn đề, kiểm tra:
- Backend logs: `mvn spring-boot:run`
- Frontend console: F12 Developer Tools
- Database: Xem dữ liệu trong SQL Server Management Studio

---

**Phát triển bởi**: Recruitment Management System Team
**Phiên bản**: 2.0
**Ngày cập nhật**: December 2025
