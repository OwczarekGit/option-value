import { Maybe, Option } from "./option"

export class OptionMap<K,V> extends Map<K,V> {
    //@ts-ignore
    override get(key: K): Option<V> {
        //@ts-ignore
        return Maybe(super.get(key))        
    }
}

