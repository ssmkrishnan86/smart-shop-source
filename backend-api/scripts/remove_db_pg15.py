import sys
import os

user_site = os.path.expanduser(r"~\AppData\Roaming\Python\Python314\site-packages")
if os.path.exists(user_site) and user_site not in sys.path:
    sys.path.insert(0, user_site)

import pg8000.native

# Check PostgreSQL 18 on port 5432
print("1. Checking PostgreSQL 18 on port 5432...")
try:
    conn18 = pg8000.native.Connection('postgres', password='root', host='localhost', port=5432, database='postgres')
    ver18 = conn18.run('SELECT version()')[0][0]
    print(f"   Port 5432 is running: {ver18}")
    res18 = conn18.run("SELECT 1 FROM pg_database WHERE datname = 'smartshop_db'")
    if res18:
        print("   CONFIRMED: 'smartshop_db' is active and KEPT on PostgreSQL 18.")
    else:
        print("   Note: 'smartshop_db' is missing on PostgreSQL 18, re-creating...")
        conn18.run("CREATE DATABASE smartshop_db WITH OWNER = postgres ENCODING = 'UTF8'")
    conn18.close()
except Exception as err:
    print(f"   Error on port 5432: {err}")

# Check other ports (e.g. 5433 for PG15) to remove smartshop_db if present
for p in [5433, 5434, 5435]:
    try:
        conn = pg8000.native.Connection('postgres', password='root', host='localhost', port=p, database='postgres')
        ver = conn.run('SELECT version()')[0][0]
        print(f"2. Found PostgreSQL on port {p}: {ver}")
        res = conn.run("SELECT 1 FROM pg_database WHERE datname = 'smartshop_db'")
        if res:
            print(f"   Removing 'smartshop_db' from PostgreSQL on port {p}...")
            # Terminate active connections to smartshop_db
            conn.run("SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'smartshop_db'")
            conn.run("DROP DATABASE smartshop_db")
            print(f"   SUCCESS: Removed 'smartshop_db' from port {p}!")
        else:
            print(f"   'smartshop_db' does not exist on port {p}.")
        conn.close()
    except Exception:
        pass
