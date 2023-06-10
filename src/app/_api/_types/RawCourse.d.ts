interface RawCourse {
  /** 選課代號（如果適用） */
  code: string;
  /** 學分數 */
  credit: number;
  /** 日期範圍 */
  dateRange: RawDateRange | null;
  /** 課程敘述 */
  description: string;
  /** 講師、負責人 */
  hosts: RawPerson[];
  /** 原系統頁面 */
  link: string;
  /** 課程名稱 */
  name: string;
  /** 開課單位 */
  organization: RawOrganization | null;
  /** 上課地點 */
  places: RawPlace[];
  /** 修課類型 */
  tags: RawTag[];
  /** 時間範圍 */
  timeRanges: RawTimeRange[];
  /** 系統流水號 */
  uuid: string;
}
