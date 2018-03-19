from selenium import webdriver
driver = webdriver.Chrome(
  desired_capabilities=webdriver.DesiredCapabilities.HTMLUNIT)
html=driver.get('http://www.5lai.com/bc/sells/107.html')
print(driver.page_source)
