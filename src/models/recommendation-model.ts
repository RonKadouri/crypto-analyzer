// The AI answer: a buy / don't-buy verdict plus a short explanation paragraph.
export type RecommendationModel = {
    shouldBuy: boolean;
    explanation: string;
}
