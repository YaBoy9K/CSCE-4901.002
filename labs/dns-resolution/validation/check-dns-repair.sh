#!/bin/sh

EXPECTED_IP="10.10.2.80"

RESULT=$(docker exec dne-client nslookup web.dne.local 2>/dev/null | \
    awk '/^Address:/ {print $2}' | tail -n 1)

if [ "$RESULT" = "$EXPECTED_IP" ]; then
    echo "PASS: DNS repair validated."
    echo "web.dne.local resolves to $EXPECTED_IP"
    exit 0
else
    echo "FAIL: DNS is still misconfigured."
    echo "Expected: $EXPECTED_IP"
    echo "Received: ${RESULT:-no DNS response}"
    exit 1
fi
