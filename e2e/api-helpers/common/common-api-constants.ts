import { browser } from "protractor";

// Base urls
export const GIS_BASE_ENDPOINT = browser.params.gisApiUrl.endsWith("/") ?
    `${browser.params.gisApiUrl.slice(0, -1)}` : `${browser.params.gisApiUrl}`;

// 2GIS regions urls
export const GIS_REGIONS_URL = `${GIS_BASE_ENDPOINT}/1.0/regions`;
