#!/bin/sh

echo "nameserver 10.10.2.53" > client/resolv.conf

docker compose up -d --force-recreate client

echo "DNS configuration restored."
echo "Client DNS server is now 10.10.2.53"
