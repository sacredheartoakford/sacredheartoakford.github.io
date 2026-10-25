const fs = require('fs');
let env = fs.readFileSync('.env', 'utf-8');
const lines = env.split('\n');
const newLines = [];
const keys = ['DATABASE_URL','NEON_AUTH_BASE_URL','NEON_AUTH_JWKS_URL','AWS_ACCESS_KEY_ID','AWS_SECRET_ACCESS_KEY','AWS_ENDPOINT_URL_S3','AWS_REGION'];
for (const line of lines) {
  newLines.push(line);
  for (const key of keys) {
    if (line.startsWith(key + '=')) {
      newLines.push('VITE_' + key + '=' + line.slice(key.length + 1));
    }
  }
}
fs.writeFileSync('.env', newLines.join('\n'));
console.log('Done. VITE_ vars added.');
