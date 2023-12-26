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
5. Generate bash script for backup and restore the database.
6. ### Flask-app service:
     - Generate migrations data by executing `flask db init` in the directory.
     - Build and start the services by executing `docker-compose up --build -d` command.
     - Open localhost:5000 to check if flask-app services has run properly, like this example:
       
       ![image](https://github.com/FrancisDarma/Kanban-Web-App-Services/assets/115353523/b12f8fa9-c0fa-4572-8377-67ca929221c4)
     
7. ### PostgreSQL service:
     - After the services has been running, activate flask-app services by `docker-compose exec -it flask-app bash` command.
     - Inside the container execute `flask db migrate` and `flask db upgrade`.
     - In web browser open the localhost:5000, to check if flask-app services has run properly and sign in/register to check the app connectivity with PostgreSQL database, like this image:
       
       ![image](https://github.com/FrancisDarma/Kanban-Web-App-Services/assets/115353523/9e177236-5a6a-47c9-8260-d050bc5226ce)
   
     - If login succeed then PostgreSQL database has been properly connected
8. ### Backup Cronjob service:
     - Run backup-scheduler service with `docker-compose exec -it backup-scheduler bash` command and execute `crontab -l` command to find list of cronjob schedules. The `crontab -e` command should have been automatically set in Dockerfile-backup. The `crontab -l` should looked like this image:
       
       ![image](https://github.com/FrancisDarma/Kanban-Web-App-Services/assets/115353523/acc1dfad-50fe-4bee-b69d-423b79e34727)
   
     - The backup file will be formatted in sql script and located in `usr/src/app/backup` directory, like this:
       
       ![image](https://github.com/FrancisDarma/Kanban-Web-App-Services/assets/115353523/11b54e8f-d031-4974-904a-b26b43a88b5c)
   
     - The backup will be executed once a day.
13. ### Restore Backup:
    - To restore the database, activate my-postgres services and connect to database using `psql -h my-postgres-container -U mypostgres -d flask-app_db`, input password `secretpass` and execute `DELETE FROM users;` and `DELETE FROM tasks;`.
      
      ![image](https://github.com/FrancisDarma/Kanban-Web-App-Services/assets/115353523/bf498407-5894-48c9-a399-a052e3f75562)
      ![image](https://github.com/FrancisDarma/Kanban-Web-App-Services/assets/115353523/d48e61f2-cf0a-4fe0-8817-d768dc45a522)
    
    - Open localhost:5000 and try to sign it. If sign in attempt failed, the `DELETE` command has been properly executed.
      
      ![image](https://github.com/FrancisDarma/Kanban-Web-App-Services/assets/115353523/0bcac43c-48d3-4000-a68f-880e145504c4)
    
    - After the table has been emptied, execute `bash script_restore.sh` command in the container. The output will be like this example:
      
      ![image](https://github.com/FrancisDarma/Kanban-Web-App-Services/assets/115353523/a5d96ed9-e2a6-43f7-8ff0-b864c43e3040)
    
    - Open localhost:5000 and try to sign it again. If sign in attempt succeed, then database restore script has been execute properly.
      
      ![image](https://github.com/FrancisDarma/Kanban-Web-App-Services/assets/115353523/b0bfa106-3db6-494e-95d8-be14f4a9cae9)
      ![image](https://github.com/FrancisDarma/Kanban-Web-App-Services/assets/115353523/4b4c6ea2-b469-45ec-8fd2-4278f3768675)


