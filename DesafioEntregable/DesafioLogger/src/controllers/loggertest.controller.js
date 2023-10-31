const loggerTest = async (req, res) => {
    res.set('Content-Type', 'application/json');
    const toTest = req.params.test;
    switch (toTest) {
        case 'debug':
            req.logger.debug(`${new Date().toLocaleString()}: Debug test message`);
            res.status(200).send('{"status":"ok", "message":"Test runned"}');
            break;
        case 'http':
            req.logger.http(`${new Date().toLocaleString()}: Http test message`);
            res.status(200).send('{"status":"ok", "message":"Test runned"}');
            break;
        case 'info':
            req.logger.info(`${new Date().toLocaleString()}: Info test message`);
            res.status(200).send('{"status":"ok", "message":"Test runned"}');
            break;
        case 'warning':
            req.logger.warning(`${new Date().toLocaleString()}: Warning test message`);
            res.status(200).send('{"status":"ok", "message":"Test runned"}');
            break;
        case 'error':
            req.logger.error(`${new Date().toLocaleString()}: Error test message`);
            res.status(200).send('{"status":"ok", "message":"Test runned"}');
            break;
        case 'fatal':
            req.logger.fatal(`${new Date().toLocaleString()}: Fatal test message`);
            res.status(200).send('{"status":"ok", "message":"Test runned"}');
            break;
        default:
            res.status(404).send('{"status":"failed", "message":"Test not found"}');
            break;
    }
}
export { loggerTest }