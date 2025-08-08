from typing import Optional
from dotenv import load_dotenv
import os
# Load environment variables from a .env file
load_dotenv()

class Config:
    GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY")
    if GEMINI_API_KEY is None:
        raise ValueError('GEMINI_API_KEY is not set in the environment')

config = Config()
