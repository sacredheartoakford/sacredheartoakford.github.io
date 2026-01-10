#!/usr/bin/env python3

import os
import sys
from PIL import Image

def resize_if_larger_than_1200(img):
    """
    Resize image if width is larger than 1200px, maintaining aspect ratio.
    
    Args:
        img: PIL Image object
    
    Returns:
        PIL Image object (resized or original)
    """
    max_width = 1200
    if img.width > max_width:
        # Calculate new height maintaining aspect ratio
        aspect_ratio = img.height / img.width
        new_height = int(max_width * aspect_ratio)
        
        print(f"Resizing image from {img.width}x{img.height} to {max_width}x{new_height}")
        return img.resize((max_width, new_height), Image.Resampling.LANCZOS)
    return img

def convert_jpg_to_avif(folder_path):
    """
    Convert all JPG images in the specified folder to AVIF format with web-optimized compression.
    
    Args:
        folder_path (str): Path to the folder containing JPG images
    """
    # Check if folder exists
    if not os.path.exists(folder_path):
        print(f"Error: Folder '{folder_path}' does not exist.")
        return
    
    # Supported image extensions
    jpg_extensions = {'.jpg', '.jpeg'}
    avif_extensions = {'.avif'}
    
    # Find all JPG and AVIF files in the folder and subfolders
    image_files = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if os.path.splitext(file)[1].lower() in jpg_extensions or os.path.splitext(file)[1].lower() in avif_extensions:
                image_files.append(os.path.join(root, file))
    
    if not image_files:
        print(f"No JPG or AVIF images found in '{folder_path}' and subfolders")
        return
    
    # Convert each image to AVIF with web-optimized compression
    converted_count = 0
    for file_path in image_files:
        try:
            filename = os.path.basename(file_path)
            dir_path = os.path.dirname(file_path)
            
            # If it's already an AVIF, compress it further (if needed)
            if os.path.splitext(filename)[1].lower() in avif_extensions:
                print(f"Processing existing AVIF: {filename}")
                # For existing AVIF files, we'll re-save with better compression settings
                with Image.open(file_path) as img:
                    # Resize if needed
                    img = resize_if_larger_than_1200(img)
                    
                    # Ensure it's in RGB mode for consistency
                    if img.mode in ('RGBA', 'LA', 'P'):
                        background = Image.new('RGB', img.size, (255, 255, 255))
                        if img.mode == 'P':
                            img = img.convert('RGBA')
                        background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                        img = background
                    
                    # Re-save with optimized settings
                    img.save(file_path, 'AVIF', quality=50, lossless=False, speed=6)
                print(f"Optimized existing AVIF: {filename}")
            
            # If it's a JPG, convert to AVIF
            elif os.path.splitext(filename)[1].lower() in jpg_extensions:
                output_filename = os.path.splitext(filename)[0] + '.avif'
                output_path = os.path.join(dir_path, output_filename)
                
                # Open and convert image
                with Image.open(file_path) as img:
                    # Resize if needed
                    img = resize_if_larger_than_1200(img)
                    
                    # Convert RGBA to RGB if necessary (required for AVIF)
                    if img.mode in ('RGBA', 'LA', 'P'):
                        background = Image.new('RGB', img.size, (255, 255, 255))
                        if img.mode == 'P':
                            img = img.convert('RGBA')
                        background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                        img = background
                    
                    # Save as AVIF with maximum web optimization
                    img.save(output_path, 'AVIF', quality=50, lossless=False, speed=6)
                
                print(f"Converted: {filename} -> {output_filename}")
            
            converted_count += 1
            
        except Exception as e:
            print(f"Error processing '{filename}': {str(e)}")
    
    print(f"Processing complete. Processed {converted_count} images.")

if __name__ == "__main__":
    root_folder_path = r"C:\Users\khumalo\Documents\code\sacredheartoakford.github.io\public\images\homepage"
    convert_jpg_to_avif(root_folder_path)
