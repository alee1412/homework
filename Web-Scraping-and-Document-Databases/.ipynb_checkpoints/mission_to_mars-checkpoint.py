
# coding: utf-8

# In[1]:


import os
from bs4 import BeautifulSoup as bs
import requests
import pymongo
from splinter import Browser
import time
import pandas as pd


# # Mars Headline

# In[2]:


chrome_driver = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **chrome_driver, headless=False)


# In[3]:


nasa_url = 'https://mars.nasa.gov/news'
browser.visit(nasa_url)


# In[4]:


html = browser.html
soup = bs(html, 'html.parser')


# In[5]:


news_title = soup.find('div', class_="bottom_gradient").text
news_p = soup.find('div', class_="article_teaser_body").text


# In[6]:


news_title


# In[7]:


news_p


# # JPL Image

# In[49]:


chrome_driver = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **chrome_driver, headless=False)


# In[50]:


jpl_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
browser.visit(jpl_url)


# In[51]:


browser.click_link_by_partial_text('FULL IMAGE')


# In[52]:


browser.click_link_by_partial_text('more info')


# In[12]:


image_html = browser.html
image_soup = bs(image_html, 'html.parser')


# In[13]:


image_path = image_soup.find('figure', class_="lede").a['href']
feautured_image_url = "https://www.jpl.nasa.gov" + image_path


# In[14]:


feautured_image_url


# # Mars Weather

# In[15]:


chrome_driver = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **chrome_driver, headless=False)


# In[16]:


weather_url = "https://twitter.com/marswxreport?lang=en"
browser.visit(weather_url)


# In[17]:


weather_html = browser.html
weather_soup = bs(weather_html, 'html.parser')


# In[18]:


mars_weather = weather_soup.find('p', class_="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text").text


# In[19]:


mars_weather


# # Mars Facts

# In[20]:


chrome_driver = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **chrome_driver, headless=False)


# In[21]:


facts_url = "https://space-facts.com/mars/"
browser.visit(facts_url)


# In[22]:


facts_html = browser.html
facts_soup = bs(facts_html, 'html.parser')


# In[23]:


fact_table = facts_soup.find('table', class_="tablepress tablepress-id-mars")


# In[24]:


fact_table


# In[25]:


table = fact_table.find_all('tr')

labels = []
values = []

for tr in table:
    td_elements = tr.find_all('td')
    labels.append(td_elements[0].text)
    values.append(td_elements[1].text)


# In[26]:


table_df = pd.DataFrame({"Label": labels,
                        "Values": values})


# In[27]:


table_df


# In[28]:


table_html = table_df.to_html(header=False, index=False)
table_html


# # Mars Hemispheres

# In[44]:


chrome_driver = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **chrome_driver, headless=False)


# In[45]:


usgs_url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
browser.visit(usgs_url)


# In[46]:


usgs_html = browser.html
usgs_soup = bs(usgs_html, "html.parser")


# In[47]:


overall_div = usgs_soup.find('div', class_="collapsible results")
hemispheres = overall_div.find_all('div', class_="description")

hemisphere_urls = []

for a in hemispheres:
    
    title = a.h3.text
    link = "https://astrogeology.usgs.gov" + a.a['href']
    
    browser.visit(link)
    
    images_html = browser.html
    images_soup = bs(images_html, "html.parser")
    images_link = images_soup.find('div', class_='downloads').find('li').a['href']
    
    image_dict = {}
    image_dict['title'] = title
    image_dict['img_url'] = images_link
    
    hemisphere_urls.append(image_dict)
    
    print(hemisphere_urls)

hemisphere_urls