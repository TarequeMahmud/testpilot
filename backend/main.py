from fastapi import FastAPI

from api import test_code_route, test_summary_route



app = FastAPI()


app.include_router(test_summary_route.router)
app.include_router(test_code_route.router)