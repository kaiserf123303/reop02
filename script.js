// ======================
// 互動式產品比較（單頁）
// - 每頁固定 6
// - 頁碼每 10 頁一組（« / »）
// - 真實風格型號名稱
// - 查看規格 alert
// - 比較最多 3 + 比較表
// - 來源：PChome 24h（參考）
// ======================

const SOURCE_TEXT = "PChome 24h（參考）";
const PAGE_SIZE = 6;
const PAGE_GROUP_SIZE = 10;

const CATEGORIES = [
  "手把",
  "普通耳機",
  "藍芽耳機",
  "鍵盤",
  "滑鼠",
  "螢幕",
  "手機",
  "顯示卡",
];
const CATEGORY_SPEC_LABELS = {
  手把: ["連線", "平台", "特色"],
  普通耳機: ["接口", "類型", "麥克風"],
  藍芽耳機: ["藍牙", "續航", "降噪"],
  鍵盤: ["軸體/類型", "配列", "RGB"],
  滑鼠: ["DPI", "連線", "重量"],
  螢幕: ["尺寸", "刷新率", "解析度"],
  手機: ["螢幕", "電池", "相機"],
  顯示卡: ["晶片", "顯存", "功耗"],
};

const CATALOG = {
  手把: {
    Sony: [
      { name: "DualSense 無線控制器", price: 2090, specs: { specA: "藍牙/USB-C", specB: "PS5/PC", specC: "觸覺回饋" } },
      { name: "DualSense Edge 無線控制器", price: 6890, specs: { specA: "藍牙/USB-C", specB: "PS5/PC", specC: "可換模組" } },
      { name: "DualShock 4 無線控制器", price: 1690, specs: { specA: "藍牙/USB", specB: "PS4/PC", specC: "六軸感應" } },
      { name: "HORI Split Pad Pro（副廠）", price: 1990, specs: { specA: "插接/有線", specB: "Switch", specC: "大握把" } },
    ],
    Microsoft: [
      { name: "Xbox Wireless Controller", price: 1790, specs: { specA: "藍牙/USB-C", specB: "Xbox/PC", specC: "低延遲" } },
      { name: "Xbox Elite Wireless Controller Series 2", price: 5290, specs: { specA: "藍牙/2.4G", specB: "Xbox/PC", specC: "可調張力" } },
      { name: "Xbox Adaptive Controller", price: 2890, specs: { specA: "USB", specB: "Xbox/PC", specC: "無障礙" } },
      { name: "Xbox 控制器（USB-C 版）", price: 1990, specs: { specA: "藍牙/USB-C", specB: "Xbox/PC", specC: "握把紋理" } },
    ],
    Nintendo: [
      { name: "Nintendo Switch Pro Controller", price: 1880, specs: { specA: "藍牙/USB-C", specB: "Switch/PC", specC: "HD 震動" } },
      { name: "Joy-Con（L/R）", price: 2490, specs: { specA: "藍牙", specB: "Switch", specC: "體感" } },
      { name: "GameCube 控制器（Switch 版）", price: 1790, specs: { specA: "USB", specB: "Switch", specC: "經典布局" } },
      { name: "HORI Horipad（副廠）", price: 1290, specs: { specA: "有線", specB: "Switch/PC", specC: "入門款" } },
    ],
    "8BitDo": [
      { name: "8BitDo Ultimate 2.4G Controller", price: 1590, specs: { specA: "2.4G/USB", specB: "PC/Switch", specC: "充電座" } },
      { name: "8BitDo Pro 2", price: 1390, specs: { specA: "藍牙/USB", specB: "PC/Switch/Android", specC: "背鍵" } },
      { name: "8BitDo SN30 Pro", price: 1190, specs: { specA: "藍牙/USB", specB: "PC/Switch/Android", specC: "復古" } },
      { name: "8BitDo Lite 2", price: 990, specs: { specA: "藍牙", specB: "Switch", specC: "輕巧" } },
    ],
    Razer: [
      { name: "Razer Wolverine V2 Chroma", price: 4490, specs: { specA: "有線", specB: "Xbox/PC", specC: "額外鍵" } },
      { name: "Razer Wolverine V2", price: 3290, specs: { specA: "有線", specB: "Xbox/PC", specC: "快速觸發" } },
      { name: "Razer Kishi V2（手機手把）", price: 2490, specs: { specA: "USB-C", specB: "Android/iPhone", specC: "攜帶方便" } },
      { name: "Razer Raiju Tournament Edition", price: 2990, specs: { specA: "藍牙/USB", specB: "PS4/PC", specC: "可自訂" } },
    ],
    GameSir: [
      { name: "GameSir G7 SE", price: 1390, specs: { specA: "有線", specB: "Xbox/PC", specC: "霍爾搖桿" } },
      { name: "GameSir T4 Kaleid", price: 1290, specs: { specA: "有線", specB: "PC/Switch", specC: "透明外殼" } },
      { name: "GameSir Cyclone Pro", price: 1690, specs: { specA: "2.4G/藍牙", specB: "PC/Switch", specC: "充電座" } },
      { name: "GameSir Nova Lite", price: 990, specs: { specA: "藍牙", specB: "PC/Switch", specC: "入門款" } },
    ],
  },

  普通耳機: {
    Sony: [
      { name: "Sony MDR-ZX110AP", price: 590, specs: { specA: "3.5mm", specB: "耳罩", specC: "有" } },
      { name: "Sony MDR-EX155AP", price: 490, specs: { specA: "3.5mm", specB: "入耳", specC: "有" } },
      { name: "Sony MDR-XB55AP", price: 890, specs: { specA: "3.5mm", specB: "入耳", specC: "有" } },
      { name: "Sony MDR-7506", price: 3290, specs: { specA: "3.5mm", specB: "監聽", specC: "無" } },
    ],
    Sennheiser: [
      { name: "Sennheiser HD 206", price: 1090, specs: { specA: "3.5mm", specB: "耳罩", specC: "無" } },
      { name: "Sennheiser HD 280 PRO", price: 3290, specs: { specA: "3.5mm", specB: "監聽", specC: "無" } },
      { name: "Sennheiser IE 100 PRO", price: 2990, specs: { specA: "3.5mm", specB: "入耳(監聽)", specC: "可換線" } },
      { name: "Sennheiser GAME ZERO", price: 4290, specs: { specA: "3.5mm", specB: "電競耳罩", specC: "有" } },
    ],
    "Audio-Technica": [
      { name: "Audio-Technica ATH-M20x", price: 1590, specs: { specA: "3.5mm", specB: "監聽", specC: "無" } },
      { name: "Audio-Technica ATH-M30x", price: 1990, specs: { specA: "3.5mm", specB: "監聽", specC: "無" } },
      { name: "Audio-Technica ATH-M40x", price: 2990, specs: { specA: "3.5mm", specB: "監聽", specC: "無" } },
      { name: "Audio-Technica ATH-AD500X", price: 3490, specs: { specA: "3.5mm", specB: "開放式", specC: "無" } },
    ],
    HyperX: [
      { name: "HyperX Cloud II", price: 2690, specs: { specA: "USB/3.5mm", specB: "電競耳罩", specC: "有" } },
      { name: "HyperX Cloud Stinger 2", price: 1790, specs: { specA: "3.5mm", specB: "電競耳罩", specC: "有" } },
      { name: "HyperX Cloud Alpha", price: 2990, specs: { specA: "3.5mm", specB: "電競耳罩", specC: "有" } },
      { name: "HyperX CloudX", price: 2490, specs: { specA: "3.5mm", specB: "電競耳罩", specC: "有" } },
    ],
    JBL: [
      { name: "JBL T500", price: 890, specs: { specA: "3.5mm", specB: "耳罩", specC: "有" } },
      { name: "JBL Tune 110", price: 390, specs: { specA: "3.5mm", specB: "入耳", specC: "有" } },
      { name: "JBL Tune 205", price: 490, specs: { specA: "3.5mm", specB: "半入耳", specC: "有" } },
      { name: "JBL Quantum 100", price: 1090, specs: { specA: "3.5mm", specB: "電競耳罩", specC: "有" } },
    ],
    Philips: [
      { name: "Philips SHP9500", price: 2590, specs: { specA: "3.5mm", specB: "開放式", specC: "無" } },
      { name: "Philips SHL3060", price: 690, specs: { specA: "3.5mm", specB: "耳罩", specC: "有" } },
      { name: "Philips SHE3700", price: 290, specs: { specA: "3.5mm", specB: "入耳", specC: "有" } },
      { name: "Philips Fidelio X2HR", price: 4990, specs: { specA: "3.5mm", specB: "開放式", specC: "無" } },
    ],
  },

  藍芽耳機: {
    Sony: [
      { name: "Sony WH-1000XM5", price: 10900, specs: { specA: "5.2", specB: "30h", specC: "有" } },
      { name: "Sony WF-1000XM5", price: 8990, specs: { specA: "5.3", specB: "24h", specC: "有" } },
      { name: "Sony WH-CH720N", price: 2990, specs: { specA: "5.2", specB: "35h", specC: "有" } },
      { name: "Sony LinkBuds S", price: 3990, specs: { specA: "5.2", specB: "20h", specC: "有" } },
    ],
    Bose: [
      { name: "Bose QuietComfort 45", price: 8990, specs: { specA: "5.1", specB: "24h", specC: "有" } },
      { name: "Bose QuietComfort Ultra Headphones", price: 13900, specs: { specA: "5.x", specB: "24h", specC: "有" } },
      { name: "Bose QuietComfort Earbuds II", price: 7990, specs: { specA: "5.x", specB: "24h", specC: "有" } },
      { name: "Bose Sport Earbuds", price: 4990, specs: { specA: "5.x", specB: "15h", specC: "無" } },
    ],
    Apple: [
      { name: "AirPods Pro (第2代)", price: 7490, specs: { specA: "5.3", specB: "30h", specC: "有" } },
      { name: "AirPods (第3代)", price: 4990, specs: { specA: "5.0+", specB: "30h", specC: "無" } },
      { name: "AirPods Max", price: 16990, specs: { specA: "5.0", specB: "20h", specC: "有" } },
      { name: "Beats Fit Pro", price: 6290, specs: { specA: "5.0", specB: "24h", specC: "有" } },
    ],
    Soundcore: [
      { name: "Soundcore Liberty 4", price: 3290, specs: { specA: "5.3", specB: "28h", specC: "有" } },
      { name: "Soundcore Space A40", price: 2190, specs: { specA: "5.2", specB: "50h", specC: "有" } },
      { name: "Soundcore Q30", price: 1990, specs: { specA: "5.0", specB: "40h", specC: "有" } },
      { name: "Soundcore Life P3", price: 1390, specs: { specA: "5.0", specB: "35h", specC: "有" } },
    ],
    JBL: [
      { name: "JBL Tune 770NC", price: 2990, specs: { specA: "5.3", specB: "70h", specC: "有" } },
      { name: "JBL Live 660NC", price: 3990, specs: { specA: "5.0", specB: "50h", specC: "有" } },
      { name: "JBL Wave Beam", price: 1490, specs: { specA: "5.2", specB: "32h", specC: "無" } },
      { name: "JBL Tour Pro 2", price: 5990, specs: { specA: "5.3", specB: "40h", specC: "有" } },
    ],
    Sennheiser: [
      { name: "Sennheiser MOMENTUM 4", price: 8990, specs: { specA: "5.2", specB: "60h", specC: "有" } },
      { name: "Sennheiser ACCENTUM", price: 4990, specs: { specA: "5.2", specB: "50h", specC: "有" } },
      { name: "Sennheiser CX True Wireless", price: 2990, specs: { specA: "5.2", specB: "27h", specC: "無" } },
      { name: "Sennheiser SPORT True Wireless", price: 3990, specs: { specA: "5.2", specB: "27h", specC: "無" } },
    ],
  },

  鍵盤: {
    Logitech: [
      { name: "Logitech K380 多工藍牙鍵盤", price: 1090, specs: { specA: "薄膜", specB: "75%", specC: "否" } },
      { name: "Logitech MX Keys", price: 3490, specs: { specA: "剪刀腳", specB: "全尺寸", specC: "有(背光)" } },
      { name: "Logitech G PRO X", price: 3990, specs: { specA: "機械(可換軸)", specB: "TKL", specC: "是" } },
      { name: "Logitech K120", price: 390, specs: { specA: "薄膜", specB: "全尺寸", specC: "否" } },
    ],
    Keychron: [
      { name: "Keychron K2", price: 2690, specs: { specA: "機械", specB: "75%", specC: "是" } },
      { name: "Keychron K6", price: 2390, specs: { specA: "機械", specB: "65%", specC: "是" } },
      { name: "Keychron V1", price: 2190, specs: { specA: "機械", specB: "75%", specC: "是" } },
      { name: "Keychron Q1", price: 4990, specs: { specA: "機械(鋁殼)", specB: "75%", specC: "是" } },
    ],
    Razer: [
      { name: "Razer BlackWidow V3", price: 3990, specs: { specA: "機械", specB: "全尺寸", specC: "是" } },
      { name: "Razer Huntsman Mini", price: 2990, specs: { specA: "光軸", specB: "60%", specC: "是" } },
      { name: "Razer Ornata V3", price: 1990, specs: { specA: "混合", specB: "全尺寸", specC: "是" } },
      { name: "Razer DeathStalker V2", price: 4990, specs: { specA: "矮軸", specB: "TKL", specC: "是" } },
    ],
    ASUS: [
      { name: "ASUS TUF K1", price: 1490, specs: { specA: "薄膜", specB: "全尺寸", specC: "是" } },
      { name: "ROG Strix Scope NX", price: 3990, specs: { specA: "機械", specB: "全尺寸", specC: "是" } },
      { name: "ROG Falchion", price: 3990, specs: { specA: "機械", specB: "65%", specC: "是" } },
      { name: "ROG Claymore II", price: 7990, specs: { specA: "機械", specB: "全尺寸", specC: "是" } },
    ],
    MSI: [
      { name: "MSI VIGOR GK30", price: 1590, specs: { specA: "薄膜", specB: "全尺寸", specC: "是" } },
      { name: "MSI VIGOR GK50", price: 2590, specs: { specA: "機械", specB: "全尺寸", specC: "是" } },
      { name: "MSI VIGOR GK71 SONIC", price: 2990, specs: { specA: "機械", specB: "TKL", specC: "是" } },
      { name: "MSI VIGOR GK41", price: 990, specs: { specA: "薄膜", specB: "TKL", specC: "是" } },
    ],
    Akko: [
      { name: "Akko 3068B", price: 2390, specs: { specA: "機械", specB: "65%", specC: "是" } },
      { name: "Akko 5087B", price: 2690, specs: { specA: "機械", specB: "TKL", specC: "是" } },
      { name: "Akko MOD007", price: 4590, specs: { specA: "機械(鋁殼)", specB: "75%", specC: "是" } },
      { name: "Akko ACR Pro 68", price: 3190, specs: { specA: "機械", specB: "65%", specC: "是" } },
    ],
  },

  滑鼠: {
    Logitech: [
      { name: "Logitech G304 LIGHTSPEED", price: 1090, specs: { specA: "12000", specB: "無線", specC: "99g" } },
      { name: "Logitech G502 HERO", price: 1690, specs: { specA: "25600", specB: "有線", specC: "121g" } },
      { name: "Logitech MX Master 3S", price: 3290, specs: { specA: "8000", specB: "無線", specC: "141g" } },
      { name: "Logitech G Pro X Superlight", price: 3990, specs: { specA: "25600", specB: "無線", specC: "63g" } },
    ],
    Razer: [
      { name: "Razer DeathAdder V2", price: 1290, specs: { specA: "20000", specB: "有線", specC: "82g" } },
      { name: "Razer Viper Mini", price: 890, specs: { specA: "8500", specB: "有線", specC: "61g" } },
      { name: "Razer Basilisk V3", price: 1990, specs: { specA: "26000", specB: "有線", specC: "101g" } },
      { name: "Razer Viper V2 Pro", price: 3990, specs: { specA: "30000", specB: "無線", specC: "58g" } },
    ],
    SteelSeries: [
      { name: "SteelSeries Rival 3", price: 990, specs: { specA: "8500", specB: "有線", specC: "77g" } },
      { name: "SteelSeries Aerox 3 Wireless", price: 2690, specs: { specA: "18000", specB: "無線", specC: "66g" } },
      { name: "SteelSeries Sensei Ten", price: 1790, specs: { specA: "18000", specB: "有線", specC: "92g" } },
      { name: "SteelSeries Prime Wireless", price: 2990, specs: { specA: "18000", specB: "無線", specC: "80g" } },
    ],
    ASUS: [
      { name: "ROG Gladius III", price: 1990, specs: { specA: "19000", specB: "有線", specC: "79g" } },
      { name: "ROG Keris Wireless", price: 2690, specs: { specA: "16000", specB: "無線", specC: "79g" } },
      { name: "ROG Chakram", price: 3290, specs: { specA: "16000", specB: "無線", specC: "121g" } },
      { name: "ROG Harpe Ace", price: 3990, specs: { specA: "36000", specB: "無線", specC: "54g" } },
    ],
    MSI: [
      { name: "MSI Clutch GM41 Lightweight", price: 1090, specs: { specA: "16000", specB: "有線", specC: "65g" } },
      { name: "MSI Clutch GM51", price: 1590, specs: { specA: "26000", specB: "有線", specC: "75g" } },
      { name: "MSI Clutch GM41 Wireless", price: 1990, specs: { specA: "20000", specB: "無線", specC: "74g" } },
      { name: "MSI Clutch GM30", price: 790, specs: { specA: "6200", specB: "有線", specC: "98g" } },
    ],
    Zowie: [
      { name: "Zowie EC2-C", price: 2190, specs: { specA: "3200", specB: "有線", specC: "73g" } },
      { name: "Zowie S2-C", price: 2190, specs: { specA: "3200", specB: "有線", specC: "70g" } },
      { name: "Zowie FK2-C", price: 2190, specs: { specA: "3200", specB: "有線", specC: "70g" } },
      { name: "Zowie ZA13-C", price: 2190, specs: { specA: "3200", specB: "有線", specC: "65g" } },
    ],
  },

  螢幕: {
    ASUS: [
      { name: "ASUS TUF VG249Q1A 24吋 165Hz", price: 3990, specs: { specA: '24"', specB: "165Hz", specC: "1080p" } },
      { name: "ASUS VG27AQ 27吋 165Hz", price: 8990, specs: { specA: '27"', specB: "165Hz", specC: "1440p" } },
      { name: "ASUS ROG XG27AQ 27吋", price: 10990, specs: { specA: '27"', specB: "170Hz", specC: "1440p" } },
      { name: "ASUS VA24EHE 24吋", price: 2690, specs: { specA: '24"', specB: "75Hz", specC: "1080p" } },
    ],
    Acer: [
      { name: "Acer Nitro VG240Y 24吋 165Hz", price: 3290, specs: { specA: '24"', specB: "165Hz", specC: "1080p" } },
      { name: "Acer VG271U 27吋 170Hz", price: 5990, specs: { specA: '27"', specB: "170Hz", specC: "1440p" } },
      { name: "Acer XV252Q 24.5吋 390Hz", price: 14990, specs: { specA: '24.5"', specB: "390Hz", specC: "1080p" } },
      { name: "Acer EK240Y 24吋", price: 2290, specs: { specA: '24"', specB: "75Hz", specC: "1080p" } },
    ],
    BenQ: [
      { name: "BenQ EX2510S 24.5吋 165Hz", price: 4990, specs: { specA: '24.5"', specB: "165Hz", specC: "1080p" } },
      { name: "BenQ MOBIUZ EX2710Q 27吋", price: 10990, specs: { specA: '27"', specB: "165Hz", specC: "1440p" } },
      { name: "BenQ GW2480 24吋", price: 3290, specs: { specA: '24"', specB: "60Hz", specC: "1080p" } },
      { name: "BenQ XL2546K 24.5吋 240Hz", price: 16990, specs: { specA: '24.5"', specB: "240Hz", specC: "1080p" } },
    ],
    LG: [
      { name: "LG 27GN800-B 27吋 144Hz", price: 6990, specs: { specA: '27"', specB: "144Hz", specC: "1440p" } },
      { name: "LG 24GN600-B 24吋 144Hz", price: 3990, specs: { specA: '24"', specB: "144Hz", specC: "1080p" } },
      { name: "LG 32GN650-B 32吋 165Hz", price: 7990, specs: { specA: '32"', specB: "165Hz", specC: "1440p" } },
      { name: "LG 27UP650-W 27吋 4K", price: 8990, specs: { specA: '27"', specB: "60Hz", specC: "4K" } },
    ],
    Samsung: [
      { name: "Samsung Odyssey G5 27吋 144Hz", price: 6990, specs: { specA: '27"', specB: "144Hz", specC: "1440p" } },
      { name: "Samsung Odyssey G7 27吋 240Hz", price: 12990, specs: { specA: '27"', specB: "240Hz", specC: "1440p" } },
      { name: "Samsung M7 32吋 智慧螢幕", price: 9990, specs: { specA: '32"', specB: "60Hz", specC: "4K" } },
      { name: "Samsung S24R350 24吋", price: 2590, specs: { specA: '24"', specB: "75Hz", specC: "1080p" } },
    ],
    MSI: [
      { name: "MSI G241 24吋 144Hz", price: 3490, specs: { specA: '24"', specB: "144Hz", specC: "1080p" } },
      { name: "MSI MAG274QRF-QD 27吋", price: 12990, specs: { specA: '27"', specB: "165Hz", specC: "1440p" } },
      { name: "MSI G321Q 32吋 170Hz", price: 7490, specs: { specA: '32"', specB: "170Hz", specC: "1440p" } },
      { name: "MSI PRO MP241X 24吋", price: 2490, specs: { specA: '24"', specB: "75Hz", specC: "1080p" } },
    ],
  },

  手機: {
    Apple: [
      { name: "iPhone 15", price: 29900, specs: { specA: '6.1"', specB: "3349mAh", specC: "48MP" } },
      { name: "iPhone 15 Plus", price: 32900, specs: { specA: '6.7"', specB: "4383mAh", specC: "48MP" } },
      { name: "iPhone 15 Pro", price: 36900, specs: { specA: '6.1"', specB: "3274mAh", specC: "48MP" } },
      { name: "iPhone 15 Pro Max", price: 44900, specs: { specA: '6.7"', specB: "4422mAh", specC: "48MP" } },
    ],
    Samsung: [
      { name: "Samsung Galaxy S24", price: 27900, specs: { specA: '6.2"', specB: "4000mAh", specC: "50MP" } },
      { name: "Samsung Galaxy S24+", price: 31900, specs: { specA: '6.7"', specB: "4900mAh", specC: "50MP" } },
      { name: "Samsung Galaxy S24 Ultra", price: 43900, specs: { specA: '6.8"', specB: "5000mAh", specC: "200MP" } },
      { name: "Samsung Galaxy A54", price: 14990, specs: { specA: '6.4"', specB: "5000mAh", specC: "50MP" } },
    ],
    Google: [
      { name: "Google Pixel 8", price: 24990, specs: { specA: '6.2"', specB: "4575mAh", specC: "50MP" } },
      { name: "Google Pixel 8 Pro", price: 32990, specs: { specA: '6.7"', specB: "5050mAh", specC: "50MP" } },
      { name: "Google Pixel 7a", price: 13990, specs: { specA: '6.1"', specB: "4385mAh", specC: "64MP" } },
      { name: "Google Pixel 8a", price: 16990, specs: { specA: '6.1"', specB: "4492mAh", specC: "64MP" } },
    ],
    OPPO: [
      { name: "OPPO Reno11", price: 16990, specs: { specA: '6.7"', specB: "5000mAh", specC: "50MP" } },
      { name: "OPPO Reno10", price: 14990, specs: { specA: '6.7"', specB: "5000mAh", specC: "64MP" } },
      { name: "OPPO A79", price: 8990, specs: { specA: '6.7"', specB: "5000mAh", specC: "50MP" } },
      { name: "OPPO A58", price: 6990, specs: { specA: '6.7"', specB: "5000mAh", specC: "50MP" } },
    ],
    Xiaomi: [
      { name: "Xiaomi 13T", price: 15999, specs: { specA: '6.7"', specB: "5000mAh", specC: "50MP" } },
      { name: "Xiaomi 13", price: 19999, specs: { specA: '6.36"', specB: "4500mAh", specC: "50MP" } },
      { name: "Redmi Note 13 Pro", price: 10999, specs: { specA: '6.67"', specB: "5100mAh", specC: "200MP" } },
      { name: "POCO X6 Pro", price: 11999, specs: { specA: '6.67"', specB: "5000mAh", specC: "64MP" } },
    ],
    Sony: [
      { name: "Sony Xperia 1 V", price: 32990, specs: { specA: '6.5"', specB: "5000mAh", specC: "48MP" } },
      { name: "Sony Xperia 5 V", price: 27990, specs: { specA: '6.1"', specB: "5000mAh", specC: "48MP" } },
      { name: "Sony Xperia 10 V", price: 11990, specs: { specA: '6.1"', specB: "5000mAh", specC: "48MP" } },
      { name: "Sony Xperia 1 IV", price: 24990, specs: { specA: '6.5"', specB: "5000mAh", specC: "12MP" } },
    ],
  },

  顯示卡: {
    ASUS: [
      { name: "ASUS Dual RTX 4060 8GB", price: 10990, specs: { specA: "RTX 4060", specB: "8GB", specC: "115W" } },
      { name: "ASUS TUF RTX 4070 12GB", price: 19990, specs: { specA: "RTX 4070", specB: "12GB", specC: "200W" } },
      { name: "ASUS Dual RTX 4070 SUPER 12GB", price: 23990, specs: { specA: "RTX 4070 SUPER", specB: "12GB", specC: "220W" } },
      { name: "ASUS TUF RTX 4070 Ti SUPER 16GB", price: 28990, specs: { specA: "RTX 4070 Ti SUPER", specB: "16GB", specC: "285W" } },
    ],
    MSI: [
      { name: "MSI RTX 4060 Ventus 2X", price: 11490, specs: { specA: "RTX 4060", specB: "8GB", specC: "115W" } },
      { name: "MSI RTX 4070 SUPER Ventus 2X", price: 24990, specs: { specA: "RTX 4070 SUPER", specB: "12GB", specC: "220W" } },
      { name: "MSI RTX 4070 Gaming X", price: 21990, specs: { specA: "RTX 4070", specB: "12GB", specC: "200W" } },
      { name: "MSI RTX 4070 Ti SUPER", price: 29990, specs: { specA: "RTX 4070 Ti SUPER", specB: "16GB", specC: "285W" } },
    ],
    GIGABYTE: [
      { name: "GIGABYTE RTX 4060 WINDFORCE", price: 10990, specs: { specA: "RTX 4060", specB: "8GB", specC: "115W" } },
      { name: "GIGABYTE RTX 4070 WINDFORCE", price: 19990, specs: { specA: "RTX 4070", specB: "12GB", specC: "200W" } },
      { name: "GIGABYTE RTX 4070 SUPER GAMING", price: 25990, specs: { specA: "RTX 4070 SUPER", specB: "12GB", specC: "220W" } },
      { name: "GIGABYTE RTX 4070 Ti SUPER AERO", price: 30990, specs: { specA: "RTX 4070 Ti SUPER", specB: "16GB", specC: "285W" } },
    ],
    ZOTAC: [
      { name: "ZOTAC RTX 4060 Twin Edge", price: 10490, specs: { specA: "RTX 4060", specB: "8GB", specC: "115W" } },
      { name: "ZOTAC RTX 4070 Twin Edge", price: 18990, specs: { specA: "RTX 4070", specB: "12GB", specC: "200W" } },
      { name: "ZOTAC RTX 4070 SUPER Twin Edge", price: 22990, specs: { specA: "RTX 4070 SUPER", specB: "12GB", specC: "220W" } },
      { name: "ZOTAC RTX 4070 Ti SUPER Trinity", price: 28990, specs: { specA: "RTX 4070 Ti SUPER", specB: "16GB", specC: "285W" } },
    ],
    Palit: [
      { name: "Palit RTX 4060 Dual", price: 9990, specs: { specA: "RTX 4060", specB: "8GB", specC: "115W" } },
      { name: "Palit RTX 4070 Dual", price: 18490, specs: { specA: "RTX 4070", specB: "12GB", specC: "200W" } },
      { name: "Palit RTX 4070 SUPER Dual", price: 21990, specs: { specA: "RTX 4070 SUPER", specB: "12GB", specC: "220W" } },
      { name: "Palit RTX 4070 Ti SUPER JetStream", price: 28990, specs: { specA: "RTX 4070 Ti SUPER", specB: "16GB", specC: "285W" } },
    ],
    SAPPHIRE: [
      { name: "SAPPHIRE PULSE RX 7600", price: 8990, specs: { specA: "RX 7600", specB: "8GB", specC: "165W" } },
      { name: "SAPPHIRE PULSE RX 7700 XT", price: 15990, specs: { specA: "RX 7700 XT", specB: "12GB", specC: "245W" } },
      { name: "SAPPHIRE NITRO+ RX 7800 XT", price: 18990, specs: { specA: "RX 7800 XT", specB: "16GB", specC: "263W" } },
      { name: "SAPPHIRE PULSE RX 7900 GRE", price: 22990, specs: { specA: "RX 7900 GRE", specB: "16GB", specC: "260W" } },
    ],
  },
};

// 把 CATALOG 扁平化成 products 陣列
function buildProductsFromCatalog() {
  const list = [];
  let n = 1;

  for (const category of Object.keys(CATALOG)) {
    const brandsObj = CATALOG[category];
    for (const brand of Object.keys(brandsObj)) {
      for (const item of brandsObj[brand]) {
        list.push({
          id: `p${n++}`,
          category,
          brand,
          name: item.name,
          price: item.price,
          source: SOURCE_TEXT,
          specs: item.specs, // specA/B/C
        });
      }
    }
  }

  // 依 CATEGORIES 的順序排序（比較美觀）
  const catOrder = new Map(CATEGORIES.map((c, idx) => [c, idx]));
  list.sort((a, b) => {
    const ca = catOrder.get(a.category) ?? 999;
    const cb = catOrder.get(b.category) ?? 999;
    if (ca !== cb) return ca - cb;
    if (a.brand !== b.brand) return a.brand.localeCompare(b.brand);
    return a.name.localeCompare(b.name);
  });

  // 重新補一個 seq 讓「預設排序」能回來
  list.forEach((p, i) => (p._seq = i));

  return list;
}

const products = buildProductsFromCatalog();

// ======================
// state
// ======================
const state = {
  category: "",
  brand: "",
  q: "",
  minPrice: "",
  maxPrice: "",
  sort: "default", // default / priceAsc / priceDesc
  compareIds: [],
  page: 1,
};

// ======================
// DOM
// ======================
const elList = document.getElementById("list");
const elCategory = document.getElementById("category");
const elBrand = document.getElementById("brand");
const elSort = document.getElementById("sort");
const elCountBadge = document.getElementById("countBadge");
const elPageInfo = document.getElementById("pageInfo");
const elPageNums = document.getElementById("pageNums");
const elChips = document.getElementById("chips");
const elCompareTableWrap = document.getElementById("compareTableWrap");

// ======================
// init options
// ======================
function initCategoryOptions() {
  const cats = [...new Set(products.map(p => p.category))];
  for (const c of cats) {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    elCategory.appendChild(opt);
  }
}

function initBrandOptions() {
  elBrand.innerHTML = `<option value="">全部</option>`;
  const pool = state.category ? products.filter(p => p.category === state.category) : products;
  const brands = [...new Set(pool.map(p => p.brand))].sort();
  for (const b of brands) {
    const opt = document.createElement("option");
    opt.value = b;
    opt.textContent = b;
    elBrand.appendChild(opt);
  }
}

// ======================
// filtering + sorting + paging
// ======================
function getFilteredProducts() {
  const q = state.q.trim().toLowerCase();
  const min = state.minPrice === "" ? null : Number(state.minPrice);
  const max = state.maxPrice === "" ? null : Number(state.maxPrice);

  let list = products.filter(p => {
    if (state.category && p.category !== state.category) return false;
    if (state.brand && p.brand !== state.brand) return false;

    if (q) {
      const hay = `${p.name} ${p.brand} ${p.category}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    if (min !== null && p.price < min) return false;
    if (max !== null && p.price > max) return false;

    return true;
  });

  if (state.sort === "priceAsc") {
    list = [...list].sort((a, b) => a.price - b.price);
  } else if (state.sort === "priceDesc") {
    list = [...list].sort((a, b) => b.price - a.price);
  } else {
    list = [...list].sort((a, b) => a._seq - b._seq);
  }

  return list;
}

function getPaged(list) {
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (state.page > totalPages) state.page = totalPages;
  if (state.page < 1) state.page = 1;

  const start = (state.page - 1) * PAGE_SIZE;
  return {
    pageItems: list.slice(start, start + PAGE_SIZE),
    total,
    totalPages,
  };
}

// ======================
// compare
// ======================
function addToCompare(id) {
  if (state.compareIds.includes(id)) return;
  if (state.compareIds.length >= 3) {
    alert("最多只能比較 3 個商品");
    return;
  }
  state.compareIds.push(id);
  renderAll();
}

function removeFromCompare(id) {
  state.compareIds = state.compareIds.filter(x => x !== id);
  renderAll();
}

// ======================
// page numbers（每 10 頁一組）
// ======================
function renderPageNums(totalPages) {
  elPageNums.innerHTML = "";
  if (totalPages <= 1) return;

  const group = Math.floor((state.page - 1) / PAGE_GROUP_SIZE);
  const start = group * PAGE_GROUP_SIZE + 1;
  const end = Math.min(start + PAGE_GROUP_SIZE - 1, totalPages);

  function makeBtn(text, page, active = false) {
    const btn = document.createElement("button");
    btn.className = "pageNumBtn" + (active ? " active" : "");
    btn.textContent = text;
    btn.addEventListener("click", () => {
      state.page = page;
      renderAll();
    });
    return btn;
  }

  if (start > 1) elPageNums.appendChild(makeBtn("«", start - 1));

  for (let p = start; p <= end; p++) {
    elPageNums.appendChild(makeBtn(String(p), p, p === state.page));
  }

  if (end < totalPages) elPageNums.appendChild(makeBtn("»", end + 1));
}

// ======================
// specs viewer（alert 跳框）
// ======================
function showSpecs(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  const labels = CATEGORY_SPEC_LABELS[p.category] ?? ["規格A", "規格B", "規格C"];
  const lines = [
    `種類: ${p.category}`,
    `品牌: ${p.brand}`,
    `價格: $${p.price.toLocaleString()}`,
    `來源: ${p.source}`,
    "",
    `${labels[0]}: ${p.specs.specA}`,
    `${labels[1]}: ${p.specs.specB}`,
    `${labels[2]}: ${p.specs.specC}`,
  ].join("\n");

  alert(`${p.name}\n\n${lines}`);
}

// ======================
// Render：商品列表
// ======================
function renderList() {
  const filtered = getFilteredProducts();
  const { pageItems, total, totalPages } = getPaged(filtered);

  elCountBadge.textContent = `顯示 ${total} / ${products.length}`;
  elPageInfo.textContent = `第 ${state.page} / ${totalPages} 頁（每頁 ${PAGE_SIZE}）`;

  renderPageNums(totalPages);

  elList.innerHTML = "";
  if (total === 0) {
    elList.innerHTML = `<div class="panel empty" style="grid-column:1/-1;">沒有符合條件的商品</div>`;
    return;
  }

  const labels = CATEGORY_SPEC_LABELS[state.category] ?? ["規格A", "規格B", "規格C"];
  const [k1, k2, k3] = labels;

  for (const p of pageItems) {
    const inCompare = state.compareIds.includes(p.id);
    const disabled = !inCompare && state.compareIds.length >= 3;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="row">
        <div>
          <div class="name">${p.name}</div>
          <div class="meta">${p.brand} ・ ${p.category} ・ <span title="資料來源">${p.source}</span></div>
        </div>
        <div class="price">$${p.price.toLocaleString()}</div>
      </div>

      <div class="meta">
        ${k1}：${p.specs.specA}　|　${k2}：${p.specs.specB}<br/>
        ${k3}：${p.specs.specC}
      </div>

      <div class="row">
        <button ${inCompare ? "disabled" : ""} ${disabled ? "disabled" : ""} data-add="${p.id}">
          ${inCompare ? "已加入比較" : "加入比較"}
        </button>
        <button class="secondary" data-view="${p.id}">查看規格</button>
      </div>
    `;
    elList.appendChild(card);
  }

  elList.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => addToCompare(btn.dataset.add));
  });
  elList.querySelectorAll("[data-view]").forEach(btn => {
    btn.addEventListener("click", () => showSpecs(btn.dataset.view));
  });
}

// ======================
// Render：比較區
// ======================
function renderCompare() {
  const items = state.compareIds.map(id => products.find(p => p.id === id)).filter(Boolean);

  // chips
  elChips.innerHTML = "";
  if (items.length === 0) {
    elChips.innerHTML = `<div class="panel empty">尚未加入比較商品（建議至少選 2 個）</div>`;
  } else {
    for (const p of items) {
      const chip = document.createElement("div");
      chip.className = "chip";
      chip.innerHTML = `
        <b>${p.name}</b>
        <span class="meta">($${p.price.toLocaleString()})</span>
        <button class="secondary" data-rm="${p.id}">移除</button>
      `;
      elChips.appendChild(chip);
    }
    elChips.querySelectorAll("[data-rm]").forEach(btn => {
      btn.addEventListener("click", () => removeFromCompare(btn.dataset.rm));
    });
  }

  // 比較表
  elCompareTableWrap.innerHTML = "";
  if (items.length < 2) {
    elCompareTableWrap.innerHTML = `<div class="panel empty">比較表需至少 2 個商品才會顯示。</div>`;
    return;
  }

  const keys = ["category", "brand", "price", "source", "specA", "specB", "specC"];
  const labelMap = {
    category: "種類",
    brand: "品牌",
    price: "價格",
    source: "來源",
    specA: "規格A",
    specB: "規格B",
    specC: "規格C",
  };

  const head = `<tr><th>項目</th>${items.map(p => `<th>${p.name}</th>`).join("")}</tr>`;
  const rows = keys.map(k => {
    const tds = items.map(p => {
      if (k === "category") return `<td>${p.category}</td>`;
      if (k === "brand") return `<td>${p.brand}</td>`;
      if (k === "price") return `<td>$${p.price.toLocaleString()}</td>`;
      if (k === "source") return `<td>${p.source}</td>`;
      return `<td>${p.specs[k] ?? "—"}</td>`;
    }).join("");
    return `<tr><th>${labelMap[k] ?? k}</th>${tds}</tr>`;
  });

  elCompareTableWrap.innerHTML = `
    <table aria-label="比較表">
      <thead>${head}</thead>
      <tbody>${rows.join("")}</tbody>
    </table>
  `;
}

// ======================
// main render
// ======================
function renderAll() {
  renderList();
  renderCompare();
}

// ======================
// events
// ======================
document.getElementById("q").addEventListener("input", (e) => {
  state.q = e.target.value;
  state.page = 1;
  renderAll();
});

document.getElementById("minPrice").addEventListener("input", (e) => {
  state.minPrice = e.target.value;
  state.page = 1;
  renderAll();
});

document.getElementById("maxPrice").addEventListener("input", (e) => {
  state.maxPrice = e.target.value;
  state.page = 1;
  renderAll();
});

elSort.addEventListener("change", (e) => {
  state.sort = e.target.value;
  state.page = 1;
  renderAll();
});

elCategory.addEventListener("change", (e) => {
  state.category = e.target.value;

  // 類別切換：重置品牌、頁數、比較
  state.brand = "";
  state.page = 1;
  state.compareIds = [];

  initBrandOptions();
  document.getElementById("brand").value = "";
  renderAll();
});

elBrand.addEventListener("change", (e) => {
  state.brand = e.target.value;
  state.page = 1;
  renderAll();
});

document.getElementById("clearCompare").addEventListener("click", () => {
  state.compareIds = [];
  renderAll();
});

// init
initCategoryOptions();
initBrandOptions();
renderAll();
