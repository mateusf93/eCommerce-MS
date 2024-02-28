#!/bin/bash

sleep 45 && npx prisma migrate dev --name init

sleep 2 && npx prisma generate

sleep 2 && npm run build

sleep 2 && npm run start
