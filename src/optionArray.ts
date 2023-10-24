import { Maybe, Some, None, Option } from './option'

export class OptionArray<T> extends Array<T> {

    /** @ts-expect-error */
    override at(index: number): Option<T> {
        return Maybe(super.at(index))
    }
    
    /** @ts-expect-error */
    override pop(): Option<T> {
        return Maybe(super.pop())
    }
    
    /** @ts-expect-error */
    override findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): Option<number> {
        let index: number = super.findIndex(predicate)
        if (index === -1)
            return None()
        else
            return Some(index)
    }
    
    // NOTE: There is more overrides for find().
    /** @ts-expect-error */
    override find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): Option<T> {
        return Maybe(super.find(predicate))
    }
    
    /** @ts-expect-error */
    override indexOf(searchElement: T, fromIndex?: number | undefined): Option<number> {
        let index: number = super.indexOf(searchElement, fromIndex)
        if (index === -1)
            return None()
        else
            return Some(index)
    }
    
    /** @ts-expect-error */
    override shift(): Option<T> {
        return Maybe(super.shift())
    }
}