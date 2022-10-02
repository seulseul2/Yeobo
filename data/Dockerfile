FROM python:3.9.10
WORKDIR /var/jenkins_home/workspace/yeobo/data
COPY requirements.txt ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . .

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "server.wsgi:application"]
