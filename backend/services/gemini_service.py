from google import genai

from core import config

async def call_gemini(prompt:str) -> str:
    client = genai.Client(api_key=config.GEMINI_API_KEY)
    response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)

    return response.text or ""
