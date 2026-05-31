const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('=== 真实 OCR.space API 测试 ===\n');

// 配置（与index.html完全一致）
const OCR_CONFIG = {
  apiKey: 'K88925542688957',
  apiUrl: 'api.ocr.space',
  apiPath: '/parse/image',
  options: {
    language: 'chs',
    isOverlayRequired: false,
    OCREngine: 2,
    scale: true,
    detectOrientation: true
  }
};

const IMAGE_PATH = 'd:/true/XUNJI-stitch_ai/test_screenshot.png';

console.log('配置信息:');
console.log(`  API Key: ${OCR_CONFIG.apiKey}`);
console.log(`  Language: ${OCR_CONFIG.options.language}`);
console.log(`  OCREngine: ${OCR_CONFIG.options.OCREngine}`);
console.log(`  Scale: ${OCR_CONFIG.options.scale}`);
console.log(`  Image Path: ${IMAGE_PATH}`);
console.log('');

// 检查图片是否存在
if (!fs.existsSync(IMAGE_PATH)) {
  console.error('❌ 错误：找不到图片文件');
  console.error('');
  console.error('请执行以下步骤：');
  console.error('1. 在浏览器中，右键点击您刚才发的那张华为手表截图');
  console.error('2. 选择"图片另存为..."');
  console.error('3. 保存到: d:\\true\\XUNJI-stitch_ai\\test_screenshot.png');
  console.error('4. 再次运行: node d:\\true\\XUNJI-stitch_ai\\test_ocr_real.js');
  process.exit(1);
}

console.log('✅ 找到图片文件');

// 读取图片并转base64
const imageBuffer = fs.readFileSync(IMAGE_PATH);
const base64Image = imageBuffer.toString('base64');
const dataUri = `data:image/png;base64,${base64Image}`;

console.log(`图片大小: ${Math.round(imageBuffer.length / 1024)} KB`);
console.log(`Base64长度: ${base64Image.length} 字符`);
console.log('');

// 构建multipart/form-data
const boundary = '----OCRTest' + Date.now();

const formDataParts = [
  `--${boundary}`,
  'Content-Disposition: form-data; name="apikey"',
  '',
  OCR_CONFIG.apiKey,
  
  `--${boundary}`,
  'Content-Disposition: form-data; name="language"',
  '',
  OCR_CONFIG.options.language,
  
  `--${boundary}`,
  'Content-Disposition: form-data; name="isOverlayRequired"',
  '',
  'false',
  
  `--${boundary}`,
  'Content-Disposition: form-data; name="OCREngine"',
  '',
  String(OCR_CONFIG.options.OCREngine),
  
  `--${boundary}`,
  'Content-Disposition: form-data; name="scale"',
  '',
  'true',
  
  `--${boundary}`,
  'Content-Disposition: form-data; name="detectOrientation"',
  '',
  'true',
  
  `--${boundary}`,
  'Content-Disposition: form-data; name="base64Image"',
  'Content-Type: application/octet-stream',
  '',
  dataUri,
  
  `--${boundary}--`
];

const formData = formDataParts.join('\r\n');
const formDataBuffer = Buffer.from(formData, 'utf8');

console.log('请求大小:', Math.round(formDataBuffer.length / 1024), 'KB');
console.log('');
console.log('=== 发送请求到 OCR.space... ===');
console.log('');

// 发送HTTP请求
const options = {
  hostname: OCR_CONFIG.apiUrl,
  path: OCR_CONFIG.apiPath,
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': formDataBuffer.length
  }
};

const req = https.request(options, (res) => {
  console.log(`HTTP状态码: ${res.statusCode}`);
  console.log(`HTTP状态信息: ${res.statusMessage}`);
  console.log('');
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('=== 收到响应 ===');
    console.log('');
    
    try {
      const result = JSON.parse(responseData);
      
      console.log('OCRExitCode:', result.OCRExitCode);
      console.log('IsErroredOnProcessing:', result.IsErroredOnProcessing);
      console.log('ErrorMessage:', result.ErrorMessage);
      console.log('ErrorDetails:', result.ErrorDetails);
      console.log('');
      
      if (result.ParsedResults && result.ParsedResults.length > 0) {
        console.log('=== OCR 识别结果 ===');
        console.log('');
        console.log(result.ParsedResults[0].ParsedText);
        console.log('');
        console.log('=== 提取结果分析 ===');
        
        const text = result.ParsedResults[0].ParsedText;
        const hasDate = /202[4-6]/.test(text) || /\d{4}\/\d{1,2}\/\d{1,2}/.test(text);
        const hasTime = /\d{1,2}:\d{2}/.test(text);
        const hasDistance = /公里|km/.test(text);
        const hasHeartRate = /心率|bpm/.test(text);
        
        console.log(`包含日期: ${hasDate ? '✅' : '❌'}`);
        console.log(`包含时间: ${hasTime ? '✅' : '❌'}`);
        console.log(`包含距离: ${hasDistance ? '✅' : '❌'}`);
        console.log(`包含心率: ${hasHeartRate ? '✅' : '❌'}`);
      }
    } catch (e) {
      console.error('JSON解析失败:', e.message);
      console.error('原始响应:', responseData);
    }
  });
});

req.on('error', (e) => {
  console.error('请求错误:', e.message);
});

req.write(formDataBuffer);
req.end();
