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
COPY --from=builder /app/target/recruitment-backend.jar /app/backend.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/backend.jar"]