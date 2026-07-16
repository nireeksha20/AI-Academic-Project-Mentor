from unittest import result

from crewai import Crew, Process
from agents.documentation_agent import create_documentation
from agents import mentor_agent
from agents.feasibility_agent import create_feasibility
from agents.scope_agent import create_scope
from agents.tech_stack_agent import create_tech_stack
from agents.timeline_agent import create_timeline
from agents.risk_agent import create_risk

from crewai import Crew
from agents.mentor_agent import create_mentor
import crew

class MentorCrew:

    def generate_blueprint(self, student_profile, project_idea):

        # -----------------------------
        # Create Agents & Tasks
        # -----------------------------

        feasibility_agent, feasibility_task = create_feasibility()

        scope_agent, scope_task = create_scope()

        tech_agent, tech_task = create_tech_stack()

        timeline_agent, timeline_task = create_timeline()

        risk_agent, risk_task = create_risk()

        # -----------------------------
        # Task Context
        # -----------------------------

        scope_task.context = [feasibility_task]

        tech_task.context = [
            feasibility_task,
            scope_task
        ]

        timeline_task.context = [
            feasibility_task,
            scope_task,
            tech_task
        ]

        risk_task.context = [
            feasibility_task,
            scope_task,
            tech_task,
            timeline_task
        ]

        # -----------------------------
        # Crew
        # -----------------------------

        crew = Crew(
            agents=[
                feasibility_agent,
                scope_agent,
                tech_agent,
                timeline_agent,
                risk_agent
            ],

            tasks=[
                feasibility_task,
                scope_task,
                tech_task,
                timeline_task,
                risk_task
            ],

            process=Process.sequential,

            verbose=True
        )

        crew.kickoff(
            inputs={
                "student_profile": student_profile,
                "project_idea": project_idea
            }
        )

        blueprint = {
            "student_profile": student_profile,
            "project_idea": project_idea,
            "feasibility": str(feasibility_task.output),
            "scope": str(scope_task.output),
            "technology": str(tech_task.output),
            "timeline": str(timeline_task.output),
            "risk": str(risk_task.output)
        }

        return blueprint
    
    def mentor_chat(
        self,
        student_profile,
        project_idea,
        project_blueprint,
        progress,
        question
    ):

        mentor_agent, mentor_task = create_mentor()

        crew = Crew(
        agents=[mentor_agent],
        tasks=[mentor_task],
        verbose=True
        )

        result = crew.kickoff(
        inputs={
            "student_profile": student_profile,
            "project_idea": project_idea,
            "project_blueprint": project_blueprint,
            "progress": progress,
            "question": question
        }
    )

        return result
    def generate_document(

        self,

        student_profile,

        project_idea,

        project_blueprint,

        progress,

        document_type

):

        agent, task = create_documentation()
        crew = Crew(
        agents=[agent],
        tasks=[task],
        verbose=True
    )

        result = crew.kickoff(
        inputs={
            "student_profile":student_profile,
            "project_idea":project_idea,
            "project_blueprint":project_blueprint,
            "progress":progress,
            "document_type":document_type
        }
    )
        return result
