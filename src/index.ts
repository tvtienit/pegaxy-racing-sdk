import RacingSDK from './sdk';

const sdk = new RacingSDK();

{
	(window as any).PegaxyRacingSDK = sdk;
}

export default sdk;
