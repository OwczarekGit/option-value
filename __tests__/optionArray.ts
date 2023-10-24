import { OptionArray } from '../src/optionArray'

test('When called at() on invalid index return none.', () => {
    let arr = new OptionArray<number>()
    arr.push(1)
    arr.push(2)
    let n3 = arr.at(3)
    expect(n3.isNone())
})

test('When called at() on valid index return some.', () => {
    let arr = new OptionArray<number>()
    arr.push(1)
    arr.push(2)
    let n1 = arr.at(1)
    expect(n1.isSome())
})

test('Calling pop() on valid value returns some.' , () => {
    let arr = new OptionArray<number>()
    arr.push(1)
    let item = arr.pop()
    expect(item.isNone()).toBe(false)
    expect(item.isSome()).toBe(true)
    expect(item.get()).toBe(1)
})

test('Calling pop() on null value returns none.' , () => {
    let arr = new OptionArray<number>()
    let item = arr.pop()
    expect(item.isNone()).toBe(true)
    expect(item.isSome()).toBe(false)
    expect(() => item.get()).toThrow()
})

test('Return some when calling findIndex() on valid value.', () => {
    let arr = new OptionArray<number>()
    arr.push(1)
    arr.push(2)
    arr.push(3)
    let el = arr.findIndex(e => e === 2)
    expect(el.isSome()).toBe(true)
    expect(el.isNone()).toBe(false)
    expect(el.get()).toBe(1)
})

test('Return none when calling findIndex() on invalid value.', () => {
    let arr = new OptionArray<number>()
    arr.push(1)
    arr.push(2)
    arr.push(3)
    let el = arr.findIndex(e => e === 22)
    expect(el.isSome()).toBe(false)
    expect(el.isNone()).toBe(true)
    expect(() => el.get()).toThrow()
})

test('Return some when calling find() on valid value.', () => {
    type Person = {name: string}
    let arr = new OptionArray<Person>()
    arr.push({name: "Adam"})
    arr.push({name: "Bob"})
    arr.push({name: "Claire"})
    let el = arr.find(e => e.name == "Adam")
    expect(el.isSome()).toBe(true)
    expect(el.isNone()).toBe(false)
    expect(el.get().name).toBe("Adam")
})

test('Return none when calling find() on invalid value.', () => {
    type Person = {name: string}
    let arr = new OptionArray<Person>()
    arr.push({name: "Adam"})
    arr.push({name: "Bob"})
    arr.push({name: "Claire"})
    let el = arr.find(e => e.name == "Scott")
    expect(el.isSome()).toBe(false)
    expect(el.isNone()).toBe(true)
    expect(() => el.get()).toThrow()
})

test('Return some when called indexOf() on valid value.', () => {
    let animals = new OptionArray<string>()
    animals.push('lion')
    animals.push('tiger')
    animals.push('cat')
    let el = animals.indexOf('cat')
    expect(el.isSome()).toBe(true)
    expect(el.isNone()).toBe(false)
    expect(el.get()).toBe(2)
})

test('Return none when called indexOf() on invalid value.', () => {
    let animals = new OptionArray<string>()
    animals.push('lion')
    animals.push('tiger')
    animals.push('cat')
    let el = animals.indexOf('dog')
    expect(el.isSome()).toBe(false)
    expect(el.isNone()).toBe(true)
    expect(() => el.get()).toThrow()
})

test('Return some when called shift() on non empty array.', () => {
    let animals = new OptionArray<string>()
    animals.push('dog')
    animals.push('cat')
    let el = animals.shift()
    expect(el.isSome()).toBe(true)
    expect(el.isNone()).toBe(false)
    expect(el.get()).toBe('dog')
})

test('Return none when called shift() on empty array.', () => {
    let animals = new OptionArray<string>()
    let el = animals.shift()
    expect(el.isSome()).toBe(false)
    expect(el.isNone()).toBe(true)
    expect(() => el.get()).toThrow()
})