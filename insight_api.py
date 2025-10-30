import os
import json
import requests
from fastapi import FastAPI, Query, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
SYSTEM_PROMPT = os.getenv("SYSTEM_PROMPT", "Demo prompt for GPT analytics.")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=OPENAI_API_KEY)
router = APIRouter(prefix="/usage-overlay")

@router.get("/generate_insights_from_usage")
def generate_insights_from_usage(data_url: str = Query(..., description="URL до вашего usage.json")):
    try:
        response = requests.get(data_url)
        response.raise_for_status()
        usage_data = response.json()
    except Exception as e:
        return {"error": f"❌ Не удалось получить usage.json: {e}"}
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT.strip()},
        {"role": "user", "content": json.dumps(usage_data, ensure_ascii=False)}
    ]
    try:
        chat_response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            temperature=0.3,
        )
        return chat_response.choices[0].message.content.strip()
    except Exception as e:
        return {"error": f"❌ Ошибка при обращении к OpenAI: {e}"}

app.include_router(router)
