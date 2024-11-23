FROM node:20

RUN git clone https://github.com/Jupiterbold05/Platinum-V1.git /root/JUPITERBOLD05

# Clear npm cache and remove node_modules directories
RUN npm cache clean --force
RUN rm -rf /root/JUPITERBOLD05/node_modules

# Install dependencies
WORKDIR /root/JUPITERBOLD05
RUN npm install

# Add additional Steps To Run...
EXPOSE 3000
CMD ["npm","start" ]
# IF YOU ARE MODIFYING THIS BOT DONT CHANGE THIS  RUN rm -rf /root/JUPITERBOLD05/node_modules
