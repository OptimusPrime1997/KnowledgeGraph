# coding=utf-8
# 读取数据库的名词和响应的text，并打印存储
import traceback
import json
import pymysql
import requests
import simplejson
from bs4 import BeautifulSoup
import html2text
import re


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


def readTheText(filepath=None):
    db = connectdb()
    queryText = """select itemname,wikiText from itemtext order by itemname ASC;"""
    results = querydb(db, queryText)
    print("itemname,wikitext")
    content = ""
    for r in results:
        temp = re.sub("\*\*", "", r[1])
        content = content + r[0] + "||" + temp + "\n"
        print(r[0] + "||" + temp)
    if filepath != None:
        with open(filepath, mode="w", encoding="utf-8") as f:
            f.write(content)


if __name__ == "__main__":
    filepath = "../../data/itemwiki.txt"
    readTheText(filepath)
    # readTheText(None)
    # str="** Iotalamic acid **"
    # print(str)
    # str1=re.sub("\*","",str)
    # print(str1)
