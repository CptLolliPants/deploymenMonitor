exports.getMultiMachineDeployments = function (url, credentials) {
  let url = new URL(url)
  const https = require('https');
  
  let options = {
    host: url.host,
    port: url.port,
    path: url.pathname,
    method: 'GET',
    auth: username + ':' + password
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
      console.log(JSON.stringify(data, null ,2))
      let deployments = data.relations.link.filter((el) => {
        return el.rel == 'down'
      })
      let mm = deployments.map((el) => {
        for(var i = 0, y = el.attributes.length; i < y; i++){
          if(el.attributes[i].name == 'name'){
            return {
              'id'   : el['attributes'][i]['value'],
              'href' : el.href
            }
          }
        }
      })
      return mm
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
    return "Error: " + err.message
  });
  
}