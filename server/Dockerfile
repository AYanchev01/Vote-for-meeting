FROM node:18.0.0-alpine3.14
RUN npm i -g npm@8.10.0

RUN addgroup --gid 990 doodle
RUN adduser doodle --home /home/doodle --uid 990 --system -G doodle

USER doodle

RUN mkdir /home/doodle/server
WORKDIR /home/doodle/server
COPY --chown=doodle ./package*.json ./
COPY ./prisma prisma

RUN npm install

COPY --chown=doodle . .

RUN npx prisma migrate dev

EXPOSE 3001

CMD [ "npm", "run", "dev" ] 