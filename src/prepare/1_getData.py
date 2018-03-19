import requests
from bs4 import BeautifulSoup
import simplejson
import json


def getHtmlText(url, page, rows, itemname):
    try:
        args_str = {'page': page, 'rows': rows, 'twpc.itemname': itemname}
        args_json = json.dumps(args_str, ensure_ascii=False)
        print("args_json:" + args_json)
        r = requests.post(url, data=args_str, timeout=30)

        print(r.status_code)
        # 如果状态码不是200 则应发HTTP Error异常
        r.raise_for_status()
        print("start:" + str(r.encoding))
        # 设置正确的编码方式
        r.encoding = r.apparent_encoding
        print("end:" + str(r.encoding))
        decode = simplejson.JSONDecoder().decode(r.text)
        rows = decode['rows']
        for t in rows:
            print(t['itemname'])
        return decode
    except:
        return "Something Wrong!"


def write_file(content, filepath):
    # set the encoding of the file
    with open(filepath, "a", encoding="utf-8") as f:
        for t in content:
            # f.write(json.dumps(t, ensure_ascii=False))
            f.write(t)


# 按公司给出药品信息，包含公司信息，可使用rows,page参数获取更多数据
url = "http://www.5lai.com/bc/sells/sellitems!findBySE.action"
# 按药品名称给出顺序给出信息
url1 = "http://www.5lai.com/bc/sells/sellitems!finditemandspec.action"
# 第一页，20个数据，搜索"acid"
getHtmlText(url, 1, 20, "acid")
# crawler_main(url1, "item.json")

# read_item("E:\Workspace\Workspace_Python\KnownledgeGraph\draft\prepare\crawler\item.json")
