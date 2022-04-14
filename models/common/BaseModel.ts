export interface BaseModel {
  id?: string | number
  createdAt?: Date | string
  updatedAt?: Date | string
  createdBy?: string
  updatedBy?: string
  isDeleted?: boolean
}
