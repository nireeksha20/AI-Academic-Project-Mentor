from agents.feasibility_agent import FeasibilityAgent
from agents.scope_agent import ScopeAgent
from agents.tech_stack_agent import TechStackAgent
from agents.timeline_agent import TimelineAgent
from agents.risk_agent import RiskAgent

def run_pipeline(project):
    feasibility=FeasibilityAgent()
    scope=ScopeAgent().analyze(project)
    tech=TechStackAgent().recommend(project)
    timeline=TimelineAgent().generate(project)
    risk=RiskAgent().analyze(project)
    return {
        "feasibility": feasibility,
        "scope": scope,
        "tech_stack": tech,
        "timeline": timeline,
        "risk": risk
    }
