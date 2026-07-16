import sys
import os

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

class MentorRequest(BaseModel):
    student_profile: str
    project_idea: str
    progress: str
    question: str


@app.get("/")
def home():
    return {
        "status": "running",
        "message": "FastAPI is working successfully"
    }


@app.post("/generate-blueprint")
def generate_blueprint(data: BlueprintRequest):

    result = crew.generate_blueprint(
        student_profile=data.student_profile,
        project_idea=data.project_idea
    )

    return result

@app.post("/mentor-chat")
def mentor_chat(data: MentorRequest):

    response = mentor.chat(
        student_profile=data.student_profile,
        project_idea=data.project_idea,
        progress=data.progress,
        question=data.question,
    )

    return {
        "response": response
    }


@app.get("/blueprints")
def get_blueprints():
    return blueprint_service.get_all()