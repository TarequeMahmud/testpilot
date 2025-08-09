from typing import Optional
from dotenv import load_dotenv
import os

load_dotenv()


GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY")
GITHUB_TOKEN: Optional[str] = os.getenv("GITHUB_TOKEN")
if GEMINI_API_KEY is None or GITHUB_TOKEN is None:
    raise ValueError('Necessary API key is not set in the environment')
