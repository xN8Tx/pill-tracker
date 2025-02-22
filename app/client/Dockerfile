FROM node:20-alpine

WORKDIR /opt/app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
RUN yarn build

CMD [ "yarn", "preview" ]
