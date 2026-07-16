from crewai import Crew

from ai.agents.mentor_agent import create_mentor
from ai.services.blueprint_service import blueprint_service


class MentorChat:

    def __init__(self):
        self.mentor_agent, self.mentor_task = create_mentor()

    def chat(
        self,
        student_profile,
        project_idea,
        progress,
        question,
    ):

        blueprint = blueprint_service.get(student_profile)

        if blueprint is None:
            return (
                "No project blueprint was found for this student. "
                "Please generate the project blueprint first."
            )

        result = Crew(
            agents=[self.mentor_agent],
            tasks=[self.mentor_task],
            verbose=True,
        ).kickoff(
            inputs={
                "student_profile": student_profile,
                "project_idea": project_idea,
                "project_blueprint": blueprint,
                "progress": progress,
                "question": question,
            }
        )

        return str(result)