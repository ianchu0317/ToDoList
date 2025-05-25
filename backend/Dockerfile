FROM python:3.12-slim
# FROM python:3.12-alpine

WORKDIR /app

COPY api/ /app/

RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--reload-dir", "/app"]
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
