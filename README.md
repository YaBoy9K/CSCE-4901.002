# DiagNet Environment (DNE)

## Team Blur

Team Members:
- Zion Welsh
- Trevor Levy
- Perry Johnson
- Muddabir Masood

## Project Overview

DiagNet Environment (DNE) is an educational network troubleshooting
platform designed for computer science and IT courses.

Instructors will be able to create and assign troubleshooting scenarios.
Students will launch isolated lab environments from the DNE website and
connect to their assigned environment using SSH from their own terminal.

DNE will manage scenario deployment, faults, lab resets, progress tracking,
validation, and instructor review.

## Current Sprint 1 Direction

The current design uses:

- Web-based student and instructor dashboards
- Docker-based isolated lab environments
- SSH for student access to troubleshooting labs
- Instructor-created troubleshooting scenarios
- Student progress tracking
- Automated repair validation
- Instructor review of submitted attempts

## Student Workflow

1. Student logs into DNE.
2. Student selects an assigned scenario.
3. Student launches the lab.
4. DNE creates the isolated lab environment.
5. DNE provides the student with SSH connection information.
6. Student connects using their own terminal.
7. Student troubleshoots and repairs the environment.
8. Student submits their diagnosis and solution.
9. DNE validates the lab state.
10. Instructor can review the attempt and progress.

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

## Project Management

Trello:
https://trello.com/invite/b/6a95be6ca95b1e1943c04e4a/ATTI0d26a8b2d8340c311c854349c1f2e9f611DF734E/4901-capstone-sprint-0

Figma:
https://www.figma.com/make/n3W6NV8mwUJF5140j953I6/Design-UI-Front-End?fullscreen=1&t=sPnr1qWxoQIlGykE-1&code-node-id=0-6
