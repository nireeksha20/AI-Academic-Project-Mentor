from ai.agents.feasibility_agent import FeasibilityAgent
from ai.agents.scope_agent import ScopeAgent
from ai.agents.tech_stack_agent import TechStackAgent
from ai.agents.timeline_agent import TimelineAgent
from ai.agents.risk_agent import RiskAgent

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
