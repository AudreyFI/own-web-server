# Own Web Server

This project is my implementation of the [Web Server Challenge](https://codingchallenges.fyi/challenges/challenge-webserver).

## Overview

The goal of this challenge is to create a simple web server from scratch. This web server will be able to handle basic HTTP requests and serve static files located in the wwww folder.
We'll manage cluster to be able to create one cluster per core. Doing this if we receive a request that takes a long time to proceed then the next call won't be blocked (remember node.js is single threaded)

## Features

- Handle HTTP GET requests
- Serve static files
- Basic routing

## Getting Started

1. Clone the repository
2. Navigate to the project directory: `cd own-web-server`
3. Install the dependencies: `npm i`

### Usage

To start the web server, run the following command:

```sh
npm start
```

Then, open your web browser and go to `http://localhost:3000` to see the web server in action.

## Acknowledgments

- [Coding Challenges](https://codingchallenges.fyi/) for the inspiration and challenge.
- Any other resources or libraries you used.
