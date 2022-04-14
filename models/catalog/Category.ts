import { BaseModel } from '../common'

export interface Category extends BaseModel {
  code: string
  name: string
  description: string
  isActive: boolean
  parentId: string
  isMainCategory: boolean
}
