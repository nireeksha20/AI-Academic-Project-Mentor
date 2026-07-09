from crewai import Agent, Task
from config.llm import llm


def create_feasibility():

    feasibility_agent = Agent(
        role="Academic Project Feasibility Expert",

        goal="""
Evaluate whether a student's project idea is realistic,
academically valuable, technically feasible,
and achievable within the given timeline.
""",

        backstory="""
You are a senior professor with 20+ years of experience supervising
engineering projects in AI, Machine Learning, Software Engineering,
Web Development, IoT, and Data Science.

You carefully evaluate every project based on:

• Technical feasibility
• Student skill level
• Innovation
• Dataset availability
• Hardware requirements
• Timeline
• Learning outcomes
• Academic value

You never give generic advice.
Every conclusion must include proper reasoning.
""",

        verbose=True,
        allow_delegation=False,
        llm=llm,
    )

    feasibility_task = Task(

        description="""Analyze the project idea and generate a structured feasibility report.

Return ONLY the following format.

## Feasibility Score
Score: X/10

## Strengths
• Point 1
• Point 2
• Point 3

## Weaknesses
• Point 1
• Point 2

## Challenges
• Point 1
• Point 2

## Required Skills
• Python
• SQL
• Machine Learning

## Overall Recommendation

Recommend whether the project should be accepted.
""",

        expected_output="""
A professional feasibility report containing:

• Feasibility Score
• Feasibility Level
• Technical Complexity
• Skill Match
• Dataset Availability
• Hardware Requirements
• Software Requirements
• Estimated Development Time
• Learning Value
• Innovation Score
• Strengths
• Weaknesses
• Risks
• Missing Skills
• Suggestions
• Final Recommendation
""",

        agent=feasibility_agent,
    )

    return feasibility_agent, feasibility_task



#         agent=feasibility_agent
#     )
