# Instal·lar Harmonia com a app

Hi ha dues maneres, segons què necessitis.

---

## Opció A — Aparença d'app, sense complicar-se (30 segons)

Serveix per fer servir el fitxer tal com el tens ara, al teu ordinador.

1. Obre `harmonia.html` amb Chrome (doble clic).
2. Menú **⋮** (tres punts, a dalt a la dreta) → **Enviar, guardar i compartir** → **Crea una drecera…**
   *(en algunes versions és directament: **Més eines → Crea una drecera…**)*
3. Marca la casella **"Obre com a finestra"** i accepta.

Tindràs una icona a l'escriptori que obre Harmonia en una **finestra pròpia, sense pestanyes ni barra d'adreces**. Té aspecte d'aplicació i funciona sense connexió.

Limitació: Chrome no ho considera una app "instal·lada" de veritat (no surt al llistador d'aplicacions del sistema).

---

## Opció B — Instal·lació completa (icona pròpia, app de debò)

Chrome només instal·la aplicacions quan la pàgina **se serveix des d'un servidor** (`http://` o `https://`), mai quan s'obre com a fitxer solt (`file://`). És una norma de seguretat del navegador, no es pot saltar.

Per això, posa **tots aquests fitxers en una mateixa carpeta**:

```
index.html                 ← el harmonia.html, reanomenat
manifest.webmanifest
sw.js
icon-192.png
icon-512.png
icon-maskable-512.png
```

> Important: reanomena `harmonia.html` a **`index.html`**. Els altres fitxers han de conservar el nom.

### B1. En local (només al teu ordinador)

Obre un terminal dins de la carpeta i executa:

```
python3 -m http.server 8000
```

Obre Chrome a **http://localhost:8000** i veuràs:

- una **icona d'instal·lació** a la barra d'adreces (un monitor amb una fletxa), o
- el botó **⤓** que apareix al menú lateral de la pròpia app.

Clica-hi i quedarà instal·lada com una aplicació del sistema. Un cop instal·lada, ja funciona sense connexió i **sense haver de tornar a engegar el servidor**.

### B2. Publicada (per instal·lar-la també al mòbil)

Puja la carpeta a un allotjament gratuït amb HTTPS, per exemple **GitHub Pages**, **Netlify** o **Cloudflare Pages**. Un cop tinguis l'adreça:

- **Android (Chrome)**: menú ⋮ → *Instal·la l'aplicació*.
- **iPhone/iPad (Safari)**: botó Compartir → *Afegeix a la pantalla d'inici*.
- **Ordinador**: la icona d'instal·lació de la barra d'adreces.

---

## Què fa cada fitxer

| Fitxer | Per a què serveix |
|---|---|
| `index.html` | L'aplicació sencera. Funciona sola, encara que esborris la resta. |
| `manifest.webmanifest` | Diu al navegador el nom, els colors i les icones de l'app. |
| `sw.js` | Fa que funcioni sense connexió un cop instal·lada. |
| `icon-*.png` | Les icones de l'aplicació (la de fons transparent és per a Android). |

---

## Notes

- **El fitxer sol continua funcionant.** Si obres `harmonia.html` directament, tot va igual que sempre; simplement no s'ofereix la instal·lació.
- **Les teves dades.** El que has desat (progressions, cançons, lletres que hi hagis enganxat) es guarda al navegador i **no es comparteix entre el fitxer local i la versió instal·lada**: són orígens diferents per al navegador. Si vols conservar-ho, val la pena decidir amb quina de les dues vies et quedes.
- **Actualitzacions.** Si canvies l'HTML (per exemple per afegir-hi lletres), l'app instal·lada agafarà la versió nova en obrir-la un parell de vegades. Per forçar-ho: Ctrl+Maj+R.
