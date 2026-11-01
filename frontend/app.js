const API_URL = "/api/instructor/dashboard";

const demoDashboard = {
  summary: {
    activeLabs: 12,
    activeLabsTrend: "3 more than yesterday",
    studentsInProgress: 18,
    studentsInProgressTrend: "Across 4 scenarios",
    completedThisWeek: 27,
    completedThisWeekTrend: "18% more than last week",
    needsAttention: 3,
    needsAttentionTrend: "No activity for over 30 min",
  },
  attempts: [
    {
      id: "attempt-1042",
      student: "Maya Rodriguez",
      initials: "MR",
      scenario: "DNS resolution failure",
      status: "in-progress",
      statusLabel: "In progress",
      progress: 68,
      lastActivity: "2 min ago",
      elapsed: "18 min",
      events: [
        { type: "complete", label: "Lab launched", description: "The isolated DNS lab is running.", timestamp: "10:14 AM" },
        { type: "complete", label: "SSH connected", description: "Student connected to the client container.", timestamp: "10:15 AM" },
        { type: "complete", label: "Testing connectivity", description: "Connectivity checks recorded by the lab.", timestamp: "10:21 AM" },
        { type: "current", label: "Checking DNS", description: "Student is investigating name resolution.", timestamp: "10:29 AM" },
        { type: "pending", label: "Changing configuration", description: "Waiting for a configuration change.", timestamp: "Not started" },
        { type: "pending", label: "Validating repair", description: "Validation will run after submission.", timestamp: "Not started" },
      ],
    },
    {
      id: "attempt-1041",
      student: "Ethan Nguyen",
      initials: "EN",
      scenario: "Web server unreachable",
      status: "needs-attention",
      statusLabel: "Needs attention",
      progress: 42,
      lastActivity: "38 min ago",
      elapsed: "31 min",
      events: [
        { type: "complete", label: "Lab launched", description: "The isolated web server lab is running.", timestamp: "9:45 AM" },
        { type: "complete", label: "SSH connected", description: "Student connected to the client container.", timestamp: "9:47 AM" },
        { type: "complete", label: "Testing connectivity", description: "Connectivity checks recorded by the lab.", timestamp: "9:52 AM" },
        { type: "warning", label: "No recent activity", description: "No new progress event in the last 30 minutes.", timestamp: "10:16 AM" },
      ],
    },
    {
      id: "attempt-1039",
      student: "Priya Shah",
      initials: "PS",
      scenario: "DNS resolution failure",
      status: "in-progress",
      statusLabel: "In progress",
      progress: 84,
      lastActivity: "5 min ago",
      elapsed: "22 min",
      events: [
        { type: "complete", label: "Lab launched", description: "The isolated DNS lab is running.", timestamp: "9:08 AM" },
        { type: "complete", label: "SSH connected", description: "Student connected to the client container.", timestamp: "9:09 AM" },
        { type: "complete", label: "Checking DNS", description: "Student identified a resolver configuration issue.", timestamp: "9:20 AM" },
        { type: "complete", label: "Changing configuration", description: "A new resolver configuration was applied.", timestamp: "9:25 AM" },
        { type: "current", label: "Validating repair", description: "Waiting for the student to submit validation.", timestamp: "9:29 AM" },
      ],
    },
    {
      id: "attempt-1037",
      student: "Jordan Lee",
      initials: "JL",
      scenario: "Routing table misconfiguration",
      status: "completed",
      statusLabel: "Completed",
      progress: 100,
      lastActivity: "1 hr ago",
      elapsed: "26 min",
      events: [
        { type: "complete", label: "Lab launched", description: "The isolated routing lab is running.", timestamp: "8:32 AM" },
        { type: "complete", label: "SSH connected", description: "Student connected to the client container.", timestamp: "8:33 AM" },
        { type: "complete", label: "Testing connectivity", description: "Connectivity checks recorded by the lab.", timestamp: "8:40 AM" },
        { type: "complete", label: "Changing configuration", description: "The route was repaired.", timestamp: "8:51 AM" },
        { type: "complete", label: "Validation passed", description: "Automated lab validation passed.", timestamp: "8:58 AM" },
      ],
    },
  ],
};

const state = {
  dashboard: null,
  selectedAttemptId: null,
  filter: "all",
};

const elements = {
  status: document.querySelector("#data-status"),
  attemptsTable: document.querySelector("#attempts-table"),
  progressStudent: document.querySelector("#progress-student"),
  progressContent: document.querySelector("#progress-content"),
  filter: document.querySelector("#attempt-filter"),
  closeProgress: document.querySelector("#close-progress"),
  toast: document.querySelector("#toast"),
};

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setDataStatus(message, status) {
  elements.status.innerHTML = `<span class="status-dot status-dot-${status}" aria-hidden="true"></span>${message}`;
}

function renderSummary(summary) {
  setText("#active-labs", summary.activeLabs);
  setText("#active-labs-trend", summary.activeLabsTrend);
  setText("#students-in-progress", summary.studentsInProgress);
  setText("#students-in-progress-trend", summary.studentsInProgressTrend);
  setText("#completed-this-week", summary.completedThisWeek);
  setText("#completed-this-week-trend", summary.completedThisWeekTrend);
  setText("#needs-attention", summary.needsAttention);
  setText("#needs-attention-trend", summary.needsAttentionTrend);

  document.querySelector("#completed-this-week-trend").classList.add("positive");
  document.querySelector("#needs-attention-trend").classList.add("warning");
}

function statusBadge(attempt) {
  const statusClass = ["in-progress", "needs-attention", "completed"].includes(attempt.status)
    ? attempt.status
    : "in-progress";
  const dotClass = statusClass === "completed" ? "success" : statusClass === "needs-attention" ? "danger" : "warning";
  return `<span class="status-badge ${statusClass}"><span class="status-dot status-dot-${dotClass}" aria-hidden="true"></span>${escapeHtml(attempt.statusLabel)}</span>`;
}

function renderAttempts() {
  const attempts = state.dashboard.attempts.filter((attempt) => {
    return state.filter === "all" || attempt.status === state.filter;
  });

  if (!attempts.length) {
    elements.attemptsTable.innerHTML = '<tr><td class="table-empty" colspan="6">No attempts match this filter.</td></tr>';
    return;
  }

  elements.attemptsTable.innerHTML = attempts.map((attempt) => `
    <tr data-attempt-id="${escapeHtml(attempt.id)}" class="${attempt.id === state.selectedAttemptId ? "selected" : ""}">
      <td>
        <div class="student-cell">
          <span class="student-avatar" aria-hidden="true">${escapeHtml(attempt.initials)}</span>
          ${escapeHtml(attempt.student)}
        </div>
      </td>
      <td class="scenario-cell" title="${escapeHtml(attempt.scenario)}">${escapeHtml(attempt.scenario)}</td>
      <td>${statusBadge(attempt)}</td>
      <td class="progress-cell">
        <div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width: ${Math.max(0, Math.min(100, Number(attempt.progress) || 0))}%"></div></div>
        <span class="progress-number">${escapeHtml(attempt.progress)}% complete</span>
      </td>
      <td>${escapeHtml(attempt.lastActivity)}</td>
      <td><button class="view-button" type="button" data-view-attempt="${escapeHtml(attempt.id)}">View</button></td>
    </tr>
  `).join("");

  elements.attemptsTable.querySelectorAll("tr[data-attempt-id]").forEach((row) => {
    row.addEventListener("click", () => selectAttempt(row.dataset.attemptId));
  });
}

function renderProgress(attempt) {
  if (!attempt) {
    elements.progressStudent.textContent = "Select a student";
    elements.progressContent.className = "progress-content empty-state";
    elements.progressContent.innerHTML = `
      <span class="empty-state-icon" aria-hidden="true">◌</span>
      <p>Select an active attempt to see structured troubleshooting events.</p>
    `;
    return;
  }

  elements.progressStudent.textContent = attempt.student;
  elements.progressContent.className = "progress-content";
  elements.progressContent.innerHTML = `
    <div class="attempt-summary">
      <div>
        <strong>${escapeHtml(attempt.scenario)}</strong>
        <small>${escapeHtml(attempt.elapsed)} elapsed · ${escapeHtml(attempt.progress)}% complete</small>
      </div>
      ${statusBadge(attempt)}
    </div>
    <ol class="timeline">
      ${attempt.events.map((event) => `
        <li class="timeline-item ${event.type}">
          <span class="timeline-marker" aria-hidden="true"></span>
          <div class="timeline-copy">
            <strong>${escapeHtml(event.label)}</strong>
            <p>${escapeHtml(event.description)}</p>
            <time>${escapeHtml(event.timestamp)}</time>
          </div>
        </li>
      `).join("")}
    </ol>
  `;
}

function selectAttempt(attemptId) {
  const attempt = state.dashboard.attempts.find((candidate) => candidate.id === attemptId);
  if (!attempt) {
    return;
  }

  state.selectedAttemptId = attemptId;
  renderAttempts();
  renderProgress(attempt);
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => elements.toast.classList.remove("visible"), 3000);
}

async function loadDashboard() {
  try {
    const response = await fetch(API_URL, { headers: { Accept: "application/json" } });
    if (!response.ok) {
      throw new Error(`Dashboard API returned ${response.status}`);
    }

    state.dashboard = await response.json();
    setDataStatus("Live backend data", "success");
  } catch (error) {
    console.info("Using dashboard demo data until the backend endpoint is available.", error);
    state.dashboard = demoDashboard;
    setDataStatus("Demo data · backend unavailable", "warning");
  }

  renderSummary(state.dashboard.summary);
  renderAttempts();
  renderProgress(null);
}

elements.filter.addEventListener("change", (event) => {
  state.filter = event.target.value;
  renderAttempts();
});

elements.closeProgress.addEventListener("click", () => {
  state.selectedAttemptId = null;
  renderAttempts();
  renderProgress(null);
});

document.querySelector("#create-scenario-button").addEventListener("click", () => {
  showToast("Scenario creation will be connected to the scenario API.");
});

loadDashboard();
