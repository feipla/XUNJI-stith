import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import { URLSearchParams } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 百度OCR配置
const BAIDU_API_KEY = 'gjIDDegNwGDC7ulfQ7YfYBc9j';
const BAIDU_SECRET_KEY = 'm2obxMFvKpIx8dgt37c4vc5NQPfBTF';
const OCR_URL = 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic';
const TOKEN_URL = 'https://aip.baidubce.com/oauth/2.0/token';

let accessToken = null;
let tokenExpireTime = 0;

async function getBaiduAccessToken() {
  if (accessToken && Date.now() < tokenExpireTime) {
    return accessToken;
  }
  return new Promise((resolve, reject) => {
    const url = `${TOKEN_URL}?grant_type=client_credentials&client_id=${BAIDU_API_KEY}&client_secret=${BAIDU_SECRET_KEY}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.access_token) {
            accessToken = json.access_token;
            tokenExpireTime = Date.now() + (json.expires_in - 60) * 1000; // 提前1分钟过期
            resolve(accessToken);
          } else {
            reject(new Error(json.error_desc || '获取百度Token失败'));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function httpsPost(url, data, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = new URL(url);
    options.method = 'POST';
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data),
      ...headers
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// 中间件
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// OCR代理路由
app.post('/api/ocr', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error_code: 400, error_msg: '缺少image参数' });
    }
    const token = await getBaiduAccessToken();
    const ocrUrl = `${OCR_URL}?access_token=${token}`;
    const params = new URLSearchParams({ image });
    const result = await httpsPost(ocrUrl, params.toString());
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
  } catch (err) {
    console.error('OCR错误:', err);
    res.status(500).json({ error_code: 500, error_msg: err.message });
  }
});

// 默认路由：返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`服务已启动: http://localhost:${PORT}`);
});
