export interface WeekTimeRange {
  start: WeekTime;
  end: WeekTime;
}

export interface WeekTime {
  day?: number;
  time?: string;
}
