import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PresignedUrlResponse } from "@/services/upload/types"
import { getPresignedUrl } from "@/services/upload"

interface UsePresignedUrlParams {
    fileName: string
    fileType: string
    folder: string
}

export function usePresignedUrl(params: UsePresignedUrlParams) {
    return useQuery<PresignedUrlResponse | null, AxiosError>({
        queryKey: ["presigned-url", params.fileName, params.fileType, params.folder],
        queryFn: () => getPresignedUrl(params.fileName, params.fileType, params.folder),
        staleTime: 1000 * 60 * 5,
        retry: 1,
        enabled: !!params.fileName && !!params.fileType && !!params.folder,
    })
}