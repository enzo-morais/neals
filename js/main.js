/* ============================================
   NEALS STREET® — Vitrine
   Monta o site a partir de js/produtos.js. Não precisa editar este arquivo.
   ============================================ */
(function () {
    'use strict';
    var C = window.NEALS;
    var P = C.produtos;

    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function num(i) { return (i + 1 < 10 ? '0' : '') + (i + 1); }
    function price(p) {
        return typeof p.preco === 'number' ? 'R$ ' + p.preco.toFixed(2).replace('.', ',') : 'CONSULTE';
    }
    function whatsLink(text) {
        return 'https://wa.me/' + String(C.whatsapp).replace(/\D/g, '') + '?text=' + encodeURIComponent(text);
    }
    function orderText(p, size) {
        var tpl = p.mensagem;
        if (tpl && typeof tpl === 'object') tpl = (size && tpl[size]) || tpl.padrao;
        return (tpl || C.mensagem)
            .split('{produto}').join(p.nome)
            .split('{tamanho}').join(size || '(a definir)')
            .split('{preco}').join(price(p));
    }

    // Palco da imagem: foto real (contain, sobre fundo da marca) ou placeholder animado
    function stageHTML(p, idx, large) {
        var cls = large ? 'product-placeholder-large' : 'product-placeholder';
        if (p.imagens && p.imagens[idx]) {
            return '<img src="' + esc(p.imagens[idx]) + '" alt="' + esc(p.nome) + (idx ? ' — lado' : ' — frente') + '" loading="lazy" decoding="async">';
        }
        return '<div class="' + cls + '"><span>CAMISETA<br>' + esc(p.nome.toUpperCase()) + (idx ? ' · ' + (idx + 1) : '') + '</span></div>';
    }

    // ---------- LINKS GERAIS ----------
    document.querySelectorAll('.js-whats').forEach(function (a) { a.href = whatsLink('Fala! Vim pelo site da NEALS.'); });
    document.querySelectorAll('.js-instagram').forEach(function (a) { a.href = C.instagram; });
    document.querySelectorAll('.js-insta-user').forEach(function (s) { s.textContent = C.instagramUser; });
    document.querySelectorAll('.js-drop-label').forEach(function (s) { s.textContent = C.drop; });
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('dropCount').textContent = P.length;

    // ---------- FAIXA ----------
    var tick = [C.drop, 'CRIADA PARA QUEM FAZ DIFERENTE', 'TIRAGEM LIMITADA', 'PEÇA PELO WHATSAPP', C.instagramUser];
    var once = tick.map(function (t) { return '<span>' + esc(t) + '</span><i>✦</i>'; }).join('');
    document.getElementById('ticker').innerHTML = once + once + once + once;

    // ---------- HERO (troca sozinho entre as camisas) ----------
    var hero = document.getElementById('heroVisual');
    var heroList = P.map(function (p, i) { return { p: p, i: i }; })
        .filter(function (x) { return x.p.imagens && x.p.imagens.length && !x.p.esgotado; });
    heroList.sort(function (a, b) { return (b.p.destaque ? 1 : 0) - (a.p.destaque ? 1 : 0); });

    if (!heroList.length) {
        hero.innerHTML = '<div class="hero-image-placeholder"><span>NEALS</span></div>';
    } else {
        hero.innerHTML =
            '<div class="stage stage-hero">' +
                heroList.map(function (x, k) {
                    return '<img class="hero-slide' + (k ? '' : ' on') + '" src="' + esc(x.p.imagens[0]) + '" alt="' + esc(x.p.nome) + '"' + (k ? ' loading="lazy"' : '') + '>';
                }).join('') +
                '<button class="hero-caption" type="button"><span class="hero-cap-num"></span><span class="hero-cap-name"></span><b>VER PEÇA →</b></button>' +
                (heroList.length > 1 ? '<div class="hero-dots">' + heroList.map(function (x, k) {
                    return '<button type="button" aria-label="' + esc(x.p.nome) + '"' + (k ? '' : ' class="on"') + '><i></i></button>';
                }).join('') + '</div>' : '') +
            '</div>';

        var slides = hero.querySelectorAll('.hero-slide');
        var dots = hero.querySelectorAll('.hero-dots button');
        var cur = 0, timer = null;
        var delay = Math.max(1.5, +C.trocaTopo || 3.5) * 1000;
        var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

        function go(k) {
            cur = (k + heroList.length) % heroList.length;
            slides.forEach(function (s, j) { s.classList.toggle('on', j === cur); });
            dots.forEach(function (d) { d.classList.remove('on'); void d.offsetWidth; });
            dots.forEach(function (d, j) {
                d.classList.toggle('on', j === cur);
                d.querySelector('i').style.animationDuration = delay + 'ms';
            });
            var x = heroList[cur];
            hero.querySelector('.hero-cap-num').textContent = num(x.i);
            hero.querySelector('.hero-cap-name').textContent = x.p.nome;
        }
        function play() { stop(); if (!reduce && heroList.length > 1) timer = setInterval(function () { go(cur + 1); }, delay); }
        function stop() { if (timer) clearInterval(timer); timer = null; }

        dots.forEach(function (d, j) { d.addEventListener('click', function () { go(j); play(); }); });
        hero.querySelector('.hero-caption').addEventListener('click', function () { open(heroList[cur].i); });
        hero.querySelector('.stage').addEventListener('mouseenter', stop);
        hero.querySelector('.stage').addEventListener('mouseleave', function () { go(cur); play(); });
        document.addEventListener('visibilitychange', function () { document.hidden ? stop() : play(); });
        go(0); play();
    }

    // ---------- GRADE ----------
    var grid = document.getElementById('grid');
    grid.innerHTML = P.map(function (p, i) {
        var hasBack = p.imagens && p.imagens.length > 1;
        return '<a class="card' + (p.esgotado ? ' is-out' : '') + (hasBack ? ' has-back' : '') + '" href="#' + esc(p.id) + '" data-i="' + i + '">' +
            '<div class="stage">' +
                '<span class="card-num">' + num(i) + '</span>' +
                (p.esgotado ? '<span class="card-tag tag-out">ESGOTADO</span>' : p.tag ? '<span class="card-tag">' + esc(p.tag) + '</span>' : '') +
                '<div class="stage-front">' + stageHTML(p, 0) + '</div>' +
                (hasBack ? '<div class="stage-back">' + stageHTML(p, 1) + '</div>' : '') +
            '</div>' +
            '<div class="card-info">' +
                '<h3>' + esc(p.nome) + '</h3>' +
                '<span class="card-price">' + price(p) + '</span>' +
            '</div>' +
            '<span class="card-more">VER PEÇA <b>→</b></span>' +
        '</a>';
    }).join('');

    // ---------- MODAL ----------
    var modal = document.getElementById('modal');
    var current = null, size = null, lastFocus = null;

    function setWhats() {
        var a = document.getElementById('mWhats');
        var needSize = !current.esgotado && (current.tamanhos || []).length && !size;
        a.classList.toggle('is-locked', !!needSize);
        a.setAttribute('aria-disabled', needSize ? 'true' : 'false');
        if (current.esgotado) {
            a.textContent = 'PERGUNTAR SE VOLTA';
            a.href = whatsLink('Fala! A ' + current.nome + ' vai voltar?');
        } else if (needSize) {
            a.textContent = 'ESCOLHA O TAMANHO';
            a.removeAttribute('href');
        } else {
            a.textContent = 'PEDIR ' + size + ' NO WHATSAPP';
            a.href = whatsLink(orderText(current, size));
            document.getElementById('sizeHint').classList.remove('show');
            document.querySelector('.sizes-block').classList.remove('shake');
        }
    }

    // Sem tamanho escolhido: não abre o WhatsApp, chama atenção pros tamanhos
    document.getElementById('mWhats').addEventListener('click', function (e) {
        if (!this.classList.contains('is-locked')) return;
        e.preventDefault();
        var block = document.querySelector('.sizes-block');
        block.classList.remove('shake'); void block.offsetWidth; block.classList.add('shake');
        document.getElementById('sizeHint').classList.add('show');
    });

    function showImg(idx) {
        document.getElementById('mStage').innerHTML = stageHTML(current, idx, true);
        document.querySelectorAll('#mThumbs button').forEach(function (b, j) { b.classList.toggle('active', j === idx); });
    }

    function open(i, push) {
        current = P[i]; size = null;
        document.getElementById('sizeHint').classList.remove('show');
        document.querySelector('.sizes-block').classList.remove('shake');
        lastFocus = document.activeElement;
        document.getElementById('mNum').textContent = '// ' + C.drop + ' — ' + num(i);
        document.getElementById('mName').textContent = current.nome;
        document.getElementById('mPrice').textContent = current.esgotado ? 'ESGOTADO' : price(current);
        document.getElementById('mDesc').textContent = current.descricao || '';
        document.getElementById('mDetails').innerHTML = (current.detalhes || []).map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('');

        var imgs = current.imagens || [];
        document.getElementById('mThumbs').innerHTML = imgs.length > 1
            ? imgs.map(function (src, j) { return '<button aria-label="Foto ' + (j + 1) + '"><img src="' + esc(src) + '" alt=""></button>'; }).join('')
            : '';
        document.querySelectorAll('#mThumbs button').forEach(function (b, j) { b.addEventListener('click', function () { showImg(j); }); });
        showImg(0);

        var sizes = document.getElementById('mSizes');
        sizes.innerHTML = (current.tamanhos || []).map(function (s) {
            return '<button type="button" ' + (current.esgotado ? 'disabled' : '') + '>' + esc(s) + '</button>';
        }).join('');
        sizes.querySelectorAll('button').forEach(function (b) {
            b.addEventListener('click', function () {
                sizes.querySelectorAll('button').forEach(function (x) { x.classList.remove('active'); });
                b.classList.add('active'); size = b.textContent; setWhats();
            });
        });
        setWhats();

        modal.hidden = false;
        requestAnimationFrame(function () { modal.classList.add('open'); });
        document.body.classList.add('lock');
        modal.querySelector('.modal-close').focus();
        if (push !== false) history.replaceState(null, '', '#' + current.id);
    }

    function close() {
        modal.classList.remove('open');
        document.body.classList.remove('lock');
        setTimeout(function () { modal.hidden = true; }, 250);
        history.replaceState(null, '', location.pathname + location.search);
        if (lastFocus) lastFocus.focus();
    }

    grid.addEventListener('click', function (e) {
        var card = e.target.closest('.card');
        if (!card) return;
        e.preventDefault();
        open(+card.dataset.i);
    });
    modal.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });

    // Link direto pra uma camisa: site.com/#neals-01
    function fromHash() {
        var id = location.hash.slice(1);
        var i = P.findIndex(function (p) { return p.id === id; });
        if (i > -1) open(i, false);
    }
    fromHash();
    window.addEventListener('hashchange', fromHash);

    // ---------- MENU: fundo ao rolar ----------
    var nav = document.getElementById('nav');
    function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 10); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---------- ANIMAÇÃO DE ENTRADA ----------
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (es) {
            es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { threshold: 0.12 });
        document.querySelectorAll('.section-head, .card, .about > *, .steps li, .steps-cta').forEach(function (el, i) {
            el.classList.add('reveal');
            el.style.transitionDelay = (el.classList.contains('card') ? (i % 3) * 80 : 0) + 'ms';
            io.observe(el);
        });
    }
})();
