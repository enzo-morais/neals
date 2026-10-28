/* ============================================
   NEALS STREET® — Motion placeholders
   Troca as caixas cinzas (sem foto) por motion graphics em CSS + SVG inline.
   Arquivo ISOLADO: para remover, apague este arquivo e as tags <script src=".../neals-motion.js">.
   Quando um elemento ganha <img>/<video> (foto real), este script não faz nada e o motion some sozinho.
   ============================================ */
(function () {
    'use strict';
    if (window.__NEALS_ADMIN__ || window.__nealsMotion) return;
    window.__nealsMotion = true;

    // ---------- CSS (injetado) ----------
    var CSS = [
        '.nm-host{position:relative !important;overflow:hidden}',
        '.nm-scene{position:absolute;inset:0;background:#0A0A0A;overflow:hidden;font-family:var(--font-display,"Space Grotesk",sans-serif);user-select:none;-webkit-user-select:none}',
        '.nm-scene svg{position:absolute;inset:0;width:100%;height:100%;display:block}',
        '.nm-scene text{font-family:var(--font-display,"Space Grotesk",sans-serif);font-weight:700}',
        '.nm-name{position:absolute;left:6%;bottom:5%;right:30%;color:#fff;font-weight:600;font-size:clamp(.5rem,.8vw + .28rem,.85rem);letter-spacing:.08em;line-height:1.2;text-transform:uppercase;text-shadow:0 1px 6px rgba(0,0,0,.8);pointer-events:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:70%}',
        '.nm-soon{position:absolute;top:5%;right:5%;color:#fff;border:1px solid rgba(255,255,255,.35);background:rgba(0,0,0,.45);padding:.2em .55em;font-size:clamp(.42rem,.5vw + .22rem,.6rem);font-weight:600;letter-spacing:.14em;pointer-events:none;white-space:nowrap}',
        '.product-image:has(.btn-wishlist) .nm-soon{top:3.1rem}',  /* não colide com o coração de favoritos */
        '.nm-lg .nm-name{font-size:clamp(.7rem,1vw + .3rem,1.05rem)}',
        '.nm-lg .nm-soon{font-size:clamp(.55rem,.6vw + .25rem,.7rem)}',
        '.nm-scene *{animation-play-state:running}',
        '.nm-paused *{animation-play-state:paused !important}',

        /* keyframes: só transform e opacity */
        '@keyframes nm-spin{to{transform:rotate(360deg)}}',
        '@keyframes nm-pulse{0%,100%{opacity:.55;transform:scale(.92)}50%{opacity:1;transform:scale(1.06)}}',
        '@keyframes nm-pulse-soft{0%,100%{opacity:.8;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}',
        '@keyframes nm-grid{0%{transform:translateY(0);opacity:0}15%{opacity:.9}100%{transform:translateY(42px);opacity:.9}}',
        '@keyframes nm-grid-h{0%{transform:translateY(0);opacity:0}15%{opacity:.9}100%{transform:translateY(55px);opacity:.9}}',
        '@keyframes nm-ml{to{transform:translateX(-200px)}}',
        '@keyframes nm-mr{from{transform:translateX(-200px)}to{transform:translateX(0)}}',
        '@keyframes nm-glitch{0%,86%,100%{transform:translate(0,0)}88%{transform:translate(-2.5px,1px)}90%{transform:translate(3px,-1px)}92%{transform:translate(-1.5px,0)}94%{transform:translate(2px,1.5px)}96%{transform:translate(0,0)}}',
        '@keyframes nm-glitch2{0%,84%,100%{transform:translate(0,0);opacity:.9}86%{transform:translate(3px,-1px);opacity:1}89%{transform:translate(-3px,1px)}93%{transform:translate(1px,0)}}',
        '@keyframes nm-flick{0%,90%,100%{opacity:1}92%{opacity:.4}94%{opacity:1}96%{opacity:.6}}',
        '@keyframes nm-scan{from{transform:translateY(-12px)}to{transform:translateY(112px)}}',
        '@keyframes nm-blob1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(14px,10px) scale(1.18)}}',
        '@keyframes nm-blob2{0%,100%{transform:translate(0,0) scale(1.1)}50%{transform:translate(-16px,-8px) scale(.9)}}',
        '@keyframes nm-blob3{0%,100%{transform:translate(0,0) scale(.9)}50%{transform:translate(8px,-14px) scale(1.15)}}',

        '.nm-spin{transform-box:view-box;animation:nm-spin 14s linear infinite}',
        '.nm-spin.s2{animation-duration:9s;animation-direction:reverse}',
        '.nm-spin.s3{animation-duration:22s}',
        '.nm-glow{transform-box:fill-box;transform-origin:center;animation:nm-pulse 3.6s ease-in-out infinite}',
        '.nm-sun{transform-box:fill-box;transform-origin:center;animation:nm-pulse-soft 4s ease-in-out infinite}',
        '.nm-hl{animation:nm-grid 3.2s cubic-bezier(.55,0,1,.6) infinite}',
        '.nm-hl.h{animation-name:nm-grid-h}',
        '.nm-ml{animation:nm-ml 9s linear infinite}',
        '.nm-ml.fast{animation-duration:6s}',
        '.nm-mr{animation:nm-mr 11s linear infinite}',
        '.nm-g1{animation:nm-glitch 3.4s steps(1) infinite}',
        '.nm-g2{animation:nm-glitch2 3.4s steps(1) infinite}',
        '.nm-flick{animation:nm-flick 3.4s steps(1) infinite}',
        '.nm-scanbar{animation:nm-scan 3.8s linear infinite}',
        '.nm-b1{transform-box:fill-box;transform-origin:center;animation:nm-blob1 9s ease-in-out infinite}',
        '.nm-b2{transform-box:fill-box;transform-origin:center;animation:nm-blob2 11s ease-in-out infinite}',
        '.nm-b3{transform-box:fill-box;transform-origin:center;animation:nm-blob3 13s ease-in-out infinite}',
        '.nm-reg{transform-box:fill-box;transform-origin:center;animation:nm-pulse-soft 2.6s ease-in-out infinite}',

        /* acessibilidade: sem animação, a arte fica parada */
        '@media (prefers-reduced-motion:reduce){.nm-scene *{animation:none !important}}'
    ].join('\n');

    var style = document.createElement('style');
    style.setAttribute('data-neals-motion', '');
    style.textContent = CSS;
    document.head.appendChild(style);

    // ---------- cenas (SVG, viewBox 100x100, "slice" para preencher qualquer proporção) ----------
    var BLUE = '#1a4dff', BG = '#0A0A0A', SLOGAN = 'CRIADA PARA QUEM FAZ DIFERENTE', uid = 0;
    var nid = function () { return 'nm' + (++uid); };

    function svg(inner, vb) {
        return '<svg viewBox="' + (vb || '0 0 100 100') + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' + inner + '</svg>';
    }

    // faixa de texto correndo: 4 repetições de 200u (a animação desloca exatamente 200u => loop sem emenda)
    function marquee(y, h, fill, textFill, text, cls, stroke) {
        var t = '';
        for (var i = 0; i < 4; i++) {
            t += '<text x="' + (-100 + i * 200) + '" y="' + (y + h * 0.7) + '" font-size="' + (h * 0.62) + '" textLength="196" lengthAdjust="spacingAndGlyphs" ' +
                (stroke ? 'fill="none" stroke="' + textFill + '" stroke-width=".35"' : 'fill="' + textFill + '"') + '>' + text + '</text>';
        }
        return (fill ? '<rect x="-150" y="' + y + '" width="400" height="' + h + '" fill="' + fill + '"/>' : '') +
            '<g class="' + cls + '">' + t + '</g>';
    }

    // 1) grid retrô com sol azul
    function gridSun(horizon, bottom, cx, cy, r) {
        var a = nid(), b = nid(), c = nid(), d = nid();
        var vlines = '', hl = '', stripes = '', i;
        for (i = -80; i <= 180; i += 20) vlines += '<line x1="50" y1="' + horizon + '" x2="' + i + '" y2="' + bottom + '" stroke="' + BLUE + '" stroke-width=".5" opacity=".85"/>';
        var span = bottom - horizon;
        for (i = 0; i < 6; i++) hl += '<line class="nm-hl' + (span > 50 ? ' h' : '') + '" style="animation-delay:-' + (i * 0.53).toFixed(2) + 's" x1="0" y1="' + horizon + '" x2="100" y2="' + horizon + '" stroke="' + BLUE + '" stroke-width=".55"/>';
        for (i = 0; i < 5; i++) stripes += '<rect x="0" y="' + (cy + 2 + i * 4.2) + '" width="100" height="' + (0.6 + i * 0.5) + '" fill="#07071a"/>';
        return '<defs>' +
            '<linearGradient id="' + a + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8aa2ff"/><stop offset="1" stop-color="' + BLUE + '"/></linearGradient>' +
            '<linearGradient id="' + b + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05051a"/><stop offset="1" stop-color="#0b1038"/></linearGradient>' +
            '<clipPath id="' + c + '"><rect x="0" y="0" width="100" height="' + horizon + '"/></clipPath>' +
            '<clipPath id="' + d + '"><rect x="0" y="' + horizon + '" width="100" height="' + span + '"/></clipPath></defs>' +
            '<rect width="100" height="' + bottom + '" fill="url(#' + b + ')"/>' +
            '<g clip-path="url(#' + c + ')"><circle class="nm-sun" cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#' + a + ')"/>' + stripes + '</g>' +
            '<rect x="0" y="' + horizon + '" width="100" height="' + span + '" fill="' + BG + '"/>' +
            '<g clip-path="url(#' + d + ')">' + vlines + hl + '</g>' +
            '<line x1="0" y1="' + horizon + '" x2="100" y2="' + horizon + '" stroke="#fff" stroke-width=".4" opacity=".7"/>';
    }

    // 2) anéis orbitando um ® brilhando
    function ringsReg(cx, cy, s) {
        var g = nid();
        function ring(cls, rx, ry, rot, color, op, dotX) {
            return '<g class="nm-spin ' + cls + '" style="transform-origin:' + cx + 'px ' + cy + 'px">' +
                '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx * s + '" ry="' + ry * s + '" transform="rotate(' + rot + ' ' + cx + ' ' + cy + ')" fill="none" stroke="' + color + '" stroke-opacity="' + op + '" stroke-width=".6"/>' +
                '<circle cx="' + (cx + dotX * s) + '" cy="' + cy + '" r="' + 2.1 * s + '" fill="' + color + '" transform="rotate(' + rot + ' ' + cx + ' ' + cy + ')"/></g>';
        }
        return '<defs><radialGradient id="' + g + '"><stop offset="0" stop-color="' + BLUE + '" stop-opacity=".95"/><stop offset=".55" stop-color="' + BLUE + '" stop-opacity=".25"/><stop offset="1" stop-color="' + BLUE + '" stop-opacity="0"/></radialGradient></defs>' +
            '<circle class="nm-glow" cx="' + cx + '" cy="' + cy + '" r="' + 36 * s + '" fill="url(#' + g + ')"/>' +
            ring('', 40, 13, -25, '#ffffff', '.55', 40) + ring('s2', 40, 13, 35, '#6f8cff', '.9', 40) +
            '<g class="nm-spin s3" style="transform-origin:' + cx + 'px ' + cy + 'px"><circle cx="' + cx + '" cy="' + cy + '" r="' + 30 * s + '" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".5" stroke-dasharray="1.5 3"/></g>' +
            '<text x="' + cx + '" y="' + (cy + 16 * s) + '" text-anchor="middle" font-size="' + 46 * s + '" fill="#fff">®</text>';
    }

    // 3) letreiro diagonal com o slogan
    function marqueeDiag() {
        var s = SLOGAN + ' ✦ ';
        return '<rect width="100" height="100" fill="' + BG + '"/><g transform="rotate(-24 50 50)">' +
            marquee(8, 14, BLUE, '#fff', s, 'nm-ml') +
            marquee(26, 14, '', '#fff', s, 'nm-mr', true) +
            marquee(44, 14, '#fff', BG, s, 'nm-ml fast') +
            marquee(62, 14, '', BLUE, s, 'nm-mr', true) +
            marquee(80, 14, BLUE, '#fff', s, 'nm-ml') + '</g>';
    }

    // 4) glitch no NEALS®
    function glitch() {
        var p = nid();
        return '<defs><pattern id="' + p + '" width="100" height="2.2" patternUnits="userSpaceOnUse"><rect width="100" height="1" fill="#fff" opacity=".07"/></pattern></defs>' +
            '<rect width="100" height="100" fill="' + BG + '"/>' +
            '<g opacity=".18" stroke="' + BLUE + '" stroke-width=".3">' + (function () { var l = ''; for (var i = 10; i < 100; i += 20) l += '<line x1="' + i + '" y1="0" x2="' + i + '" y2="100"/><line x1="0" y1="' + i + '" x2="100" y2="' + i + '"/>'; return l; })() + '</g>' +
            '<g class="nm-g2"><text x="9" y="56" font-size="27" textLength="78" lengthAdjust="spacingAndGlyphs" fill="' + BLUE + '">NEALS</text><text x="88" y="40" font-size="12" fill="' + BLUE + '">®</text></g>' +
            '<g class="nm-g1"><text x="11" y="54" font-size="27" textLength="78" lengthAdjust="spacingAndGlyphs" fill="#8fa8ff" opacity=".7">NEALS</text></g>' +
            '<g class="nm-flick"><text x="10" y="55" font-size="27" textLength="78" lengthAdjust="spacingAndGlyphs" fill="#fff">NEALS</text><text x="89" y="39" font-size="12" fill="#fff">®</text></g>' +
            '<text x="10" y="68" font-size="4.2" letter-spacing=".6" fill="#fff" opacity=".6">DROP 01 // CRIADA PARA QUEM FAZ DIFERENTE</text>' +
            '<rect class="nm-scanbar" x="0" y="0" width="100" height="5" fill="' + BLUE + '" opacity=".16"/>' +
            '<rect width="100" height="100" fill="url(#' + p + ')"/>';
    }

    // 5) manchas azuis com grão
    function blobs() {
        var a = nid(), b = nid(), n = nid();
        return '<defs><radialGradient id="' + a + '"><stop offset="0" stop-color="' + BLUE + '" stop-opacity=".9"/><stop offset="1" stop-color="' + BLUE + '" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="' + b + '"><stop offset="0" stop-color="#5b7dff" stop-opacity=".7"/><stop offset="1" stop-color="#5b7dff" stop-opacity="0"/></radialGradient>' +
            '<filter id="' + n + '" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0"/></filter></defs>' +
            '<rect width="100" height="100" fill="' + BG + '"/>' +
            '<circle class="nm-b1" cx="30" cy="34" r="38" fill="url(#' + a + ')"/>' +
            '<circle class="nm-b2" cx="72" cy="66" r="42" fill="url(#' + a + ')"/>' +
            '<circle class="nm-b3" cx="64" cy="26" r="26" fill="url(#' + b + ')"/>' +
            '<rect width="100" height="100" filter="url(#' + n + ')" opacity=".32"/>' +
            '<text x="50" y="57" text-anchor="middle" font-size="19" textLength="70" lengthAdjust="spacingAndGlyphs" fill="none" stroke="#fff" stroke-width=".5" opacity=".85">DROP 01</text>';
    }

    // 6) duas fitas cruzadas com texto correndo
    function tapes() {
        var p = nid(), s = 'NEALS® ✦ ' + SLOGAN + ' ✦ ';
        function tape(rot, fill, tcolor, cls) {
            return '<g transform="rotate(' + rot + ' 50 50)"><rect x="-150" y="41" width="400" height="18" fill="' + fill + '"/>' +
                '<rect x="-150" y="41" width="400" height="2.2" fill="url(#' + p + ')"/><rect x="-150" y="56.8" width="400" height="2.2" fill="url(#' + p + ')"/>' +
                marquee(43.6, 12.8, '', tcolor, s, cls) + '</g>';
        }
        return '<defs><pattern id="' + p + '" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="2" height="4" fill="' + BG + '"/><rect x="2" width="2" height="4" fill="#fff"/></pattern></defs>' +
            '<rect width="100" height="100" fill="' + BG + '"/>' +
            tape(34, BLUE, '#fff', 'nm-ml') + tape(-34, '#fff', BG, 'nm-mr');
    }

    var VARIANTS = [
        function () { return svg(gridSun(58, 100, 50, 44, 22)); },
        function () { return svg(ringsReg(50, 50, 1)); },
        function () { return svg(marqueeDiag()); },
        function () { return svg(glitch()); },
        function () { return svg(blobs()); },
        function () { return svg(tapes()); }
    ];

    // capa da home: versão especial, maior (proporção 3/4)
    function heroScene() {
        var s = SLOGAN + ' ✦ ';
        return svg(
            gridSun(88, 133, 50, 62, 30) +
            ringsReg(50, 52, 1.05) +
            '<g transform="rotate(-8 50 100)">' + marquee(102, 11, BLUE, '#fff', s, 'nm-ml') + marquee(115, 9, '', '#fff', s, 'nm-mr', true) + '</g>' +
            '<rect width="100" height="133" filter="url(#' + 'nmhero' + ')" opacity=".22"/>' +
            '<defs><filter id="nmhero" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .5 0"/></filter></defs>' +
            '<text x="6" y="8" font-size="3.4" letter-spacing=".5" fill="#fff" opacity=".7">DROP 01 — 2026</text>',
            '0 0 100 133');
    }

    // carrinho/checkout: gradiente preto→azul com o ® pulsando
    function miniScene() {
        var g = nid();
        return svg('<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#050505"/><stop offset=".55" stop-color="#0a0f2e"/><stop offset="1" stop-color="' + BLUE + '"/></linearGradient></defs>' +
            '<rect width="40" height="40" fill="url(#' + g + ')"/><text class="nm-reg" x="20" y="29" text-anchor="middle" font-size="26" fill="#fff">®</text>', '0 0 40 40');
    }

    // ---------- aplicação ----------
    var TARGETS = '.hero-image-placeholder,.product-placeholder,.product-placeholder-large,.about-image-placeholder,.cart-item-image,.checkout-item-image';

    var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.target.classList.toggle('nm-paused', !e.isIntersecting); });
    }, { rootMargin: '120px' }) : null;

    function hash(str) {
        var h = 5381;
        for (var i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
        return Math.abs(h);
    }

    function readLabel(el) {
        var tmp = document.createElement('div');
        tmp.innerHTML = el.innerHTML.replace(/<br\s*\/?>/gi, '\n');
        return tmp.textContent.trim();
    }

    function build(el) {
        if (el.querySelector('img,video')) return false;            // foto real: não faz nada
        if (el.firstElementChild && el.firstElementChild.classList.contains('nm-scene')) return false;
        var label = readLabel(el);
        if (/CARREGANDO/i.test(label)) return false;                  // ainda carregando

        var kind, name = '', html;
        if (el.matches('.hero-image-placeholder')) { kind = 'hero'; }  // sem nome: o letreiro já ocupa o canto
        else if (el.matches('.about-image-placeholder')) { kind = 'about'; name = 'Bastidores'; }
        else if (el.matches('.cart-item-image,.checkout-item-image')) { kind = 'mini'; }
        else {
            var lines = label.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
            if (lines[0] === 'CAMISETA') lines.shift();
            name = lines.join(' ');
            kind = 'product';
        }

        if (kind === 'hero') html = heroScene();
        else if (kind === 'mini') html = miniScene();
        else html = VARIANTS[hash(kind === 'about' ? 'about' : name.toUpperCase()) % VARIANTS.length]();

        var scene = document.createElement('div');
        scene.className = 'nm-scene' + (kind === 'hero' || kind === 'about' || el.matches('.product-placeholder-large') ? ' nm-lg' : '') + ' nm-paused';
        scene.innerHTML = html;
        if (kind !== 'mini') {
            if (name) { var n = document.createElement('span'); n.className = 'nm-name'; n.textContent = name; scene.appendChild(n); }
            var soon = document.createElement('span'); soon.className = 'nm-soon'; soon.textContent = 'FOTO EM BREVE'; scene.appendChild(soon);
        }
        el.classList.add('nm-host');
        el.textContent = '';
        el.appendChild(scene);
        if (io) io.observe(scene); else scene.classList.remove('nm-paused');
        return true;
    }

    var mo = null, queued = false;
    function scan() {
        queued = false;
        if (mo) mo.disconnect();               // não reage às nossas próprias mudanças
        document.querySelectorAll(TARGETS).forEach(build);
        if (mo) mo.observe(document.body, { childList: true, subtree: true });
    }
    function schedule() {
        if (queued) return;
        queued = true;
        (window.requestAnimationFrame || setTimeout)(scan);
    }

    function init() {
        mo = new MutationObserver(schedule);
        scan();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
