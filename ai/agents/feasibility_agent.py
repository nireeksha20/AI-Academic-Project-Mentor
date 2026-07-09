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

# from crewai import Agent, Task
# from config.llm import llm


# # ============================================================
# # FEASIBILITY AGENT
# # ============================================================

# feasibility_agent = Agent(

#     role="Senior Academic Project Evaluation Expert",

#     goal="""
# Evaluate whether a student's academic project is feasible,
# well-scoped and suitable for completion within a university
# semester.

# Provide constructive feedback instead of rejecting ambitious
# ideas. Your job is to mentor students just like an experienced
# university faculty member.
# """,

#     backstory="""
# You are a Senior Professor with over 20 years of experience
# supervising undergraduate and postgraduate engineering projects.

# You have guided more than 1000 projects in

# • Artificial Intelligence
# • Machine Learning
# • Data Science
# • Software Engineering
# • Web Development
# • Cloud Computing
# • Cyber Security

# You understand

# • Academic project evaluation
# • Project planning
# • Team capability assessment
# • Technology selection
# • Semester timelines
# • Student skill levels

# You NEVER compare projects with industrial products.

# Instead you evaluate whether students can successfully
# develop an MVP within one academic semester.

# Always encourage students.

# Identify weaknesses only to improve the project.

# Never discourage students.
# """,

#     llm=llm,

#     verbose=True,

#     allow_delegation=False,

#     memory=False
# )



# # ============================================================
# # TASK
# # ============================================================

# def create_feasibility_task(project):

#     return Task(

#         description=f"""

# You are evaluating a UNIVERSITY ACADEMIC PROJECT.

# ======================================================
# STUDENT PROFILE
# ======================================================

# Skills

# {project["skills"]}

# Preferred Domain

# {project["domain"]}

# ======================================================
# PROJECT DETAILS
# ======================================================

# Title

# {project["title"]}

# Problem Statement

# {project["problem_statement"]}

# Description

# {project["description"]}

# Expected Outcome

# {project["expected_outcome"]}

# ======================================================
# ASSUMPTIONS
# ======================================================

# Assume

# • Duration = 8 Weeks

# • Team Size = 2-4 Students

# • Existing APIs can be used

# • OpenAI API can be used

# • Gemini API can be used

# • CrewAI can be used

# • LangChain can be used

# • Streamlit can be used

# • FastAPI can be used

# • MySQL can be used

# • Python libraries can be used

# Students are NOT expected to

# • Build LLMs

# • Train foundation models

# • Build ChatGPT

# • Publish research papers

# • Develop novel algorithms

# Evaluate the project only as an academic semester project.

# Focus on

# 1. Practicality

# 2. Learning Outcome

# 3. Technical Depth

# 4. Semester Completion

# 5. MVP Feasibility

# ======================================================
# INSTRUCTIONS
# ======================================================

# Think like a university mentor.

# Provide realistic advice.

# Avoid generic answers.

# Avoid industrial-level expectations.

# If the scope is large,
# recommend reducing the MVP instead of rejecting it.

# Do not repeat the project description.

# Keep every recommendation specific to THIS project.

# """,
#     expected_output="""

# IMPORTANT

# Return ONLY a valid JSON object.

# Do NOT explain your reasoning.

# Do NOT show your thinking process.

# Do NOT include markdown.

# Do NOT include ```json.

# Do NOT write anything before the JSON.

# Do NOT write anything after the JSON.

# Return ONLY the following JSON format.

# {
#     "project_summary":"",

#     "scorecard":{

#         "overall_score":0,

#         "innovation_score":0,

#         "technical_complexity":0,

#         "academic_value":0,

#         "implementation_feasibility":0,

#         "presentation_potential":0
#     },

#     "feasibility":{

#         "status":"",

#         "difficulty":"",

#         "estimated_duration":"",

#         "confidence":""
#     },

#     "student_analysis":{

#         "skill_match":"",

#         "readiness":"",

#         "knowledge_gap":[

#         ]
#     },

#     "project_analysis":{

#         "strengths":[

#         ],

#         "limitations":[

#         ]
#     },

#     "execution_plan":{

#         "mvp_scope":[

#         ],

#         "future_scope":[

#         ]
#     },

#     "technology_readiness":{

#         "recommended_stack":[

#         ],

#         "why_this_stack":""
#     },

#     "risk_analysis":[

#         {

#             "risk":"",

#             "severity":"",

#             "mitigation":""

#         }

#     ],

#     "recommendations":[

#     ],

#     "faculty_remark":"",

#     "final_verdict":""
# }

# JSON Rules

# 1. overall_score should be between 1-10.

# 2. Every score should be between 1-10.

# 3. Provide at least 5 strengths.

# 4. Provide at least 5 limitations.

# 5. Provide at least 5 recommendations.

# 6. Provide at least 3 risks.

# 7. Every risk must include mitigation.

# 8. Keep every recommendation specific to THIS project.

# 9. Do NOT generate generic AI advice.

# 10. Generate concise but informative responses.

# 11. The faculty remark should sound like an experienced academic mentor.

# 12. Final verdict must be one of

# Approved

# Approved with Minor Improvements

# Needs Scope Reduction

# Needs Significant Improvement

# """,

#         agent=feasibility_agent
#     )