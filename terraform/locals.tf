locals {
    # Root directory of the project
    root_dir = "${dirname(abspath(path.root))}"
    ssl_cert = "${local.root_dir}/terraform/certs/fullchain3.pem"
    ssl_key = "${local.root_dir}/terraform/certs/privkey3.pem"
}
