FROM python:3.10.4
WORKDIR /bsct-flask-app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
WORKDIR /bsct-flask-app/BSCTMainProject
EXPOSE 8000
CMD ["python", "main.py"]