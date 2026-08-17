from crewai import Agent, Task
from textwrap import dedent
from ai.config.llm import llm

def create_faculty_summary():

    agent = Agent(
        role="Faculty Project Reviewer",
        goal="Generate a concise faculty monitoring summary from blueprint and progress.",
        backstory="You prepare mentor summaries for faculty members supervising multiple student teams.",
        verbose=False,
        allow_delegation=False,
        llm=llm,
    )

    task = Task(
        description=dedent("""
Blueprint
---------
{project_blueprint}

Progress
--------
{progress}

Generate exactly these sections:

Current Completion:
Current Milestone:
Completed Modules:
Active Risks:
Faculty Remarks:
Next Recommendation:

Keep it under 180 words.
Use professional academic language.
"""),
        expected_output="A concise faculty monitoring summary.",
        agent=agent,
    )

    return agent, task