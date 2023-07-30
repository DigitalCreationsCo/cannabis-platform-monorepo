variable "REGISTRY" {
    default = "docker.io/grasadmin"
}

variable "CI_COMMIT_SHA" {
    default = "latest"
}

group "default" {
  targets = [
    "shop",
    "dashboard",
    "widget",
    "main",
    "location",
    "image",
    "payments",
    "supertokens",
  ]
} 

target "node_modules" {
  target = "node_modules"
  cache-from = [
    "type=registry,ref=${REGISTRY}/node_modules:${CI_COMMIT_SHA}"
  ]
  cache-to=[
    "type=registry,ref=${REGISTRY}/node_modules:${CI_COMMIT_SHA}"
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
        BUILD_CONTEXT = "shop"
        PORT = 3000
    }
    tags = [
        "${REGISTRY}/shop:${CI_COMMIT_SHA}",
    ]
    cache-from = [
        "type=registry,ref=${REGISTRY_NAME}/shop:${CI_COMMIT_SHA}"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY_NAME}/shop:${CI_COMMIT_SHA}"
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
        BUILD_CONTEXT = "dashboard"
        PORT = 3001
    }
    tags = [
        "${REGISTRY}/dashboard:${CI_COMMIT_SHA}",
    ]
    cache-from = [
        "type=registry,ref=${REGISTRY_NAME}/dashboard:${CI_COMMIT_SHA}"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY_NAME}/dashboard:${CI_COMMIT_SHA}"
    ]
}

target "widget" {
    platforms = ["linux/amd64", "linux/arm64"]
    dockerfile = "Dockerfile.widget"
    output = ["type=registry"]
    contexts = {
        node_modules = "target:node_modules",
    }
    args = {
        BUILD_CONTEXT = "widget"
        PORT = 3000
    }
    tags = [
        "${REGISTRY}/widget:${CI_COMMIT_SHA}",
    ]
    cache-from = [
        "type=registry,ref=${REGISTRY_NAME}/widget:${CI_COMMIT_SHA}"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY_NAME}/widget:${CI_COMMIT_SHA}"
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
        BUILD_CONTEXT = "main"
        PORT = 6001
    }
    tags = [
        "${REGISTRY}/main:${CI_COMMIT_SHA}",
    ]
    cache-from = [
        "type=registry,ref=${REGISTRY_NAME}/main:${CI_COMMIT_SHA}"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY_NAME}/main:${CI_COMMIT_SHA}"
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
        BUILD_CONTEXT = "location"
        PORT = 6011
    }
    tags = [
        "${REGISTRY}/location:${CI_COMMIT_SHA}",
    ]
    cache-from = [
        "type=registry,ref=${REGISTRY_NAME}/location:${CI_COMMIT_SHA}"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY_NAME}/location:${CI_COMMIT_SHA}"
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
        BUILD_CONTEXT = "image"
        PORT = 6031
    }
    tags = [
        "${REGISTRY}/image:${CI_COMMIT_SHA}",
    ]
    cache-from = [
        "type=registry,ref=${REGISTRY_NAME}/image:${CI_COMMIT_SHA}"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY_NAME}/image:${CI_COMMIT_SHA}"
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
        BUILD_CONTEXT = "payments"
        PORT = 6021
    }
    tags = [
        "${REGISTRY}/payments:${CI_COMMIT_SHA}",
    ]
    cache-from = [
        "type=registry,ref=${REGISTRY_NAME}/payments:${CI_COMMIT_SHA}"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY_NAME}/payments:${CI_COMMIT_SHA}"
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
        "type=registry,ref=${REGISTRY_NAME}/supertokens:3.14"
    ]
    cache-to=[
        "type=registry,ref=${REGISTRY_NAME}/supertokens:3.14"
    ]
}