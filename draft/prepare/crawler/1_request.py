# coding=utf-8
import requests
from bs4 import BeautifulSoup

def getHtmlText(url):
    try:
        r = requests.get(url, timeout=30)
        print(r.status_code)
        # 如果状态码不是200 则应发HTTOError异常
        r.raise_for_status()
        print("start:" + str(r.encoding))
        # 设置正确的编码方式
        r.encoding = r.apparent_encoding
        print("end:"+str(r.encoding))
        return r.text
    except:
        return "Something Wrong!"
def get_content(url):
    comments=[]
    html=getHtmlText(url)
    soup=BeautifulSoup(html,"lxml")
    a_tag=soup.find_all('a')
    for a in a_tag:
        print(a)


url="http://www.5lai.com/bc/sells/107.html"
get_content(url)