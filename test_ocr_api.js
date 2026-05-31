const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('=== 测试 OCR.space API ===\n');

// 配置（与您index.html中的配置一致）
const CONFIG = {
  apiKey: 'K88925542688957',
  apiUrl: 'https://api.ocr.space/parse/image',
  options: {
    language: 'chs',
    isOverlayRequired: false,
    OCREngine: 2,
    scale: true,
    detectOrientation: true
  }
};

console.log('使用的API Key:', CONFIG.apiKey.substring(0, 10) + '...');
console.log('OCREngine:', CONFIG.options.OCREngine);
console.log('Language:', CONFIG.options.language);
console.log('');

// 模拟图片压缩函数（与您index.html中的compressImageForOCR一致）
function simulateCompression(imageData) {
  // 简单模拟：输出大小信息
  const sizeKB = Math.round(imageData.length / 1024);
  console.log(`图片大小: ${sizeKB} KB`);
  console.log(`免费版限制: 1.5 MB (1536 KB)`);
  console.log(`状态: ${sizeKB <= 1400 ? '✅ 符合' : '❌ 需压缩'}`);
  console.log('');
  return imageData;
}

// 模拟调用OCR.space（需要实际图片）
console.log('⚠️  注意：需要您提供实际图片文件才能测试真实API');
console.log('');
console.log('请按以下步骤操作：');
console.log('1. 把您刚才的华为手表截图保存到 d:\\true\\XUNJI-stitch_ai\\test_screenshot.png');
console.log('2. 运行 node d:\\true\\XUNJI-stitch_ai\\test_ocr_api_real.js');
console.log('');

console.log('=== 当前的API配置 ===');
console.log(JSON.stringify(CONFIG, null, 2));
console.log('');

console.log('--- 您程序中的OCR请求格式 ---');
console.log('请求方式: POST multipart/form-data');
console.log('字段: apikey, language, isOverlayRequired, OCREngine, scale, detectOrientation, base64Image');
console.log('');
