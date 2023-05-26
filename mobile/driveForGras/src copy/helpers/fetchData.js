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

// async function fetchData(url, options = {}) {
//     const { timeout = 8000 } = options;

//     const controller = new AbortController();
//     const id = setTimeout(() => controller.abort(), timeout);
//     const response = await fetch(url, {
//       ...options,
//       signal: controller.signal
//     });
//     clearTimeout(id);
//     console.log('response: ', response)
//     return response;
//   }

// export { fetchData }

// add abort controller for request

// abstraction for fetch API with
// built in timeout for slow connection,
// and network failure for when the server is unavailable

// const timeoutPromise = await new Promise((_, reject) => {
//   setTimeout(() => {
//     reject(Error("Network Request timed out"));
//   }, 6000);
// });

// .catch((error) => {
//   if (
//     error.message === "Network Request timed out" ||
//     error.message === "Network Request failed"
//   ) {
//     return error.message;
//   } else {
//     throw error.message;
//   }
// })
