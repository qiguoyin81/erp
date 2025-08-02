// 订单相关操作
export const FETCH_ORDERS = 'FETCH_ORDERS';
export const CREATE_ORDER = 'CREATE_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';

export interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

export interface FetchOrdersAction {
  type: typeof FETCH_ORDERS;
  payload: Order[];
}

export interface CreateOrderAction {
  type: typeof CREATE_ORDER;
  payload: Order;
}

export type OrderActionTypes = FetchOrdersAction | CreateOrderAction;

export const fetchOrders = (orders: Order[]): FetchOrdersAction => ({
  type: FETCH_ORDERS,
  payload: orders
});

export const createOrder = (order: Order): CreateOrderAction => ({
  type: CREATE_ORDER,
  payload: order
});
