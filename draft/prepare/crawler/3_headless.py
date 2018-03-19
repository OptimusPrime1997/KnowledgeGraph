#!/usr/bin/evn python
# coding=utf8
'''
python 页面截图
'''

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

WINDOW_SIZE = "1920,1080"  # 窗体大小
CHROME_PATH = r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"  # chrome 路径
CHROMEDRIVER_PATH = r"G:\Program Files (x86)\ChromeDriver\chromedriver.exe" # driver 路径

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)
chrome_options.binary_location = CHROME_PATH

'''
生成快照
'''
def take_shot(url, path="screenshot.png"):
    chrome_driver = webdriver.Chrome(
        executable_path=CHROMEDRIVER_PATH,
        chrome_options=chrome_options
    )

    chrome_driver.get(url)
    chrome_driver.save_screenshot(path)  # 保存快照
    # print(chrome_driver.current_url)  # 当前 url
    chrome_driver.close()


'''
主函数
'''
if __name__ == '__main__':
    take_shot("http://www.baidu.com", path="screenshot.png")