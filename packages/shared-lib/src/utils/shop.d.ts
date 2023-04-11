import { OrderStatus } from '@cd/data-access';
export declare const checkOrderIsCompleteOrCanceled: (order: OrderWithDetails) => boolean;
export declare const orderStatusList: OrderStatus[];
export declare function calcSalePrice(price: number, discount: number): number;
export declare const parseDaysFromSchedule: (days: number) => number[];
export declare const checkDispensaryIsOpen: (schedule: Schedule) => boolean;
export declare const getCurrencySymbol: (currency: any) => string;
