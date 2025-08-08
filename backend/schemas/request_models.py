from pydantic import BaseModel


class FilePayload(BaseModel):
    filename: str
    content: str

class SummeryRequest(FilePayload):
    files: list[FilePayload]

class GenerateCodeRequest(FilePayload):
    summery:str
    file:FilePayload