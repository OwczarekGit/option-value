import { Maybe, Some, None, Option } from '../src/option'

export class OptionArray<T> extends Array<T> {
    //@ts-ignore
    override at(index: number): Option<T> {
        //@ts-ignore
        return Maybe(super.at(index))
    }
    
    //@ts-ignore
    override pop(): Option<T> {
        //@ts-ignore
        return Maybe(super.pop())
    }
    
    //@ts-ignore
    override findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): Option<number> {
        let index: number = super.findIndex(predicate)
        if (index === -1)
            return None()
        else
            return Some(index)
    }
    
    // NOTE: There is more overrides for find().
    //@ts-ignore
    override find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): Option<T> {
        //@ts-ignore
        return Maybe(super.find(predicate))
    }
    
    //@ts-ignore
    override indexOf(searchElement: T, fromIndex?: number | undefined): Option<number> {
        let index: number = super.indexOf(searchElement, fromIndex)
        if (index === -1)
            return None()
        else
            return Some(index)
    }
    
    //@ts-ignore
    override shift(): Option<T> {
        //@ts-ignore
        return Maybe(super.shift())
    }
}