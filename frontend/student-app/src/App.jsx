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

export default function App() {
  const [page, setPage] = useState('dashboard')
  return (
    <Dashboard onOpenLab={() => setPage('lab')} />
  )
}
