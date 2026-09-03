# DURUM — her pencereye açılışta otomatik basılır (3 Eylül 2026, 22:50)

Bu dosya SessionStart kancasıyla (`.claude/settings.json` → `.claude/durum.mjs`) her
pencereye basılır; okumayı unutmak mümkün değil. Asıl nüsha laptopta
`D:\SINAN-MERKEZ\02-hakim\DURUM.md` olacak (Açık iş 1); kanca önce onu arar.

Tek cümle: **Lead bol, randevu yok.** Günde 90–180 hasta adayı geliyor, günde 2–5
randevu çıkıyor. Darboğaz reklam değil; lead'in fiyat aldıktan sonra insan eline
geçmemesi. Bu dosya ≤4 KB kalır; değişen satır yerinde güncellenir, tarih düşülür.

## Sayılar (doğrulanmış — kaynak: Yönetici Raporu 2 Eyl, Slack Sekreter 4.0, Meta API)
- Reklam DRSİNAN_2: ₺7–15 bin/gün (Temmuz ortası ₺19 bin/gün idi). 2 aktif kampanya:
  karma-13 ₺5.500/gün, karma-5 ₺3.700/gün. ₺96–101/konuşma. Google ₺1 bin/gün.
- Son 7 gün: ₺82.655 → 871 konuşma → 881 lead → 20 "Randevu verildi" + 32 "Olumlu"
  = **randevu/lead %2,3**.
- Lead durumu 7 gün: %72 "Hastadan dönüş bekleniyor" (635 kayıt, hepsi 1 günden
  yaşlı). "Sorumlu" alanı 881 lead'in tamamına yakınında BOŞ — kimseye atanmıyor.
- Melisa (WhatsApp botu) sohbetlerin %86,6'sını tek başına yürütüyor → pozitif %5,1.
  Operatör girince %11,5. Telefonla halledilen %57. Sohbetlerin %88'i botun son
  mesajıyla bitiyor (1–15 Ağu ölçümü, 2.304 sohbet).
- Arama ekibi (Didem, Miray, Çiğdem, Cansu, Elif): 31 Ağu–3 Eyl 368 arama → 9
  randevu; 3 Eyl 62 arama → 0. Aradıkları liste Ağustos'un soğuk backlog'u
  (980 kişi). **Günün sıcak lead'lerini kimse aramıyor.**
- Ciro geriye bakıyor: 1–2 Eyl ₺307 bin, Ağustos ₺2,5 milyon (CRM). Takvim ileri
  bakıyor: Cum+Cmt 5 randevu (kullanıcı beyanı, eskiden ~40). Kasa Ağustos'un
  kuyruğu; takvim boş kalırsa 1–2 hafta içinde kasa da düşer.
- Cironun %65'i reklamsız gelen botoks/dolgu/Profhilo'dan (9–15 Ağu). Botoks
  kampanyası "karma: botoks+dolgu+mezoterapi - WP - eyl26 - TASLAK" var: PAUSED,
  içinde reklam YOK.
- Harcama seyri (haftalık, DRSİNAN_2): 13–19 Tem ₺137 bin · 20 Tem–9 Ağu ₺14–28 bin
  (fatura/tatil çukuru) · 10–16 Ağu ₺144 bin · 17–30 Ağu ₺71–76 bin · 31 Ağu–3 Eyl
  ₺29,5 bin (4 gün).

## Karar (3 Eyl)
1. Reklam bütçesi ARTIRILMAZ. Aranmayan lead almak = ₺95'i çöpe atmak.
2. Arama ekibi önceliği: (a) son 72 saatin "Hastadan dönüş bekleniyor" lead'leri,
   (b) "Olumlu Hasta" havuzu, (c) 980'lik soğuk liste EN SON.
3. Ölçüt ₺/konuşma değil: **randevu/lead** ve **60 dk içinde aranan lead yüzdesi**.
   Hedef: randevu/lead %2,3 → %6 (haftalık).
4. Melisa: fiyat verildi + 30 dk cevap yok → insan arama kuyruğuna düşsün;
   sohbet botun son mesajıyla değil, randevu sorusuyla kapansın.
5. Botoks/dolgu kampanyası Ads Manager'da çoğaltma yöntemiyle açılır
   (META-REKLAM-TECRUBE.md §2), kaynak: karma-5 reklamı. ₺1.000/gün, 7 gün test.

## AÇIK İŞLER — sıradaki pencere teşhis değil, bunu yapar
1. [laptop] Bu dosyayı `D:\SINAN-MERKEZ\02-hakim\DURUM.md`'ye koy; sabah Yönetici
   Raporu'nu üreten rutine son adım ekle: "Sayılar" bloğunu veri ambarından tazele,
   dosyayı `sinanakyurek` reposuna kopyala, commit + push. Böylece bulut pencere de
   aynı sayıyı görür.
2. [laptop] Arama ekibine yeni öncelik maili (sıcak 72 saat → Olumlu havuzu → soğuk
   liste). Onay: Tamer. Kimlik: drsinanmed@.
3. [Tamer, Ads Manager] Botoks/dolgu/mezoterapi kampanyasını karma-5 reklamını
   çoğaltarak aç, ₺1.000/gün, 7 gün.
4. [Timur, Slack] F2 otomatik atama (5 operatör round-robin) + "fiyat verildi, 30 dk
   sessiz → arama kuyruğu" kuralı.
5. [laptop] Günlük ölçüt satırı: randevu/lead ve 60 dk içinde aranan lead yüzdesi;
   Yönetici Raporu'na eklenir.
Biten iş silinmez, başına [x] ve tarih konur; 7 günden eski [x] satırlar temizlenir.

## Veri nerede — laptop (kullanıcı beyanı: Ağustos boyunca her gün her veri çekildi)
Günlük CRM/lead/reklam çekimleri, kasa ve gider dosyaları laptopta; kesin yollar
`D:\SINAN-MERKEZ\02-hakim\SISTEM-HARITASI.md`. Bulut pencere buna erişemez;
oradan bakmadan "veri yok" DEME, "laptop'ta, bu pencereden görünmüyor" de.

## Yapılmayacaklar
- Yeni kreatif/kampanya serisi açma (lead darboğazı yok). SEO, blog, sosyal bu
  krizin çözümü değil; hattı bozmadan rutinde bırak.
- Meta API'de WhatsApp reklamı sıfırdan kurmayı yeniden deneme (§2 kapalı).
- CRM'de "Hastadan dönüş bekleniyor" durumunu toplu değiştirme; T2 dosyası Timur'da.

## Erişim haritası (bulut pencere)
- Görür: bu repo · sinanakyurek-site · Gmail (Yönetici Raporu her sabah, gönderen
  drsinanmed@) · Slack #drsinanakyurekklinik (Sekreter 4.0, 00:01) · Drive
  (reklam-lead-*.tsv, crm-haftalik-*.md, CRM-YAPI-HARITASI.md) · Meta API DRSİNAN_2.
- Görmez: D:\SINAN-MERKEZ · D:\Claude\Projects\marketing-sinan (PANO/KARARLAR) ·
  crm.asistan7-24.com (ağ politikası) · South_Park hesabı (MCP kapalı).

## Kişiler
Tamer (karar) · Sinan Hoca (klinik) · Didem (arama, 25 Ağu'dan) · Miray, Çiğdem,
Cansu, Elif (arama) · Timur, Umut (tektip = CRM/asistan 7/24 sağlayıcısı) · Hilal
(sosyal, YouTube) · Melisa (WhatsApp botu) · Sekreter 4.0 (Slack rapor botu) ·
drsinanmed@ "Deniz Kocazeka / Tolga" (Tamer adına yazan dijital asistan kimliği).
