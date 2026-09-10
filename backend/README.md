# INFRA-PREDICT-AI Backend

Production-ready FastAPI backend for infrastructure telemetry and predictive analytics platform.

## Architecture

```
backend/
├── app/
│   ├── core/           # Core configuration, logging, exceptions
│   ├── api/            # API endpoints and routers
│   ├── db/             # Database models and session management
│   ├── schemas/        # Pydantic schemas for validation
│   ├── services/       # Business logic services
│   └── utils/          # Utility functions
├── tests/              # Test suite
└── models/             # ML models (future)
```

## Features

### Core Infrastructure
- ✅ Environment-based configuration management
- ✅ Structured JSON logging with request ID tracking
- ✅ Centralized exception handling
- ✅ Request/response middleware (logging, security, request ID)
- ✅ Health and readiness endpoints
- ✅ Production-safe error handling

### API Features
- ✅ RESTful API with OpenAPI documentation
- ✅ Request validation with Pydantic schemas
- ✅ File upload with validation
- ✅ Data ingestion pipeline
- ✅ Audit logging for all operations

### Database
- ✅ SQLAlchemy ORM with connection pooling
- ✅ Migration-ready structure
- ✅ Transaction management
- ✅ Model separation (ingestion, telemetry)

## Installation

### Prerequisites
- Python 3.9+
- pip or pipenv

### Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Initialize database:
```bash
# Tables are created automatically on first run
```

## Running the Application

### Development Mode
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### With Gunicorn (Production)
```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Testing

### Run All Tests
```bash
pytest
```

### Run with Coverage
```bash
pytest --cov=app --cov-report=html
```

### Run Specific Test File
```bash
pytest tests/test_health.py -v
```

### Run Integration Tests Only
```bash
pytest -m integration
```

## API Endpoints

### Health & Status
- `GET /api/` - Service information
- `GET /api/health` - Health check
- `GET /api/ready` - Readiness probe with dependency checks
- `GET /api/ping` - Simple connectivity check

### Data Ingestion
- `POST /api/ingest/preview` - Preview uploaded file
- `POST /api/ingest/commit` - Commit data ingestion
- `GET /api/ingest/jobs` - Get ingestion history
- `GET /api/ingest/errors/{job_id}` - Download error report

### Synchronization
- `GET /api/sync/status` - Get PAIMANA sync status
- `POST /api/sync/trigger` - Trigger manual sync

## Configuration

### Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `ENVIRONMENT` - Environment name (development, production)
- `DATABASE_URL` - Database connection string
- `SECRET_KEY` - Secret key for security features
- `LOG_LEVEL` - Logging level (DEBUG, INFO, WARNING, ERROR)
- `LOG_FORMAT` - Log format (json, text)

### Database

Default: SQLite (`sqlite:///./infra_telemetry.db`)

For PostgreSQL:
```
DATABASE_URL=postgresql://user:password@localhost:5432/infra_predict_ai
```

## Logging

Structured logging with JSON output (production) or text (development).

Logs include:
- Request ID for tracing
- Timestamp
- Log level
- Logger name
- Message
- Extra context fields

## Security Features

- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- CORS configuration
- Request validation
- Input sanitization
- SQL injection protection (via SQLAlchemy ORM)

## Development

### Code Style
```bash
# Format code
black app tests

# Sort imports
isort app tests

# Lint
flake8 app tests

# Type checking
mypy app
```

### Adding New Endpoints

1. Create schema in `app/schemas/`
2. Create service in `app/services/`
3. Create endpoint in `app/api/v1/`
4. Add tests in `tests/`
5. Update router in `app/api/router.py`

## Production Deployment

### Docker
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Checklist
- [ ] Set strong `SECRET_KEY`
- [ ] Configure production database
- [ ] Set `ENVIRONMENT=production`
- [ ] Configure `CORS_ORIGINS` restrictively
- [ ] Enable `LOG_FORMAT=json`
- [ ] Set up log aggregation
- [ ] Configure monitoring (Sentry, etc.)
- [ ] Set up health check monitoring
- [ ] Configure backup strategy

## License

Government of India - Smart India Hackathon 2026
