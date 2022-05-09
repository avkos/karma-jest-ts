import {ProviderWS} from './ProviderWS'
import {EventEmitter} from 'events'

export default class Lib {
    private provider: ProviderWS
    private em: EventEmitter

    constructor(link: string) {
        this.em = new EventEmitter()
        this.provider = new ProviderWS(link, (type: string, data: any) => {
            this.em.emit(type, data)
        })
    }

    on(type: 'open' | 'close' | 'error' | 'message', cb: CBon) {
        this.em.on(type, cb)
    }

    ping(message: any) {
        this.provider.send(message)
    }

    close() {
        this.provider.close()
    }
}