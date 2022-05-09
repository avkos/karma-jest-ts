import Websocket, {CloseEvent, MessageEvent, Event, ErrorEvent} from 'isomorphic-ws'

export class ProviderWS {
    private ws: Websocket
    private readonly cb: CB

    constructor(link: string, cb: CB) {
        this.cb = cb
        this.ws = new Websocket(link)
        this.addListeners()
    }

    private addListeners() {
        this.ws.addEventListener('message', this.onMessage.bind(this));
        this.ws.addEventListener('open', this.onOpen.bind(this));
        this.ws.addEventListener('close', this.onClose.bind(this));
        this.ws.addEventListener('error', this.onError.bind(this));
    }

    public send(data: any): void {
        this.ws.send(JSON.stringify(data));
    }

    private emit(type: string, data: any) {
        if (typeof this.cb === 'function') {
            this.cb(type, data)
        }

    }

    private onMessage(e: MessageEvent): void {
        if (typeof e.data === 'string') {
            let response
            try {
                response = JSON.parse(e.data);
            } catch {
                response = e.data
            }
            this.emit('message', response)
        }
    }

    private onOpen(_: Event): void {
        this.emit('open', 'connected')
    }

    private onError(error: ErrorEvent): void {
        this.emit('error', error)
    }

    private onClose(event: CloseEvent): void {
        this.emit('close', event)
    }

    public close(): void {
        this.removeListeners()
        this.ws.close()
    }

    private removeListeners(): void {
        this.ws.removeEventListener('message', this.onMessage.bind(this));
        this.ws.removeEventListener('open', this.onOpen.bind(this));
        this.ws.removeEventListener('close', this.onClose.bind(this));
        this.ws.removeEventListener('error', this.onError.bind(this));
    }

}