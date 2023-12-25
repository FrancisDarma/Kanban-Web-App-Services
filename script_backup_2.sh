#!/bin/bash

echo "Cron job started at $(date)"

#Set lokasi penyimpanan backup
backup_dir="./backup"

#Set nama file backup dengan format YYMMDD
backup_file="$backup_dir/backup_$(date +%y%m%d).sql"

#Set informasi koneksi ke PostgreSQL
db_user="mypostgres"
db_host="my-postgres-container"
db_name="flask-app_db"
export PGPASSWORD="secretpass"

#backup dengan pg dumpall
pg_dumpall -h $db_host -U $db_user > $backup_file
unset PGPASSWORD

#periksa status backup
if [ $? -eq 0 ]; then
    echo "Backup berhasil disimpan di $backup_file"
else
    echo "Backup gagal"
fi
