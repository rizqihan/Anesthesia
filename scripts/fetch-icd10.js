const fs = require('fs');
const path = require('path');

const RAW_URL = 'https://raw.githubusercontent.com/fendis0709/icd-10/master/master_icd_x.json';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'icd10-full.json');

// Make sure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function getChapter(code) {
  if (!code || code.length < 3) return 'Chapter XXII: Codes for special purposes';
  
  const category = code.slice(0, 3).toUpperCase();
  const letter = category[0];
  const num = parseInt(category.slice(1, 3), 10);
  
  if (isNaN(num)) return 'Chapter XXII: Codes for special purposes';

  if (letter === 'A' || letter === 'B') {
    return 'Chapter I: Certain infectious and parasitic diseases';
  }
  if (letter === 'C' || (letter === 'D' && num <= 48)) {
    return 'Chapter II: Neoplasms';
  }
  if (letter === 'D' && num >= 50 && num <= 89) {
    return 'Chapter III: Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism';
  }
  if (letter === 'E') {
    return 'Chapter IV: Endocrine, nutritional and metabolic diseases';
  }
  if (letter === 'F') {
    return 'Chapter V: Mental and behavioural disorders';
  }
  if (letter === 'G') {
    return 'Chapter VI: Diseases of the nervous system';
  }
  if (letter === 'H' && num <= 59) {
    return 'Chapter VII: Diseases of the eye and adnexa';
  }
  if (letter === 'H' && num >= 60 && num <= 95) {
    return 'Chapter VIII: Diseases of the ear and mastoid process';
  }
  if (letter === 'I') {
    return 'Chapter IX: Diseases of the circulatory system';
  }
  if (letter === 'J') {
    return 'Chapter X: Diseases of the respiratory system';
  }
  if (letter === 'K') {
    return 'Chapter XI: Diseases of the digestive system';
  }
  if (letter === 'L') {
    return 'Chapter XII: Diseases of the skin and subcutaneous tissue';
  }
  if (letter === 'M') {
    return 'Chapter XIII: Diseases of the musculoskeletal system and connective tissue';
  }
  if (letter === 'N') {
    return 'Chapter XIV: Diseases of the genitourinary system';
  }
  if (letter === 'O') {
    return 'Chapter XV: Pregnancy, childbirth and the puerperium';
  }
  if (letter === 'P') {
    return 'Chapter XVI: Certain conditions originating in the perinatal period';
  }
  if (letter === 'Q') {
    return 'Chapter XVII: Congenital malformations, deformations and chromosomal abnormalities';
  }
  if (letter === 'R') {
    return 'Chapter XVIII: Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified';
  }
  if (letter === 'S' || letter === 'T') {
    return 'Chapter XIX: Injury, poisoning and certain other consequences of external causes';
  }
  if (letter >= 'V' && letter <= 'Y') {
    return 'Chapter XX: External causes of morbidity and mortality';
  }
  if (letter === 'Z') {
    return 'Chapter XXI: Factors influencing health status and contact with health services';
  }
  if (letter === 'U') {
    return 'Chapter XXII: Codes for special purposes';
  }
  return 'Chapter XXII: Codes for special purposes';
}

function getBlock(code) {
  if (!code || code.length < 3) return 'Other';
  const category = code.slice(0, 3).toUpperCase();
  const letter = category[0];
  const num = parseInt(category.slice(1, 3), 10);
  if (isNaN(num)) return 'Other';
  
  // Standard 10-group category block, e.g. A00-A09, B20-B29
  const tens = Math.floor(num / 10) * 10;
  const start = String(tens).padStart(2, '0');
  const end = String(tens + 9).padStart(2, '0');
  return `${letter}${start}-${letter}${end}`;
}

async function fetchICD10() {
  console.log(`Fetching from ${RAW_URL}...`);
  try {
    const res = await fetch(RAW_URL);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    console.log(`Successfully fetched ${data.length} raw codes.`);

    const formatted = data.map(item => {
      const code = item.kode_icd.trim();
      const name = item.nama_icd.trim();
      const indonesian = item.nama_icd_indo ? item.nama_icd_indo.trim() : '';
      
      const chapter = getChapter(code);
      const block = getBlock(code);
      
      return {
        code,
        name,
        indonesian,
        chapter,
        block
      };
    });

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(formatted, null, 2), 'utf-8');
    console.log(`Saved formatted ICD-10 data to ${OUTPUT_FILE}`);
  } catch (err) {
    console.error('Error fetching ICD-10 data:', err);
    process.exit(1);
  }
}

fetchICD10();
