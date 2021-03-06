import { spawn } from 'child_process'

export default (req, res) => {
  let output: string;

  const python = spawn('python3', ['python/hello.py'])

  python.stdout.on('data', function (data) {
    output = data.toString();
  })

  python.on('close', () => {
    res.statusCode = 200
    res.send(output)
  })
}