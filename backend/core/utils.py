import httpx
import json
import re
from fastapi import HTTPException
from core.config import GITHUB_TOKEN

async def fetch_from_github_api(url):
    headers = {
    "Authorization":f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
}
    async with httpx.AsyncClient() as client:
        res = await client.get(url, headers=headers)
        res.raise_for_status()
        data = res.json()
        
        return data
    

def parse_ai_json(raw_output: str):
    if not raw_output or not raw_output.strip():
        raise ValueError("AI returned empty output")
    
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw_output.strip(), flags=re.MULTILINE)
    
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as e:
        print("Failed to parse JSON:", repr(cleaned))
        raise HTTPException(status_code=500, detail="Invalid JSON returned by AI") from e