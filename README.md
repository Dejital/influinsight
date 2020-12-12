# Influinsight

## Introduction

This is a Next.JS + Python project. The backend uses a Python3 script to pull data from Instagram via the Instaloader project.

## Run this locally

`yarn run dev`

Alternatively if you want to run with attached debugger in Webstorm:

`node_modules/next/dist/bin/next`

## Building with Docker

Building and running as Production.

    docker build -t influinsight .
    docker run -p 80:80 -d influinsight

## Deploying to ACR (Azure)

    docker tag influinsight <subdomain>.azurecr.io/influinsight
    docker push <subdomain>azurecr.io/influinsight
