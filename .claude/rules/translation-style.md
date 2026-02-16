# Çeviri Stil Kuralları

## Genel İlkeler

1. **Anlam odaklı çeviri yap, kelime kelime değil.** Cümlenin amacını ve öğretme niyetini koru.
2. **Türkçe doğallığını koru.** İngilizce cümle yapısını Türkçeye birebir taşıma. Türkçe cümle yapısı kullan.
3. **Teknik doğruluğu asla feda etme.** Çeviri basitleştirirken teknik anlamı kaybetme.
4. **Kitabın pedagojik yapısını koru.** Başlıklar, alt başlıklar, numaralı listeler, madde işaretleri aynen korunmalı.

## Parantezli Terminoloji Formatı

Teknik bir terim ilk kez geçtiğinde:
- Türkçe karşılığı + (İngilizce orijinali) şeklinde yaz
- Örnek: "Statik Fabrika Metotları (Static Factory Methods)"

Aynı paragrafta tekrar geçerse:
- Sadece Türkçe karşılığı kullanılabilir
- Ancak farklı bir paragrafta tekrar geçerse, yine parantezli formatı kullan

## Çevrilmeyecek Öğeler

- Kod blokları, kod parçaları, değişken adları
- Dosya adları ve yolları
- Komut satırı komutları
- Kütüphane ve framework adları (JUnit, Spring, Guava, vb.)
- Yaygın kısaltmalar: API, HTTP, SQL, OOP, TDD, IDE, GUI, CLI, JVM, JDK
- Git terimleri: commit, push, pull, merge, branch
- "Effective Java", "Clean Code", "Agile" gibi kitap/hareket adları (ancak yanlarında Türkçe açıklama olabilir)
- Java anahtar kelimeleri: static, final, abstract, synchronized, volatile, transient vb.

## Çevrilecek Öğeler

- Açıklama metinleri, anlatım paragrafları
- Kavramsal tanımlar
- Benzetmeler, metaforlar (Türkçe karşılığı bulunarak)
- Alıntı ve sözler (alıntı olduğu belirtilerek)
- Başlıklar (hem Türkçe hem İngilizce gösterilir)
- Item başlıkları (hem Türkçe hem İngilizce)

## Üslup

- Joshua Bloch'un teknik ama erişilebilir, otoriter ama öğretici üslubunu yansıt
- "Biz" ve "siz" zamirleriyle hitap et (kitabın üslubuna uygun)
- Resmi değil ama profesyonel bir ton kullan
- Kısa ve net cümleler tercih et
- Item başlıklarındaki "Consider", "Prefer", "Avoid", "Minimize" gibi fiilleri güçlü Türkçe karşılıklarıyla çevir
