"""Rebuilds Debanjali_Bhattacharjee_CV.pdf.  Edit the DATA section, then run:  python3 build_cv.py
(needs:  pip install reportlab;  photo = photo.png in this folder)"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor as C
from reportlab.lib.styles import ParagraphStyle as S
from reportlab.platypus import Paragraph, Frame, Spacer, Flowable
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth

# ---------------- DATA ----------------
NAME = "Debanjali Bhattacharjee"
SUBTITLE = "B.Sc. Computer Applications. Computer &amp; AI Instructor."
PORTFOLIO = "https://debanjalibhattacharjee.netlify.app/"
WEBSITE = "https://santipurrash.infinityfree.io/"
GITHUB = "https://github.com/Bhattacharyya-7"
PHONE = "9830259430 / 9883793335"
EMAIL = "titlit24012004@gmail.com"
LOCATION = "Payradanga, Nadia, West Bengal – 741247"
PROFILE = ("Computer Applications graduate with practical experience in computer education and MS Office applications. "
           "Seeking an opportunity in Data Entry, MIS, Back Office or Computer Operations where I can apply my computer skills, "
           "communication abilities and attention to detail while continuing to learn and grow.")
EXPERIENCE = [
  ("Feb 2025 – Present", "Computer &amp; AI Instructor", "AIBCE, part-time",
   "Teach computer fundamentals, MS Office and basic AI to students and adults, including practical computer skills for their courses and workplace requirements."),
  ("Ongoing", "Private Tutor", "Independent, part-time", "Provide regular academic guidance and support to students."),
]
EDUCATION = [("2025", "B.Sc. in Computer Applications", "Rishi Bankim Chandra College, Naihati. West Bengal State University (WBSU)"),
             ("2022", "Higher Secondary", "WBBSE. 74.40%"), ("2020", "Secondary Education", "WBBSE. 75.28%")]
SKILLS = [("Computer proficiency", "MS Word, MS Excel, MS PowerPoint, Data Entry, Documentation"),
          ("Programming", "C, Java (basic), Python (basic), PHP (basic)"),
          ("Web and database", "HTML, CSS, MySQL"), ("Tools", "VS Code, Canva")]
LANGUAGES = [("Bengali", "Native"), ("English", "Proficient"), ("Hindi", "Conversational")]
STRENGTHS = ["Communication", "Problem Solving", "Time Management", "Multitasking", "Leadership", "Attention to Detail", "Quick Learning"]
INTERESTS = "Teaching, Web building, Cricket, Exploring"
# --------------------------------------

BG, CH, AM, GD, BL, IV = map(C, ["#211A14", "#37332F", "#A96826", "#C6A66B", "#536B83", "#E9E1D5"])
PAPER = C("#F6F2EA"); MUTED = C("#B7AA99")
W, H = A4; SB = 205; MX = SB + 30; MW = W - MX - 32

def st(n, **k): return S(n, **k)
body = st("b", fontName="Helvetica", fontSize=9.6, leading=13.6, textColor=CH)
org = st("o", parent=body, textColor=BL)
h3 = st("h3", fontName="Times-Bold", fontSize=12.5, leading=15, textColor=BG)
lab = st("l", parent=body, fontName="Helvetica-Bold", textColor=BG)
sbh = st("sbh", fontName="Times-Bold", fontSize=14, leading=17, textColor=GD)
sbl = st("sbl", fontName="Helvetica", fontSize=8.5, leading=11, textColor=GD)
sbv = st("sbv", fontName="Helvetica", fontSize=9.6, leading=12.6, textColor=IV)
mh = st("mh", fontName="Times-Bold", fontSize=15, leading=18, textColor=AM, spaceBefore=7, spaceAfter=1)
lk = lambda u, col, t=None: f'<a href="{u}" color="{col}"><u>{t or u.replace("https://","").rstrip("/")}</u></a>'

class Rule(Flowable):
    def __init__(s, col, w=None): super().__init__(); s.col = col; s.w = w
    def wrap(s, aw, ah): s.aw = aw; return aw, 8
    def draw(s): s.canv.setStrokeColor(s.col); s.canv.setLineWidth(.7); s.canv.line(0, 3, s.aw, 3)

class Pills(Flowable):
    def __init__(s, items): super().__init__(); s.items = items
    def wrap(s, aw, ah):
        s.pos = []; x = y = 0; rh = 17
        for t in s.items:
            w = stringWidth(t, "Helvetica", 8.5) + 16
            if x + w > aw: x = 0; y += rh + 6
            s.pos.append((x, y, w, t)); x += w + 6
        s.h = y + rh; return aw, s.h
    def draw(s):
        c = s.canv; c.setStrokeColor(MUTED); c.setFillColor(IV); c.setLineWidth(.6); c.setFont("Helvetica", 8.5)
        for x, y, w, t in s.pos:
            yy = s.h - y - 17; c.roundRect(x, yy, w, 17, 8.5, stroke=1, fill=0); c.drawString(x + 8, yy + 5.2, t)

class Row(Flowable):
    """left marker (timeline dot or year pill) + paragraphs on the right"""
    def __init__(s, kind, lead, paras, last=False): super().__init__(); s.kind, s.lead, s.paras, s.last = kind, lead, paras, last
    def wrap(s, aw, ah):
        s.ind = 18 if s.kind == "tl" else 62
        s.hs = []; t = 0
        for p in s.paras: _, hh = p.wrap(aw - s.ind, 999); s.hs.append(hh); t += hh
        s.t = t + 10; return aw, s.t
    def draw(s):
        c = s.canv; y = s.t
        if s.kind == "tl":
            c.setStrokeColor(AM); c.setFillColor(PAPER); c.setLineWidth(1.4)
            if not s.last: c.line(4, 0, 4, y - 6)
            c.circle(4, y - 6, 4, stroke=1, fill=1)
        else:
            c.setFillColor(BG); c.roundRect(0, y - 17, 48, 17, 8.5, stroke=0, fill=1)
            c.setFillColor(IV); c.setFont("Helvetica-Bold", 8.8); c.drawCentredString(24, y - 12, s.lead)
        for p, hh in zip(s.paras, s.hs): y -= hh; p.drawOn(c, s.ind, y)

out = "Debanjali_Bhattacharjee_CV.pdf"
c = canvas.Canvas(out, pagesize=A4)
c.setTitle("Debanjali Bhattacharjee – CV"); c.setAuthor(NAME); c.setSubject("Curriculum Vitae")
c.setFillColor(PAPER); c.rect(0, 0, W, H, stroke=0, fill=1)
c.setFillColor(BG); c.rect(0, 0, SB, H, stroke=0, fill=1)
c.setFillColor(AM); c.rect(SB, 0, 3, H, stroke=0, fill=1)

# arched photo
px, pw, ph, top = 28, SB - 56, 170, H - 34
p = c.beginPath(); r = pw / 2
p.moveTo(px, top - ph); p.lineTo(px + pw, top - ph); p.lineTo(px + pw, top - r)
p.arcTo(px, top - 2 * r, px + pw, top, startAng=0, extent=180); p.close()
c.saveState(); c.clipPath(p, stroke=0, fill=0)
c.drawImage("photo.png", px, top - ph, pw, ph, preserveAspectRatio=True, anchor="c", mask=None); c.restoreState()
c.setStrokeColor(AM); c.setLineWidth(1); c.drawPath(p, stroke=1, fill=0)

def sec(t, col, style): return [Paragraph(t, style), Rule(col)]
SBI = []
SBI += sec("Contact", GD, sbh)
for l, v in [("Phone", PHONE), ("Email", lk("mailto:" + EMAIL, "#E9E1D5", EMAIL)), ("Location", LOCATION),
             ("Portfolio", lk(PORTFOLIO, "#C6A66B")), ("GitHub", lk(GITHUB, "#E9E1D5"))]:
    SBI += [Paragraph(l, sbl), Paragraph(v, sbv), Spacer(1, 5)]
SBI += [Spacer(1, 5)] + sec("Languages", GD, sbh)
for a, b in LANGUAGES: SBI += [Paragraph(a, sbv), Paragraph(f'<font color="#B7AA99" size="8.5">{b}</font>', sbv), Spacer(1, 3)]
SBI += [Spacer(1, 6)] + sec("Strengths", GD, sbh) + [Spacer(1, 2), Pills(STRENGTHS), Spacer(1, 12)]
SBI += sec("Interests", GD, sbh) + [Paragraph(INTERESTS, sbv)]

M = [Paragraph("CURRICULUM VITAE", st("cv", fontName="Helvetica-Bold", fontSize=9, leading=12, textColor=AM, charSpace=1.5)),
     Paragraph(NAME, st("n", fontName="Times-Bold", fontSize=31, leading=33, textColor=BG)), Spacer(1, 3),
     Paragraph(SUBTITLE, st("sub", parent=body, textColor=CH)), Spacer(1, 6)]
M += sec("Profile", AM, mh) + [Paragraph(PROFILE, body),
      Spacer(1, 4), Paragraph(f'<b>Portfolio:</b> my projects, skills and experience are online at {lk(PORTFOLIO, "#A96826")}', body), Spacer(1, 6)]
M += sec("Experience", AM, mh)
for i, (d, t, o, x) in enumerate(EXPERIENCE):
    M.append(Row("tl", "", [Paragraph(f'<font name="Helvetica-Bold" color="#A96826">{d}</font>', body), Paragraph(t, h3), Paragraph(o, org), Paragraph(x, body)], i == len(EXPERIENCE) - 1))
M += [Spacer(1, 4)] + sec("Education", AM, mh)
for y, t, d in EDUCATION: M.append(Row("ed", y, [Paragraph(t, h3), Paragraph(d, org)]))
M += [Spacer(1, 4)] + sec("Technical Skills", AM, mh)
for t, d in SKILLS: M += [Paragraph(t, lab), Paragraph(d, body), Spacer(1, 4)]
M += [Spacer(1, 2)] + sec("Hands-on Web Experience", AM, mh) + [Paragraph("Hands-on experience with a live website: " + lk(WEBSITE, "#A96826"), body)]

for fr, items in [(Frame(24, 30, SB - 48, top - ph - 22 - 30, 0, 0, 0, 0), SBI), (Frame(MX, 28, MW, H - 28 - 30, 0, 0, 0, 0), M)]:
    fr.addFromList(items, c); assert not items, "Content overflowed the page – shorten the text"
c.save(); print("wrote", out)
