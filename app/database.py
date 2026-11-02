from pathlib import Path
import sqlite3

DB_PATH = Path(__file__).resolve().parent.parent / "dne.db"


def connect() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with connect() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS scenarios (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                difficulty TEXT NOT NULL,
                problem_description TEXT NOT NULL,
                fault_type TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS assignments (
                id INTEGER PRIMARY KEY,
                scenario_id INTEGER NOT NULL,
                student_name TEXT NOT NULL,
                status TEXT NOT NULL,
                due_date TEXT,
                FOREIGN KEY (scenario_id) REFERENCES scenarios(id)
            );

            CREATE TABLE IF NOT EXISTS attempts (
                id INTEGER PRIMARY KEY,
                assignment_id INTEGER NOT NULL,
                status TEXT NOT NULL,
                progress INTEGER NOT NULL DEFAULT 0,
                last_activity TEXT,
                elapsed TEXT,
                ssh_host TEXT,
                ssh_port INTEGER,
                validation_status TEXT,
                FOREIGN KEY (assignment_id) REFERENCES assignments(id)
            );

            CREATE TABLE IF NOT EXISTS progress_events (
                id INTEGER PRIMARY KEY,
                attempt_id INTEGER NOT NULL,
                event_type TEXT NOT NULL,
                label TEXT NOT NULL,
                description TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                FOREIGN KEY (attempt_id) REFERENCES attempts(id)
            );
            """
        )

        count = conn.execute("SELECT COUNT(*) AS n FROM scenarios").fetchone()["n"]
        if count == 0:
            conn.execute(
                "INSERT INTO scenarios (id, title, difficulty, problem_description, fault_type) VALUES (?, ?, ?, ?, ?)",
                (1, "DNS Resolution Failure", "Beginner", "Web server works by IP but web.dne.local does not resolve.", "dns_client_misconfiguration"),
            )
            conn.execute(
                "INSERT INTO assignments (id, scenario_id, student_name, status, due_date) VALUES (?, ?, ?, ?, ?)",
                (1, 1, "Demo Student", "ready", "Sprint 2 Demo"),
            )
            conn.execute(
                """
                INSERT INTO attempts
                    (id, assignment_id, status, progress, last_activity, elapsed, ssh_host, ssh_port, validation_status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (1, 1, "in-progress", 68, "2 min ago", "18 min", "192.168.4.105", 22001, "not_submitted"),
            )
            events = [
                (1, 1, "complete", "Lab launched", "The isolated DNS lab is running.", "10:14 AM"),
                (2, 1, "complete", "SSH connected", "Student connected to the client container.", "10:15 AM"),
                (3, 1, "complete", "Testing connectivity", "Connectivity checks recorded by the lab.", "10:21 AM"),
                (4, 1, "current", "Checking DNS", "Student is investigating name resolution.", "10:29 AM"),
                (5, 1, "pending", "Changing configuration", "Waiting for a configuration change.", "Not started"),
                (6, 1, "pending", "Validating repair", "Validation will run after submission.", "Not started"),
            ]
            conn.executemany(
                "INSERT INTO progress_events (id, attempt_id, event_type, label, description, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
                events,
            )
