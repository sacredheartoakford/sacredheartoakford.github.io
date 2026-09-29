#!/usr/bin/bash
# Starts the drive-proxy node server, then the cloudflared tunnel.
# The tunnel URL is printed to stdout (captured by journalctl) so the
# admin site can be configured with it.
set -e

PROJ=/home/khumalo/work/sacredheartoakford.github.io
NODE=/home/khumalo/.hermes/node/bin/node
CF=/home/khumalo/bin/cloudflared

# Start node proxy (background, tracked)
$NODE "$PROJ/scripts/drive-proxy-server.cjs" > /tmp/drive-proxy-node.log 2>&1 &
NODE_PID=$!
sleep 2

# Start cloudflared tunnel (foreground; the service unit's stdout captures the URL)
echo "[start-drive-proxy] tunnel pointing at http://localhost:41792"
$CF tunnel --url http://localhost:41792

# If cloudflared exits, clean up the node process
kill $NODE_PID 2>/dev/null || true
