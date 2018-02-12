# Cake Demo!  

### About:
Built with Vue, Pug, SCSS, SkeletonCSS and Webpack for the frontend and Node/Express for the backend.  ES6/7 compiled via Babel.  Full disclosure: this project was bootstrapped by another repo that I created to save time with setup which can be found [here](https://github.com/allenRoyston/vue-es6-webpack-express-clean).  

### Install instructions:
```sh
$ git clone https://github.com/allenRoyston/cake_test.git
$ cd cake_test
$ npm install
```
### Development build (hotreload enabled)
$ npm run dev

### Webpack bundle and server deployment:
```sh
$ gulp build
$ gulp
```
### Things I noticed:
- GET and DELETE for the API work as intended; PUT kicks back a 501 (server error).  The POST returns a 200 and appears to work, but does not actually create a new entry.  I suspect this has something to do with the databases permissions and nothing to do with my end of the code. My API calls can be found in src/components/elements/cakeTable.vue

- Also, I tried to host this project on my Heroku servers, but they're HTTPS and as such do not work with the HTTP endpoints that are provided.  
