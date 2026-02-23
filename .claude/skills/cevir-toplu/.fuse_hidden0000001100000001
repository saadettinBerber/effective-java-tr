---
name: cevir-toplu
description: Effective Java kitabının belirtilen sayfa aralığını toplu olarak sırayla çevirir. İki kullanım formatı desteklenir — aralık veya başlangıç+adet.
argument-hint: "[baslangic-bitis] veya [baslangic adet]"
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob"]
---

# Effective Java Toplu Sayfa Çeviri Skill'i

Kullanıcı bu skill'i çağırdığında aşağıdaki adımları sırayla takip et.

---

## Adım 1 — Argümanları Parse Et

`$ARGUMENTS` değerini analiz ederek çevrilecek sayfa listesini oluştur:

- **Format A — Aralık** (`9-15`): başlangıç=9, bitiş=15 → sayfalar = [9, 10, 11, 12, 13, 14, 15]
- **Format B — Başlangıç + Adet** (`9 5`): başlangıç=9, adet=5 → sayfalar = [9, 10, 11, 12, 13]

Argüman geçersizse, kullanıcıya şu hatayı göster ve dur:
```
❌ Geçersiz format. Doğru kullanım:
   /cevir-toplu 9-15     → 9'dan 15'e kadar çevirir
   /cevir-toplu 9 5      → 9'dan başlayarak 5 sayfa çevirir
```

---

## Adım 2 — Mevcut Sayfaları Kontrol Et

Her sayfa için `pages/page-X.html` dosyasının mevcut olup olmadığını kontrol et:
- **Dosya varsa**: O sayfayı **atla**, listeye `⏭️ Sayfa X — zaten çevrilmiş, atlandı` olarak kaydet.
- **Dosya yoksa**: Çeviri kuyruğuna ekle.

Kullanıcıya başlamadan önce bir özet göster:
```
📋 Toplu Çeviri Planı
━━━━━━━━━━━━━━━━━━━
Toplam istek  : X sayfa (N-M arası)
Çevrilecek    : Y sayfa
Atlanacak     : Z sayfa (zaten mevcut)

Başlıyorum...
```

---

## Adım 3 — Glossary'yi Oku

- `.claude/skills/cevir/glossary.md` dosyasını oku.
- Tüm çeviri döngüsü boyunca mevcut terimleri tutarlı şekilde kullan.
- **Önemli**: Glossary'yi sadece bir kez başta oku; her sayfa için tekrar okumana gerek yok.

---

## Adım 4 — Her Sayfa İçin Çeviri Döngüsü

Çeviri kuyruğundaki her sayfa için aşağıdaki alt adımları **sırayla** uygula:

### 4a. İlerleme Bildirimi

Kullanıcıya şu anki durumu bildirmeye başla:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 Sayfa X çeviriliyor... (Y/Z)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 4b. PDF'den Sayfaları Oku

- PDF yolu: `docs/Effective Java (3rd Edition).pdf`
- Sayfa offset: PDF sayfa = kitap sayfa + 19
- İstenilen sayfanın **bir önceki**, **kendisi** ve **bir sonraki** sayfasını oku (bağlam için).

### 4c. Çeviriyi Yap

- `CLAUDE.md` ve `.claude/rules/translation-style.md` kurallarına uy.
- Parantezli terminoloji kullan: `Türkçe Karşılık (English Term)`
- Kod bloklarını asla çevirme.
- Sayfanın ait olduğu Chapter ve Item bilgisini belirle.

### 4d. Kavram Butonları Oluştur

Sayfadaki önemli Java/Effective Java kavramları için:
- Kavram adı (EN + TR)
- Kısa açıklama (EN/TR toggle'a uyumlu)
- Kötü örnek (Before) + neyin yanlış olduğu
- İyi örnek (After) + açıklama
- Pratik ipucu
- Örnekler kitaptakilerden **farklı**, orijinal ve ağırlıklı olarak Java dilinde olmalı.

### 4e. pages/page-X.html Oluştur

- Dosya yolu: `pages/page-X.html`
- `CLAUDE.md`'deki tüm HTML çıktı kurallarına uy.
- CSS inline, JS `../js/common.js` harici dosyasından.
- Script bölümü sadece şu 2 satır:
  ```html
  <script>const CURRENT_PAGE = X;</script>
  <script src="../js/common.js"></script>
  ```
- EN/TR toggle, kavram butonları, sayfa navigasyonu dahil.
- Üst barda `../index.html`'e dönüş linki.
- Sağ üstte sayfa numarası input'u (CSS sınıfları: `.page-number-wrapper`, `.page-number-input`).

### 4f. js/common.js'deki PAGES_MAP'i Güncelle

- `js/common.js` dosyasındaki `PAGES_MAP` objesine `X: 'page-X.html'` satırını ekle.
- Sadece bu dosyayı güncelle; sayfa dosyalarına dokunmaya gerek yok.

### 4g. index.html'i Güncelle

- `TRANSLATED_PAGES` objesine yeni sayfayı ekle.
- Yeni sayfa kartı (page-card) HTML bloğunu ekle.
- Badge sayısını ve input-hint metnini güncelle.

### 4h. Glossary'yi Güncelle

- Yeni teknik terimler varsa `.claude/skills/cevir/glossary.md`'ye ekle.
- Alfabetik sırayı koru.

### 4i. CLAUDE.md'yi Güncelle

- `last_translated_page` değerini çevrilen sayfa numarasıyla güncelle.
- Her sayfa tamamlandığında bu değeri güncelle (döngü ortasında kesilirse bile doğru kayıt kalsın).

### 4j. Sayfa Tamamlandı Bildirimi

```
✅ Sayfa X tamamlandı — [Chapter Y: Item Z]
```

---

## Adım 5 — Tüm Sayfalar Bittikten Sonra: Git Push

Tüm çeviriler tamamlandığında tek bir commit oluştur:

```bash
git add -A
git commit -m "Sayfa N-M toplu çevirisi eklendi"
git push
```

Commit mesajı formatı:
- Tüm aralık çevrildiyse: `Sayfa 9-15 toplu çevirisi eklendi`
- Bazı sayfalar atlandıysa: `Sayfa 9-15 toplu çevirisi eklendi (10, 12 atlandı)`

**Not**: Commit mesajlarında `Co-Authored-By` veya yapay zekaya ait hiçbir imza/referans olmamalıdır.

---

## Adım 6 — Özet Rapor

Kullanıcıya kapanış özeti göster:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 Toplu Çeviri Tamamlandı!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Çevrilen sayfalar : [9, 11, 13, 14, 15]
⏭️ Atlanan sayfalar  : [10, 12] (zaten mevcuttu)
📊 Toplam            : 5 çevrildi, 2 atlandı
🚀 GitHub'a push edildi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
