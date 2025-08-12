from pydantic import BaseModel


class FilePayload(BaseModel):
    filename: str
    path: str
    full_path: str
class SummaryRequest(BaseModel):
    files: list[FilePayload]

class GenerateCodeRequest(BaseModel):
    summary:str
    file:FilePayload