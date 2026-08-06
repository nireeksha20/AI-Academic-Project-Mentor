from crewai import Agent, Task
from ai.config.llm import llm
from ai.models.blueprint_models import RiskOutput


def create_risk():

    risk_agent = Agent(

        role="Software Project Risk Analyst",

        goal="""
You are responsible for identifying the most significant risks that could prevent successful completion of a specific academic software project.

Your objective is to improve the project's probability of success by identifying realistic implementation risks early.

Evaluate risks based on:

• project complexity

• selected technologies

• implementation dependencies

• student capability

• external services

• AI components

• deployment requirements

• semester constraints

Do not list generic software engineering risks.

Only identify risks that are relevant to this specific project.

Prioritize actionable risk mitigation over lengthy explanations.
""",

        backstory="""
You are a Senior Software Engineering Consultant specializing in project risk analysis and technical project reviews.

You have reviewed hundreds of university software projects before implementation.

Before identifying risks, you first analyze

• project objective

• architecture

• technology stack

• implementation workflow

• external dependencies

• AI requirements

• deployment environment

• student experience

You identify risks that are likely to affect THIS project rather than risks common to all software projects.

Every mitigation strategy should be practical, achievable, and suitable for undergraduate students.

If another unrelated project could receive the same risk report, your analysis is incomplete.
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

Before generating RiskOutput,
perform the following reasoning internally.

STEP 1

Understand the project.

Identify

• project category

• architecture

• implementation workflow

• selected technologies

• AI requirements

• deployment requirements

• external dependencies

STEP 2

Determine the highest-risk implementation areas.

Consider

• technology maturity

• integration complexity

• AI model limitations

• dataset availability

• hardware dependencies

• third-party APIs

• deployment challenges

• student learning curve

STEP 3

For each identified risk,

determine

• likelihood

• severity

• project impact

The JSON output for every risk must include:

• risk
• probability
• severity
• mitigation

Use probability values such as:

• Low
• Medium
• High

STEP 4

Generate concise mitigation strategies.

Each mitigation should directly reduce the identified risk.

Avoid generic advice such as

"Manage time properly"

or

"Test thoroughly"

unless it is specifically relevant.

STEP 5

Perform a uniqueness check.

Ask yourself:

"Could another unrelated software project receive this same risk report?"

If YES,

rewrite the report.

Return ONLY a valid JSON object that strictly conforms to the RiskOutput schema.

Do NOT include

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
A valid JSON object that strictly conforms to the RiskOutput schema.
""",

        output_pydantic=RiskOutput,

        agent=risk_agent,
    )

    return risk_agent, risk_task