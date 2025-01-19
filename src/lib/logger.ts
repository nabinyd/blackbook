import { createLogger, transports, format } from 'winston';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // Logs to the console
        new transports.File({ filename: 'logs/error.log', level: 'error' }), // Error logs
        new transports.File({ filename: 'logs/combined.log' }), // All logs
    ],
});

export default logger;
