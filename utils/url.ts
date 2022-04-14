import { omitBy } from 'lodash'
import { withQuery } from 'ufo'
import { ListQueryObject } from '~/models/common'

export const wQuery = (url: string, query: ListQueryObject) =>
  withQuery(
    url,
    omitBy(query, (v) => v === '')
  )
