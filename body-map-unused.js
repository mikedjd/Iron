/**
 * IRON — Body Map SVG (unused)
 *
 * This was a front/back human silhouette that highlighted muscle groups
 * based on training volume. Replaced by the Body Part Volume bar chart
 * on the Performance tab. Kept here in case it's wanted in future.
 *
 * To restore: add the CSS below to index.html <style>, then call
 * buildBodyMapSVG(volumes, maxVal, mode) and inject the returned HTML.
 *
 * Required CSS:
 *   .body-silhouette { fill: rgba(255,255,255,0.04); stroke: rgba(255,255,255,0.12); stroke-width: 0.5; }
 *   .body-region { transition: fill 0.3s ease; stroke: none; }
 *   .body-map-label { ... }
 *   .body-map { width: 100%; height: auto; }
 *   .body-map-side-by-side { display: flex; gap: 16px; justify-content: center; }
 *   .body-map-col { flex: 1; max-width: 160px; }
 */

function getMuscleFill(group, volumes, maxVal, mode) {
  const val = mode === 'sets' ? (volumes[group]?.sets || 0) : (volumes[group]?.volume || 0);
  const opacity = val > 0 ? (0.15 + 0.85 * (val / maxVal)).toFixed(2) : 0.03;
  if (val === 0) return `rgba(255,255,255,0.03)`;
  if (mode === 'sets') {
    const cc = getBarColorClass(group, volumes[group]?.sets || 0);
    if (cc === 'under') return `rgba(255,149,0,${opacity})`;
    if (cc === 'over') return `rgba(255,59,48,${opacity})`;
    return `rgba(163,184,108,${opacity})`;
  }
  return `rgba(163,184,108,${opacity})`;
}

function buildBodyMapSVG(volumes, maxVal, mode) {
  // Clean anatomy illustration — Hevy-style
  // Thin outlined silhouette + simple rounded muscle shapes floating on top
  // Slightly more muscular than reference but same clean aesthetic
  // Center x=100, figure height ~350

  // Smooth body silhouette — athletic male, arms taper cleanly (no hands/fingers)
  const silhouette = 'M100,18 C94,18 89,23 89,32 C89,41 94,47 100,47 C106,47 111,41 111,32 C111,23 106,18 100,18 Z M93,47 C91,49 89,53 88,58 C85,57 78,58 70,62 C62,66 55,73 52,80 C49,88 50,96 52,104 C52,110 52,118 54,126 C52,132 50,140 50,148 C52,156 56,160 62,162 C64,164 66,164 68,162 C66,174 64,190 66,206 C68,222 72,240 76,252 C78,258 80,264 82,268 C82,274 80,284 78,298 C76,316 78,332 82,346 C84,354 88,360 94,362 L100,364 L106,362 C112,360 116,354 118,346 C122,332 124,316 122,298 C120,284 118,274 118,268 C120,264 122,258 124,252 C128,240 132,222 134,206 C136,190 136,174 132,162 C134,164 136,164 138,162 C144,160 148,156 150,148 C150,140 148,132 146,126 C148,118 148,110 148,104 C150,96 151,88 148,80 C145,73 138,66 130,62 C122,58 115,57 112,58 C111,53 109,49 107,47 Z';

  // --- FRONT VIEW: Individual muscle shapes ---
  const frontRegions = [
    // --- SHOULDERS ---
    ['Front Delts', [
      'M70,64 C64,63 58,67 55,73 C53,79 53,85 55,90 L60,88 C60,84 62,78 66,74 C68,72 70,68 72,66 Z',
      'M130,64 C136,63 142,67 145,73 C147,79 147,85 145,90 L140,88 C140,84 138,78 134,74 C132,72 130,68 128,66 Z'
    ]],
    ['Side Delts', [
      'M55,73 C52,78 51,84 52,88 L55,90 C53,84 54,78 55,73 Z',
      'M145,73 C148,78 149,84 148,88 L145,90 C147,84 146,78 145,73 Z'
    ]],

    // --- CHEST ---
    ['Chest', [
      'M72,70 C66,72 63,78 62,86 C62,94 65,100 70,104 C75,107 82,108 90,106 L98,102 L98,74 C90,70 80,68 72,70 Z',
      'M128,70 C134,72 137,78 138,86 C138,94 135,100 130,104 C125,107 118,108 110,106 L102,102 L102,74 C110,70 120,68 128,70 Z'
    ]],

    // --- ARMS ---
    ['Biceps', [
      'M60,90 L64,88 C66,92 68,98 68,106 C68,114 66,122 64,128 L60,132 C58,124 56,114 56,106 C56,98 58,94 60,90 Z',
      'M140,90 L136,88 C134,92 132,98 132,106 C132,114 134,122 136,128 L140,132 C142,124 144,114 144,106 C144,98 142,94 140,90 Z'
    ]],
    ['Triceps', [
      'M52,88 L55,90 C54,98 54,108 56,118 C57,124 58,130 60,134 L56,136 C52,128 50,118 50,108 C50,98 50,92 52,88 Z',
      'M148,88 L145,90 C146,98 146,108 144,118 C143,124 142,130 140,134 L144,136 C148,128 150,118 150,108 C150,98 150,92 148,88 Z'
    ]],
    ['Forearms', [
      'M56,136 L60,134 L64,128 C66,138 66,150 64,160 L62,166 C58,162 56,156 54,148 C52,142 54,138 56,136 Z',
      'M144,136 L140,134 L136,128 C134,138 134,150 136,160 L138,166 C142,162 144,156 146,148 C148,142 146,138 144,136 Z'
    ]],

    // --- TORSO ---
    ['Core', [
      'M90,106 L98,102 L98,118 L90,118 Z',
      'M110,106 L102,102 L102,118 L110,118 Z'
    ]],
    ['Core', [
      'M89,120 L98,120 L98,134 L88,134 Z',
      'M111,120 L102,120 L102,134 L112,134 Z'
    ]],
    ['Core', [
      'M88,136 L98,136 L98,150 L87,150 Z',
      'M112,136 L102,136 L102,150 L113,150 Z'
    ]],
    ['Core', [
      'M87,152 L98,152 L98,166 L86,166 Z',
      'M113,152 L102,152 L102,166 L114,166 Z'
    ]],
    ['Core', [
      'M74,120 L80,114 L82,118 L86,134 L86,154 L84,166 L80,168 C78,158 76,142 74,128 Z',
      'M126,120 L120,114 L118,118 L114,134 L114,154 L116,166 L120,168 C122,158 124,142 126,128 Z'
    ]],

    // --- LEGS (solid quads — one shape per leg) ---
    ['Quads', [
      'M80,170 C76,182 74,198 74,216 C74,234 76,248 80,260 L88,266 L96,268 C96,254 96,238 96,224 C96,208 96,192 96,178 L88,174 Z',
      'M120,170 C124,182 126,198 126,216 C126,234 124,248 120,260 L112,266 L104,268 C104,254 104,238 104,224 C104,208 104,192 104,178 L112,174 Z'
    ]],
    ['Glutes', [
      'M96,178 L100,178 L104,178 C104,194 104,210 104,224 L100,228 L96,224 C96,210 96,194 96,178 Z'
    ]],

    // --- CALVES (solid — one shape per leg) ---
    ['Calves', [
      'M82,272 C80,282 78,294 78,308 C78,322 80,334 84,344 L90,346 C94,344 96,336 96,324 C96,310 94,294 92,272 Z',
      'M118,272 C120,282 122,294 122,308 C122,322 120,334 116,344 L110,346 C106,344 104,336 104,324 C104,310 106,294 108,272 Z'
    ]],
  ];

  // --- BACK VIEW: Clean — traps (leaf shapes from neck) + lats (V-wings) ---
  const backRegions = [
    // --- TRAPS: two leaf shapes fanning from neck outward & down ---
    ['Upper Back', [
      'M98,58 C90,62 78,72 68,82 C62,90 64,100 72,106 C80,112 92,112 98,108 Z',
      'M102,58 C110,62 122,72 132,82 C138,90 136,100 128,106 C120,112 108,112 102,108 Z'
    ]],

    // --- LATS: two large wing shapes ---
    ['Lats', [
      'M62,86 C58,98 58,112 62,128 C66,142 74,154 86,162 L92,158 C82,148 74,136 70,122 C66,108 66,96 68,86 Z',
      'M138,86 C142,98 142,112 138,128 C134,142 126,154 114,162 L108,158 C118,148 126,136 130,122 C134,108 134,96 132,86 Z'
    ]],

    // --- REAR DELTS ---
    ['Rear Delts', [
      'M62,74 C58,72 54,74 54,80 C54,86 56,90 60,92 L64,88 C62,84 62,80 62,76 Z',
      'M138,74 C142,72 146,74 146,80 C146,86 144,90 140,92 L136,88 C138,84 138,80 138,76 Z'
    ]],

    // --- ARMS ---
    ['Triceps', [
      'M56,90 L60,88 C58,100 56,114 56,126 C56,134 58,140 60,144 L54,146 C50,136 48,124 48,112 C48,104 50,96 56,90 Z',
      'M144,90 L140,88 C142,100 144,114 144,126 C144,134 142,140 140,144 L146,146 C150,136 152,124 152,112 C152,104 150,96 144,90 Z'
    ]],
    ['Forearms', [
      'M54,146 L60,144 C62,154 62,162 60,168 L58,172 C54,168 52,162 50,154 C50,150 52,148 54,146 Z',
      'M146,146 L140,144 C138,154 138,162 140,168 L142,172 C146,168 148,162 150,154 C150,150 148,148 146,146 Z'
    ]],

    // --- LOWER BACK (erectors) ---
    ['Core', [
      'M90,112 L98,108 L98,166 L88,166 C88,152 88,134 90,120 Z',
      'M110,112 L102,108 L102,166 L112,166 C112,152 112,134 110,120 Z'
    ]],

    // --- GLUTES ---
    ['Glutes', [
      'M82,166 L98,170 C96,180 92,188 86,194 C82,188 78,180 78,172 Z',
      'M118,166 L102,170 C104,180 108,188 114,194 C118,188 122,180 122,172 Z'
    ]],
    // --- HAMSTRINGS ---
    ['Hamstrings', [
      'M78,172 C76,186 74,202 74,220 C74,238 76,252 80,264 L96,268 C96,254 96,238 96,224 C96,208 96,194 98,182 L86,194 Z',
      'M122,172 C124,186 126,202 126,220 C126,238 124,252 120,264 L104,268 C104,254 104,238 104,224 C104,208 104,194 102,182 L114,194 Z'
    ]],

    // --- CALVES (solid) ---
    ['Calves', [
      'M82,272 C80,282 78,294 78,308 C78,322 80,334 84,344 L90,346 C94,344 96,336 96,324 C96,310 106,294 108,272 Z',
      'M118,272 C120,282 122,294 122,308 C122,322 120,334 116,344 L110,346 C106,344 104,336 104,324 C104,310 106,294 108,272 Z'
    ]],
  ];

  function renderPaths(regions) {
    let svg = `<path class="body-silhouette" d="${silhouette}"/>`;
    for (const [group, dPaths] of regions) {
      const fill = getMuscleFill(group, volumes, maxVal, mode);
      for (const d of dPaths) svg += `<path class="body-region" d="${d}" fill="${fill}"/>`;
    }
    return svg;
  }

  const vb = '40 8 120 370';
  const frontSvg = `<svg viewBox="${vb}" class="body-map">${renderPaths(frontRegions)}</svg>`;

  return `<div class="body-map-side-by-side">
    <div class="body-map-col">
      ${frontSvg}
    </div>
  </div>`;
}
