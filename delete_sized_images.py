import os
import sys

# Try to import Pillow, if not found, instruct user to install it
try:
    from PIL import Image
except ImportError:
    print("Pillow library is not installed. Please install it using: pip install Pillow")
    sys.exit(1)

def delete_images_by_size(folder_path, width, height):
    """
    Deletes images with the specified width and height in the given folder.
    """
    if not os.path.exists(folder_path):
        print(f"Error: Folder '{folder_path}' does not exist.")
        return

    deleted_count = 0
    # Common image extensions
    valid_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.gif', '.webp', '.tiff'}

    print(f"Scanning '{os.path.abspath(folder_path)}' for images of size {width}x{height}...")

    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        
        # Skip directories
        if not os.path.isfile(file_path):
            continue

        # Check extension
        _, ext = os.path.splitext(filename)
        if ext.lower() not in valid_extensions:
            continue

        try:
            with Image.open(file_path) as img:
                # Check dimensions
                if img.size == (width, height):
                    print(f"Deleting: {filename} (Size: {img.size})")
                    should_delete = True
                else:
                    should_delete = False
            
            if should_delete:
                os.remove(file_path)
                deleted_count += 1
                
        except Exception as e:
            print(f"Skipping {filename}: {e}")

    print(f"\nOperation complete. Deleted {deleted_count} images.")

if __name__ == "__main__":
    # Configuration
    TARGET_WIDTH = 300
    TARGET_HEIGHT = 200
    
    # Hardcoded path as requested/attempted by user
    # You can change this path to target a different folder
    target_folder = r"C:\Users\khumalo\Documents\code\njabulodark.github.io\public\images\events\valentine_day_picnic"
    
    # If the hardcoded path doesn't exist, fallback to current directory for safety or warn
    if not os.path.exists(target_folder):
        print(f"Warning: Path '{target_folder}' not found. Using current directory.")
        target_folder = "."

    delete_images_by_size(target_folder, TARGET_WIDTH, TARGET_HEIGHT)
