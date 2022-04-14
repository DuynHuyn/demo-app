import { AddressObject, BaseModel } from '../common'

export interface Order extends BaseModel {
  code: string
  storeId: string
  storeName: string
  total: 0
  deliveryDate: Date | string
  status: number
  deliveryAddress: AddressObject
}
