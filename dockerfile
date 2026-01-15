FROM node:25.3-alpine
WORKDIR /app

COPY package*.json .
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

COPY . .
ENV NODE_ENV=production
EXPOSE 3000

RUN npx prisma generate

RUN npm run build
ENTRYPOINT ["npm", "run", "start:migrate"]
