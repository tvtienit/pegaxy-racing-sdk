import { EventResponse, IEventListener, NotifyEventCallback } from './@types/events';

const EVENT_NAME = 'racing3d';

const TARGET_ORIGIN = '*';

class RacingSDK {
	private eventListeners: IEventListener;

	constructor() {
		this.eventListeners = {};
		this.setup();
	}

	async setup() {
		window.addEventListener('message', (event: any) => {
			const response: EventResponse = event.data as EventResponse;

			if (response.name !== EVENT_NAME) {
				return;
			}

			const listener = this.eventListeners[response.type];

			if (!listener) {
				console.warn('Listener not found for event: ' + response.type);
				return;
			}

			return listener(event.data);
		});

		console.log('Initiated: Racing SDK');
	}

	async addEventListener(event: string, listener: (...args: any) => void) {
		if (event && listener) {
			this.eventListeners[event] = listener;
			console.log('Registered event listener: ' + event);
		}
	}

	async getPegas(callback?: NotifyEventCallback) {
		try {
			this.notify('getPegas');

			callback && callback.success();
		} catch (e) {
			callback && callback.fail(e);
		}
	}

	async getRoomForPega(pegaId: number, callback?: NotifyEventCallback) {
		try {
			this.notify('getRoomForPega', {
				pegaId,
			});

			callback && callback.success();
		} catch (e) {
			callback && callback.fail(e);
		}
	}

	async cancelMatching(callback?: NotifyEventCallback) {
		try {
			this.notify('cancelMatching');

			callback && callback.success();
		} catch (e) {
			callback && callback.fail(e);
		}
	}

	async notify(type: string, data?: any) {
		try {
			const eventPayload = {
				name: EVENT_NAME,
				type,
				payload: data,
			};

			window.postMessage(eventPayload, TARGET_ORIGIN);
		} catch (e) {
			console.log(e);

			throw e;
		}
	}
}

export default RacingSDK;
