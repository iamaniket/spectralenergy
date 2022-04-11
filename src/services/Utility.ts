export const fetchData = (
  APIEndPoint: string
): Promise<Array<any> | undefined> => {
  try {
    return new Promise((resolve, reject) => {
      fetch(APIEndPoint, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(function (response) {})
        .then(function (myJson: any) {
          return resolve(myJson);
        });
    });
  } catch (err) {
    return new Promise((resolve, reject) => {
      console.error(err);
      reject(undefined);
    });
  }
};
