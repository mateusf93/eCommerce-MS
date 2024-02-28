#!/bin/bash


sleep 10 && npx prisma migrate deploy


npx prisma generate


npm run build


npm run start
