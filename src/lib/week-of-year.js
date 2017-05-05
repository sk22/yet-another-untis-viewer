/* eslint-disable */

/**
* Returns the week number for date date.
* the week returned is the ISO 8601 week number.
* source: http://techblog.procurios.nl/k/news/view/33796/14863/calculate-iso-8601-week-and-year-in-javascript.html
* @return int
*/
module.exports = (date = new Date()) => {
  // Create a copy of date date object
  const target = new Date(date.valueOf());

  // ISO week date weeks start on monday
  // so correct the day number
  const dayNr = (date.getDay() + 6) % 7;

  // ISO 8601 states that week 1 is the week
  // with the first thursday of that year.
  // Set the target date to the thursday in the target week
  target.setDate(target.getDate() - dayNr + 3);

  // Store the millisecond value of the target date
  const firstThursday = target.valueOf();

  // Set the target to the first thursday of the year
  // First set the target to january first
  target.setMonth(0, 1);
  // Not a thursday? Correct the date to the next thursday
  if (target.getDay() != 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }

  // The weeknumber is the number of weeks between the
  // first thursday of the year and the thursday in the target week
  // 604800000 = 7 * 24 * 3600 * 1000
  return 1 + Math.ceil((firstThursday - target) / 604800000);
};
