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

GET /api/instructor/dashboard

## Current Status

The data model and initial API responsibilities have been identified.

Backend implementation will begin after the initial project structure and
development environment are configured.

## Instructor Dashboard Response Contract

The instructor frontend requests `GET /api/instructor/dashboard` and expects
one JSON document containing summary metrics and active attempts. The endpoint
should return the following shape:

```json
{
  "summary": {
    "activeLabs": 12,
    "activeLabsTrend": "3 more than yesterday",
    "studentsInProgress": 18,
    "studentsInProgressTrend": "Across 4 scenarios",
    "completedThisWeek": 27,
    "completedThisWeekTrend": "18% more than last week",
    "needsAttention": 3,
    "needsAttentionTrend": "No activity for over 30 min"
  },
  "attempts": [
    {
      "id": "attempt-1042",
      "student": "Maya Rodriguez",
      "initials": "MR",
      "scenario": "DNS resolution failure",
      "status": "in-progress",
      "statusLabel": "In progress",
      "progress": 68,
      "lastActivity": "2 min ago",
      "elapsed": "18 min",
      "events": [
        {
          "type": "complete",
          "label": "Checking DNS",
          "description": "Student is investigating name resolution.",
          "timestamp": "10:29 AM"
        }
      ]
    }
  ]
}
```

`events` are intentionally high-level activity records. The initial progress
view should expose events such as lab launch, SSH connection, connectivity
testing, DNS checks, configuration changes, validation attempts, and
completion; it should not expose raw terminal commands.
