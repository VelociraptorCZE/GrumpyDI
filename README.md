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

### How to use

First of all you need to create new container and define object with your objects in it.

```js
import GrumpyDI from "grumpydi";

GrumpyDI({ Example1, Example2 });
```

DI container pass itself in onInit function if found in the object, so you can easily destructure it.

Let's implement Example1 and Example2

```js
class Example1 {
    onInit ({ Example2 }) {
        console.log((Example2.number + Example2.secondNumber) * 2);
    }
}

class Example2 {
    constructor (number, secondNumber) {
        this.number = number;
        this.secondNumber = secondNumber;
    }
}
```

### onInit()

We have defined method called **onInit** in **Example1**.
This method will be called when all objects were registered into DI container.

We need to pass parameters to constructor in Example2, so let's change our object a little bit.

```js
import GrumpyDI from "grumpydi";

class Example1 {
    onInit ({ Example2 }) {
        console.log((Example2.number + Example2.secondNumber) * 2);
    }
}

class Example2 {
    constructor (number, secondNumber) {
        this.number = number;
        this.secondNumber = secondNumber;
    }
}

GrumpyDI({
    Example1,
    Example2: [Example2, 2, 1]
});
```

### registerObject()

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
