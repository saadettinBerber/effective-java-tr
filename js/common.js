// Effective Java TR - Ortak JavaScript
// Tüm sayfa dosyaları bu dosyayı kullanır.
// Her sayfa dosyasında sadece CURRENT_PAGE tanımlanır.

const PAGES_MAP = {
    1: 'page-1.html',
    2: 'page-2.html',
    3: 'page-3.html',
    4: 'page-4.html',
    5: 'page-5.html',
    6: 'page-6.html',
    7: 'page-7.html'
};

function setLang(lang) {
    localStorage.setItem('effectivejava-lang', lang);
    applyLang(lang);
}

function applyLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.querySelectorAll('.tr-text').forEach(function(el) {
        el.style.display = lang === 'tr' ? '' : 'none';
    });
    document.querySelectorAll('.en-text').forEach(function(el) {
        el.style.display = lang === 'en' ? '' : 'none';
    });
}

(function() {
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

document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(function(m) {
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
    setTimeout(function() { input.classList.remove('error'); }, 500);
}

function showNavTooltip(msg) {
    var tip = document.getElementById('pageNavTooltip');
    tip.textContent = msg;
    tip.classList.add('visible');
    setTimeout(function() { tip.classList.remove('visible'); }, 2500);
}

function resetPageInput() {
    document.getElementById('pageNumInput').value = CURRENT_PAGE;
    document.getElementById('pageNavTooltip').classList.remove('visible');
}

document.getElementById('pageNumInput').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
});
