import { BaseModel, ImageObject } from '../common'

export interface Product extends BaseModel {
  code: string
  name: string
  isActive?: boolean
  categoryId: string
  categoryName: string
  uomCode: string
  price: number
  description?: string
  images?: ImageObject[]
  quantity?: number
  selected?: boolean
  editing?: boolean
}
