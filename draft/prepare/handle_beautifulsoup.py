# coding=utf-8

import urllib
from bs4 import BeautifulSoup
import os
import locale
import sys
import html2text

test_str = "中文"
print(test_str)
print(sys.getdefaultencoding())
print(locale.getpreferredencoding())


def getImg(url, localpath):
    htmlfile = open(url, 'rb')  # 以只读的方式打开本地html文件
    htmlpage = htmlfile.read()
    # using html2text to convert html to text
    raw_text=html2text.html2text(str(htmlpage))
    print("html2text:"+ raw_text)

    filter_text=raw_text

    soup = BeautifulSoup(htmlpage, "html.parser")  # 实例化一个BeautifulSoup对象
    print("title string:" + soup.title.string)  # 打印该html的标题
    # soup 的 get_text方法的不能去掉注释，不如html2text好用
    print("soup content:"+str(soup.get_text))

    # filepath = os.path.join(localpath, soup.title.string)  # 连接目录与文件名或目录（目录，文件夹名或目录），此处以html标题命名文件夹名字
    # if os.path.exists(filepath) == False:  # 判断，若该文件路径不存在，则创建该目录（mkdirs创建多级目录，midir创建单级目录）
    #     os.makedirs(filepath)
    # cctag = soup.find_all('img', attrs={'class': 'BDE_Image'})  # 查找所有标签值为img，属性class为BDE_Image的数据，返回一个集合list
    # for i in cctag:
    #     print(i.attrs['src'])
    #     urllib.urlretrieve(i.attrs['src'], os.path.join(filepath, '%s' % i.attrs['src'].split('/')[
    #         -1]))  # 保存下载每一组数据属性为src的内容（网页地址）到本地，名字为原图片名称：http://imgsrc.baidu.com/forum/w%3D580/sign=5b3aec8704f3d7ca0cf63f7ec21ebe3c/ad13728b4710b9120be45d47cbfdfc0392452260.jpg
    htmlfile.close()
    return None


url = r'D:\Bachelor\GraduateDesign\KnowledgeGraph\bfw\code\html_data\4.html'
localPath = r'D:\Bachelor\GraduateDesign\KnowledgeGraph\bfw\code\image'
getImg(url, localPath)
