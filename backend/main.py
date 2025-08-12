from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import github_route, test_route

app = FastAPI()

origins = [
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],   
    allow_headers=["*"],
)

app.include_router(github_route.router)
app.include_router(test_route.router)
