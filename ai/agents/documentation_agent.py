from crewai import Agent, Task

from ai.config.llm import llm


def create_documentation():

    documentation_agent = Agent(

        role="Academic Documentation Specialist",

        goal="""
Generate complete academic project documents including
Synopsis,
Abstract,
Methodology,
Architecture,
Weekly Reports,
Progress Reports,
Final Report,
Presentation Notes
and Technical Documentation.
""",

        backstory="""
You are an experienced Academic Project Documentation Expert.

You have supervised thousands of engineering projects.

You know IEEE documentation standards,
university report structures,
software engineering documentation,
and project report writing.

You convert technical information into professional
college-ready documentation.

Every document should be well structured,
easy to understand,
and plagiarism free.

Never generate incomplete reports.
""",

        verbose=True,

        allow_delegation=False,

        llm=llm,

    )



    documentation_task = Task(

        description="""
Student Profile
---------------
{student_profile}

Project Idea
------------
{project_idea}

Feasibility Report
------------------
{feasibility}

Scope Report
------------
{scope}

Technology Stack
----------------
{technology}

Timeline
--------
{timeline}

Risk Report
-----------
{risk}

Generate professional academic documentation.

Include

# Project Title

# Abstract

# Problem Statement

# Objectives

# Existing System

# Proposed System

# Scope

# Architecture Overview

# Technology Stack

# Module Description

# Implementation Methodology

# Testing Strategy

# Future Enhancements

# Conclusion

# References

Use proper headings and professional language.
""",

        expected_output="""
A professional academic project report containing

• Title

• Abstract

• Problem Statement

• Objectives

• Existing System

• Proposed System

• Scope

• Architecture

• Module Description

• Methodology

• Testing

• Future Scope

• Conclusion

• References

formatted using proper report structure.
""",

        agent=documentation_agent,

    )

    return documentation_agent, documentation_task