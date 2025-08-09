import json
from fastapi import APIRouter
from schemas.request_models import GenerateCodeRequest, SummaryRequest
from services.gemini_service import call_gemini


router = APIRouter()

@router.post('/generate-test-summeries')
async def generate_test_summeries(req:SummaryRequest):
    combined_text = "\n\n".join([f"# f{f.filename}\n{f.content}" for f in req.files])

    prompt = f"""
You are a software test analyst. Analyze the following code files and generate a list of test case summaries in JSON array format. Do NOT add any explanations or markdown.

Code:
{combined_text}
"""
    result: str = await call_gemini(prompt)
    try:
        summaries = json.loads(result.strip())
    except:
        summaries = [result]
    return {"summaries": summaries}




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