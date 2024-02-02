# Build stage
FROM node:18.0.0-alpine3.14 as builder
WORKDIR /home/doodle/client

# Add ARG for REACT_APP_SERVER_URL
ARG REACT_APP_SERVER_URL

# Set the environment variable
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18.0.0-alpine3.14
WORKDIR /home/doodle/client

# Create a non-root user for security
RUN addgroup -g 990 doodle && adduser -u 990 -G doodle -h /home/doodle -D doodle
USER doodle

# Copy built files from the builder stage
COPY --from=builder /home/doodle/client/build ./build

# Expose the port the app runs on
EXPOSE ${CLIENT_PORT}

# Start the application
CMD ["npx", "serve", "-s", "build"]
