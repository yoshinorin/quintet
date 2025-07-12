export enum Order {
  DEFAULT = 'default',
  DESC = 'desc',
  RANDOM = 'random'
}

export function getValidOrder(orderParam: string | undefined): Order {
  switch (orderParam) {
    case Order.DESC:
      return Order.DESC;
    case Order.RANDOM:
      return Order.RANDOM;
    default:
      return Order.DEFAULT;
  }
}
