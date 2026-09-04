# Yapay zekâ arama hattı — kısa senaryo

Tarih: 4 Eylül 2026 · Hazırlayan: Claude (Tamer Çiçekçi adına) · Durum: TASLAK
Uygulayıcı: Timur (Asistan 7-24) · Liste: her sabah 07:15 koşusundan çıkan taze liste.

Listeden kullanılan alanlar: Telefon · Ad (varsa) · Kanal (Instagram / WhatsApp / site) ·
Yazışma tarihi. Fiyat ve teklif aramada geçmez.

Sistemin araması öncesi elinde olması gereken tek şey: **yarın ve ertesi günün boş
slotları** (gün + saat). Arayıcı bunlardan birini söyler.

---

## 1. Senaryo (60 saniye)

**Açılış**
> Merhaba, Sinan Klinik'ten [Arayıcı adı] ben. Görüyorum ki [Kanal] üzerinden
> kliniğimizle yazışmışsınız ama yarım kalmış. Dilerseniz yarın [saat] için yerimiz boş,
> hemen ücretsiz bir konsültasyon randevusu oluşturabilirim. Ne dersiniz?

**Dört cevap, dört çıkış**

| Hasta | Arayıcı | Sonuç |
|---|---|---|
| "Evet / olur" | "Harika, yarın [saat] için not aldım. Adres Harbiye, Teşvikiye Caddesi 19, kat 6. Bilgiyi WhatsApp'tan da yazıyorum. Teşekkürler, iyi günler." | RANDEVU |
| "Tarih değişsin / o saat olmaz" | "Tabii. [Alternatif gün] [saat] uyar mı?" Uyarsa RANDEVU. Uymazsa: "Hangi gün ararsam uygun olur?" | RANDEVU ya da TEKRAR |
| "Tatildeyim / şu tarihten sonra arayın" | "Anladım, [tarih] sonrası not aldım, o zaman ararım. İyi tatiller." | TEKRAR (tarih) |
| "Hayır, ilgilenmiyorum" | "Anladım, rahatsız ettiysem kusura bakmayın. İyi günler." | OLUMSUZ |

Kapanış her dalda aynı: "Teşekkürler, iyi günler."

**Soru gelirse** (fiyat, kaç seans, acır mı, ne yapılır, hangi ürün, kim yapıyor):
Bu listedekiler ürün ve fiyat bilgisini zaten almış kişiler; arama botu hiçbir soruya
içerik cevabı vermez. Soruların cevabı Melisa'da (WhatsApp asistanı). Bot Melisa'ya
canlı bağlamaz; soruyu WhatsApp'a düşürür. Tek kalıp:
> "Bunu size WhatsApp'tan Melisa hemen yazsın, oradan detaylı konuşursunuz.
> Randevu için yarın [saat] uyar mı?"
Bot, hastanın sorusunu TEKRAR tarihini yazdığı gibi not alanına aynen yazar
(ör. "Lemon Bottle kaç seans, ödeme taksitli mi"). Sonuç koduna SORU_WHATSAPP eklenir; arama biter bitmez Melisa o numaraya WhatsApp'tan
yazar ("Merhaba, az önce telefonda sorduğunuz [soru] hakkında..."). Randevu alındıysa
RANDEVU + SORU_WHATSAPP birlikte gider.
Fiyat söylenmez, tıbbi bilgi verilmez, tahmin yapılmaz.

**Bot → Melisa geçişi (Timur'a soru):** arama sonucundaki SORU_WHATSAPP kodu Melisa'yı
otomatik tetikleyebiliyor mu? Evetse geçiş anlık. Hayırsa akşam CSV'sindeki
SORU_WHATSAPP satırları Melisa'ya toplu verilir, Melisa ertesi sabah yazar; bu durumda
bot cümlesi "yarın sabah yazsın" olur. **(Belirsiz — Timur cevaplayacak.)**

**"Numaramı nereden buldunuz / aramayın"**:
> "Bize siz yazmıştınız; bir daha aramıyoruz, iyi günler." → ARAMA_ISTEMIYOR

## 2. Hitap

Ad sütunu gerçek bir isimse açılış "Merhaba [Ad] Hanım/Bey". Boş, rumuz, emoji, tek
harf, kullanıcı adı ise isim söylenmez, açılış "Merhaba" ile başlar.

## 3. Kurallar

- Aynı numaraya günde 1 arama; ulaşılamayana 2 gün sonra 1 tekrar; üçüncü yok.
- İki denemede randevu çıkmazsa ısrar yok, kapanış.
- Arama saati 10:00–19:00, Pazar yok. **(Belirsiz — Sinan Hoca teyit edecek.)**
- Kayıt uyarısı: Timur'un sistemi nasıl yapıyorsa öyle. **(Belirsiz.)**

## 4. Sonuç kodları → CRM

Not başına `[AI]` etiketi.

| Kod | CRM statüsü | Ek alan |
|---|---|---|
| RANDEVU | Randevu verildi | gün + saat |
| TEKRAR | Hastadan dönüş bekleniyor | tekrar arama tarihi |
| ULASILAMADI | Hasta cevap vermedi | deneme sayısı |
| OLUMSUZ | Olumsuz hasta | — |
| ARAMA_ISTEMIYOR | Olumsuz hasta | "aranmasın" işareti |
| SORU_WHATSAPP | (statü değişmez, ek kod) | hastanın sorusu aynen (zorunlu alan); Melisa WhatsApp'tan yazar |
| YANLIS_NUMARA | Olumsuz hasta | — |

## 5. Günlük rapor (Timur → bize, akşam)

CSV, satır başına bir arama: `tarih-saat, telefon, ad, sonuç kodu, randevu gün-saat,
tekrar tarihi, süre sn, kayıt linki`. Özet satırı: aranan · ulaşılan · randevu.
Ölçüt: ulaşılan içinde randevu ≥ %8 (insan ekip son 3 gün: %3,3).

## 6. Yarın sabah Timur'a gidecek paket

1. 07:15 koşusundan çıkan taze liste (Google Sheet linki).
2. Bu dosya.
3. Yarın ve ertesi günün boş slot listesi (klinik takviminden).
4. Timur'a tek soru: SORU_WHATSAPP kodu Melisa'yı otomatik tetikliyor mu?
