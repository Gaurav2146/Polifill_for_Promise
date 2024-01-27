
class CustomPromise<T>
{
    private status: "pending" | "fullfilled" | "rejected" = "pending";
    private resolvedvalue:T|undefined;
    private rejectedvalue:T|undefined;
    private resolvedCallbacks:((input?:T)=>void)[] = [];
    private rejectedCallback:((input?:T)=>void)[] = [];

    constructor(executor:( resolve:(input?:T)=>void, reject:(input?:T)=>void ) => void)
    {
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    private resolve(value?:T)
    {
       if(this.status === "pending")
       {
           this.status = "fullfilled";
           this.resolvedvalue = value;
           this.resolvedCallbacks.forEach((callback)=>callback(value));
       }
    }

    private reject(value?:T)
    {
        if(this.status === "pending")
        {
            this.status = "rejected";
            this.rejectedvalue = value;
            this.rejectedCallback.forEach((callback)=>callback(value));
        }
    }

    then(resolved?:(input?:T)=>void):CustomPromise<T>
    {
        if(this.status === "fullfilled")
        {
          resolved?.(this.resolvedvalue);
        }
        else if(this.status === "pending")
        {
           if(typeof resolved == "function") 
           this.resolvedCallbacks.push(resolved);
        }

        return this;
    }

    catch(rejected?:(input?:T)=>void):CustomPromise<T>
    {
        if(this.status === "rejected")
        {
            rejected?.(this.rejectedvalue);
        }
        else if(this.status === "pending")
        {
           if(typeof rejected === "function") 
           this.rejectedCallback.push(rejected);
        }

        return this;
    }

}

let promise = new CustomPromise<string>((resolve,reject)=>{

    setTimeout(()=>{

        resolve("Hello Gaurav");

    },10000)
})

promise.then((data:string)=>{
 console.log(data);
}).catch((error)=>{
  console.error(error);
})