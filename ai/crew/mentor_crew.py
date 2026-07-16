from crewai import Crew, Process

from ai.agents.feasibility_agent import create_feasibility
from ai.agents.scope_agent import create_scope
from ai.agents.tech_stack_agent import create_tech_stack
from ai.agents.timeline_agent import create_timeline
from ai.agents.risk_agent import create_risk
from ai.services.blueprint_service import blueprint_service


class MentorCrew:

    def __init__(self):

        self.feasibility_agent, self.feasibility_task = create_feasibility()

        self.scope_agent, self.scope_task = create_scope()

        self.tech_agent, self.tech_task = create_tech_stack()

        self.timeline_agent, self.timeline_task = create_timeline()

        self.risk_agent, self.risk_task = create_risk()


    def generate_blueprint(self, student_profile, project_idea):

        inputs = {
            "student_profile": student_profile,
            "project_idea": project_idea
        }

        # 1. Feasibility
        feasibility = Crew(
            agents=[self.feasibility_agent],
            tasks=[self.feasibility_task],
            verbose=True
        ).kickoff(inputs=inputs)

        # 2. Scope
        scope_inputs = {
            **inputs,
            "feasibility": str(feasibility)
        }

        scope = Crew(
            agents=[self.scope_agent],
            tasks=[self.scope_task],
            verbose=True
        ).kickoff(inputs=scope_inputs)

        # 3. Technology
        technology_inputs = {
            **scope_inputs,
            "scope": str(scope)
        }

        technology = Crew(
            agents=[self.tech_agent],
            tasks=[self.tech_task],
            verbose=True
        ).kickoff(inputs=technology_inputs)

        # 4. Timeline
        timeline_inputs = {
            **technology_inputs,
            "technology": str(technology)
        }

        timeline = Crew(
            agents=[self.timeline_agent],
            tasks=[self.timeline_task],
            verbose=True
        ).kickoff(inputs=timeline_inputs)

        # 5. Risk
        risk_inputs = {
            **timeline_inputs,
            "timeline": str(timeline)
        }

        risk = Crew(
            agents=[self.risk_agent],
            tasks=[self.risk_task],
            verbose=True
        ).kickoff(inputs=risk_inputs)

        blueprint = {

        "student_profile": student_profile,

        "project_idea": project_idea,

        "feasibility": str(feasibility),

        "scope": str(scope),

        "technology": str(technology),

        "timeline": str(timeline),

        "risk": str(risk)

        }

        blueprint_service.save(

            student_profile,

            blueprint

        )

        return blueprint

        return {
            "student_profile": student_profile,
            "project_idea": project_idea,
            "feasibility": str(feasibility),
            "scope": str(scope),
            "technology": str(technology),
            "timeline": str(timeline),
            "risk": str(risk)
        }