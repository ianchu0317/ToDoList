# Backend documentation

## Technologies used
- MySQL
- FastAPI
- Docker

## Starting the server
The server files are located in `/backend` folder. 

To start the server run:

```bash
docker compose up -d
```

## Server backend API configuration

**Installation**
Need to create virtual environment and install `fastapi` on it:

```
python -m venv .venv
source .venv/bin/activate
pip install fastapi
```

## Development changes

`Dockerfile`
Commented line is for production use.

`docker compose`
```
...
uvicorn --reload
```