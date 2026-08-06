from pydantic import BaseModel
from typing import List, Literal


class FeasibilityOutput(BaseModel):

    verdict: Literal[
        "Approved",
        "Approved with Scope Refinement",
        "Needs Clarification",
        "Rejected",
    ]

    clarification_required: bool

    clarification_questions: List[str]

    suggested_interpretations: List[str]

    feasibility_score: int

    complexity: str

    technical_feasibility: str

    implementation_feasibility: str

    academic_suitability: str

    industry_value: int

    portfolio_value: int

    strengths: List[str]

    challenges: List[str]

    skills_to_learn: List[str]

    suggestions: List[str]


class ScopeOutput(BaseModel):
    goal: str

    core_features: List[str]

    optional_features: List[str]

    future_features: List[str]

    out_of_scope: List[str]

    deliverables: List[str]


class TechnologyOutput(BaseModel):

    frontend: str
    frontend_reason: str

    backend: str
    backend_reason: str

    database: str
    database_reason: str

    ai_stack: str
    ai_stack_reason: str

    deployment: str
    deployment_reason: str

    architecture: str

    recommendations: List[str]


class TimelineStep(BaseModel):

    week: int

    title: str

    objective: str

    tasks: List[str]


class TimelineOutput(BaseModel):
    estimated_duration: str

    phases: List[TimelineStep]


class RiskItem(BaseModel):

    risk: str

    probability: str

    severity: str

    mitigation: str


class RiskOutput(BaseModel):
    overall_risk: str

    risks: List[RiskItem]