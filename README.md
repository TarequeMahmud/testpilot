# TestPilot

TestPilot is a full-stack project with a **FastAPI backend** and a **Next.js frontend**. It provides GitHub integration and AI-powered code/test generation services.

---

## Jira Screenshot

![JIRA Screenshot](/assets/jira.png)

## Project Structure

```
testpilot
├── backend
│   ├── api
│   │   ├── github_route.py        # GitHub API related endpoints
│   │   ├── __init__.py
│   │   └── test_route.py          # Test-related endpoints
│   ├── core
│   │   ├── config.py              # Configuration settings
│   │   ├── __init__.py
│   │   └── utils.py               # Utility functions
│   ├── main.py                    # Entry point for FastAPI app
│   ├── schemas
│   │   ├── __init__.py
│   │   └── request_models.py      # Pydantic request/response models
│   └── services
│       ├── gemini_service.py      # Gemini AI integration
│       └── github_service.py      # GitHub API service logic
└── frontend
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── next-env.d.ts
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.mjs
    ├── public
    │   └── background.png
    ├── README.md
    ├── src
    │   ├── app
    │   │   ├── favicon.ico
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   └── components
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── FindGitUser.tsx
    │       ├── ShowInList.tsx
    │       ├── showRepoContent.tsx
    │       ├── ShowTestCode.tsx
    │       ├── Spinner.tsx
    │       └── TestSummaries.tsx
    └── tsconfig.json
```

---

## Features

- **Backend (FastAPI)**:

  - GitHub API integration
  - AI code/test generation using Gemini service
  - Structured request/response schemas with Pydantic

- **Frontend (Next.js + TypeScript)**:

  - Interactive components for GitHub repository browsing
  - Test code visualization
  - Modular and reusable React components

---

## Getting Started

### Prerequisites

- Python 3.9+ (for backend)
- Node.js 18+ (for frontend)
- Git

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Frontend runs on `http://127.0.0.1:8000` by default.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000` by default.

---

## Environment Variables

Create a `.env` file in `backend/` with required secrets, for example:

```
GITHUB_TOKEN=<your_github_token>
GEMINI_API_KEY=<your_gemini_api_key>
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

MIT License
