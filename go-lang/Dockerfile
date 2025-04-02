FROM golang:alpine AS builder
WORKDIR /app
COPY main.go .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o server main.go

FROM scratch
COPY --from=builder /app/server /
CMD ["/server"]