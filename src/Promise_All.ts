import { CustomPromise } from "./CustomPromise";

export class Promise_All
{
    private success_result:string[] = [];
    private err_result:string;
    private success_callback:((input?:string[]) => void)[]=[];
    private error_callback:((input?:string) => void)[]=[];
    private status:"pending"|"fullfilled"|"rejected"="pending";

    all(promises:CustomPromise<string>[]):Promise_All
    {
      
      let number_of_promise = 0;
      
      for(let record of promises)
      {
        record.then((data:string)=>{
            this.success_result.push(data);

            number_of_promise++;

            if(number_of_promise === promises.length)
            {
                this.status="fullfilled";
                this.success_callback.forEach((callback)=>callback(this.success_result));
            }

        }).catch((error:string)=>{
            this.err_result = error;
            this.status="rejected";
            this.error_callback.forEach((callback)=>callback(error));
        })
      }

      this.all = this.all.bind(this);

      return this;
    }

    then(callback?:(value?:string[])=>void):Promise_All
    {
        if(this.status === "rejected")
        {
          callback?.(this.success_result);
        }
        else if(this.status === "pending")
        {
            if(typeof callback === "function")
            this.success_callback.push(callback);
        }

        return this;
    }

    catch(callback?:(value?:string)=>void):Promise_All
    {
        if(this.status === "rejected")
        {
          callback?.(this.err_result);
        }
        else if(this.status === "pending")
        {
            if(typeof callback === "function")
            this.error_callback.push(callback);
        }

        return this;
    }

}