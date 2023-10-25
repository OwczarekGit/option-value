import { Maybe, Some, None, Option } from './option'

export class OptionArray<T> extends Array<T> {

    public maybeAt(index: number): Option<T> {
        return Maybe(this.at(index))
    }
    
    public maybePop(): Option<T> {
        return Maybe(this.pop())
    }
    
    public maybeFindIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): Option<number> {
        let index: number = this.findIndex(predicate)
        if (index === -1)
            return None()
        else
            return Some(index)
    }
    
    public maybeFind(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): Option<T> {
        return Maybe(this.find(predicate))
    }
    
    public maybeIndexOf(searchElement: T, fromIndex?: number | undefined): Option<number> {
        let index: number = this.indexOf(searchElement, fromIndex)
        if (index === -1)
            return None()
        else
            return Some(index)
    }
    
    public maybeShift(): Option<T> {
        return Maybe(this.shift())
    }
}