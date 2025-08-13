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
                "content": content_data["content"],
                "full_path": file.full_path
            })

    combined_text = "\n\n".join([f"# {f['filename']}\n{f['content']}\n{f['full_path']}" for f in files_with_content])

    prompt = f"""
You are a software test analyst. Analyze the following code files and generate a list of test case summaries in JSON array format. Do NOT add any explanations or markdown. for every summary, structure should be like {{filename: string,  summary:string, full_path:string}}

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
    file_content = await fetch_file_content(req.file.full_path)
    prompt = f"""
You are a unit test generator. Based on the test case summary below and the code, generate a complete test case using pytest and httpx for FastAPI. It can be any test cases like Junit for React, selenium for python automation testing.  response structure should be {{test_filename: string,  code:string, full_path:string}}. don't wrap the object you give with anything, even not with json``````; just give as raw string. full path must be for the test file- not original file, and it should be in the folder original file resides.

Test Case Summary:
{req.summary}

Code:
#file name: {req.file.filename}
#file full path: {req.file.full_path}
{file_content}
"""
    code : str = await call_gemini(prompt)
    try:
        test_case = json.loads(code.strip())
    except json.JSONDecodeError:
        test_case = {"error": "Failed to generate test code"}
    return {"test_code": test_case}