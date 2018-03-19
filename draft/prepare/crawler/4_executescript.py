from selenium import webdriver
import requests

r = requests.session()

service_args = []
service_args.append('--load-images=no')  ##关闭图片加载
service_args.append('--disk-cache=yes')  ##开启缓存
service_args.append('--ignore-ssl-errors=true')  ##忽略https错误

d = webdriver.Chrome(service_args=service_args)

data = {
}

result = r.get("http://www.5lai.com/bc/sells/107.html", data=data)
cookies = r.cookies.get_dict()
# for i in cookies:
#     d.add_cookie({
#         'name': i,
#         'value': cookies[i],
#         'path': '/',
#         'domain': 'www.5lai.com'
#     })
script = "var page=this;page.onResourceRequested = function (request){getInfo(1,1000);};"
d.command_executor._commands['executePhantomScript'] = ('POST', '/session/$sessionId/phantom/execute')
d.execute('executePhantomScript', {'script': script, 'args': []})

d.get("http://www.5lai.com/bc/sells/107.html")
print(d.page_source)
print(d.get_log('browser'))
d.quit()
