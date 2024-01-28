import { CustomPromise } from "./CustomPromise";

let promise = new CustomPromise<string>((resolve,reject)=>{
    setTimeout(()=>{
        resolve("Hello Gaurav");
    },1000)
})

promise.then((data:string)=>{
 console.log(data);
}).catch((error)=>{
  console.error(error);
})