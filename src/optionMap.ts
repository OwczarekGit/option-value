import { Maybe, Option, Some } from "./option"

/**
 * Drop in replacement for Map\<K\,V>.
 *
 * Provides additional methods that return Option\<V\> instead of null or undefined.
 */
export class OptionMap<K, V> extends Map<K, V> {

  /**
   * Returns Option\<V\>,
   * wraps get() returning the result as an Option instad of null.
   *
   * @example <caption>Returns value of key 2 as Option.</caption>
   * let map = new OptionMap<number, string>()
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

  /**
   * Returns V
   *
   * if the key is not set, it sets said key to provided alternative and return it.
   *
   * @example <caption>Returns value of key 1 when was set.</caption>
   * let map = new OptionMap<number, string>()
   * map.set(1, 'a')
   * map.set(2, 'b')
   * map.set(3, 'c')
   * assert(map.getOrAdd(1, 'new text') == 'a')
   *
   * @example <caption>Returns alternative of key 4 when was NOT set.</caption>
   * let map = new OptionMap<number, string>()
   * map.set(1, 'a')
   * map.set(2, 'b')
   * map.set(3, 'c')
   * assert(map.getOrAdd(4, 'd') == 'd')
   */
  public getOrAdd(key: K, alternative: V): V {
    let val = this.maybeGet(key)

    if (val.isNone()) {
      this.set(key, alternative)
      return this.get(key) as V
    } else
      return val.get()
  }
}
