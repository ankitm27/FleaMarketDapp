import { ErrorEffects } from './error.effects';
import { Web3ProviderEffects } from './web3-provider.effects';

export const effects: any[] = [ErrorEffects, Web3ProviderEffects];

export * from './error.effects';
export * from './web3-provider.effects';
