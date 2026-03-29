import { PresignedUrlResponse } from "./types";
import { servicePath } from "../servicePath";
import apiInstanceClient from "../apiInstanceClient";
import { unwrapApiResponse, type ApiSuccessResponse } from "../apiResponse";

export async function getPresignedUrl(
    fileName: string,
    fileType: string,
    folder: string,
): Promise<PresignedUrlResponse | null> {
    try {
        const response = await apiInstanceClient.get<
            ApiSuccessResponse<PresignedUrlResponse> | PresignedUrlResponse
        >(servicePath.upload.getPresignedUrl, {
            params: {
                fileName,
                fileType,
                folder,
            }
        });
        
        // Axios throws on 4xx/5xx errors, so if we reach here, the request was successful
        // You can also explicitly check: response.status >= 200 && response.status < 300
        return unwrapApiResponse(response.data);
    } catch (error) {
        console.error('Error getting presigned URL:', error);
        return null;
    }
}

export async function uploadFileToPresignedUrl(
    uploadUrl: string,
    file: File,
    onProgress?: (progressPercent: number) => void,
): Promise<boolean> {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl);
        xhr.setRequestHeader('Content-Type', file.type);

        xhr.upload.onprogress = (event) => {
            if (!onProgress || !event.lengthComputable) return;
            const progress = Math.round((event.loaded / event.total) * 100);
            onProgress(progress);
        };

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                onProgress?.(100);
                resolve(true);
                return;
            }

            console.error(`Upload failed with status: ${xhr.status}`);
            resolve(false);
        };

        xhr.onerror = () => {
            console.error('Error uploading file to presigned URL');
            resolve(false);
        };

        xhr.send(file);
    });
}

export async function deleteObject(key: string) {
    try {
        const response = await apiInstanceClient.delete(servicePath.upload.deleteObject, {
            data: {
                key
            }
        })

        return unwrapApiResponse(response.data);
    } catch (error) {
        console.error('Error deleting object: ', error);
        return null;
    }
}
