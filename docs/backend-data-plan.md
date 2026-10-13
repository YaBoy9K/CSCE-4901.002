# Backend and Data Plan

## Backend Responsibilities

The backend will connect the web application to the Scenario Manager
and persistent data storage.

The backend will initially manage:

- Users
- Scenarios
- Assignments
- Attempts
- Lab status
- Progress events
- Validation results
- Diagnosis submissions

## Initial Data Entities

### User
- user_id
- name
- email
- role

### Scenario
- scenario_id
- title
- difficulty
- problem_description
- fault_type

### Assignment
- assignment_id
- scenario_id
- student_id
- due_date
- status

### Attempt
- attempt_id
- assignment_id
- start_time
- end_time
- result

### Progress Event
- event_id
- attempt_id
- event_type
- timestamp

### Lab Environment
- environment_id
- attempt_id
- state
- ssh_port

## Planned API Endpoints

Possible Sprint 1 endpoints:

GET /api/scenarios

POST /api/scenarios

GET /api/assignments

POST /api/attempts

POST /api/attempts/{id}/launch

POST /api/attempts/{id}/reset

POST /api/attempts/{id}/validate

GET /api/attempts/{id}/status

## Current Status

The data model and initial API responsibilities have been identified.

Backend implementation will begin after the initial project structure and
development environment are configured.
