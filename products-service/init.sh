#!/bin/bash

# Execute Prisma migrations
sleep 45 && npx prisma migrate dev --name init

# Generate Prisma client
sleep 2 && npx prisma generate

# Build the application
sleep 2 && npm run build

# Start the application
sleep 2 && npm run start
