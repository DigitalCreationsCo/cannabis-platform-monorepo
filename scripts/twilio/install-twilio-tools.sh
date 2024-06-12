npm install -g twilio-cli

twilio plugins:install @twilio-labs/plugin-serverless

twilio login


# Shorthand identifier for your profile
PROFILE=twilio

twilio profiles:create

twilio profiles:use $PROFILE