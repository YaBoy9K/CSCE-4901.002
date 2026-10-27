FROM alpine:latest

RUN apk add --no-cache \
    iproute2 \
    iputils \
    bind-tools \
    curl \
    openssh

RUN adduser -D student \
    && echo 'student:student' | chpasswd

RUN mkdir -p /run/sshd

CMD ["sleep", "infinity"]
