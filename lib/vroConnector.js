exports.getMultiMachineDeployments = function (url, credentials, callback) {
  var MultiMachineDeployment = new Promise(
    function (resolve, reject) {
      const uri = new URL(url)
      const https = require('https');
      let options = {
          host: uri.hostname,
          port: uri.port,
          path: uri.pathname,
          method: 'GET',
          auth: credentials.username + ':' + credentials.password
      }
      https.get(options, (resp) => {
          let data = '';
      
          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
              data += chunk;
          });
      
      // The whole response has been received. Print out the result.
          resp.on('end', () => {
              data = JSON.parse(data)
              resolve(data)
          });
      }).on("error", (err) => {
        reject("Error: " + err.message)
      });
    }
  );
  MultiMachineDeployment.then((resolve) => {
    callback(resolve)
  }).catch((reject) =>  {
    callback(reject)
  })
}
