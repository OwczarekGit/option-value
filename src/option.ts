/**
 * Wrapper class used as an alternative way of handling nullable value.
 * 
 * Eposes methods for functional handling of inner value.
 * 
 * Use Some(), Maybe() or None() to instantiate.
 */
export class Option<T> {
    /**
     * Internal value that the object will operate on.
     */
    private value: T | undefined | null
    private constructor() {}
    
    /**
     * Instantiates Option\<T\>, for internal use only.
     * 
     * @deprecated Use Some(), Maybe() or None() to instantiate Option\<T\>.
     */
    public static of<T>(v: T | null | undefined): Option<T> {
        if (v == null || v == undefined) {
            let o = new Option<T>()
            return o
        } else {
            let o = new Option<T>()
            o.value = v
            return o
        }
    }
    
    /**
     * Instantiates Option\<T\> as empty, for internal use only.
     * 
     * @deprecated Use None() to instantiate Option\<T\> as empty.
     */
    public static empty<T>(): Option<T> {
        return new Option<T>
    }

    /**
     * Return the internal value.
     * 
     * @throws Error when internal value was null or undefined.
     * 
     * @param msg Custom message explaining why calling get() is safe.
     * @example <caption>Returns inner value.</caption>
     * let name: Option<string> = Some("John")
     * assert(name.get('The name was set initially.') == "John")
     *
     * @example <caption>Throws an error when value was null.</caption>
     * let name: Option<string> = None()
     * throws(name.get())
     */
    public get(msg?: string): T {
        if (this.value != null) return this.value
        else {
            if (msg) throw new Error(msg)
            else throw new Error("Called `get()` on null value.")
        }
    }

    /**
     * Returns internal value, or fallback when it was null.
     * 
     * @example <caption>Returns inner value.</caption> 
     * let name: Option<string> = Some("John")
     * assert(name.or("Karen") == "John")
     *
     * @example <caption>Returns fallback value.</caption> 
     * let name: Option<string> = None()
     * assert(name.or("Karen") == "Karen")
     */
    public or(fallback: T): T {
        if (this.value != null) {
            return this.value
        } else {
            return fallback
        }
    }
    
    /**
     * Converts Option\<T\> to Option\<Y\>.
     * 
     * @example <caption>Returns string from internal person value.</caption> 
     * let person: Option<Person> = Some({name: "John", age: 34})
     * let name: Option<string> = person.map(v => v.name)
     * assert(name.get() == "John")
     *
     * @example <caption>Converts to matching type for function declaration.</caption> 
     * function func(): Option<string> {
     *      let person: Option<Person> = Some({name: "John", age: 34})
     *      return person.map(v => v.name)
     * }
     * 
     * let name: Option<string> = func()
     * assert(name.get() == "John")
     */
    public map<Y>(actionWithValue: (v: T) => Y): Option<Y> {
        if(this.isSome()) {
            return Option.of(actionWithValue(this.get()))
        } else {
            return Option.empty()
        }
    }
    
    /**
     * Calls action when inner value is NOT null.
     * 
     * @example <caption>Calls action.</caption>
     * let name: Option<string> = Some("John")
     * name.ifPresent(n => console.log(`Hello my name is ${n}.`))
     *
     * @example <caption>Does not call action.</caption>
     * let name: Option<string> = None()
     * name.ifPresent(n => {
     *   // This is not executed.
     *   console.log(`Hello my name is ${n}.`)
     * })
     */
    public ifPresent(action: (v: T) => void) {
        if (this.isSome()) action(this.get());
    }
    
    /**
     * Calls action when inner value is null.
     * 
     * @example <caption>Calls action.</caption>
     * let name: Option<string> = None()
     * name.ifEmpty(() => console.log(`My name is not set.`))
     *
     * @example <caption>Does not call action.</caption>
     * let name: Option<string> = Some("John")
     * name.ifEmpty(() => {
     *   // This is not executed.
     *   console.log(`My name is set.`)
     * })
     */
    public ifEmpty(action: () => void) {
        if (this.isNone()) action()
    }

    /**
     * Combination of ifPresent() and ifEmpty().
     * 
     * Calls someAction when inner value is NOT null, calls noneAction otherwise.
     * 
     * Use if you want to act depending on presence of the inner value.
     */
    public ifPresentOrElse(someAction: (v: T) => void, noneAction: () => void) {
        if (this.isSome())
            someAction(this.get())
        else
            noneAction()
    }

    /**
     * Converts Option\<T\> to T | null.
     * 
     * Use to easily interop with interfaces that don't use Option.
     * 
     * @example <caption>Returns value.</caption>
     * function func(name: string | null) { ... }
     * 
     * let name: Option<string> = Some("John")
     * assert(name.orNull() == "John")
     * func(name.orNull())
     *
     * @example <caption>Returns null.</caption>
     * function func(name: string | null) { ... }
     * 
     * let name: Option<string> = None()
     * assert(name.orNull() == null)
     * func(name.orNull())
     */
    public orNull(): T | null {
        if (this.isSome()) return this.get()
        else return null
    }

    /**
     * Returns true if the internal value is null, false otherwise.
     */
    public isNone(): boolean {
        if (this.value == null || this.value == undefined) return true
        else return false
    }

    /**
     * Returns true if the internal value is NOT null, false otherwise.
     */
    public isSome(): boolean {
        return !this.isNone()
    }
}

/**
 * Creates Option\<T\> from non null value.
 *
 * Signifies that the caller assures that provided value is non-null.
 *
 * Should be used when creating Option from a value that surely won'b be null.
 * @throws Error when null or undefined is pased in.
 * @example <caption>Creates Option\<string\> from string "John".</caption>
 * let optionName: Option<string> = Some("John")
 */
export function Some<T>(val: T): Option<T>  {
    if (val == undefined || val == null)
        throw new Error(`Cannot create Option from null/undefined by using Some(). Use None() instead.`)
    return Option.of<T>(val)
}

/**
 * Creates Option\<T\> from nullable value.
 * 
 * Signifies that the caller isn't certain if the value is null.
 * 
 * Should be used when creating Option when it can be null.
 * @example <caption>Creates Option\<string\> from string | null.</caption>
 * let name: string | null = null
 * let optionName: Option<string> = Maybe(name)
 */
export function Maybe<T>(val: T | null | undefined): Option<T>  {
    if (val == undefined || val == null) 
        return None()
    else
        return Some(val)
}

/**
 * Creates empty Option\<T\>.
 * 
 * Usefull when creating an Option\<T\> that is initially empty.
 * @example <caption>Creates Option\<string\> with empty value.</caption>
 * let name: Option<string> = None()
 */
export function None<T>(): Option<T>  {
    return Option.empty<T>()
}