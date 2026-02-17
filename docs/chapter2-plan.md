# Chapter 2 — Çeviri Planı

## Bölüm Bilgileri

- **Bölüm**: Chapter 2: Creating and Destroying Objects / Nesnelerin Oluşturulması ve Yok Edilmesi
- **Sayfa Aralığı**: Kitap sayfa 5 – 38 (PDF sayfa 24 – 57)
- **Toplam Sayfa**: 34 sayfa
- **Item Sayısı**: 9 adet (Item 1 – Item 9)

---

## Item Bazlı Çeviri Grupları

Her bir Item, tek bir çeviri komutuyla toplu olarak çevrilecektir.
Kullanıcı `Item 1'i çevir` veya `/cevir item1` gibi komutlarla tüm Item'ı çevirebilir.

### Item 1 — Yapıcı Metot Yerine Statik Fabrika Metotlarını Düşünün
**Consider static factory methods instead of constructors**

| Bilgi | Değer |
|-------|-------|
| Sayfa Aralığı | 5 – 10 |
| Sayfa Sayısı | 6 |
| PDF Aralığı | 24 – 29 |
| Zorluk | Orta |

**İçerik Özeti:**
- Statik fabrika metotlarının 5 avantajı (isimli, önbellek, alt tip dönüşü, parametre bazlı sınıf, yazma anında var olmayan sınıf)
- 2 dezavantajı (alt sınıflama, bulunabilirlik)
- Yaygın isimlendirme kalıpları: `from`, `of`, `valueOf`, `instance`, `create`, `getType`, `newType`, `type`
- Kod örnekleri: `Boolean.valueOf()`, `EnumSet`, `Collections`, JDBC

**Kavram Butonları (önerilen):**
- Static Factory Method
- Instance-Controlled Class
- Service Provider Framework
- Flyweight Pattern
- Interface-Based Framework

---

### Item 2 — Çok Sayıda Yapıcı Parametresiyle Karşılaşınca Builder Kullanmayı Düşünün
**Consider a builder when faced with many constructor parameters**

| Bilgi | Değer |
|-------|-------|
| Sayfa Aralığı | 10 – 16 |
| Sayfa Sayısı | 7 |
| PDF Aralığı | 29 – 35 |
| Zorluk | Orta-Yüksek |

**İçerik Özeti:**
- Telescoping constructor pattern ve dezavantajları
- JavaBeans pattern ve dezavantajları (tutarsızlık, değişkenlik)
- Builder pattern: avantajları, fluent API
- Sınıf hiyerarşilerinde Builder (Pizza, NyPizza, Calzone örnekleri)
- Covariant return typing, simulated self-type
- Builder vs Constructor karşılaştırması

**Kavram Butonları (önerilen):**
- Builder Pattern
- Telescoping Constructor
- JavaBeans Pattern
- Fluent API
- Covariant Return Typing

---

### Item 3 — Singleton Özelliğini Private Yapıcı veya Enum Tipi ile Zorlayın
**Enforce the singleton property with a private constructor or an enum type**

| Bilgi | Değer |
|-------|-------|
| Sayfa Aralığı | 16 – 18 |
| Sayfa Sayısı | 3 |
| PDF Aralığı | 35 – 37 |
| Zorluk | Orta |

**İçerik Özeti:**
- Singleton tanımı ve test edilebilirlik sorunu
- Public field yaklaşımı (Elvis örneği)
- Static factory yaklaşımı
- Enum singleton (tercih edilen yaklaşım)
- Serileştirme sorunu ve `readResolve`

**Kavram Butonları (önerilen):**
- Singleton Pattern
- Enum Singleton
- Serialization & readResolve

---

### Item 4 — Örneklenemezliği Private Yapıcı ile Zorlayın
**Enforce noninstantiability with a private constructor**

| Bilgi | Değer |
|-------|-------|
| Sayfa Aralığı | 19 |
| Sayfa Sayısı | 1 |
| PDF Aralığı | 38 |
| Zorluk | Düşük |

**İçerik Özeti:**
- Utility class kavramı
- Default constructor tuzağı
- Private constructor + AssertionError deyimi
- Alt sınıflama engellemesi (yan etki)

**Kavram Butonları (önerilen):**
- Utility Class
- Noninstantiability Idiom

---

### Item 5 — Kaynakları Doğrudan Bağlamak Yerine Bağımlılık Enjeksiyonunu Tercih Edin
**Prefer dependency injection to hardwiring resources**

| Bilgi | Değer |
|-------|-------|
| Sayfa Aralığı | 20 – 22 |
| Sayfa Sayısı | 3 |
| PDF Aralığı | 39 – 41 |
| Zorluk | Orta |

**İçerik Özeti:**
- Static utility ve singleton'ın kaynak bağımlı sınıflar için uygunsuzluğu
- Dependency injection kalıbı (SpellChecker örneği)
- `Supplier<T>` fabrika varyantı
- DI framework'leri (Dagger, Guice, Spring)

**Kavram Butonları (önerilen):**
- Dependency Injection
- Supplier<T> Factory
- Hardwired Resources Anti-pattern

---

### Item 6 — Gereksiz Nesne Oluşturmaktan Kaçının
**Avoid creating unnecessary objects**

| Bilgi | Değer |
|-------|-------|
| Sayfa Aralığı | 22 – 26 |
| Sayfa Sayısı | 5 |
| PDF Aralığı | 41 – 45 |
| Zorluk | Orta |

**İçerik Özeti:**
- `new String("bikini")` anti-kalıbı
- Static factory ile gereksiz nesne önleme
- Pahalı nesnelerin önbelleğe alınması (Pattern.compile, isRomanNumeral)
- Adapter (view) nesneleri — `Map.keySet()` örneği
- Autoboxing tuzağı (`Long` vs `long`)
- Nesne havuzları (object pool) genellikle kötü fikir
- Defensive copying ile karşılaştırma (Item 50)

**Kavram Butonları (önerilen):**
- Object Reuse vs Creation
- Autoboxing Performance Trap
- Lazy Initialization
- Adapter Pattern (View)
- Object Pool Anti-pattern

---

### Item 7 — Eskimiş Nesne Referanslarını Temizleyin
**Eliminate obsolete object references**

| Bilgi | Değer |
|-------|-------|
| Sayfa Aralığı | 27 – 29 |
| Sayfa Sayısı | 3 |
| PDF Aralığı | 46 – 48 |
| Zorluk | Orta |

**İçerik Özeti:**
- Stack sınıfı bellek sızıntısı örneği
- Obsolete reference kavramı ve unintentional object retention
- Düzeltme: `elements[size] = null`
- Kural: Kendi belleğini yöneten sınıflarda dikkatli ol
- Bellek sızıntısı kaynakları: önbellekler (`WeakHashMap`, `LinkedHashMap.removeEldestEntry`)
- Dinleyiciler ve geri çağırmalar (callbacks)
- Heap profiler araçları

**Kavram Butonları (önerilen):**
- Memory Leak in Java
- Obsolete Reference
- WeakHashMap
- Heap Profiler

---

### Item 8 — Sonlandırıcılardan ve Temizleyicilerden Kaçının
**Avoid finalizers and cleaners**

| Bilgi | Değer |
|-------|-------|
| Sayfa Aralığı | 30 – 36 |
| Sayfa Sayısı | 7 |
| PDF Aralığı | 49 – 55 |
| Zorluk | Yüksek |

**İçerik Özeti:**
- Finalizer'ların öngörülemezliği, tehlikesi, gereksizliği
- Cleaner'lar: daha az tehlikeli ama yine de öngörülemez
- C++ destructor ile karşılaştırma
- Zamanlama sorunu — finalizer queue birikmesi, OutOfMemoryError
- Kalıcı durum güncelleme tehlikesi
- `System.gc`, `System.runFinalization` güvensizliği
- Yakalanmayan istisnalar ve finalizer
- Performans cezası (12 ns vs 550 ns)
- Güvenlik sorunu: finalizer attack
- `AutoCloseable` + `try`-with-resources çözümü
- Meşru kullanımlar: güvenlik ağı, native peer
- Room sınıfı örneği (Cleaner kullanımı)
- Adult vs Teenager istemci örnekleri

**Kavram Butonları (önerilen):**
- Finalizer vs Cleaner
- AutoCloseable Pattern
- Finalizer Attack
- Native Peer
- try-with-resources

---

### Item 9 — try-finally Yerine try-with-resources Tercih Edin
**Prefer try-with-resources to try-finally**

| Bilgi | Değer |
|-------|-------|
| Sayfa Aralığı | 36 – 38 |
| Sayfa Sayısı | 3 |
| PDF Aralığı | 55 – 57 |
| Zorluk | Düşük-Orta |

**İçerik Özeti:**
- `try`-`finally` ile kaynak kapatma (eski yol)
- Birden fazla kaynak ile iç içe `try`-`finally` karmaşıklığı
- İstisna maskeleme sorunu (ikinci istisna birincini yuter)
- `try`-with-resources çözümü (Java 7+)
- `AutoCloseable` arayüzü
- Suppressed exceptions ve `getSuppressed()` metodu
- Catch clause kullanımı `try`-with-resources ile
- `firstLineOfFile` ve `copy` metodu örnekleri

**Kavram Butonları (önerilen):**
- try-with-resources
- AutoCloseable Interface
- Suppressed Exceptions
- Resource Management

---

## Özet Tablo

| Item | Başlık (TR) | Sayfalar | Sayfa Sayısı | Zorluk |
|------|-------------|----------|-------------|--------|
| 1 | Statik Fabrika Metotları | 5–10 | 6 | Orta |
| 2 | Builder Kalıbı | 10–16 | 7 | Orta-Yüksek |
| 3 | Singleton | 16–18 | 3 | Orta |
| 4 | Örneklenemezlik | 19 | 1 | Düşük |
| 5 | Bağımlılık Enjeksiyonu | 20–22 | 3 | Orta |
| 6 | Gereksiz Nesne Oluşturma | 22–26 | 5 | Orta |
| 7 | Eskimiş Referanslar | 27–29 | 3 | Orta |
| 8 | Sonlandırıcılar ve Temizleyiciler | 30–36 | 7 | Yüksek |
| 9 | try-with-resources | 36–38 | 3 | Düşük-Orta |
| **Toplam** | | **5–38** | **34** | |

---

## Çeviri Sırası Önerisi

Kısa Item'lardan başlayarak ivme kazanmak için önerilen sıra:

1. **Item 4** (1 sayfa) — Hızlı başlangıç, kısa ve öz
2. **Item 3** (3 sayfa) — Singleton, sık kullanılan kavram
3. **Item 5** (3 sayfa) — DI, modern Java'da çok önemli
4. **Item 9** (3 sayfa) — try-with-resources, pratik ve yaygın
5. **Item 7** (3 sayfa) — Bellek sızıntısı, önemli konu
6. **Item 6** (5 sayfa) — Performans odaklı, iyi örnekler
7. **Item 1** (6 sayfa) — Bölümün giriş maddesi, temel kavramlar
8. **Item 2** (7 sayfa) — Builder pattern, uzun ama öğretici
9. **Item 8** (7 sayfa) — En uzun ve en teknik madde

> **Not**: Alternatif olarak doğal sıra (Item 1'den 9'a) da kullanılabilir.
> Kullanıcı istediği sırayı seçebilir.

---

## Kullanım

Çeviri başlatmak için şu komutlardan birini kullanın:

```
/cevir item1          → Item 1'in tüm sayfalarını (5-10) çevir
/cevir item2          → Item 2'nin tüm sayfalarını (10-16) çevir
sıradaki item         → Sıradaki Item'ı çevir
Item 3'ü çevir        → Item 3'ün tüm sayfalarını çevir
```

Her Item çevirisi tamamlandığında:
- Tüm sayfa HTML dosyaları oluşturulur
- `index.html` güncellenir
- `js/common.js` güncellenir
- Glossary güncellenir
- `CLAUDE.md` güncellenir
- Git commit ve push yapılır
