import { Pipe, PipeTransform } from '@angular/core';
import { KeyValue } from '@innoware/api-interfaces';

@Pipe({
  name: 'translateError'
})
export class TranslateErrorPipe implements PipeTransform {
  cache: KeyValue<string> = {};

  transform(error: { [key: string]: any }, i18nFunc: (i18nKey: string, obj?: KeyValue) => string): string {
    if (!error) {
      return '';
    }

    const firstKey = Object.keys(error)[0];
    if (!firstKey) {
      return '';
    }

    const details = error[firstKey];

    if (this.cache[firstKey]) {
      return this.cache[firstKey];
    } else if (details) {
      this.cache[firstKey] = i18nFunc(`validations.${firstKey}`, details);
    } else {
      this.cache[firstKey] = i18nFunc(`validations.${firstKey}`);
    }
    return this.cache[firstKey];
  }

}
