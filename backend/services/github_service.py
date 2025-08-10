from core.utils import fetch_from_github_api


BASE_URL = "https://api.github.com"


async def list_repos(username:str):
    url = f"{BASE_URL}/users/{username}/repos"
    data = await fetch_from_github_api(url)
    return [{"name": r["name"], "full_name":r["full_name"], "private":r["private"]} for r in data]
    

async def list_repo_file(owner:str, repo:str, path:str=""):
    url = f"{BASE_URL}/repos/{owner}/{repo}/contents/{path}"
    data = await fetch_from_github_api(url)
    
    return [
        {
            "name": item["name"],
            "path": item["path"],
            "type": item["type"] 
        }
        for item in data
    ]

