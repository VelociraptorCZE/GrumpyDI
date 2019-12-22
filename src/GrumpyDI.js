/**
 * GrumpyDI
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

export default function GrumpyDI (container) {
    const objectNames = Object.keys(container);

    const registerObject = _registerObject.bind(container);
    const callOnInitFunction = _callOnInitFunction.bind(container);

    const objectRegisterCallback = objectName => {
        registerObject({ object: container[objectName], alias: objectName });
    };

    objectNames.forEach(objectRegisterCallback);
    objectNames.forEach(callOnInitFunction);

    return { container, registerObject };
}

function _callOnInitFunction (objectName) {
    const instance = this[objectName];

    if (typeof instance.onInit === "function") {
        instance.onInit(this);
    }
}

function _registerObject ({ alias, object }) {
    if (!(object instanceof Object)) {
        throw TypeError("Cannot register a non-object into DI!");
    }

    if (Array.isArray(object)) {
        const [_object, ...params] = object;
        this[alias] = new _object(...params);
    }
    else {
        this[alias] = new object();
    }
}