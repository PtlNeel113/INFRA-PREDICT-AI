"""
Create database backups with compression and rotation.
"""
import sys
import shutil
import gzip
from datetime import datetime
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

from app.core.config import settings


def backup_sqlite_database():
    """Backup SQLite database with compression."""
    db_url = settings.DATABASE_URL
    
    if not db_url.startswith("sqlite"):
        print("This script only supports SQLite databases.")
        print("For PostgreSQL, use: pg_dump -h host -U user database > backup.sql")
        return
    
    # Extract database file path
    db_path = Path(db_url.replace("sqlite:///", ""))
    
    if not db_path.exists():
        print(f"Database file not found: {db_path}")
        return
    
    # Create backup directory
    backup_dir = Path("database/backups")
    backup_dir.mkdir(parents=True, exist_ok=True)
    
    # Generate backup filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = backup_dir / f"infra_telemetry_backup_{timestamp}.db"
    compressed_file = backup_dir / f"infra_telemetry_backup_{timestamp}.db.gz"
    
    print("=" * 70)
    print("Database Backup")
    print("=" * 70)
    print()
    print(f"Source: {db_path}")
    print(f"Backup: {compressed_file}")
    print()
    
    try:
        # Copy database file
        print("Copying database file...")
        shutil.copy2(db_path, backup_file)
        
        # Compress backup
        print("Compressing backup...")
        with open(backup_file, 'rb') as f_in:
            with gzip.open(compressed_file, 'wb') as f_out:
                shutil.copyfileobj(f_in, f_out)
        
        # Remove uncompressed backup
        backup_file.unlink()
        
        # Get file sizes
        original_size = db_path.stat().st_size / (1024 * 1024)
        backup_size = compressed_file.stat().st_size / (1024 * 1024)
        compression_ratio = (1 - backup_size / original_size) * 100
        
        print()
        print("✓ Backup completed successfully!")
        print()
        print(f"Original size: {original_size:.2f} MB")
        print(f"Backup size:   {backup_size:.2f} MB")
        print(f"Compression:   {compression_ratio:.1f}%")
        print()
        
        # Clean old backups (keep last 10)
        clean_old_backups(backup_dir, keep=10)
        
    except Exception as e:
        print(f"\n✗ Backup failed: {e}")
        raise


def clean_old_backups(backup_dir: Path, keep: int = 10):
    """Remove old backup files, keeping only the most recent ones."""
    backups = sorted(backup_dir.glob("*.db.gz"), key=lambda p: p.stat().st_mtime, reverse=True)
    
    if len(backups) > keep:
        print(f"Cleaning old backups (keeping {keep} most recent)...")
        for old_backup in backups[keep:]:
            old_backup.unlink()
            print(f"  Removed: {old_backup.name}")
        print()


def restore_backup(backup_file: str):
    """Restore database from a compressed backup."""
    backup_path = Path(backup_file)
    
    if not backup_path.exists():
        print(f"Backup file not found: {backup_path}")
        return
    
    db_url = settings.DATABASE_URL
    db_path = Path(db_url.replace("sqlite:///", ""))
    
    print("=" * 70)
    print("Database Restore")
    print("=" * 70)
    print()
    print(f"Backup: {backup_path}")
    print(f"Target: {db_path}")
    print()
    
    # Create backup of current database
    if db_path.exists():
        current_backup = db_path.parent / f"{db_path.stem}_before_restore_{datetime.now().strftime('%Y%m%d_%H%M%S')}.db"
        print(f"Backing up current database to: {current_backup.name}")
        shutil.copy2(db_path, current_backup)
    
    try:
        # Decompress and restore
        print("Restoring from backup...")
        with gzip.open(backup_path, 'rb') as f_in:
            with open(db_path, 'wb') as f_out:
                shutil.copyfileobj(f_in, f_out)
        
        print()
        print("✓ Restore completed successfully!")
        print()
        
    except Exception as e:
        print(f"\n✗ Restore failed: {e}")
        raise


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "restore":
        if len(sys.argv) < 3:
            print("Usage: python backup_database.py restore <backup_file>")
            sys.exit(1)
        restore_backup(sys.argv[2])
    else:
        backup_sqlite_database()
