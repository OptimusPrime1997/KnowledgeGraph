# coding=utf-8
# 从wiki上爬取对应名词的text
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
    i = 0
    for t in cctag:
        temp = (h.handle(str(t)))
        # 依次为除去空行，除去[]引用标记，除去（）内容
        temp1 = re.sub("\n|\[[0-9]+\]|\([0-9A-Za-z\ ,-_*\/]+\)", "", temp)

        if re.match(".*[A-Za-z0-9,\ ]+.*", temp1):
            print(str(i) + ":" + temp1)
            list.append(temp1)
            i = i + 1
        else:
            pass
            print("pass:" + str(temp1))
    return list


def write_file(list, filepath):
    content = ""
    for t in list:
        content = content + t + "\n"
    with open(filepath, mode="a", encoding="utf-8") as f:
        f.write(content)
    return content

def wikitextclawer_main(itemname, filepath):
    html = get_Wiki_Text(itemname)
    list = beatifulsoup_handle(html)
    write_file(list, filepath)


wikitextclawer_main("Arachidonic acid", "../../data/wikitext.text")

# {"brand":"Chrono-Log Corporation","brand2":"","catalogidtree":"-1\/1\/13568","catalognametree":"试剂\/分子生物学试剂",
# "catnum":"P\/N 390","catnum2":"","clickcounts":0,"commoditycode":"","companyid":"8ab3e0165e2712f2015e50c765170959",
# "companyname":"安诺伦（北京）生物科技有限公司","id":"8ab3e0166217cb4701623c26a8db0cc0","itemname":"Arachidonic Acid",
# "itemsid":"8ab3e0166217cb4701623c26a8db0cbf","kindid":"cbbbe26ceb444c04b2a4da3cfa20efa7","kindtype":0,"packing":"",
# "price":3165.0,"sellcounts":0,"shopcounts":0,"spec":"盒","status":"1","tprice":"","updatetime":0,"visible":"1","wlqz":0}
