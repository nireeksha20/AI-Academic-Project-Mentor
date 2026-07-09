from crewai import Agent, Task
from config.llm import llm


def create_timeline():

    timeline_agent = Agent(

        role="Academic Project Planning Expert",

        goal="""
Create a realistic and optimized week-by-week execution plan
for an academic project based on the student's profile,
project feasibility, scope, and recommended technology stack.
""",

        backstory="""
You are an experienced Engineering Project Coordinator and
Software Project Manager with over 20 years of experience
planning undergraduate and postgraduate academic projects.

You specialize in:

• Project Planning
• Agile Development
• Software Engineering
• Milestone Planning
• Time Estimation
• Resource Allocation
• Risk-aware Scheduling

You always create practical plans that students can
successfully complete within an academic semester.

You consider task dependencies, student skill level,
project complexity, testing, documentation, and final presentation.

Avoid unrealistic timelines and ensure every milestone
contributes toward successful project completion.
""",

        verbose=True,
        allow_delegation=False,
        llm=llm,
    )

    timeline_task = Task(

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


Use all previous task outputs provided in the task context.

------------------------------------------------

Create a complete project execution roadmap.

For EACH WEEK include:

• Week Number
• Objective
• Tasks to Perform
• Expected Deliverables
• Estimated Hours
• Dependencies
• Possible Challenges
• Success Criteria

After the weekly plan, include:

1. Overall Project Timeline

2. Critical Path

3. High Priority Tasks

4. Medium Priority Tasks

5. Low Priority Tasks

6. Testing Strategy

7. Documentation Schedule

8. Buffer Week Recommendation

9. Final Demonstration Checklist

10. Overall Project Completion Strategy

Ensure the plan is realistic and achievable
for undergraduate students.

Use headings, bullet points, and tables where appropriate.
""",

        expected_output="""
A comprehensive project execution roadmap containing:

• Week-by-week execution plan
• Deliverables
• Estimated hours
• Task dependencies
• Challenges
• Success criteria
• Priority matrix
• Critical path
• Testing strategy
• Documentation plan
• Buffer schedule
• Final demonstration checklist
• Completion strategy
""",

        agent=timeline_agent,
    )

    return timeline_agent, timeline_task