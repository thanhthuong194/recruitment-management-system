#!/bin/sh
# wait-for-it.sh

HOST="sqlserver"
PORT="1433"

echo "Waiting for $HOST:$PORT to be ready..."

# Vòng lặp chờ cho đến khi cổng 1433 của sqlserver mở
# Cần cài 'netcat' để lệnh 'nc' hoạt động
while ! nc -z $HOST $PORT; do
  echo "Still waiting for $HOST:$PORT..."
  sleep 1
done

echo "$HOST:$PORT is ready!"

# Chạy lệnh CMD (tức là lệnh 'mvn spring-boot:run ...' của bạn)
exec "$@"