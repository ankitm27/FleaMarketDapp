

export type ContractState = 'Created' | 'Locked' | 'Inactive';

export interface PurchaseContractModel {
    productKey: string;
    contractAddress: string;
    sellerAddress: string;
    buyerAddress?: string;   // optional as item may not under contract yet by the buyer
    price: string;
    title: string;
    ipfsHash: string;
    state: ContractState;
}