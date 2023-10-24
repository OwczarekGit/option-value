export class Option<T> {
    private value: T | undefined | null
    private constructor() {}
    
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

    public static empty<T>(): Option<T> {
        return new Option<T>
    }

    public get(msg?: string): T {
        if (this.value != null) return this.value
        else {
            if (msg) throw new Error(msg)
            else throw new Error("Called `get()` on null value.")
        }
    }

    public or(fallback: T): T {
        if (this.value != null) {
            return this.value
        } else {
            return fallback
        }
    }
    
    public map<Y>(actionWithValue: (v: T) => Y): Option<Y> {
        if(this.isSome()) {
            return Option.of(actionWithValue(this.get()))
        } else {
            return Option.empty()
        }
    }
    
    public ifPresent(action: (v: T) => void) {
        if (this.isSome()) action(this.get());
    }
    
    public orNull(): T | null {
        if (this.isSome()) return this.get()
        else return null
    }

    public isNone(): boolean {
        if (this.value == null || this.value == undefined) return true
        else return false
    }

    public isSome(): boolean {
        return !this.isNone()
    }
}

export function Some<T>(val: T): Option<T>  {
    if (val == undefined || val == null)
        throw new Error(`Cannot create Option from null/undefined by using Some(). Use None() instead.`)
    return Option.of<T>(val)
}

export function None<T>(): Option<T>  {
    return Option.empty<T>()
}

export function Maybe<T>(val: T | null | undefined): Option<T>  {
    if (val == undefined || val == null) 
        return None()
    else
        return Some(val)
}