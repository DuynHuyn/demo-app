import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { createOrderService, OrderServiceInstance } from './OrderService'
import { AccountServiceInstance, createAccountService } from './AccountService'
import { CommonServiceInstance, createCommonService } from './CommonService'
import { CatalogService, createCatalogService } from './CatalogService'
import {
  createIdentityService,
  IdentityServiceInstance,
} from '~/core/services/IdentityService'
import {
  createFileService,
  FileServiceInstance,
} from '~/core/services/FileService'

export interface ServicesInstance {
  identity: IdentityServiceInstance
  file: FileServiceInstance
  common: CommonServiceInstance
  account: AccountServiceInstance
  order: OrderServiceInstance
  catalog: CatalogService
}

export const createServices = ($axios: NuxtAxiosInstance) => ({
  identity: createIdentityService($axios),
  file: createFileService($axios),
  common: createCommonService($axios),
  account: createAccountService($axios),
  order: createOrderService($axios),
  catalog: createCatalogService($axios),
})
