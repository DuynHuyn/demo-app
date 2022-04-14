import { NuxtAxiosInstance } from '@nuxtjs/axios'

export interface FileServiceInstance {
  uploadFile<T = any>(file: any): Promise<T>
  uploadFiles<T = any>(files: any): Promise<T>
  uploadPrivateFile<T = any>(file: any): Promise<T>
  uploadPrivateFiles<T = any>(files: any): Promise<T>
}

export const createFileService = ($axios: NuxtAxiosInstance) => ({
  uploadFile: (file: any): Promise<any> => $axios.$post('/file/Files', file),
  uploadFiles: (files: any): Promise<any> =>
    $axios.$post('/file/Files/Multiple', files),
  uploadPrivateFile: (file: any): Promise<any> =>
    $axios.$post('/file/Me', file),
  uploadPrivateFiles: (files: any): Promise<any> =>
    $axios.$post('/file/Me/Multiple', files),
})
