# ------------------------
# Stage 1: Build Spring Boot app
# ------------------------
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# ------------------------
# Stage 2: Run app
# ------------------------
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Install mssql-tools for database initialization
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y mssql-tools18 unixodbc-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PATH="$PATH:/opt/mssql-tools18/bin"

COPY --from=builder /app/target/recruitment-backend.jar /app/backend.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/backend.jar"]