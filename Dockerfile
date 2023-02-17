# Application container
FROM node:18.13.0 as application

ARG START_COMMAND
ENV START_COMMAND=$START_COMMAND

# docker workdir
WORKDIR /app

COPY . .

RUN npm ci --quiet
RUN npm run build

ENV TZ=Asia/Taipei

# expose at port 3000
EXPOSE 3000

# default command is starting the server
CMD ["sh", "-c", "npm run ${START_COMMAND}"]
