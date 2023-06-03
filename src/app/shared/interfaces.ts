interface Day {
  value: moment.Moment,
  active: boolean,
  disabled: boolean,
  selected: boolean
}

interface Week {
  days: Day[];
}
