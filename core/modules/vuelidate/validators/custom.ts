import { helpers } from 'vuelidate/lib/validators'
import { REGEX_PATTERNS } from '@/core/constants'

export const containsAlphaAndNum = helpers.regex(
  'containsAlphaAndNum',
  REGEX_PATTERNS.CONTAINS_ALPHA_AND_NUM
)

export const containsCapital = helpers.regex(
  'containsCapital',
  REGEX_PATTERNS.CONTAINS_CAPITAL
)

export const containsSpecial = helpers.regex(
  'containsSpecial',
  REGEX_PATTERNS.CONTAINS_SPECIAL
)

export const fullName = helpers.regex('fullName', REGEX_PATTERNS.FULL_NAME)

export const greaterThan = (fieldCompare: string) =>
  helpers.withParams(
    { type: 'greaterThan', gt: fieldCompare },
    (value: string | number, parentVm: Vue) => {
      return value > helpers.ref(fieldCompare, this, parentVm)
    }
  )
export const lessThan = (fieldCompare: string) =>
  helpers.withParams(
    { type: 'lessThan', lt: fieldCompare },
    (value: string | number, parentVm: Vue) => {
      return value < helpers.ref(fieldCompare, this, parentVm)
    }
  )
export const dateGreaterThan = (fieldCompare: string) =>
  helpers.withParams(
    {
      type: 'dateGreaterThan',
      gt: fieldCompare,
    },
    (value: string, parentVm: Vue) => {
      return (
        new Date(value).getTime() >
        new Date(helpers.ref(fieldCompare, this, parentVm)).getTime()
      )
    }
  )

export const dateGreaterThanOrEqual = (fieldCompare: string) =>
  helpers.withParams(
    {
      type: 'dateGreaterThan',
      gte: fieldCompare,
    },
    (value: string, parentVm: Vue) => {
      return (
        new Date(value).getTime() >=
        new Date(helpers.ref(fieldCompare, this, parentVm)).getTime()
      )
    }
  )

export const dateLessThan = (fieldCompare: string) =>
  helpers.withParams(
    { type: 'dateLessThan', lt: fieldCompare },
    (value: string, parentVm: Vue) => {
      return (
        new Date(value).getTime() <
        new Date(helpers.ref(fieldCompare, this, parentVm)).getTime()
      )
    }
  )

export const dateGreaterThanIf = (
  fieldCompare: string,
  condition: (a: any, b: any) => boolean,
  a: string,
  b: string
) =>
  helpers.withParams(
    { type: 'dateGreaterThanIf', gti: fieldCompare },
    (value: string, parentVm: Vue) => {
      const startDate = new Date(helpers.ref(a, this, parentVm)).getTime()
      const endDate = new Date(helpers.ref(b, this, parentVm)).getTime()
      const valueDate = new Date(`${value}`).getTime()
      const compareDate = new Date(
        `${helpers.ref(fieldCompare, this, parentVm)}`
      ).getTime()

      return condition(startDate, endDate) ? valueDate > compareDate : true
    }
  )

export const timeGreaterThanIf = (
  fieldCompare: string,
  condition: (a: any, b: any) => boolean,
  a: string,
  b: string
) =>
  helpers.withParams(
    { type: 'timeGreaterThanIf', gti: fieldCompare },
    (value: string, parentVm: Vue) => {
      const startDate = new Date(helpers.ref(a, this, parentVm)).getTime()
      const endDate = new Date(helpers.ref(b, this, parentVm)).getTime()
      const valueDate = new Date(`2020-01-01T${value}`).getTime()
      const compareDate = new Date(
        `2020-01-01T${helpers.ref(fieldCompare, this, parentVm)}`
      ).getTime()

      return condition(startDate, endDate) ? valueDate > compareDate : true
    }
  )
