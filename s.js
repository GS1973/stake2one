(function () {
    var q = document.getElementById('q');
    if (q) {
        q.addEventListener('input', function () {
            var v = q.value.toLowerCase().replace(/[^a-z0-9]/g, '');
            document.querySelectorAll('#list li').forEach(function (li) { li.hidden = v !== '' && li.getAttribute('data-t').indexOf(v) < 0; });
        });
        return;
    }
    // 404 page: the ticker in another case, or a pool id typed directly.
    var seg = location.pathname.split('/').filter(Boolean)[0] || '';
    if (/^pool1[02-9ac-hj-np-z]{51}$/.test(seg)) { location.replace('https://cardanoscan.io/pool/' + seg); return; }
    var slug = seg.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!slug || slug === seg) return;
    fetch('/links.json').then(function (r) { return r.json(); }).then(function (m) {
        if (Object.prototype.hasOwnProperty.call(m, slug)) location.replace('/' + slug);
    }).catch(function () {});
})();
