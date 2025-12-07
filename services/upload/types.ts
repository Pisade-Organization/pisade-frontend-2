export interface PresignedUrlResponse {
    uploadUrl: string;
    key: string;
    publicUrl: string;
}

export interface DeleteObjectResponse {
    success: boolean;
}