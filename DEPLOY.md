# Deploy to Railway.app

## Quick Deploy (Recommended)

### Option A: Deploy via GitHub (Easiest)

1. **Đăng ký Railway.app**
   - Truy cập: https://railway.app
   - Click "Login with GitHub"
   - Authorize Railway

2. **Tạo Project mới**
   - Click "New Project"
   - Chọn "Deploy from GitHub repo"
   - Chọn repository: `thanhthuong194/recruitment-management-system`

3. **Deploy từng service riêng:**

   **Service 1: PostgreSQL Database**
   - Click "New Service" → "Database" → **"Add PostgreSQL"**
   - Railway sẽ tự động provision database
   - Copy connection string từ "Variables" tab
   - ✅ Miễn phí trong free tier ($5 credit/tháng)

   **Service 2: Backend (Spring Boot)**
   - Click "New Service" → "GitHub Repo"
   - Chọn root path: `/backend`
   - Set environment variables:
     ```
     SPRING_PROFILES_ACTIVE=postgres
     DATABASE_URL=<PostgreSQL connection URL from Railway>
     DATABASE_USER=<from Railway PostgreSQL service>
     DATABASE_PASSWORD=<from Railway PostgreSQL service>
     SPRING_FLYWAY_ENABLED=true
     PORT=8080
     ```
   - Railway sẽ auto-detect Java/Maven và build
   - Click "Deploy"

   **Service 3: Frontend (React)**
   - Click "New Service" → "GitHub Repo"  
   - Chọn root path: `/frontend/recruitment-frontend`
   - Set environment variables:
     ```
     REACT_APP_API_BASE_URL=https://<backend-url-from-railway>.up.railway.app/api
     ```
   - Railway sẽ auto-detect Node.js và build
   - Click "Deploy"

4. **Configure Domain**
   - Mỗi service sẽ có domain dạng: `xxx.up.railway.app`
   - Frontend domain → Đây là URL chính của ứng dụng
   - Backend domain → Update vào REACT_APP_API_BASE_URL
   - Có thể add custom domain (vd: `yourapp.com`)

---

### Option B: Deploy via Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize project**
   ```bash
   cd /home/lephuchai/Web1/recruitment-management-system
   railway init
   ```

4. **Add SQL Server Database**
   ```bash
   railway add --database sqlserver
   ```

5. **Deploy Backend**
   ```bash
   cd backend
   railway up
   ```

6. **Deploy Frontend**
   ```bash
   cd ../frontend/recruitment-frontend
   railway up
   ```

7. **Set environment variables**
   ```bash
   railway variables set SPRING_DATASOURCE_URL=<connection-string>
   railway variables set REACT_APP_API_BASE_URL=<backend-url>
   ```

---

## Alternative: Deploy with Docker Compose (VPS Required)

Nếu bạn có VPS (DigitalOcean, AWS, Google Cloud):

1. **SSH vào VPS**
   ```bash
   ssh user@your-vps-ip
   ```

2. **Install Docker**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo apt install docker-compose
   ```

3. **Clone repository**
   ```bash
   git clone https://github.com/thanhthuong194/recruitment-management-system.git
   cd recruitment-management-system
   ```

4. **Update environment variables**
   ```bash
   # Edit docker-compose.yaml
   # Replace localhost with your domain/IP
   nano docker-compose.yaml
   ```

5. **Start services**
   ```bash
   docker-compose up -d
   ```

6. **Setup Nginx reverse proxy**
   ```bash
   sudo apt install nginx
   # Configure nginx to proxy port 80 → 3000 (frontend)
   ```

7. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Cost Estimation

### Railway.app (Free Tier)
- ✅ $5 credit/month (free forever)
- ✅ Enough for small apps
- ✅ Auto SSL
- ✅ No credit card required
- ⚠️ Sleep after inactivity (wake up on request)

### Upgrade to Hobby Plan ($5/month)
- ✅ No sleep
- ✅ More resources
- ✅ Custom domains

### VPS Option
- DigitalOcean: $4-6/month
- AWS Lightsail: $3.5-5/month
- Vultr: $2.5-5/month
- ✅ Full control
- ⚠️ Need to manage server yourself

---

## Post-Deployment Checklist

- [ ] Database migrations chạy thành công
- [ ] Frontend có thể kết nối backend
- [ ] CORS configured đúng
- [ ] Environment variables đã set đầy đủ
- [ ] SSL certificate active (HTTPS)
- [ ] Test tạo kế hoạch tuyển dụng
- [ ] Test đăng nhập với các roles khác nhau
- [ ] Backup database (nếu dùng VPS)

---

## Troubleshooting

**Lỗi CORS:**
```java
// backend/src/main/java/com/recruitment/recruitment_backend/security/SecurityConfig.java
.cors(cors -> cors.configurationSource(request -> {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(Arrays.asList(
        "http://localhost:3000",
        "https://your-frontend.up.railway.app"  // Add this
    ));
    // ...
}))
```

**Database connection failed:**
- Kiểm tra connection string trong Railway dashboard
- Ensure SQL Server service is running
- Check firewall rules

**Frontend không load:**
- Verify REACT_APP_API_BASE_URL trong environment variables
- Check build logs in Railway dashboard
- Ensure `npm run build` works locally

---

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/thanhthuong194/recruitment-management-system/issues
