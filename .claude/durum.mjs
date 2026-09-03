// SessionStart kancası: pencere açılır açılmaz DURUM.md'yi bağlama basar.
// Sıra: laptop hakim katmanı → bu repo → kardeş repo. İlk bulunan basılır.
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
const adaylar = [
  'D:\\SINAN-MERKEZ\\02-hakim\\DURUM.md',
  resolve(here, '..', 'DURUM.md'),
  resolve(here, '..', '..', 'sinanakyurek', 'DURUM.md'),
];
const yol = adaylar.find(p => existsSync(p));
if (!yol) { console.log('DURUM.md bulunamadı — hakim katman erişilemez, sayılar için Gmail "Yönetici Raporu" oku.'); process.exit(0); }
console.log(`=== DURUM (otomatik basıldı: ${yol}) ===`);
console.log(readFileSync(yol, 'utf8'));
console.log('=== KURAL: Bu pencere yeniden teşhis YAPMAZ. "AÇIK İŞLER"den sıradakini yapar; bitince DURUM.md\'de o satırı günceller. ===');
