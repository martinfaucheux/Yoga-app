FROM  python:3.10.3-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

COPY Pipfile Pipfile.lock ./
RUN pip install -U pipenv
RUN pipenv install --system

# copy from the current directory of the Dockerfile to /api in the image
COPY . .

EXPOSE 8000
