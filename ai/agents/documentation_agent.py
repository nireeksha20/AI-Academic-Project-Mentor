# from crewai import Agent, Task

# from ai.config.llm import llm


# def create_documentation():

#     documentation_agent = Agent(

#         role="Academic Documentation Specialist",

#         goal="""
# Generate professional software engineering documentation derived entirely from the generated project blueprint.

# Your responsibility is not to write long reports.

# Your responsibility is to transform the approved blueprint into a complete, internally consistent university project document.

# Every section should reflect the same project.

# Avoid repetition.

# Avoid contradictions.

# Every technical decision must align with the generated

# • Feasibility

# • Scope

# • Technology

# • Timeline

# • Risk

# The final document should resemble documentation written by an experienced software engineer rather than AI-generated text.
# """,

#         backstory="""
# You are a Senior Software Documentation Architect and University Software Engineering Professor.

# You have reviewed thousands of software engineering project reports.

# Before writing documentation, you first understand

# • the project objective

# • system scope

# • technology choices

# • implementation workflow

# • project risks

# • expected deliverables

# You never invent features that are not present in the blueprint.

# You never contradict previous project decisions.

# You ensure every section naturally supports every other section.

# If another unrelated project could reuse large portions of the document, rewrite them.

# Your reports resemble professionally written IEEE-style software engineering documentation.
# """,

#         verbose=True,

#         allow_delegation=False,

#         llm=llm,

#     )



#     documentation_task = Task(

#         description="""
# Student Profile
# ---------------
# {student_profile}

# Project Idea
# ------------
# {project_idea}

# Feasibility
# -----------
# {feasibility}

# Scope
# -----
# {scope}

# Technology Stack
# ----------------
# {technology}

# Timeline
# --------
# {timeline}

# Risk Assessment
# ---------------
# {risk}

# Before writing documentation,
# perform the following reasoning internally.

# STEP 1

# Understand the complete blueprint.

# Identify

# • project objective

# • target users

# • system boundaries

# • architecture

# • implementation workflow

# • technology choices

# STEP 2

# Ensure consistency.

# Every section must agree with

# • scope

# • timeline

# • technology

# • feasibility

# • risk assessment

# STEP 3

# Write the documentation.

# Do not repeat identical information across multiple sections.

# Instead,

# expand each section with its own purpose.

# STEP 4

# Use professional software engineering language.

# Avoid

# generic AI wording,

# marketing language,

# or unnecessary filler.

# STEP 5

# Perform a uniqueness check.

# If another unrelated software project could reuse this documentation,

# rewrite it.

# Generate the following sections

# • Project Title

# • Abstract

# • Problem Statement

# • Objectives

# • Existing System

# • Proposed System

# • Scope

# • Functional Requirements

# • Non-Functional Requirements

# • Software Architecture

# • Technology Stack

# • Database Design

# • Module Description

# • API Overview

# • Implementation Methodology

# • Testing Strategy

# • Deployment Strategy

# • Risk Summary

# • Agile Sprint Summary

# • GitHub Repository Structure

# • Installation Guide

# • User Guide

# • Maintenance Guide

# • Future Enhancements

# • Conclusion

# • References

# • Appendix

# Use professional headings.

# Maintain consistency throughout the document.
# """,

#         expected_output="""
# A complete university-quality software engineering report containing

# • Cover Page

# • Project Title

# • Abstract

# • Problem Statement

# • Objectives

# • Existing System

# • Proposed System

# • Functional Requirements

# • Non-Functional Requirements

# • Scope

# • Software Architecture

# • Database Design

# • Technology Stack

# • Module Description

# • Implementation Methodology

# • API Overview

# • Testing Strategy

# • Deployment Strategy

# • Risk Summary

# • Agile Sprint Summary

# • GitHub Structure

# • Installation Guide

# • User Guide

# • Maintenance Guide

# • Future Scope

# • Conclusion

# • References

# • Appendix

# formatted professionally for academic submission.
# """,

#         agent=documentation_agent,

#     )

#     return documentation_agent, documentation_task


from crewai import Agent, Task
from ai.config.llm import llm

SECTION_MAP = {
    "synopsis": """
- Project Title
- Abstract
- Problem Statement
- Objectives
- Existing System
- Proposed System
- Scope
- Technology Stack
- Expected Outcome
""",
    "methodology": """
- Implementation Methodology
- Software Architecture
- Module Description
- Database Design
- API Overview
- Testing Strategy
- Deployment Strategy
""",
    "progress_report": """
- Reporting Period
- Work Completed
- Current Stage vs Planned Timeline
- Pending Tasks
- Blockers / Risks Encountered
- Revised Timeline (if any)
- Next Steps
""",
}

def create_documentation(doc_type="synopsis"):
    sections = SECTION_MAP.get(doc_type, SECTION_MAP["synopsis"])

    documentation_agent = Agent(
        role="Academic Documentation Specialist",
        goal=f"Generate a professional {doc_type.replace('_',' ')} document derived entirely from the project blueprint and progress data. Never invent information not present in the input.",
        backstory="""You are a Senior Software Documentation Architect...""",  # keep existing
        verbose=True,
        allow_delegation=False,
        llm=llm,
    )

    documentation_task = Task(
        description=f"""
Student Profile
---------------
{{student_profile}}

Project Blueprint
------------------
{{blueprint}}

Progress Data (only used for progress_report)
----------------------------------------------
{{progress}}

Generate ONLY the following sections, nothing else:
{sections}

Do not repeat identical content across sections. Use professional, academic tone.
""",
        expected_output=f"A complete {doc_type.replace('_',' ')} document formatted for academic submission, containing exactly the sections listed.",
        agent=documentation_agent,
    )

    return documentation_agent, documentation_task
