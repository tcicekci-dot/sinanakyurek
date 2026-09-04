# Yapay zekâ arama hattı — senaryo, kurallar, sonuç kodları

Tarih: 4 Eylül 2026 · Hazırlayan: Claude (Tamer Çiçekçi adına) · Durum: TASLAK
Uygulayıcı: Timur (Asistan 7-24) · Liste: her sabah 07:15 koşusundan çıkan taze sıcak
liste (bir önceki 1–3 günde WhatsApp'tan yazıp fiyat alıp sessiz kalan, telefonu olanlar).

Listenin her satırında hazır gelen alanlar: Ad · Telefon · Sorduğu işlem · Lead tarihi ·
Teklif · Fiyat TL · Öncelik (1/2/3). Arayıcı bu alanların dışına çıkmaz.

---

## 1. Tek hedef

Ücretsiz ön görüşme randevusu. Satış değil, randevu. Kapanış sorusu her zaman iki
seçenekli: "Cuma mı Cumartesi mi?" (gün adları o günün takvimine göre).

## 2. Hitap kuralı

Ad sütunu gerçek bir isimse "Merhaba [Ad] Hanım/Bey" — cinsiyet kestirilemiyorsa
"Merhaba [Ad]". Ad sütunu boş, "(isimsiz)", "(emoji)", "Bilinmiyor", tek harf, kullanıcı
adı (ör. "c56610554", "asdd02770") ya da rumuz ise isim SÖYLENMEZ: "Merhaba, ben
Dr. Sinan Akyürek Kliniği'nden arıyorum." Yanlış isimle hitap, arama kaybı sayılır.

## 3. Akış

1. Açılış (5 sn): "Merhaba [hitap], ben Dr. Sinan Akyürek Kliniği'nden arıyorum.
   [Lead tarihi] günü WhatsApp'tan [Sorduğu işlem] için yazmıştınız, uygun mu bir dakika?"
2. Uygun değilse: "Ne zaman arayayım, bugün mü yarın mı?" → saat al, sonuç kodu TEKRAR.
3. Teklif (tek cümle, satırdaki gibi): "Hocamız sizin için [Teklif] belirledi, [Fiyat] TL.
   Fiyatı konuşmadan önce ücretsiz ön görüşmede Hocamız sizi görsün istiyoruz."
   Fiyat sütunu "—" ise fiyat söylenmez: "Bu işlemde fiyat muayenesiz verilmiyor,
   ön görüşme ücretsiz."
4. Kapanış: "Ön görüşme için Cuma mı Cumartesi mi size uyar?" → gün + saat aralığı
   (sabah / öğleden sonra) → RANDEVU.
5. Teyit: "Adres Harbiye, Teşvikiye Caddesi 19, kat 6. Randevu bilgisini WhatsApp'tan
   da yazıyoruz." → kapat.

Süre hedefi 90 saniye. İki kapanış denemesinden sonra ısrar yok.

## 4. İtiraz cevapları (dışına çıkılmaz)

| Hasta | Cevap |
|---|---|
| "Pahalı / başka yerde ucuz" | "Fiyata Hocamızın belirlediği paket dahil ([Teklif]). Ön görüşme ücretsiz, gelip görün, karar sonra. Cuma mı Cumartesi mi?" |
| "Tatilden sonra / Ekim'de" | "Ekim ilk haftası için şimdiden yer ayıralım, Salı mı Perşembe mi?" → RANDEVU (ileri tarih) |
| "Düşüneceğim" | "Tabii. Hangi gün arayayım, Pazartesi mi Salı mı?" → TEKRAR |
| "Başka klinikte yaptırdım, olmadı / yan etki oldu" | "Anlıyorum. Neden olmadığını Hocamız ön görüşmede söyler, ücretsiz. Cuma mı Cumartesi mi?" Tıbbi yorum YOK. |
| Tıbbi soru (kaç seans, acır mı, kaç yıl gider, ilaçla etkileşir mi) | "Bunu Hocamız muayenede size özel söyler; ben fiyat ve randevu tarafındayım." Tek cümle, sonra kapanış. |
| "Kim verdi numaramı / aramayın" | "Bize WhatsApp'tan siz yazmıştınız; bir daha aramayız, iyi günler." → ARAMA_ISTEMIYOR |
| "İndirim yapar mısınız" | "Fiyatı Hocamız belirliyor, ben değiştiremem. Ön görüşme ücretsiz." |

## 5. Yasaklar

- Tabloda olmayan fiyat, indirim, "hediye" vaadi yok.
- Tıbbi bilgi, sonuç garantisi, "kesin çözer" yok.
- Aynı numaraya günde 1 arama; ulaşılamayana 2 gün sonra 1 tekrar; üçüncü yok.
- Arama saati 10:00–19:00, Pazar yok. **(Belirsiz — Sinan Hoca teyit edecek.)**
- Aramanın kayıt altına alındığı açılışta söylenir. **(Belirsiz — Timur'un sistemi
  nasıl uyguluyor, o söyleyecek.)**

## 6. Sonuç kodları → CRM statüsü

Her aramanın sonu tek kod. CRM'e işlerken not başına `[AI]` etiketi.

| Kod | Ne oldu | CRM statüsü | Ek alan |
|---|---|---|---|
| RANDEVU | Gün + saat aralığı alındı | Randevu verildi | randevu günü, saat aralığı |
| TEKRAR | Hasta "şu gün ara" dedi | Hastadan dönüş bekleniyor | tekrar arama tarihi |
| ULASILAMADI | Cevap yok / meşgul / kapalı | Hasta cevap vermedi | deneme sayısı |
| OLUMSUZ | Vazgeçti, ilgilenmiyor | Olumsuz hasta | kısa gerekçe (1 cümle) |
| ARAMA_ISTEMIYOR | Aranmak istemiyor | Olumsuz hasta | "aranmasın" işareti |
| YANLIS_NUMARA | Başkası çıktı | Olumsuz hasta | — |
| HEKIM_ISTIYOR | "Doktor arasın" dedi | Hastadan dönüş bekleniyor | Sinan Hoca'ya iletilir |

## 7. Günlük rapor (Timur → bize, akşam 19:30)

CSV, satır başına bir arama: `tarih-saat, telefon, ad, sorduğu işlem, sonuç kodu,
randevu günü, tekrar tarihi, süre sn, not (1 cümle), kayıt linki`.
Özet satırı: aranan · ulaşılan · randevu · randevu oranı.
Ölçüt: ulaşılan içinde randevu ≥ %8 (insan ekip son 3 gün: %3,3). İlk 2 gün sonunda
oran %5'in altındaysa senaryo gözden geçirilir, liste değil.

## 8. Yarın sabah Timur'a gidecek paket

1. 07:15 koşusundan çıkan taze liste (Google Sheet linki).
2. Bu dosya.
3. 3 Eylül teklif tablosu (16 satır; listede zaten satır bazında yazılı).
