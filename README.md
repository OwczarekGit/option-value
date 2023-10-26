# option-value
Handle nullable values in more convenient functional way.

## Links:
[npm](https://www.npmjs.com/package/option-value) | [GitHub](https://github.com/OwczarekGit/option-value)

## Example usage:
```ts
import { Maybe } from 'option-value'

function func(): string | null { ... }
function process(value: string) { ... }

// Use
Maybe(func()).ifPresent(process)

// Instead of
let maybeString: string | null = func()
if (maybeString != null) {
  process(maybeString)
}
```
