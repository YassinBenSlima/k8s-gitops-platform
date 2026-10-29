from fastapi import FastAPI

app = FastAPI(
    title="Taskboard API",
    description="Backend API for the Kubernetes GitOps Platform",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "Welcome to Taskboard API",
        "status": "running",
    }


@app.get("/health")
def health():
    return {"status": "healthy"}
