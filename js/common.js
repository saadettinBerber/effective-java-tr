// Effective Java TR - Ortak JavaScript
// Tüm sayfa dosyaları bu dosyayı kullanır.
// Her sayfa dosyasında sadece CURRENT_PAGE tanımlanır.

const PAGES_MAP = {
    1: 'page-1.html', 2: 'page-2.html', 3: 'page-3.html', 4: 'page-4.html', 5: 'page-5.html',
    6: 'page-6.html', 7: 'page-7.html', 8: 'page-8.html', 9: 'page-9.html', 10: 'page-10.html',
    11: 'page-11.html', 12: 'page-12.html', 13: 'page-13.html', 14: 'page-14.html', 15: 'page-15.html',
    16: 'page-16.html', 17: 'page-17.html', 18: 'page-18.html', 19: 'page-19.html', 20: 'page-20.html',
    21: 'page-21.html', 22: 'page-22.html', 23: 'page-23.html', 24: 'page-24.html', 25: 'page-25.html',
    26: 'page-26.html', 27: 'page-27.html', 28: 'page-28.html', 29: 'page-29.html', 30: 'page-30.html',
    31: 'page-31.html', 32: 'page-32.html', 33: 'page-33.html', 34: 'page-34.html', 35: 'page-35.html',
    36: 'page-36.html', 37: 'page-37.html', 38: 'page-38.html', 39: 'page-39.html', 40: 'page-40.html',
    41: 'page-41.html', 42: 'page-42.html', 43: 'page-43.html', 44: 'page-44.html', 45: 'page-45.html',
    46: 'page-46.html', 47: 'page-47.html', 48: 'page-48.html', 49: 'page-49.html', 50: 'page-50.html',
    51: 'page-51.html', 52: 'page-52.html', 53: 'page-53.html', 54: 'page-54.html', 55: 'page-55.html',
    56: 'page-56.html', 57: 'page-57.html', 58: 'page-58.html', 59: 'page-59.html', 60: 'page-60.html',
    61: 'page-61.html', 62: 'page-62.html', 63: 'page-63.html', 64: 'page-64.html', 65: 'page-65.html',
    66: 'page-66.html', 67: 'page-67.html', 68: 'page-68.html', 69: 'page-69.html', 70: 'page-70.html',
    71: 'page-71.html', 72: 'page-72.html', 73: 'page-73.html', 74: 'page-74.html', 75: 'page-75.html',
    76: 'page-76.html', 77: 'page-77.html', 78: 'page-78.html'
};

function setLang(lang) {
    localStorage.setItem('effectivejava-lang', lang);
    applyLang(lang);
}

function applyLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.querySelectorAll('.tr-text').forEach(function (el) {
        el.style.display = lang === 'tr' ? '' : 'none';
    });
    document.querySelectorAll('.en-text').forEach(function (el) {
        el.style.display = lang === 'en' ? '' : 'none';
    });
}

(function () {
    var savedLang = localStorage.getItem('effectivejava-lang') || 'tr';
    applyLang(savedLang);
})();

function openModal(id) {
    document.getElementById('modal-' + id).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById('modal-' + id).classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(function (m) {
            m.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

function handleUntranslated(event, num) {
    event.preventDefault();
    alert("Sayfa " + num + " henüz çevrilmedi. '/cevir " + num + "' komutuyla çevirebilirsiniz.");
    return false;
}

function goToPageNum() {
    var input = document.getElementById('pageNumInput');
    var num = parseInt(input.value.trim(), 10);
    if (isNaN(num) || num < 1) { shakeInput(); return; }
    if (num === CURRENT_PAGE) { input.blur(); return; }
    if (PAGES_MAP[num]) { window.location.href = PAGES_MAP[num]; }
    else { showNavTooltip('Sayfa ' + num + ' henüz çevrilmedi.'); shakeInput(); }
}

function shakeInput() {
    var input = document.getElementById('pageNumInput');
    input.classList.add('error');
    setTimeout(function () { input.classList.remove('error'); }, 500);
}

function showNavTooltip(msg) {
    var tip = document.getElementById('pageNavTooltip');
    tip.textContent = msg;
    tip.classList.add('visible');
    setTimeout(function () { tip.classList.remove('visible'); }, 2500);
}

function resetPageInput() {
    document.getElementById('pageNumInput').value = CURRENT_PAGE;
    document.getElementById('pageNavTooltip').classList.remove('visible');
}

document.getElementById('pageNumInput').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});
