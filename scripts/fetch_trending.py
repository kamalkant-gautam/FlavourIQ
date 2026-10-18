import json,re,urllib.request,xml.etree.ElementTree as ET
from html import unescape
SRC=[("Givaudan","https://www.givaudan.com",["https://www.givaudan.com/rss"]),
("ET HospitalityWorld","https://hospitality.economictimes.indiatimes.com",["https://hospitality.economictimes.indiatimes.com/rss/topstories"]),
("Hotelier India","https://www.hotelierindia.com",["https://www.hotelierindia.com/feed"])]
H={"User-Agent":"Mozilla/5.0 (FlavourIQ trending bot)"}
def get(u):return urllib.request.urlopen(urllib.request.Request(u,headers=H),timeout=25).read().decode("utf-8","ignore")
def og(u):
    try:
        t=get(u);m=re.search(r'property=["\']og:image["\'][^>]*content=["\']([^"\']+)',t) or re.search(r'content=["\']([^"\']+)["\'][^>]*property=["\']og:image',t)
        return unescape(m.group(1)) if m else ""
    except Exception:return ""
def find_feeds(home):
    try:return [re.sub('&amp;','&',x) for x in re.findall(r'type=["\']application/(?:rss|atom)\+xml["\'][^>]*href=["\']([^"\']+)',get(home))]
    except Exception:return []
out=[]
for name,home,feeds in SRC:
    item=None
    for f in feeds+find_feeds(home):
        try:
            r=ET.fromstring(get(f));it=r.find(".//item")
            if it is None:continue
            link=(it.findtext("link") or "").strip();img=""
            for e in it:
                if e.tag.endswith("content") or e.tag.endswith("thumbnail") or e.tag=="enclosure":
                    img=e.get("url") or "";break
            if not img:
                m=re.search(r'<img[^>]+src=["\']([^"\']+)',unescape(ET.tostring(it,encoding="unicode")))
                img=m.group(1) if m else og(link)
            item={"source":name,"home":home,"title":unescape((it.findtext("title") or "").strip()),"link":link,"image":img,"date":(it.findtext("pubDate") or "")[:16]};break
        except Exception:continue
    out.append(item or {"source":name,"home":home,"title":"","link":home,"image":"","date":""})
json.dump(out,open("data/trending.json","w"),indent=1,ensure_ascii=False)
