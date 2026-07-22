from crewai import Agent, Task
from ai.config.llm import llm
from ai.models.blueprint_models import TechnologyOutput


def create_tech_stack():

    tech_agent = Agent(

        role="Software Technology Advisor",

        goal="""
Recommend a practical and modern technology stack that matches
the student's project requirements, skill level, semester duration,
and deployment goals.

Recommend only technologies that provide clear value.

Avoid unnecessary complexity.

Always prioritize technologies that are:

- Industry relevant
- Beginner-friendly
- Well documented
- Free or student friendly
- Suitable for one-semester implementation
""",

        backstory="""
You are an experienced Software Architect specializing in
technology selection for software projects.

You analyze project requirements and recommend technologies that
balance simplicity, maintainability, scalability, and learning value.

You recommend:

- Frontend
- Backend
- Database
- AI Framework
- Deployment
- Architecture

Every recommendation has a clear technical reason.

You never generate long reports.

You only return structured planning data.
""",

        verbose=True,
        allow_delegation=False,
        llm=llm,
    )

    tech_task = Task(

        description="""
Student Profile
---------------
{student_profile}

Project Idea
------------
{project_idea}

Feasibility
-----------
{feasibility}

Scope
-----
{scope}

Analyze the project and generate ONLY a valid TechnologyOutput object.

Guidelines:

- Frontend should contain one primary technology.

- Backend should contain one primary technology.

- Database should contain one database technology.

- AI Stack should contain the main AI framework or service.

- Deployment should contain the preferred deployment platform.

- Architecture should briefly describe the overall architecture.

- Recommendations should contain short reasons for the chosen stack.

Return ONLY valid JSON.

Do NOT return:

- Markdown
- Headings
- Explanations
- Code blocks
- Extra fields
""",

        expected_output="""
A valid JSON object matching TechnologyOutput.
""",

        output_pydantic=TechnologyOutput,

        agent=tech_agent,
    )

    return tech_agent, tech_task