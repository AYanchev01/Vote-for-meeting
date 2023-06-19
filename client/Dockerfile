FROM node:18.0.0-alpine3.14
RUN npm i -g npm@8.10.0

RUN addgroup --gid 990 doodle
RUN adduser doodle --home /home/doodle --uid 990 --system -G doodle

USER doodle

RUN mkdir /home/doodle/client
WORKDIR /home/doodle/client
COPY --chown=doodle ./package*.json ./

RUN npm install

COPY --chown=doodle . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]