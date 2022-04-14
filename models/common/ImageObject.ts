import { BaseModel } from './BaseModel'

export interface ImageObject extends BaseModel {
  isDeleted: boolean
  key: string
  bucket: string
  altText: string
  order: number
}
