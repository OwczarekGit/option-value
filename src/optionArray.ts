import { Maybe, Some, None, Option } from './option'

/**
 * Drop in replacement for Array\<T\>.
 *
 * Provides additional methods that return Option\<T\> instead of null, undefined or -1.
 */
export class OptionArray<T> extends Array<T> {

  /**
  * Creates OptionArray\<T\> from passed in standard array.
  * Returns array with the same order, and length.
  * @example <caption>Convert array of numbers to array of optional numbers.</caption>
  * let nums = [1,2,3,4]
  * let arr = OptionArray.fromArray(nums)
  * assert(arr.length == 4)
  * assert(arr.maybeAt(2).isSome() == true)
  * assert(arr.maybeAt(2).get() == 3)
  */
  public static fromArray<T>(array: T[]): OptionArray<T> {
    const me = new OptionArray<T>()
    array.forEach(item => me.push(item))
    return me
  }

  /**
   * Return item at specified index as an Option\<T\>.
   *
   * @example <caption>Get the element at index 1.</caption>
   * let arr = new OptionArray<number>()
   * arr.push(1)
   * arr.push(2)
   * arr.push(3)
   * assert(arr.maybeAt(1).get() == 2)
   */
  public maybeAt(index: number): Option<T> {
    return Maybe(this.at(index))
  }

  /**
   * Returns the last element of the array as an Option\<T\>.
   *
   * @example <caption>Return last element (3).</caption>
   * let arr = new OptionArray<number>()
   * arr.push(1)
   * arr.push(2)
   * arr.push(3)
   * assert(arr.maybePop().get() == 3)
   */
  public maybePop(): Option<T> {
    return Maybe(this.pop())
  }

  /**
  * Returns the index of the first element matching the predicate as an Option\<T\>.
  *
  * @example <caption>Return element where value equals 3.</caption>
  * let arr = new OptionArray<number>()
  * arr.push(1)
  * arr.push(2)
  * arr.push(3)
  * assert(arr.maybeFindIndex(v => v == 3).get() == 2)
  */
  public maybeFindIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): Option<number> {
    let index: number = this.findIndex(predicate)
    if (index === -1)
      return None()
    else
      return Some(index)
  }

  /**
   * Returns the first element matching the predicate as an Option\<T\>.
   *
   * @example <caption>Return element where value equals 2.</caption>
   * let arr = new OptionArray<number>()
   * arr.push(1)
   * arr.push(2)
   * arr.push(3)
   * assert(arr.maybeFind(v => v == 2).get() == 2)
   */
  public maybeFind(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): Option<T> {
    return Maybe(this.find(predicate))
  }

  /**
   * Returns the index of the first element matching the predicate as an Option\<T\>.
   *
   * @example <caption>Return element where value equals 'dog'.</caption>
   * let arr = new OptionArray<string>()
   * arr.push('cat')
   * arr.push('dog')
   * arr.push('lion')
   * assert(arr.maybeIndexOf(v => v == 'dog').get() == 1)
   */
  public maybeIndexOf(searchElement: T, fromIndex?: number | undefined): Option<number> {
    let index: number = this.indexOf(searchElement, fromIndex)
    if (index === -1)
      return None()
    else
      return Some(index)
  }

  /**
   * Returns the first element of the array as an Option\<T\>.
   *
   * @example <caption>Return first element (1).</caption>
   * let arr = new OptionArray<number>()
   * arr.push(1)
   * arr.push(2)
   * arr.push(3)
   * assert(arr.maybeShift().get() == 1)
   */
  public maybeShift(): Option<T> {
    return Maybe(this.shift())
  }
}
