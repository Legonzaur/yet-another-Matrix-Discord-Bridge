interface IDictionary {
  [index: string]: any;
}

function sortEntries(a: Array<any>, b: Array<any>) {
  {
    if (a[0] > b[0]) {
      return 1;
    }
    if (a[0] < b[0]) {
      return -1;
    }
    return 0;
  }
}

function canon(input: any) {
  let output: IDictionary = {};
  Object.entries(input)
    .sort(sortEntries)
    .forEach((e) => {
      if (typeof e[1] == "object" && !Array.isArray(e[1])) {
        return (output[e[0]] = canon(e[1]));
      }
      return (output[e[0]] = e[1]);
    });
  // console.log(JSON.stringify(output));
  return output;
}

// canon({
//   auth: {
//     success: true,
//     mxid: "@john.doe:example.com",
//     profile: {
//       display_name: "John Doe",
//       three_pids: [
//         {
//           medium: "email",
//           address: "john.doe@example.org",
//         },
//         {
//           medium: "msisdn",
//           address: "123456789",
//         },
//       ],
//     },
//   },
// });
export default function sign(object: any) {}
