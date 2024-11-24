FROM node:20

RUN git clone https://github.com/errrbodyhatescylee/teddyBot-V1.git/root/errrbodyhatescylee

# Clear npm cache and remove node_modules directories
RUN npm cache clean --force
RUN rm -rf /root/errrbodyhatescylee/node_modules

# Install dependencies
WORKDIR /root/errrbodyhatescylee
RUN npm install

# Add additional Steps To Run...
EXPOSE 3000
CMD ["npm","start" ]
# IF YOU ARE MODIFYING THIS BOT DONT CHANGE THIS  RUN rm -rf /root/errrbodyhatescylee/node_modules
