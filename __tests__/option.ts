import { Context, Maybe, None, Option, Some } from "../src/option"

test('Option created using Maybe() on null is always created.', () => {
  let maybeName: string | null = null
  expect(Maybe(maybeName).isSome()).toBe(false)
  expect(Maybe(maybeName).isNone()).toBe(true)
  expect(() => Maybe(maybeName).get()).toThrow()
})

test('Option created using Maybe() on value is always created.', () => {
  let maybeName: string | null = "John"
  expect(Maybe(maybeName).isSome()).toBe(true)
  expect(Maybe(maybeName).isNone()).toBe(false)
  expect(Maybe(maybeName).get()).toBe("John")
})

test('Do not throw when calling Some() with value.', () => {
  expect(() => Some("Hello")).not.toThrow()
})

test('Option of T | null with value null is none.', () => {
  let someValueThatCanBeNull: Option<string> = None()
  expect(someValueThatCanBeNull.isSome()).toBe(false)
  expect(someValueThatCanBeNull.isNone()).toBe(true)
})

test('Option of T | null with non null value is some.', () => {
  let someValueThatCanBeNull: Option<string> = Some("Hello")
  expect(someValueThatCanBeNull.isSome()).toBe(true)
  expect(someValueThatCanBeNull.isNone()).toBe(false)
})

test('Return the value when calling get() on Option with set value.', () => {
  let someValue: Option<number> = Some(5)
  expect(someValue.get()).toBe(5)
})

test('Throw when called get() on none.', () => {
  let someValue: Option<string> = None()
  expect(() => someValue.get()).toThrow()
})

test('Throw when called get() on none with custom message.', () => {
  let someValue: Option<string> = None()
  expect(() => someValue.get("No value present")).toThrow("No value present")
})

test('Return set value when calling or() on some.', () => {
  let someValue: Option<number> = Some(11)
  expect(someValue.or(22)).toBe(11)
})

test('Return the fallback value when calling or() on none.', () => {
  let someValue: Option<number> = None()
  expect(someValue.or(22)).toBe(22)
})

test('When called map() on some execute map function.', () => {
  let someValue: Option<number> = Some(33)
  expect(someValue.map(v => v * 2).get()).toBe(66)
})

test('Mapper function is called when Option is some.', () => {
  let someValue: Option<number> = Some(5)

  let wasCalled = false
  let mapper = (value: number) => {
    wasCalled = true
    return value * 2
  }

  someValue.map(mapper)

  expect(wasCalled).toBe(true)
})

test('Mapper function is NOT called when Option is none.', () => {
  let someValue: Option<number> = None()

  let wasCalled = false
  let mapper = (value: number) => {
    wasCalled = true
    return value * 2
  }

  someValue.map(mapper)

  expect(wasCalled).toBe(false)
})

test('Call action when calling ifPresent() on some.', () => {
  let someValue: Option<number> = Some(44)
  let wasCalled = false
  let action = (v: number) => {
    wasCalled = true
  }

  someValue.ifPresent(action)

  expect(wasCalled).toBe(true)
})

test('Do not call action when calling ifPresent() on none.', () => {
  let someValue: Option<number> = None()
  let wasCalled = false
  let action = (v: number) => {
    wasCalled = true
  }

  someValue.ifPresent(action)

  expect(wasCalled).toBe(false)
})

test('Return value when called orNull() on some.', () => {
  let someValue: Option<number> = Some(123)
  expect(someValue.orNull()).toBe(123)
})

test('Return null when called orNull() on none.', () => {
  let someValue: Option<number> = None()
  expect(someValue.orNull()).toBe(null)
})

test('Return value when called orUndefined() on some.', () => {
  let someValue: Option<number> = Some(123)
  expect(someValue.orUndefined()).toBe(123)
})

test('Return undefined when called orUndefined() on none.', () => {
  let someValue: Option<number> = None()
  expect(someValue.orUndefined()).toBe(undefined)
})

test('Call action when calling ifEmpty() on none.', () => {
  let someValue: string | null = null

  let wasCalled = false
  let action = () => {
    wasCalled = true
  }
  Maybe(someValue).ifEmpty(action)

  expect(wasCalled).toBe(true)
})

test('Do not call action when calling ifEmpty() on some.', () => {
  let someValue: string | null = "Hello"

  let wasCalled = false
  let action = () => {
    wasCalled = true
  }
  Maybe(someValue).ifEmpty(action)

  expect(wasCalled).toBe(false)
})

test('Call noneAction when calling ifPresentOrElse() on none.', () => {
  let someValue: string | null = null

  let someCalled = false
  let someAction = () => {
    someCalled = true
  }

  let noneCalled = false
  let noneAction = () => {
    noneCalled = true
  }


  Maybe(someValue).ifPresentOrElse(someAction, noneAction)

  expect(someCalled).toBe(false)
  expect(noneCalled).toBe(true)
})

test('Call noneAction when calling ifPresentOrElse() on none.', () => {
  let someValue: string | null = "Hello"

  let someCalled = false
  let someAction = () => {
    someCalled = true
  }

  let noneCalled = false
  let noneAction = () => {
    noneCalled = true
  }


  Maybe(someValue).ifPresentOrElse(someAction, noneAction)

  expect(someCalled).toBe(true)
  expect(noneCalled).toBe(false)
})

test('Do not call noneAction() when the values is some.', () => {
  let maybeName: Option<string> = Some('John')
  let actionCalled = false
  let noneAction = (): Option<string> => {
    actionCalled = true
    return None()
  }
  let name = maybeName.orElseGet(noneAction)
  expect(actionCalled).toBe(false)
  expect(name.isSome()).toBe(true)
  expect(name.get()).toBe("John")
})

test('Call noneAction() when the values is none. Option is none.', () => {
  let maybeName: Option<string> = None()
  let actionCalled = false
  let noneAction = (): Option<string> => {
    actionCalled = true
    return None()
  }
  let name = maybeName.orElseGet(noneAction)
  expect(actionCalled).toBe(true)
  expect(name.isSome()).toBe(false)
  expect(() => name.get()).toThrow()
})

test('Call noneAction() when the values is none. Option is now some.', () => {
  let maybeName: Option<string> = None()
  let actionCalled = false
  let noneAction = (): Option<string> => {
    actionCalled = true
    return Some("Tom")
  }
  let name = maybeName.orElseGet(noneAction)
  expect(actionCalled).toBe(true)
  expect(name.isSome()).toBe(true)
  expect(name.get()).toBe("Tom")
  expect(() => name.get()).not.toThrow()
})

test('Context resolved to Some when get() does not throw.', () => {
  interface Person {
    name: string,
    age: number
  }

  let name = Maybe("Tom")
  let age = Maybe(45)

  let person: Option<Person> = Context(() => {
    return Some({ name: name.get(), age: age.get() })
  })

  expect(person.isSome()).toBe(true)
  expect(person.get().name).toBe("Tom")
  expect(person.get().age).toBe(45)
})

test('Context resolved to None when get() throws.', () => {
  interface Person {
    name: string,
    age: number
  }

  let name = Maybe("Tom")
  let age: Option<number> = None()

  let person: Option<Person> = Context(() => {
    return Some({ name: name.get(), age: age.get() })
  })

  expect(person.isSome()).toBe(false)
})

test('And function is NOT called when Option is none.', () => {
  let someValue: Option<number> = None()

  let wasCalled = false
  let and = (value: number): boolean => {
    wasCalled = true
    return value > 0
  }

  someValue.and(and)

  expect(wasCalled).toBe(false)
})

test('And function is called when Option is some.', () => {
  let someValue: Option<number> = Some(1)

  let wasCalled = false
  let and = (value: number): boolean => {
    wasCalled = true
    return value > 0
  }

  someValue.and(and)

  expect(wasCalled).toBe(true)
})

test('And returns true when value is Some and matches predicate.', () => {
  let someValue: Option<number> = Some(1)

  let wasCalled = false
  let and = (value: number): boolean => {
    wasCalled = true
    return value == 1
  }

  expect(someValue.and(and)).toBe(true)
})

test('And returns false when value is Some and does NOT match predicate.', () => {
  let someValue: Option<number> = Some(1)

  let wasCalled = false
  let and = (value: number): boolean => {
    wasCalled = true
    return value == 23
  }

  expect(someValue.and(and)).toBe(false)
})

test('And returns false when value is None.', () => {
  let someValue: Option<number> = None()

  let wasCalled = false
  let and = (value: number): boolean => {
    wasCalled = true
    return value == 23
  }

  expect(someValue.and(and)).toBe(false)
})
