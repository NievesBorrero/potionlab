# PotionLab 🧙‍♀️

This is a project to explain React-Redux in the [Sysmana 2020](https://informatica.iesgrancapitan.org/sysmanas/sysmana-xii/) to support the presentation of
"React for Muggles: Redux, Storybook and other tricks to do magic on the frontend"

## Installation

### Backend

The backend is built in **Django** and runs in **Docker**. We need to have docker (_docker-engine_) and _docker-compose_ installed

```bash
docker-compose build
```

The first time we start the project locally it will be necessary to migrate the data and create a 'superuser' to manage the Database

```bash
docker-compose run --rm backend pipenv run python manage.py migrate
docker-compose run --rm backend pipenv run python manage.py createsuperuser
```

### Frontend

The frontend is built in **React** and **Redux**, it runs in local out of the Docker container. First we need to install the necessary dependencies, so we'll need to have installed _npm_

```bash
npm install
```

## Execute

### Backend

Lift the container, it will run on port 8000
```bash
docker-compose up
```

### Frontend

Executing the command, it will raise the frontend on port 8080

```bash
npm run start
```

## Run tests

The tests are developed with **jest** in the frontend and **Django** for the backend, you can run them to check that everything is OK 👌

### Backend

```bash
docker-compose run -e DJANGO_SETTINGS_MODULE=grimoire.settings_test --rm backend pipenv run python manage.py test
```

### Frontend

```bash
npm run test
```
##  Acknowledgement

The design and graphic resources of the application have been made by [Marta Reigal](https://dribbble.com/MartaReigal)

## Storybook 📖

You can see the Storybook of this app with some components running the following command

```bash
npm run storybook
```

And accesing on port 6006

##  License

See [LICENSE](https://github.com/NievesBorrero/potionlab/blob/master/LICENSE)
