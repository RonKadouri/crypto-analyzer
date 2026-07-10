import { Currency } from "../utils/enums"

export type CurrencyModel = {
    date: string,
    base: string,
    quote: Currency,
    rate: number,
}