exports.getMultiMachineDeployments = function (url, credentials, callback) {
  function queryApi(url, credentials, callback){
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
        callback(data)
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
      callback("Error: " + err.message)
    });
  }

  queryApi(url,credentials,function(data){
    // The whole response has been received. Print out the result.
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
    }).forEach(element => {
      queryApi(element.href,credentials,function(data){
        console.log(data)
      })
    });
    callback(mm)
  })
}
