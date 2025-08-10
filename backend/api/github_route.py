from fastapi import APIRouter, Query

from services.github_service import list_repo_file, list_repos


router = APIRouter(prefix="/github", tags=["GitHub"])

@router.get("/repos")

@router.get("/repos")
async def get_github_repos(username: str = Query(...)):
    return {"repos": await list_repos(username)}

@router.get('/files')
async def get_github_files(
    owner: str = Query(...),
    repo: str = Query(...),
    path: str = Query("", description="Repo subdirectory path")
):
    return await list_repo_file(owner, repo, path)
