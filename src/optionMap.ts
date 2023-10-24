import { Maybe, Option } from "./option"

export class OptionMap<K,V> extends Map<K,V> {

    /** @ts-expect-error */
    override get(key: K): Option<V> {
        return Maybe(super.get(key))        
    }
}

