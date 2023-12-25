FROM python:latest

#update library dan install cron dan nano
RUN apt-get update && apt-get install -y nano

#buat pwd	
WORKDIR /usr/src/app

#copy isi direktori saat ini
COPY . .

#install requirement
RUN pip install -r requirements.txt

#gunakan port 5000
EXPOSE 5000/tcp

#jalankan layanan flask dan cron
CMD flask run --host=0.0.0.0 --port=5000

