import requests
import re
from bs4 import BeautifulSoup
from tabulate import tabulate
import csv


'''
https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vSikUBz6JktxRGQjv1jKY5wdjPXjeEDfZnBpT-nj0Lu5s-5wbsvgtVx5NfJ3DY8AAZhM61nCoj6dU86/pubhtml
https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vSdGASUebi58An7miyVP-3_QQmf9Y_X76nAzIDbMkKxTliQx7FEFEW621jVcypnrzZTH55RJirhd9bq/pubhtml
https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vTrtcZO0UjnIYYtytt2fNFgzqn8yxruyHTJo5f0phmlzCWk-gZB_SryGjhGIn0_b5tUH9KHDhKq03xu/pubhtml
https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vRTk1jnim2Gdsei-GpYwXFmsRuh8TEvTVPhgRUvkDErYAuq50bAyimEYMHKYKaDDb8n-veKxsTrOvoR/pubhtml
'''

# 发送GET请求获取HTML内容
grade=10
url = "https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vRTk1jnim2Gdsei-GpYwXFmsRuh8TEvTVPhgRUvkDErYAuq50bAyimEYMHKYKaDDb8n-veKxsTrOvoR/pubhtml"
response = requests.get(url)
html_content = response.text

# 打开文
'''
with open("D:\\desktop\\tmp\\timetb\\a.html", "r", encoding="utf-8") as file:
    # 读取文件内容
    html_content = file.read()
'''
    
# 使用BeautifulSoup解析HTML
soup = BeautifulSoup(html_content, "html.parser")

class_id = []
sheets_viewport_div = soup.find(id="sheets-viewport")
# 如果找到了sheets-viewport元素
if sheets_viewport_div:
    # 找到sheets-viewport下所有的div元素
    all_divs = sheets_viewport_div.children
    # 输出所有div元素的id属性
    for div in all_divs:
        if(div.get('id')):
            class_id.append(div.get('id'))

#print(class_id)


#####
# 找到id为 "sheet-menu" 的ul元素
ul_element = soup.find("ul", {"id": "sheet-menu"})
# 初始化一个空字典
class_id_name = {}
# 如果找到了 "sheet-menu" 的ul元素，则找到其中的所有li元素
if ul_element:
    li_elements = ul_element.find_all("li")
    
    # 遍历所有li元素
    for li_element in li_elements:
        # 获取li元素的id属性
        li_id = li_element.get("id").split("sheet-button-")[-1]
        
        # 找到li元素中的a元素
        a_element = li_element.find("a")
        
        # 如果找到了a元素，则获取其文本内容
        if a_element:
            text_content = a_element.text.strip()
            
            # 将id和文本内容添加到字典中
            class_id_name[text_content] = li_id

# 打印字典
#print(class_id_name)
####

keys = list(class_id_name.keys())
for i in range(len(keys)):
    if class_id_name[keys[i]] == '':
        class_id_name[keys[i]] = class_id[i]

#print(class_id_name)

###
tr_tags = soup.find_all("tr")
# 创建一个列表用于存储内容
rows,cols = 10*len(class_id_name),5
s16_s19_matrix = [[0 for _ in range(cols)] for _ in range(rows)]
# 遍历每个tr标签
i,j=0,0
for tr_tag in (tr_tags):
    # 查找当前tr标签中的所有s16标签
    s16_s19_tags = tr_tag.find_all("td", {"class": ["s16", "s19"]})
    # 如果找到了s16标签，则将其内容添加到s16_contents列表中
    if s16_s19_tags:
        j=0
        for s16_s19_tag in (s16_s19_tags):
            s16_s19_matrix[i][j]=s16_s19_tag.text.strip()#[:5]
            j+=1
        i+=1
        
#print(i,j)      
# 打印二维数组
#print(tabulate(s16_s19_matrix, tablefmt="grid"))

def export_to_csv(data, filename):
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerows(data)

def export_dict_to_csv(data_dict, filename):
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerow(['Key', 'Value'])  # 写入表头
        for key, value in data_dict.items():
            csv_writer.writerow([key, value])

#export_to_csv(s16_s19_matrix, str(grade)+'.csv')
export_dict_to_csv(class_id_name, 'output.csv')
