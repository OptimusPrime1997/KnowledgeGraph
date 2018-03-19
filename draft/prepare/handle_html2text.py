# coding=utf-8

# Only allow <b>, <a>, <i>, <br>, and <p> tags
import html2text
import os
import re


def getImg(url, localpath, englishpath, chinesepath):
    htmlfile = open(url, 'rb')  # 以只读的方式打开本地html文件
    htmlpage = htmlfile.read()

    h = html2text.HTML2Text()

    # Ignore converting links from HTML
    h.ignore_links = True
    h.ignore_images = True
    h.single_line_break = True
    result1 = h.handle(str(htmlpage))
    # print("result1:\n" + str(result1))

    # delete \t \n
    result2 = result1.replace("\\n", "")
    result3 = result2.replace("\\t", "")

    # delete \xa0| ---| 1| M| special character
    result4 = re.sub("\\\[x][a-z][0-9][\\|]{0,1}|---[\\|]{0,1}|[0-9]{1,2}|[A-Z][\\|]|<|>|\\||\\*|\\#|\\+|_|&|\\[|\\]|\\(|\\)", " ", result3)
    # print("result4:\n" + result4)

    # get the correct dir_path
    dir_path = getPath(localpath, englishpath, chinesepath, result4)
    name_array = url.split("\\")
    source_file_name = name_array[len(name_array) - 1]
    source_file_name_part = source_file_name.split(".")
    filename = source_file_name_part[0]
    filepath = dir_path + "\\" + str(filename + ".txt")

    print(filepath)
    if os.path.exists(dir_path) == False:  # 判断，若该文件路径不存在，则创建该目录（mkdirs创建多级目录，midir创建单级目录
        os.makedirs(dir_path)

    content_array = result4.split("\n")
    result5 = ""
    i = 0
    for line in content_array:
        # delete the null line
        temp = str(line)
        if re.match(".*[A-Za-z0-9]+.*[A-Za-z0-9]+.*", temp):
            temp = re.sub("^\s*|\s*$", "", temp)
            result5 = result5 + filename + "_" + str(i) + " " + temp + "\n"
            i = i + 1
    print("result5:\n" + result5)

    with open(filepath, "a") as f:
        f.write(result5)
    # with open(filepath, "w+") as f1:
    #     content=f1.read()
    #     print("read result:\n"+str(content))

    htmlfile.close()
    return None


def getPath(localpath, englishpath, chinesepath, content):
    mypath = ""
    if re.match("[\u4e00-\u9fa5]+", content):
        mypath = chinesepath
    else:
        mypath = englishpath
    filepath = localpath + "\\" + mypath
    return filepath

def handle_main(sourcepath,destinationpath,englishpath,chinesepath):
    paths=os.listdir(sourcepath)
    for name in paths:
        # print(name)
        url=sourcepath+"\\"+name
        getImg(url,destinationpath,"english","chinese")

url = r'D:\Bachelor\GraduateDesign\KnowledgeGraph\bfw\code\html_data\4.html'
sourcepath=r'D:\Bachelor\GraduateDesign\KnowledgeGraph\bfw\code\html_data'
destinationpath = r'D:\Bachelor\GraduateDesign\KnowledgeGraph\bfw\code\test'
# getImg(url, destinationpath, "english", "chinese")
handle_main( r'D:\Bachelor\GraduateDesign\KnowledgeGraph\bfw\code\html_data',destinationpath,"english","chinese")