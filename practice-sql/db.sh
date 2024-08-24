#!/usr/bin/env bash
# DATABASE_URL=postgres://user:password@localhost:5432/db
docker run \
  -p "5432:5432" \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_USER=user \
  -e POSTGRES_DATABASE=db \
  postgres:16.4-alpine3.20

