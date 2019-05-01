import { ErrorEffects } from './error.effects';
import { Web3ProviderEffects } from './web3-provider.effects';
import { IpfsDaemonEffects } from './ipfs-daemon.effects';

export const effects: any[] = [ErrorEffects, Web3ProviderEffects, IpfsDaemonEffects];

export * from './error.effects';
export * from './web3-provider.effects';
export * from './ipfs-daemon.effects';
