interface RawOrganization {
  /** 組織敘述（通常會給學校首頁或 wiki 資訊） */
  description: string;
  /** 組織名稱（通常是校名） */
  name: string;
  parent?: RawOrganization | null;
  /** 系統流水號 */
  uuid: string;
}
