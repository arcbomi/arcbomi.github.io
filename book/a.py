import os
import requests

os.makedirs("res", exist_ok=True)


for number in range(200, 623):
    url = f"https://okulyk.kz/wp-content/books/{number}/{number}.jpg"
    response = requests.get(url)
    
    if response.status_code == 200:
        
        with open(f"res/{number}.png", "wb") as f:
            f.write(response.content)
        print(f"Downloaded {number}.png")
    else:
        print(f"Failed to download {number}.jpg")

print("Download completed.")
