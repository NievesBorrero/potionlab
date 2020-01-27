FROM python:3.7

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir /code

WORKDIR /code

RUN pip install pipenv
RUN pipenv --python 3.7
ADD Pipfile /code/
RUN pipenv install --dev

COPY . /code/

EXPOSE 8000
