# coding=utf-8
import requests
import simplejson


# https://www.wikidata.org/w/api.php?action=wbsearchentities&search=Carglumic%20acid&format=json&language=en&uselang=en&type=item
def get_relation_url(itemname):
    # 中间包括将空格转换成%20
    temp=itemname.lower()
    temp1=temp.replace(" ","%20")
    url = "https://www.wikidata.org/w/api.php?action=wbsearchentities&search=" + temp1 + "&format=json&language=en&uselang=en&type=item"
    print(url)
    return url


def get_Wiki_RelationInfo(url, itemname):
    r = requests.get(url)
    print(r.status_code)
    # 如果状态码不是200 则应发HTTP Error异常
    r.raise_for_status()
    print("start:" + str(r.encoding))
    # 设置正确的编码方式
    r.encoding = r.apparent_encoding
    print("end:" + str(r.encoding))
    text = simplejson.JSONDecoder().decode(r.text)
    print(text)
    item_split=itemname.lower()
    items = text['search']
    count=-1
    for t in range(len(items)):
        print(items[t]["label"])
        if(item_split==items[t]["label"]):
            count=t
            print(items[t])
            return items[t]
    if count==-1:
        print("get relation failed")
    return None


def wikiclawer_main(itemname):
    url = get_relation_url(itemname)
    get_Wiki_RelationInfo(url, itemname)


wikiclawer_main("Arachidonic acid")
