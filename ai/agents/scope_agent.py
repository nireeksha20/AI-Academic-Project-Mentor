from crewai import Agent, Task
from ai.config.llm import llm


def create_scope():

    scope_agent = Agent(
        role="Senior Academic Project Scope Architect",

        goal="""
Convert a feasible project idea into a realistic, structured,
and implementation-ready project scope suitable for an
undergraduate engineering project.
""",

        backstory="""
You are a Senior Software Architect and Academic Mentor with over
20 years of experience guiding engineering capstone projects.

You specialize in:

• Software Architecture
• System Design
• Requirements Engineering
• Scope Planning
• Feature Prioritization
• MVP Definition
• Academic Project Supervision

You prevent feature creep and ensure projects remain achievable
within one academic semester.

You always design projects following software engineering best practices.
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

Use the feasibility analysis available in the task context.

Never ask the student for additional information.

Assume reasonable details wherever necessary.

Create a professional project scope document.

Include ALL of the following sections.

# Executive Summary

## Project Objective

## Problem Statement

## Target Users

## User Roles

## Functional Requirements

## Non-Functional Requirements

## System Modules

## System Workflow

## Project Architecture Overview

## MVP Features (Must Have)

## Recommended Features (Should Have)

## Advanced Features (Nice to Have)

## Future Enhancements

## Out-of-Scope Features

## Project Deliverables

## Constraints

## Assumptions

## Success Metrics

## Expected Learning Outcomes

## Expected Final Outcome

Ensure the scope is realistic, practical, and suitable for
completion within one academic semester.

Avoid unnecessary complexity.
""",

        expected_output="""
A complete professional project scope document containing:

• Executive Summary
• Project Objective
• Problem Statement
• Target Users
• User Roles
• Functional Requirements
• Non-Functional Requirements
• System Modules
• System Workflow
• Architecture Overview
• MVP Features
• Should Have Features
• Nice to Have Features
• Future Enhancements
• Out-of-Scope Features
• Deliverables
• Constraints
• Assumptions
• Success Metrics
• Learning Outcomes
• Final Expected Outcome
""",

        agent=scope_agent,
    )

    return scope_agent, scope_task