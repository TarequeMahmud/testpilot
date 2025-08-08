import json
from fastapi import APIRouter

from schemas.request_models import SummeryRequest
from services.gemini_service import call_gemini


router = APIRouter()

@router.post('/generate-test-summeries')
async def generate_test_summeries(req:SummeryRequest):
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
