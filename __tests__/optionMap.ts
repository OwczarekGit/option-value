import { OptionMap } from '../src/optionMap'

test('Calling get() that does NOT exist returns none.', () => {
  let names = new OptionMap<number, string>()
  names.set(1, "Adam")
  names.set(2, "Bob")
  names.set(3, "Claire")

  let name = names.maybeGet(222)

  expect(name.isNone()).toBe(true)
  expect(name.isSome()).toBe(false)
  expect(() => name.get()).toThrow()
})

test('Calling get() that does exist returns some.', () => {
  let names = new OptionMap<number, string>()
  names.set(1, "Adam")
  names.set(2, "Bob")
  names.set(3, "Claire")

  let name = names.maybeGet(2)

  expect(name.isNone()).toBe(false)
  expect(name.isSome()).toBe(true)
  expect(name.get()).toBe("Bob")
})


test('Calling getOrAdd() when key exists returns element.', () => {
  let numbers = new OptionMap<string, number>()

  numbers.set('a', 1)
  numbers.set('b', 2)
  numbers.set('c', 3)

  expect(numbers.getOrAdd('b', 42)).toBe(2)
})

test('Calling getOrAdd() when key does NOT exist returns alternative.', () => {
  let numbers = new OptionMap<string, number>()

  numbers.set('a', 1)
  numbers.set('b', 2)
  numbers.set('c', 3)

  expect(numbers.getOrAdd('d', 4)).toBe(4)
})

test('Calling fromMap has the same size as original map.', () => {
  let map = new Map()
  map.set(1, 'one')
  map.set(2, 'two')
  map.set(3, 'three')

  let optMap = OptionMap.fromMap(map)

  expect(optMap.size).toBe(3)
})

test('Calling fromMap has the same items as original map.', () => {
  let map = new Map()
  map.set(1, 'one')
  map.set(2, 'two')
  map.set(3, 'three')

  let optMap = OptionMap.fromMap(map)

  expect(optMap.maybeGet(1).get()).toBe('one')
  expect(optMap.maybeGet(2).get()).toBe('two')
  expect(optMap.maybeGet(3).get()).toBe('three')
})
