import json
import os.path
import re
import string

import requests
from bs4 import BeautifulSoup
from PIL import Image

def get_month_span(fish):
    startmonth, endmonth = 0, 0
    for i in range(7, 18):
        if (fish[i-1] == '-' and fish[i] == '\u2713'):
            startmonth = i-5
        elif (fish[i-1] == '\u2713' and fish[i] == '-'):
            endmonth = i-6
    if not startmonth:
        startmonth = 1
    if not endmonth:
        endmonth = 12
    return startmonth, endmonth

URL = 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)'
page = requests.get(URL)
soup = BeautifulSoup(page.content, 'html.parser')

# NORTHERN HEMISPHERE FISHES
northern = soup.find('div', title='Northern Hemisphere').find('table').find('table')
nfish_table = northern.find_all('tr')
nfish_list = []

for fish in nfish_table:
    fishies = fish.find_all('td')
    current_fish = [fishie.text.strip() for fishie in fishies]
    if len(current_fish) > 0:
        nfish_list.append(current_fish)

    image = fish.find('img')
    if image and not os.path.isfile(os.getcwd() + '/src/images/' + string.capwords(current_fish[0]) + '.png'):
        image_url = image['data-src']
        img = Image.open(requests.get(image_url, stream=True).raw)
        img.save(os.getcwd() + '/src/images/' + re.sub('[^A-Za-z0-9 -]+', '', string.capwords(current_fish[0])) + '.png', 'PNG')

nedited_list = []
for fish in nfish_list:
    startmonth, endmonth = get_month_span(fish)
    nedited_list.append([string.capwords(fish[0]), fish[3], startmonth, endmonth, fish[4], fish[5]])

with open(os.getcwd() + '/src/fish_northern.json', 'w') as outfile:
    json.dump(nedited_list, outfile)


# SOUTHERN HEMISPHERE FISHES
southern = soup.find('div', title='Southern Hemisphere').find('table').find('table')
sfish_table = southern.find_all('tr')
sfish_list = []

for fish in sfish_table:
    fishies = fish.find_all('td')
    current_fish = [fishie.text.strip() for fishie in fishies]
    if len(current_fish) > 0:
        sfish_list.append(current_fish)

sedited_list = []
for fish in sfish_list:
    startmonth, endmonth = get_month_span(fish)
    sedited_list.append([string.capwords(fish[0]), fish[3], startmonth, endmonth, fish[4], fish[5]])

with open(os.getcwd() + '/src/fish_southern.json', 'w') as outfile:
    json.dump(sedited_list, outfile)
