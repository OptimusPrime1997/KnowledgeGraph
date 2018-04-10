# coding=utf-8

from stanfordcorenlp import StanfordCoreNLP
import os
import re


def split_word(sourcepath, nlppath, distpath=None, startNum=1):
    nlp = StanfordCoreNLP(nlppath, lang='en')
    if sourcepath != None:
        with open(sourcepath, mode="r", encoding="utf-8") as f:
            lines = f.readlines()
        i = startNum
        if distpath != None:
            for t in lines:
                print("write " + str(i) + " file")
                parts = t.split("||")
                parts[1] = re.sub("\*", "", parts[1])
                parts[1] = re.sub("\_", "", parts[1])
                parts[1] = re.sub("\-", "", parts[1])
                temp = nlp.ner(parts[1])
                content = ""
                for m in temp:
                    content = content + (m[0] + "\t" + m[1]) + "\n"
                itemfile = distpath + str(i) + "_" + parts[0] + ".txt"
                # if os.path.exists(itemfile) == False:
                with open(itemfile, mode="w+", encoding="utf-8") as f:
                    f.write(content)
                i = i + 1


# //药品
# protein //蛋白质 药品
# sugar //糖 药品
# alcohol //酒精 药品
# liquid //液体 药品
# salt //盐 药品
#
# //工具
# fragment //粉碎 工具
# separation //分离 工具
# tube //试管 工具
# detection //监测 工具
# oxygen //氧气 工具
if __name__ == "__main__":
    nlppath = r'E:\Workspace\Workspace_Python\KnownledgeGraph\lib\stanford-corenlp'
    # itemnames = {101: "protein", 121: "sugar", 141: "alcohol", 161: "liquid", 181: "salt",
    #              201: "fragment", 221: "tube", 241: "protein", 261: "detection", 281: "oxygen"}
    itemnames = {101: "protein", 105: "alcohol",
                 108: "fragment"}
    filedir = "../../data/"
    dist = "../../data/item/"
    for k, v in itemnames.items():
        filepath = filedir + v + ".txt"
        print("k:" + str(k) + "   v:" + v + " filepath:" + filepath)
        split_word(filepath, nlppath, dist, k)
