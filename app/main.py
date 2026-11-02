from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .database import connect, init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="DNE Sprint 2 Backend Prototype", version="0.2.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok", "mode": "sprint2-prototype"}


@app.get("/api/scenarios")
def scenarios():
    with connect() as conn:
        rows = conn.execute("SELECT * FROM scenarios ORDER BY id").fetchall()
    return [dict(row) for row in rows]


@app.get("/api/assignments")
def assignments():
    with connect() as conn:
        rows = conn.execute("SELECT * FROM assignments ORDER BY id").fetchall()
    return [dict(row) for row in rows]


@app.get("/api/attempts/{attempt_id}/status")
def attempt_status(attempt_id: int):
    with connect() as conn:
        row = conn.execute("SELECT * FROM attempts WHERE id = ?", (attempt_id,)).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Attempt not found")
    return dict(row)


def _initials(name: str) -> str:
    parts = [p for p in name.split() if p]
    return "".join(p[0].upper() for p in parts[:2]) or "ST"


@app.get("/api/instructor/dashboard")
def instructor_dashboard():
    """Sprint 2 checkpoint endpoint matching Trevor's existing frontend contract.

    This uses seeded prototype data from SQLite. It does not read Docker or the
    Scenario Manager yet; live lab integration is intentionally deferred.
    """
    with connect() as conn:
        attempt_rows = conn.execute(
            """
            SELECT
                a.id,
                a.status,
                a.progress,
                a.last_activity,
                a.elapsed,
                a.validation_status,
                asg.student_name,
                s.title AS scenario
            FROM attempts a
            JOIN assignments asg ON asg.id = a.assignment_id
            JOIN scenarios s ON s.id = asg.scenario_id
            ORDER BY a.id
            """
        ).fetchall()

        attempts = []
        for row in attempt_rows:
            events = conn.execute(
                """
                SELECT event_type, label, description, timestamp
                FROM progress_events
                WHERE attempt_id = ?
                ORDER BY id
                """,
                (row["id"],),
            ).fetchall()

            status = row["status"]
            status_label = {
                "in-progress": "In progress",
                "needs-attention": "Needs attention",
                "completed": "Completed",
            }.get(status, status.replace("-", " ").title())

            attempts.append(
                {
                    "id": f"attempt-{row['id']}",
                    "student": row["student_name"],
                    "initials": _initials(row["student_name"]),
                    "scenario": row["scenario"],
                    "status": status,
                    "statusLabel": status_label,
                    "progress": row["progress"],
                    "lastActivity": row["last_activity"],
                    "elapsed": row["elapsed"],
                    "events": [
                        {
                            "type": event["event_type"],
                            "label": event["label"],
                            "description": event["description"],
                            "timestamp": event["timestamp"],
                        }
                        for event in events
                    ],
                }
            )

    active_labs = sum(a["status"] in {"in-progress", "needs-attention"} for a in attempts)
    students_in_progress = sum(a["status"] == "in-progress" for a in attempts)
    completed = sum(a["status"] == "completed" for a in attempts)
    needs_attention = sum(a["status"] == "needs-attention" for a in attempts)

    return {
        "summary": {
            "activeLabs": active_labs,
            "activeLabsTrend": "Sprint 2 seeded prototype data",
            "studentsInProgress": students_in_progress,
            "studentsInProgressTrend": "DNS prototype scenario",
            "completedThisWeek": completed,
            "completedThisWeekTrend": "Live history comes in a later sprint",
            "needsAttention": needs_attention,
            "needsAttentionTrend": "No live inactivity detection yet",
        },
        "attempts": attempts,
    }
