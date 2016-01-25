# PromiseDelay
Simple delay promise.

### Description
This is realization of a small and simple delay promise, that supports CommonJS, AMD ang non-module definition.

The module is function, that extends any promise constructor and first of all, you'll need to call this function to extend promise constructor.

Injection for CommonJS:
```javascript
require('promise-ext-delay')();
```

Injection for AMD:
```javascript
require(['promiseDelay'], function(PromiseDelay){
    PromiseDelay();
});
```

Injection for non-module environment:
```html
<script src="promiseDelay.min.js"></script>
<script>
    PromiseDelay(); //in non-module environment, global function PromiseDelay will be created
</script>
```

The function that injects delay promise have 2 parameters:
- `PromiseConstructor` - just function-constructor, that will be extended. If nothing is passed, then default promise constructor will be used.
- `extName` - name of the delay function/method. If nothing is passed, then `delay` will be used. Can be passed instead of the first parameter.

Some examples of injection:
```javascript
PromiseDelay(); //or
PromiseDelay(YourCustomPromiseConstructor, 'methodName'); //or
PromiseDelay('methodName');
```

After injection, you'll may use delay promise:

**As static function**
```javascript
Promise.delay(1000).then(function(){...})
```
**Or as object method**
```javascript
var p = new Prmise(function(resolve){
    resolve('some value');
});

p.delay(5000).then(function(){...});
```

Notice that delay promise will pass promise value through itself, therefore you'll receive your value in promise chain after delay promise.
