// Check if Promise is not defined

class MyPromise<T> {
    private state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
    private value: T | undefined;
    private resolvedCallbacks: ((value?: T) => void)[] = [];
    private errorCallbacks: ((value?: T) => void)[] = [];

    constructor(executor: (resolve: (value?: T) => void, reject: (reason?: any) => void) => void) {
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    private resolve(value?: T): void {
        if (this.state === 'pending') {
            this.state = 'fulfilled';
            this.value = value;
            this.resolvedCallbacks.forEach(callback => callback(value));
        }
    }

    private reject(reason?: any): void {
        if (this.state === 'pending') {
            this.state = 'rejected';
            this.value = undefined;
            this.errorCallbacks.forEach(callback => callback(reason));
        }
    }

    then(onFulfilled?: (value?: T) => void): MyPromise<T> {
        if (this.state === 'fulfilled') {
            onFulfilled?.(this.value);
        } else if (this.state === 'pending') {
            if(typeof onFulfilled === 'function')
            this.resolvedCallbacks.push(onFulfilled);
        }
        return this;
    }

    catch(onRejected?: (value?: T) => void): MyPromise<T> {
        if (this.state === 'rejected') {
            onRejected?.(this.value);
        } else if (this.state === 'pending') {
            if(typeof onRejected === 'function')
            this.errorCallbacks.push(onRejected);
        }
        return this;
    }
}


// Now you can use Promises in your TypeScript code
const myPromise = new MyPromise<string>((resolve, reject) => {
    setTimeout(() => {
        reject('Rejected');
        resolve('Hello, World!');
    }, 1000);
});

myPromise.then(value => {
    console.log(value);
}).catch((error)=>{
    console.error(error);
})

