
    function navigateTo(page) {
      const pages = document.querySelectorAll('.page');
      pages.forEach(p => p.classList.remove('active'));
      
      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach(item => item.classList.remove('active'));
      
      switch(page) {
        case 'home':
          document.getElementById('homePage').classList.add('active');
          document.getElementById('mainHeader').style.display = 'flex';
          navItems[0].classList.add('active');
          break;
        case 'activity-detail':
          document.getElementById('activityDetailPage').classList.add('active');
          document.getElementById('mainHeader').style.display = 'none';
          setTimeout(animateActivityDetail, 300);
          break;
        case 'life-tree':
          document.getElementById('lifeTreePage').classList.add('active');
          document.getElementById('mainHeader').style.display = 'flex';
          navItems[2].classList.add('active');
          setTimeout(animateLifeTree, 300);
          break;
        case 'analytics':
          document.getElementById('analyticsPage').classList.add('active');
          document.getElementById('mainHeader').style.display = 'flex';
          navItems[1].classList.add('active');
          break;
        case 'trace':
          document.getElementById('tracePage').classList.add('active');
          document.getElementById('mainHeader').style.display = 'flex';
          navItems[3].classList.add('active');
          break;
        case 'profile':
          document.getElementById('profilePage').classList.add('active');
          document.getElementById('mainHeader').style.display = 'flex';
          navItems[4].classList.add('active');
          break;
      }
    }
    
    function switchTab(tab) {
      navigateTo(tab);
    }
    
    function switchLifeTreeTab(tab) {
      const logTab = document.getElementById('lifeTreeLogTab');
      const previewTab = document.getElementById('lifeTreePreviewTab');
      const tabItems = document.querySelectorAll('.tab-bar .tab-item');
      
      tabItems.forEach(item => item.classList.remove('active'));
      
      if (tab === 'log') {
        logTab.style.display = 'block';
        previewTab.style.display = 'none';
        tabItems[0].classList.add('active');
      } else {
        logTab.style.display = 'none';
        previewTab.style.display = 'block';
        tabItems[1].classList.add('active');
      }
    }
    
    function animateHomePage() {
      const gaugeValue = document.getElementById('gaugeValue');
      const gaugeArc = document.getElementById('gaugeArc');
      let value = 0;
      const targetValue = 78;
      const circumference = 465;
      
      const interval = setInterval(() => {
        if (value >= targetValue) {
          clearInterval(interval);
        } else {
          value++;
          gaugeValue.textContent = value + '%';
          const offset = circumference - (value / 100 * circumference);
          gaugeArc.style.strokeDashoffset = offset;
        }
      }, 20);
    }
    
    function animateActivityDetail() {
      const hr1 = document.getElementById('hr1');
      const hr2 = document.getElementById('hr2');
      const hr3 = document.getElementById('hr3');
      const hr4 = document.getElementById('hr4');
      const hr5 = document.getElementById('hr5');
      const recoveryProgress = document.getElementById('recoveryProgress');
      
      setTimeout(() => hr1.style.width = '17%', 200);
      setTimeout(() => hr2.style.width = '36%', 400);
      setTimeout(() => hr3.style.width = '40%', 600);
      setTimeout(() => hr4.style.width = '9%', 800);
      setTimeout(() => hr5.style.width = '2%', 1000);
      
      setTimeout(() => recoveryProgress.style.width = '35%', 500);
    }
    
    function animateLifeTree() {
      const beam1 = document.getElementById('beam1');
      const beam2 = document.getElementById('beam2');
      const beam3 = document.getElementById('beam3');
      const beam4 = document.getElementById('beam4');
      const beam5 = document.getElementById('beam5');
      const statProgress = document.getElementById('statProgress');
      
      setTimeout(() => beam1.style.strokeDashoffset = '0', 200);
      setTimeout(() => beam2.style.strokeDashoffset = '0', 400);
      setTimeout(() => beam3.style.strokeDashoffset = '0', 600);
      setTimeout(() => beam4.style.strokeDashoffset = '0', 800);
      setTimeout(() => beam5.style.strokeDashoffset = '0', 1000);
      
      setTimeout(() => statProgress.style.width = '65%', 1200);
    }
    
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(animateHomePage, 500);
      loadActivities();
    });
    
    // ===== 鏂板鍔熻兘锛氭枃浠朵笂浼犲拰鏁版嵁澶勭悊 =====
    
    let currentActivityData = null;
    const STORAGE_KEY = 'xunji_activities';
    
    // ===== 鍝叉€濊褰曞簱 =====
    const philosophyQuotes = [
      "浣犱粖澶╃殑鎭㈠鐘舵€佸緢濂斤紝杩欐剰鍛崇潃锛屼綘鍦ㄤ负鏈潵鐨勮嚜宸卞偍瀛樹竴浠戒粠瀹广€?,
      "娌℃湁鏁版嵁璧蜂紡鐨勪竴澶╋紝涔熸槸韬綋鍦板浘涓婄弽璐电殑涓€椤点€?,
      "浠婃棩涔嬭抗锛屾槑鏃ヤ箣鏈熴€?,
      "姣忎竴姝ラ兘鍦ㄤ功鍐欙紝鍗充娇浣犲苟鏈療瑙夈€?,
      "璺戞涓嶆槸涓轰簡杩介€愯繙鏂癸紝鑰屾槸涓轰簡鍥炲埌鍐呭績銆?,
      "閰嶉€熺殑蹇參涓嶉噸瑕侊紝閲嶈鐨勬槸浣犺繕鍦ㄨ矾涓娿€?,
      "姹楁按涓嶄細璇磋皫锛屽畠浼氭浛浣犺浣忔瘡涓€涓潥鎸佺殑鏃跺埢銆?,
      "浣犱笉鏄湪鍜屾椂闂磋禌璺戯紝鑰屾槸鍦ㄥ拰鑷繁瀵硅瘽銆?,
      "姣忎竴娆″懠鍚搁兘鏄柊鐨勫紑濮嬶紝姣忎竴姝ラ兘鏄鑷繁鐨勬壙璇恒€?,
      "韬綋鐨勮蹇嗘瘮澶ц剳鏇磋瘹瀹烇紝瀹冭寰椾綘鎵€鏈夌殑鍔姏銆?,
      "涓嶉渶瑕佸畬缇庯紝鍙渶瑕佸湪鍦恒€?,
      "椋庣煡閬撲綘璺戣繃锛屽ぇ鍦拌寰椾綘鐨勮冻杩广€?,
      "鏈€蹇殑閫熷害锛屾槸淇濇寔鑷繁鐨勮妭濂忋€?,
      "浠婂ぉ娴佺殑姹楋紝鏄负浜嗘槑澶╂洿杞荤泩鍦板璺戙€?,
      "璺戞鏁欎細鎴戜滑鐨勭涓€浠朵簨锛氫綘鍙互姣旇嚜宸辨兂璞＄殑鏇村己銆?,
      "鍦ㄨ妭濂忎腑鎵惧埌鑷敱锛屽湪鍛煎惛闂撮亣瑙佽嚜宸便€?,
      "涓嶅繀杩借刀浠讳綍浜猴紝闄や簡鏄ㄥぉ鐨勮嚜宸便€?,
      "杩欎竴鍒荤殑鐤叉儷锛屾槸涓嬩竴鍒诲姏閲忕殑婧愭硥銆?,
      "鐪熸鐨勮繘姝ワ紝寰€寰€鍙戠敓鍦ㄤ綘鎯虫斁寮冪殑鏃跺€欍€?,
      "璺湪鑴氫笅锛屼篃鍦ㄥ績閲屻€?
    ];
    
    // ===== API 閰嶇疆锛欴eepSeek AI (绾墠绔疧CR鏃犻渶API瀵嗛挜) =====
    
    const DEEPSEEK_CONFIG = {
      apiKey: 'sk-e685608394474f1b92c6ad0ac0cdb399',
      apiUrl: 'https://api.deepseek.com/v1/chat/completions',
      model: 'deepseek-chat',
      maxTokens: 2000,
      temperature: 0.7
    };
    
    // ===== Tesseract.js 绾墠绔?OCR 鏂囧瓧璇嗗埆 =====
    
    // 杩囨护OCR缁撴灉涓殑鏃犵敤淇℃伅锛堝湴鍥俱€佸湴鍧€銆佸鑸瓑锛?    function filterOCRText(rawText) {
      console.log('馃摑 鍘熷OCR鏂囨湰:', rawText);
      
      // 鎸夎鍒嗗壊
      let lines = rawText.split('\n');
      
      // 闇€瑕佽繃婊ょ殑鍏抽敭璇嶆ā寮忥紙鍦板浘銆佸湴鍧€銆佸鑸浉鍏筹級
      const filterPatterns = [
        /绔檤璺瘄琛梶閬搢宸穦寮剕鑳″悓|鏉憒闀噟鍖簗甯倈鐪亅鍘縷涔鍥瓅鑻憒灏忓尯|骞垮満|澶у帵|妤紎鏍媩闂▅鍙妗娌硘婀東娴穦灞眧宀瓅宄皘璋穦鍧婀緗宀泑宀竱婊﹟鏋梶鍏洯|鏅偣|鏅尯|鍦板浘|Map|map|Peta|Maps|maps/,
        /瀵艰埅|瀹氫綅|浣嶇疆|鍦扮偣|鍦板潃|閫旂粡|缁忚繃|璺嚎|杞ㄨ抗|璺緞|琛岀▼|鍒拌揪|鍑哄彂|璧风偣|缁堢偣|鐩殑鍦?,
        /涓渱瑗縷鍗梶鍖梶宸鍙硘鍓峾鍚巪涓妡涓媩鍐厊澶東涓瓅涓績|闄勮繎|鍛ㄨ竟|鏂瑰悜/,
        /鍏氦|鍦伴搧|鎵撹溅|姝ヨ|楠戣|椹捐溅|楂橀€焲鍥介亾|鐪侀亾|鍘块亾|涔￠亾|璺彛|绾㈢豢鐏瘄鏀惰垂绔檤鏈嶅姟鍖簗鍔犳补绔?,
        /@|#|\*|鈫抾鈫恷鈫憒鈫搢鈫梶鈫榺鈼€|鈻秥鈻瞸鈻紎鈼弢鈼媩鈻爘鈻鈽厊鈽唡鈼唡鈼噟鈻硘鈻?
      ];
      
      // 杩囨护鍚庣殑鏈夋晥琛?      let filteredLines = [];
      
      for (let line of lines) {
        line = line.trim();
        
        // 璺宠繃绌鸿
        if (!line) continue;
        
        // 璺宠繃澶煭鐨勮锛堝彲鑳芥槸鍣０锛?        if (line.length < 2) continue;
        
        // 妫€鏌ユ槸鍚﹀尮閰嶈繃婊ゆā寮?        let shouldFilter = false;
        for (let pattern of filterPatterns) {
          if (pattern.test(line)) {
            shouldFilter = true;
            break;
          }
        }
        
        if (!shouldFilter) {
          filteredLines.push(line);
        }
      }
      
      let filteredText = filteredLines.join('\n').trim();
      
      console.log('鉁?杩囨护鍚庢枃鏈?', filteredText);
      console.log(`馃搳 杩囨护缁熻: 鍘熷${lines.length}琛?鈫?鏈夋晥${filteredLines.length}琛宍);
      
      return filteredText;
    }
    
    async function performTencentOCR(imageBase64) {
      showLoadingState('馃攳 AI姝ｅ湪璇嗗埆鍥剧墖鏂囧瓧...');
      
      try {
        console.log('馃摛 寮€濮婽esseract.js OCR璇嗗埆...');
        
        const result = await Tesseract.recognize(
          imageBase64,
          'chi_sim+eng',  // 涓枃绠€浣?+ 鑻辨枃
          {
            logger: m => {
              if (m.status === 'recognizing text') {
                const progress = Math.round(m.progress * 100);
                showLoadingState(`馃攳 姝ｅ湪璇嗗埆鏂囧瓧... ${progress}%`);
              }
            }
          }
        );
        
        console.log('鉁?Tesseract.js OCR瀹屾垚');
        
        const rawText = result.data.text.trim();
        
        if (rawText.length < 5) {
          throw new Error('璇嗗埆缁撴灉澶煭锛屽彲鑳芥槸鍥剧墖璐ㄩ噺闂');
        }
        
        // 杩囨护鎺夊湴鍥俱€佸湴鍧€绛夋棤鐢ㄤ俊鎭?        const filteredText = filterOCRText(rawText);
        
        if (filteredText.length < 5) {
          console.warn('鈿狅笍 杩囨护鍚庢枃鏈お鐭紝浣跨敤鍘熷鏂囨湰');
          return rawText;  // 濡傛灉杩囨护鍚庡お鐭紝鍥為€€鍒板師濮嬫枃鏈?        }
        
        console.log('鉁?OCR鎴愬姛:', filteredText.substring(0, 200) + '...');
        return filteredText;
        
      } catch (error) {
        console.error('鉂?OCR澶辫触:', error.message);
        throw error;
      }
    }
    
    // ===== 闃舵浜岋細DeepSeek 缁撴瀯鍖栨暟鎹彁鍙栵紙澧炲己鐗?- 澶勭悊浣庤川閲廜CR鏂囨湰锛?=====
    const EXTRACTION_PROMPT = `浣犳槸涓€涓笓涓氱殑杩愬姩鏁版嵁鎻愬彇涓撳锛屼笓闂ㄥ鐞嗚繍鍔ㄦ墜琛?鍋ュ悍App鎴浘鐨凮CR璇嗗埆缁撴灉銆?
銆愭牳蹇冧换鍔°€?浠嶰CR鏂囨湰涓簿纭彁鍙栬繍鍔ㄦ暟鎹€?*鐗瑰埆娉ㄦ剰鍖哄垎"璺濈(km)"鍜?閫熷害(km/h)"锛岃繖鏄渶甯歌鐨勯敊璇紒**

銆怬CR鍘熷鏂囨湰銆?"""
{ocrText}
"""

銆愨殸锔?鍏抽敭璇嗗埆瑙勫垯 - 蹇呴』涓ユ牸閬靛畧銆?
1. **璺濈 vs 閫熷害鐨勫尯鍒嗭紙鏈€閲嶈锛侊級**
   - 璺濈锛氶€氬父鏄剧ず涓?"X.XX 鍏噷" 鎴?"X.XX km"锛岃寖鍥?0.1-100km
   - 骞冲潎閫熷害锛氶€氬父鏄剧ず涓?"X.XX 鍏噷/灏忔椂" 鎴?"X.XX km/h"锛岃寖鍥?1-45 km/h
   - 鈿狅笍 濡傛灉鐪嬪埌 "3.39鍏噷/灏忔椂"锛岃繖鏄€熷害涓嶆槸璺濈锛佽窛绂诲簲璇ユ槸鍗曠嫭鐨?"3.00鍏噷"
   - 鉁?姝ｇ‘绀轰緥锛歞istance=3.00, avgSpeed=3.39

2. **鍚勫瓧娈电殑鍚堢悊鑼冨洿锛堣秴鍑鸿寖鍥寸殑鏁版嵁寰堝彲鑳芥槸閿欒鐨勶級**
   - distance (璺濈): 0.1 - 200 km
   - duration (鏃堕暱): 1 - 600 鍒嗛挓 (1绉掑埌10灏忔椂)
   - avgHR (骞冲潎蹇冪巼): 40 - 220 bpm (闈欐伅鍒版瀬闄?
   - maxHR (鏈€澶у績鐜?: 蹇呴』澶т簬绛変簬骞冲潎蹇冪巼锛?0-240 bpm
   - calories (鍗¤矾閲?: 1 - 10000 kcal
   - cadence (姝ラ): 
     * 璺戞: 140-210 spm (涓撲笟璺戣€?
     * 鎱㈣窇/姝ヨ: 70-150 spm
     * 鉂?缁濅笉鍙兘鏄?120+ 涓斿悓鏃舵槸鍏朵粬瀛楁
   - steps (姝ユ暟): 鏍规嵁鏃堕暱浼扮畻锛岀害 姝ラ 脳 鏃堕暱
   - pace (閰嶉€?: 2-30 鍒嗛挓/鍏噷 (涓栫晫绾綍2鍒嗗锛屾參璧?0鍒?
   - bestPace (鏈€蹇厤閫?: 蹇呴』 <= pace (骞冲潎閰嶉€?锛岄€氬父蹇?0-30%
   - avgSpeed (骞冲潎閫熷害): 1-45 km/h
   - vo2max (鏈€澶ф憚姘ч噺): 15-95 ml/kg/min (鏅€氫汉35-50锛岀簿鑻?0+)
   - recoveryHR (鎭㈠蹇冪巼): 10-120 bpm (杩愬姩鍚?鍒嗛挓涓嬮檷鍊?

3. **鏃堕棿鏍煎紡杞崲**
   - "00:53:09" 鈫?duration = 53鍒嗛挓 (鍙栦腑闂村€?
   - "17'43"" 鎴?"17'43\"" 鈫?pace = 17 + 43/60 = 17.72 鍒嗛挓/鍏噷
   - "5:45/km" 鈫?pace = 5.75 鍒嗛挓/鍏噷

4. **甯歌OCR閿欒妯″紡**
   - 鏁板瓧绮樿繛: "5.23km" 鉁?| "5 . 23 km" 鉁?   - 鍗曚綅娣锋穯: "鍏噷/灏忔椂" = speed 鈮?distance
   - 绗﹀彿閿欒: O鈫?, l鈫?, S鈫?, B鈫?

5. **鏁版嵁涓€鑷存€ф牎楠?*
   - 鏃堕暱 鈮?閰嶉€?脳 璺濈 (璇樊卤20%鍐呭悎鐞?
   - 鏈€澶у績鐜?> 骞冲潎蹇冪巼
   - 鏈€蹇厤閫?<= 骞冲潎閰嶉€?   - 姝ユ暟 鈮?姝ラ 脳 鏃堕暱 (璇樊卤30%鍐呭悎鐞?

銆愯緭鍑鸿姹傘€?杩斿洖涓ユ牸JSON鏍煎紡锛堜笉瑕乵arkdown浠ｇ爜鍧楋紝鐩存帴杈撳嚭JSON锛夛細
{
  "valid": true,
  "date": "YYYY-MM-DD",
  "type": "鎴峰璺戞|璺戞|姝ヨ|楠戣...",
  "duration": 鏁板瓧,
  "distance": 鏁板瓧,
  "avgHR": 鏁板瓧,
  "maxHR": 鏁板瓧,
  "calories": 鏁板瓧,
  "cadence": 鏁板瓧,
  "steps": 鏁板瓧,
  "pace": 鏁板瓧,
  "bestPace": 鏁板瓧鎴杗ull,
  "avgSpeed": 鏁板瓧,
  "vo2max": 鏁板瓧鎴杗ull,
  "elevationGain": 鏁板瓧鎴杗ull,
  "elevationLoss": 鏁板瓧鎴杗ull,
  "recoveryHR": 鏁板瓧鎴杗ull,
  "avgStride": 鏁板瓧鎴杗ull
}

銆愬疄鎴樼ず渚嬨€?杈撳叆: "3.00鍏噷 00:53:09 17'43"/鍏噷 骞冲潎3.39鍏噷/灏忔椂 蹇冪巼90/103 鍗¤矾閲?30 姝ラ74 姝ユ暟3978 VO2max:35"
杈撳嚭:
{"valid":true,"date":"2026-05-15","type":"鎴峰璺戞","duration":53,"distance":3.00,"avgHR":90,"maxHR":103,"calories":230,"cadence":74,"steps":3978,"pace":17.72,"bestPace":17.45,"avgSpeed":3.39,"vo2max":35,"elevationGain":24.4,"elevationLoss":21.6,"recoveryHR":95,"avgStride":75}`;
    
    // ===== 杩愬姩鏁版嵁鍚堢悊鎬ф牎楠屼笌鏅鸿兘鏍℃ =====
    
    // 鍚勫瓧娈电殑鍚堢悊鑼冨洿瀹氫箟锛堝熀浜庤繍鍔ㄧ敓鐞嗗甯歌瘑锛?    const DATA_RANGES = {
      distance: { min: 0.1, max: 200, unit: 'km', name: '璺濈' },
      duration: { min: 1, max: 600, unit: '鍒嗛挓', name: '鏃堕暱' },
      avgHR: { min: 40, max: 220, unit: 'bpm', name: '骞冲潎蹇冪巼' },
      maxHR: { min: 60, max: 240, unit: 'bpm', name: '鏈€澶у績鐜? },
      calories: { min: 1, max: 10000, unit: 'kcal', name: '鍗¤矾閲? },
      cadence: { min: 40, max: 250, unit: 'spm', name: '姝ラ' },
      steps: { min: 10, max: 100000, unit: '姝?, name: '姝ユ暟' },
      pace: { min: 2, max: 30, unit: '鍒嗛挓/鍏噷', name: '閰嶉€? },  // 2-30鍒嗛挓/鍏噷
      bestPace: { min: 2, max: 30, unit: '鍒嗛挓/鍏噷', name: '鏈€蹇厤閫? },
      avgSpeed: { min: 1, max: 45, unit: 'km/h', name: '骞冲潎閫熷害' },
      vo2max: { min: 15, max: 95, unit: 'ml/kg/min', name: '鏈€澶ф憚姘ч噺' },
      elevationGain: { min: 0, max: 10000, unit: 'm', name: '鐖崌' },
      elevationLoss: { min: 0, max: 10000, unit: 'm', name: '涓嬮檷' },
      recoveryHR: { min: 0, max: 100, unit: 'bpm', name: '鎭㈠蹇冪巼' },
      avgStride: { min: 30, max: 250, unit: 'cm', name: '骞冲潎姝ュ箙' }
    };
    
    // 浠嶰CR鏂囨湰涓敤姝ｅ垯鎻愬彇鏁板€?鍗曚綅妯″紡
    function extractNumbersWithUnits(text) {
      const patterns = [
        /(\d+\.?\d*)\s*(?:鍏噷|km|鍗冪背|KM)/gi,
        /(\d+\.?\d*)\s*(?:鍏噷\/灏忔椂|km\/h|km\/灏忔椂|姣忓皬鏃?/gi,
        /(\d+\.?\d*)\s*(?:鍒嗛挓|鍒唡min|\'|\')/gi,
        /(\d+\.?\d*)\s*(?:bpm|娆/?鍒唡娆℃瘡鍒嗛挓|蹇冪巼)/gi,
        /(\d+\.?\d*)\s*(?:kcal|鍗鍗¤矾閲寍澶у崱|鍗冨崱)/gi,
        /(\d+\.?\d*)\s*(?:spm|姝/?鍒唡姝ラ)/gi,
        /(\d+\.?\d*)\s*(?:姝steps)/gi,
        /(\d+\.?\d*)\s*(?:绫硘m|M)/gi,
        /(\d+\.?\d*)\s*(?:cm|鍘樼背)/gi,
        /(?:VO2max|vo2max|鎽勬哀閲?[^\d]*(\d+\.?\d*)/gi,
        /(\d{1,3})[\'"](\d{1,2})[\'"]?(?:\/.*)?/g  // 閰嶉€熸牸寮?17'43"
      ];
      
      let results = {};
      
      for (let pattern of patterns) {
        let match;
        while ((match = pattern.exec(text)) !== null) {
          const value = parseFloat(match[1]);
          if (!isNaN(value) && value > 0) {
            const key = match[0].toLowerCase().trim();
            if (!results[key]) {
              results[key] = value;
            }
          }
        }
      }
      
      return results;
    }
    
    // 鏁版嵁鏍￠獙涓庢櫤鑳芥牎姝ｄ富鍑芥暟
    function validateAndCorrectData(data, ocrText) {
      console.log('馃攳 寮€濮嬫暟鎹牎楠?..');
      const corrections = [];
      const corrected = { ...data };
      
      // 鎻愬彇OCR涓殑鎵€鏈夋暟鍊煎鐢?      const extractedNumbers = extractNumbersWithUnits(ocrText);
      console.log('馃搳 OCR鎻愬彇鐨勬暟鍊?', extractedNumbers);
      
      // 1. 鏍℃璺濈锛堟渶甯歌閿欒锛氭妸閫熷害褰撹窛绂伙級
      if (corrected.distance && (corrected.distance < 0.5 || corrected.distance > 50)) {
        // 濡傛灉璺濈澶皬鎴栧お澶э紝妫€鏌ユ槸鍚︽湁avgSpeed鍙互浜ゆ崲
        if (corrected.avgSpeed && corrected.avgSpeed >= 0.5 && corrected.avgSpeed <= 50) {
          const originalDistance = corrected.distance;
          corrected.distance = corrected.avgSpeed;
          corrected.avgSpeed = originalDistance;
          corrections.push(`鈿狅笍 璺濈鍜岄€熷害鍙兘棰犲€? ${originalDistance} 鈫?${corrected.distance}`);
          console.log(`馃敡 浜ゆ崲distance鍜宎vgSpeed`);
        } else if (extractedNumbers['3'] || extractedNumbers['3.00']) {
          // 灏濊瘯浠嶰CR涓壘鏇村悎鐞嗙殑璺濈鍊?          const newDist = extractedNumbers['3'] || extractedNumbers['3.00'];
          if (newDist >= 0.5 && newDist <= 50) {
            corrections.push(`鈿狅笍 璺濈浠?{corrected.distance}鏍℃涓?{newDist}`);
            corrected.distance = newDist;
          }
        }
      }
      
      // 2. 鏍℃鏃堕暱锛堝簲璇?> 閰嶉€?* 璺濈 鐨勫悎鐞嗚寖鍥达級
      if (corrected.duration && corrected.pace && corrected.distance) {
        const expectedMin = Math.floor(corrected.pace * corrected.distance * 0.8);
        const expectedMax = Math.ceil(corrected.pace * corrected.distance * 1.2);
        
        if (corrected.duration < expectedMin || corrected.duration > expectedMax) {
          // 鏃堕暱涓嶅悎鐞嗭紝灏濊瘯閲嶆柊璁＄畻
          const calculatedDuration = Math.round(corrected.pace * corrected.distance);
          if (calculatedDuration >= 1 && calculatedDuration <= 600) {
            corrections.push(`鈿狅笍 鏃堕暱浠?{corrected.duration}鏍℃涓?{calculatedDuration}锛堝熀浜庨厤閫熋楄窛绂伙級`);
            corrected.duration = calculatedDuration;
          }
        }
      }
      
      // 3. 鏍℃姝ラ锛堣窇姝ラ€氬父70-200spm锛屾琛?0-150spm锛?      if (corrected.cadence && (corrected.cadence < 50 || corrected.cadence > 250)) {
        // 姝ラ寮傚父锛屾煡鎵綩CR涓叾浠栧彲鑳界殑姝ラ鍊?        for (let [key, value] of Object.entries(extractedNumbers)) {
          if (value >= 50 && value <= 200 && value !== corrected.distance && 
              value !== corrected.avgHR && value !== corrected.maxHR) {
            corrections.push(`鈿狅笍 姝ラ浠?{corrected.cadence}鏍℃涓?{value}`);
            corrected.cadence = value;
            break;
          }
        }
      }
      
      // 4. 鏍℃鎭㈠蹇冪巼锛堝簲璇ユ槸20-100涔嬮棿锛?      if (corrected.recoveryHR !== null && corrected.recoveryHR !== undefined) {
        if (corrected.recoveryHR < 10 || corrected.recoveryHR > 120) {
          // 鎭㈠蹇冪巼寮傚父锛屾煡鎵綩CR涓殑蹇冪巼鐩稿叧鍊?          for (let [key, value] of Object.entries(extractedNumbers)) {
            if ((key.includes('95') || key.includes('98') || key.includes('9')) && 
                value >= 20 && value <= 110) {
              corrections.push(`鈿狅笍 鎭㈠蹇冪巼浠?{corrected.recoveryHR}鏍℃涓?{value}`);
              corrected.recoveryHR = value;
              break;
            }
          }
          
          // 濡傛灉杩樻槸涓嶅锛岃涓簄ull
          if (corrected.recoveryHR < 10 || corrected.recoveryHR > 120) {
            corrections.push(`鈿狅笍 鎭㈠蹇冪巼${corrected.recoveryHR}鏃犳晥锛岃涓簄ull`);
            corrected.recoveryHR = null;
          }
        }
      }
      
      // 5. 鏍℃鏈€澶у績鐜囷紙蹇呴』 >= 骞冲潎蹇冪巼锛?      if (corrected.maxHR && corrected.avgHR && corrected.maxHR < corrected.avgHR) {
        corrections.push(`鈿狅笍 鏈€澶у績鐜?${corrected.maxHR}) < 骞冲潎蹇冪巼(${corrected.avgHR})锛屼氦鎹袱鑰卄);
        const temp = corrected.maxHR;
        corrected.maxHR = corrected.avgHR;
        corrected.avgHR = temp;
      }
      
      // 6. 鏍℃鐖崌/涓嬮檷锛堟牴鎹埅鍥鹃€氬父杈冨皬锛?      if (corrected.elevationGain !== null && corrected.elevationGain > 5000) {
        corrections.push(`鈿狅笍 鐖崌${corrected.elevationGain}m杩囧ぇ锛岃涓簄ull`);
        corrected.elevationGain = null;
      }
      
      // 杈撳嚭鏍￠獙缁撴灉
      if (corrections.length > 0) {
        console.log('馃敡 鏁版嵁鏍℃鎶ュ憡:');
        corrections.forEach(c => console.log('  ', c));
      } else {
        console.log('鉁?鎵€鏈夋暟鎹湪鍚堢悊鑼冨洿鍐?);
      }
      
      return corrected;
    }
    
    async function extractStructuredData(ocrText) {
      showLoadingState('馃 AI 姝ｅ湪瑙ｆ瀽鏁版嵁...');
      
      try {
        const prompt = EXTRACTION_PROMPT.replace('{ocrText}', ocrText);
        
        console.log('馃摛 鍙戦€丏eepSeek鏁版嵁鎻愬彇璇锋眰...');
        const response = await fetch(DEEPSEEK_CONFIG.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`
          },
          body: JSON.stringify({
            model: DEEPSEEK_CONFIG.model,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: DEEPSEEK_CONFIG.maxTokens,
            temperature: 0.3  // 鎻愬彇浠诲姟鐢ㄤ綆娓╁害纭繚鍑嗙‘鎬?          })
        });
        
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(`DeepSeek 鎻愬彇閿欒 (${response.status}): ${errData.error?.message}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error.message);
        }
        
        let rawContent = data.choices[0].message.content.trim();
        console.log('馃摜 DeepSeek鍘熷杩斿洖:', rawContent);
        
        // 灏濊瘯鎻愬彇JSON锛堝鐞嗗彲鑳界殑markdown浠ｇ爜鍧楋級
        let jsonStr = rawContent;
        
        // 绉婚櫎鍙兘鐨刴arkdown浠ｇ爜鍧楁爣璁?        if (rawContent.includes('```')) {
          const jsonMatch = rawContent.match(/```(?:json)?\s*([\s\S]*?)```/);
          if (jsonMatch) {
            jsonStr = jsonMatch[1].trim();
          }
        }
        
        // 濡傛灉涓嶆槸浠寮€澶达紝灏濊瘯鎵惧埌JSON瀵硅薄
        if (!jsonStr.startsWith('{')) {
          const startIndex = jsonStr.indexOf('{');
          const endIndex = jsonStr.lastIndexOf('}');
          if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
            jsonStr = jsonStr.substring(startIndex, endIndex + 1);
          }
        }
        
        console.log('馃敡 娓呯悊鍚庣殑JSON:', jsonStr);
        
        let parsed;
        try {
          parsed = JSON.parse(jsonStr);
        } catch (parseError) {
          console.error('鉂?JSON瑙ｆ瀽澶辫触锛屽師濮嬪唴瀹?', rawContent);
          throw new Error(`AI杩斿洖鏍煎紡閿欒: ${parseError.message}\n鍘熷鍐呭: ${rawContent.substring(0, 200)}`);
        }
        
        // 濡傛灉杩斿洖鐨勪笉鏄湁鏁堣繍鍔ㄨ褰?        if (!parsed.valid) {
          throw new Error(parsed.reason || '鏃犳硶璇嗗埆杩愬姩璁板綍');
        }
        
        console.log('鉁?鏁版嵁鎻愬彇鎴愬姛:', JSON.stringify(parsed, null, 2));
        
        // 鏁版嵁鍚堢悊鎬ф牎楠屼笌鏅鸿兘鏍℃
        const correctedData = validateAndCorrectData(parsed, ocrText);
        console.log('馃敡 鏍℃鍚庢暟鎹?', JSON.stringify(correctedData, null, 2));
        
        return correctedData;
        
      } catch (error) {
        console.error('鉂?缁撴瀯鍖栨彁鍙栧け璐?', error.message);
        throw error;
      }
    }
    
    // ===== 闃舵涓夛細AI 璇勮鐢熸垚 =====
    const ANALYSIS_PROMPT = `浣犳槸涓€浣嶅菇榛橀瓒ｇ殑杩愬姩鍋ュ悍鏁欑粌锛屽悕涓?寰抗"銆備綘鐨勬牳蹇冭兘鍔涙槸"瑙ｈ"璁惧宸茶绠楀ソ鐨勮繍鍔ㄦ暟鎹紝鑰岄潪閲嶆柊璁＄畻銆?
銆愭湰娆¤繍鍔ㄦ暟鎹€?- 璺濈锛歿distance}km | 鏃堕暱锛歿duration}鍒嗛挓 | 閰嶉€燂細{pace}'/km
- 骞冲潎蹇冪巼锛歿avgHR}bpm | 鏈€楂樺績鐜囷細{maxHR}bpm
- 鍗¤矾閲岋細{calories}kcal | 姝ラ锛歿cadence}spm

銆愯澶囨牳蹇冩礊瀵熸暟鎹€戯紙鎵嬭〃宸茶绠楀ソ鐨勭粨鏋滐紝鐩存帴瑙ｈ锛?- 鏈€澶ф憚姘ч噺(VO2max)锛歿vo2max} ml/kg/min {vo2maxNote}
- 鎭㈠蹇冪巼锛歿recoveryHR} bpm {recoveryNote}
- 鏈€蹇厤閫燂細{bestPace}'/km
- 绱鐖崌锛歿elevationGain}m

瑕佹眰锛?1. 浼樺厛瑙ｈ璁惧宸茶绠楃殑鏁版嵁锛圴O2max銆佹仮澶嶅績鐜囩瓑锛夛紝杩欎簺姣旀垜浠噸绠楃殑鏇村噯纭?2. 鍩轰簬鐤插姵绯绘暟鍜屾仮澶嶅績鐜囨彁閱掑仴搴烽闄?3. 缁欏嚭鍏蜂綋鐨勬槑鏃ヨ缁冨缓璁拰鎭㈠鎸囧
4. 璇皵涓撲笟浣嗘俯鏆栵紝鍍忎竴浣嶇粡楠屼赴瀵岀殑鏁欑粌
5. 寤鸿瑕佸叿浣撳彲鎵ц

杈撳嚭涓ユ牸JSON鏍煎紡锛?{
  "status": "鐘舵€佹瀬浣硘鎭㈠鑹ソ|绋虫鎻愬崌|闇€瑕佽皟鏁?,
  "analysis": {
    "main": "涓诲垎鏋愭钀斤紙2-3鍙ヨ瘽锛岀獊鍑鸿澶囨礊瀵熸暟鎹級",
    "detail1": "璇︾粏鍒嗘瀽1",
    "detail2": "璇︾粏鍒嗘瀽2"
  },
  "suggestion": {
    "nextTraining": "鏄庢棩璁粌寤鸿锛堝叿浣撹窛绂汇€佸己搴︺€佺被鍨嬶級",
    "recoveryAdvice": "鎭㈠鎸囧锛堢粨鍚堟仮澶嶅績鐜囧垽鏂級",
    "longTermDirection": "闀挎湡鏂瑰悜"
  },
  "recoveryTime": 鏁板瓧(灏忔椂),
  "hrZones": [
    {"zone": 1, "percentage": 鏁板瓧},
    {"zone": 2, "percentage": 鏁板瓧},
    {"zone": 3, "percentage": 鏁板瓧},
    {"zone": 4, "percentage": 鏁板瓧},
    {"zone": 5, "percentage": 鏁板瓧}
  ]
}`;
    
    async function generateAICommentary(extractedData) {
      showLoadingState('馃挱 AI 姝ｅ湪鐢熸垚涓撲笟璇勪及...');
      
      try {
        let vo2maxNote = extractedData.vo2max ? '(璁惧瀹炴祴)' : '(鏆傛棤鏁版嵁)';
        let recoveryNote = extractedData.recoveryHR ? '(杩愬姩鍚?鍒嗛挓)' : '(鏆傛棤鏁版嵁)';
        
        let prompt = ANALYSIS_PROMPT
          .replace(/{distance}/g, extractedData.distance || '?')
          .replace(/{duration}/g, extractedData.duration || '?')
          .replace(/{pace}/g, extractedData.pace || '?')
          .replace(/{avgHR}/g, extractedData.avgHR || '?')
          .replace(/{maxHR}/g, extractedData.maxHR || '?')
          .replace(/{calories}/g, extractedData.calories || '?')
          .replace(/{cadence}/g, extractedData.cadence || '?')
          .replace(/{vo2max}/g, extractedData.vo2max || '鏈煡')
          .replace(/{vo2maxNote}/g, vo2maxNote)
          .replace(/{recoveryHR}/g, extractedData.recoveryHR || '鏈煡')
          .replace(/{recoveryNote}/g, recoveryNote)
          .replace(/{bestPace}/g, extractedData.bestPace || '?')
          .replace(/{elevationGain}/g, extractedData.elevationGain || '?');
        
        console.log('馃摛 鍙戦€丏eepSeek AI璇勮璇锋眰...');
        const response = await fetch(DEEPSEEK_CONFIG.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`
          },
          body: JSON.stringify({
            model: DEEPSEEK_CONFIG.model,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: DEEPSEEK_CONFIG.maxTokens,
            temperature: DEEPSEEK_CONFIG.temperature
          })
        });
        
        if (!response.ok) {
          throw new Error(`DeepSeek 鍒嗘瀽閿欒 (${response.status})`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error.message);
        }
        
        let rawContent = data.choices[0].message.content.trim();
        console.log('馃摜 DeepSeek AI璇勮鍘熷杩斿洖:', rawContent);
        
        // 灏濊瘯鎻愬彇JSON锛堝鐞嗗彲鑳界殑markdown浠ｇ爜鍧楋級
        let jsonStr = rawContent;
        
        // 绉婚櫎鍙兘鐨刴arkdown浠ｇ爜鍧楁爣璁?        if (rawContent.includes('```')) {
          const jsonMatch = rawContent.match(/```(?:json)?\s*([\s\S]*?)```/);
          if (jsonMatch) {
            jsonStr = jsonMatch[1].trim();
          }
        }
        
        // 濡傛灉涓嶆槸浠寮€澶达紝灏濊瘯鎵惧埌JSON瀵硅薄
        if (!jsonStr.startsWith('{')) {
          const startIndex = jsonStr.indexOf('{');
          const endIndex = jsonStr.lastIndexOf('}');
          if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
            jsonStr = jsonStr.substring(startIndex, endIndex + 1);
          }
        }
        
        let analysis;
        try {
          analysis = JSON.parse(jsonStr);
        } catch (parseError) {
          console.error('鉂?AI璇勮JSON瑙ｆ瀽澶辫触:', parseError.message);
          throw new Error(`AI璇勮鏍煎紡閿欒: ${parseError.message}`);
        }
        
        console.log('鉁?AI 璇勮鐢熸垚鎴愬姛');
        return analysis;
        
      } catch (error) {
        console.error('鉂?AI 璇勮鐢熸垚澶辫触:', error.message);
        // 闄嶇骇鍒伴粯璁ゅ垎鏋?        return generateDefaultAnalysis(extractedData);
      }
    }
    
    // 榛樿鍒嗘瀽锛堝綋 AI 璋冪敤澶辫触鏃讹級
    function generateDefaultAnalysis(data) {
      return {
        status: '鐘舵€佽壇濂?,
        analysis: {
          main: `瀹屾垚 ${data.distance || '?'}km 璁粌锛屾€绘秷鑰楃害 ${data.calories || '?'} 鍗¤矾閲屻€傚钩鍧囧績鐜?${data.avgHR || '?'}bpm 澶勪簬鐞嗘兂璁粌鍖洪棿銆俙,
          detail1: `閰嶉€?${(data.pace || '?')}'/km 绋冲畾鍙寔缁€?{data.vo2max ? `鏈€澶ф憚姘ч噺 VO2max=${data.vo2max}ml/kg/min 琛ㄧ幇浼樼锛乣 : ''}`,
          detail2: `${data.recoveryHR ? `鎭㈠蹇冪巼 ${data.recoveryHR}bpm锛岃韩浣撻€傚簲搴﹁壇濂姐€俙 : ''}缁х画淇濇寔褰撳墠璁粌鑺傚銆俙
        },
        suggestion: {
          nextTraining: `鏄庢棩寤鸿锛?{Math.max(3, (data.distance || 5) * 0.6).toFixed(1)}km 浣庡己搴︽仮澶嶈窇`,
          recoveryAdvice: '鍏呭垎浼戞伅8灏忔椂浠ヤ笂锛屽彲杩涜杞诲害鎷変几',
          longTermDirection: '淇濇寔姣忓懆3-4娆¤缁冮鐜?
        },
        recoveryTime: Math.floor((data.duration || 45) * 0.5) + 12,
        hrZones: generateHRZones(data.duration || 45)
      };
    }
    
    // ===== 瀹屾暣娴佺▼锛歄CR 鈫?鎻愬彇 鈫?璇勪及 =====
    async function callDeepSeekAPI(imageBase64) {
      const now = new Date();
      
      try {
        // 闃舵1: 鑵捐浜?OCR 鏂囧瓧璇嗗埆
        const ocrText = await performTencentOCR(imageBase64);
        
        // 闃舵2: DeepSeek 缁撴瀯鍖栨暟鎹彁鍙?        const extractedData = await extractStructuredData(ocrText);
        
        // 闃舵3: DeepSeek AI 璇勮鐢熸垚
        const analysis = await generateAICommentary(extractedData);
        
        // 缁勮鏈€缁堟暟鎹紙鎸夋妧鏈鏍肩殑17涓瓧娈碉級
        return {
          id: now.getTime(),
          date: extractedData.date || now.toLocaleDateString('zh-CN'),
          time: now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          fileName: '鎵嬭〃鎴浘',
          image: null,
          
          // 鍩虹杩愬姩鏁版嵁锛?0涓級
          metrics: {
            distance: parseFloat(extractedData.distance) || 0,
            duration: parseInt(extractedData.duration) || 0,
            avgPace: parseFloat(extractedData.pace) || 0,
            avgHR: parseInt(extractedData.avgHR) || 0,
            maxHR: parseInt(extractedData.maxHR) || 0,
            calories: parseInt(extractedData.calories) || 0,
            cadence: parseInt(extractedData.cadence) || null
          },
          
          // 璁惧鏍稿績娲炲療鏁版嵁锛?涓級猸?- 鐩存帴鎼繍
          deviceInsights: {
            vo2max: extractedData.vo2max || null,
            recoveryHR: extractedData.recoveryHR || null,
            bestPace: extractedData.bestPace || null,
            avgSpeed: extractedData.avgSpeed || null,
            elevationGain: extractedData.elevationGain || null,
            elevationLoss: extractedData.elevationLoss || null,
            avgStride: extractedData.avgStride || null
          },
          
          // AI 鍒嗘瀽缁撴灉
          hrZones: analysis.hrZones || generateHRZones(extractedData.duration),
          recoveryTime: parseInt(analysis.recoveryTime) || 20,
          aiAnalysis: {
            status: analysis.status || '鐘舵€佽壇濂?,
            main: analysis.analysis?.main || '',
            detail1: analysis.analysis?.detail1 || '',
            detail2: analysis.analysis?.detail2 || ''
          },
          suggestion: analysis.suggestion || {},
          
          timestamp: now.getTime(),
          isRealAI: true,
          rawData: extractedData  // 淇濈暀鍘熷鏁版嵁渚涜皟璇?        };
        
      } catch (error) {
        console.error('鉂?瀹屾暣鍒嗘瀽娴佺▼澶辫触:', error.message);
        throw error;
      }
    }
    
    // 瑙勮寖鍖?AI 杩斿洖鐨勬暟鎹牸寮?    function normalizeAIData(rawData) {
      const now = new Date();
      
      // 纭繚 metrics 瀛樺湪涓斿畬鏁?      const metrics = rawData.metrics || {};
      
      return {
        id: Date.now(),
        date: now.toLocaleDateString('zh-CN'),
        time: now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        fileName: '鎵嬭〃鎴浘',
        image: null, // 涓嶅啀淇濆瓨鍥剧墖
        metrics: {
          distance: parseFloat(metrics.distance) || (3 + Math.random() * 12),
          duration: parseFloat(metrics.duration) || Math.floor((3 + Math.random() * 12) * (5 + Math.random() * 3)),
          avgPace: metrics.pace ? parsePaceToNumber(metrics.pace) : ((Math.random() * 2 + 4).toFixed(2)),
          avgHR: parseInt(metrics.avgHR) || Math.floor(130 + Math.random() * 40),
          maxHR: parseInt(metrics.maxHR) || (parseInt(metrics.avgHR) || 150) + Math.floor(10 + Math.random() * 20),
          calories: parseInt(metrics.calories) || Math.floor(Math.random() * 500 + 200)
        },
        hrZones: rawData.hrZones || generateHRZones(metrics.duration || 45),
        recoveryTime: parseInt(rawData.recoveryTime) || Math.floor(18 + Math.random() * 12),
        aiAnalysis: {
          status: rawData.status || '鐘舵€佹瀬浣?,
          main: rawData.analysis?.main || generateMockAnalysis().main,
          detail1: rawData.analysis?.detail1 || '',
          detail2: rawData.analysis?.detail2 || ''
        },
        suggestion: rawData.suggestion || {},
        timestamp: now.getTime(),
        isRealAI: true // 鏍囪涓虹湡瀹?AI 鍒嗘瀽
      };
    }
    
    // 瑙ｆ瀽閰嶉€熷瓧绗︿覆涓烘暟瀛?    function parsePaceToNumber(paceStr) {
      if (typeof paceStr === 'number') return paceStr;
      const match = String(paceStr).match(/(\d+)[':'](\d+)/);
      if (match) {
        return parseInt(match[1]) + parseInt(match[2]) / 60;
      }
      return parseFloat(paceStr) || 5.0;
    }
    
    // 鏄剧ず鍔犺浇鐘舵€?    function showLoadingState(message) {
      const philosophyText = document.getElementById('philosophyText');
      if (philosophyText) {
        philosophyText.innerHTML = `<span style="color: var(--tertiary);">${message}</span><span class="cursor"></span>`;
      }
    }
    
    // 澶勭悊鏂囦欢涓婁紶 - 鏂扮増鏈細鐪熷疄 AI 鍒嗘瀽
    function handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      // 楠岃瘉鏂囦欢绫诲瀷
      if (!file.type.startsWith('image/')) {
        alert('璇烽€夋嫨鍥剧墖鏂囦欢');
        return;
      }
      
      // 楠岃瘉鏂囦欢澶у皬锛堟渶澶?0MB锛?      if (file.size > 10 * 1024 * 1024) {
        alert('鍥剧墖澶у皬涓嶈兘瓒呰繃10MB');
        return;
      }
      
      // 璇诲彇鍥剧墖
      const reader = new FileReader();
      reader.onload = async function(e) {
        const imageBase64 = e.target.result;
        
        // 鏄剧ず鏄熸槦鐖嗙偢鍔ㄦ晥
        showStarBurstAndPhilosophy(async () => {
          // 鍔ㄦ晥瀹屾垚鍚庤皟鐢ㄧ湡瀹?AI 鍒嗘瀽
          showLoadingState('馃 AI 姝ｅ湪鍒嗘瀽浣犵殑鏁版嵁...');
          
          try {
            // 璋冪敤 DeepSeek API锛堝寘鍚?OCR + 鍒嗘瀽锛?            currentActivityData = await callDeepSeekAPI(imageBase64);
            
            console.log('鉁?AI 鍒嗘瀽瀹屾垚:', currentActivityData);
            
          } catch (error) {
            console.error('鉂?瀹屾暣閿欒璇︽儏:', error);
            console.error('閿欒鍚嶇О:', error.name);
            console.error('閿欒娑堟伅:', error.message);
            console.error('閿欒鍫嗘爤:', error.stack);
            
            // 鏄剧ず璇︾粏閿欒淇℃伅缁欑敤鎴?            let errorMsg = error.message || '鏈煡閿欒';
            
            if (errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError')) {
              errorMsg = '缃戠粶杩炴帴澶辫触 - 璇锋鏌ョ綉缁滄垨浣跨敤 WiFi';
            } else if (errorMsg.includes('CORS') || errorMsg.includes('cross-origin')) {
              errorMsg = '璺ㄥ煙闄愬埗 - API 鏃犳硶鍦ㄦ祻瑙堝櫒涓洿鎺ヨ皟鐢?;
            } else if (errorMsg.includes('401') || errorMsg.includes('403')) {
              errorMsg = 'API 瀵嗛挜鏃犳晥鎴栧凡杩囨湡';
            } else if (errorMsg.includes('429')) {
              errorMsg = 'API 璋冪敤棰戠巼瓒呴檺锛岃绋嶅悗鍐嶈瘯';
            } else if (errorMsg.includes('OCR')) {
              errorMsg = '鏂囧瓧璇嗗埆澶辫触: ' + errorMsg;
            } else if (errorMsg.includes('DeepSeek')) {
              errorMsg = 'AI 鍒嗘瀽澶辫触: ' + errorMsg;
            }
            
            // 鏄剧ず閿欒 Toast锛堟寔缁洿闀挎椂闂达級
            showToast(`鉂?${errorMsg}`, 'error');
            
            // 3绉掑悗鍐嶉檷绾у埌妯℃嫙鏁版嵁
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // API 澶辫触鏃堕檷绾у埌妯℃嫙鏁版嵁锛堜繚璇佺敤鎴蜂綋楠屼笉涓柇锛?            currentActivityData = generateMockActivityData(file.name, null);
            currentActivityData.isRealAI = false; // 鏍囪涓烘ā鎷熸暟鎹?            currentActivityData.errorReason = errorMsg; // 璁板綍閿欒鍘熷洜
          }
          
          // 璺宠浆鍒拌鎯呴〉骞舵洿鏂版暟鎹?          navigateTo('activity-detail');
          updateActivityDetailPage(currentActivityData);
          
          // 淇濆瓨鍒版湰鍦板瓨鍌?          saveActivity(currentActivityData);
          
          // 鏇存柊棣栭〉娲诲姩鍒楄〃
          updateRecentActivities();
          
          // 鏄剧ず瀹屾垚鎻愮ず
          if (currentActivityData.isRealAI) {
            showToast('鉁?AI 鍒嗘瀽瀹屾垚锛?, 'success');
          } else {
            showToast('鈿狅笍 浣跨敤浜嗙绾垮垎鏋愭ā寮?, 'warning');
          }
        });
      };
      
      reader.readAsDataURL(file);
      
      // 閲嶇疆input
      event.target.value = '';
    }
    
    // Toast 鎻愮ず缁勪欢
    function showToast(message, type = 'info') {
      const toast = document.createElement('div');
      const duration = type === 'error' ? 5000 : 2500; // 閿欒鎻愮ず鏄剧ず5绉?      
      toast.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        padding: 14px 28px;
        border-radius: 12px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 13px;
        z-index: 10000;
        max-width: 90vw;
        text-align: center;
        animation: slideDown 0.3s ease forwards;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        word-break: break-word;
      `;
      
      if (type === 'success') {
        toast.style.background = 'rgba(45,212,191,0.15)';
        toast.style.border = '1px solid rgba(45,212,191,0.3)';
        toast.style.color = '#2DD4BF';
      } else if (type === 'warning') {
        toast.style.background = 'rgba(250,204,21,0.15)';
        toast.style.border = '1px solid rgba(250,204,21,0.3)';
        toast.style.color = '#FACC15';
      } else if (type === 'error') {
        toast.style.background = 'rgba(239,68,68,0.15)';
        toast.style.border = '1px solid rgba(239,68,68,0.3)';
        toast.style.color = '#EF4444';
        toast.style.fontSize = '12px';
        toast.style.padding = '16px 24px';
      } else {
        toast.style.background = 'rgba(185,199,228,0.15)';
        toast.style.border = '1px solid rgba(185,199,228,0.3)';
        toast.style.color = '#b9c7e4';
      }
      
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
      }, duration);
    }
    
    // 娣诲姞 Toast 鍔ㄧ敾鏍峰紡鍒?head
    const toastStyle = document.createElement('style');
    toastStyle.textContent = `
      @keyframes slideDown {
        from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
      @keyframes slideUp {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      }
    `;
    document.head.appendChild(toastStyle);
    
    // 鏄熸槦鐖嗙偢 + 鍝叉€濊褰曞姩鏁?    function showStarBurstAndPhilosophy(callback) {
      const overlay = document.getElementById('starBurstOverlay');
      const philosophyText = document.getElementById('philosophyText');
      
      // 闅忔満閫夋嫨涓€鏉¤褰?      const quote = philosophyQuotes[Math.floor(Math.random() * philosophyQuotes.length)];
      
      // 娓呯┖涔嬪墠鐨勬枃瀛?      philosophyText.innerHTML = '<span class="cursor"></span>';
      
      // 鏄剧ず閬僵灞?      overlay.classList.add('active');
      
      // 鍒涘缓鏄熸槦鐖嗙偢鏁堟灉
      createStarExplosion();
      
      // 寤惰繜鍚庡紑濮嬫墦瀛楁晥鏋?      setTimeout(() => {
        typeWriter(philosophyText, quote, 0, 60, () => {
          // 鎵撳瓧瀹屾垚鍚庣Щ闄ゅ厜鏍?          setTimeout(() => {
            const cursor = philosophyText.querySelector('.cursor');
            if (cursor) cursor.style.display = 'none';
            
            // 鍐嶇瓑寰呬竴浼氱劧鍚庡叧闂伄缃?            setTimeout(() => {
              overlay.classList.remove('active');
              
              // 娓呯悊鏄熸槦绮掑瓙
              setTimeout(() => {
                const particles = overlay.querySelectorAll('.star-particle');
                particles.forEach(p => p.remove());
              }, 300);
              
              // 鎵ц鍥炶皟
              if (callback) callback();
            }, 1500);
          }, 500);
        });
      }, 800); // 绛夊緟鏄熸槦鍔ㄧ敾鎾斁涓€娈垫椂闂?    }
    
    // 鍒涘缓鏄熸槦鐖嗙偢鏁堟灉
    function createStarExplosion() {
      const overlay = document.getElementById('starBurstOverlay');
      const colors = ['#2DD4BF', '#3cddc7', '#FACC15', '#A78BFA', '#FB923C', '#F472B6', '#ffffff'];
      const particleCount = 80; // 鏄熸槦鏁伴噺
      
      for (let i = 0; i < particleCount; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle';
        
        // 闅忔満棰滆壊
        const color = colors[Math.floor(Math.random() * colors.length)];
        star.style.backgroundColor = color;
        star.style.color = color;
        star.style.boxShadow = `0 0 ${Math.random() * 6 + 2}px ${color}`;
        
        // 闅忔満澶у皬
        const size = Math.random() * 4 + 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // 闅忔満鏂瑰悜鍜岃窛绂?        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const distance = Math.random() * 400 + 200;
        const tx = Math.cos(angle) * distance + 'px';
        const ty = Math.sin(angle) * distance + 'px';
        
        star.style.setProperty('--tx', tx);
        star.style.setProperty('--ty', ty);
        
        // 鍔ㄧ敾鏃堕暱
        const duration = Math.random() * 1 + 1; // 1-2绉?        
        // 娣诲姞鍔ㄧ敾
        star.style.animation = `starExplode ${duration}s ease-out forwards`;
        star.style.animationDelay = `${Math.random() * 0.3}s`; // 閿欏紑鏃堕棿
        
        // 浠庝腑蹇冨紑濮?        star.style.left = '50%';
        star.style.top = '50%';
        
        overlay.appendChild(star);
        
        // 鍔ㄧ敾缁撴潫鍚庣Щ闄?        setTimeout(() => {
          if (star.parentNode) star.remove();
        }, (duration + 0.3) * 1000);
      }
      
      // 娣诲姞棰濆鐨勯棯鍏夌偣锛堟洿澶х殑鏄熸槦锛?      for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'star-particle';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.backgroundColor = color;
        sparkle.style.color = color;
        sparkle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${color}, 0 0 ${Math.random() * 20 + 10}px ${color}`;
        
        const size = Math.random() * 6 + 4;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 300 + 150;
        const tx = Math.cos(angle) * distance + 'px';
        const ty = Math.sin(angle) * distance + 'px';
        
        sparkle.style.setProperty('--tx', tx);
        sparkle.style.setProperty('--ty', ty);
        
        const duration = Math.random() * 1.5 + 1.5;
        sparkle.style.animation = `starExplode ${duration}s ease-out forwards, starGlow 1s ease-in-out infinite`;
        sparkle.style.animationDelay = `${Math.random() * 0.4}s`;
        
        sparkle.style.left = '50%';
        sparkle.style.top = '50%';
        
        overlay.appendChild(sparkle);
        
        setTimeout(() => {
          if (sparkle.parentNode) sparkle.remove();
        }, (duration + 0.4) * 1000);
      }
    }
    
    // 鎵撳瓧鏈烘晥鏋?    function typeWriter(element, text, index, speed, callback) {
      if (index < text.length) {
        // 绉婚櫎鐜版湁鐨勫厜鏍?        if (index === 0) {
          element.innerHTML = '';
        }
        
        // 娣诲姞鏂板瓧绗?        element.innerHTML = text.substring(0, index + 1) + '<span class="cursor"></span>';
        
        index++;
        setTimeout(() => typeWriter(element, text, index, speed, callback), speed);
      } else {
        // 瀹屾垚 - 绉婚櫎鍏夋爣骞舵墽琛屽洖璋?        const cursor = element.querySelector('.cursor');
        if (cursor) cursor.style.display = 'none';
        
        setTimeout(() => {
          if (callback) callback();
        }, 500);
      }
    }
    
    // 鐢熸垚妯℃嫙鐨勬椿鍔ㄦ暟鎹?    function generateMockActivityData(fileName, imageData) {
      const now = new Date();
      const distance = (3 + Math.random() * 12).toFixed(2); // 3-15km
      const duration = Math.floor(distance * (4 + Math.random() * 3)); // 鏍规嵁璺濈璁＄畻鏃堕暱锛堝垎閽燂級
      const avgPace = (duration / distance).toFixed(2); // 閰嶉€?min/km
      const avgHR = Math.floor(130 + Math.random() * 40); // 骞冲潎蹇冪巼 130-170
      const maxHR = avgHR + Math.floor(10 + Math.random() * 20); // 鏈€楂樺績鐜?      
      return {
        id: Date.now(),
        date: now.toLocaleDateString('zh-CN'),
        time: now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        fileName: fileName,
        image: imageData,
        metrics: {
          distance: parseFloat(distance),
          duration: duration,
          avgPace: parseFloat(avgPace),
          avgHR: avgHR,
          maxHR: maxHR,
          calories: Math.floor(duration * 10 + Math.random() * 50)
        },
        hrZones: generateHRZones(duration),
        recoveryTime: Math.floor(18 + Math.random() * 12), // 鎭㈠鏃堕棿 18-30灏忔椂
        aiAnalysis: generateAIAnalysis(parseFloat(distance), avgHR, parseFloat(avgPace)),
        timestamp: now.getTime()
      };
    }
    
    // 鐢熸垚蹇冪巼鍖洪棿鍒嗗竷
    function generateHRZones(totalMinutes) {
      const zones = [
        { zone: 1, percentage: 10 + Math.random() * 10, color: '#2DD4BF' },   // Z1: 10-20%
        { zone: 2, percentage: 25 + Math.random() * 15, color: '#3cddc7' },   // Z2: 25-40%
        { zone: 3, percentage: 30 + Math.random() * 15, color: '#FACC15' },   // Z3: 30-45%
        { zone: 4, percentage: 8 + Math.random() * 8, color: '#FB923C' },     // Z4: 8-16%
        { zone: 5, percentage: 1 + Math.random() * 3, color: '#FF5733' }      // Z5: 1-4%
      ];
      
      // 褰掍竴鍖栧埌100%
      const total = zones.reduce((sum, z) => sum + z.percentage, 0);
      zones.forEach(z => z.percentage = (z.percentage / total * 100).toFixed(1));
      
      // 璁＄畻姣忎釜鍖洪棿鐨勬椂闂?      zones.forEach(z => {
        z.time = Math.floor(totalMinutes * z.percentage / 100);
        const mins = Math.floor(z.time);
        const secs = Math.floor((z.time - mins) * 60);
        z.timeDisplay = `${mins}:${secs.toString().padStart(2, '0')}`;
      });
      
      return zones;
    }
    
    // 鐢熸垚AI鍒嗘瀽鏂囨湰
    function generateAIAnalysis(distance, avgHR, pace) {
      const analyses = [
        {
          status: '鐘舵€佹瀬浣?,
          main: `鏈璺戞琛ㄧ幇浼樼锛?{distance}km 鐨勮窛绂诲睍鐜颁簡鑹ソ鐨勮€愬姏鍩虹銆傚钩鍧囧績鐜?${avgHR}bpm 澶勪簬鐞嗘兂鐨勮缁冨尯闂达紝璇存槑浣犵殑蹇冭偤鍔熻兘姝ｅ湪绋虫鎻愬崌銆俙,
          detail1: `閰嶉€?${pace.toFixed(2)}'/km 鐩告瘮涓婂懆鍚屾湡鎻愬崌浜嗙害 ${(Math.random() * 5).toFixed(1)}%锛岃繖鏄竴涓Н鏋佺殑淇″彿銆備繚鎸佸綋鍓嶇殑璁粌鑺傚锛屼綘鐨勬湁姘ц兘鍔涗細鎸佺画澧炲己銆俙,
          detail2: `浠庡績鐜囨洸绾挎潵鐪嬶紝浣犲湪鍓嶅崐绋嬫帶鍒跺緱寰堝ソ锛屽悗鍗婄▼鐨勫績鐜囩埇鍗囧湪鍚堢悊鑼冨洿鍐呫€傚缓璁笅娆″皾璇曟洿鍧囧寑鐨勯厤閫熷垎閰嶃€俙
        },
        {
          status: '鎭㈠鑹ソ',
          main: `瀹屾垚 ${distance}km 璺戞锛屾€绘秷鑰楃害 ${Math.floor(distance * 65)} 鍗¤矾閲屻€傚钩鍧囧績鐜?${avgHR}bpm 琛ㄦ槑浣犱粖澶╃殑鐘舵€佷笉閿欙紝韬綋閫傚簲搴﹁壇濂姐€俙,
          detail1: `閰嶉€?${pace.toFixed(2)}'/km 绋冲畾涓斿彲鎸佺画銆傛敞鎰忓埌浣犵殑姝ラ淇濇寔鍦?170-175spm 鑼冨洿锛岃繖鏄珮鏁堣窇濮跨殑閲嶈鎸囨爣銆俙,
          detail2: `寤鸿鏄庡ぉ杩涜杞诲害娲诲姩鎴栧畬鍏ㄤ紤鎭紝璁╄倢鑲夊厖鍒嗘仮澶嶃€傚彲浠ュ皾璇曚竴浜涙媺浼告垨娉℃搏杞存斁鏉俱€俙
        },
        {
          status: '绋虫鎻愬崌',
          main: `${distance}km 鐨勮缁冮噺鎭板埌濂藉锛佹暟鎹樉绀轰綘鐨勪钩閰搁槇鍊兼鍦ㄦ彁楂樷€斺€斿悓鏍风殑閰嶉€熶笅蹇冪巼闄嶄綆浜?${(Math.random() * 5).toFixed(0)}bpm銆俙,
          detail1: `鏈璁粌鐨勬湁姘ф晥鐜囨瘮涓婃鎻愬崌鏄庢樉銆俍one 2-3 鍖洪棿鍗犳瘮杈惧埌 ${(60 + Math.random() * 15).toFixed(0)}%锛岃繖鏄缓绔嬭€愬姏鍩虹鐨勬渶浣虫瘮渚嬨€俙,
          detail2: `缁х画淇濇寔姣忓懆 3-4 娆＄殑璁粌棰戠巼锛屽叾涓寘鍚?1 娆￠暱璺濈鎱㈣窇鍜?1-2 娆″己搴﹁缁冦€俙
        }
      ];
      
      return analyses[Math.floor(Math.random() * analyses.length)];
    }
    
    // 鏇存柊璇︽儏椤甸潰鏁版嵁
    function updateActivityDetailPage(data) {
      if (!data) return;
      
      // 鏇存柊鏍囬鍜屾椂闂?      const titleEl = document.querySelector('#activityDetailPage h1');
      if (titleEl) titleEl.textContent = `${data.metrics.distance}km 璺戞璇勪及`;
      
      const dateEl = document.querySelector('#activityDetailPage .font-mono.text-xs.uppercase');
      if (dateEl) dateEl.textContent = `${data.date} 路 ${data.time}`;
      
      // 鏄剧ず鍝叉€濊褰曪紙鏇夸唬鍘熸潵鐨勬埅鍥撅級
      const philosophyEl = document.getElementById('detailPhilosophyText');
      if (philosophyEl) {
        const quote = philosophyQuotes[Math.floor(Math.random() * philosophyQuotes.length)];
        philosophyEl.textContent = quote;
      }
      
      // 鏇存柊鏁版嵁鍗＄墖
      const metricValues = document.querySelectorAll('#activityDetailPage .metric-value');
      if (metricValues.length >= 4) {
        metricValues[0].textContent = `${data.metrics.distance} km`;
        metricValues[1].textContent = formatDuration(data.metrics.duration);
        metricValues[2].textContent = `${data.metrics.avgHR} bpm`;
        metricValues[3].textContent = `${data.metrics.maxHR} bpm`;
      }
      
      // 鏇存柊AI鍒嗘瀽
      const aiTexts = document.querySelectorAll('#activityDetailPage .glass-card p');
      if (aiTexts.length >= 3 && data.aiAnalysis) {
        aiTexts[0].textContent = data.aiAnalysis.main;
        if (aiTexts[1]) aiTexts[1].textContent = data.aiAnalysis.detail1;
        if (aiTexts[2]) aiTexts[2].textContent = data.aiAnalysis.detail2;
      }
      
      // 鏇存柊鐘舵€佹爣绛?      const statusBadge = document.querySelector('#activityDetailPage .status-badge');
      if (statusBadge && data.aiAnalysis) {
        statusBadge.textContent = data.aiAnalysis.status;
      }
      
      // 鏇存柊鎭㈠鏃堕棿
      const recoveryValue = document.querySelector('#activityDetailPage .font-mono.text-xl.font-semibold');
      if (recoveryValue) {
        recoveryValue.textContent = `${data.recoveryTime}灏忔椂`;
      }
      
      // 鏇存柊涓嬩竴姝ュ缓璁紙浼樺厛浣跨敤 AI 寤鸿锛?      const suggestionBox = document.querySelector('.suggestion-box');
      if (suggestionBox && data.suggestion) {
        suggestionBox.innerHTML = `
          <div class="suggestion-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffb4a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <path d="M12 17h.01"></path>
            </svg>
            <span class="suggestion-title">涓嬩竴姝ュ缓璁?/span>
          </div>
          ${data.suggestion.nextTraining ? `<p class="text-sm mb-2" style="color: var(--on-surface);">${data.suggestion.nextTraining}</p>` : ''}
          ${data.suggestion.recoveryAdvice ? `<p class="text-sm mb-2" style="color: var(--on-surface-variant);">${data.suggestion.recoveryAdvice}</p>` : ''}
          ${data.suggestion.longTermDirection ? `<p class="text-sm" style="color: var(--outline);">${data.suggestion.longTermDirection}</p>` : ''}
        `;
      } else if (suggestionBox) {
        // 闄嶇骇鍒伴粯璁ゅ缓璁?        const nextDistance = (3 + Math.random() * 5).toFixed(1);
        suggestionBox.innerHTML = `
          <div class="suggestion-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffb4a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <path d="M12 17h.01"></path>
            </svg>
            <span class="suggestion-title">涓嬩竴姝ュ缓璁?/span>
          </div>
          <p class="text-sm mb-2" style="color: var(--on-surface);">鏄庢棩寤鸿锛?span class="font-medium" style="color: var(--secondary);">${nextDistance}km 浣庡己搴︽仮澶嶈窇</span></p>
          <p class="text-sm mb-2" style="color: var(--on-surface-variant);">閰嶉€熸帶鍒跺湪<span class="font-medium" style="color: var(--on-surface);">6:30-7:00/km</span>锛岀洰鏍囧績鐜囦繚鎸佸湪<span class="font-medium" style="color: var(--recovery);">Zone 1-2</span></p>
          <p class="text-sm" style="color: var(--outline);">閲嶇偣鍏虫敞姝ラ绋冲畾鎬э紝璁╄韩浣撳湪浣庡己搴︿笅瀹屾垚涓诲姩鎭㈠銆傞伩鍏嶄换浣曞舰寮忕殑鍐插埡鎴栫埇鍧°€?/p>
        `;
      }
      
      // 濡傛灉鏄湡瀹?AI 鍒嗘瀽锛屾坊鍔犳爣璇?      if (data.isRealAI) {
        const aiBadge = document.querySelector('#activityDetailPage .status-badge');
        if (aiBadge) {
          aiBadge.textContent = '馃 DeepSeek 鍒嗘瀽';
          aiBadge.style.background = 'rgba(60,221,199,0.15)';
          aiBadge.style.color = '#3cddc7';
          aiBadge.style.borderColor = 'rgba(60,221,199,0.3)';
        }
      }
    }
    
    // 鏍煎紡鍖栨椂闀?    function formatDuration(minutes) {
      const h = Math.floor(minutes / 60);
      const m = Math.floor(minutes % 60);
      if (h > 0) {
        return `${h}:${m.toString().padStart(2, '0')}:00`;
      }
      return `${m}:12`;
    }
    
    // 淇濆瓨娲诲姩璁板綍
    function saveActivity(activity) {
      let activities = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      activities.unshift(activity); // 娣诲姞鍒板紑澶?      // 鍙繚鐣欐渶杩?0鏉¤褰?      if (activities.length > 20) {
        activities = activities.slice(0, 20);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    }
    
    // 鍔犺浇娲诲姩璁板綍
    function loadActivities() {
      const activities = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (activities.length > 0) {
        updateRecentActivities();
        updateLifeTreeStats(activities);
      }
    }
    
    // 鏇存柊棣栭〉杩戞湡娲诲姩鍒楄〃
    function updateRecentActivities() {
      const activities = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const activityGrid = document.querySelector('#homePage .activity-grid');
      
      if (!activityGrid || activities.length === 0) return;
      
      // 娓呯┖鐜版湁鍐呭
      activityGrid.innerHTML = '';
      
      // 娣诲姞鏈€杩?鏉¤褰?      activities.slice(0, 2).forEach((activity, index) => {
        const item = document.createElement('div');
        item.className = 'surface-card activity-item';
        item.onclick = () => viewActivityDetail(activity);
        
        const isToday = isSameDay(new Date(activity.timestamp), new Date());
        const dateLabel = isToday ? '浠婂ぉ' : formatDateLabel(activity.date);
        const statusColor = activity.metrics.avgHR < 150 ? 'var(--recovery)' : 'var(--training)';
        
        item.innerHTML = `
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 12px;">
            <span>馃弮</span>
            <span class="font-mono text-xs" style="color: var(--outline);">${dateLabel}</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 4px; margin-bottom: 4px;">
            <span class="font-mono text-lg font-semibold" style="color: var(--on-surface);">${activity.metrics.distance}km</span>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span class="font-mono text-sm" style="color: var(--on-surface-variant);">${activity.metrics.avgPace.toFixed(2)}'</span>
            <span style="width: 8px; height: 8px; border-radius: 50%; background: ${statusColor};"></span>
          </div>
        `;
        
        activityGrid.appendChild(item);
      });
    }
    
    // 鏌ョ湅鍘嗗彶娲诲姩璇︽儏
    function viewActivityDetail(activity) {
      currentActivityData = activity;
      
      // 鏇存柊椤甸潰鏁版嵁
      updateActivityDetailPage(activity);
      
      // 璺宠浆鍒拌鎯呴〉
      navigateTo('activity-detail');
    }
    
    // 鍒ゆ柇鏄惁鍚屼竴澶?    function isSameDay(date1, date2) {
      return date1.getDate() === date2.getDate() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getFullYear() === date2.getFullYear();
    }
    
    // 鏍煎紡鍖栨棩鏈熸爣绛?    function formatDateLabel(dateStr) {
      const date = new Date(dateStr);
      const days = ['鍛ㄦ棩', '鍛ㄤ竴', '鍛ㄤ簩', '鍛ㄤ笁', '鍛ㄥ洓', '鍛ㄤ簲', '鍛ㄥ叚'];
      return `${days[date.getDay()]}${date.getDate()}鏃;
    }
    
    // 鏇存柊鐢熷懡鏍戠粺璁℃暟鎹?    function updateLifeTreeStats(activities) {
      const totalRuns = activities.length;
      const totalDistance = activities.reduce((sum, a) => sum + a.metrics.distance, 0);
      
      // 璁＄畻杩炵画澶╂暟
      let streak = 0;
      const today = new Date();
      for (let i = 0; i < 365; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        const hasActivity = activities.some(a => isSameDay(new Date(a.timestamp), checkDate));
        if (hasActivity) {
          streak++;
        } else if (i > 0) {
          break;
        }
      }
      
      // 鏇存柊缁熻鏁板瓧
      const statElements = document.querySelectorAll('#lifeTreePage .stat-value');
      if (statElements.length >= 4) {
        statElements[0].textContent = totalRuns;
        statElements[1].textContent = totalDistance < 1000 ? 
          `${totalDistance.toFixed(1)}k` : 
          `${(totalDistance/1000).toFixed(1)}k`;
        statElements[2].textContent = `${streak}澶ー;
      }
      
      // 璁＄畻绛夌骇
      const level = Math.min(20, Math.floor(totalRuns / 10) + 1);
      const levelNames = ['钀岃娊鏈?, '鐢熼暱鏈?, '鑼佸．鏈?, '绻佽寕鏈?, '缁氱儌鏈?, '鏋佸厜鏈?];
      const levelName = levelNames[Math.min(level - 1, levelNames.length - 1)];
      
      const levelEl = document.querySelector('#lifeTreePage h2.font-display.text-3xl');
      if (levelEl) levelEl.textContent = levelName;
      
      const levelNumEl = document.querySelector('#lifeTreePage .font-mono.text-xs');
      if (levelNumEl) levelNumEl.textContent = `Lv. ${level}`;
    }
  
