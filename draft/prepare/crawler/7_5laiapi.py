import requests
from bs4 import BeautifulSoup
import simplejson
import json


def getHtmlText(url):
    try:
        args_str = {'page': 1, 'rows': 100, 'twpc.itemname': 'acid'}
        args_json = json.dumps(args_str, ensure_ascii=False)
        print("args_json:" + args_json)
        r = requests.post(url, data=args_str, timeout=30)
        # r = requests.get(url)
        print(r.status_code)
        # 如果状态码不是200 则应发HTTP Error异常
        r.raise_for_status()
        print("start:" + str(r.encoding))
        # 设置正确的编码方式
        r.encoding = r.apparent_encoding
        print("end:" + str(r.encoding))
        return r.text
    except:
        return "Something Wrong!"


def get_content(url):
    comments = []
    html = getHtmlText(url)
    print(html)
    decode = simplejson.JSONDecoder().decode(html)
    print(decode)
    print(type(decode))
    list = []
    for t in (decode['rows']):
        temp = str(t).encode("utf-8").decode("utf-8") + "\n"
        print(temp)
        list.append(temp)
    return list


def write_file(content, filepath):
    # set the encoding of the file
    with open(filepath, "a", encoding="utf-8") as f:
        for t in content:
            # f.write(json.dumps(t, ensure_ascii=False))
            f.write(t)


def crawler_main(url, filepath):
    content = get_content(url)
    write_file(content, filepath)


# 还有问题，需要修改
def read_item(filepath):
    itemlist = []
    with open(filepath, encoding="utf-8") as f:
        items = f.readlines()
        for item in items:
            print(item)
            print(type(item))
            temp = json.dumps(item.split())
            print(type(temp))
            # print(temp)
            items.append(temp)


# 按公司给出药品信息，包含公司信息，可使用rows,page参数获取更多数据
url = "http://www.5lai.com/bc/sells/sellitems!findBySE.action"
# 按药品名称给出顺序给出信息
url1 = "http://www.5lai.com/bc/sells/sellitems!finditemandspec.action"
crawler_main(url, "SEItem.json")
# crawler_main(url1, "item.json")

# read_item("E:\Workspace\Workspace_Python\KnownledgeGraph\draft\prepare\crawler\item.json")
