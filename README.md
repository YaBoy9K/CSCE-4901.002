# DNE Sprint 2 Backend Prototype

This is the intentionally small Sprint 2 backend checkpoint for Team Blur.

## What it does now

- Starts a FastAPI application.
- Creates a local SQLite database automatically.
- Seeds one DNS Resolution Failure scenario, assignment, and attempt.
- Exposes a few read-only API endpoints.
- Implements `GET /api/instructor/dashboard` using the response contract already created by Trevor's instructor frontend.
- Includes a small automated API test.

## What it intentionally does not do yet

- No direct Docker control.
- No Scenario Manager integration.
- No authentication/authorization.
- No real launch/reset/validation actions.
- No live command tracking.
- No production database deployment.

Those belong to later sprints / Capstone 2.

## Run

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pytest -q
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Open `http://localhost:8000/docs`.

## Current endpoints

- `GET /api/health`
- `GET /api/scenarios`
- `GET /api/assignments`
- `GET /api/attempts/{id}/status`
- `GET /api/instructor/dashboard`

The instructor dashboard endpoint intentionally matches Trevor's current `frontend/app.js` data contract. The current data is seeded prototype data, not live Docker state.
