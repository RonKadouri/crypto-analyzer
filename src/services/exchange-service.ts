import axios from "axios";
import { CurrencyModel } from "../models/currency-model";
import { appConfig } from "../utils/app-config";
import { Currency } from "../utils/enums";

class ExchangeService {
    public async getSpecificRate(currency: Currency): Promise<CurrencyModel> {
        const response = await axios.get<CurrencyModel>(appConfig.exchangeRateUrl + currency);
        const rate = response.data;
        return rate;
    }
}

export const exchangeService = new ExchangeService();
