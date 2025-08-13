from ast import parse
import json

from core.utils import parse_ai_json
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
    You are an expert unit test generator. 

    Your task:
    - Generate a complete unit test based on the provided code and test case summary.
    - The test can be in any framework appropriate for the language (e.g., pytest + httpx for FastAPI, JUnit for Java, Selenium for Python automation, Jest for React, etc.).
    - The response must be **only valid JSON** in the following structure:

    {{
        "test_filename": string,  // name of the test file
        "code": string,           // full code of the test file
        "full_path": string       // full path for the test file (must be in the same folder as the original file)
    }}

    Important:
    - Do NOT include any explanations, markdown, or additional text.
    - The JSON must be fully parseable by `json.loads()`.

    Test Case Summary:
    {req.summary}

    Original Code:
    # File name: {req.file.filename}
    # Full path: {req.file.full_path}

    {file_content}
    """

    code : str = await call_gemini(prompt)
    print("Generated code:", code)
    try:
        test_case = parse_ai_json(code)
    except json.JSONDecodeError:
        test_case = {"error": "Failed to generate test code"}
    return {"test_code": test_case}