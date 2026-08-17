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
1. Project Title
2. Abstract
3. Introduction
4. Problem Statement
5. Objectives
6. Existing System
7. Limitations of Existing System
8. Proposed System
9. Key Features
10. Scope of the Project
11. Functional Requirements
12. Non-Functional Requirements
13. Technology Stack
14. System Architecture
15. Expected Outcome
16. Conclusion
""",

    "methodology": """
1. Implementation Methodology
2. Development Approach
3. System Architecture
4. Module Description
5. Data Acquisition and Preprocessing
6. Model Development and Transfer Learning
7. Model Training and Evaluation
8. Database Design
9. API Design
10. Frontend Implementation
11. Backend Implementation
12. System Integration
13. Testing Strategy
14. Deployment Strategy
15. Security and Reliability Considerations
16. Risk Mitigation
17. Conclusion
""",

    "progress_report": """
1. Reporting Period
2. Project Status
3. Work Completed
4. Features and Components Implemented
5. Current Stage vs Planned Timeline
6. Progress Metrics
7. Pending Tasks
8. Blockers and Challenges
9. Risks Encountered
10. Solutions and Mitigation
11. Revised Timeline
12. Next Steps
13. Conclusion
"""
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
You are generating an academic software engineering document for a university project.

DOCUMENT TYPE:
{doc_type.replace("_", " ").title()}

========================
STUDENT PROFILE
========================
{{student_profile}}

========================
PROJECT BLUEPRINT
========================
{{blueprint}}

========================
PROJECT PROGRESS
========================
{{progress}}

========================
DOCUMENT SECTIONS
========================
{sections}

========================
WRITING REQUIREMENTS
========================

1. Generate content specifically for THIS project.

2. Use the project blueprint as the primary source of truth.

3. Never invent:
   - technologies
   - features
   - datasets
   - APIs
   - modules
   - achievements
   - implementation results
   - accuracy values
   - deployment status
   - completed work

4. If something has not yet been implemented, describe it as planned,
   proposed, pending, or future work rather than claiming it is complete.

5. Maintain complete consistency with:
   - project scope
   - technology stack
   - architecture
   - timeline
   - risks
   - current progress

6. Do not copy the same paragraph into multiple sections.

7. Each section must have a distinct purpose.

8. Use detailed academic paragraphs rather than extremely short descriptions.

9. Use bullet lists only when they improve readability, such as:
   - objectives
   - requirements
   - features
   - technologies
   - risks
   - tasks

10. Do not use Markdown formatting.

11. NEVER use:
   **bold**
   *italic*
   ### headings
   ```code blocks```

12. Output plain structured text using section headings.

13. Do not add an artificial title such as:
   "Academic Project Documentation"

14. Do not add a cover page.
   The application will create the cover page separately.

15. Do not include commentary about being an AI.

16. Do not include phrases such as:
   "This document provides..."
   "As an AI..."
   "According to the provided information..."

17. Write as if the document was prepared by the student for formal university submission.

18. Use technically precise software engineering terminology.

19. For the synopsis, emphasize:
   - problem
   - motivation
   - objectives
   - proposed solution
   - scope
   - requirements
   - technology
   - expected outcome

20. For the methodology, explain HOW the system will be developed.
   Connect the methodology to the actual architecture and technology stack.

21. For the progress report, use ONLY the supplied progress data
   when describing completed work.

22. For the progress report, distinguish clearly between:
   - completed
   - currently in progress
   - pending
   - blocked
   - planned

23. Do not claim model accuracy unless an actual measured value is supplied.

24. Do not claim successful deployment unless deployment is explicitly
   present in the supplied progress information.

25. Do not claim database implementation unless it is explicitly present
   in the supplied progress information.

Generate ONLY the requested document content.
""",

    expected_output=f"""
A detailed, professional university-level {doc_type.replace("_", " ")}
document containing all requested sections.

The content must be project-specific, internally consistent,
technically accurate, and suitable for conversion into a DOCX
academic submission.

Do not use Markdown syntax or artificial document titles.
""",

    agent=documentation_agent,
)

    return documentation_agent, documentation_task
