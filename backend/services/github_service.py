from core.utils import fetch_from_github_api
import base64

BASE_URL = "https://api.github.com"


async def list_repos(username:str):
    url = f"{BASE_URL}/users/{username}/repos"
    data = await fetch_from_github_api(url)
    return [{"name": r["name"], "full_name":r["full_name"], "private":r["private"]} for r in data]

async def fetch_file_content(full_path: str):
    parts = full_path.split("/", 2)
    if len(parts) < 3:
        return None

    owner, repo, path = parts[0], parts[1], parts[2]

    url = f"{BASE_URL}/repos/{owner}/{repo}/contents/{path}"
    data = await fetch_from_github_api(url)

    if "content" not in data:
        return None

    content = base64.b64decode(data["content"]).decode("utf-8")

    return {
        "name": data["name"],
        "path": data["path"],
        "content": content,
    }


async def list_repo_file(owner:str, repo:str, path:str=""):
    url = f"{BASE_URL}/repos/{owner}/{repo}/contents/{path}"
    data = await fetch_from_github_api(url)
    
    files = []
    for item in data:
        if item["type"] == "file":
            files.append({
                "name": item["name"],
                "path": item["path"],
                "full_path": f"{owner}/{repo}/{item['path']}",
                "type": "file"
            })
        elif item["type"] == "dir":
            sub_files = await list_repo_file(owner, repo, item["path"])
            files.append({
                "name": item["name"],
                "path": item["path"],
                "type": "dir",
                "children": sub_files
            })
    return files

