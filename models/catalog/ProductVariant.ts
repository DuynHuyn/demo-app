import { BaseModel } from '../common'

export interface ProductVariant extends BaseModel {
  isDeleted: boolean
  version: number
  size: string
  sku: string
  price: number
}
