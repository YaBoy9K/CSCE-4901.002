# DNE System Architecture

## Current Architecture

DNE uses a web application for student and instructor interaction.

The website communicates with the backend and Scenario Manager.
The Scenario Manager is responsible for creating, resetting, and validating
student lab environments.

Docker will provide isolated network environments for each active student
attempt.

Students will not use a browser based terminal. Instead, DNE will provide
SSH connection information so the student can connect using their own terminal.

## Planned Flow

Student
→ DNE Website
→ Backend
→ Scenario Manager
→ Docker Lab
→ SSH Access
→ Student Terminal

## Sprint 1 Infrastructure Goal

The first prototype will contain:

- Client container
- Router container
- DNS container
- Web server container

The lab will contain one DNS-related fault.

The student should be able to SSH into the client container and troubleshoot
the environment.

## Planned Scenario Manager Functions

- Launch lab
- Reset lab
- Stop lab
- Provide SSH connection details
- Apply scenario fault
- Validate whether the fault has been repaired

## Current Status

Architecture and lab design are defined.

Ubuntu/Docker setup and implementation are the next development tasks.
