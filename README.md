# GrumpyDI

A simple DI container.

### Installation

```
npm i grumpydi --save
```

### Import

```js
import GrumpyDI from "grumpydi";
```

### How to us

First of all you need to create new container and define object with your objects in it.

```js
import GrumpyDI from "grumpydi";

GrumpyDI({ Example1, Example2 });
```

DI container pass itself in constructor of all objects, so you can easily destructure it.

Let's implement Example1 and Example2

```js
class Example1 {
    onInit ({ Example2 }) {
        console.log(Example2.number * 2);
    }
}

class Example2 {
    constructor (di, number, secondNumber) {
        this.number = number;
        this.secondNumber = secondNumber;
    }
}
```

As you can see we have in **Example1** method **onInit**.
This method will be called when all objects have been registered into DI.
Like in constructor, to **onInit** method is passed DI container.

On top of that we need to pass parameters to constructor in Example2, so let's change our object a little bit.

```js
import GrumpyDI from "grumpydi";

class Example1 {
    onInit ({ Example2 }) {
        console.log((Example2.number + Example2.secondNumber) * 2);
    }
}

class Example2 {
    constructor (di, number, secondNumber) {
        this.number = number;
        this.secondNumber = secondNumber;
    }
}

GrumpyDI({
    Example1,
    Example2: [Example2, 2, 1]
});
```

You can add additional object through registerObject function.

```js
const di = GrumpyDI({ 
    Example1,
    Example2: [Example2, 2, 1]
});

di.registerObject({
    test: function() {}
});
```