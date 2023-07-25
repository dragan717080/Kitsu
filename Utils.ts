import { format, formatDistanceToNow, parseISO } from 'date-fns';

abstract class Utils {
  static shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  static toTitleCase(str: string) {
    return str.replace(/\w\S*/g, (word) =>
      word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
  }

  static formatDateTime(datetimeString) {
    const date = parseISO(datetimeString);
    return format(date, 'MMMM d, yyyy');
  }

  static getAiringStatus(endDate: datetime) {
    return endDate === null ? 'Still airing' : `Ended ${this.formatDateTime(endDate)}`;
  }

  static listsToObject(keys, values) {
    if (keys.length !== values.length) {
      throw new Error('Keys and values lists must have the same length.');
    }

    return keys.reduce((obj, key, index) => {
      obj[key] = values[index];
      return obj;
    }, {});
  }

  static timeAgo(datetimeString) {
    const date = parseISO(datetimeString);
    return formatDistanceToNow(date, { addSuffix: true });
  }

  static htmlToPlainText(htmlString: string) {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.documentElement.textContent;
  }

  static splitArrayToChunks(arr: unknown[], size: number) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }
}

export default Utils;
