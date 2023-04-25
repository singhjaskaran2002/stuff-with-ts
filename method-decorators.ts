/*

In TypeScript, a method decorator is a special kind of decorator that can be used to modify the behavior of a method. 
A method decorator is applied to the method declaration and receives three parameters:

    1. The target object, which is the class or prototype that the method belongs to.
    2. The name of the method being decorated.
    3. A property descriptor for the method.

*/

interface IUser {
    email: string;
    name: string;
    id: string;
}

const mockDatabase: Array<IUser> = [
    {
        email: 'jaskaran@yopmail.com',
        id: '51f98b0e-7306-47de-915a-8bfd66bcc38e',
        name: 'Jaskaran'
    }
]

function CheckDuplicacy(_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (name: string, email: string) {
        // Check if email already exists
        const existingUser = mockDatabase.filter(user => user.email === email);
        if (existingUser.length > 0) {
            throw new Error(`User with email '${email}' already exists`);
        }
        return originalMethod.call(this, name, email);
    }
}

function AttachId(_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (name: string, email: string) {
        // Call the original method to create the user
        const user = originalMethod.call(this, name, email);
        // Attach an id to the newly created user
        user.id = crypto.randomUUID();
        // Return the user with the attached id
        return user;
    }
}

class UserData {
    @CheckDuplicacy
    @AttachId
    createUserInfo(name: string, email: string): IUser {
        return {
            name,
            email,
        } as IUser;
    }
}

const userDataInstance = new UserData();
try {
    const userData = userDataInstance.createUserInfo('Jaskaran', 'jaskaran1@yopmail.com');
    console.log(userData);
} catch (err) {
    console.log((err as Error).message)
}
