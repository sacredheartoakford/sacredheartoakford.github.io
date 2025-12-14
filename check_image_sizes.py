import os
from PIL import Image

folder_path = r"C:\Users\khumalo\Documents\code\njabulodark.github.io\public\images\events\business_lunch"

print(f"Checking images in: {folder_path}")

for filename in os.listdir(folder_path):
    file_path = os.path.join(folder_path, filename)
    if os.path.isfile(file_path):
        try:
            with Image.open(file_path) as img:
                print(f"{filename}: {img.size}")
        except Exception as e:
            print(f"{filename}: Error - {e}")
