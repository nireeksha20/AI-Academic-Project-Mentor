from crewai import Agent, Task
from ai.config.llm import llm


def create_risk():

    risk_agent = Agent(

        role="Senior Software Risk Analyst & Academic Project Reviewer",

        goal="""
Identify every major risk that could affect the successful completion
of an academic software project and recommend practical mitigation
strategies suitable for undergraduate students.
""",

        backstory="""
You are a Senior Software Engineering Consultant with over
20 years of experience supervising AI, ML, IoT,
Cyber Security and Software Engineering projects.

You specialize in:

• Technical Risk Analysis
• Project Planning
• Software Quality Assurance
• Security Assessment
• AI Risk Management
• Deployment Planning
• Academic Project Review

You always think ahead.

Instead of only identifying risks,
you also suggest prevention,
mitigation,
backup plans,
and best practices.

Your reports resemble professional software risk assessment documents.
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

Use all previous task outputs
(Feasibility, Scope,
Technology Stack,
Timeline).

Never ask for additional information.

Generate a professional project risk assessment report.

Include ALL sections below.

# Executive Summary

## Overall Risk Level

## Technical Risks

## AI / Machine Learning Risks

## Dataset Risks

## Security Risks

## Performance Risks

## Scalability Risks

## Timeline Risks

## Team Collaboration Risks

## Deployment Risks

## Documentation Risks

## Testing Risks

## Budget Risks

## Legal & Ethical Risks

## Risk Priority Matrix

For every risk include

• Description

• Probability

• Impact

• Severity

• Prevention

• Mitigation Strategy

• Contingency Plan

Afterwards include

## Best Practices

## Preventive Measures

## Monitoring Strategy

## Final Recommendations

## Final Risk Summary
""",

        expected_output="""
A professional software project risk report containing:

• Executive Summary
• Overall Risk Level
• Technical Risks
• AI Risks
• Dataset Risks
• Security Risks
• Performance Risks
• Scalability Risks
• Timeline Risks
• Team Risks
• Deployment Risks
• Documentation Risks
• Testing Risks
• Budget Risks
• Legal Risks
• Risk Matrix
• Prevention
• Mitigation
• Contingency Plans
• Best Practices
• Monitoring Strategy
• Final Recommendations
• Final Summary
""",

        agent=risk_agent,
    )

    return risk_agent, risk_task