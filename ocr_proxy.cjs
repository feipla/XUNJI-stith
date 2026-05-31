const http = require('http');
const https = require('https');
const url = require('url');

const BAIDU_API_KEY = 'gjIDDegNwGDC7ulfQ7YfYBc9j';
const BAIDU_SECRET_KEY = 'm2obxMFvKpIx8dgt37c4vc5NQPfBTF';
const OCR_URL = 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic';
const TOKEN_URL = 'https://aip.baidubce.com/oauth/2.0/token';

let accessToken = null;

function getAccessToken() {
  return new Promise((resolve, reject) => {
    if (accessToken) return resolve(accessToken);
    const tokenUrl = `${TOKEN_URL}?grant_type=client_credentials&client_id=${BAIDU_API_KEY}&client_secret=${BAIDU_SECRET_KEY}`;
    https.get(tokenUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.access_token) {
            accessToken = json.access_token;
            resolve(accessToken);
          } else {
            reject(new Error(json.error_desc || '获取Token失败'));
          }
        } catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function httpsPost(ocrUrl, postData) {
  return new Promise((resolve, reject) => {
    const parsed = url.parse(ocrUrl);
    const options = {
      hostname: parsed.hostname,
      path: parsed.path,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(postData) }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/ocr') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { image } = JSON.parse(body);
        const token = await getAccessToken();
        const ocrUrl = `${OCR_URL}?access_token=${token}`;
        const result = await httpsPost(ocrUrl, `image=${encodeURIComponent(image)}`);
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(result);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error_code: -1, error_msg: err.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => console.log('OCR代理服务已启动: http://localhost:3000/api/ocr'));
