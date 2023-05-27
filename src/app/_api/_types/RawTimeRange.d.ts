interface RawTimeRange {
  /** 系統流水號 */
  uuid: string;
  /** 星期 */
  weekday: Weekday;
  /** 開始時間 */
  startTime: string;
  /** 結束時間 */
  endTime: string;
}
