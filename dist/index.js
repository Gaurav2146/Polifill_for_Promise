// Check if Promise is not defined
class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.resolvedCallbacks = [];
        this.errorCallbacks = [];
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        }
        catch (error) {
            this.reject(error);
        }
    }
    resolve(value) {
        if (this.state === 'pending') {
            this.state = 'fulfilled';
            this.value = value;
            this.resolvedCallbacks.forEach(callback => callback(value));
        }
    }
    reject(reason) {
        if (this.state === 'pending') {
            this.state = 'rejected';
            this.value = undefined;
            this.errorCallbacks.forEach(callback => callback(reason));
        }
    }
    then(onFulfilled) {
        if (this.state === 'fulfilled') {
            onFulfilled === null || onFulfilled === void 0 ? void 0 : onFulfilled(this.value);
        }
        else if (this.state === 'pending') {
            if (typeof onFulfilled === 'function')
                this.resolvedCallbacks.push(onFulfilled);
        }
        return this;
    }
    catch(onRejected) {
        if (this.state === 'rejected') {
            onRejected === null || onRejected === void 0 ? void 0 : onRejected(this.value);
        }
        else if (this.state === 'pending') {
            if (typeof onRejected === 'function')
                this.errorCallbacks.push(onRejected);
        }
        return this;
    }
}
// Now you can use Promises in your TypeScript code
const myPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('Rejected');
        resolve('Hello, World!');
    }, 1000);
});
myPromise.then(value => {
    console.log(value);
}).catch((error) => {
    console.error(error);
});
