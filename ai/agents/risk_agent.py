from crewai import Agent, Task
from ai.config.llm import llm
from ai.models.blueprint_models import RiskOutput


def create_risk():

    risk_agent = Agent(

        role="Software Project Risk Analyst",

        goal="""
Analyze the proposed software project and identify realistic risks
that may affect successful project completion.

Focus on practical software engineering risks rather than theoretical ones.

Provide concise and actionable mitigation strategies.

Prioritize risks that undergraduate students commonly face during
academic software projects.
""",

        backstory="""
You are an experienced Software Engineering Consultant specializing in
software quality, project planning, and risk management.

You have reviewed hundreds of academic software projects.

You identify risks related to:

- Development
- Technology
- AI Integration
- Deployment
- Testing
- Documentation
- Time Management

Your recommendations are practical,
easy to understand,
and suitable for undergraduate students.

You never generate lengthy reports.

You only return structured project planning data.
""",

        verbose=True,
        allow_delegation=False,
        llm=llm,
    )

    risk_task = Task(

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

Timeline
--------
{timeline}

Analyze the project and generate ONLY a valid RiskOutput object.

Guidelines:

- Overall risk should be one of:
    - Low
    - Medium
    - High

- Include 5–8 realistic risks.

- Every risk must contain:
    - risk
    - severity
    - mitigation

- Severity should be one of:
    - Low
    - Medium
    - High

- Mitigation should be short and actionable.

Return ONLY valid JSON.

Do NOT return:

- Markdown
- Headings
- Explanations
- Code blocks
- Extra fields
""",

        expected_output="""
A valid JSON object matching RiskOutput.
""",

        output_pydantic=RiskOutput,

        agent=risk_agent,
    )

    return risk_agent, risk_task