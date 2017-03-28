FROM node:7.6-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

RUN npm install --global nodemon

EXPOSE 3000

CMD [ "npm", "run", "startdev" ]