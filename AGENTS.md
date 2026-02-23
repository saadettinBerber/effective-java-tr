# Effective Java Kitap Çeviri Projesi

> **Not**: Bu dosya Antigravity IDE için CLAUDE.md'nin karşılığıdır. Her iki dosya her zaman senkronize tutulmalıdır.
> Skill konumu: `.agent/skills/cevir/SKILL.md`
> Stil kuralları: `.agent/rules/translation-style.md`
> Glossary: `.claude/skills/cevir/glossary.md` (paylaşılan tek kaynak)

## Proje Amacı

Bu proje, Joshua Bloch'un "Effective Java (3rd Edition)" kitabını sayfa sayfa interaktif bir HTML sayfasına çevirmeyi amaçlar. Kullanıcı her seferinde bir sayfa çeviri ister. Çıktı olarak bir `index.html` dosyası üretilir.

## PDF Bilgileri

- **PDF Dosya Yolu**: `docs/Effective Java (3rd Edition).pdf`
- **Sayfa Offset**: PDF sayfa numarası = Kitap sayfa numarası + 19
  - Örnek: Kitap sayfa 1 (Chapter 1 Introduction) = PDF sayfa 20
  - Örnek: Kitap sayfa 5 (Chapter 2, Item 1) = PDF sayfa 24
- **Kitap Yapısı**:
  - 3rd Edition, 2018
  - 90 Item (madde) içerir, 12 bölüme ayrılmıştır
  - Chapter 1: Introduction
  - Chapter 2: Creating and Destroying Objects (Item 1-9)
  - Chapter 3: Methods Common to All Objects (Item 10-14)
  - Chapter 4: Classes and Interfaces (Item 15-25)
  - Chapter 5: Generics (Item 26-33)
  - Chapter 6: Enums and Annotations (Item 34-41)
  - Chapter 7: Lambdas and Streams (Item 42-48)
  - Chapter 8: Methods (Item 49-56)
  - Chapter 9: General Programming (Item 57-68)
  - Chapter 10: Exceptions (Item 69-77)
  - Chapter 11: Concurrency (Item 78-84)
  - Chapter 12: Serialization (Item 85-90)

## Son Çevrilen Sayfa Takibi

- **KRİTİK KURAL**: Her çeviri tamamlandığında, bu dosyadaki `last_translated_page` değerini güncelle. CLAUDE.md'yi de aynı anda güncelle.
- **last_translated_page**: 73
- Kullanıcı "sıradaki sayfa", "sonraki sayfa", "next", "devam" gibi ifadeler kullandığında veya `/cevir next` yazdığında, `last_translated_page + 1` sayfasını çevir.
- Eğer `last_translated_page` değeri 0 ise ve kullanıcı "sıradaki" derse, sayfa 1'den başla.

## Çeviri Kuralları

### Dil Yaklaşımı
1. **Parantezli Terminoloji (Parenthetical Terminology)**: Teknik terimler Türkçe yazılır, yanına parantez içinde İngilizce orijinali eklenir.
   - Örnek: "Statik fabrika metotları (Static Factory Methods), yapıcı metotlara (constructors) bir alternatiftir."
2. **Kod blokları ASLA çevrilmez**: Değişken adları, fonksiyon adları, sınıf adları, import ifadeleri, dosya yolları, komut satırı komutları her zaman İngilizce kalır.
3. **Sektörde yaygın kullanılan terimler**: API, bug, debug, commit, push, pull, merge, framework, library gibi terimler İngilizce bırakılır, gerekirse Türkçe açıklama eklenir.
4. **Deyimler ve metaforlar**: Türkçe karşılığı bulunur veya açıklanır.
5. **Başlıklar**: Hem Türkçe hem İngilizce yazılır. Örnek: "Yapıcı Metot Yerine Statik Fabrika Metotlarını Düşünün / Consider Static Factory Methods Instead of Constructors"
6. **Item başlıkları**: Her Item'ın orijinal İngilizce başlığı korunur ve Türkçe çevirisi eklenir.

### Sayfa Bağlamı ve Önbellek Kullanımı
- Her çeviri yapılırken istenilen sayfanın **bir önceki** ve **bir sonraki** sayfası da bağlam için okunur.
- Amaç: Paragraf ortasında kesilebilecek cümleleri tamamlamak ve bağlamı anlamak.
- Ancak çeviri sadece istenilen sayfayı kapsar, önceki/sonraki sayfalar sadece bağlam içindir.
- **KRİTİK OPTİMİZASYON — Önbellek Kontrolü**: Bağlam sayfalarını okumadan önce `pages/page-X.html` dosyasının var olup olmadığını kontrol et:
  - **Dosya varsa** → dosyadan EN içeriğini oku. PDF okuma YOK, zaman kaybı YOK.
  - **Dosya yoksa** → PDF'den oku VE dosyayı EN-only olarak kaydet (ileride çevrilmeye hazır önbellek).
- Bu sayede toplu çevirilerde her sayfa için PDF yalnızca **bir kez** okunur.

### Bulunduğu Başlık/Bölüm
- Sayfanın hangi Chapter ve Item altında olduğu her zaman belirtilmelidir.
- Bu bilgi HTML çıktısında üst kısımda görünür olmalıdır.

## Glossary (Terim Sözlüğü) Kuralı

- **KRİTİK KURAL**: Her sayfa çevrildikten sonra, o sayfada geçen yeni teknik terimlerin `.claude/skills/cevir/glossary.md` dosyasına eklenip eklenmediğini kontrol et.
- Eğer yeni bir terim varsa ve glossary'de yoksa, MUTLAKA ekle.
- Glossary'deki terimler alfabetik sıralı tutulur.
- Format: `| İngilizce Terim | Türkçe Karşılığı | Açıklama/Not |`
- Bu sayede tüm çeviri boyunca terimler TUTARLI kalır. Bir terimi nasıl çevirdiysen, her yerde aynı şekilde çevirmelisin.
- Çeviri yapmadan önce glossary'yi oku ve mevcut terimleri kullan.

## HTML Çıktı Kuralları

### Genel Yapı
- **Çoklu dosya yapısı** kullanılır:
  - `index.html`: Ana sayfa (navigasyon hub'ı, sayfa numarası giriş kutusu, çevrilen sayfaların listesi)
  - `pages/page-X.html`: Her çevrilen sayfa `pages/` klasörü altında ayrı dosyada saklanır (örnek: `pages/page-1.html`, `pages/page-2.html`)
  - Sayfa dosyalarından `index.html`'e linkler `../index.html` şeklinde, sayfalar arası linkler ise `page-X.html` şeklinde (aynı dizinde oldukları için) olmalıdır.
- Her sayfa dosyası CSS'i inline içerir, JS ise `../js/common.js` harici dosyasından yüklenir.
- Her sayfa dosyasında sadece `<script>const CURRENT_PAGE = X;</script>` ve `<script src="../js/common.js"></script>` bulunur.
- Responsive tasarım (mobil uyumlu).
- Türkçe karakter desteği (UTF-8).

- **İki Aşamalı Sayfa Durumu**:
  - **EN-only (Önbellek)**: Sayfa, bir başka sayfanın bağlamı okunurken PDF'den alınmış ve kaydedilmiştir. Yalnızca İngilizce (EN) kısmı doludur; TR kısmı henüz çevrilmemiştir. `index.html`'e eklenmez.
  - **Tam Çeviri**: Hem EN hem TR kısımları dolu, kavram butonları ve navigasyon tamamlanmış. `index.html`'e eklenir.

- **Her yeni TAM ÇEVİRİ tamamlandığında `index.html` de güncellenmelidir**:
  - `TRANSLATED_PAGES` JavaScript objesine yeni sayfa eklenir
  - Sayfa kartı (page-card) HTML'e eklenir
  - Badge sayısı ve input-hint güncellenir

### Zorunlu Bileşenler
1. **Üst Bar**:
   - Kitap adı: "Effective Java — Joshua Bloch"
   - Bulunulan bölüm/başlık bilgisi (Chapter ve Item)
   - **Sayfa Numarası Input'u**: Sağ üstte interaktif sayfa numarası input'u bulunur
     - Kullanıcı sayfa numarası yazıp Enter'a basınca çevrilmiş sayfaya yönlendirilir
     - Çevrilmemiş sayfa girilirse tooltip ile uyarı gösterilir
     - Focus kaybedilince mevcut sayfa numarasına döner
     - `PAGES_MAP` objesi tüm çevrilen sayfaların dosya yollarını tutar
     - `CURRENT_PAGE` değişkeni o sayfanın numarasını tutar

2. **Dil Değiştirme (EN/TR Toggle)**:
   - Sayfanın sağ üst köşesinde EN | TR butonu
   - Varsayılan dil: TR (Türkçe)
   - Butona basılınca tüm açıklama metinleri dil değiştirir
   - Kod blokları dil değiştiğinde değişmez, her zaman aynı kalır
   - Seçilen dil tercihi hatırlanmalı (localStorage)

3. **İçerik Alanı**:
   - Sayfanın metni paragraflara bölünmüş şekilde gösterilir
   - Kod örnekleri syntax highlighting ile gösterilir (Java odaklı)
   - Kitaptaki orijinal formatlama mümkün olduğunca korunur (başlıklar, listeler, kod blokları)

4. **Kavram Butonları (Few-Shot Örnekler)**:
   - Sayfada geçen her önemli Java kavramı/ilkesi için bir buton oluşturulur
   - Butona basılınca bir panel/modal açılır
   - Panel içeriği:
     - Kavram adı (EN/TR)
     - Kısa açıklama (EN/TR toggle'a uyumlu)
     - KÖTÜ ÖRNEK (Before): İlkeyi ihlal eden kod
     - Neden kötü olduğunu açıklama
     - İYİ ÖRNEK (After): Refactor edilmiş, temiz kod
     - Ekstra pratik ipucu veya alıştırma önerisi
   - Örnekler kitaptakilerden FARKLI olmalı, orijinal örnekler üretilmeli
   - Örnekler ağırlıklı olarak Java dilinde olmalı

5. **Sayfa Navigasyonu**:
   - Sayfanın alt kısmında "Önceki Sayfa" ve "Sonraki Sayfa" butonları
   - Bu butonlar sadece görsel navigasyon içindir
   - Butonlarda sayfa numarası ve varsa bölüm/başlık bilgisi yazar
   - Butonlara basıldığında kullanıcıya "Bu sayfayı çevirmem için '/cevir X' yazın veya 'sıradaki sayfa' deyin" şeklinde bir bilgi gösterilir

6. **Tasarım**:
   - Modern, temiz, okunabilir tasarım
   - Açık tema (light mode) varsayılan
   - Kod blokları için koyu arka plan
   - Yeterli satır aralığı ve kenar boşlukları
   - Türkçe metin genişlemesine uygun layout (%30 daha uzun olabilir)
   - Font: sistem fontu (system-ui) veya okunabilir bir sans-serif font
   - **Renk paleti**: Koyu mavi (#0d2137) ve turuncu (#f5a623) vurgu rengi (Effective Java kitap temasına uygun)

## Çalışma Akışı

Kullanıcı bir sayfa çevirisi istediğinde şu adımları takip et:

1. **Glossary'yi oku**: `.claude/skills/cevir/glossary.md` dosyasını oku, mevcut terimleri öğren.
2. **Bağlam sayfalarını kontrol et ve oku**: N-1 ve N+1 için önce `pages/page-X.html` dosyası var mı kontrol et.
   - **Varsa** → dosyadan EN içeriğini oku (PDF okuma YOK).
   - **Yoksa** → PDF'den oku (sayfa numarası + 19 = PDF sayfası) ve dosyayı **EN-only** olarak kaydet.
   - Hedef sayfa N her zaman PDF'den okunur.
3. **Bölüm/başlık bilgisini belirle**: Sayfanın hangi Chapter ve Item altında olduğunu tespit et.
4. **Çeviriyi yap**: Kurallara uygun şekilde hem EN hem TR metinleri hazırla.
5. **Kavram butonlarını hazırla**: Sayfadaki önemli kavramlar için few-shot örnekler oluştur.
6. **Sayfa HTML dosyasını oluştur**: `pages/page-X.html` olarak tüm bileşen kurallarına uygun HTML dosyasını yaz.
7. **js/common.js'deki PAGES_MAP'i güncelle**: Yeni eklenen sayfayı `js/common.js` dosyasındaki `PAGES_MAP` objesine ekle.
8. **index.html'i güncelle**: `TRANSLATED_PAGES` objesine, sayfa kartına, badge ve input-hint'e yeni sayfayı ekle.
9. **Glossary'yi güncelle**: Yeni terimler varsa glossary'ye ekle.
10. **last_translated_page değerini güncelle**: Bu dosyadaki (AGENTS.md) ve CLAUDE.md'deki değeri güncelle (her ikisi senkronize tutulur).
11. **GitHub'a push et**: Tüm değişiklikleri commit'le ve GitHub'a push et. Commit mesajı `Sayfa X çevirisi eklendi` formatında olsun. Bu adım her çeviri sonunda otomatik yapılır.

## Önemli Notlar

- Bu proje eğitim amaçlıdır. Kitabın tamamını bir seferde çevirme gibi bir amaç yoktur.
- Kullanıcı sayfa sayfa ilerler, kendi hızında okur.
- Her sohbette AGENTS.md otomatik okunacağı için, kullanıcının uzun açıklamalar yapmasına gerek yoktur.
- Kullanıcı sadece `/cevir 5` veya "sıradaki sayfa" demesi yeterlidir.

## Git Commit Kuralı

- **KRİTİK KURAL**: Commit mesajlarında `Co-Authored-By` veya yapay zekaya ait herhangi bir imza/referans OLMAYACAKTIR.
- Commit mesajları sade ve açıklayıcı olmalıdır.
- Format: `Sayfa X çevirisi eklendi — Bölüm/Item bilgisi`
- Örnek: `Sayfa 5 çevirisi eklendi — Chapter 2: Item 1`

## Türkçe Karakter Kuralı

- **KRİTİK KURAL**: Bu projedeki tüm Türkçe içerikli dosyalar (`.md`, `.html` vb.) doğru Türkçe karakterlerle yazılmalıdır.
- ASCII karşılıkları (c, g, i, o, s, u) yerine her zaman doğru Türkçe harfler kullanılmalıdır:
  - `ç` (c değil), `ğ` (g değil), `ı` (i değil), `ö` (o değil), `ş` (s değil), `ü` (u değil)
  - `Ç`, `Ğ`, `İ`, `Ö`, `Ş`, `Ü` (büyük harfler)
- Tüm dosyalar UTF-8 kodlamasında olmalıdır.
- Yeni dosya oluştururken veya mevcut dosyaları düzenlerken bu kurala mutlaka uyulmalıdır.

## AI Agent Team Kullanımı

- Bu projede **Task (subagent)** özelliği aktif olarak kullanılmalıdır.
- Uygun durumlarda birden fazla agent paralel çalıştırılarak verimlilik artırılmalıdır.
- Agent kullanım senaryoları:
  - **Explore agent**: Kod tabanı araştırması, dosya arama, bağlam toplama için
  - **Bash agent**: Terminal komutları, git işlemleri için
  - **General-purpose agent**: Çoklu adımlı karmaşık görevler için
  - **Plan agent**: Uygulama planlaması ve mimari kararlar için
- Özellikle çeviri iş akışında:
  - Glossary kontrolü ve PDF okuma paralel yapılabilir
  - Türkçe karakter kontrolü için Explore agent kullanılabilir
  - Birden fazla bağımsız dosya düzenlemesi gerektiğinde paralel agent'lar tercih edilmeli
