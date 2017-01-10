# Marius
Game like Mario Bros, but with just one level where you have to earn as much points as you can with your character.

## Running server

### 1 - Make Sure you have [Node](https://nodejs.org/)

### 2 - Install dependencies

```javascript
npm install
```
### 3 - Run web server

```javascript
npm run start
```
> This will start the project on http://localhost:3000

## Commands

### Running App
```javascript
npm run start
```

### Running Tests

```javascript
npm run test
```

> Interactive mode
```javascript
npm run test:watch
```

## Stack

- Static server is built upon [Hapi](http://hapijs.com/)
- Game engine is [Phaser](https://phaser.io/)

---

### Docker setup

To run the docker implementation just run the following
```bash
$ docker build -t marius-webserver .
$ docker run -d -p 3000:3000 --name marius-dock marius-webserver
```
> After that you can go to localhost:3000 and you'll see the web server running in the docker container.
