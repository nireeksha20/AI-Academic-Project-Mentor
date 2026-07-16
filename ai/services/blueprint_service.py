import json
import os
from typing import Optional

BLUEPRINT_FILE = "blueprints.json"


class BlueprintService:
    def __init__(self):
        self.blueprints = {}
        self._load()

    def _load(self):
        if os.path.exists(BLUEPRINT_FILE):
            try:
                with open(BLUEPRINT_FILE, "r", encoding="utf-8") as f:
                    self.blueprints = json.load(f)
            except Exception:
                self.blueprints = {}

    def _save(self):
        with open(BLUEPRINT_FILE, "w", encoding="utf-8") as f:
            json.dump(
                self.blueprints,
                f,
                indent=4,
                ensure_ascii=False,
            )

    def save(self, student_profile: str, blueprint: dict):
        self.blueprints[student_profile] = blueprint
        self._save()

    def get(self, student_profile: str) -> Optional[dict]:
        return self.blueprints.get(student_profile)

    def delete(self, student_profile: str):
        if student_profile in self.blueprints:
            del self.blueprints[student_profile]
            self._save()

    def get_all(self):
        return self.blueprints


blueprint_service = BlueprintService()