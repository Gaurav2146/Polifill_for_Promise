import { CustomPromise } from "./CustomPromise";
import { Promise_All } from "./Promise_All";

let promise1 = new CustomPromise<string>((resolve,reject)=>{
    setTimeout(()=>{
        resolve("Hello Gaurav");
    },1000)
})
let promise2 = new CustomPromise<string>((resolve,reject)=>{
  setTimeout(()=>{
      reject("Hello Gaurav");
  },2000)
})
let promise3 = new CustomPromise<string>((resolve,reject)=>{
  setTimeout(()=>{
      resolve("Hello Gaurav");
  },3000)
})

let all_promise = new Promise_All();

all_promise.all([promise1,promise2,promise3]).then((result)=>{
console.log(result , "result");
}).catch((error)=>{
  console.log(error , "error");
})

