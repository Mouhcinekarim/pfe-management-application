import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';


export const myRxStompConfig: InjectableRxStompConfig = {

    brokerURL: `ws://localhost:8084/ichat`,

    connectHeaders: {
        login: 'guest',
        passcode: 'guest'
    },

    heartbeatIncoming: 0,

    heartbeatOutgoing: 20000000,

    reconnectDelay: 200,

    debug: (msg: string): void => {
        console.log(msg);
    }
};