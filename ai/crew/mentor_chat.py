import json
from crewai import Crew
from ai.agents.mentor_agent import create_mentor


class MentorChat:

    def __init__(self):
        self.mentor_agent, self.mentor_task = create_mentor()

    def detect_intent(self, question):

        q = question.lower()

        greetings = ["hi", "hello", "hey", "good morning", "good evening"]

        summaries = ["summary", "summarize", "overview", "gist"]

        planning = [
            "plan",
            "roadmap",
            "timeline",
            "week",
            "milestone",
            "schedule",
        ]

        debugging = [
            "debug",
            "bug",
            "fix",
            "error",
            "exception",
            "crash",
        ]

        architecture = [
            "architecture",
            "design",
            "flow",
            "diagram",
        ]

        implementation = [
            "implement",
            "build",
            "develop",
            "create",
            "coding",
        ]

        comparison = [
            "vs",
            "compare",
            "difference",
            "better",
        ]

        review = [
            "review",
            "feedback",
            "improve",
            "optimize",
        ]

        explanation = [
            "what",
            "why",
            "how",
            "explain",
        ]

        if any(x in q for x in greetings):
            return "greeting"

        if any(x in q for x in summaries):
            return "summary"

        if any(x in q for x in planning):
            return "planning"

        if any(x in q for x in debugging):
            return "debugging"

        if any(x in q for x in architecture):
            return "architecture"

        if any(x in q for x in implementation):
            return "implementation"

        if any(x in q for x in comparison):
            return "comparison"

        if any(x in q for x in review):
            return "review"

        if any(x in q for x in explanation):
            return "explanation"

        return "general"

    def chat(
        self,
        student_profile,
        project_idea,
        project_blueprint,
        progress,
        question,
        duration,
        team,
        phase,
        response_style="chat",
        first_message=False,
    ):

        intent = self.detect_intent(question)

        result = Crew(
            agents=[self.mentor_agent],
            tasks=[self.mentor_task],
            verbose=True,
        ).kickoff(
            inputs={
                "student_profile": student_profile,
                "project_idea": project_idea,
                "project_blueprint": project_blueprint,
                "progress": progress,
                "question": question,
                "duration": duration,
                "team": team,
                "phase": phase,
                "intent": intent,
                "response_style": response_style,
                "first_message": first_message,
            }
        )

        return str(result)

