# Local Docker Infrastructure

This directory contains the local PostgreSQL and Redis infrastructure used by the Hotel Booking System.

## Start containers

```bash
docker compose --env-file infra/docker/.env -f infra/docker/compose.local.yaml up -d