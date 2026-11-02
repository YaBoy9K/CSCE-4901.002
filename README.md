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

## Current Progress

- Initial requirements completed
- Initial system design completed
- SSH-based student access selected
- Student Dashboard wireframe completed
- Instructor Dashboard wireframe completed
- Troubleshooting Lab wireframe completed
- Figma UI prototype created
- Initial frontend/backend responsibilities identified
- Initial Docker lab architecture planned
- Sprint 1 implementation tasks divided among team members

## Sprint 1 Prototype Goal

The first working prototype will use a DNS troubleshooting scenario.

The goal is to demonstrate:

Instructor assigns scenario
→ Student launches lab
→ Docker environment starts
→ Student receives SSH connection
→ Student troubleshoots through terminal
→ Student submits diagnosis
→ DNE validates repair
→ Instructor sees result

## Next Steps

- Configure Ubuntu/Docker development environment
- Create first DNS troubleshooting Docker lab
- Implement SSH access
- Begin frontend implementation
- Create backend API
- Create initial database models
- Connect frontend lab launch to Scenario Manager
- Implement reset and validation
- Test the complete DNS scenario

Current Sprint 2 Progress

- Ubuntu/Docker development environment configured
- DNS troubleshooting lab implemented
- Student SSH access implemented
- DNS fault injection implemented
- Repair reset implemented
- Automated DNS validation implemented
- Student frontend in development
- Instructor frontend in development
- Backend/API in development
- Scenario Manager integration planned next

## Frontend Prototype

The initial instructor dashboard and student progress view are in
`frontend/`. The page is dependency-free and can be previewed locally with:

```bash
python -m http.server 8000 --directory frontend
```

The dashboard requests live data from `GET /api/instructor/dashboard`. When
that endpoint is not available, it clearly labels the page as demo data so the
UI remains available while backend integration is in progress. The expected
response shape is documented in `docs/backend-data-plan.md`.

## Project Management

Trello:
https://trello.com/invite/b/6a95be6ca95b1e1943c04e4a/ATTI0d26a8b2d8340c311c854349c1f2e9f611DF734E/4901-capstone-sprint-0

Figma:
https://www.figma.com/make/n3W6NV8mwUJF5140j953I6/Design-UI-Front-End?fullscreen=1&t=sPnr1qWxoQIlGykE-1&code-node-id=0-6
