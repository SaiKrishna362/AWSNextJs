FROM node:22
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
ENV REACT_APP_API_URL=http://localhost:5000
EXPOSE 3000
CMD [ "npm", "run" , "dev" ]