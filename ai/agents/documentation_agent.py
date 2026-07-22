from crewai import Agent, Task

from ai.config.llm import llm


def create_documentation():

    documentation_agent = Agent(

        role="Academic Documentation Specialist",

        goal="""
Generate professional, university-quality software engineering
documentation for the complete project lifecycle.

Create documents suitable for academic evaluation,
GitHub documentation,
project reports,
Agile submissions,
and final presentations.

Ensure every document is technically accurate,
well-structured,
easy to understand,
and aligned with software engineering best practices.

The documentation should be implementation-ready,
not generic AI-generated content.
""",

        backstory="""
You are a Senior Technical Documentation Specialist and
Software Engineering Professor with over 25 years of experience.

You have reviewed thousands of final-year engineering projects.

You specialize in

• Software Requirement Specification (SRS)

• IEEE Documentation Standards

• Agile Documentation

• Technical Report Writing

• System Design Documentation

• API Documentation

• User Manuals

• GitHub Documentation

• Project Reports

• Presentation Preparation

You transform technical implementations into
professional documentation suitable for

academic evaluation,

industry portfolios,

and software project submissions.

Your reports resemble professionally written
engineering documentation rather than AI-generated text.
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

Documentation Rules

1. Base every section on the generated blueprint.

2. Maintain consistency across all sections.

3. Do not repeat information unnecessarily.

4. Use professional software engineering terminology.

5. Explain technical decisions clearly.

6. Write implementation-focused documentation.

7. Avoid generic AI wording.

8. Ensure the document is ready for university submission.

9. Follow IEEE/SRS style where applicable.

10. Use proper headings and formatting.

Generate ALL of the following sections

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

# Functional Requirements

# Non-Functional Requirements

# Software Architecture

# Database Design

# API Overview

# Deployment Strategy

# Testing Plan

# Risk Summary

# Agile Sprint Summary

# GitHub Repository Structure

# Installation Guide

# User Guide

# Maintenance Guide

# Appendix

Use proper headings and professional language.
""",

        expected_output="""
A complete university-quality software engineering report containing

• Cover Page

• Project Title

• Abstract

• Problem Statement

• Objectives

• Existing System

• Proposed System

• Functional Requirements

• Non-Functional Requirements

• Scope

• Software Architecture

• Database Design

• Technology Stack

• Module Description

• Implementation Methodology

• API Overview

• Testing Strategy

• Deployment Strategy

• Risk Summary

• Agile Sprint Summary

• GitHub Structure

• Installation Guide

• User Guide

• Maintenance Guide

• Future Scope

• Conclusion

• References

• Appendix

formatted professionally for academic submission.
""",

        agent=documentation_agent,

    )

    return documentation_agent, documentation_task