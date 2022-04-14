export interface ListQueryObject {
  Search?: string
  Status?: string | number
  FromOrderDate?: string
  ToOrderDate?: string
  Start?: number
  Length?: number
  OrderBy?: string
  [x: string]: any
}
