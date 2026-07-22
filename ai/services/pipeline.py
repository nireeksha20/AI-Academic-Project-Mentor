from ai.crew.mentor_crew import MentorCrew

crew = MentorCrew()


def run_pipeline(student_profile, project_idea):
    return crew.generate_blueprint(
        student_profile=student_profile,
        project_idea=project_idea,
    )