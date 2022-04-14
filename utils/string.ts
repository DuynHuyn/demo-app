import { OrderStatus } from '~/config'

export const getStatusType = (status: number): string => {
  return (
    (status === OrderStatus.New && 'blue') ||
    (status === OrderStatus.Approved && 'teal') ||
    (status === OrderStatus.Delivering && 'orange') ||
    (status === OrderStatus.Delivered && 'green') ||
    'grey'
  )
}

export const getStatusText = (status: number): string => {
  return (
    (status === OrderStatus.New && 'New') ||
    (status === OrderStatus.Approved && 'Approved') ||
    (status === OrderStatus.Delivering && 'Delivering') ||
    (status === OrderStatus.Delivered && 'Delivered') ||
    ''
  )
}
