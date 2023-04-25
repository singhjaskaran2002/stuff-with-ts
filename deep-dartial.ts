type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

let obj: DeepPartial<{ user: { name: string; }; address: {street: string; city: string; } }> = {};

obj.user = {name: 'Jaskaran' }
obj.address = { city: 'Delhi' }

console.log(obj)