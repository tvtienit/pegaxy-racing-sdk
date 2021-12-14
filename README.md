## Pegaxy Racing SDK

### 1. Event definitions:

-   Event payload: (received from 3D iframe)

```javascript
interface EventPayload {
	name: string; // always "racing3d"
	type: string;
	payload: any;
}
```

-   Event response type: (returned to 3D iframe)

```javascript
interface EventResponse {
	name: string; // always "racing3d"
	type: string;
	status?: 'success' | 'error';
	message?: string;
	data?: any;
}
```

### 2. List of Events:

##### - Get list of racing Pegas:

-   Event payload:

```javascript
{
    name: "racing3d",
    type: "getPegas"
}
```

-   Event response:

```javascript
// Success
{
    name: "racing3d",
    type: "getPegasSuccess",
    status: "success",
    data: Pega[]
}
// Failed
{
    name: "racing3d",
    type: "getPegasError",
    status: "error",
    message: "<error_reason>"
}
```

##### - Get room for pega:

-   Event payload:

```javascript
{
    name: "racing3d",
    type: "getRoomForPega",
    payload: {
        pegaId: 392 // pegaId that"s chosen
    }
}
```

-   Event response:

```javascript
// Success
{
    name: "racing3d",
    type: "getRoomForPegaSuccess",
    status: "success",
    data: {
        raceId: 1,
        roomId: "abcxyz",
        pegaId: 392,
        address: "<user address>",
        signature: "<joined signature>"
    }
}
// ETA time
{
    name: "racing3d",
    type: "getRoomForPega$ETA",
    status: "success",
    data: {
        eta: 3 // ETA time as seconds
    }
}
// Match found
{
    name: "racing3d",
    type: "getRoomForPega$MatchFound",
    status: "success",
    data: {
        roomId: 'abcxyz'
    }
}
// Is Joining (Notify user that client is joining the lobby)
{
    name: "racing3d",
    type: "getRoomForPega$IsJoining",
    status: "success",
    data: {
        isJoining: true
    }
}
// Failed
{
    name: "racing3d",
    type: "getRoomForPegaError",
    status: "error",
    message: "<error_reason>"
}
```

##### - Cancel Matching:

-   Event payload:

```javascript
{
    name: "racing3d",
    type: "cancelMatching"
}
```

### 3. SDK Usage:

```javascript
interface Window {
	PegaxyRacingSDK: RacingSDK;
}
```

| Function         | Parameters                              | Description                                                      |
| ---------------- | --------------------------------------- | ---------------------------------------------------------------- |
| addEventListener | (eventType: string, listener: Function) | Register listener to an event type. For example: getPegasSuccess |
| getPegas         | None                                    | Get list of pegas (See event details above)                      |
| getRoomForPega   | (pegaId: number)                        | Get room for a pega (See event details above)                    |
| cancelMatching   | None                                    | Cancel the current matchmaking                                   |
