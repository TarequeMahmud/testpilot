from fastapi import FastAPI

from api import github_route, test_route

app = FastAPI()

app.include_router(github_route.router)
app.include_router(test_route.router)
