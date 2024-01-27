class CustomPromise {
    constructor(executor) {
        this.status = "pending";
        this.resolvedCallbacks = [];
        this.rejectedCallback = [];
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        }
        catch (error) {
            this.reject(error);
        }
    }
    resolve(value) {
        if (this.status === "pending") {
            this.status = "fullfilled";
            this.resolvedvalue = value;
            this.resolvedCallbacks.forEach((callback) => callback(value));
        }
    }
    reject(value) {
        if (this.status === "pending") {
            this.status = "rejected";
            this.rejectedvalue = value;
            this.rejectedCallback.forEach((callback) => callback(value));
        }
    }
    then(resolved) {
        if (this.status === "fullfilled") {
            resolved === null || resolved === void 0 ? void 0 : resolved(this.resolvedvalue);
        }
        else if (this.status === "pending") {
            if (typeof resolved == "function")
                this.resolvedCallbacks.push(resolved);
        }
        return this;
    }
    catch(rejected) {
        if (this.status === "rejected") {
            rejected === null || rejected === void 0 ? void 0 : rejected(this.rejectedvalue);
        }
        else if (this.status === "pending") {
            if (typeof rejected === "function")
                this.rejectedCallback.push(rejected);
        }
        return this;
    }
}
let promise = new CustomPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello Gaurav");
    }, 10000);
});
promise.then((data) => {
    console.log(data);
}).catch((error) => {
    console.error(error);
});
