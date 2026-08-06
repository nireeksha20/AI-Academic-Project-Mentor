from crewai import Crew

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

        base_inputs = {
            "student_profile": student_profile,
            "project_idea": project_idea,
        }

        # ------------------------
        # 1. Feasibility
        # ------------------------

        feasibility = Crew(
            agents=[self.feasibility_agent],
            tasks=[self.feasibility_task],
            verbose=True,
        ).kickoff(inputs=base_inputs)

        feasibility_data = feasibility.pydantic.model_dump()

        # ------------------------
        # Feasibility Decision
        # ------------------------

        verdict = feasibility_data["verdict"]

        if verdict in ["Rejected", "Needs Clarification"]:

            blueprint = {
                "student_profile": student_profile,
                "project_idea": project_idea,
                "status": verdict,
                "feasibility": feasibility_data,
                "scope": None,
                "technology": None,
                "timeline": None,
                "risk": None,
            }

            blueprint_service.save(
                student_profile,
                blueprint
            )

            return blueprint

        # ------------------------
        # 2. Scope
        # ------------------------

        scope = Crew(
            agents=[self.scope_agent],
            tasks=[self.scope_task],
            verbose=True,
        ).kickoff(
            inputs={
                **base_inputs,
                "feasibility": feasibility_data,
            }
        )

        scope_data = scope.pydantic.model_dump()

        # ------------------------
        # 3. Technology
        # ------------------------

        technology = Crew(
            agents=[self.tech_agent],
            tasks=[self.tech_task],
            verbose=True,
        ).kickoff(
            inputs={
                **base_inputs,
                "feasibility": feasibility_data,
                "scope": scope_data,
            }
        )

        technology_data = technology.pydantic.model_dump()

        # ------------------------
        # 4. Timeline
        # ------------------------

        timeline = Crew(
            agents=[self.timeline_agent],
            tasks=[self.timeline_task],
            verbose=True,
        ).kickoff(
            inputs={
                **base_inputs,
                "feasibility": feasibility_data,
                "scope": scope_data,
                "technology": technology_data,
            }
        )

        timeline_data = timeline.pydantic.model_dump()

        # ------------------------
        # 5. Risk
        # ------------------------

        risk = Crew(
            agents=[self.risk_agent],
            tasks=[self.risk_task],
            verbose=True,
        ).kickoff(
            inputs={
                **base_inputs,
                "feasibility": feasibility_data,
                "scope": scope_data,
                "technology": technology_data,
                "timeline": timeline_data,
            }
        )

        risk_data = risk.pydantic.model_dump()

        blueprint = {
    "student_profile": student_profile,
    "project_idea": project_idea,
    "status": "Approved",
    "feasibility": feasibility_data,
    "scope": scope_data,
    "technology": technology_data,
    "timeline": timeline_data,
    "risk": risk_data,
}

        blueprint_service.save(
            student_profile,
            blueprint,
        )

        return blueprint