#!/bin/sh

echo "nameserver 10.10.2.99" > client/resolv.conf

docker compose up -d --force-recreate client

echo "DNS fault injected."
echo "Client DNS server is now 10.10.2.99"
