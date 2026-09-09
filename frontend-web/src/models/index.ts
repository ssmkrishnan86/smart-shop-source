import { IProduct, IUser, IOrder } from '../interfaces';

export class ProductModel {
  static getDiscountAmount(product: IProduct): number {
    return Math.round((product.originalPrice - product.price) * 100) / 100;
  }

  static isAvailable(product: IProduct): boolean {
    return product.stock > 0;
  }

  static getFormattedRating(rating: number): string {
    return rating.toFixed(1);
  }
}

export class UserModel {
  static getFullName(user: IUser): string {
    return `${user.firstName} ${user.lastName}`.trim();
  }

  static getDefaultAddress(user: IUser) {
    return user.addresses.find((addr) => addr.isDefault) || user.addresses[0];
  }
}

export class OrderModel {
  static canBeCancelled(order: IOrder): boolean {
    return order.orderStatus === 'PENDING' || order.orderStatus === 'PROCESSING';
  }
}
