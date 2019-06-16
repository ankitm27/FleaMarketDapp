
import { createAction, props} from '@ngrx/store';
import { PurchaseContractModel } from '../../models';

export const loadProducts = createAction('[PurchaseContract/Command] Load Products');
export const loadProductsSuccess = createAction('[PurchaseContract/API] Load Products', props<{ products: PurchaseContractModel[] }>());
export const addProduct = createAction('[PurchaseContract/API] Add Product', props<{ product: PurchaseContractModel }>());
export const clearProducts = createAction('[PurchaseContract/View] Clear Products');
export const selectProduct = createAction('[PurchaseContract/View] Select Product',
    props<{ key: string }>()
  );
