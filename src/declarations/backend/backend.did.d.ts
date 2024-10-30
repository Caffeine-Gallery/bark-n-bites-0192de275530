import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Product {
  'id' : bigint,
  'inventory' : bigint,
  'name' : string,
  'description' : string,
  'image' : string,
  'price' : number,
}
export interface _SERVICE {
  'addToCart' : ActorMethod<[bigint], boolean>,
  'checkout' : ActorMethod<[], boolean>,
  'getProducts' : ActorMethod<[], Array<Product>>,
  'removeFromCart' : ActorMethod<[bigint], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
