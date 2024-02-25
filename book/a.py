import os
import requests

# 创建保存图片的文件夹
os.makedirs("res", exist_ok=True)

# 循环下载图片
for number in range(200, 623):
    url = f"https://okulyk.kz/wp-content/books/{number}/{number}.jpg"
    response = requests.get(url)
    
    if response.status_code == 200:
        # 保存图片为 .png 格式
        with open(f"res/{number}.png", "wb") as f:
            f.write(response.content)
        print(f"Downloaded {number}.png")
    else:
        print(f"Failed to download {number}.jpg")

print("Download completed.")
