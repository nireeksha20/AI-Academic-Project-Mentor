from pydantic import BaseModel
from typing import List


class FeasibilityOutput(BaseModel):
    verdict: str

    feasibility_score: int

    complexity: str

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

    backend: str

    database: str

    ai_stack: str

    deployment: str

    architecture: str

    recommendations: List[str]


class TimelineStep(BaseModel):
    title: str

    tasks: List[str]


class TimelineOutput(BaseModel):
    estimated_duration: str

    phases: List[TimelineStep]


class RiskItem(BaseModel):
    risk: str

    severity: str

    mitigation: str


class RiskOutput(BaseModel):
    overall_risk: str

    risks: List[RiskItem]