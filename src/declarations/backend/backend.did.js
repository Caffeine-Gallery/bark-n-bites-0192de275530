export const idlFactory = ({ IDL }) => {
  const Product = IDL.Record({
    'id' : IDL.Nat,
    'inventory' : IDL.Nat,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'image' : IDL.Text,
    'price' : IDL.Float64,
  });
  return IDL.Service({
    'addToCart' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'checkout' : IDL.Func([], [IDL.Bool], []),
    'getProducts' : IDL.Func([], [IDL.Vec(Product)], ['query']),
    'removeFromCart' : IDL.Func([IDL.Nat], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
