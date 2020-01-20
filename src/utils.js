import moment from 'moment';
const format = 'HH:mm:ss';

export function render__rain_perc(Part1, Part2, Part3, Part4) {
  const hour = moment().format(format);
  const now = moment(hour, format);
  let final_perc = part_switcher(now, Part1, Part2, Part3, Part4);

  switch (final_perc) {
    case 0:
      return 0;
    case 1:
      return 30;
    case 2:
      return 60;
    case 3:
      return 90;
    default:
      return 0;
  }
}

export function render__rain_number(Part1, Part2, Part3, Part4) {
  const hour = moment().format(format);
  const now = moment(hour, format);
  let final_number = part_switcher(now, Part1, Part2, Part3, Part4);

  // Starts from 1
  return final_number + 1;
}

function part_switcher(now, Part1, Part2, Part3, Part4) {
  // * Find the right spot in the day
  // "Part1": 1, 00:00:00 – 06:00:00 -> 0 to 3
  // "Part2": 0, 06:00:00 – 12:00:00 -> 0 to 3
  // "Part3": 0, 12:00:00 – 18:00:00 -> 0 to 3
  // "Part4": 0, 18:00:00 – 24:00:00 -> 0 to 3
  // * Find the right percentage
  // 3 = 90%, 2 = 60%, 1 = 30%, 0 = 0%
  if (now.isBetween(moment('00:00:00', format), moment('06:00:00', format))) {
    return Part1;
  }
  if (now.isBetween(moment('06:00:00', format), moment('12:00:00', format))) {
    return Part2;
  }
  if (now.isBetween(moment('12:00:00', format), moment('18:00:00', format))) {
    return Part3;
  }
  if (now.isBetween(moment('18:00:00', format), moment('24:00:00', format))) {
    return Part4;
  }
  return 0;
}
