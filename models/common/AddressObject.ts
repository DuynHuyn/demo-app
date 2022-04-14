export interface AddressObject {
  country?: string
  address1: string
  address2?: string
  city: {
    key: string
    value: string
  }
  state: {
    key: string
    value: string
  }
  zip: string
  firstName?: string
  lastName?: string
  companyName?: string
  phone: string
}
