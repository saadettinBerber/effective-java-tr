---
name: cevir
description: Effective Java kitabının belirtilen sayfasını EN/TR interaktif HTML olarak çevirir. Tekli sayfa, sayfa aralığı (X-Y), başlangıç+adet (X adet), chapter modu (chapter-N) veya "next/sıradaki" ile kullanılır.
argument-hint: "[sayfa-numarasi | next | X-Y | X adet | chapter-N]"
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob"]
compatibility: ["antigravity", "claude-code"]
---

# Effective Java Sayfa Çeviri Skill'i

Kullanıcı bu skill'i çağırdığında aşağıdaki adımları takip et:

---

## 1. Mod ve Sayfa Listesini Belirle

`$ARGUMENTS` değerini analiz ederek çalışma modunu ve çevrilecek sayfa listesini oluştur:

### Tekli Mod
**Girdi:** `5`
**Sonuç:** sayfalar = [5] — aşağıdaki adımları bir kez uygula.

### Toplu Mod — Sayfa Aralığı
**Girdi:** `9-15`
**Sonuç:** sayfalar = [9, 10, 11, 12, 13, 14, 15]

### Toplu Mod — Başlangıç + Adet
**Girdi:** `9 5`
**Sonuç:** sayfalar = [9, 10, 11, 12, 13]

### Toplu Mod — Chapter Modu
**Girdi:** `chapter-2` veya `chapter 2`
**Sonuç:** İlgili chapter'ın tüm sayfaları (aşağıdaki tablodan)

| Chapter | Başlık (TR) | Sayfa Aralığı | Sayfa Sayısı |
|---------|-------------|---------------|--------------|
| 1  | Giriş / Introduction | 1 – 4 | 4 |
| 2  | Nesnelerin Oluşturulması ve Yok Edilmesi / Creating and Destroying Objects | 5 – 38 | 34 |
| 3  | Tüm Nesnelere Ortak Metotlar / Methods Common to All Objects | 39 – 65 | 27 |
| 4  | Sınıflar ve Arayüzler / Classes and Interfaces | 66 – 117 | 52 |
| 5  | Jenerikler / Generics | 118 – 152 | 35 |
| 6  | Enum'lar ve Anotasyonlar / Enums and Annotations | 153 – 194 | 42 |
| 7  | Lambda'lar ve Stream'ler / Lambdas and Streams | 195 – 230 | 36 |
| 8  | Metotlar / Methods | 231 – 266 | 36 |
| 9  | Genel Programlama / General Programming | 267 – 326 | 60 |
| 10 | İstisnalar / Exceptions | 327 – 358 | 32 |
| 11 | Eş Zamanlılık / Concurrency | 359 – 410 | 52 |
| 12 | Serileştirme / Serialization | 411 – 436 | 26 |

> **Not**: Chapter 2 dışındaki sayfa aralıkları yaklaşık değerlerdir. PDF'in içindekiler sayfasına (PDF sayfa 6-10 arası) erişerek daha doğru aralıkları okuyabilirsen önce doğrula.

**Chapter modu başlamadan önce kullanıcıya bildir:**
```
📚 Chapter X çevirisi başlatılıyor
Başlık : [Chapter Başlığı]
Sayfalar: X – Y (toplam Z sayfa)
```

### Sonraki Sayfa Modu
**Girdi:** "next", "sıradaki", "sonraki", "devam" veya boş
- `AGENTS.md` (veya `CLAUDE.md`) dosyasındaki `last_translated_page` değerini oku.
- O değere 1 ekleyerek sonraki sayfayı belirle (tekli mod olarak devam et).
- Eğer değer 0 ise, sayfa 1'den başla.

### Geçersiz Argüman
Argüman tanınamazsa kullanıcıya şunu göster ve dur:
```
❌ Geçersiz format. Doğru kullanım:
   /cevir 5            → Sayfa 5'i çevirir
   /cevir next         → Sıradaki sayfayı çevirir
   /cevir 9-15         → 9'dan 15'e kadar çevirir
   /cevir 9 5          → 9'dan başlayarak 5 sayfa çevirir
   /cevir chapter-2    → Chapter 2'nin tamamını çevirir
```

---

## 2. Toplu Modda: Mevcut Sayfaları Kontrol Et

*(Tekli mod veya sonraki sayfa modunda bu adımı atla)*

Her sayfa için `pages/page-X.html` dosyasının **tam çeviri** (EN + TR dolu) olup olmadığını kontrol et:
- **Tam çeviri varsa**: O sayfayı **atla**, `⏭️ Sayfa X — zaten çevrilmiş, atlandı` olarak kaydet.
- **Yoksa veya EN-only ise**: Çeviri kuyruğuna ekle.

Kullanıcıya başlamadan önce özet göster:
```
📋 Toplu Çeviri Planı
━━━━━━━━━━━━━━━━━━━
Toplam istek  : X sayfa
Çevrilecek    : Y sayfa
Atlanacak     : Z sayfa (zaten mevcut)

Başlıyorum...
```

---

## 3. Glossary'yi Oku

- `.claude/skills/cevir/glossary.md` dosyasını oku (paylaşılan tek kaynak).
- Mevcut terim çevirilerini öğren ve çeviri sırasında tutarlı kullan.
- **Önemli**: Glossary'yi yalnızca bir kez başta oku; her sayfa için tekrar okumana gerek yok.

---

## 4. Her Sayfa İçin Çeviri Döngüsü

Her sayfa için aşağıdaki alt adımları sırayla uygula.

**Toplu modda** ilerleme bildirimi göster:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 Sayfa X çeviriliyor... (Y/Z)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 4a. Bağlam Sayfalarını Oku (Önbellek Kontrolü ile)

Sayfa N çevrilecek. N-1 (önceki) ve N+1 (sonraki) bağlam için gereklidir. Her biri için şu kontrol:

**Bağlam sayfaları (N-1 ve N+1) için:**
- `pages/page-(N±1).html` dosyası var mı? → **Varsa**: dosyadan EN içeriğini oku. PDF okuma YOK.
- **Yoksa**: PDF'den ilgili sayfayı oku ve hemen `pages/page-X.html` olarak **EN-only** (sadece İngilizce toggle kısmı dolu, TR kısmı boş/placeholder) şekilde kaydet. Bu sayfa ileride çevrildiğinde TR kısmı tamamlanacak.

**Hedef sayfa N için:**
- Her zaman PDF'den oku (bu sayfa çevrilecek).
- PDF yolu ve sayfa offset bilgisi için AGENTS.md'deki **PDF Bilgileri** bölümüne bak.
- Örnek: Kitap sayfa 5 → PDF sayfa 24 (5 + 19 = 24)

**Önbellek avantajı (toplu modda):** Sayfa N işlenirken N+1 EN-only kaydedilir; N+1 sıraya geldiğinde PDF okumaya gerek kalmaz, sadece N+2 için PDF okunur.

### 4b. Çeviriyi Yap

- AGENTS.md'deki tüm çeviri kurallarına uy.
- Parantezli terminoloji kullan: `Türkçe Karşılık (English Term)`
- Kod bloklarını asla çevirme.
- Sayfanın ait olduğu Chapter ve Item bilgisini belirle.

### 4c. Kavram Butonları Oluştur

Sayfadaki önemli Java/Effective Java kavramları için:
- Kavram adı (EN + TR)
- Kısa açıklama (EN/TR toggle'a uyumlu)
- Kötü örnek (Before) + neyin yanlış olduğu
- İyi örnek (After) + açıklama
- Pratik ipucu
- Örnekler kitaptakilerden **farklı**, orijinal ve ağırlıklı olarak Java dilinde olmalı.

### 4d. page-X.html Oluştur veya Güncelle

Dosya yolu AGENTS.md'deki yapıya göre `pages/page-X.html` (X = sayfa numarası).

**Eğer dosya zaten var (4a adımında EN-only olarak oluşturulmuştu):**
- Mevcut dosyayı aç.
- TR içeriğini, kavram butonlarını ve navigasyonu ekle/tamamla.
- Dosyayı kaydet (üzerine yaz).

**Eğer dosya yoksa:**
- Sıfırdan oluştur, hem EN hem TR kısımları dolu tam bir sayfa olarak kaydet.

**Her iki durumda da geçerli kurallar:**
- AGENTS.md'deki HTML çıktı kurallarına uy.
- CSS inline, JS ise `../js/common.js` harici dosyasından yüklenir.
- Script bölümü sadece şu 2 satırdan oluşmalı:
  - `<script>const CURRENT_PAGE = X;</script>`
  - `<script src="../js/common.js"></script>`
- EN/TR toggle, kavram butonları, sayfa navigasyonu dahil.
- Navigasyon butonları (alt kısım):
  - Önceki sayfa: Eğer çevrilmişse `<a href="page-(X-1).html">`, yoksa disabled
  - Sonraki sayfa: Eğer çevrilmişse `<a href="page-(X+1).html">`, yoksa `not-translated` sınıfıyla göster
- Üst barda `../index.html`'e dönüş linki (Ana Sayfa) olmalı.
- **Sayfa Numarası Input'u (Üst Bar)**: Sağ üstte interaktif input olmalı (JS işlevleri `common.js`'den gelir):
  - CSS sınıfları: `.page-number-wrapper`, `.page-number-label`, `.page-number-input`, `.page-nav-tooltip`

### 4e. js/common.js'deki PAGES_MAP'i Güncelle

- **KRİTİK**: Yeni sayfa eklendiğinde, `js/common.js` dosyasındaki `PAGES_MAP` objesine yeni sayfa eklenmelidir.
- Tek dosya güncellemesi yeterlidir, sayfa dosyalarına dokunmaya gerek yoktur.
- Örnek: Sayfa 5 eklendiğinde, `js/common.js`'deki `PAGES_MAP` objesine `5:'page-5.html'` eklenir.

### 4f. index.html Güncelle

- `TRANSLATED_PAGES` objesine yeni sayfayı ekle
- Sayfa kartı (page-card) HTML bloğunu ekle
- Badge sayısını ve input-hint metnini güncelle

### 4g. Glossary'yi Güncelle

- Yeni teknik terimler varsa `.claude/skills/cevir/glossary.md`'ye ekle.
- Alfabetik sıra koru.

### 4h. AGENTS.md ve CLAUDE.md'yi Güncelle

- `last_translated_page` değerini yeni çevrilen sayfa numarasıyla güncelle.
- Hem `AGENTS.md` hem `CLAUDE.md` dosyalarındaki `last_translated_page: X` satırını güncelle (her ikisi senkronize tutulur).
- **Her sayfa tamamlandıktan sonra** güncelle (döngü ortasında kesilirse bile doğru kayıt kalsın).

**Toplu modda** sayfa tamamlanınca bildir:
```
✅ Sayfa X tamamlandı — [Chapter Y: Item Z]
```

---

## 5. Git Push

*(Tekli modda her çeviriden sonra, toplu modda tüm sayfalar bittikten sonra)*

```bash
git add -A
git commit -m "Sayfa X çevirisi eklendi — Chapter Y: Item Z"
git push
```

**Toplu mod / Chapter mod commit formatları:**
- Sayfa aralığı: `Sayfa 9-15 toplu çevirisi eklendi`
- Chapter modu: `Chapter 2 çevirisi tamamlandı — Creating and Destroying Objects (Sayfa 5-38)`
- Bazı sayfalar atlandıysa parantez içinde belirt: `(10, 12 atlandı)`

**Not**: Commit mesajlarında `Co-Authored-By` veya yapay zekaya ait hiçbir imza/referans olmamalıdır.

---

## 6. Toplu Modda: Özet Rapor

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 Toplu Çeviri Tamamlandı!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Çevrilen sayfalar : [9, 11, 13, 14, 15]
⏭️  Atlanan sayfalar  : [10, 12] (zaten mevcuttu)
📊 Toplam            : 5 çevrildi, 2 atlandı
🚀 GitHub'a push edildi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
