FROM docker.n8n.io/n8nio/n8n:latest

USER root
RUN mkdir -p /home/node/.n8n/custom

COPY dist/nodes /home/node/.n8n/custom/nodes
COPY dist/credentials /home/node/.n8n/custom/credentials

USER node
ENV N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
