export {};

declare global {
    type CB=(event:string, data:any)=>void
    type CBon=(data:any)=>void
}