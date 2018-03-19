# coding=utf-8
# draft 9_wikitextclawer
import requests
import simplejson
import html2text
from bs4 import BeautifulSoup
import html2text
import re


def get_Wiki_Text(itemname):
    item_search = itemname.lower()
    item_search1 = item_search.replace(" ", "_")
    url = "https://en.wikipedia.org/wiki/" + item_search
    r = requests.get(url)
    print(r.status_code)
    # 如果状态码不是200 则应发HTTP Error异常
    r.raise_for_status()
    print("start:" + str(r.encoding))
    # 设置正确的编码方式
    r.encoding = r.apparent_encoding
    print("end:" + str(r.encoding))

    return r.text


def beatifulsoup_handle(content):
    soup = BeautifulSoup(content, "html.parser")  # 实例化一个BeautifulSoup对象
    print("title string:" + soup.title.string)  # 打印该html的标题
    # soup 的 get_text方法的不能去掉注释，不如html2text好用
    # print("soup content:" + str(soup.get_text))
    h = html2text.HTML2Text()

    # Ignore converting links from HTML
    h.ignore_links = True
    h.ignore_images = True
    h.single_line_break = True
    cctag = soup.find_all("p")
    list = []
    for t in cctag:
        temp = (h.handle(str(t)))
        temp1 = re.sub("\n", "", temp)
        print(temp1)
        list.append(temp1)
    return list


def write_file(list, filepath):
    content = ""
    for t in list:
        content = content + t + "\n"
    with open(filepath, mode="a", encoding="utf-8") as f:
        f.write(content)


def wikitextclawer_main(itemname, filepath):
    html = get_Wiki_Text(itemname)
    list = beatifulsoup_handle(html)
    write_file(list, filepath)


wikitextclawer_main("Arachidonic acid", "../../data/wikitext.text")
