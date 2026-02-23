---
name: cevir-toplu
description: Effective Java kitabının belirtilen sayfa aralığını veya chapter'ını toplu olarak çevirir. ARTIK /cevir skill'ine yönlendirilmiştir — tüm modlar orada birleştirilmiştir.
argument-hint: "[baslangic-bitis] veya [baslangic adet] veya [chapter-N]"
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob"]
---

# Effective Java Toplu Çeviri — cevir Skill'ine Yönlendirme

> **Bu skill artık `/cevir` skill'ine entegre edilmiştir.**
> Tüm toplu çeviri modları (sayfa aralığı, başlangıç+adet, chapter modu) artık `/cevir` üzerinden kullanılabilir.

## Kullanım

Aşağıdaki komutların tümü doğrudan `/cevir` ile çalışır:

```
/cevir 9-15         → 9'dan 15'e kadar toplu çevirir
/cevir 9 5          → 9'dan başlayarak 5 sayfa çevirir
/cevir chapter-2    → Chapter 2'nin tamamını çevirir
```

## Bu Skill'den Geçiş

`/cevir-toplu $ARGUMENTS` çağrısı alındığında, aynı argümanlarla `/cevir` skill'ini çalıştır.

Yani:
- `/cevir-toplu 9-15` → `/cevir 9-15` ile aynı davranışı göster
- `/cevir-toplu 9 5` → `/cevir 9 5` ile aynı davranışı göster
- `/cevir-toplu chapter-2` → `/cevir chapter-2` ile aynı davranışı göster

Tüm detaylı talimatlar için `.claude/skills/cevir/SKILL.md` dosyasına bak.
