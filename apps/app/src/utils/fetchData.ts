const controller = new AbortController();

class Timeout {
  constructor(config = {}) {
    this.timeout = config.seconds || 10000;
    this.timeoutID = undefined;
  }

  get start() {
    return new Promise((_, reject) => {
      this.timeoutID = setTimeout(() => {
        controller.abort();
        reject("We're having issues connecting. ");
      }, this.timeout);
    });
  }

  clear() {
    this.timeoutID && clearTimeout(this.timeoutID);
  }
}

export const fetchData = async (url, options) => {
  const timeout = new Timeout({ seconds: 6000 });
  const request = fetch(url, { ...options, signal: controller.signal });

  return Promise.race([request, timeout.start])
    .then(
      (success) => {
        // console.log("request success: ", success);
        if (success.error) {
          return success.error;
        }
        return success;
      },
      (error) => {
        // console.log("request error: ", error);
        return error;
      }
    )
    .finally((_) => timeout.clear());
};