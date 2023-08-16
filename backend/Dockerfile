FROM  python:3.10.3-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

COPY Pipfile Pipfile.lock ./
RUN pip install -U pipenv

# Install dependencies based on environment
ARG ENVIRONMENT
RUN if [ "$ENVIRONMENT" = "dev" ]; then pipenv install --dev --system; else pipenv install --system; fi

# copy from the current directory of the Dockerfile to /api in the image
COPY . .

EXPOSE 8000
