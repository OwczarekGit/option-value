import { Maybe, Option } from "./option"

export class OptionMap<K,V> extends Map<K,V> {

    public maybeGet(key: K): Option<V> {
        return Maybe(this.get(key))        
    }
}

