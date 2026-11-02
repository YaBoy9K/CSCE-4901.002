from pydantic import BaseModel


class ScenarioOut(BaseModel):
    id: int
    title: str
    difficulty: str
    problem_description: str
    fault_type: str


class AssignmentOut(BaseModel):
    id: int
    scenario_id: int
    student_name: str
    status: str
    due_date: str | None = None


class AttemptStatusOut(BaseModel):
    id: int
    assignment_id: int
    status: str
    ssh_host: str | None = None
    ssh_port: int | None = None
    validation_status: str | None = None
