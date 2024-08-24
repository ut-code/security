#!/usr/bin/env bash
docker run \
  -p "5432:5432" \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_USER=usr \
  -e POSTGRES_DATABASE=db \
  postgres:16.4-alpine3.20

