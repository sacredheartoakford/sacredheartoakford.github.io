#!/usr/bin/env python3
"""
Script to rename all image files in a directory structure to be iterable (pic1.jpg, pic2.jpg, etc.)
"""

import os
import glob
import uuid
from pathlib import Path

def get_image_extensions():
    """Return a set of common image file extensions."""
    return {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'}

def rename_images_in_directory(root_dir):
    """
    Rename all image files in the given directory and subdirectories
    to pic1.jpg, pic2.jpg, etc.
    """
    image_extensions = get_image_extensions()
    
    # Find all image files recursively
    image_files = []
    for extension in image_extensions:
        pattern = os.path.join(root_dir, f"**/*{extension}")
        image_files.extend(glob.glob(pattern, recursive=True))
    
    # Sort the files to ensure consistent ordering
    image_files.sort()
    
    print(f"Found {len(image_files)} image files")
    
    # Step 1: Rename to temporary names to avoid collisions
    temp_files = []
    print("Step 1: Renaming to temporary files...")
    for old_path in image_files:
        try:
            dir_name = os.path.dirname(old_path)
            base_name = os.path.basename(old_path)
            name_without_ext, ext = os.path.splitext(base_name)
            
            # Create temp filename
            temp_filename = f"temp_{uuid.uuid4().hex}{ext}"
            temp_path = os.path.join(dir_name, temp_filename)
            
            os.rename(old_path, temp_path)
            temp_files.append(temp_path)
        except Exception as e:
            print(f"Error creating temp file for {old_path}: {e}")

    # Step 2: Rename to final names
    print("Step 2: Renaming to final sequential names...")
    renamed_count = 0
    for i, temp_path in enumerate(temp_files, 1):
        try:
            dir_name = os.path.dirname(temp_path)
            base_name = os.path.basename(temp_path)
            name_without_ext, ext = os.path.splitext(base_name)
            
            # Create new filename
            new_filename = f"pic{i}{ext}"
            new_path = os.path.join(dir_name, new_filename)
            
            os.rename(temp_path, new_path)
            print(f"Renamed: {base_name} -> {new_filename}")
            renamed_count += 1
            
        except Exception as e:
            print(f"Error renaming {temp_path} to final name: {e}")
    
    print(f"\nSuccessfully renamed {renamed_count} files")

def main():
    # Get the directory where this script is located
    current_dir = os.path.dirname(os.path.abspath(__file__))
    images_dir = os.path.join(current_dir, "public", "images", "students", "2026camp")
    
    if not os.path.exists(images_dir):
        print(f"Error: Images directory {images_dir} does not exist")
        return
    
    print("Renaming all image files in:", images_dir)
    rename_images_in_directory(images_dir)

if __name__ == "__main__":
    main()
