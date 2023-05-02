import server from "./server";

const nodeEnv = process.env.NODE_ENV

const port = process.env.SERVER_IMAGE_PORT || 'xxxx';

server.listen(port, () => {
    console.info(` 🌠 server/image is listening on port ${port}.`);
    console.info(' 🌠 server/image start in ' + nodeEnv + ' mode.');

});

export { server };
