# Database Directory

This directory contains all database-related files for the INFRA-PREDICT-AI backend.

## Contents

- `*.db` - SQLite database files (development/testing)
- `scripts/` - Database migration and maintenance scripts
- `schema/` - Database schema documentation

## Database Structure

### Production-Ready Normalized Schema

The database uses a normalized structure with the following tables:

#### Core Project Tables
- **projects** - Master project records with unique codes
- **project_updates** - Time-series progress and expenditure updates
- **project_milestones** - Key deliverables and milestone tracking
- **risk_scores** - Historical risk assessments
- **predictions** - ML-based delay and cost overrun predictions
- **risk_drivers** - Risk factors and mitigation plans
- **early_warnings** - Alert system for project issues
- **peer_benchmarks** - Comparative analytics

#### Ingestion Tables
- **ingestion_jobs** - File upload job tracking with metrics
- **ingestion_records** - Individual record processing status
- **raw_uploaded_data** - Audit trail of uploaded files

#### User & Audit Tables
- **users** - User accounts and authentication
- **audit_logs** - Complete audit trail of all actions

## Key Features

### Data Integrity
- ✅ Primary and foreign key constraints
- ✅ Unique project code enforcement
- ✅ Check constraints on numeric ranges
- ✅ Cascade delete for related records
- ✅ Automatic timestamps (created_at, updated_at)

### Performance
- ✅ Strategic indexes on frequently queried columns
- ✅ Composite indexes for multi-column queries
- ✅ Connection pooling for PostgreSQL
- ✅ Optimized relationships with lazy loading

### Scalability
- ✅ Supports SQLite (development) and PostgreSQL (production)
- ✅ Alembic migrations for schema evolution
- ✅ Partitioning-ready design for time-series data
- ✅ Normalized structure reduces data redundancy

## Database Files

### SQLite Files (Development)
- `infra_telemetry.db` - Main application database
- `test_infra_telemetry.db` - Test database (auto-created)
- `infra_telemetry_backup_*.db` - Backup files

### Migration Scripts
Located in `scripts/` subdirectory:
- `migrate_existing_data.py` - Migrate from old schema to new normalized structure
- `seed_data.py` - Load sample/demo data
- `backup_database.py` - Create database backups

## Usage

### Initialize Database

```bash
# Using Python (automatic table creation)
cd backend
python -c "from app.db.base import Base; from app.db.session import engine; from app.db import models; Base.metadata.create_all(engine)"
```

### Using Alembic Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1

# View migration history
alembic history
```

### Migrate Existing Data

```bash
# Run data migration script
python database/scripts/migrate_existing_data.py
```

### Backup Database

```bash
# SQLite backup (simple copy)
cp database/infra_telemetry.db database/infra_telemetry_backup_$(date +%Y%m%d).db

# PostgreSQL backup
pg_dump -h localhost -U user infra_predict_ai > backup_$(date +%Y%m%d).sql
```

## PostgreSQL Production Setup

### 1. Install PostgreSQL

```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql
```

### 2. Create Database

```sql
CREATE DATABASE infra_predict_ai;
CREATE USER infra_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE infra_predict_ai TO infra_user;
```

### 3. Update Configuration

Edit `.env`:
```bash
DATABASE_URL=postgresql://infra_user:secure_password@localhost:5432/infra_predict_ai
DB_POOL_SIZE=20
DB_MAX_OVERFLOW=40
```

### 4. Run Migrations

```bash
alembic upgrade head
```

## Schema Diagram

```
┌──────────────┐
│   Projects   │◄────┐
│              │     │
│ - id (PK)    │     │
│ - code (UK)  │     │
│ - name       │     │
│ - sector     │     │
└──────────────┘     │
       ▲             │
       │             │
       │  FK         │
       │             │
┌──────────────────┐ │
│ Project Updates  │ │
│                  │ │
│ - id (PK)        │ │
│ - project_id(FK)─┘ │
│ - progress       │  │
│ - expenditure    │  │
│ - reported_date  │  │
└──────────────────┘  │
                      │
┌──────────────────┐  │
│   Risk Scores    │  │
│                  │  │
│ - id (PK)        │  │
│ - project_id(FK)─┬─┘
│ - health_score   │
│ - risk_level     │
└──────────────────┘

┌──────────────────┐
│   Predictions    │
│                  │
│ - id (PK)        │
│ - project_id(FK)─┘
│ - delay_months   │
│ - cost_overrun   │
└──────────────────┘
```

## Indexes

### High-Priority Indexes
- `projects.code` (unique) - Primary lookup key
- `projects.sector + state` - Geographic filtering
- `project_updates.project_id + reported_date` - Time-series queries
- `risk_scores.project_id + calculated_at` - Latest scores
- `users.username` (unique) - Authentication
- `audit_logs.created_at` - Audit trail queries

## Maintenance

### Regular Tasks

1. **Backup** - Daily automated backups
2. **Vacuum** (PostgreSQL) - Weekly to reclaim space
3. **Analyze** - After bulk imports to update statistics
4. **Archive** - Quarterly archival of old audit logs

### Monitoring

Monitor these metrics:
- Database size and growth rate
- Query performance (slow query log)
- Connection pool utilization
- Index usage statistics
- Lock contention

## Testing

Run database tests:
```bash
pytest tests/test_database.py -v
```

Tests cover:
- ✅ Connection and schema creation
- ✅ CRUD operations on all models
- ✅ Duplicate prevention
- ✅ Cascade deletes
- ✅ Constraints validation
- ✅ Relationship integrity
- ✅ Transaction rollback

## Troubleshooting

### Common Issues

**Issue**: `table already exists` error
**Solution**: Drop and recreate or use Alembic migrations

**Issue**: `duplicate key` error
**Solution**: Check for existing project codes before insert

**Issue**: Slow queries
**Solution**: Check indexes with `EXPLAIN ANALYZE` and add missing indexes

**Issue**: Connection pool exhausted
**Solution**: Increase `DB_POOL_SIZE` and `DB_MAX_OVERFLOW` in config

## Security

### Best Practices
- ✅ Use parameterized queries (SQLAlchemy ORM)
- ✅ Never store passwords in plain text
- ✅ Restrict database user permissions
- ✅ Enable SSL for PostgreSQL connections
- ✅ Regular security audits of audit_logs
- ✅ Encrypted backups for production data

### Connection String Security
Never commit database credentials to version control. Use environment variables or secret management services.

## Support

For database-related issues:
1. Check this README
2. Review Alembic migration history
3. Check application logs
4. Review audit_logs table for recent changes
5. Contact the development team

---

Last Updated: 2026-09-09
Schema Version: 1.0.0 (Initial Production Schema)
