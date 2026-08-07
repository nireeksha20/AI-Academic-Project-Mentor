import sys
import os
from dotenv import load_dotenv

load_dotenv()

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi import FastAPI
from pydantic import BaseModel

from ai.crew.mentor_crew import MentorCrew
from ai.crew.mentor_chat import MentorChat
from ai.services.blueprint_service import blueprint_service

app = FastAPI(
    title="AI Academic Project Mentor API",
    version="1.0.0"
)

crew = MentorCrew()
mentor = MentorChat()


class BlueprintRequest(BaseModel):
    student_profile: str
    project_idea: str

from typing import Optional

class MentorRequest(BaseModel):
    question: str

    response_style: Optional[str] = "chat"

    student_profile: Optional[str] = ""
    project_idea: Optional[str] = ""
    project_blueprint: Optional[str] = ""
    progress: Optional[str] = ""
    duration: Optional[str] = ""
    team: Optional[str] = ""
    phase: Optional[str] = ""

    first_message: bool = False


@app.get("/")
def home():
    return {
        "status": "running",
        "message": "FastAPI is working successfully"
    }


@app.post("/generate-blueprint")
def generate_blueprint(data: BlueprintRequest):
    try:
        return crew.generate_blueprint(
            student_profile=data.student_profile,
            project_idea=data.project_idea
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise

@app.post("/mentor-chat")
def mentor_chat(data: MentorRequest):
    print("\n========== MENTOR CHAT REQUEST ==========")
    print("student_profile:")
    print(data.student_profile)

    print("\nproject_idea:")
    print(data.project_idea)

    print("\nproject_blueprint:")
    print(data.project_blueprint)

    print("\nprogress:")
    print(data.progress)

    print("\nquestion:")
    print(data.question)

    print("\nduration:")
    print(data.duration)

    print("\nteam:")
    print(data.team)

    print("\nphase:")
    print(data.phase)

    print("========================================\n")
    try:
        
        response = mentor.chat(
            student_profile=data.student_profile,
            project_idea=data.project_idea,
            project_blueprint=data.project_blueprint,
            progress=data.progress,
            question=data.question,
            duration=data.duration,
            team=data.team,
            phase=data.phase,
            response_style=data.response_style,
            first_message=data.first_message,
        )
        return {"response": response}

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise


@app.get("/blueprints")
def get_blueprints():
    return blueprint_service.get_all()


class DocumentationRequest(BaseModel):
    student_profile: str
    blueprint: str
    progress: Optional[str] = ""
    doc_type: str  # "synopsis" | "methodology" | "progress_report"

@app.post("/generate-documentation")
def generate_documentation(data: DocumentationRequest):
    try:
        content = crew.generate_documentation(
            student_profile=data.student_profile,
            blueprint=data.blueprint,
            progress=data.progress,
            doc_type=data.doc_type,
        )
        return {"content": content, "doc_type": data.doc_type}
    except Exception as e:
        import traceback; traceback.print_exc()
        raise
