#!/usr/bin/env python
# coding=utf-8
import traceback
import json
import pymysql
import requests
import simplejson
from bs4 import BeautifulSoup
import html2text
import re


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


def connectdb():
    print('连接到mysql服务器...')
    # 打开数据库连接
    # 用户名:hp, 密码:Hp12345.,用户名和密码需要改成你自己的mysql用户名和密码，并且要创建数据库TESTDB，并在TESTDB数据库中创建好表Student
    db = pymysql.connect("115.159.151.156", "root", "123456", "knowledge", charset="utf8")
    conn = db.cursor()
    conn.execute("SET NAMES utf8")
    print('connect remote server sccussed!')
    return db


def querydb(db, sql):
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for row in results:
            for i in range(len(row)):
                print(row[i])
            print(" ")
            # print("itemname: %s, id: %s" % (row[0], row[1]))
        return results
    except Exception as e:
        print('str(Exception):\t', str(Exception))
        print('str(e):\t\t', str(e))
        print('repr(e):\t', repr(e))
        print('e.message:\t', e.message)
        print('traceback.print_exc():' + traceback.print_exc())
        print('traceback.format_exc():\n%s' % traceback.format_exc())
        # 发生错误时回滚
        db.rollback()


def excuteOrUpdate(db, sql):
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    # SQL 删除语句
    # sql = "DELETE FROM Student WHERE Grade = '%d'" % (100)

    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 提交修改
        db.commit()
        print("execute suceess!")
    except Exception as e:
        print('str(Exception):\t', str(Exception))
        print('str(e):\t\t', str(e))
        print('repr(e):\t', repr(e))
        print('e.message:\t', e.message)
        print('traceback.print_exc():' + traceback.print_exc())
        print('traceback.format_exc():\n%s' % traceback.format_exc())
        # 发生错误时回滚
        db.rollback()


# INSERT INTO sellitem(brand,  catalogidtree, catalognametree, catnum,  companyid, companyname, id, itemname, itemsid, kindid, kindtype, price, spec) VALUES ('Chrono-Log Corporation','-1/1/13568','试剂/分子生物学试剂','P/N 390','8ab3e0165e2712f2015e50c765170959','安诺伦（北京）生物科技有限公司','8ab3e0166217cb4701623c26a8db0cc0','Arachidonic Acid','8ab3e0166217cb4701623c26a8db0cbf','cbbbe26ceb444c04b2a4da3cfa20efa7',0,3165.0,'盒');", 195, 197, 'ordinal not in range(256)')

def closedb(db):
    db.close()


def insertdata(data):
    sql = """INSERT INTO sellitem(brand,  catalogidtree, catalognametree, catnum,  companyid, companyname, id, itemname, kindid, kindtype, price, spec) VALUES """
    i = 0
    for item in data['rows']:
        # print(item['companyid'])
        sql = sql + "(\"" + item['brand'] + "\",\"" + item['catalogidtree'] + "\",\"" + item[
            'catalognametree'] + "\",\"" + item['catnum'] + "\",\"" \
              + item['companyid'] + "\",\"" + item['companyname'] + "\",\"" + item['id'] + "\",\"" \
              + item['itemname'] + "\",\"" + item['kindid'] + "\"," \
              + str(item['kindtype']) + "," + str(item['price']) + ",\"" + item['spec'] + "\")"
        if i == (len(data['rows']) - 1):
            sql = sql + "  ON DUPLICATE KEY UPDATE `id`=concat(`id`,'_dup');"
        else:
            sql = sql + ","

        i = i + 1
        print("handle " + str(i) + " data!")
    print(sql)
    db = connectdb()  # 连接MySQL数据库
    # 使用cursor()方法获取操作游标
    excuteOrUpdate(db, sql)
    closedb(db)  # 关闭数据库


def get_Wiki_url(itemname):
    item_search = itemname.lower()
    item_search1 = item_search.replace(" ", "_")
    url = "https://en.wikipedia.org/wiki/" + item_search
    r = requests.get(url)
    if r.status_code == 200:
        return url
    else:
        return None


def fetchdata():
    queryitemname = """select distinct(itemname),id from sellitem where itemname REGEXP '^[a-zA-Z\ ]+$'"""
    db = connectdb()  # 连接MySQL数据库
    results = querydb(db, queryitemname)
    print(type(results))
    print(results)
    hasWikiList = []
    print("get data size:" + str(len(results)))
    i = 0
    with open("itemname.txt", "a") as f:
        for t in results:
            if get_Wiki_url(t[0]) != None:
                hasWikiList.append(t)
                print(t[0])
                updateSql = "update sellitem set hasWiki=1 where id=\"" + t[1] + "\";"
                print(str(t[0]) + "   " + updateSql)
                excuteOrUpdate(db, updateSql)
                i = i + 1
                print("This is the " + str(i) + " wiki item")
                f.write(t[0] + "\n")
    print("hasWikiList lenth:" + str(len(hasWikiList)))

    closedb(db)  # 关闭数据库


def wikitextclawer_main(itemname, filepath=None):
    html = get_Wiki_Text(itemname)
    list = beatifulsoup_handle(html)
    content = write_file(list, filepath)
    return content


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
            # print(str(i) + ":" + temp1)
            list.append(temp1)
            i = i + 1
        else:
            pass
            # print("pass:" + str(temp1))
    return list


def write_file(list, filepath=None):
    content = ""
    for t in list:
        content = content + t + "\n"
    if filepath != None:
        with open(filepath, mode="a", encoding="utf-8") as f:
            f.write(content)
    return content


def saveWikiText():
    queryitemname = """select distinct(itemname) from sellitem  where hasWiki=1 order by  itemname ASC;"""
    db = connectdb()  # 连接MySQL数据库
    results = querydb(db, queryitemname)
    print(str(len(results)) + ":")
    print(results)
    ltexts = []

    for r in results:
        texts = []
        content = wikitextclawer_main(r[0])
        content1 = re.sub("\"", "\'", content)
        chooseText = getLongestText(content1)
        texts.append(r[0])
        texts.append(chooseText)
        texts.append(content1)
        insertSql = """insert into itemtext(itemname,wikitext,chooseText) values """
        insertSql = insertSql + "(\"" + texts[0] + "\",\"" + texts[1] + "\",\"" + texts[2] + "\")"
        print(insertSql)
        excuteOrUpdate(db, insertSql)
        ltexts.append(texts)
        print("ltexts length:" + str(len(ltexts)))


    # j = 0
    #
    # for t in ltexts:
    #     print("itemname:"+t[0])
    #     insertSql = insertSql + "(\"" + t[0] + "\",\"" + t[1] + "\",\"" + t[2] + "\")"
    #     if (j == (len(ltexts) - 1)):
    #         insertSql = insertSql + ";"
    #     else:
    #         insertSql = insertSql + ","
    #     j = j + 1
    # print(insertSql)
    # excuteOrUpdate(db, insertSql)
    # print("insert wiki text success")
    closedb(db)  # 关闭数据库


def getLongestText(ltext):
    text_list = ltext.split("\n")
    max = -1
    i = 0;
    chooseText = ""
    for text in text_list:
        if (max < len(text)):
            max = len(text)
            off = i
            chooseText = text
        i = i + 1
    return chooseText


def main():
    # 按公司给出药品信息，包含公司信息，可使用rows,page参数获取更多数据
    url = "http://www.5lai.com/bc/sells/sellitems!findBySE.action"
    # 按药品名称给出顺序给出信息
    url1 = "http://www.5lai.com/bc/sells/sellitems!finditemandspec.action"
    # 第一页，20个数据，搜索"acid",1054data
    # data = getHtmlText(url, 1, 10000, "acid")
    # 282data
    # data = getHtmlText(url, 1, 10000, "canine")

    data = getHtmlText(url, 1, 10000, "anti")
    insertdata(data)


if __name__ == '__main__':
    # main()
    # set the wiki item name hasWiki is 1
    # fetchdata()
    # get wiki text and save to database
    saveWikiText()