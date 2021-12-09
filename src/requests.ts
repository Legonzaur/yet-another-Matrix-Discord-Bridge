import https from "https";
async function request(
  url: string,
  body: any,
  type: string,
  headers: any | null = null
): Promise<any> {
  return new Promise((resolve, reject) => {
    let stringified = JSON.stringify(body);
    const options = {
      method: type,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": stringified.length,
        ...headers,
      },
    };

    const req = https.request(url, options, (res) => {
      res.on("data", (d) => {
        resolve({ code: res.statusCode, content: d.toString() });
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(stringified);
    req.end();
  });
}

export async function get(
  url: string,
  headers: any | null = null
): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    const req = https.request(url, options, (res) => {
      res.on("data", (d) => {
        resolve({ code: res.statusCode, content: d.toString() });
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
}

export function put(url: string, body: any, headers: any | null = null) {
  return request(url, body, "PUT", headers);
}

export function post(url: string, body: any, headers: any | null = null) {
  return request(url, body, "POST", headers);
}
