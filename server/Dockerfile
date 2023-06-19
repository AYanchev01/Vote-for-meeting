FROM node:18.0.0-alpine3.14

RUN npm i -g npm@8.10.0

# Install PostgreSQL client
USER root
RUN apk add --no-cache postgresql-client

# Add a new group and user
RUN addgroup --gid 990 doodle
RUN adduser doodle --home /home/doodle --uid 990 --system -G doodle

# Switch to the new user
USER doodle

# Set up the app directory
RUN mkdir /home/doodle/server
WORKDIR /home/doodle/server

# Copy package*.json and prisma directory
COPY --chown=doodle ./package*.json ./
COPY --chown=doodle ./prisma ./prisma

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY --chown=doodle . .

# Copy the run-migrations.sh script
COPY --chown=doodle ./run-migrations.sh ./run-migrations.sh

# Make the script executable
USER root
RUN chmod +x ./run-migrations.sh
USER doodle

# Expose the port the app runs on
EXPOSE 3001
