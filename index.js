const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'assets')))
app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'views/index.html')
  )
})
app.post('/api', (req, res) => {
  var body = req.body
  console.log(req.body)
  console.log("I hear people....")
  res.send("I love hooomans" + req.body.data)
})

app.listen(port, () => console.log('Example app listening on port: ' + port))
