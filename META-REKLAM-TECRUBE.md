# Meta Reklam — Tecrübe Kaydı

Bu dosya, Meta reklam hesaplarında karşılaşılan somut sorunların ve çalışan
çözümlerin kalıcı kaydıdır. Her pencere (Claude oturumu) bu konuya girdiğinde
önce bunu okur, sonuna yeni tecrübeyi ekler.

Son güncelleme: 2026-08-15

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

**Güncellendi 2026-08-15.** Ortalama artık ₺80 değil — harmanlanmış
**₺108,52/konuşma**, sadece ACTIVE kampanyalarda **₺101,82**. Karar verirken
**₺100–110** çizgisini kullan.

Hesap toplamı: ₺250.665,68 harcama · 1.448.159 gösterim · 22.050 tıklama ·
CTR 1,52% · CPM ₺173,09 · 2.187 konuşma.

| Kampanya | Harcama | Konuşma | ₺/konuşma | CTR |
|---|---|---|---|---|
| karma: mikro-greft… - WP - 13 | ₺33.415 | 431 | **₺77,53** | 1,37% |
| karma: sıvı-yüz+lemon - WP - 5 | ₺24.550 | 297 | **₺82,66** | 3,19% |
| karma: mikro-greft… - WP - 13K | ₺29.121 | 345 | **₺84,41** | 1,42% |
| karma: selülit… - WP - 16 | ₺29.150 | 312 | ₺93,43 | 2,30% |
| detoks-lift - 1 / - 2 | ₺14.680 | 142 | ₺103,4 | 2,9% |
| kisisellestirilmis-ekzozom | ₺7.454 | 53 | ₺140,64 | 1,90% |
| **3-secim-paket - agu26** | ₺16.586 | 21 | **₺789,80** | 1,21% |

**Karar eşiği ₺150/konuşma hâlâ geçerli.** Eşik üstünde ₺45.617 (hesabın
%18,2'si) harcanıp sadece 118 konuşma alındı; aynı para eşik altı verimle
(₺92,66) ~492 konuşma getirirdi → **~374 konuşma kaybı**.

Ayrıntılı kampanya kırılımı ve ciro/başabaş hesabı: `CIRO-REKLAM-ANALIZ.md`.

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

### 2026-08-15 — 3-secim-paket reklamı aslında yayına girdi (ve para yaktı)
Yukarıdaki 10 Ağustos kaydı eksikmiş: "4 reklamın hepsi hataya takıldı"
doğru değil. `3-secim-paket - 1` (`120248825056450413`) **ACTIVE olarak
yayınlandı** — ₺16.585,74 harcadı, 43.787 gösterim, 531 tıklama aldı.
Ama sadece **21 konuşma** → **₺789,80/konuşma**, hesap ortalamasının 7,3 katı.
Diğer 3 reklam hiç harcamadı: `- 2`, `- 3` PAUSED; `- 4`
(`120248825068280413`) PAUSED + **WITH_ISSUES**.

**Ders: `Invalid Creative For Objective` hatası alan bir kampanyanın
"yayınlanamadı" sayılması yanlış.** Kreatiflerden biri geçerse kampanya
sessizce yayına girip bütçeyi yakabiliyor. Hata gördükten sonra kampanyayı
harcama tarafından da kontrol et — reklam seviyesinde `amount_spent` bak.
Tıklama gelip konuşma gelmemesi (531 → 21, %3,95) kreatifin WhatsApp
hedefinin düzgün bağlanmadığına işaret ediyor.

### 2026-08-15 — Meta ciroyu hiç görmüyor
Hesap seviyesinde `purchase_roas` **null**, `result_roas` **boş**. Tüm
kampanyalar `OUTCOME_ENGAGEMENT` ve sonuç birimi
`messaging_conversation_started_7d`. **ROAS Meta'dan hesaplanamaz** —
ciro dışarıdan (klinik/24e kayıtları) girilmek zorunda. Başabaş tablosu
`CIRO-REKLAM-ANALIZ.md` Bölüm 3'te.

### 2026-08-15 — Ekzozom yeniden açılmış, maliyeti yarıya inmiş
10 Ağustos'ta ₺292,85/konuşma olduğu için duraklatılan
`kisisellestirilmis-ekzozom` şu an **ACTIVE**, ₺1.120/gün bütçeyle
**₺140,64/konuşma**. Eşiğin (₺150) hemen altında — izlemede tut.

### 2026-08-15 — ₺10.000/gün yapısı kuruldu ve doğrulandı (meta-invoice penceresi)
7 kampanya kaldı: karma-13 ₺2.500, karma-5 WP ₺1.800, IG-4 ₺1.800,
detoks-2 ₺1.400, IG-4K ₺1.200, IG-7 ₺700, lemon-bottle ₺600. 12 kampanya
durduruldu (3-secim-paket, 13K, karma-16, karma-5 IG, Mesaj 231125-3,
ekzozom dahil). 7 bütçe güncellemesinin **7'si de `status_forced_to_paused:
true` döndü** — hepsi `ads_activate_entity` ile geri açıldı, `delivery:
active/active` teyitli. Bir üstteki "ekzozom izlemede" kaydı bu planla eskidi.

### 2026-08-15 — South_Park verisi Ads Manager dökümüyle alındı
API kapalı ama kullanıcı CSV dökümü verdi: 1–15 Ağu **₺74.853,69**, 12 kampanya.
Bulgu: etkileşim formatı bu hesapta çok ucuz lead getiriyor (New Etkileşim
**₺38,86/konuşma**, lead'lerin ~%89'u sıvı yüz germe soruyor); hizmet adlı
mesaj kampanyaları ₺319–1.565/lead ile çok pahalı. Döküm günlük kırılım
vermiyor — haftalık analiz gerekiyorsa dökümü tarih filtresiyle isteyin.

### 2026-08-15 — Ciro bağlandı: haftalık ROAS ≈5,0×
Hakim haftalık ciro raporu (9–15 Ağu, ₺837.250,86) reklam harcamasıyla
eşleştirildi → `CIRO-REKLAM-ANALIZ.md` Bölüm 3.1. CRM lead dökümü (4.658
kayıt) ile Melisa bot analizi de yapıldı; hepsi ortaklar raporunda:
https://claude.ai/code/artifact/bc72eff1-ad3a-48bf-8953-77ac305a8424
Pencereler arası köprü çalışıyor: bu dosyalar repoya push'lanınca diğer
pencereler `git fetch` ile görüyor. CRM API erişimi hâlâ kapalı
(crm.asistan7-24.com ağ politikasında yok — Bölüm 3 üstündeki engel kaydı).

### 2026-09-03 — Kriz penceresi: darboğaz reklamda değil
Haftalık harcama ve kampanya durumu `DURUM.md`'ye işlendi. Bulgular: 2 aktif
kampanya (karma-13 ₺5.500, karma-5 ₺3.700) ₺96–101/konuşma ile sağlıklı;
son 7 günde 871 konuşma → 20 randevu. Randevu düşüşünün sebebi lead'in
aranmaması. **Bütçe artırılmadı.** "karma: botoks+dolgu+mezoterapi - WP - eyl26 -
TASLAK" kampanyasının içinde reklam yok (ad seviyesi sorgusu boş döndü); açılacaksa
Ads Manager çoğaltma yolu. Anomali aracı hesap için "veri yok" döndü.
