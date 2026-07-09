from crewai import Agent, Task
from config.llm import llm

def create_documentation():

    documentation_agent = Agent(
        role="Academic Documentation Expert",

        goal="""
Generate professional academic project documents.
""",

        backstory="""
You are an expert technical writer specializing in
academic reports and software engineering documentation.
""",

        llm=llm,

        verbose=True,

        allow_delegation=False
    )

    documentation_task = Task(

        description="""
Generate a

{document_type}

for this project.

Student Profile
---------------
{student_profile}

Project Idea
------------
{project_idea}

Blueprint
---------
{project_blueprint}

Progress
--------
{progress}

Generate a professional document.

""",

        expected_output="""
A complete academic document.
""",

        agent=documentation_agent

    )

    return documentation_agent, documentation_task