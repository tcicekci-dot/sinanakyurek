# Ciro ↔ Reklam Harcaması Analizi

Hesap: **DRSİNAN_2** (`1142158217750086`)
Dönem: **son 30 gün** (Meta `last_30d`, çekim tarihi 2026-08-15)

---

## 0. Önce bilinmesi gereken: Meta ciroyu görmüyor

Hesap seviyesinde `purchase_roas` **null**, `result_roas` **boş**.
Kampanyaların tamamı `OUTCOME_ENGAGEMENT` hedefli ve sonuç birimi
`messaging_conversation_started_7d` — yani Meta'nın saydığı tek şey
**başlayan WhatsApp konuşması**. Satış değeri hesaba hiç akmıyor.

**Sonuç: ROAS Meta tarafından hesaplanamaz.** Ciro dışarıdan (klinik kayıtları /
24e) girilmek zorunda. Bu dosyanın 3. bölümü o rakam geldiğinde doldurulacak
şekilde kurgulandı; 1., 2. ve 4. bölümler ciro olmadan da geçerli.

---

## 1. Harcama tarafı — gerçekleşen

| | Değer |
|---|---|
| Toplam harcama (hesap) | **₺250.665,68** |
| Gösterim | 1.448.159 |
| Erişim | 623.151 |
| Tıklama | 22.050 |
| CTR | 1,52% |
| CPM | ₺173,09 |
| Konuşma (ilk 30 kampanya) | **2.187** |
| **Harmanlanmış maliyet** | **₺108,52 / konuşma** |

İlk 30 kampanya hesabın **%94,7**'sini (₺237.339,83) kapsıyor; kalan ₺13.325,85
kampanya başına ₺1.700'ün altındaki kuyrukta.

**Sadece ACTIVE kampanyalar:** ₺216.764,91 → 2.129 konuşma → **₺101,82/konuşma**
**PAUSED kampanyalar:** ₺20.574,92 → 58 konuşma → **₺354,74/konuşma**

> Tecrübe dosyasındaki ₺80/konuşma referansı artık geçerli değil.
> Gerçek çizgi **₺100–110**. Karar eşiklerini buna göre kur.

---

## 2. Para nerede yanıyor

### 2.1 `3-secim-paket - 25000 - agu26` — tek başına en büyük kayıp

| | |
|---|---|
| Harcama | **₺16.585,74** |
| Konuşma | **21** |
| Maliyet | **₺789,80 / konuşma** |
| CTR | 1,21% |

Hesap ortalamasının **7,3 katı**. ₺150 eşiğinin **5,3 katı**.

Kampanyadaki 4 reklamın durumu:

| Reklam | Durum | Harcama |
|---|---|---|
| `3-secim-paket - 1` | ACTIVE | ₺16.585,74 |
| `3-secim-paket - 2` | PAUSED | ₺0 |
| `3-secim-paket - 3` | PAUSED | ₺0 |
| `3-secim-paket - 4` | PAUSED — **WITH_ISSUES** | ₺0 |

**Tecrübe dosyasının 6. bölümündeki kayıt bu noktada eksik.** Orada "4 reklam
oluşturuldu, hepsi `Invalid Creative For Objective` hatasına takıldı" yazıyor.
Gerçekte `- 1` reklamı yayına girdi, 43.787 gösterim ve 531 tıklama aldı —
yani kreatif *ölü doğmadı*, **çalıştı ama dönüştürmedi**. Tıklama var,
konuşma yok: 531 tıklamadan 21 konuşma = **%3,95 tıklama→konuşma oranı**.
Hesabın geri kalanında bu oran çok daha yüksek.

**Aksiyon: bu kampanya durdurulmalı.** ₺150 eşiği 2026-08-10'da ekzozom için
uygulanmıştı; bu kampanya o eşiğin 5 katında ve daha fazla para harcadı.

### 2.2 Eşik üstü toplam

₺150/konuşma üstünde çalışan kampanyalar:

| | |
|---|---|
| Harcama | **₺45.617,30** (hesabın %18,2'si) |
| Getirdiği konuşma | 118 |
| Aynı para eşik altı verimle (₺92,66) harcansaydı | **492 konuşma** |
| **Kaçırılan konuşma** | **~374** |

---

## 3. Ciro tarafı — DOLDURULACAK

Aşağıdaki tabloya son 30 günün gerçek rakamları girildiğinde analiz tamamlanır.

**Ciro kaynağı: `https://crm.asistan7-24.com/sales`** (Asistan 7-24 CRM).

> **Engel (2026-08-15):** Bu alan adı Claude Code çalışma ortamının ağ
> politikasında izinli değil. `WebFetch` → `EGRESS_BLOCKED`,
> `curl` → `CONNECT tunnel failed, response 403`. Proxy'nin kendisi çalışıyor
> (`selective: false`), yani sorun araçta değil, izin listesinde.
> Çözüm: ortam ayarlarındaki network policy'ye `crm.asistan7-24.com` eklenmeli.
> Ek olarak CRM'e giriş için kimlik doğrulama (API token tercih edilir) gerekir.

| Girdi | Değer | Kaynak |
|---|---|---|
| Toplam ciro (son 30 gün) | `?` | crm.asistan7-24.com/sales |
| Reklamdan gelen hasta sayısı | `?` | crm.asistan7-24.com/sales |
| Konuşma → hasta dönüşüm oranı | `?` | 2.187 konuşmanın kaçı hastaya döndü |
| Ortalama hasta değeri | `?` | ciro ÷ hasta |

### Başabaş eşiği (bugünkü harcamayla)

Ciro gelmeden de şu hesap yapılabilir. ₺250.665,68 harcama ve 2.187 konuşma ile,
**1x başabaş** için bir hastanın getirmesi gereken minimum tutar:

| Konuşma → hasta oranı | Hasta başına gereken ciro |
|---|---|
| %5 | ₺2.292 |
| %10 | ₺1.146 |
| %15 | ₺764 |
| %20 | ₺573 |
| %30 | ₺382 |

Kampanya adlarındaki paket fiyatları (25.000, 43.500, 49.750, 125.000) doğruysa,
**%5'lik bir dönüşüm oranı bile başabaşı fazlasıyla geçiyor.** Yani sorun
harcamanın büyüklüğü değil, **dağılımı** — 2. bölümdeki ₺45.617.

> Not: bu tablo bir tahmin değil, aritmetik. Gerçek ROAS için 3. bölümün
> üstündeki 4 girdi şart.

---

## 4. Kampanya bazında maliyet (son 30 gün)

Kötüden iyiye. Eşik üstündekiler **kalın**.

| ₺/konuşma | Harcama | Konuşma | CTR | Durum | Kampanya |
|---|---|---|---|---|---|
| **—** | ₺2.003,66 | 0 | 0,11% | PAUSED | Mesaj BK - 060726 - 1 *(awareness, konuşma hedefi yok)* |
| **₺1.693,30** | ₺1.693,30 | 1 | 1,33% | PAUSED | Mesaj 231125 - 3 - WP - Liste |
| **₺789,80** | ₺16.585,74 | 21 | 1,21% | **ACTIVE** | **3-secim-paket - 25000 - agu26** |
| **₺422,32** | ₺2.111,58 | 5 | 1,76% | PAUSED | Mesaj - 110526 - 2 |
| **₺354,65** | ₺1.773,25 | 5 | 1,31% | PAUSED | Mesaj 231125 - 2 - WP - Liste |
| **₺350,84** | ₺2.105,04 | 6 | 1,74% | PAUSED | Mesaj - 110526 - 3 |
| **₺349,39** | ₺1.746,95 | 5 | 1,72% | PAUSED | Mesaj 260126 - 3 - WP |
| **₺345,61** | ₺2.073,65 | 6 | 1,51% | PAUSED | Mesaj - 110526 - 1 |
| **₺289,76** | ₺1.738,59 | 6 | 1,84% | PAUSED | Mesaj 260126 - 4 - WP |
| **₺279,86** | ₺4.477,78 | 16 | 2,68% | **ACTIVE** | sivi-yuz-germe - 49750 - tem26 - 1 |
| **₺268,32** | ₺1.878,27 | 7 | 1,64% | PAUSED | Mesaj 231125 - 4 - WP - Liste |
| **₺215,50** | ₺1.723,97 | 8 | 1,70% | PAUSED | Mesaj 231125 - Liste - 10 |
| **₺191,85** | ₺1.726,66 | 9 | 1,69% | PAUSED | Mesaj 260126 - 1 - WP |
| **₺172,99** | ₺3.978,86 | 23 | 1,57% | **ACTIVE** | karma: sıvı-yüz+somon-dna+kök-hücre - WP - 17 |
| ₺140,64 | ₺7.454,04 | 53 | 1,90% | ACTIVE | kisisellestirilmis-ekzozom - 125000 |
| ₺124,92 | ₺9.993,84 | 80 | 1,29% | ACTIVE | Mesaj 231125 - 3 |
| ₺121,76 | ₺3.652,78 | 30 | 1,70% | ACTIVE | karma: sıvı-yüz+somon-dna+kök-hücre - IG - 17 |
| ₺119,68 | ₺4.188,72 | 35 | 1,98% | ACTIVE | lemon-bottle - 43500 - 1 |
| ₺119,50 | ₺3.823,91 | 32 | 1,08% | ACTIVE | karma: mikro-greft… - IG - 13 |
| ₺116,80 | ₺7.125,03 | 61 | 3,10% | ACTIVE | detoks-lift - 25000 - 1 |
| ₺113,01 | ₺3.955,29 | 35 | 1,88% | ACTIVE | karma: selülit… - IG - 10 |
| ₺106,02 | ₺13.782,54 | 130 | 2,24% | ACTIVE | karma: sıvı-yüz+lemon-bottle - IG - 5 |
| ₺103,28 | ₺3.614,91 | 35 | 1,14% | ACTIVE | karma: ekzozom-yüz+fraksiyonel - IG - 4K |
| ₺93,43 | ₺29.149,99 | 312 | 2,30% | ACTIVE | karma: selülit… - WP - 16 |
| ₺93,28 | ₺7.555,46 | 81 | 2,78% | ACTIVE | detoks-lift - 25000 - 2 |
| ₺93,14 | ₺3.818,56 | 41 | 0,96% | ACTIVE | karma: mikro-greft… - IG - 7 |
| ₺91,85 | ₺6.521,00 | 71 | 1,14% | ACTIVE | karma: ekzozom-yüz+fraksiyonel - IG - 4 |
| ₺84,41 | ₺29.121,33 | 345 | 1,42% | ACTIVE | karma: mikro-greft… - WP - 13K |
| ₺82,66 | ₺24.550,17 | 297 | 3,19% | ACTIVE | karma: sıvı-yüz+lemon-bottle - WP - 5 |
| **₺77,53** | ₺33.414,96 | **431** | 1,37% | ACTIVE | **karma: mikro-greft… - WP - 13** ← en verimli |

---

## 5. Öneri sırası

1. **`3-secim-paket` durdur.** ₺789,80/konuşma, ₺16.585 harcadı. Tek kalem
   en büyük kayıp.
2. **`sivi-yuz-germe - 49750 - 1` (₺279,86) ve `karma …somon-dna… WP - 17`
   (₺172,99) durdur.** İkisi birlikte ₺8.456.
3. Boşalan ~₺25.000'i **karma-13 (₺77,53)** ve **karma-lemon WP-5 (₺82,66)**
   arasında böl. Bütçe değişiminden sonra `status_forced_to_paused` alanını
   kontrol et (tecrübe dosyası Bölüm 5).
4. Ciro rakamı girildiğinde 3. bölümü doldur; asıl karar oradaki gerçek
   hasta değeri ile verilir.
