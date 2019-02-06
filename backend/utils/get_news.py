import requests
from bs4 import BeautifulSoup as soup

def get_news_from_keywords(keywords):
  url = "https://news.google.com/rss/search?q=" + "+".join(keywords)
  data = requests.get(url).content

  parsed = soup(data, "lxml")
  news_list=parsed.findAll("item")

  news_text_list = []

  for news in news_list[:10]:
    news_text_list.append(news.title.text)
  
  return news_text_list