import moment from 'moment';

export const calcPercentChange = (base, price) => {
  const percentChange = (price / base - 1) * 100;
  return percentChange;
};

export const convertPercentChange = comparator => {
  const priceData = comparator.values;
  const base = priceData.find(dataPoint => dataPoint.price);
  const percentChangeData = priceData.map(value => {
    return {
      date: value.date,
      price: value.price,
      percentChange: calcPercentChange(base.price, value.price)
    };
  });
  return {
    id: comparator.id,
    key: comparator.key,
    values: percentChangeData
  };
};

// X Axis tick
export const generateTicks = (from, to, interval, period) => {
  let dateCount = from;
  const ticks = [moment.utc(dateCount)];
  while (dateCount.isSameOrBefore(to)) {
    ticks.push(moment.utc(dateCount));
    dateCount = dateCount.add(interval, period);
  }
  ticks.shift();
  return ticks;
};

export const buildXTicks = (from, to) => {
  const dateMonthRange = to.diff(from, 'month');
  const xAxisBuild = {
    xTicks: [{}],
    xTickFormat: ''
  };
  if (dateMonthRange <= 1) {
    xAxisBuild.xTicks = generateTicks(from, to, 7, 'day');
    xAxisBuild.xTickFormat = '%e';
    return xAxisBuild;
  }
  if (dateMonthRange < 6) {
    xAxisBuild.xTicks = generateTicks(from, to, 1, 'month');
    xAxisBuild.xTickFormat = '%b';
    return xAxisBuild;
  }
  if (dateMonthRange >= 6 && dateMonthRange < 24) {
    xAxisBuild.xTicks = generateTicks(from, to, 2, 'month');
    if (dateMonthRange >= 12) {
      xAxisBuild.xTickFormat = "%b '%y";
    } else {
      xAxisBuild.xTickFormat = '%b';
    }
    return xAxisBuild;
  }
  if (dateMonthRange >= 24 && dateMonthRange < 60) {
    xAxisBuild.xTicks = generateTicks(from, to, 6, 'month');
    xAxisBuild.xTickFormat = "%b '%y";
    return xAxisBuild;
  }
  xAxisBuild.xTicks = generateTicks(from, to, 1, 'year');
  xAxisBuild.xTickFormat = '%Y';
  return xAxisBuild;
};
