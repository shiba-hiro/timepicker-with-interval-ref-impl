// @flow
const shouldUseMinimumHoursIndex = (
  minimumHoursIndex: ?number,
  baseHoursIndex: number,
): boolean => (!!minimumHoursIndex
  && baseHoursIndex < minimumHoursIndex);

export const calculateHoursIndex = (
  minimumHoursIndex: ?number,
  baseHoursIndex: number,
): number => {
  if (shouldUseMinimumHoursIndex(minimumHoursIndex, baseHoursIndex)) {
    return ((minimumHoursIndex: any): number);
  }
  return baseHoursIndex;
};

const shouldUseMinimumMinutesIndex = (
  minimumHoursIndex: ?number,
  minimumMinutesIndex: ?number,
  baseHoursIndex: number,
  baseMinutesIndex: number,
): boolean => (!!minimumHoursIndex
  && baseHoursIndex === minimumHoursIndex
  && !!minimumMinutesIndex
  && baseMinutesIndex < minimumMinutesIndex);

export const calculateMinutesIndex = (
  minimumHoursIndex: ?number,
  minimumMinutesIndex: ?number,
  baseHoursIndex: number,
  baseMinutesIndex: number,
): number => {
  if (shouldUseMinimumMinutesIndex(
    minimumHoursIndex,
    minimumMinutesIndex,
    baseHoursIndex,
    baseMinutesIndex,
  )) {
    return ((minimumMinutesIndex: any): number);
  }
  return baseMinutesIndex;
};
