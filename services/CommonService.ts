import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Country, LocationLv1, LocationLv2, LocationLv3 } from '~/models/common'
import { LocationFromCode } from '~/models/common/LocationFromCodeObject'
import { wQuery } from '~/utils'

export interface CommonServiceInstance {
  getCountries(): Promise<Country[]>
  getLocationLv1s(query: { CountryCode?: string }): Promise<LocationLv1[]>
  getLocationLv2s(query: { Level1Code?: string }): Promise<LocationLv1[]>
  getLocationLv3s(query: {
    Level1Code?: string
    Level2Code?: string
  }): Promise<LocationLv1[]>
  getAddressByCodes(query: {
    CountryCode?: string
    Level1Code?: string
    Level2Code?: string
    Level3Code?: string
  }): Promise<LocationFromCode>
}

export const createCommonService = ($axios: NuxtAxiosInstance) => ({
  getCountries: async () =>
    await $axios
      .$get<Country[]>(`/v1/Location/GetCountries`)
      .then((data) => data.map((i) => ({ value: i.name, key: i.code }))),
  getLocationLv1s: async (query: { CountryCode?: string }) =>
    await $axios
      .$get<LocationLv1[]>(wQuery(`/v1/Location/GetLocationLevel1s?`, query))
      .then((data) => data.map((i) => ({ value: i.name, key: i.code }))),
  getLocationLv2s: async (query: {
    CountryCode?: string
    Level1Code?: string
  }) =>
    await $axios
      .$get<LocationLv2[]>(wQuery(`/v1/Location/GetLocationLevel2s?`, query))
      .then((data) => data.map((i) => ({ value: i.name, key: i.code }))),
  getLocationLv3s: async (query: {
    Level1Code?: string
    Level2Code?: string
  }) =>
    await $axios
      .$get<LocationLv3[]>(wQuery(`/v1/Location/GetLocationLevel3s?`, query))
      .then((data) => data.map((i) => ({ value: i.name, key: i.code }))),
  getAddressByCodes: (query: {
    CountryCode?: string
    Level1Code?: string
    Level2Code?: string
    Level3Code?: string
  }) =>
    $axios.$get<LocationFromCode>(
      wQuery(`/v1/Location/GetAddressByCode`, query)
    ),
})
