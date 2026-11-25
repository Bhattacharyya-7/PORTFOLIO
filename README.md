# Debanjali Bhattacharjee – Portfolio

## Folder
- `index.html` – page content (About, Skills, Experience, Education text)
- `style.css` – colours (top of file, `:root`), fonts, layout
- `script.js` – **contact details** and **projects** (top of file)
- `assets/hero.jpg` (wide hero) and `assets/debanjali.jpg` (portrait, used on phones and in About): replace with same-named files to change the photos

## Update content
- **Email / phone / LinkedIn / GitHub:** fill in `CONTACT` at the top of `script.js`. Empty fields are hidden.
- **Add a project:** copy one `{ ... }` block inside `PROJECTS` and edit it. Delete the placeholder when you add a real one.
- **Portfolio URL:** change the `url` of "This portfolio" in `PROJECTS`.
- **Private Tutor:** details are kept minimal; add dates or subjects in `index.html` if you want.
- Fonts load from Google Fonts; the site falls back to Georgia/system fonts offline.

## CV
- Your CV photo is `cv/photo.png` (replace it to change the photo).
- `cv/Debanjali_Bhattacharjee_CV.pdf` is the file both CV buttons point to (View opens it in a new tab, Download saves it with that filename).
- To update it, edit the DATA section of `cv/build_cv.py` and run `python3 cv/build_cv.py` from inside the `cv` folder (needs `pip install reportlab`). Keep the same filename.

## Contact form
The form works as a Netlify Form once the site is deployed on Netlify (messages appear in your Netlify dashboard under Forms). Opened locally, it falls back to opening your email app.
Email, WhatsApp number (country code + digits, no `+`) and Instagram are set at the top of `script.js`. If you change the phone or email, also change them in `cv/build_cv.py`.

- `cv.html` is the page the "View my CV" button opens (with a Back to portfolio link). After you rebuild the CV, refresh its fallback preview with: `pdftoppm -r 130 -png -singlefile cv/Debanjali_Bhattacharjee_CV.pdf cv/cv-preview`
