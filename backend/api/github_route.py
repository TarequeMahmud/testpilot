from fastapi import APIRouter, Query

from services.github_service import list_repos


router = APIRouter(prefix="/github", tags=["GitHub"])

@router.get("/repos")

@router.get("/repos")
async def get_github_repos(username: str = Query(...)):
    return {"repos": await list_repos(username)}
