import { Storage, TransferManager } from "@google-cloud/storage";

// Cloud Storage Connection
const cloudStorage = () => {
    try {
        const keyFilename = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '';
        return new Storage({ keyFilename });
    } catch (error) {
        console.error("Error initializing Cloud Storage:", error);
        throw error;
    }
};

// For larger-scale file transfer to Cloud Storage
const transferManager = (bucketName: string) => {
    try {
        const storage = cloudStorage()
        const bucket = storage.bucket(bucketName)
        return new TransferManager(bucket);
    } catch (error) {
        console.error("Error initializing Transfer Manager:", error);
        throw error;
    }
};

export { cloudStorage , transferManager }