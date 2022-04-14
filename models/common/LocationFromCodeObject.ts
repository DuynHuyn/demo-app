import { Country } from './Country'
import { LocationLv1 } from './LocationLv1'
import { LocationLv2 } from './LocationLv2'
import { LocationLv3 } from './LocationLv3'

export interface LocationFromCode {
  country: Country | null
  level1Response: LocationLv1 | null
  level2Response: LocationLv2 | null
  level3Response: LocationLv3 | null
}
