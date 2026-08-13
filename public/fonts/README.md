# Fonts

## Boska (headings)

Loaded in `src/app/layout.tsx` via `next/font/local`:

```
public/fonts/Boska-Variable.woff2        (normal, 200–900)
public/fonts/Boska-VariableItalic.woff2  (italic, 200–900)
```

Both files are copied from `assets/local-fonts/fonts/` in the project root.
Two variable files cover every weight and both styles, so the rest of the
Fontshare package (static weights, `.woff`, `.ttf`, `.eot`) is not needed —
`.eot` only matters for IE, and `.woff`/`.ttf` fallbacks are redundant now that
every browser Next.js targets supports `.woff2`.

If you re-download the family, keep the filenames exactly as above.
Boska is by Barbara Bigosinska / Indian Type Foundry, free for commercial use
under the Fontshare licence.

## Font Awesome (footer social icons)

```
public/fonts/fa-brands-400.woff2
```

Loaded via a plain `@font-face` in `src/app/fontawesome-brands.css` (icon
fonts aren't document text, so `next/font/local` isn't used here). Copied
from `assets/local-fonts/fontawesome/` in the project root — that folder
ships the full Font Awesome 6 Pro kit (solid/regular/light/thin/duotone/sharp
plus `fontawesome-all.min.css` with every icon glyph); only the Brands woff2
is copied in, since the footer only needs the Facebook and Instagram marks.
Add more icon rules to `fontawesome-brands.css` by copying their `content`
codepoint out of `fontawesome-all.min.css` rather than importing that whole
stylesheet.

## Helvetica (body)

Not bundled. Helvetica is a licensed typeface and is not redistributable, so the
body stack in `globals.css` resolves it from the system:

```
"Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif
```

macOS and iOS render real Helvetica Neue. Windows and most Android devices fall
back to Arial, which is metrically near-identical, so line breaks hold. If you
need true Helvetica on every platform you'd need to buy a webfont licence and
self-host it here alongside Boska.
