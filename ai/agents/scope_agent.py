from crewai import Agent, Task
from config.llm import llm


def create_scope():

    scope_agent = Agent(
        role="Academic Project Scope Architect",

        goal="""
Transform a feasible project idea into a clear, realistic, and
well-defined project scope that undergraduate students can complete
within an academic semester.
""",

        backstory="""
You are an experienced Software Architect and Academic Mentor who has
guided hundreds of engineering students in planning successful projects.

You specialize in:

• Breaking projects into manageable modules
• Identifying core and optional features
• Preventing feature creep
• Defining clear project boundaries
• Creating realistic deliverables
• Ensuring projects remain achievable within limited time

You always prioritize simplicity, practicality, and academic value.
Your recommendations are realistic and suitable for undergraduate teams.
""",

        verbose=True,
        allow_delegation=False,
        llm=llm,
    )

    scope_task = Task(

        description="""
You are given the following information.

----------------------------------------
STUDENT PROFILE
----------------------------------------

{student_profile}

----------------------------------------
PROJECT IDEA
----------------------------------------

{project_idea}
----------------------------------------
Use the previous task output (Feasibility Analysis)
provided in the task context while defining the scope.
----------------------------------------
------------------------------------------------

Your task is to define a realistic project scope.

Generate the following sections:

1. Project Objective

2. Problem Statement

3. Functional Requirements

4. Non-Functional Requirements

5. Project Modules

6. Must-Have Features

7. Should-Have Features

8. Nice-to-Have Features

9. Out of Scope Features

10. Project Deliverables

11. Constraints

12. Assumptions

13. Success Criteria

14. Expected Final Outcome

Ensure the scope is achievable within one academic semester.

Avoid unnecessary complexity and feature creep.

Explain each section clearly using headings and bullet points.
""",

        expected_output="""
A professional project scope document containing:

• Project Objective
• Problem Statement
• Functional Requirements
• Non-Functional Requirements
• Project Modules
• Must-Have Features
• Should-Have Features
• Nice-to-Have Features
• Out-of-Scope Features
• Deliverables
• Constraints
• Assumptions
• Success Criteria
• Expected Final Outcome
""",

        agent=scope_agent,
    )

    return scope_agent, scope_task