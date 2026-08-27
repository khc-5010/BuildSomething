/* Build Something! — shared helpers. No frameworks, no build step, nothing to rot. */

function $(sel, root) { return (root || document).querySelector(sel); }
function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

var bsStore = {
  get: function (key) {
    try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  },
  set: function (key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode etc. */ }
  },
  del: function (key) {
    try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }
};

/* Copy text to the clipboard with a visual receipt on the button. */
function bsCopy(btn, text) {
  function receipt(ok) {
    var original = btn.dataset.label || btn.textContent;
    btn.dataset.label = original;
    btn.textContent = ok ? "COPIED ✓" : "SELECT + CTRL-C";
    setTimeout(function () { btn.textContent = btn.dataset.label; }, 1600);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () { receipt(true); }, function () { legacy(); });
  } else { legacy(); }
  function legacy() {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(ta);
      receipt(ok);
    } catch (e) { receipt(false); }
  }
}

/* Deterministic little SVG thumbnail for a board card — radar, bracket, bars, or grid,
   picked by a hash of the project name so every project gets a stable look. */
function bsThumb(name) {
  var h = 0;
  for (var i = 0; i < name.length; i++) { h = (h * 31 + name.charCodeAt(i)) >>> 0; }
  var kind = h % 4;
  var blue = "#96bee6", dim = "#2f5d8f", line = "#14304f", amber = "#ffb03a";
  var s = '<svg class="card-thumb" viewBox="0 0 420 190" xmlns="http://www.w3.org/2000/svg">';
  if (kind === 0) { // radar
    s += '<circle cx="210" cy="95" r="70" fill="none" stroke="' + line + '" stroke-width="2"/>' +
         '<circle cx="210" cy="95" r="45" fill="none" stroke="' + line + '" stroke-width="2"/>' +
         '<circle cx="210" cy="95" r="20" fill="none" stroke="' + line + '" stroke-width="2"/>' +
         '<line x1="210" y1="95" x2="' + (150 + (h % 120)) + '" y2="' + (35 + (h % 40)) + '" stroke="' + blue + '" stroke-width="2.5"/>' +
         '<circle cx="' + (170 + (h % 80)) + '" cy="' + (60 + (h % 50)) + '" r="5" fill="' + blue + '"/>' +
         '<circle cx="' + (160 + ((h >> 3) % 100)) + '" cy="' + (110 + (h % 30)) + '" r="5" fill="' + dim + '"/>' +
         '<circle cx="' + (190 + ((h >> 5) % 60)) + '" cy="' + (50 + ((h >> 2) % 25)) + '" r="5" fill="' + amber + '"/>';
  } else if (kind === 1) { // bracket
    s += '<path d="M60 40 h50 v25 h-50 M60 90 h50 v-25 M110 65 h40" fill="none" stroke="' + dim + '" stroke-width="2"/>' +
         '<path d="M60 120 h50 v25 h-50 M60 170 h50 v-25 M110 145 h40" fill="none" stroke="' + dim + '" stroke-width="2"/>' +
         '<path d="M150 65 h30 v40 h-30 M150 145 h30 v-40 M180 105 h40" fill="none" stroke="' + blue + '" stroke-width="2"/>' +
         '<path d="M360 40 h-50 v25 h50 M360 90 h-50 v-25 M310 65 h-40" fill="none" stroke="' + dim + '" stroke-width="2"/>' +
         '<path d="M360 120 h-50 v25 h50 M360 170 h-50 v-25 M310 145 h-40" fill="none" stroke="' + dim + '" stroke-width="2"/>' +
         '<path d="M270 65 h-30 v40 h30 M270 145 h-30 v-40 M240 105 h-20" fill="none" stroke="' + blue + '" stroke-width="2"/>' +
         '<circle cx="225" cy="105" r="12" fill="none" stroke="' + amber + '" stroke-width="2.5"/>';
  } else if (kind === 2) { // bars
    var heights = [30 + (h % 40), 55 + ((h >> 2) % 40), 80 + ((h >> 4) % 35), 100 + ((h >> 6) % 20), 20 + ((h >> 8) % 30)];
    for (var b = 0; b < 5; b++) {
      var bh = heights[b];
      var stroke = b === 3 ? blue : (b === 4 ? amber : dim);
      s += '<rect x="' + (70 + b * 54) + '" y="' + (165 - bh) + '" width="34" height="' + bh + '" fill="none" stroke="' + stroke + '" stroke-width="2"' + (b === 4 ? ' stroke-dasharray="5 4"' : '') + '/>';
    }
    s += '<line x1="60" y1="165" x2="350" y2="165" stroke="' + line + '" stroke-width="2"/>';
  } else { // grid of cells, two highlighted
    for (var r = 0; r < 2; r++) {
      for (var c = 0; c < 3; c++) {
        var idx = r * 3 + c;
        var hot = idx === (h % 6), warm = idx === ((h >> 3) % 6) && ((h >> 3) % 6) !== (h % 6);
        s += '<rect x="' + (80 + c * 70) + '" y="' + (35 + r * 70) + '" width="60" height="50" fill="none" stroke="' +
             (hot ? blue : (warm ? amber : dim)) + '" stroke-width="' + (hot || warm ? 2.5 : 2) + '"/>';
      }
    }
  }
  s += "</svg>";
  return s;
}

/* Small shared fills that any page can opt into with data attributes. */
document.addEventListener("DOMContentLoaded", function () {
  if (typeof BUILDS !== "undefined") {
    $$("[data-build-count]").forEach(function (el) {
      el.textContent = String(BUILDS.length).padStart(2, "0");
    });
  }
});

/* Installability: register the service worker (skipped on file:// so the
   no-server workflow keeps working). */
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js")
      .then(function (reg) { reg.update(); })
      .catch(function () { /* offline-first is a bonus, never a blocker */ });
  });
}
