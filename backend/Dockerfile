FROM python:3.8-alpine
WORKDIR /app
COPY . .
ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt
EXPOSE 5000
CMD ["flask", "--app", "main", "run"]
#CMD ["/bin/sh"]
