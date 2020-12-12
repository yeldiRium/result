# result

An algebraic datatype wrapper for results and errors.

## Status

| Category         | Status                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/@yeldirium/result)](https://www.npmjs.com/package/@yeldirium/result) |
| Dependencies     | ![David](https://img.shields.io/david/yeldirium/result)                                                   |
| Dev dependencies | ![David](https://img.shields.io/david/dev/yeldirium/result)                                               |
| Build            | ![GitHub Actions](https://github.com/yeldirium/result/workflows/Release/badge.svg?branch=main)            |
| License          | ![GitHub](https://img.shields.io/github/license/yeldirium/result)                                         |

## Installation

```shell
$ npm install @yeldirium/result
```

## What is this and why would I use it

Error handling is an integral part of reliable applications. Unfortunately, TypeScript does not provide a way to type-check exceptions or to even annotate functions with information about the exceptions they might throw. This makes all exceptions in TypeScript unchecked, unpredictable and unreliable.

In addition to that, JavaScript - and by extension, TypeScript - does not differentiate between recoverable errors and unrecoverable errors. I recommend [this blog post by Joe Duffy](http://joeduffyblog.com/2016/02/07/the-error-model/) on the difference between the two and various ways to implement them.

This library aims to differentiate between recoverable errors and unrecoverable ones, by wrapping recoverable errors in a data structure. This approach is a more fancy version of the basic concept of error codes. Wrapping errors in data structures that have semantics is an attempt to bring concepts from languages like Haskell into TypeScript. Consider this situation:

```typescript
const configuration = await loadConfiguration();

await startServer(configuration.port ?? 3000);
```

Here, `loadConfiguration` might fail for several reasons. It might load something from disk and that might fail because the config file does not exist. It might also fail because the configuration file is too large and the process runs out of memory. The former we want to handle - since we have default value for the port. The latter we do not want to handle, since we can't do anything about it. So imagine, `loadConfiguration` would announce its recoverable errors in its signature:

```typescript
import fs from 'fs';
import { fail, okay, unpackOrDefault } from '@yeldirium/result';

const loadConfiguration = async function (): Promise<Result<Configuration, ConfigurationNotFound>> {
  try {
    return okay(
      JSON.parse(
        await fs.promises.readFile(configFilePath, 'utf-8')
      )
    );
  } catch (ex) {
    if (ex.code === 'ENOENT') {
      return fail(new ConfigurationNotFound());
    }
  }
};

const configuration = await loadConfiguration();

const port = unpackOrDefault({ port: 3000 }, configuration);

await startServer(configuration.port);
```

Here, any errors related to the configuration file missing are caught, propagated and handled explicitly. If `JSON.parse` fails or if the process runs out of memory, an exception will be thrown and *not* handled.

## API Overview

There are two ways to construct a `Result`. A result can either be `Okay` or `Fail`:

```typescript
import { Okay, okay, Fail, fail, Result } from '@yeldirium/result';

const failedResult: Fail<Error> = fail(new Error());
const successfulResult: Okay<number> = okay(5);

// Both are assignable to a Result with the right type parameters.
let result = Result<number, Error>;
result = failedResult;
result = successfulResult;
```

When you get a result from a function, you can check whether it has failed and act appropriately:

```typescript
import { isFailed, Result } from '@yeldirium/result';

const someResult: Result<number, Error> = calculateStuff();

if (isFailed(someResult)) {
  // Propagate the error so that callers can maybe handle it.
  return someResult;
}

console.log(someResult.value);
```

Alternatively you can use `isOkay` to achieve the opposite.

There is a more convenient solution, if you don't need to propagate your errors:

```typescript
import { isFailed, Result, unpackOrCrash, unpackOrDefault } from '@yeldirium/result';

const someResult: Result<number, Error> = calculateStuff();

const value = unpackOrDefault(17, someResult);

// Or, if you can not handle the possible errors appropriately and instead want to crash your application:
const value = unpackOrCrash(someResult);
```

## Running the quality assurance

To lint and test this package use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```
