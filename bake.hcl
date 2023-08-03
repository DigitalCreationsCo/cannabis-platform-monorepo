variable "REGISTRY" {}
variable "TAG" {}

group "default" {
  targets = [
    "shop",
    "dashboard",
    "checkout-widget",
    "main",
    "location",
    "image",
    "payments",
    "supertokens",
  ]
} 

target "node_modules" {
  target = "node_modules"
  cache-to=[
    "type=registry,ref=${REGISTRY}/node_modules:${TAG}"
  ]
}

target "shop" {
    platforms = ["linux/amd64", "linux/arm64"]
    dockerfile = "Dockerfile.app"
    output = ["type=registry"]
    contexts = {
        node_modules = "target:node_modules",
    }
    args = {
        BUILD_TYPE = "app"
        BUILD_CONTEXT = "shop"
        PORT = 3000
    }
    tags = [
        "${REGISTRY}/shop:${TAG}",
    ]
    cache-from = [
        "type=registry,ref=${REGISTRY}/shop:${TAG}"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY}/shop:${TAG}"
    ]
}

target "dashboard" {
    platforms = ["linux/amd64", "linux/arm64"]
    dockerfile = "Dockerfile.app"
    output = ["type=registry"]
    contexts = {
        node_modules = "target:node_modules",
    }
    args = {
        BUILD_TYPE = "app"
        BUILD_CONTEXT = "dashboard"
        PORT = 3001
    }
    tags = [
        "${REGISTRY}/dashboard:${TAG}",
    ]
    cache-from = [
        "type=registry,ref=${REGISTRY}/dashboard:${TAG}"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY}/dashboard:${TAG}"
    ]
}

target "main" {
    platforms = ["linux/amd64", "linux/arm64"]
    dockerfile = "Dockerfile.server"
    output = ["type=registry"]
    contexts = {
        node_modules = "target:node_modules",
    }
    args = {
        BUILD_TYPE = "server"
        BUILD_CONTEXT = "main"
        PORT = 6001
    }
    tags = [
        "${REGISTRY}/main:${TAG}",
    ]
    cache-from = [
        "type=registry,ref=${REGISTRY}/main:${TAG}"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY}/main:${TAG}"
    ]
}
target "location" {
    platforms = ["linux/amd64", "linux/arm64"]
    dockerfile = "Dockerfile.server"
    output = ["type=registry"]
    contexts = {
        node_modules = "target:node_modules",
    }
    args = {
        BUILD_TYPE = "server"
        BUILD_CONTEXT = "location"
        PORT = 6011
    }
    tags = [
        "${REGISTRY}/location:${TAG}",
    ]
    cache-from = [
        "type=registry,ref=${REGISTRY}/location:${TAG}"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY}/location:${TAG}"
    ]
}
target "image" {
    platforms = ["linux/amd64", "linux/arm64"]
    dockerfile = "Dockerfile.server"
    output = ["type=registry"]
    contexts = {
        node_modules = "target:node_modules",
    }
    args = {
        BUILD_TYPE = "server"
        BUILD_CONTEXT = "image"
        PORT = 6031
    }
    tags = [
        "${REGISTRY}/image:${TAG}",
    ]
    cache-from = [
        "type=registry,ref=${REGISTRY}/image:${TAG}"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY}/image:${TAG}"
    ]
}
target "payments" {
    platforms = ["linux/amd64", "linux/arm64"]
    dockerfile = "Dockerfile.server"
    output = ["type=registry"]
    contexts = {
        node_modules = "target:node_modules",
    }
    args = {
        BUILD_TYPE = "server"
        BUILD_CONTEXT = "payments"
        PORT = 6021
    }
    tags = [
        "${REGISTRY}/payments:${TAG}",
    ]
    cache-from = [
        "type=registry,ref=${REGISTRY}/payments:${TAG}"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY}/payments:${TAG}"
    ]
}
target "supertokens" {
    platforms = ["linux/amd64", "linux/arm64"]
    dockerfile = "Dockerfile.supertokens"
    output = ["type=registry"]
    tags = [
        "${REGISTRY}/supertokens:3.14",
    ]
    cache-from = [
        "type=registry,ref=${REGISTRY}/supertokens:3.14"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY}/supertokens:3.14"
    ]
}
