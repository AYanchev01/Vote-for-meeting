# Build Stage
FROM node:18.0.0-alpine3.14 as builder

# Install PostgreSQL client and other dependencies in one layer
RUN apk add --no-cache postgresql-client \
    && npm i -g npm@8.10.0

# Set up the app directory
WORKDIR /home/doodle/server

# Copy package*.json and prisma directory
COPY ./package*.json ./
COPY ./prisma ./prisma

# Install dependencies including TypeScript
RUN npm install

# Copy the application source code
COPY ./src ./src
COPY ./nodemon.json ./nodemon.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./swagger.yaml ./swagger.yaml

# Production Stage
FROM node:18.0.0-alpine3.14

# Install PostgreSQL client
RUN apk add --no-cache postgresql-client

# Add a new group and user
RUN addgroup --gid 990 doodle \
    && adduser doodle --home /home/doodle --uid 990 --system -G doodle

# Switch to the new user
USER doodle

# Set up the app directory
WORKDIR /home/doodle/server

# Copy build artifacts from the build stage
COPY --from=builder /home/doodle/server .

# Copy the run-migrations.sh script and make it executable
COPY --chown=doodle ./run-migrations.sh ./run-migrations.sh
RUN chmod +x ./run-migrations.sh

# Expose the port the app runs on
EXPOSE ${SERVER_PORT}
