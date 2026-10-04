from pathlib import Path
from xml.sax.saxutils import escape
import re, textwrap
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Preformatted, KeepTogether, PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from pypdf import PdfReader

source = Path('C:/Users/molha/OneDrive/Desktop/B4F-BootCamp/HOMEWORK-WALKTHROUGH.md')
output = Path('output/pdf/HOMEWORK-WALKTHROUGH.pdf')
W,H = A4
width = W - 88
navy = colors.HexColor('#17324D')
styles = {
 'body': ParagraphStyle('body', fontName='Helvetica', fontSize=10, leading=14.5, spaceAfter=8, textColor=colors.HexColor('#253344')),
 'title': ParagraphStyle('title', fontName='Helvetica-Bold', fontSize=25, leading=30, spaceAfter=18, textColor=navy),
 'h2': ParagraphStyle('h2', fontName='Helvetica-Bold', fontSize=16, leading=21, spaceBefore=12, spaceAfter=12, keepWithNext=True, textColor=navy),
 'h3': ParagraphStyle('h3', fontName='Helvetica-Bold', fontSize=11.5, leading=16, spaceBefore=12, spaceAfter=7, keepWithNext=True, textColor=navy),
 'cell': ParagraphStyle('cell', fontName='Helvetica', fontSize=8.5, leading=12, textColor=colors.HexColor('#253344')),
 'th': ParagraphStyle('th', fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=colors.white),
 'code': ParagraphStyle('code', fontName='Courier', fontSize=8.1, leading=11, spaceAfter=0),
 'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=10, leading=14.5, leftIndent=12, firstLineIndent=-10, spaceAfter=7),
}
def inline(s):
 parts = re.split(r'(`[^`]+`)', s)
 return ''.join('<font name="Courier" size="8.6">'+escape(p[1:-1])+'</font>' if p.startswith('`') else escape(p) for p in parts)

story=[]
lines=source.read_text(encoding='utf-8').splitlines()
i=0
while i<len(lines):
 line=lines[i]
 if not line.strip(): i+=1; continue
 if line.startswith('```'):
  i+=1; code=[]
  while i<len(lines) and not lines[i].startswith('```'):
   raw=lines[i]
   code.extend(textwrap.wrap(raw, width=96, subsequent_indent='    ', replace_whitespace=False, drop_whitespace=False) or [''])
   i+=1
  block=Preformatted('\n'.join(code), styles['code'])
  box=Table([[block]], colWidths=[width])
  box.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),colors.HexColor('#F2F5F8')),('BOX',(0,0),(-1,-1),0.4,colors.HexColor('#D8E1EA')),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9)]))
  story.extend([box,Spacer(1,10)])
  i+=1; continue
 if line.startswith('|'):
  rows=[]
  while i<len(lines) and lines[i].startswith('|'):
   cells=[x.strip() for x in lines[i].strip('|').split('|')]
   if not all(re.fullmatch(r'[-: ]+',c) for c in cells): rows.append(cells)
   i+=1
  data=[[Paragraph(inline(c),styles['th' if r==0 else 'cell']) for c in row] for r,row in enumerate(rows)]
  table=Table(data,colWidths=[width*0.26,width*0.37,width*0.37],repeatRows=1,hAlign='LEFT')
  table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),navy),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.HexColor('#F1F5F9'),colors.white]),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8),('LINEBELOW',(0,0),(-1,-1),0.4,colors.HexColor('#D8E1EA'))]))
  story.extend([table,Spacer(1,12)]); continue
 if line.startswith('# '):
  story.append(Paragraph(inline(line[2:]),styles['title']))
 elif line.startswith('## '):
  if re.match(r'## [234578]\.',line): story.append(PageBreak())
  story.append(Paragraph(inline(line[3:]),styles['h2']))
 elif line.startswith('### '): story.append(Paragraph(inline(line[4:]),styles['h3']))
 elif line.startswith('- '): story.append(Paragraph('- '+inline(line[2:]),styles['bullet']))
 else:
  paragraph=[line]
  while i+1<len(lines) and lines[i+1].strip() and not lines[i+1].startswith(('#','|','```','- ')):
   i+=1; paragraph.append(lines[i])
  story.append(Paragraph(inline(' '.join(paragraph)),styles['body']))
 i+=1

def chrome(canvas,doc):
 canvas.saveState()
 canvas.setStrokeColor(colors.HexColor('#D8E1EA'))
 canvas.line(44,H-35,W-44,H-35)
 canvas.setFillColor(navy)
 canvas.setFont('Helvetica',8)
 canvas.drawString(44,H-25,'B4F HUB  /  SESSION 6')
 canvas.setFillColor(colors.HexColor('#63758A'))
 canvas.drawString(44,26,'Homework walkthrough')
 canvas.drawRightString(W-44,26,str(doc.page))
 canvas.restoreState()

doc=SimpleDocTemplate(str(output),pagesize=A4,rightMargin=44,leftMargin=44,topMargin=51,bottomMargin=45,title='Session 6 Homework Walkthrough',author='B4F Hub')
doc.build(story,onFirstPage=chrome,onLaterPages=chrome)
reader=PdfReader(output)
print(f'Created {output.resolve()} ({len(reader.pages)} pages)')
for n,page in enumerate(reader.pages):
 print(f'Page {n+1}: {len(page.extract_text())} text characters')

