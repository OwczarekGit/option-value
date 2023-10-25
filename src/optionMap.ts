import { Maybe, Option } from "./option"

/**
 * Drop in replacement for Map\<K\,V>.
 * 
 * Provides additional methods that return Option\<V\> instead of nulls.
 */
export class OptionMap<K,V> extends Map<K,V> {

    /**
     * Returns Option\<V\>,
     * wraps get() returning the result as an Option instad of null.
     * 
     * @example <caption>Returns value of key 2 as Option.</caption>
     * let map = new OptionMap<number, string>();
     * map.set(1, "A")
     * map.set(2, "B")
     * map.set(3, "C")
     * assert(map.maybeGet(2).get() == "B")
     *
     * @example <caption>Returns value of key 99 as Option.</caption>
     * let map = new OptionMap<number, string>();
     * map.set(1, "A")
     * map.set(2, "B")
     * map.set(3, "C")
     * assert(map.maybeGet(99).isNone())
     */
    public maybeGet(key: K): Option<V> {
        return Maybe(this.get(key))        
    }
}

