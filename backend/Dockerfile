FROM openjdk:11-jdk
EXPOSE 8080
CMD ["./mvnw", "clean", "package"]
VOLUME /tmp
ARG JAR_FILE=build/libs/yeobo-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
ENV TZ=Asia/Seoul
RUN apt-get install -y tzdata
