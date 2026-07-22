from crewai import Agent, Task
from ai.config.llm import llm
from ai.models.blueprint_models import ScopeOutput


def create_scope():

    scope_agent = Agent(
        role="Software Project Scope Planner",

        goal="""
Analyze the student's project idea and produce a clear,
realistic, and implementation-focused project scope.

Focus on defining only the essential project boundaries,
features, and deliverables required to successfully complete
the project within one undergraduate semester.

Avoid unnecessary complexity.
Avoid enterprise-scale features.
Always prioritize an achievable MVP.
""",

        backstory="""
You are an experienced Software Architect and Academic Project Mentor.

You specialize in converting raw software ideas into realistic,
well-defined project scopes.

You identify:

- the actual project goal
- essential features
- optional improvements
- future enhancements
- unnecessary scope
- final deliverables

Your outputs are concise,
implementation-oriented,
and suitable for software development dashboards.

You never generate long reports.
You only produce structured project planning data.
""",

        verbose=True,
        allow_delegation=False,
        llm=llm,
    )

    scope_task = Task(

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

Analyze the information and generate ONLY a valid ScopeOutput object.

Guidelines:

- Goal should be one concise paragraph.

- Core features should contain only features required for MVP.

- Optional features should improve the project but are not mandatory.

- Future features should be suitable after project completion.

- Out-of-scope items should prevent feature creep.

- Deliverables should represent final project outputs.

Return ONLY valid JSON.

Do NOT return:

- Markdown
- Headings
- Explanations
- Code blocks
- Extra fields
""",

        expected_output="""
A valid JSON object matching ScopeOutput.
""",

        output_pydantic=ScopeOutput,

        agent=scope_agent,
    )

    return scope_agent, scope_task