Stage 1: Callbacks shows us how nested callbacks give us control over Asynchronous code
Pro’s: ES5, Simple to understand, Node.js API works this way
Con’s: Messy refactors, code nesting levels jump around
Stage 2: Promises gives us the power of callbacks but keeps code from getting out of hand
Pro’s: ES5 with polyfill, nesting is under control
Con’s: Verbose syntax
Stage 3: Generators/Yields describes generators and how they can get a bit messy
Pro’s: Works great with iterators, parts of functions can be executed in future
Con’s: ES6 or transpile, painful to manually manage execution
Stage 3.5: Generators/Yields + co is a great solution you can use today
Pro’s: The advantage of using Generators without manually managing yields
Con’s: ES6 or transpile
Stage 4: Async/Await is an amazing solution you can use tomorrow
Pro’s: Eloquent syntax
Con’s: ES7 currently requires transpile regardless of environment