## Docker Services for Kanban Web App

This is the implementation of Docker Container system in Kanban Based Web App Services deployment.

The Kanban Web App is being made using Python Flask and Postgresql.

There will be 3 services set in Web Services:
1. Flask-App (The Web App) Service
2. PostgreSQL Service
3. Backup Service

## Project Steps
In this project, the steps that being executed are:
1. Navigate to Project Directory.
2. Create Dockerfiles for Flask application, PostgreSQL Container, and Cron Services Scheduler.
3. Designing the environments, mechanism, volumes and networks between services in docker-compose.yml.
4. Install the requirements that have been listed down in requirements.txt using `pip install -r requirements.txt`.
5. Generate migrations data by executing `flask db init` in the directory.
6. Generate bash script for backup and restore the database.
7. Build and start the services by executing `docker-compose up --build -d` command.
8. After the services has been running, activate flask-app services by `docker-compose exec -it flask-app bash` command.
9. Inside the container execute `flask db migrate` and `flask db upgrade`.
10. In web browser open the localhost:5000, to check if flask-app services has run properly and sign in/register to check the app connectivity with PostgreSQL database.
11. Run backup-scheduler service and execute `crontab -l` command to find list of cronjob schedules.
12. To restore the database, activate my-postgres services and connect to database using `psql -h my-postgres-container -U mypostgres -d flask-app_db` and execute `DELETE FROM flask-app_db`.
13. Open localhost:5000 and try to sign it. If sign in attempt failed, the `DELETE` command has been properly executed.
14. After the table has been emptied, execute `bash script_restore.sh` command in the container.
15. Open localhost:5000 and try to sign it again. If sign in attempt succeed, then database restore script has been execute properly.
