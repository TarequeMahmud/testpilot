
from fastapi import APIRouter

from schemas.request_models import GenerateCodeRequest
from services.gemini_service import call_gemini


router = APIRouter()

@router.post("/generate-test-code")
async def generate_test_code(req:GenerateCodeRequest):
    prompt = f"""
You are a unit test generator. Based on the test case summary below and the code, generate a complete test case using pytest and httpx for FastAPI.

Test Case Summary:
{req.summary}

Code:
#{req.file.filename}
{req.file.content}
"""
    code : str = await call_gemini(prompt)
    return {"test_code": code}