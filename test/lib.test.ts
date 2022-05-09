import Lib from '../src';

const port = 7071
const testMessage = {some: {data: {to: 'test'}}}
describe('lib', () => {
    it('connected', async () => {
        const lib = new Lib(`ws://127.0.0.1:${port}`);
        const data = await new Promise((resolve: (data?: unknown) => void) => {
            lib.on('open', (data: string) => {
                resolve(data)
            })
        })
        expect(data).toBe('connected')
        lib.close()
    })
    it.each([1,2,3])('each test', async (caseN) => {
        expect([1,2,3].includes(caseN)).toBe(true)
    })
    it('ping pong', async () => {
        const lib = new Lib(`ws://127.0.0.1:${port}`);
        await new Promise((resolve: (data?: unknown) => void) => {
            lib.on('open', () => {
                resolve()
            })
        })
        lib.ping(testMessage)
        const data = await new Promise((resolve: (data: unknown) => void) => {
            lib.on('message', (data: any) => {
                resolve(data)
            })
        })
        expect(data).toEqual(testMessage)
        lib.close()

    });
});
