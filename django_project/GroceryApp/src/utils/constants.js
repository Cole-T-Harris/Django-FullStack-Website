import ulog from 'ulog';

export const LOG = ulog("App");

export const LOCATIONS_LIMIT = 10;

export const ZIPCODE_REGEX = /^[0-9]{5}(?:-[0-9]{4})?$/