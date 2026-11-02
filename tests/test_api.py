from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from fastapi.testclient import TestClient
from app.main import app


def test_sprint2_prototype_endpoints():
    with TestClient(app) as client:
        health = client.get('/api/health')
        assert health.status_code == 200
        assert health.json()['status'] == 'ok'

        scenarios = client.get('/api/scenarios')
        assert scenarios.status_code == 200
        assert scenarios.json()[0]['title'] == 'DNS Resolution Failure'

        assignments = client.get('/api/assignments')
        assert assignments.status_code == 200
        assert assignments.json()[0]['status'] == 'ready'

        attempt = client.get('/api/attempts/1/status')
        assert attempt.status_code == 200
        assert attempt.json()['ssh_port'] == 22001

        dashboard = client.get('/api/instructor/dashboard')
        assert dashboard.status_code == 200
        body = dashboard.json()
        assert 'summary' in body
        assert 'attempts' in body
        assert body['attempts'][0]['scenario'] == 'DNS Resolution Failure'
        assert body['attempts'][0]['events'][0]['label'] == 'Lab launched'
