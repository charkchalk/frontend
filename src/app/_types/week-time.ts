export interface WeekTime {
  day?: string;
  time?: string;
}

export interface WeekTimeRange {
  end: WeekTime;
  start: WeekTime;
}
