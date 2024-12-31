from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from llm_manager import LLMManager

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific frontend URL(s) in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize LLM Manager
model_name = "meta-llama/Meta-Llama-3.1-8B"
llm_manager = LLMManager(model_name)

@app.post("/chat/")
async def chat_endpoint(data: dict):
    message = data.get("text", "")
    if not message:
        raise HTTPException(status_code=400, detail="Message text is required")

    try:
        response_text = llm_manager.generate_response(message)
        return {"text": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
