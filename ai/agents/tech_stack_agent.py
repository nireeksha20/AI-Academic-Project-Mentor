from crewai import Agent, Task
from config.llm import llm


def create_tech_stack():

    tech_agent = Agent(

        role="Academic Technology Stack Advisor",

        goal="""
Recommend the most appropriate technology stack for an academic project
based on the student's skills, project requirements, feasibility analysis,
and defined project scope.
""",

        backstory="""
You are a Senior Software Architect and AI Technical Consultant with over
15 years of experience designing academic and industry software systems.

You have expertise in:

• Artificial Intelligence
• Machine Learning
• Data Science
• Web Development
• Mobile Development
• Cloud Computing
• Databases
• Software Engineering

You always recommend technologies that balance simplicity,
industry relevance, scalability, learning value, and project feasibility.

You never recommend unnecessary technologies.
Every recommendation is supported with logical reasoning.
""",

        verbose=True,
        allow_delegation=False,
        llm=llm,
    )

    tech_task = Task(

        description="""
You are provided with the following information.

----------------------------------------
STUDENT PROFILE
----------------------------------------

{student_profile}

----------------------------------------
PROJECT IDEA
----------------------------------------

{project_idea}

Use the previous task outputs
(Feasibility Analysis and Scope Definition)
provided in the task context.



------------------------------------------------

Recommend the best technology stack for this project.

Generate the following sections:

1. Frontend Technology
   - Technology
   - Why Recommended
   - Alternative

2. Backend Technology
   - Technology
   - Why Recommended
   - Alternative

3. Database
   - Technology
   - Why Recommended
   - Alternative

4. AI / Machine Learning Framework

5. Programming Language(s)

6. Development Environment

7. Version Control

8. Deployment Platform

9. APIs / Libraries Required

10. Folder Structure Recommendation

11. Software Requirements

12. Hardware Requirements

13. Estimated Learning Curve

14. Estimated Development Difficulty

15. Justification of the Entire Technology Stack

Choose technologies that are:

• Easy to learn
• Industry standard
• Free/Open Source
• Suitable for undergraduate students
• Compatible with each other
• Realistic for semester completion

Do not recommend unnecessary frameworks.

Provide reasoning for every recommendation.
""",

        expected_output="""
A complete technology recommendation document including:

• Frontend
• Backend
• Database
• AI Framework
• Programming Languages
• Libraries
• APIs
• Development Environment
• Deployment Platform
• Version Control
• Folder Structure
• Software Requirements
• Hardware Requirements
• Learning Curve
• Development Difficulty
• Complete Justification
""",

        agent=tech_agent,
    )

    return tech_agent, tech_task