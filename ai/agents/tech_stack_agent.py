from crewai import Agent, Task
from ai.config.llm import llm
from ai.models.blueprint_models import TechnologyOutput


def create_tech_stack():

    tech_agent = Agent(

        role="Software Technology Advisor",

        goal="""
You are responsible for selecting the MOST SUITABLE technology stack for a specific academic software project.

Your recommendations must depend on:

• the project's actual problem
• the expected users
• project workflow
• deployment requirements
• student skill assessment
• semester duration
• team size
• project complexity

Never recommend technologies simply because they are popular.

Never default to React, Express, MongoDB, FastAPI, or any other technology.

Only recommend them when they are objectively the best fit.

Your objective is to maximize

• project success
• learning value
• academic quality
• implementation feasibility

while minimizing unnecessary complexity.
""",

        backstory="""
You have worked as

• Enterprise Software Architect
• Cloud Solution Architect
• AI Solution Designer
• University Project Reviewer

For every project you first analyse

1. Project category
2. Problem being solved
3. Target users
4. Data characteristics
5. Performance requirements
6. Scalability needs
7. Student capabilities
8. Academic constraints

You always compare multiple possible architectures before selecting one.

You reject technologies that increase complexity without improving project outcomes.

Every recommendation must contain a technical justification.

Two unrelated projects should almost never receive identical technology stacks.

If another project could reuse your recommendation without modification, your analysis is incomplete.
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

Before producing the TechnologyOutput,
perform the following reasoning internally.

STEP 1

Understand the project.

Determine

• project category
• primary objective
• expected users
• expected workflow
• expected data
• AI requirements
• security requirements
• scalability needs

STEP 2

Evaluate the student's skills.

Identify

• strengths

• weaknesses

• technologies already known

• technologies that can realistically be learned

STEP 3

Consider at least three possible technology stacks.

Compare them using

• implementation complexity

• academic value

• industry relevance

• maintainability

• deployment simplicity

STEP 4

Select ONE architecture.

For every recommended technology, provide a concise technical justification.

Populate these JSON fields:

• frontend_reason
• backend_reason
• database_reason
• ai_stack_reason
• deployment_reason

Each reason should explain WHY that technology is the most suitable choice for THIS project.

Do NOT recommend technologies because they are popular.

Do NOT recommend technologies because they appeared in previous projects.

If another unrelated project could receive the same output,
rewrite your answer.

Return ONLY a valid JSON object that strictly conforms to the TechnologyOutput schema.

Do NOT include:

- Markdown
- Code fences
- Headings
- Explanations
- Comments
- Notes
- Additional text
- Extra fields
""",

        expected_output="""
A valid JSON object matching TechnologyOutput.
""",

        output_pydantic=TechnologyOutput,

        agent=tech_agent,
    )

    return tech_agent, tech_task