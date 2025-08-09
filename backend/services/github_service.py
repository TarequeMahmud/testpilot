import httpx
from core.config import GITHUB_TOKEN


BASE_URL = "https://api.github.com"

async def list_repos(username:str):
    url = f"{BASE_URL}/users/{username}/repos"
    headers = {
        "Authorization":f"token {GITHUB_TOKEN}",
         "Accept": "application/vnd.github.v3+json"
    }
    async with httpx.AsyncClient() as client:
        res = await client.get(url, headers=headers)
        data = res.json()
        return [{"name": r["name"], "full_name":r["full_name"], "private":r["private"]} for r in data]