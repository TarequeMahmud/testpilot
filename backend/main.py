from fastapi import FastAPI

from api import route_test_summery

app = FastAPI()


app.include_router(route_test_summery.router)