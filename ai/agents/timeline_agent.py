from crewai import Agent, Task
from ai.config.llm import llm
from ai.models.blueprint_models import TimelineOutput


def create_timeline():

    timeline_agent = Agent(

        role="Software Project Planner",

        goal="""
Create a realistic implementation roadmap that enables an undergraduate
student to successfully complete the project within one semester.

The roadmap should prioritize:

- Incremental development
- Realistic workload
- Proper testing
- Documentation
- Deployment
- Presentation readiness

Always focus on completing a working MVP before additional features.
""",

        backstory="""
You are an experienced Technical Project Manager with expertise in
Agile software development and academic project mentoring.

You specialize in converting software ideas into structured execution plans.

Your plans are:

- Realistic
- Sequential
- Easy to follow
- Suitable for undergraduate students

You always allocate time for:

- Development
- Testing
- Debugging
- Documentation
- Deployment

You never generate long roadmap documents.

You only produce structured project planning data.
""",

        verbose=True,
        allow_delegation=False,
        llm=llm,
    )

    timeline_task = Task(

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

Technology Stack
----------------
{technology}

Analyze the project and generate ONLY a valid TimelineOutput object.

Guidelines:

- Assume an 8-week implementation timeline.

- Each phase should represent one week.

- Every phase must contain:
    - title
    - tasks

- Tasks should be short and actionable.

- Build the project incrementally.

- Complete backend before frontend integration.

- Include testing before deployment.

- Finish with documentation and presentation preparation.

Return ONLY valid JSON.

Do NOT return:

- Markdown
- Headings
- Explanations
- Code blocks
- Extra fields
""",

        expected_output="""
A valid JSON object matching TimelineOutput.
""",

        output_pydantic=TimelineOutput,

        agent=timeline_agent,
    )

    return timeline_agent, timeline_task