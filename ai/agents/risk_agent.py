from crewai import Agent, Task
from config.llm import llm


def create_risk():

    risk_agent = Agent(

        role="Academic Project Risk Assessment Expert",

        goal="""
Identify potential risks that may affect the successful completion
of an academic project and recommend practical mitigation strategies.
""",

        backstory="""
You are an experienced Software Engineering Consultant and Academic
Project Reviewer with more than 20 years of experience supervising
engineering projects.

You specialize in:

• Risk Identification
• Software Project Management
• AI & ML Projects
• Timeline Management
• Resource Planning
• Technical Troubleshooting

You analyze projects from multiple perspectives including
technical feasibility, resource availability, student skills,
project planning, testing, deployment, and documentation.

Your recommendations are practical, preventive, and suitable
for undergraduate engineering students.
""",

        verbose=True,
        allow_delegation=False,
        llm=llm,
    )

    risk_task = Task(

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

Use all previous task outputs available in the task context.

------------------------------------------------

Perform a comprehensive project risk analysis.

Include the following sections:

1. Overall Risk Level

2. Technical Risks

3. Resource Risks

4. Timeline Risks

5. Team Collaboration Risks

6. Dataset Risks

7. AI/LLM Risks

8. Security Risks

9. Performance Risks

10. Deployment Risks

11. Documentation Risks

12. Testing Risks

13. Risk Priority Matrix
   (High / Medium / Low)

14. Mitigation Strategy for each risk

15. Preventive Measures

16. Contingency Plan

17. Best Practices

18. Final Risk Summary

For every risk provide:

• Description
• Impact
• Probability
• Severity
• Mitigation
• Backup Plan

Use proper headings and bullet points.
""",

        expected_output="""
A complete project risk assessment report including:

• Overall Risk Level
• Technical Risks
• Timeline Risks
• Resource Risks
• Dataset Risks
• AI Risks
• Security Risks
• Performance Risks
• Testing Risks
• Documentation Risks
• Risk Matrix
• Mitigation Strategies
• Preventive Measures
• Contingency Plans
• Best Practices
• Final Summary
""",

        agent=risk_agent,
    )

    return risk_agent, risk_task