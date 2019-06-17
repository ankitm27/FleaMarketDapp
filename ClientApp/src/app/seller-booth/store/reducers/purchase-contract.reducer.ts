
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { PurchaseContractModel } from '../../models';
import { PurchaseContractActions } from '../actions';


export interface State extends EntityState<PurchaseContractModel> {
    // additional entities state properties
    selectedProductKey: string | null;
  }

  export function sortByTitle(a: PurchaseContractModel, b: PurchaseContractModel): number {
    return a.title.localeCompare(b.title);
  }

  // based on https://next.ngrx.io/guide/entity/adapter
  export const adapter: EntityAdapter<PurchaseContractModel> = createEntityAdapter<PurchaseContractModel>({
    selectId: (product: PurchaseContractModel) => product.productKey,
    sortComparer: sortByTitle,
  });
  
  
  export const initialState: State = adapter.getInitialState({
    selectedProductKey: null,
  });

  export const reducer = createReducer(
    initialState,
    /**
     * The addMany function provided by the created adapter
     * adds many records to the entity dictionary
     * and returns a new state including those records. If
     * the collection is to be sorted, the adapter will
     * sort each record upon entry into the sorted array.
     */
    on(
        PurchaseContractActions.loadProductsSuccess, 
      (state, { products }) => adapter.addMany(products, state)
    ),
    /**
     * The addOne function provided by the created adapter
     * adds one record to the entity dictionary
     * and returns a new state including that records if it doesn't
     * exist already. If the collection is to be sorted, the adapter will
     * insert the new record into the sorted array.
     */
    on(PurchaseContractActions.addProductSuccess, (state, { product }) => adapter.addOne(product, state)),
    on(PurchaseContractActions.selectProduct, (state, { key }) => ({
      ...state,
      selectedProductKey: key,
    }))
  );
  
  /**
   * Because the data structure is defined within the reducer it is optimal to
   * locate our selector functions at this level. If store is to be thought of
   * as a database, and reducers the tables, selectors can be considered the
   * queries into said database. Remember to keep your selectors small and
   * focused so they can be combined and composed to fit each particular
   * use-case.
   */
  
  export const getSelectedKey = (state: State) => state.selectedProductKey;
  


