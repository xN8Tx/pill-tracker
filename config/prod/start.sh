#! /bin/bash

docker stop pill-table-strapi-prod pill-table-client-prod
docker rm pill-table-strapi-prod pill-table-client-prod

docker-compose -f ./prod/strapi/docker-compose.yaml up --build -d
docker-compose -f ./client/docker-compose.yaml up --build -d


