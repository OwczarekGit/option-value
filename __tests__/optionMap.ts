import { OptionMap } from '../src/optionMap'

test('Calling get() that does NOT exist returns none.' , () => {
    let names = new OptionMap<number, string>()
    names.set(1, "Adam")
    names.set(2, "Bob")
    names.set(3, "Claire")
    
    let name = names.get(222)
    
    expect(name.isNone()).toBe(true)
    expect(name.isSome()).toBe(false)
    expect(() => name.get()).toThrow()
})

test('Calling get() that does exist returns some.' , () => {
    let names = new OptionMap<number, string>()
    names.set(1, "Adam")
    names.set(2, "Bob")
    names.set(3, "Claire")
    
    let name = names.get(2)
    
    expect(name.isNone()).toBe(false)
    expect(name.isSome()).toBe(true)
    expect(name.get()).toBe("Bob")
})
