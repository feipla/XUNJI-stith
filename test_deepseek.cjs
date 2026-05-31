const https = require('https');
const fs = require('fs');

const ocrText = `2.08 公里
00:31:27
15'07"/公里 配速
171 平均心率
119 最大心率
3.97 公里/小时 平均速度
124 步/分钟 步频
53 垂直振幅
3910 步
101 平均步频
18.2 米 最大步幅
9.1 垂直比
恢复心率 3 次/分钟 86/79 次/分钟
训练表现 35
步频 124次/分钟 158次/分钟
海拔 65.0米 80.9米
户外跑步
2024/7/29 20:36`;

console.log('=== OCR文本 ===');
console.log(ocrText);
console.log('');

const prompt = `Extract sports data from this OCR text and return JSON only:
Fields needed: date, type, duration(minutes), distance(km), avgHR(bpm), maxHR(bpm), calories, cadence(spm), steps, pace(min/km), vo2max, recoveryHR, bestPace, avgSpeed(km/h), elevationGain(m), elevationLoss(m), avgStride(m)
Return JSON like: {"valid":true,"date":"2024-07-29","type":"户外跑步","duration":31.45,"distance":2.08,"avgHR":171,"maxHR":119,...}
Rules: pace is min/km (15'07" = 15.12), distinguish distance vs speed, null for missing fields`;

const body = JSON.stringify({
  model: 'deepseek-chat',
  messages: [{role:'user', content: prompt + '\n\nOCR TEXT:\n' + ocrText}],
  max_tokens: 2000,
  temperature: 0.7
});

const options = {
  hostname: 'api.deepseek.com',
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer sk-c75dfa345afe4ffea560c05e796330ed'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const raw = json.choices[0].message.content;
      console.log('=== DeepSeek Raw Response ===');
      console.log(raw);
      console.log('');
      const clean = raw.replace(/```json/g,'').replace(/```/g,'').trim();
      const parsed = JSON.parse(clean);
      console.log('=== Parsed Structured Data ===');
      console.log(JSON.stringify(parsed, null, 2));
    } catch(e) {
      console.log('Error:', e.message);
      console.log('Raw response:', data);
    }
  });
});
req.on('error', e => console.error('Request error:', e.message));
req.write(body);
req.end();
