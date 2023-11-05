FROM ubuntu:20.04

WORKDIR /root

# # Basic packages installation
RUN apt-get update && \
    apt-get install -y python3 python3-pip curl wget gnupg docker-compose software-properties-common ca-certificates libncurses5

# Node v18 installation
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# # Check Node and NPM version
RUN node -v && npm -v
RUN npm install -g yarn@latest