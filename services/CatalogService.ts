import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { CategoryList, ProductList } from '~/models/catalog'

export interface CatalogService {
  getProducts(): Promise<ProductList>
  getProductCategories(): Promise<CategoryList>
}

export const createCatalogService = ($axios: NuxtAxiosInstance) => ({
  getProducts: () => $axios.$get<ProductList>(`/v1/Catalog/Products`),
  getProductCategories: () =>
    $axios.$get<CategoryList>(`/v1/Catalog/ProductCategories`),
})
