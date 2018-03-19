'''
使用Selenium模拟浏览器
抓取www.5lai.com
'''

# 导入selenium模块中的web引擎
from selenium import webdriver
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

WINDOW_SIZE = "1920,1080"  # 窗体大小
CHROME_PATH = r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"  # chrome 路径
CHROMEDRIVER_PATH = r"G:\Program Files (x86)\ChromeDriver\chromedriver.exe"  # driver 路径

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)
chrome_options.binary_location = CHROME_PATH

service_args = []
service_args.append('--load-images=no')  ##关闭图片加载
service_args.append('--disk-cache=yes')  ##开启缓存
service_args.append('--ignore-ssl-errors=true')  ##忽略https错误

# 建立浏览器对象 ，通过Phantomjs

# args={
# 'Accept':'text/css,*/*;q=0.1',
# Accept-Encoding:gzip, deflate
# Accept-Language:en,zh-CN;q=0.9,zh;q=0.8,zh-TW;q=0.7
# Cache-Control:no-cache
# Connection:keep-alive
# Host:www.5lai.com
# Pragma:no-cache
# Referer:http://www.5lai.com/bc/sells/107.html
# User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36
options = webdriver.ChromeOptions()
# 设置中文
options.add_argument('lang=zh_CN.UTF-8')
# 更换头部
options.add_argument(
    'user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36"')
browser = webdriver.Chrome(chrome_options=options, service_args=service_args)
# 设置访问的url
url = 'http://www.5lai.com'

# 访问url
browser.get(url)


# 等待一定时间，让js脚本加载完毕
browser.implicitly_wait(3)
label = browser.find_element_by_xpath("/html/body/div[2]/div/div[2]/ul/li[4]/a")
label.click()

browser.implicitly_wait(3)
browser.execute_script("getInfo(1,1000);")
browser.implicitly_wait(10)
print(browser.page_source)

# 找到搜索框
# bs-in wid152 mr30
# browser.find_elements_by_xpath()
text = browser.find_element_by_xpath(".//*[@id='search']/input[1]")

if text:
    # 清空搜索框的文字
    text.clear()

    # 填写搜索框的文字
    text.send_keys('acid')

# 找到submit按钮
button = browser.find_element_by_id('searchBtn')

# 点击按钮 提交搜索请求
if button:
    print(button.id)
    # pass
else:
    print("get searchBtn element error!")

browser.implicitly_wait(3)

# 查看当前浏览器标题
print(browser.title)

# 以截图的方式查看浏览器的页面
browser.save_screenshot('text.png')

# wid01 t-a-l icon icon_fk textG
# 找到结果 结果保存为列表变量
results = browser.find_elements_by_xpath(".//*[@class='wid01 t-a-l icon icon_fk textG']")

# 循环遍历找出每个结果的标题和url
for result in results:
    # print('标题：{} 超链接：{}'.format(result.text,
    #                             result.find_element_by_tag_name('a').get_attribute('href')))
    print(result)
    print(result.tag_name)
    if result.get_attribute("text"):
        print(result.text)
    else:
        print("no text attribute")

    # if result.get_attribute("title"):
    #     print(result.title)
    # else:
    #     print("no title attribute")

    if result.get_attribute("class"):
        print(result.__class__)
    else:
        print("no class attribute")


        # trs = browser.find_elements_by_tag_name('a')
        #
        # for tri in trs:
        #     if tri.get_attribute("text"):
        #         for trj in tri.text.split(" "):
        #             print(trj)
        #     else:
        #         print("tri has no text attribute")
        #
        # drs = browser.find_elements_by_tag_name('div')
        # for dri in drs:
        #     if dri.get_attribute("text"):
        #         for drj in dri.text.split(" "):
        #             print(drj)
        #     else:
        #         print("dri has no text attribute")
        #
        #
        #
        # drs = browser.find_elements_by_tag_name('span')
        # for dri in drs:
        #     if dri.get_attribute("text"):
        #         for drj in dri.text.split(" "):
        #             print(drj)
        #     else:
        #         print("sri has no text attribute")
