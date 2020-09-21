import {
    GIS_REGIONS_URL
} from "./common/common-api-constants";

import { RestWrapper } from "../components/api/api-invokers/rest-wrapper";
import { LoggingApiHelpers } from "../loggers/logging-api-helpers";

import * as ExpectationHelpers from "../components/expectation-helpers";

export class GisApiHelpers {
    /**
     * <p>getRegions
     * </p>
     * Path:                "/1.0/regions"
     * Method:              GET
     * API Doc:             https://drive.google.com/file/d/1yvBPl4GnC6QOBVDrP8rpviVHZeF5B_Oo/view
     * Description:         Возвращает список регионов
     *
     * @param   {string}    q               Произвольная строка для нечёткого поиска по названию региона
     * @param   {string}    countryCode     Код страны для фильтрации
     * @param   {string}    page            Порядковый номер страницы
     * @param   {string}    pageSize        Количество элементов на странице
     * @return              Response with call result
     */
    static async getRegions(q?: string, countryCode?: string,
                            page?: string, pageSize?: string) {
        const apiWrapper = new RestWrapper();

        const response = await apiWrapper
            .get(GIS_REGIONS_URL)
            .query({q: q, country_code: countryCode, page: page, page_size: pageSize})
            .end();
        LoggingApiHelpers.logDetails(apiWrapper.request, response);

        return <any> response;
    }

    /**
     * Verify whether regions array contains regions with name containing substring or not
     * @param {any[]} regionsArray
     * @param {string} expectedSubstr
     * @param {boolean} expectedState
     * @returns {Promise<void>}
     */
    static async verifyRegionsArrayContainsItemsByNameSubstr(regionsArray: any[], expectedSubstr: string,
                                                             expectedState = true) {
        for (const region of regionsArray) {
            await ExpectationHelpers.verifyObjectContains(region.name.toLowerCase(), expectedSubstr.toLowerCase(),
                expectedState);
        }
    }

    /**
     * Verify whether regions array contains not less than one region with specified country code
     * @param {any[]} regionsArray
     * @param {string[]} expectedCodes
     * @returns {Promise<void>}
     */
    static async verifyRegionsContainNotLessThanOneItemByCountryCodes(regionsArray: any[], expectedCodes: string[]) {
        for (const code of expectedCodes) {
            let isPresent = false;
            for (const region of regionsArray) {
                if (region.country.code == code) {
                    isPresent = true;
                    break;
                }
            }

            await ExpectationHelpers.verifyValueTruthiness(isPresent,
                `Регион с кодом страны "${code}" присутствует в списке`);
        }
    }

    /**
     * Verify whether regions array contains regions with country code or not
     * @param {any[]} regionsArray
     * @param {string} expectedCode
     * @param {boolean} expectedState
     * @returns {Promise<void>}
     */
    static async verifyRegionsContainItemsByCountryCode(regionsArray: any[], expectedCode: string,
                                                        expectedState = true) {
        for (const region of regionsArray) {
            await ExpectationHelpers.verifyValueEquality(region.country.code, expectedCode, expectedState);
        }
    }
}
