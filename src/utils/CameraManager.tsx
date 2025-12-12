class CameraManager {
    private static instance: CameraManager;
    private activeStream: MediaStream | null = null;

    private constructor() {
        if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', () => this.stopAll());
            window.addEventListener('pagehide', () => this.stopAll());
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) this.stopAll();
            });
        }
    }

    static getInstance(): CameraManager {
        if (!CameraManager.instance) {
            CameraManager.instance = new CameraManager();
        }
        return CameraManager.instance;
    }

    setStream(stream: MediaStream): void {
        this.stopAll();
        this.activeStream = stream;
    }

    stopAll(): void {
        if (this.activeStream) {
            this.activeStream.getTracks().forEach(track => track.stop());
            this.activeStream = null;
        }
    }

    getStream(): MediaStream | null {
        return this.activeStream;
    }
}

export default CameraManager.getInstance();
