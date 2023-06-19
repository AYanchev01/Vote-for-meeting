#!/bin/bash

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Wait for PostgreSQL
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "db" -U "$POSTGRES_USER" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - running migrations"

# Run migrations
npx prisma migrate deploy

# Start the server
npm start