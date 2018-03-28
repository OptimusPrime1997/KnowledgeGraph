# coding=utf-8

from stanfordcorenlp import StanfordCoreNLP
import os


def split_word(sourcepath, nlppath, distpath=None):
    nlp = StanfordCoreNLP(nlppath, lang='en')
    if sourcepath != None:
        with open(sourcepath, mode="r", encoding="utf-8") as f:
            lines = f.readlines()
        i = 1
        if distpath != None:
            for t in lines:
                print("write " + str(i) + " file")
                parts = t.split("||")
                temp = nlp.ner(parts[1])
                content = ""
                for m in temp:
                    content = content + (m[0] + "\t" + m[1]) + "\n"
                itemfile = distpath + str(i) + "_" + parts[0] + ".txt"
                # if os.path.exists(itemfile) == False:
                with open(itemfile, mode="w+", encoding="utf-8") as f:
                    f.write(content)
                i = i + 1


if __name__ == "__main__":
    nlppath = r'E:\Workspace\Workspace_Python\KnownledgeGraph\lib\stanford-corenlp'
    filepath = "../../../data/itemwiki.txt"
    dist = "../../../data/item/"
    split_word(filepath, nlppath, dist)