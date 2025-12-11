// Logger utility for frontend logging
class Logger {
    private isDevelopment = process.env.NODE_ENV === 'development';

    log(message: string, ...args: any[]) {
        if (this.isDevelopment) {
            console.log(`[LOG] ${message}`, ...args);
        }
    }

    error(message: string, error?: any) {
        if (this.isDevelopment) {
            console.error(`[ERROR] ${message}`, error);
        }
        // In production, you could send errors to a logging service
    }

    warn(message: string, ...args: any[]) {
        if (this.isDevelopment) {
            console.warn(`[WARN] ${message}`, ...args);
        }
    }

    info(message: string, ...args: any[]) {
        if (this.isDevelopment) {
            console.info(`[INFO] ${message}`, ...args);
        }
    }
}

export default new Logger();
