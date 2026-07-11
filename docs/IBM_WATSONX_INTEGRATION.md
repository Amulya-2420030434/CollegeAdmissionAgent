# Integrating IBM watsonx.ai (Granite Model)

This project is architected so that swapping the rule-based chatbot for a
real generative AI model is a small, isolated change — no frontend changes
required.

## Where to make the change

Everything lives in **`backend/rag.py`**:

- `generate_ibm_response(prompt, context)` — currently a placeholder that
  returns a labelled dummy string. This is the single function to replace.
- `retrieve_relevant_context(query)` — currently a placeholder for the
  Retrieval-Augmented Generation (RAG) step. Once admission PDFs uploaded
  via `POST /api/upload` are parsed and embedded, this function should
  perform a similarity search and return the most relevant text chunks.

## Step-by-step

1. Install the SDK:
   ```bash
   pip install ibm-watsonx-ai
   ```

2. Add credentials to `backend/.env` (copy from `.env.example`):
   ```
   WATSONX_API_KEY=your_api_key
   WATSONX_PROJECT_ID=your_project_id
   WATSONX_URL=https://us-south.ml.cloud.ibm.com
   ```

3. Update `generate_ibm_response()`:
   ```python
   import os
   from ibm_watsonx_ai import Credentials
   from ibm_watsonx_ai.foundation_models import ModelInference

   def generate_ibm_response(prompt: str, context: str = ""):
       credentials = Credentials(
           url=os.getenv("WATSONX_URL"),
           api_key=os.getenv("WATSONX_API_KEY"),
       )
       model = ModelInference(
           model_id="ibm/granite-13b-chat-v2",
           credentials=credentials,
           project_id=os.getenv("WATSONX_PROJECT_ID"),
       )
       full_prompt = f"Context:\n{context}\n\nStudent question: {prompt}\n\nAnswer:"
       result = model.generate_text(prompt=full_prompt)
       return result
   ```

4. In `routes.py`, inside the `/chat` handler, switch the reply source from
   `generate_fallback_response(user_message)` to
   `generate_ibm_response(user_message, retrieved_context)`.

5. (Optional, recommended) Build the real RAG pipeline in
   `retrieve_relevant_context()`:
   - Extract text from uploaded PDFs (e.g. `pdfplumber` or `PyPDF2`)
   - Chunk the text (e.g. 500-token chunks with overlap)
   - Generate embeddings (watsonx.ai embeddings endpoint, or
     `sentence-transformers` locally)
   - Store vectors in a vector DB (Chroma, FAISS, Milvus, or watsonx.ai's
     managed vector index)
   - On each chat request, embed the query and retrieve the top-k chunks

No other files need to change — the frontend already renders whatever
Markdown-formatted string comes back from `/api/chat`.
