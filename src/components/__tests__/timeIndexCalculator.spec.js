// @flow
import {
  calculateHoursIndex,
  calculateMinutesIndex,
} from '../timeIndexCalculator';

describe('timeIndexCalculator', () => {
  describe('calculateHoursIndex', () => {
    it('returns base when minimum is falsy', () => {
      const result = calculateHoursIndex(null, 0);
      expect(result).toBe(0);
    });

    it('returns base when base is greater than minimum', () => {
      const result = calculateHoursIndex(4, 10);
      expect(result).toBe(10);
    });

    it('returns minimum when base is less than minimum', () => {
      const result = calculateHoursIndex(19, 15);
      expect(result).toBe(19);
    });
  });

  describe('calculateMinutesIndex', () => {
    it('returns baseMinute when minimum is falsy', () => {
      const result = calculateMinutesIndex(null, null, 15, 1);
      expect(result).toBe(1);
    });

    it('returns base when baseHour is different from minimum', () => {
      const result = calculateMinutesIndex(15, 0, 20, 1);
      expect(result).toBe(1);
    });

    it('returns base when baseMinute is greater than minimumMinute', () => {
      const result = calculateMinutesIndex(15, 1, 15, 3);
      expect(result).toBe(3);
    });

    it('returns minimum when baseMinute is less than minimumMinute', () => {
      const result = calculateMinutesIndex(19, 1, 19, 0);
      expect(result).toBe(1);
    });
  });
});
