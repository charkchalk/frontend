export interface WeekTime {
  day?: number;
  time?: string;
}

export interface WeekTimeRange {
  end: WeekTime;
  start: WeekTime;
}
