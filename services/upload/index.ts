import { PresignedUrlResponse } from "./types";
import { servicePath } from "../servicePath";
import apiInstanceClient from "../apiInstanceClient";

export async function getPresignedUrl(
    fileName: string,
    fileType: string,
    folder: string,
): Promise<PresignedUrlResponse | null> {
    try {
        const response = await apiInstanceClient.get(servicePath.upload.getPresignedUrl, {
            params: {
                fileName,
                fileType,
                folder,
            }
        });
        
        // Axios throws on 4xx/5xx errors, so if we reach here, the request was successful
        // You can also explicitly check: response.status >= 200 && response.status < 300
        return response.data;
    } catch (error) {
        console.error('Error getting presigned URL:', error);
        return null;
    }
}

export async function uploadFileToPresignedUrl(uploadUrl: string, file: File): Promise<boolean> {
    try {
        const response = await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });

        if (!response.ok) {
            throw new Error(`Upload failed with status: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error uploading file to presigned URL:', error);
        return false;
    }
}

export async function deleteObject(key: string) {
    try {
        const response = await apiInstanceClient.delete(servicePath.upload.deleteObject, {
            data: {
                key
            }
        })

        return response.data;
    } catch (error) {
        console.error('Error deleting object: ', error);
        return null;
    }
}