import { format } from 'date-fns'

export const formatDate = (
  v: Date | string,
  f: string = 'MM/dd/yyyy'
): string =>
  v
    ? format(
        typeof (v as any).getMonth === 'function' ? (v as Date) : new Date(v),
        f
      )
    : ''
