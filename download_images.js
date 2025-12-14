import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const events = [
  {
    name: 'Matric Dance 2024',
    images: [
      'http://sacredheartoakford.co.za/wp-content/uploads/2024/11/IMG-20241123-WA0006-scaled.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/11/IMG-20241123-WA0022-225x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/11/IMG-20241123-WA0023-225x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/11/bde5a87828cb4759848eb8bb30c67c9c-248x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/11/IMG-20241123-WA0007-225x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/11/IMG-20241123-WA0008-225x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/11/IMG-20241123-WA0009-300x225.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/11/IMG-20241123-WA0011-225x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/11/IMG-20241123-WA0012-225x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/11/IMG-20241123-WA0013-225x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/11/IMG-20241123-WA0015-225x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/11/IMG-20241123-WA0016-225x300.jpg',
    ]
  },
  {
    name: 'Business Lunch',
    images: [
      'http://sacredheartoakford.co.za/wp-content/uploads/2024/10/PHOTO-2024-10-08-22-19-15-7-2.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/PHOTO-2024-10-08-22-19-15-1-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/PHOTO-2024-10-08-22-19-15-2-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/PHOTO-2024-10-08-22-19-15-3-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/PHOTO-2024-10-08-22-19-15-4-200x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/PHOTO-2024-10-08-22-19-15-5-2-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/PHOTO-2024-10-08-22-19-15-6-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/PHOTO-2024-10-08-22-19-15-7-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/PHOTO-2024-10-08-22-19-15-8-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/PHOTO-2024-10-08-22-19-15-9-300x200.jpg',
    ]
  },
  {
    name: 'Gala Dinner 2024',
    images: [
      'http://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6187-2.jpg',
      'http://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6188-2.jpg',
      'http://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6183-1.jpg',
      'http://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6191-2.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9557-scaled.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6341-768x512.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6347-768x512.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6344-1-768x512.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6298-768x512.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6252-768x512.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6259-768x512.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6243-768x512.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6233-768x512.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6307-768x512.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6312-768x512.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6326-768x512.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/10/Sacred-Heart-6348-768x512.jpg',
    ]
  },
  {
    name: 'Gala Dinner 2023',
    images: [
      'http://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9557-scaled.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9557-scaled.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9695-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9692-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9688-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9687-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9683-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9681-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9677-200x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9665-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9657-1-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9650-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9649-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9645-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9644-200x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9642-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9638-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9629-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9626-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9624-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9620-200x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9619-200x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9609-200x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9606-200x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9604-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9603-1-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9598-200x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9597-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9595-200x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9592-200x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9591-1-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9588-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9587-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9586-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9583-1-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9581-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9579-200x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9576-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9575-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9574-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9569-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9567-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9564-200x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9559-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9558-1-200x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9557-1-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9556-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9555-1-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9554-200x300.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9553-2-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9551-1-300x200.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG_9550-300x200.jpg',
    ]
  },
  {
    name: 'Valentines Day Picnic',
    images: [
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240215-WA0004-1024x576.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240215-WA0005.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0024-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0025-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0026-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0027-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0029-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0030-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0031-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0035-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0037-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0041-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0042-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0043-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0044-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0045-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0046-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0047-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0048-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0050-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0053-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0054-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0055-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0071-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0072-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0073-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0074-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0075-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0076-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0077-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0078-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0079-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0080-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0081-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0082-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0083-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0084-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0085-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0086-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0087-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0088-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0089-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0090-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0093-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0094-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0095-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0096-150x150.jpg',
      'https://sacredheartoakford.co.za/wp-content/uploads/2024/05/IMG-20240528-WA0097-150x150.jpg',
    ]
  }
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    const protocol = url.startsWith('https') ? https : require('http');
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

const main = async () => {
  const baseDir = path.join(__dirname, 'public', 'images', 'events');
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  for (const event of events) {
    const eventDir = path.join(baseDir, event.name.replace(/[^a-z0-9]/gi, '_').toLowerCase());
    if (!fs.existsSync(eventDir)) {
      fs.mkdirSync(eventDir, { recursive: true });
    }

    console.log(`Processing ${event.name}...`);
    
    for (let i = 0; i < event.images.length; i++) {
      const url = event.images[i];
      const filename = path.basename(url);
      const filepath = path.join(eventDir, filename);
      
      try {
        await downloadImage(url, filepath);
        console.log(`Downloaded ${filename}`);
      } catch (error) {
        console.error(`Error downloading ${url}:`, error.message);
      }
    }
  }
  console.log('Done!');
};

main();
