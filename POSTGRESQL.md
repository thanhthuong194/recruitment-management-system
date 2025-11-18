# PostgreSQL Migration Guide

Dự án đã được cập nhật để hỗ trợ cả **SQL Server** (local development) và **PostgreSQL** (production/Railway).

## 🚀 Quick Start với PostgreSQL

### Local Development với PostgreSQL

1. **Start PostgreSQL với Docker:**
   ```bash
   docker-compose -f docker-compose-postgres.yaml up -d
   ```

2. **Verify database:**
   ```bash
   docker exec -it RMS-Postgres psql -U postgres -d recruitment_db
   ```

3. **Access application:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8080
   - Database: localhost:5432

### Local Development với SQL Server (Legacy)

```bash
docker-compose up -d
```

---

## 🌐 Production Deployment (Railway)

### Automatic Detection
Railway sẽ tự động detect PostgreSQL database và set các environment variables:
- `DATABASE_URL`
- `DATABASE_USER` 
- `DATABASE_PASSWORD`

Backend sẽ tự động dùng PostgreSQL profile khi deploy.

### Manual Configuration
Nếu cần config thủ công, thêm vào Railway environment variables:

```env
SPRING_PROFILES_ACTIVE=postgres
DATABASE_URL=jdbc:postgresql://your-host:5432/railway
DATABASE_USER=postgres
DATABASE_PASSWORD=xxxxx
```

---

## 📁 Project Structure

```
backend/src/main/resources/
├── application.properties              # SQL Server config (local)
├── application-postgres.properties     # PostgreSQL config (production)
└── database/migration/
    ├── migration/                      # SQL Server migrations
    └── postgres/                       # PostgreSQL migrations ✨ NEW
        ├── V1__init_schema.sql
        ├── V2__create_admin_user.sql
        ├── V3__seed_unit_manager_user.sql
        ├── V4__add_hr_and_hieutruong_users.sql
        └── V5__insert_sample_data.sql
```

---

## 🔄 Differences: SQL Server vs PostgreSQL

| Feature | SQL Server | PostgreSQL |
|---------|-----------|------------|
| Auto-increment | `IDENTITY` | `SERIAL` |
| String concat | `+` | `\|\|` |
| Date type | `date` | `DATE` |
| Sequence | Manual | Auto with SERIAL |
| Case sensitivity | Case-insensitive | Case-sensitive |
| Unicode | `NVARCHAR` với N prefix | `VARCHAR` (UTF-8 mặc định) |

---

## 🧪 Testing

### Test PostgreSQL locally:

```bash
# Start PostgreSQL
docker-compose -f docker-compose-postgres.yaml up -d

# Check logs
docker-compose -f docker-compose-postgres.yaml logs -f recruitment-backend

# Test API
curl http://localhost:8080/api/users

# Stop
docker-compose -f docker-compose-postgres.yaml down
```

### Test SQL Server (legacy):

```bash
docker-compose up -d
curl http://localhost:8080/api/users
docker-compose down
```

---

## 🐛 Troubleshooting

### Connection refused
```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Check logs
docker logs RMS-Postgres
```

### Migration errors
```bash
# Connect to database
docker exec -it RMS-Postgres psql -U postgres -d recruitment_db

# Check migrations
SELECT version, description, success FROM flyway_schema_history;
```

### Character encoding issues
PostgreSQL uses UTF-8 by default, không cần N prefix như SQL Server:
```sql
-- SQL Server
INSERT INTO users VALUES (N'Nguyễn Văn A')

-- PostgreSQL
INSERT INTO users VALUES ('Nguyễn Văn A')
```

---

## 📊 Default Accounts

Cả hai databases đều có cùng default accounts:

| Username | Password | Role | Full Name |
|----------|----------|------|-----------|
| admin | 123 | ADMIN | Quản trị viên hệ thống |
| um | 123 | UNIT_MANAGER | Lê Hoàng Nam |
| hr | 123 | PERSONNEL_MANAGER | Nguyễn Thị Lan Anh |
| hieutruong | 123 | RECTOR | Trần Văn Minh |
| unit1 | 123 | UNIT_MANAGER | Trần Minh Bảo |

---

## 🔄 Switching Databases

### Local: SQL Server → PostgreSQL
```bash
# Stop SQL Server
docker-compose down -v

# Start PostgreSQL
docker-compose -f docker-compose-postgres.yaml up -d
```

### Production: Always PostgreSQL
Railway tự động dùng PostgreSQL profile.

---

## 📝 Notes

- ✅ PostgreSQL migrations ở `database/migration/postgres/`
- ✅ SQL Server migrations ở `database/migration/` (root)
- ✅ Flyway tự động detect đúng folder dựa vào active profile
- ✅ UTF-8 support tốt hơn với PostgreSQL (không cần N prefix)
- ✅ Free tier trên Railway với PostgreSQL
- ⚠️ SQL Server trên Railway cần paid plan

---

## 🎯 Recommended Setup

- **Local Development:** PostgreSQL (test production setup)
- **Production:** PostgreSQL trên Railway (miễn phí)
- **Legacy:** SQL Server vẫn hoạt động cho existing deployments
