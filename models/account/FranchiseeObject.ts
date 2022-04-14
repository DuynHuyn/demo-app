import { AddressObject, BaseModel } from '../common'
import { StoreObject } from './StoreObject'

export interface FranchiseeObject extends BaseModel {
  name: string
  contractStartDate: Date | string
  billingInformation: AddressObject
  deliveryInformation: AddressObject
  storeInformation: StoreObject
}
