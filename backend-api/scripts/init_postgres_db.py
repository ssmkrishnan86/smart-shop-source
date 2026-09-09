import sys
import os

# Ensure site-packages are loaded
user_site = os.path.expanduser(r"~\AppData\Roaming\Python\Python314\site-packages")
if os.path.exists(user_site) and user_site not in sys.path:
    sys.path.insert(0, user_site)

import pg8000.native

HOST = "localhost"
PORT = 5432
USER = "postgres"
PASSWORD = "root"
DB_NAME = "smartshop_db"

def run_db_initialization():
    print(f"Connecting to PostgreSQL on {HOST}:{PORT} as {USER}...")
    try:
        # Step 1: Connect to default 'postgres' database
        conn = pg8000.native.Connection(
            user=USER,
            password=PASSWORD,
            host=HOST,
            port=PORT,
            database="postgres"
        )
        print("Connected to default 'postgres' DB.")

        # Step 2: Check if 'smartshop_db' exists
        result = conn.run(f"SELECT 1 FROM pg_database WHERE datname = '{DB_NAME}'")
        if not result:
            print(f"Creating database '{DB_NAME}'...")
            conn.run(f"CREATE DATABASE {DB_NAME} WITH OWNER = {USER} ENCODING = 'UTF8'")
            print(f"Database '{DB_NAME}' created successfully in PostgreSQL / pgAdmin!")
        else:
            print(f"Database '{DB_NAME}' already exists in PostgreSQL / pgAdmin.")
        conn.close()

        # Step 3: Connect to 'smartshop_db' to run schema DDL & seed scripts
        print(f"Connecting to '{DB_NAME}'...")
        db_conn = pg8000.native.Connection(
            user=USER,
            password=PASSWORD,
            host=HOST,
            port=PORT,
            database=DB_NAME
        )

        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        sql_dir = os.path.join(base_dir, "database_sql")

        sql_files = [
            "01_create_database.sql",
            "02_create_tables.sql",
            "03_create_indexes_and_constraints.sql",
            "04_create_functions_and_triggers.sql",
            "05_seed_data.sql",
            "06_shopping_cart_tables.sql",
            "07_auth_and_account_tables.sql"
        ]

        for fname in sql_files:
            fpath = os.path.join(sql_dir, fname)
            if os.path.exists(fpath):
                print(f"Executing {fname}...")
                with open(fpath, "r", encoding="utf-8") as f:
                    content = f.read()
                    # Execute entire file content if it contains function definitions
                    if "CREATE OR REPLACE FUNCTION" in content:
                        statements = [content]
                    else:
                        statements = [stmt.strip() for stmt in content.split(";") if stmt.strip() and not stmt.strip().startswith("\\")]
                    
                    for stmt in statements:
                        try:
                            db_conn.run(stmt)
                        except Exception as err:
                            print(f"  Note on statement: {err}")
                print(f"Finished {fname}.")

        # Step 4: Verify table count in pgAdmin
        tables = db_conn.run("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
        table_names = [t[0] for t in tables]

        print("\n=======================================================")
        print(f"SUCCESS: Database '{DB_NAME}' is now LIVE in PostgreSQL / pgAdmin!")
        print(f"Total Tables Created ({len(table_names)}): {', '.join(table_names)}")
        print("=======================================================\n")
        db_conn.close()

    except Exception as e:
        print(f"ERROR connecting to PostgreSQL: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_db_initialization()
