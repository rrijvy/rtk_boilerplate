class ObjectUtility {
  /**
   * @function StringIncludes<T>() Match string inside object within string properties
   * @param obj Object
   * @param str String to match
   * @returns {boolean}
   */
  public static StringIncludes<T extends object>(obj: T, str = ""): boolean {
    const preparatorFunc = String.prototype.toUpperCase;
    const _str: string = preparatorFunc.call(str);
    return Object.keys(obj).some((key) => {
      const _obj = obj as Record<string, unknown>;
      const _objData = _obj[key];
      return typeof _objData === "string" && preparatorFunc.call(_objData).includes(_str);
    });
  }

  /**
   * @function ExtractValueByKey<T>() Match keys in object and return value as string. If not string apply, JSON.stringify
   * @param obj Object
   * @param str String to match with object key
   * @returns {string}
   */
  public static ExtractValueByKey<T extends object>(obj: T, str = ""): string {
    const _obj = obj as Record<string, unknown>;
    for (const key in _obj) {
      if (key.toUpperCase() === str.toUpperCase()) {
        const _objData = _obj[key];
        if (typeof _objData === "string") {
          return _objData;
        } else if (typeof _objData === "object" && Array.isArray(_objData) && _objData.length > 0) {
          return _objData.join(", ");
        } else {
          return "";
        }
      }
    }
    return "";
  }

  /**
   * @function IsEmpty<T>() Check is object is empty or have values in it.
   * @param obj Object
   * @returns {boolean}
   */
  public static IsEmpty<T extends object>(obj: T) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
}

export default ObjectUtility;
