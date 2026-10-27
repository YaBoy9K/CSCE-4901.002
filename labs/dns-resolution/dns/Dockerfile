FROM alpine:latest

RUN apk add --no-cache bind bind-tools

CMD ["named", "-g", "-c", "/etc/bind/named.conf"]
