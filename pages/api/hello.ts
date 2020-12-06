import { spawn } from 'child_process'

export default (req, res) => {
  const python = spawn('python3', ['python/hello.py'])
  let dataToSend: string;
  python.stdout.on('data', function (data) {
    dataToSend = data.toString();
  })
  python.on('close', (code) => {
    res.statusCode = 200
    res.send(dataToSend)
  })
}