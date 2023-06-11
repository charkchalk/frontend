interface RawPlace {
  /** 地點名稱 */
  name: string;
  /** 上層地點 */
  parent?: RawPlace | null;
  /** 系統流水號 */
  uuid: string;
}
