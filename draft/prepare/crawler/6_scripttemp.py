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
# script = "$(function(){	getInfo(1,15);	getNow();addEvent();	var syslog={code:'a02000000',isczc:false,des:'我来商城'}	postsyslog(syslog);})};"
script="getInfo(1,1000);"

d.command_executor._commands['executePhantomScript'] = ('GET', '/session/$sessionId/chrome/execute')
d.execute('executePhantomScript', {'script': script, 'args': []})

d.get("http://www.5lai.com/bc/sells/107.html")
print(d.page_source)
print(d.get_log('browser'))
d.quit()
