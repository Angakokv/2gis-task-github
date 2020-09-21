import { SMOKE_TEST_SUITE } from "../../../components/suite-names";

import { StepLogger } from "../../../loggers/step-logger";
import { GisApiHelpers } from "../../../api-helpers/gis-api-helpers";

import * as HttpStatus from "http-status-codes";
import * as ExpectationHelpers from "../../../components/expectation-helpers";
import * as ApiExpectationHelpers from "../../../components/api-expectation-helpers";

describe(SMOKE_TEST_SUITE, () => {
    it("[TC1] Проверка параметра “q” - [1001]", async () => {
        StepLogger.caseId = 1001;

        StepLogger.stepId(1);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с пустым значеним параметра “q”.");
        let getResponse = await GisApiHelpers.getRegions("");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(2);
        StepLogger.step("Проверить содержимое тела ответа.");
        let expectedText = "Параметр 'q' должен быть не менее 3 символов";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'q' должен быть не менее 3 символов”.");
        let errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(3);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “q=мо”.");
        getResponse = await GisApiHelpers.getRegions("мо");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(4);
        StepLogger.step("Проверить содержимое тела ответа.");
        expectedText = "Параметр 'q' должен быть не менее 3 символов";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'q' должен быть не менее 3 символов”.");
        errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(5);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “q=мос”.");
        let regionFilterValue = "мос";
        getResponse = await GisApiHelpers.getRegions(regionFilterValue);
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(6);
        StepLogger.step("Проверить содержимое тела ответа.");
        let regionsArray = JSON.parse(getResponse.body).items;
        StepLogger.verification("В теле ответа содержатся только те регионы, у которых в имени" +
            " есть подстрока “мос” без учета регистра.");
        await GisApiHelpers.verifyRegionsArrayContainsItemsByNameSubstr(regionsArray, regionFilterValue);

        StepLogger.stepId(7);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметрами “q=лади”, “country_code=cz”");
        regionFilterValue = "лади"; const countryCodeValue = "cz";
        getResponse = await GisApiHelpers.getRegions(regionFilterValue, countryCodeValue);
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(8);
        StepLogger.step("Проверить содержимое тела ответа.");
        regionsArray = JSON.parse(getResponse.body).items;
        StepLogger.verification("В теле ответа содержатся только те регионы, у которых в имени" +
            " есть подстрока “лади” без учета регистра.");
        await GisApiHelpers.verifyRegionsArrayContainsItemsByNameSubstr(regionsArray, regionFilterValue);

        StepLogger.stepId(9);
        StepLogger.step("Проверить игнорирование параметра “country_code”.");
        StepLogger.verification("В теле ответа отсутствуют регионы с кодом страны “cz”.");
        await GisApiHelpers.verifyRegionsContainItemsByCountryCode(regionsArray, countryCodeValue, false);
    });

    it("[TC2] Проверка параметра “country_code” - [1002]", async () => {
        StepLogger.caseId = 1002;

        StepLogger.stepId(1);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с пустым значеним параметра “country_code”.");
        let getResponse = await GisApiHelpers.getRegions(undefined, "");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(2);
        StepLogger.step("Проверить содержимое тела ответа.");
        const expectedText = "Параметр 'country_code' может быть одним из следующих значений: ru, kg, kz, cz";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'country_code' может быть одним из следующих значений: ru, kg, kz, cz”.");
        let errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(3);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “country_code=rrr”.");
        getResponse = await GisApiHelpers.getRegions(undefined, "rrr");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(4);
        StepLogger.step("Проверить содержимое тела ответа.");
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'country_code' может быть одним из следующих значений: ru, kg, kz, cz”.");
        errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(5);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметрами" +
            " “page_size=15”, “country_code=ru”.");
        let countryCodeValue = "ru";
        getResponse = await GisApiHelpers.getRegions(undefined, countryCodeValue, undefined, "15");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(6);
        StepLogger.step("Проверить содержимое тела ответа.");
        let regionsArray = JSON.parse(getResponse.body).items;
        StepLogger.verification("В теле ответа содержатся только регионы с кодом страны “ru”.");
        await GisApiHelpers.verifyRegionsContainItemsByCountryCode(regionsArray, countryCodeValue);

        StepLogger.stepId(7);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметрами" +
            " “page_size=15”, “country_code=kg”.");
        countryCodeValue = "kg";
        getResponse = await GisApiHelpers.getRegions(undefined, countryCodeValue, undefined, "15");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(8);
        StepLogger.step("Проверить содержимое тела ответа.");
        regionsArray = JSON.parse(getResponse.body).items;
        StepLogger.verification("В теле ответа содержатся только регионы с кодом страны “kg”.");
        await GisApiHelpers.verifyRegionsContainItemsByCountryCode(regionsArray, countryCodeValue);

        StepLogger.stepId(9);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметрами" +
            " “page_size=15”, “country_code=kz”.");
        countryCodeValue = "kz";
        getResponse = await GisApiHelpers.getRegions(undefined, countryCodeValue, undefined, "15");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(10);
        StepLogger.step("Проверить содержимое тела ответа.");
        regionsArray = JSON.parse(getResponse.body).items;
        StepLogger.verification("В теле ответа содержатся только регионы с кодом страны “kz”.");
        await GisApiHelpers.verifyRegionsContainItemsByCountryCode(regionsArray, countryCodeValue);

        StepLogger.stepId(11);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметрами" +
            " “page_size=15”, “country_code=cz”.");
        countryCodeValue = "cz";
        getResponse = await GisApiHelpers.getRegions(undefined, countryCodeValue, undefined, "15");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(12);
        StepLogger.step("Проверить содержимое тела ответа.");
        regionsArray = JSON.parse(getResponse.body).items;
        StepLogger.verification("В теле ответа содержатся только регионы с кодом страны “cz”.");
        await GisApiHelpers.verifyRegionsContainItemsByCountryCode(regionsArray, countryCodeValue);
    });

    it("[TC3] Проверка параметра “page” - [1003]", async () => {
        StepLogger.caseId = 1003;

        StepLogger.stepId(1);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с пустым значеним параметра “page”.");
        let getResponse = await GisApiHelpers.getRegions(undefined, undefined, "");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(2);
        StepLogger.step("Проверить содержимое тела ответа.");
        let expectedText = "Параметр 'page' должен быть целым числом";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'page' должен быть целым числом”.");
        let errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(3);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page=-1”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, "-1");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(4);
        StepLogger.step("Проверить содержимое тела ответа.");
        expectedText = "Параметр 'page' должен быть больше 0";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'page' должен быть больше 0”.");
        errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(5);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page=0”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, "0");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(6);
        StepLogger.step("Проверить содержимое тела ответа.");
        expectedText = "Параметр 'page' должен быть больше 0";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'page' должен быть больше 0”.");
        errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(7);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page=1.5”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, "1.5");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(8);
        StepLogger.step("Проверить содержимое тела ответа.");
        expectedText = "Параметр 'page' должен быть целым числом";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'page' должен быть целым числом”.");
        errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(9);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page=1”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, "1");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(10);
        StepLogger.step("Проверить содержимое тела ответа.");
        let regionsArray = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).items : [];
        StepLogger.verification("В теле ответа содержится непустой список регионов.");
        await ExpectationHelpers.verifyObjectLengthGreaterThan("Массив регионов", regionsArray.length, 0);

        StepLogger.stepId(11);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page=2”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, "2");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(12);
        StepLogger.step("Проверить содержимое тела ответа.");
        regionsArray = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).items : [];
        StepLogger.verification("В теле ответа содержится непустой список регионов.");
        await ExpectationHelpers.verifyObjectLengthGreaterThan("Массив регионов", regionsArray.length, 0);
    });

    it("[TC4] Проверка параметра “page_size” - [1004]", async () => {
        StepLogger.caseId = 1004;

        StepLogger.stepId(1);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с пустым значеним параметра “page_size”.");
        let getResponse = await GisApiHelpers.getRegions(undefined, undefined, undefined, "");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(2);
        StepLogger.step("Проверить содержимое тела ответа.");
        let expectedText = "Параметр 'page_size' должен быть целым числом";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'page_size' должен быть целым числом”.");
        let errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(3);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page_size=-1”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, undefined, "-1");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(4);
        StepLogger.step("Проверить содержимое тела ответа.");
        expectedText = "Параметр 'page_size' может быть одним из следующих значений: 5, 10, 15";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'page_size' может быть одним из следующих значений: 5, 10, 15”.");
        errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(5);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page_size=0”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, undefined, "0");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(6);
        StepLogger.step("Проверить содержимое тела ответа.");
        expectedText = "Параметр 'page_size' может быть одним из следующих значений: 5, 10, 15";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'page_size' может быть одним из следующих значений: 5, 10, 15”.");
        errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(7);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page_size=1.5”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, undefined, "1.5");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(8);
        StepLogger.step("Проверить содержимое тела ответа.");
        expectedText = "Параметр 'page_size' должен быть целым числом";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'page_size' должен быть целым числом”.");
        errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(9);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page_size=2”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, undefined, "2");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(10);
        StepLogger.step("Проверить содержимое тела ответа.");
        expectedText = "Параметр 'page_size' может быть одним из следующих значений: 5, 10, 15";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'page_size' может быть одним из следующих значений: 5, 10, 15”.");
        errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(11);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page_size=5”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, undefined, "5");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(12);
        StepLogger.step("Проверить содержимое тела ответа.");
        let regionsArray = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).items : [];
        StepLogger.verification("В теле ответа содержится 5 регионов.");
        await ExpectationHelpers.verifyValueEquality(regionsArray.length, 5, true, "Количество регионов");

        StepLogger.stepId(13);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page_size=7”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, undefined, "7");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(14);
        StepLogger.step("Проверить содержимое тела ответа.");
        expectedText = "Параметр 'page_size' может быть одним из следующих значений: 5, 10, 15";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'page_size' может быть одним из следующих значений: 5, 10, 15”.");
        errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(15);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page_size=10”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, undefined, "10");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(16);
        StepLogger.step("Проверить содержимое тела ответа.");
        regionsArray = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).items : [];
        StepLogger.verification("В теле ответа содержится 10 регионов.");
        await ExpectationHelpers.verifyValueEquality(regionsArray.length, 10, true, "Количество регионов");

        StepLogger.stepId(17);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page_size=12”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, undefined, "12");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(18);
        StepLogger.step("Проверить содержимое тела ответа.");
        expectedText = "Параметр 'page_size' может быть одним из следующих значений: 5, 10, 15";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'page_size' может быть одним из следующих значений: 5, 10, 15”.");
        errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);

        StepLogger.stepId(19);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page_size=15”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, undefined, "15");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(20);
        StepLogger.step("Проверить содержимое тела ответа.");
        regionsArray = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).items : [];
        StepLogger.verification("В теле ответа содержится 10 регионов.");
        await ExpectationHelpers.verifyValueEquality(regionsArray.length, 15, true, "Количество регионов");

        StepLogger.stepId(21);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page_size=17”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, undefined, "17");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(22);
        StepLogger.step("Проверить содержимое тела ответа.");
        expectedText = "Параметр 'page_size' может быть одним из следующих значений: 5, 10, 15";
        StepLogger.verification("В теле ответа содержится сообщение" +
            " “Параметр 'page_size' может быть одним из следующих значений: 5, 10, 15”.");
        errorMessage = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).error.message : "";
        await ExpectationHelpers.verifyObjectContains(errorMessage, expectedText);
    });

    it("[TC5] Проверка значений параметров по умолчанию - [1005]", async () => {
        StepLogger.caseId = 1005;

        StepLogger.stepId(1);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” без параметров.\n");
        let getResponse = await GisApiHelpers.getRegions();
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(2);
        StepLogger.step("Проверить количество регионов в теле ответа.");
        const regionsArray1 = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).items : [];
        StepLogger.verification("В теле ответа содержится 15 регионов.");
        await ExpectationHelpers.verifyValueEquality(regionsArray1.length, 15, true, "Количество регионов");

        StepLogger.stepId(3);
        StepLogger.step("Сохранить список С1 полученных регионов.");
        StepLogger.verification("Список С1 сохраняется успешно.");

        StepLogger.stepId(4);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page=1”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, "1", "15");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(5);
        StepLogger.step("Сохранить список С2 полученных регионов.");
        StepLogger.verification("Список С2 сохраняется успешно.");
        const regionsArray2 = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).items : [];

        StepLogger.stepId(6);
        StepLogger.step("Проверить совпадение списков С1 и С2.");
        StepLogger.verification("В списках С1 и С2 содержатся одинаковые элементы.");
        await ExpectationHelpers.verifyValueEquality(regionsArray1, regionsArray2);

        StepLogger.stepId(7);
        StepLogger.step("Выполнить вызов эндпоинта “/1.0/regions” с параметром “page=2”.");
        getResponse = await GisApiHelpers.getRegions(undefined, undefined, "2", "15");
        StepLogger.verification("Эндпоинт возвращает статус 200.");
        await ApiExpectationHelpers.verifyResponseHasCode(getResponse.statusCode,
            HttpStatus.OK, "Response status code");

        StepLogger.stepId(8);
        StepLogger.step("Сохранить список С3 полученных регионов.");
        StepLogger.verification("Список С3 сохраняется успешно.");
        const regionsArray3 = getResponse.hasOwnProperty("body") ? JSON.parse(getResponse.body).items : [];

        StepLogger.stepId(9);
        StepLogger.step("Проверить в списках С2 и С3 наличие, как минимум, по одному региону с кодами" +
            " страны “ru”, “kg”, “kz”, “cz”. ");
        const countryCodesArray = ["ru", "kg", "kz", "cz"];
        StepLogger.verification("В списках С2 и С3 присутствует, как минимум, по одному региону" +
            " с кодами страны “ru”, “kg”, “kz”, “cz”.");
        await GisApiHelpers.verifyRegionsContainNotLessThanOneItemByCountryCodes(
            regionsArray2.concat(regionsArray3), countryCodesArray);
    });
});
