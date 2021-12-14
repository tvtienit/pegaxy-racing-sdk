export interface EventPayload {
	name: string;
	type: string;
	payload?: {
		[key: string]: any;
	};
}

export interface EventResponse {
	name: string;
	type: string;
	status: 'success' | 'error';
	message?: string;
	data?: {
		[key: string]: any;
	};
}

export interface NotifyEventCallback {
	success: (...args: any) => void;
	fail: (e: any) => void;
}

export interface IEventListener {
	[key: string]: (...args: any) => void;
}
