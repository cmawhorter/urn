import { Item } from '../typings';
import { isString } from './validate';

export function formatUrn(
  protocol: null | string,
  components: string[],
  separator: string,
  parsed: Item<string, null | string>
): string {
  protocol = parsed && parsed.protocol ? parsed.protocol : protocol;
  if (!isString(protocol)) throw new Error('protocol is missing or invalid');
  return protocol + separator + components.map(name => !isString(parsed[name]) ? '' : parsed[name]).join(separator);
}

export function buildUrn(
  protocol: string,
  components: string[],
  data: Item<string, unknown> = {}
): Item<string, null | string> {
  data = data || {};
  const result: Item<string, null | string> = { protocol };
  components
    .forEach(name => {
      const value = data[name];
      result[name] = isString(value) ? value : null;
    });
  return result;
}
