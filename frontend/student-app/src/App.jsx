import { useState } from 'react'

const assignment = {
  title: 'DNS Resolution Failure',
  difficulty: 'Beginner',
  due: 'Sprint 2 Demo',
  status: 'Ready',
  problem: 'Users can reach the internal web server by IP address, but web.dne.local does not resolve.',
  ssh: 'ssh student@192.168.4.105 -p 22001',
}

function Dashboard({ onOpenLab }) {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">DiagNet Environment</p>
        <h1>Student Dashboard</h1>
        <p>Assigned troubleshooting scenarios for the current prototype.</p>
      </section>

      <section className="card">
        <div className="row between">
          <div>
            <h2>{assignment.title}</h2>
            <p className="muted">DNS troubleshooting prototype</p>
          </div>
          <span className="badge">{assignment.status}</span>
        </div>
        <div className="meta-grid">
          <div><strong>Difficulty</strong><span>{assignment.difficulty}</span></div>
          <div><strong>Due</strong><span>{assignment.due}</span></div>
          <div><strong>Access</strong><span>SSH</span></div>
        </div>
        <button onClick={onOpenLab}>Open Lab</button>
      </section>

      <section className="note">
        Sprint 2 scope: this page uses mock data. Live backend integration comes in a later sprint.
      </section>
    </main>
  )
}

function Lab({ onBack }) {
  const [rootCause, setRootCause] = useState('')
  const [fix, setFix] = useState('')
  const [message, setMessage] = useState('Not submitted')

  function copySSH() {
    navigator.clipboard?.writeText(assignment.ssh)
    setMessage('SSH command copied')
  }

  function submit() {
    if (!rootCause.trim() || !fix.trim()) {
      setMessage('Enter both the root cause and fix before submitting.')
      return
    }
    setMessage('Prototype submission saved locally. Automated validation will be connected later.')
  }

  return (
    <main className="page">
      <button className="ghost" onClick={onBack}>← Dashboard</button>
      <section className="hero compact">
        <p className="eyebrow">Active Lab</p>
        <h1>{assignment.title}</h1>
      </section>

      <div className="two-col">
        <section className="card">
          <h2>Problem Ticket</h2>
          <p>{assignment.problem}</p>

          <h3>SSH Access</h3>
          <div className="command">{assignment.ssh}</div>
          <button onClick={copySSH}>Copy SSH Command</button>

          <h3>Student Instructions</h3>
          <ol>
            <li>Open your own terminal.</li>
            <li>Connect using the SSH command above.</li>
            <li>Troubleshoot the problem without suggested commands from DNE.</li>
            <li>Return here and describe the root cause and fix.</li>
          </ol>
        </section>

        <section className="card">
          <h2>Submit Diagnosis</h2>
          <label>Root cause</label>
          <textarea value={rootCause} onChange={(e) => setRootCause(e.target.value)} placeholder="What caused the issue?" />
          <label>Fix applied</label>
          <textarea value={fix} onChange={(e) => setFix(e.target.value)} placeholder="What did you change?" />
          <div className="button-row">
            <button className="secondary" onClick={() => setMessage('Prototype reset button clicked. Backend connection comes later.')}>Reset Lab</button>
            <button onClick={submit}>Submit</button>
          </div>
          <p className="status">{message}</p>
        </section>
      </div>

      <section className="note">
        Sprint 2 checkpoint: SSH information and UI flow are real-looking, but launch/reset/validation buttons are intentionally not connected to Docker yet.
      </section>
    </main>
  )
}

export default function App() {
  const [page, setPage] = useState('dashboard')
  return page === 'dashboard'
    ? <Dashboard onOpenLab={() => setPage('lab')} />
    : <Lab onBack={() => setPage('dashboard')} />
}
