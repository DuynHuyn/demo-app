import { BaseModel } from './BaseModel'

export interface LocationObject extends BaseModel {
  code: string
  name: string
  fullName?: string
}
