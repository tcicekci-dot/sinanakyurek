---
description: Meta reklam tecrübe dosyasını oku, bu penceredeki yeni tecrübeyi kaydet
---

# Tecrübe kaydı

Bu pencerede Meta reklam / ilan yükleme konusuna girildi.

## 1. Önce oku

`META-REKLAM-TECRUBE.md` dosyasını oku. Daha önce çözülmüş bir sorunu tekrar
çözmeye çalışma; dosyada "denendi, olmadı" diye geçen bir yolu tekrar deneme.

Dosya `tcicekci-dot/sinanakyurek` deposunda. Bu pencerede yoksa:
`git clone --depth 1 https://github.com/tcicekci-dot/sinanakyurek`

## 2. Sonra çalış

Bölüm 5'teki araç tuzaklarına dikkat et — özellikle:
- Bütçe değiştirdikten sonra `status_forced_to_paused` alanını kontrol et
- `Object with ID 'N' does not exist` hatası sahte, çağrıyı tekrarla
- Metrik için `date_preset` şart

## 3. Bitirirken kaydet

Aşağıdakilerden **herhangi biri** olduysa dosyaya ekle:

- Yeni bir hata mesajı gördün → Bölüm 3'teki tabloya ekle, ne anlama geldiğini yaz
- Bir yöntem çalıştı ya da çalışmadı → Bölüm 2'deki tabloya satır ekle
- Bir araç kısıtı/tuzağı buldun → Bölüm 5'e ekle
- Kampanya durdurdun/açtın, bütçe değiştirdin → Bölüm 6'ya tarihli kayıt ekle
- Performans rakamları değişti → Bölüm 4'ü güncelle

Kayıt formatı — kısa, somut, tarihli:

```
### YYYY-MM-DD — Tek cümlelik başlık
Ne yapıldı, ne oldu, hangi hata çıktı, sonuç ne. ID'leri yaz.
```

Tahmin yazma. Sadece **gerçekten karşılaştığın** şeyi yaz. Bir yöntemi
denemediysen "denenmedi" diye işaretle, "çalışmaz" deme.

## 4. Push et

Değişikliği commit'leyip push et ki diğer pencereler de görsün.
