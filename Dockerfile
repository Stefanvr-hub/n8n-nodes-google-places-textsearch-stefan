FROM n8nio/n8n:latest

USER root
RUN npm install -g https://github.com/Stefanvr-hub/n8n-nodes-google-places-textsearch-stefan

USER node
ENV NODE_PATH=/usr/local/lib/node_modules

