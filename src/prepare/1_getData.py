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
print(getHtmlText(url, 1, 2, "acid"))
# crawler_main(url1, "item.json")

# read_item("E:\Workspace\Workspace_Python\KnownledgeGraph\draft\prepare\crawler\item.json")
# {'brand': 'Chrono-Log Corporation', 'brand2': '', 'catalogidtree': '-1/1/13568', 'catalognametree': '试剂/分子生物学试剂', 'catnum': 'P/N 390', 'catnum2': '', 'clickcounts': 0, 'commoditycode': '', 'companyid': '8ab3e0165e2712f2015e50c765170959', 'companyname': '安诺伦（北京）生物科技有限公司', 'id': '8ab3e0166217cb4701623c26a8db0cc0', 'itemname': 'Arachidonic Acid', 'itemsid': '8ab3e0166217cb4701623c26a8db0cbf', 'kindid': 'cbbbe26ceb444c04b2a4da3cfa20efa7', 'kindtype': 0, 'packing': '', 'price': 3165.0, 'sellcounts': 0, 'shopcounts': 0, 'spec': '盒', 'status': '1', 'tprice': '', 'updatetime': 0, 'visible': '1', 'wlqz': 0},
# {'brand': 'MCE', 'brand2': '', 'catalogidtree': '-1/1/13550', 'catalognametree': '试剂/其他试剂', 'catnum': 'HY-B0711', 'catnum2': '', 'clickcounts': 0, 'commoditycode': '', 'companyid': '8ab3e0165dd0bc95015ddf6548e6012f', 'companyname': '上海皓元生物医药科技有限公司', 'id': '8ab3e01660b6b5440160bb56a8e30404', 'itemname': 'Carglumic Acid', 'itemsid': '8ab3e01660b6b5440160bb56a8e30403', 'kindid': '8b5a76d1-f02a-11e7-8245-00163e0632a6', 'kindtype': 0, 'packing': '', 'price': 550.0, 'sellcounts': 0, 'shopcounts': 0, 'spec': '10mM/1mL', 'status': '1', 'tprice': '', 'updatetime': 0, 'visible': '1', 'wlqz': 0}], 'rows2': '', 'rows3': '', 'total': 1402}
# {'brand': 'MCE',  'catalogidtree': '-1/1/13550', 'catalognametree': '试剂/其他试剂', 'catnum': 'HY-B0711',  'companyid': '8ab3e0165dd0bc95015ddf6548e6012f', 'companyname': '上海皓元生物医药科技有限公司', 'id': '8ab3e01660b6b5440160bb56a8e30404', 'itemname': 'Carglumic Acid', 'itemsid': '8ab3e01660b6b5440160bb56a8e30403', 'kindid': '8b5a76d1-f02a-11e7-8245-00163e0632a6', 'kindtype': 0,  'price': 550.0,   'spec': '10mM/1mL' }]