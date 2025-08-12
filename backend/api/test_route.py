import json

from services.github_service import fetch_file_content
from fastapi import APIRouter
from schemas.request_models import GenerateCodeRequest, SummaryRequest
from services.gemini_service import call_gemini


router = APIRouter(prefix="/generate", tags=["Generate Test"])

@router.post('/test-summaries')
async def generate_test_summaries(req: SummaryRequest):
    files_with_content = []

    for file in req.files:
        content_data = await fetch_file_content(file.full_path)
        if content_data:
            files_with_content.append({
                "filename": file.filename,
                "content": content_data["content"]
            })

    combined_text = "\n\n".join([f"# {f['filename']}\n{f['content']}" for f in files_with_content])

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




@router.post("/test-code")
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