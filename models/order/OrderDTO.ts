import { AddressObject } from '../common'

export interface OrderDTO {
  deliveryDate: Date | string
  notes: string
  paymentDocumentLink: string
  orderItems: {
    productId: string
    quantity: number
  }[]
  deliveryAddress: AddressObject
  billingAddress: AddressObject
}
