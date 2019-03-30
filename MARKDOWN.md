# Front End Workflow (Bootstrap)
An organized and automated workflow to create Front End with the help of Bootstrap. sass, es6 environment, live local server with auto-refresh, complete build task for production and lot more..

![Google logo](https://i.imgur.com/rLrfpnZm.jpg 'Bad Practice!')
![Google logo](https://i.imgur.com/XyxDu62m.jpg 'Good Practice!')

---
---
# Getting Started

1. Download and install [Node.js](https://nodejs.org/ 'go to nodejs official website')
2. Install Gulp globally
```sh
npm install gulp -g
```
3. In terminal/command line, ``` cd ``` into your project directory
4. Clone this workflow
```sh
git clone https://github.com/azizulDev/Front-End-Workflow-Bootstrap.git
```
5. ``` cd ``` into the downloaded repository
```sh
cd Front-End-Workflow-Bootstrap
```
6. Install all dependencies
```
npm install
```
7. After all dependencies installed. you can run tasks
  * ```gulp watch``` to run development task
  * ```gulp build``` to build your project for production
  * ```gulp previewDist``` preview your production copy

---
---


## Available Tasks Details
| Task Name | Description |
| ------ | ------ |
| ```gulp watch``` | spin up a local web server and watching for save changes in the working directory.
| ```gulp build``` | it takes all of your source code to optimize and minify them <br> then create a new folder called dist in the root of the directory.
| ```gulp previewDist``` | preview your production copy on a live server.