import RacingSDK from '../sdk';

export default (sdk: RacingSDK) => {
	if (!sdk) {
		return;
	}

	sdk.addEventListener('getPegasSuccess', (pegas: any) => {
		console.log('getPegasSuccess: ', pegas);
	});

	sdk.addEventListener('getPegasError', (e) => {
		console.log('getPegasError: ', e);
	});

	sdk.getPegas();
};
