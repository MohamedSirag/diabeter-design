/**
 * Figma Plugin API polyfill — renders plugin JS to HTML/CSS
 * Supports: createFrame, createRectangle, createText, loadFontAsync, notify, viewport
 */
(function () {
  const CANVAS = document.getElementById('canvas-area');

  const FONT_WEIGHT = {
    Thin: 100, ExtraLight: 200, Light: 300, Regular: 400,
    Medium: 500, SemiBold: 600, 'Semi Bold': 600,
    Bold: 700, ExtraBold: 800, 'Extra Bold': 800, Black: 900,
  };

  function rgbaCSS(color, opacity) {
    const r = Math.round((color.r || 0) * 255);
    const g = Math.round((color.g || 0) * 255);
    const b = Math.round((color.b || 0) * 255);
    const a = opacity !== undefined ? opacity : 1;
    return `rgba(${r},${g},${b},${a})`;
  }

  function fillCSS(fills) {
    if (!fills || !fills.length) return 'transparent';
    const f = fills[0];
    return f.type === 'SOLID' ? rgbaCSS(f.color, f.opacity ?? 1) : 'transparent';
  }

  function borderCSS(strokes, weight) {
    if (!strokes || !strokes.length) return '';
    const s = strokes[0];
    if (s.type !== 'SOLID') return '';
    return `${weight || 1}px solid ${rgbaCSS(s.color, s.opacity ?? 1)}`;
  }

  class FigmaNode {
    constructor(tag = 'div') {
      this._el = document.createElement(tag);
      this._el.style.position = 'absolute';
      this._el.style.boxSizing = 'border-box';
      this._strokes = [];
      this._strokeWeight = 0;
      this._isFlexBox = false;
    }

    resize(w, h) {
      this._el.style.width = w + 'px';
      this._el.style.height = h + 'px';
    }

    set x(v) { this._el.style.left = v + 'px'; }
    get x() { return parseFloat(this._el.style.left) || 0; }
    set y(v) { this._el.style.top = v + 'px'; }
    get y() { return parseFloat(this._el.style.top) || 0; }

    set name(v) {
      this._el.dataset.name = v;
      this._el.title = v;
    }
    get name() { return this._el.dataset.name || ''; }

    set fills(v) { this._el.style.background = fillCSS(v); }
    set strokes(v) { this._strokes = v || []; this._applyBorder(); }
    set strokeWeight(v) { this._strokeWeight = v; this._applyBorder(); }

    _applyBorder() {
      const b = borderCSS(this._strokes, this._strokeWeight);
      this._el.style.border = b || '';
    }

    set cornerRadius(v) { this._el.style.borderRadius = v + 'px'; }

    appendChild(child) {
      if (this._isFlexBox) {
        child._el.style.position = 'static';
        child._el.style.flexShrink = '0';
      }
      this._el.appendChild(child._el);
    }

    // stroke align shims
    set strokeAlign(_v) {}
  }

  class FigmaFrame extends FigmaNode {
    constructor() {
      super('div');
      this._el.classList.add('f-frame');
      this._el.style.overflow = 'hidden';
    }

    set layoutMode(v) {
      if (v === 'HORIZONTAL' || v === 'VERTICAL') {
        this._isFlexBox = true;
        this._el.style.display = 'flex';
        this._el.style.flexDirection = v === 'HORIZONTAL' ? 'row' : 'column';
        this._el.style.overflow = 'visible';
      }
    }
    set primaryAxisSizingMode(_v) {}
    set counterAxisSizingMode(_v) {}

    set primaryAxisAlignItems(v) {
      const map = { MIN: 'flex-start', CENTER: 'center', MAX: 'flex-end', SPACE_BETWEEN: 'space-between' };
      this._el.style.justifyContent = map[v] || 'flex-start';
    }
    set counterAxisAlignItems(v) {
      const map = { MIN: 'flex-start', CENTER: 'center', MAX: 'flex-end' };
      this._el.style.alignItems = map[v] || 'flex-start';
    }

    set paddingTop(v) { this._el.style.paddingTop = v + 'px'; }
    set paddingBottom(v) { this._el.style.paddingBottom = v + 'px'; }
    set paddingLeft(v) { this._el.style.paddingLeft = v + 'px'; }
    set paddingRight(v) { this._el.style.paddingRight = v + 'px'; }
    set itemSpacing(v) { this._el.style.gap = v + 'px'; }
    set clipsContent(v) { this._el.style.overflow = v ? 'hidden' : 'visible'; }
  }

  class FigmaRect extends FigmaNode {
    constructor() {
      super('div');
      this._el.classList.add('f-rect');
    }
  }

  class FigmaText extends FigmaNode {
    constructor() {
      super('div');
      this._el.classList.add('f-text');
      this._el.style.fontFamily = '"Montserrat", sans-serif';
      this._el.style.fontWeight = '400';
      this._el.style.fontSize = '14px';
      this._el.style.lineHeight = '1.25';
      this._el.style.whiteSpace = 'nowrap';
      this._el.style.overflow = 'hidden';
      this._autoResize = 'WIDTH_AND_HEIGHT';
    }

    set fontName(v) {
      if (v && v.family) this._el.style.fontFamily = `"${v.family}", sans-serif`;
      if (v && v.style) this._el.style.fontWeight = FONT_WEIGHT[v.style] || 400;
    }
    set fontSize(v) { this._el.style.fontSize = v + 'px'; }
    set characters(v) { this._el.textContent = String(v); }

    set fills(v) {
      if (!v || !v.length) { this._el.style.color = 'transparent'; return; }
      const f = v[0];
      if (f.type === 'SOLID') this._el.style.color = rgbaCSS(f.color, f.opacity ?? 1);
    }

    set textAlignHorizontal(v) {
      const map = { LEFT: 'left', CENTER: 'center', RIGHT: 'right', JUSTIFIED: 'justify' };
      this._el.style.textAlign = map[v] || 'left';
    }

    set textAutoResize(v) {
      this._autoResize = v;
      if (v === 'NONE') {
        this._el.style.whiteSpace = 'nowrap';
        this._el.style.overflow = 'hidden';
      } else if (v === 'HEIGHT') {
        this._el.style.whiteSpace = 'pre-wrap';
        this._el.style.wordBreak = 'break-word';
        this._el.style.overflowWrap = 'break-word';
        this._el.style.overflow = 'visible';
        this._el.style.height = 'auto';
      }
    }

    resize(w, h) {
      this._el.style.width = w + 'px';
      if (this._autoResize !== 'HEIGHT') {
        this._el.style.height = h + 'px';
      }
    }

    // Text nodes don't have background
    set strokes(_v) {}
    set strokeWeight(_v) {}
    set cornerRadius(_v) {}
    appendChild(_child) {}
  }

  // ── figma global ────────────────────────────────────────────────────────────
  const _screens = [];

  window.figma = {
    currentPage: {
      get children() { return _screens; },
      appendChild(node) {
        CANVAS.appendChild(node._el);
        _screens.push(node);
        // Register with nav
        if (window._registerScreen) window._registerScreen(node);
      },
    },

    loadFontAsync(_font) { return Promise.resolve(); },

    createFrame() { return new FigmaFrame(); },
    createRectangle() { return new FigmaRect(); },
    createText() { return new FigmaText(); },

    viewport: {
      scrollAndZoomIntoView(_nodes) { /* no-op */ },
    },

    notify(msg) {
      console.log('%c[Figma]', 'color:#22D3EE;font-weight:bold', msg);
      const el = document.getElementById('status');
      if (el) { el.textContent = msg; el.style.opacity = '1'; setTimeout(() => el.style.opacity = '0', 3000); }
    },
  };
})();
