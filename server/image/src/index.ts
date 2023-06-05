import server from "./server";

const port = process.env.SERVER_IMAGE_PORT || 'NO_PORT_FOUND';

server.listen(port, () => {
    console.info(` 🌠 server-image start in ${process.env.NODE_ENV} mode.`);
    console.info(` 🌠 server-image is listening on port ${port}.`);
    process.send('ready'); // ready signal pm2
});

process.on('SIGINT', async function(err) {
    try {
        process.exit(0)
    } catch (error:any) { 
        process.exit(1) 
    }
});

export { server };
