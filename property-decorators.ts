/* 

In TypeScript, a property decorator is a special kind of decorator that can be used to modify the behavior of a property. 
A property decorator is applied to the property declaration and receives two parameters:

    1. The target object, which is the class or prototype that the property belongs to.
    2. The name of the property being decorated.

*/

function Capitalize(target: any, key: string) {
    let value = target[key];

    const getter = () => value;
    const setter = (newValue: string) => {
        value = newValue.substring(1, 0).toUpperCase() + newValue.substring(1);
    };

    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    })
}

function Min(minAge: number) {
    return function (target: any, key: string) {
        let value = target[key];

        const getter = () => value;
        const setter = (newValue: number) => {
            if (newValue < 21) {
                const error = `Age must be greater than ${minAge}`;
                /****** we can add array property called errors which will contain all the errors occured while creating object */
                // Object.defineProperty(target, "errors", {
                //     value: [
                //         {
                //             property: key,
                //             error
                //         }
                //     ]
                // })
                throw new TypeError(error);
            }
            value = newValue;
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        })
    }
}

class User {
    @Capitalize
    private firstName: string;

    @Capitalize
    private lastName: string;

    @Min(20)
    private age: number;

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    get info(): { name: string; age: number } {
        return {
            name: `${this.firstName} ${this.lastName}`,
            age: this.age
        }
    };
}

try {
    const user = new User('jaskaran', 'singh', 21);
    console.log(user.info);

    /**
    OUTPUT:
    
    {
      "name": "Jaskaran Singh",
      "age": 21
    } 
     */

    // TypeError: Age must be greater than 20 
    const user2 = new User('john', 'duo', 20);
    console.log(user2.info);
} catch (err) {
    console.log((err as Error).message)
}