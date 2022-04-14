import { AddressObject } from '../common'
import { Order } from './Order'

export interface OrderDetail extends Order {
  orderItems: {
    productId: string
    productCode: string
    productName: string
    productUOMCode: string
    productCategoryId: string
    productCategoryName: string
    price: number
    quantity: number
  }[]
  subTotal: number
  tax: number
  shippingFee: number
  billingAddress: AddressObject
  notes: string
  paymentDocumentLink: string
}
