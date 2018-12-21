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
              let deployments = data.relations.link.filter((el) => {
                return el.rel == 'down'
              }).map((el) => {
                for(var i = 0, y = el.attributes.length; i < y; i++){
                  if(el.attributes[i].name == 'name'){
                    return {
                      'id'   : el['attributes'][i]['value'],
                      'href' : el.href
                    }
                  }
                }
              })
              resolve(data)
          });
      }).on("error", (err) => {
        reject("Error: " + err.message)
      });
    }
  );
  MultiMachineDeployment.then((resolve) => {
    console.log(resolve)
    callback(resolve)
  }).catch((reject) =>  {
    callback(reject)
  })
}
