

export type ContractState = 'Created' | 'Locked' | 'Inactive';

export interface PurchaseContractModel {
    productKey: string;
    contractAddress: string | null;
    sellerAddress: string;
    buyerAddress: string | null;
    price: string;
    title: string;
    ipfsHash: string;
    state: ContractState;
}