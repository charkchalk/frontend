export interface WeekTime {
  day?: number;
  time?: string;
}

export interface WeekTimeRange {
  start: WeekTime;
  end: WeekTime;
}
