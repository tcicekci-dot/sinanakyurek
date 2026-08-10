# Meta Reklam — Tecrübe Kaydı

Bu dosya, Meta reklam hesaplarında karşılaşılan somut sorunların ve çalışan
çözümlerin kalıcı kaydıdır. Her pencere (Claude oturumu) bu konuya girdiğinde
önce bunu okur, sonuna yeni tecrübeyi ekler.

Son güncelleme: 2026-08-10

---

## 1. Hesap haritası

| Hesap | ID | Durum | Not |
|---|---|---|---|
| DRSİNAN_2 | 1142158217750086 | ACTIVE | **Çalışılabilir tek hesap.** MCP açık. |
| South_Park | 1101277075661110 | ACTIVE | MCP **kapalı** — API'den görülemez, Ads Manager gerekir |
| DRSİNAN | 3582420238750258 | UNSETTLED | Ödenmemiş bakiye. Ödeme yansıyana kadar sorgulanamaz |
| Clinixsa TR | 906256387607985 | DISABLED | "Olağan dışı aktivite" — Meta ile iletişim gerekir |
| Dr. Sinan Akyürek | 3153176485009357 | ACTIVE | MCP açık, kullanılmıyor |
| Diğer 5 hesap | — | CLOSED | — |

Sayfa: `112163798554710` (Dr.S.Akyürek) — reklam hesabına bağlı **tek** sayfa.

---

## 2. İLAN YÜKLEME — asıl mesele

### Kural: reklam setinin hedefi, kreatifin biçimini belirler

`optimization_goal = CONVERSATIONS` (WhatsApp mesajlaşma) olan bir reklam setine
**sıradan video kreatifi konulamaz.** Kreatifin WhatsApp hedefini taşıması gerekir:
`call_to_action.value.app_destination = "WHATSAPP"`.

Aksi halde reklam oluşur ama şu hatayla ölü doğar:
> `Invalid Creative For Objective: The ad's creative is incompatible with the objective of the campaign`

### Denenen yollar ve sonuçları

| Yöntem | Sonuç |
|---|---|
| `ads_create_creative` (page_id + video_id + image_url) → `ads_create_ad` | Kreatif ve reklam **oluşur**, ama CONVERSATIONS setinde `Invalid Creative For Objective` verir. WhatsApp hedefi eklenemiyor — araç bu alanı sunmuyor. |
| `ads_create_ad` + inline `object_story_spec` + `call_to_action.value.app_destination` | `Missing media` — inline `video_data` **`image_url` kabul etmiyor**, `image_hash` şart |
| Aynısı, thumbnail hiç verilmeden | `Your ad needs a video thumbnail: specify image_hash or image_url` |
| `ads_creative_upload_image` ile hash üretmek | **Bu hesapta araç kapalı** ("gradually being rolled out") |
| `ads_create_ad` + `object_story_id` ("sayfaID_videoID") | `The reel you selected is not available` — videolar reel, promote edilemiyor |
| `ads_creative_update` ile mevcut kreatife CTA eklemek | **İmkânsız** — kreatifin medyası, metni, linki ve CTA'sı Meta API'de değiştirilemez (immutable) |

### Sonuç (2026-08-10 itibarıyla)

**WhatsApp mesajlaşma hedefli bir reklam, mevcut MCP araçlarıyla sıfırdan
oluşturulamıyor.** Kilit `image_hash`: inline spec onu şart koşuyor, üreten araç
ise bu hesapta kapalı.

**Çalışan tek yol — Ads Manager'da:**
1. Halihazırda çalışan bir WhatsApp mesaj reklamını **çoğalt** (Duplicate)
2. Hedef reklam setini seç
3. Sadece **videoyu ve metni değiştir** — CTA/hedef yapısı kopyadan korunur

Bu yol, kreatifi sıfırdan kurmadığı için `image_hash` sorununu tamamen atlar.

### Yeniden denenecek
`ads_creative_upload_image` hesapta açıldığında yöntem şu olur:
`upload_image → image_hash` → `ads_create_ad` + inline `object_story_spec`
(`video_data.image_hash` + `call_to_action.value.app_destination = WHATSAPP`).
Açılıp açılmadığını araç çağırarak test et; hata metni "gradually being rolled
out" ise hâlâ kapalı.

---

## 3. Kök neden: silinen organik gönderiler

Hesaptaki **46 bozuk reklamın tamamı** aynı sebebe çıkıyor — reklamlar organik
Instagram/Facebook gönderilerine bağlı ve o gönderiler siliniyor.

| Hata | Adet | Anlamı |
|---|---|---|
| `Video Couldn't Be Loaded` | 21 | Kaynak video erişilemez |
| `Promoted post is unavailable` | 17 | Gönderi silinmiş/yayından kalkmış |
| `Ad Creative Is Incomplete: reel not available` | 4 | Reel silinmiş |
| `Invalid Creative For Objective` | 4 | Bölüm 2'deki sorun |

**Bunun bedeli ölçüldü.** Hesabın en iyi iki reklamı bu yüzden geri açılamıyor:

- `Lemoon - 2` → ₺62,14/konuşma — gönderisi silinmiş, **kalıcı kayıp**
- `3` (karma-13) → ₺79,71/konuşma, **CTR %3,67 (hesap rekoru)** — kalıcı kayıp

Öğrenme verisi de gidiyor; yerine konan "Kopya" reklamlar sıfırdan öğreniyor.

**Kural: reklamı organik gönderiye bağlama.** Videoyu doğrudan reklam hesabına
yükle. O zaman biri gönderiyi silse bile reklam çalışmaya devam eder.

---

## 4. Performans referansı (son 30 gün, DRSİNAN_2)

Ortalama **₺80/mesajlaşma konuşması**. Karar verirken bu çizgiyi kullan.

| Kampanya | Harcama | Konuşma | ₺/konuşma | CTR |
|---|---|---|---|---|
| karma: mikro-greft… - 13 | ₺19.659 | 298 | **₺65,97** | 1,75% |
| karma: mikro-greft… - 13K | ₺20.234 | 304 | **₺66,56** | 1,56% |
| karma: sıvı yüz+lemon - 5 | ₺16.298 | 218 | ₺74,76 | 3,04% |
| karma: selülit… - 16 | ₺20.140 | 249 | ₺80,88 | 2,23% |
| detoks-lift - 1 / - 2 | ₺16.554 | 163 | ₺101,5 | 2,5% |
| kisisellestirilmis-ekzozom | ₺8.200 | 28 | **₺292,85** | 1,71% |

En iyi tekil reklam: karma-13K içindeki `1` → **₺38,80/konuşma**.

**Karar eşiği:** ₺150/konuşma üstü bir kampanya 30 gün sürdürülmemeli.
Ekzozom (₺292,85) bu yüzden 2026-08-10'da duraklatıldı; ₺1.120/gün bütçesi
karma-13 (→₺2.060) ve karma-13K (→₺1.600) arasında bölündü.

---

## 5. Araç tuzakları

- **Bütçe değiştirmek kampanyayı duraklatabiliyor.** `ads_update_entity` ile
  `daily_budget` değiştirdiğinde yanıttaki `status_forced_to_paused` alanına bak.
  `true` ise kampanyayı hemen `ads_activate_entity` ile geri aç. 2026-08-10'da
  karma-13K bu yüzden istemsizce duraklatıldı.
- **Sporadik `Object with ID 'N' does not exist` hatası** araç katmanından
  geliyor, gerçek değil — aynı çağrıyı bir kez tekrarla, geçiyor.
- **`ads_get_ad_entities` bazı alanları reddediyor.** Reklam seti seviyesinde
  `billing_event`, `destination_type`, `promoted_object` desteklenmiyor.
- **Metrik istiyorsan `date_preset` veya `time_range` şart.** Yoksa sadece
  nitelikler döner, harcama/sonuç gelmez.
- **Aktivasyon kademeli.** Üst öğeyi açmak alt öğeleri açmaz. Yayın için
  kampanya + reklam seti + reklam üçünün de ACTIVE olması gerekir.
- **Bütçeler kuruş cinsinden.** ₺10.000/gün = `1000000`.

---

## 6. Tecrübe kayıtları

### 2026-08-10 — Fatura sonrası aktivasyon
5 kampanya (sivi-yuz-germe, lemon-bottle, kisisellestirilmis-ekzozom,
detoks-lift 1-2) duraklatılmış haldeydi, aktive edildi. Reklamları zaten ACTIVE'di,
sadece kampanya seviyesi kapalıydı — `effective_status: CAMPAIGN_PAUSED` bunun
işareti.

### 2026-08-10 — 3-secim-paket tıkanıklığı
Kampanya + reklam seti kuruluydu ama **içinde hiç reklam yoktu**. 30 Temmuz'da
hazırlanmış 12 kreatif de hiçbir reklama bağlanmamıştı (aslında 4 ayrı video,
her biri 3 kopya). 4 reklam oluşturuldu, hepsi Bölüm 2'deki hataya takıldı.
Bütçe ₺15.000 → ₺10.000/gün, tarih 9-13 Ağustos olarak ayarlandı.
**Durum: Ads Manager'da çoğaltma yöntemiyle çözülmeyi bekliyor.**
