FROM node:16

#PM2 will be used as PID 1 process
RUN npm install pm2 -g

# Copy source code
COPY --chown=node:node package*.json ./

# Running npm install
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Copy the rest of your app's source code from your host to your image filesystem.
COPY --chown=node:node . .

# Switch to 'node' user
USER node

EXPOSE 8080 8545

CMD ["pm2-runtime", "ecosystem.config.js"]