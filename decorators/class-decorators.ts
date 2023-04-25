/*

In TypeScript, a class decorator is a special kind of decorator that can be used to modify the behavior of a class. 
A class decorator is applied to the class declaration and receives a single parameter:

    1. The constructor function of the class being decorated.

*/

// simple decorator
function BaseEntity(ctr: Function) {
    console.log("base entity decorator called")
    ctr.prototype.id = crypto.randomUUID();
    ctr.prototype.created = new Date().toLocaleString("es-ES");
}

// decorator factory
// decorator factory is the function that return the decorator function itself
function BooksCount(count: number) {
    console.log("books count evaluated")
    return function (constructor: Function) {
        console.log("books count called")
        constructor.prototype.booksCount = count;
    }
}

function StudentCount(count: number) {
    console.log("student count evaluated")
    return function (constructor: Function) {
        console.log("student count called")
        constructor.prototype.studentCount = count;
    }
}

@BaseEntity
@BooksCount(4)
@StudentCount(500)
class Course {
    private id!: string;
    private created!: Date;
    private booksCount!: number;
    private studentCount!: number;

    constructor(private name: string) { }

    get courseDetails() {
        return {
            name: this.name,
            id: this.id,
            created: this.created,
            booksCount: this.booksCount,
            studentCount: this.studentCount
        };
    }
}

try {
    const mathsCourse = new Course("Maths");
    console.log(mathsCourse.courseDetails);
} catch (err) {
    console.log((err as Error).message);
}


// OUTPUT

// books count evaluated
// student count evaluated
// student count called
// books count called
// base entity decorator called
// {
//   "name": "Maths",
//   "id": "42b879c8-21d6-477e-8e0a-2f50bdcdcc29",
//   "created": "21/4/2023, 13:14:53",
//   "booksCount": 4,
//   "studentCount": 500
// } 