let test = require('./lib/vroConnector.js')
let credentials = require('./secrets.json')

console.log(test.getMultiMachineDeployments(
  'https://p-issc-000015.luci.leidenuniv.nl:8281/vco/api/categories/2c912018667d522501671c3996135815',
  credentials
  ));