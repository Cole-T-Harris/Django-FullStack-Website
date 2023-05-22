import ulog from 'ulog';

export const BASE_COLOR = "#B5F1CC"
export const SECONDARY_COLOR = "#E5FDD1"
export const THIRD_COLOR = "#C9F4AA"
export const ACCENT_COLOR = "#FCC2FC"

export const LOG = ulog("App");

export const LOCATIONS_LIMIT = 10;

export const HELMET_BACKGROUND = 'body {background-color: ' + BASE_COLOR + '; '

export const ZIPCODE_REGEX = /^[0-9]{5}$/

export const FAB_STYLING = {
                                bottom: 100,
                                right: 40,
                                backgroundColor: ACCENT_COLOR
                            }