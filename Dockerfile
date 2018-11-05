FROM node

MAINTAINER Ryze <cunkuan.ding@gmail.com>


WORKDIR /home/project

EXPOSE 3000

CMD ["npm","start"]
