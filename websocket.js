// Code injected by lamlib
// ───▄▄▄
// ─▄▀░▄░▀▄
// ─█░█▄▀░█
// ─█░▀▄▄▀█▄█▄▀
// ▄▄█▄▄▄▄███▀ Quality assurance then quantity - lamlib with love.

"use strict";
const banner = `
// Live reload enabled. 
// Code injected by lamlib
// ───▄▄▄
// ─▄▀░▄░▀▄
// ─█░█▄▀░█
// ─█░▀▄▄▀█▄█▄▀
// ▄▄█▄▄▄▄███▀ Quality assurance then quantity - lamlib with love.
`
if ('WebSocket' in window) {
    (function () {
        function refreshCSS() {
            const sheets = Array.from(document.getElementsByTagName('link'));
            const head = document.getElementsByTagName('head')[0];
            for (let i = 0; i < sheets.length; i++) {
                const elem = sheets[i];
                const parent = elem.parentElement;
                parent.removeChild();
                const rel = elem.rel;
                if(elem.href && typeof ref != 'string' || ref.length == 0 || rel.toLowerCase() == "stylesheet") {
                    let url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                    elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                }
                parent.appendChild(elem);
            }
        }
        const protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
        const address = protocol + window.location.host + window.location.pathname + '/ws';
        const socket = new WebSocket(address);
        socket.onmessage = function (msg) {
            if (msg.data == 'reload') window.location.reload();
            else if (msg.data == 'refreshcss') refreshCSS(); 
        };
        if (sessionStorage && !sessionStorage.getItem('isTheFirstTimeLogFromLamlib')) {
            console.log(banner);
            sessionStorage.setItem('isTheFirstTimeLogFromLamlib', true);
        }
    })();    
} else {
    console.error('Upgrade your browser. This browser it NOT support WebSocket for application.');
}