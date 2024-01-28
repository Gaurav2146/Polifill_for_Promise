"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promise_All = void 0;
class Promise_All {
    constructor() {
        this.success_result = [];
        this.success_callback = [];
        this.error_callback = [];
        this.status = "pending";
    }
    all(promises) {
        let number_of_promise = 0;
        for (let record of promises) {
            record.then((data) => {
                this.success_result.push(data);
                number_of_promise++;
                if (number_of_promise === promises.length) {
                    this.status = "fullfilled";
                    this.success_callback.forEach((callback) => callback(this.success_result));
                }
            }).catch((error) => {
                this.err_result = error;
                this.status = "rejected";
                this.error_callback.forEach((callback) => callback(error));
            });
        }
        return this;
    }
    then(callback) {
        if (this.status === "rejected") {
            callback === null || callback === void 0 ? void 0 : callback(this.success_result);
        }
        else if (this.status === "pending") {
            if (typeof callback === "function")
                this.success_callback.push(callback);
        }
        return this;
    }
    catch(callback) {
        if (this.status === "rejected") {
            callback === null || callback === void 0 ? void 0 : callback(this.err_result);
        }
        else if (this.status === "pending") {
            if (typeof callback === "function")
                this.error_callback.push(callback);
        }
        return this;
    }
}
exports.Promise_All = Promise_All;
