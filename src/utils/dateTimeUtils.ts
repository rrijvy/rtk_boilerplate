import { DateTime } from "luxon";

class DateTimeUtility {
  /**
   * @function GetUnixTimestamp()
   * @returns {number}
   */
  public static GetUnixTimestamp = () => {
    const utcDateTime = DateTime.utc();
    const unixInSecond = utcDateTime.toSeconds();
    return unixInSecond;
  };

  /**
   * @function GetUnixTimestampInMillisecond()
   * @returns {number}
   */
  public static GetUnixTimestampInMillisecond = () => {
    const utcDateTime = DateTime.utc();
    const unixInMillisecond = utcDateTime.toMillis();
    return unixInMillisecond;
  };
}

export default DateTimeUtility;
