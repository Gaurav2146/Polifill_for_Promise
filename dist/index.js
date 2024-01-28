"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomPromise_1 = require("./CustomPromise");
let promise = new CustomPromise_1.CustomPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello Gaurav");
    }, 1000);
});
promise.then((data) => {
    console.log(data);
}).catch((error) => {
    console.error(error);
});
