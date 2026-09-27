import { toast } from 'sonner';
import { CONTENT } from '@/constants';
import { useAppDispatch } from '@/store';
import { ADD_TO_CART, type CartItem } from '@/store/app/cart.slice.ts';

const copy = CONTENT.cart.toast;

type AddToCartPayload = Omit<CartItem, 'quantity'> & { quantity?: number };

export const useAddToCart = () => {
  const dispatch = useAppDispatch();

  return (item: AddToCartPayload) => {
    const quantity = item.quantity ?? 1;
    dispatch(ADD_TO_CART(item));
    toast.success(copy.title, {
      description: copy.description
        .replace('{quantity}', String(quantity))
        .replace('{title}', item.title)
    });
  };
};
