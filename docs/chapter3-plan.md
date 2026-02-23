# Chapter 3 — Çeviri Planı

## Bölüm Bilgileri

- **Bölüm**: Chapter 3: Methods Common to All Objects / Tüm Nesnelere Ortak Metotlar
- **Sayfa Aralığı**: Kitap sayfa 36 – 73 (PDF sayfa 58 – 95)
- **Toplam Sayfa**: 38 sayfa
- **Item Sayısı**: 5 adet (Item 10 – Item 14)
- **Halihazırda çevrilmiş sayfalar**: 36, 37, 38 (3 sayfa)
- **Kalan sayfalar**: 39 – 73 (35 sayfa)

---

## Item Bazlı Çeviri Grupları

### Item 10 — equals'ı Ezerken Genel Sözleşmeye Uyun
**Obey the general contract when overriding equals**

| Bilgi | Değer |
|-------|-------|
| Sayfa Aralığı | 36 – 48 |
| Sayfa Sayısı | 13 |
| PDF Aralığı | 58 – 70 |
| Zorluk | Yüksek |
| Çevrilen | 36, 37, 38 (3/13) |

**İçerik Özeti:**
- equals'ı ezmemenin uygun olduğu 4 koşul
- Değer sınıfları (value classes) ve mantıksal eşitlik (logical equality)
- Denklik ilişkisi (equivalence relation): Dönüşlülük, Simetri, Geçişlilik, Tutarlılık, null-olmama
- CaseInsensitiveString simetri ihlali örneği
- Point → ColorPoint geçişlilik sorunu
- Liskov İkame Prensibi (Liskov Substitution Principle)
- Composition over Inheritance çözümü
- Consistency ve null-olmama (non-nullity)
- equals yazma tarifi (recipe) ve PhoneNumber örneği
- AutoValue ile otomatik üretim

**Kavram Butonları (önerilen):**
- Equivalence Relation
- Liskov Substitution Principle
- Composition over Inheritance
- CaseInsensitiveString Örneği
- AutoValue

---

### Item 11 — equals'ı Ezdiğinizde hashCode'u da Her Zaman Ezin
**Always override hashCode when you override equals**

| Bilgi | Değer |
|-------|-------|
| Sayfa Aralığı | 49 – 54 |
| Sayfa Sayısı | 6 |
| PDF Aralığı | 71 – 76 |
| Zorluk | Orta-Yüksek |

**İçerik Özeti:**
- hashCode sözleşmesi (3 kural)
- equals eşit → hashCode eşit olmalı
- HashMap bozulma senaryosu (PhoneNumber örneği)
- hashCode hesaplama tarifi (31 çarpanı)
- Tembel başlatma (lazy initialization)
- Objects.hash() kısayolu ve performans
- Önemli alanları hash hesaplamasından çıkarmamanın önemi
- String hash fonksiyonu geçmiş hatası

**Kavram Butonları (önerilen):**
- hashCode Sözleşmesi
- Hash Collision
- Lazy Initialization
- Objects.hash()

---

### Item 12 — toString'i Her Zaman Ezin
**Always override toString**

| Bilgi | Değer |
|-------|-------|
| Sayfa Aralığı | 55 – 58 |
| Sayfa Sayısı | 4 |
| PDF Aralığı | 77 – 80 |
| Zorluk | Düşük-Orta |

**İçerik Özeti:**
- toString'in tanılama (diagnostics) ve hata ayıklamadaki önemi
- PhoneNumber@163b91 vs 707-867-5309 karşılaştırması
- Biçim belirtme (format specification) artıları ve eksileri
- Biçim belirtildiyse: eşleşen statik fabrika veya yapıcı sağla
- Biçim belirtilmediyse: esnekliği koru
- Programatik erişim sağla (accessor'lar)
- toString ve utility class, enum, abstract class
- AutoValue ve IDE otomatik üretimi

**Kavram Butonları (önerilen):**
- toString Format Kararı
- Programmatic Access
- AutoValue toString

---

### Item 13 — clone'u Dikkatli Bir Şekilde Ezin
**Override clone judiciously**

| Bilgi | Değer |
|-------|-------|
| Sayfa Aralığı | 58 – 67 |
| Sayfa Sayısı | 10 |
| PDF Aralığı | 80 – 89 |
| Zorluk | Yüksek |

**İçerik Özeti:**
- Cloneable arayüzünün garip tasarımı
- Object.clone() ve field-by-field copy
- super.clone() zinciri ve kovaryant dönüş türleri
- Değişebilir (mutable) alanlar sorunu — Stack.clone() derin kopya
- Dizi klonlama: clone() diziler için en iyi yöntem
- HashTable.Entry derin kopya (deep copy) vs yinelemeli kopya
- clone() içinde final alanlar sorunu
- Thread-safe clone
- clone() alternatifi: kopya yapıcı (copy constructor) ve kopya fabrika (copy factory)
- Dönüşüm yapıcıları (conversion constructors): HashSet → TreeSet

**Kavram Butonları (önerilen):**
- Cloneable Interface Flaw
- Deep Copy vs Shallow Copy
- Copy Constructor Pattern
- Covariant Return Type

---

### Item 14 — Comparable Uygulamayı Düşünün
**Consider implementing Comparable**

| Bilgi | Değer |
|-------|-------|
| Sayfa Aralığı | 66 – 73 |
| Sayfa Sayısı | 8 |
| PDF Aralığı | 88 – 95 |
| Zorluk | Orta |

**İçerik Özeti:**
- compareTo metodu: equals'a benzer ama sıralama sunar
- compareTo genel sözleşmesi
- compareTo ve equals tutarlılığı (BigDecimal örneği)
- Birden fazla alanlı karşılaştırma (PhoneNumber)
- Java 8 Comparator yapıcı metotları: comparingInt, thenComparingInt
- Fark tabanlı (difference-based) comparator tehlikesi: taşma (overflow)
- Static compare metotları vs Comparator construction methods

**Kavram Butonları (önerilen):**
- Comparable vs Comparator
- Natural Ordering
- Comparator Construction Methods
- Overflow Danger

---

## Özet Tablo

| Item | Başlık (TR) | Sayfalar | Sayfa Sayısı | Zorluk | Durum |
|------|-------------|----------|-------------|--------|-------|
| 10 | equals Genel Sözleşmesi | 36–48 | 13 | Yüksek | 3/13 çevrildi |
| 11 | hashCode | 49–54 | 6 | Orta-Yüksek | Bekliyor |
| 12 | toString | 55–58 | 4 | Düşük-Orta | Bekliyor |
| 13 | clone | 58–67 | 10 | Yüksek | Bekliyor |
| 14 | Comparable | 66–73 | 8 | Orta | Bekliyor |
| **Toplam** | | **36–73** | **38** | | 3/38 çevrildi |

---

## Çeviri Sırası

Doğal sıra (Item 10 → 14) takip edilecektir:
1. **Item 10 kalan** (sayfa 39–48, 10 sayfa) — En uzun ve en teknik madde
2. **Item 11** (sayfa 49–54, 6 sayfa) — hashCode, equals ile doğrudan bağlantılı
3. **Item 12** (sayfa 55–58, 4 sayfa) — toString, kısa ve pratik
4. **Item 13** (sayfa 58–67, 10 sayfa) — clone, detaylı ve derin kopya örnekleri
5. **Item 14** (sayfa 66–73, 8 sayfa) — Comparable, bölüm sonu
