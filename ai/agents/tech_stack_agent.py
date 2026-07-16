from crewai import Agent, Task
from ai.config.llm import llm


def create_tech_stack():

    tech_agent = Agent(

        role="Senior Software Architect & Technology Stack Advisor",

        goal="""
Recommend the most suitable technology stack for an academic project
based on the student's skills, project scope, feasibility,
industry relevance, scalability, and semester constraints.
""",

        backstory="""
You are a Senior Software Architect with 20+ years of experience
designing enterprise software and mentoring engineering students.

You have expertise in:

• Artificial Intelligence
• Machine Learning
• Software Engineering
• Full Stack Development
• Cloud Computing
• Databases
• DevOps
• Mobile Development

You recommend only practical, free, industry-standard technologies.

You always justify WHY a technology is selected and compare it with alternatives.

You avoid unnecessary complexity while maximizing learning value.
""",

        verbose=True,
        allow_delegation=False,
        llm=llm,
    )

    tech_task = Task(

        description="""
Student Profile
---------------
{student_profile}

Project Idea
------------
{project_idea}

Use previous task outputs
(Feasibility + Scope).

Never ask for additional information.

Recommend a complete technology stack.

Generate ALL sections below.

# Executive Summary

## Recommended System Architecture

## Frontend
- Recommended Technology
- Why
- Alternative

## Backend
- Recommended Technology
- Why
- Alternative

## Database
- Recommended Technology
- Why
- Alternative

## AI / Machine Learning Framework

## Programming Languages

## APIs & SDKs

## Libraries Required

## Development Environment

## Version Control

## Deployment Platform

## CI/CD Recommendation

## Security Considerations

## Folder Structure Recommendation

## Software Requirements

## Hardware Requirements

## Estimated Learning Curve

## Development Difficulty

## Scalability Analysis

## Performance Considerations

## Estimated Deployment Cost

## Technology Comparison Summary

## Final Recommendation

Only recommend free or student-friendly technologies.
Explain every recommendation clearly.
""",

        expected_output="""
A professional technology recommendation report including:

• Executive Summary
• System Architecture
• Frontend
• Backend
• Database
• AI Framework
• Programming Languages
• APIs
• Libraries
• Development Environment
• Version Control
• Deployment
• CI/CD
• Security
• Folder Structure
• Software Requirements
• Hardware Requirements
• Learning Curve
• Development Difficulty
• Scalability
• Performance
• Deployment Cost
• Technology Comparison
• Final Recommendation
""",

        agent=tech_agent,
    )

    return tech_agent, tech_task