#!/bin/bash

service postgresql stop

export PGPASSWORD="secretpass"

psql -h my-postgres-container -p 5432 -U mypostgres -d flask-app_db -c 'DROP DATABASE IF EXISTS "flask-app_db;"'

backup_file=$(find ./backup -name "*backup*.sql" -type f -print -quit)

if [ -z "$backup_file" ]; then
  echo "File backup tidak ditemukan."
else
  psql -h my-postgres-container -p 5432 -U mypostgres -d flask-app_db < "$backup_file"
  unset PGPASSWORD
fi

service postgresql start



