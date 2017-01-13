var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    chrome = require('selenium-webdriver/chrome')
    path = require('chromedriver').path;

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();



driver.navigate().to('localhost:4000')
  .then(()=> {
    driver.findElement(By.id('email')).click();
  })
  .then(() => {
    driver.findElement(By.id('email')).sendKeys('poopoo');
  })
  .then(()=> {
    driver.sleep(2000);
    driver.findElement(By.id('password')).click();
  })
  .then(()=> {
    driver.findElement(By.id('password')).sendKeys('lmao');
  })
  .then(() => {
    driver.sleep(2000);
    driver.findElement(By.id('loginButton')).click();  
  });
