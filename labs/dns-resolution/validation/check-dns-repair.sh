#!/bin/sh

EXPECTED_DNS="10.10.2.53"
EXPECTED_IP="10.10.2.80"

CURRENT_DNS=$(docker exec dne-client \
    awk '/^nameserver/ {print $2; exit}' /etc/resolv.conf)

if [ "$CURRENT_DNS" != "$EXPECTED_DNS" ]; then
    echo "{\"status\":\"fail\",\"error\":\"dns_server_misconfigured\",\"dns_server\":\"${CURRENT_DNS:-null}\",\"expected_dns\":\"$EXPECTED_DNS\",\"resolved_ip\":null,\"expected_ip\":\"$EXPECTED_IP\"}"
    exit 1
fi

RESULT=$(docker exec dne-client nslookup web.dne.local 2>/dev/null | \
    awk '/^Address:/ {print $2}' | tail -n 1)

if [ "$RESULT" = "$EXPECTED_IP" ]; then
    echo "{\"status\":\"pass\",\"error\":null,\"dns_server\":\"$CURRENT_DNS\",\"expected_dns\":\"$EXPECTED_DNS\",\"resolved_ip\":\"$RESULT\",\"expected_ip\":\"$EXPECTED_IP\"}"
    exit 0
else
    echo "{\"status\":\"fail\",\"error\":\"dns_resolution_failed\",\"dns_server\":\"$CURRENT_DNS\",\"expected_dns\":\"$EXPECTED_DNS\",\"resolved_ip\":\"${RESULT:-null}\",\"expected_ip\":\"$EXPECTED_IP\"}"
    exit 1
fi