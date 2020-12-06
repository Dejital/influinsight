import { spawn } from 'child_process'

export default (req, res) => {
  const { query: { profile } } = req;

  if (!profile) {
    res.status(400).end()
  }

  let output: string;

  const python = spawn('python3', ['python/instagram-likes.py', profile])

  python.stdout.on('data', function (data) {
    output = data.toString();
  })
  
  python.on('close', () => {
    res.statusCode = 200
    res.send(output)
  })
}