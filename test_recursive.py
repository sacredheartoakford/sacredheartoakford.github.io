#!/usr/bin/env python3

import os
import sys
import tempfile
import shutil
from PIL import Image

def test_recursive_compression():
    """
    Test that the recursive image compression works correctly across subfolders.
    """
    # Create a temporary directory structure for testing
    with tempfile.TemporaryDirectory() as temp_dir:
        print(f"Testing in temporary directory: {temp_dir}")
        
        # Create test folder structure
        main_folder = os.path.join(temp_dir, 'test_images')
        subfolder1 = os.path.join(main_folder, 'subfolder1')
        subfolder2 = os.path.join(main_folder, 'subfolder2')
        
        os.makedirs(subfolder1)
        os.makedirs(subfolder2)
        
        # Create test JPG images in different folders
        jpg1_path = os.path.join(main_folder, 'test1.jpg')
        jpg2_path = os.path.join(subfolder1, 'test2.jpg')
        jpg3_path = os.path.join(subfolder2, 'test3.jpg')
        
        # Create simple test images
        img1 = Image.new('RGB', (200, 200), color='red')
        img2 = Image.new('RGB', (200, 200), color='green')
        img3 = Image.new('RGB', (200, 200), color='blue')
        
        img1.save(jpg1_path, 'JPEG', quality=90)
        img2.save(jpg2_path, 'JPEG', quality=90)
        img3.save(jpg3_path, 'JPEG', quality=90)
        
        print(f"Created test images in folders:")
        print(f"  {jpg1_path}")
        print(f"  {jpg2_path}")
        print(f"  {jpg3_path}")
        
        # Run the compression script on main folder
        sys.path.insert(0, 'src/pages')
        import image_compress
        
        try:
            # Test with our temp directory (root folder)
            image_compress.convert_jpg_to_avif(main_folder)
            
            # Check if AVIF files were created in all locations
            avif1_path = os.path.join(main_folder, 'test1.avif')
            avif2_path = os.path.join(subfolder1, 'test2.avif')
            avif3_path = os.path.join(subfolder2, 'test3.avif')
            
            success = True
            if not os.path.exists(avif1_path):
                print("ERROR: AVIF file was not created for test1.jpg")
                success = False
            else:
                print(f"SUCCESS: Created {os.path.basename(avif1_path)}")
                
            if not os.path.exists(avif2_path):
                print("ERROR: AVIF file was not created for test2.jpg")
                success = False
            else:
                print(f"SUCCESS: Created {os.path.basename(avif2_path)}")
                
            if not os.path.exists(avif3_path):
                print("ERROR: AVIF file was not created for test3.jpg")
                success = False
            else:
                print(f"SUCCESS: Created {os.path.basename(avif3_path)}")
                
            if success:
                print("\nRECURSIVE COMPRESSION TEST PASSED: All images processed correctly across subfolders.")
            return success
            
        except Exception as e:
            print(f"ERROR during test: {e}")
            import traceback
            traceback.print_exc()
            return False

if __name__ == "__main__":
    success = test_recursive_compression()
    sys.exit(0 if success else 1)