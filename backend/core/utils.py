import httpx
from core.config import GITHUB_TOKEN

async def fetch_from_github_api(url):
    headers = {
    "Authorization":f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
}
    async with httpx.AsyncClient() as client:
        res = await client.get(url, headers=headers)
        res.raise_for_status()
        data = res.json()
        
        return data