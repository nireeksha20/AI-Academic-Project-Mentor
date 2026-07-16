import os
from dotenv import load_dotenv
from crewai import LLM

load_dotenv()

llm = LLM(
    model="gemini/gemini-3.1-flash-lite",
    api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.1,
    max_tokens=1800
)

try:
    response = llm.call("Hello")
    print(response)
except Exception as e:
    import traceback
    traceback.print_exc()