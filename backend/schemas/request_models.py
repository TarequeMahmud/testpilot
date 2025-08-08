from pydantic import BaseModel


class FilePayload(BaseModel):
    filename: str
    content: str

class SummeryRequest(BaseModel):
    files: list[FilePayload]

class GenerateCodeRequest(FilePayload):
    summery:str
    file:FilePayload