import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Typography } from "@mui/material";
import {
    CategoryScale, Chart as ChartJS, Legend, LinearScale,
    LineElement, PointElement, Tooltip, type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./reports.css";
import { AppState } from "../../../redux/app-state";
import { coinService } from "../../../services/coin-service";
import { CoinModel } from "../../../models/coin-model";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// Fixed categorical slot order — each selected coin keeps one color.
const seriesColors = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4"];

// How many seconds of history stay on screen.
const maxHistoryPoints = 60;

type PricePoint = {
    time: string;
    prices: Record<string, number>; // symbol -> USD price
};

function formatUsd(value: number): string {
    const digits = value >= 1 ? 2 : 6;
    return "$" + value.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export function Reports() {
    const selectedCoins = useSelector((state: AppState) => state.selectedCoins);
    const [coins, setCoins] = useState<CoinModel[]>([]);
    const [history, setHistory] = useState<PricePoint[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        coinService.getAllCoins()
            .then(allCoins => setCoins(allCoins))
            .catch(err => { alert(err.message) })
    }, [])

    // The selection stores CoinGecko ids (bitcoin) while CryptoCompare
    // expects symbols (BTC) — map through the coins list.
    const symbols = useMemo(
        () => coins
            .filter(coin => selectedCoins.includes(coin.id))
            .map(coin => coin.symbol.toUpperCase()),
        [coins, selectedCoins]
    );
    const symbolsKey = symbols.join(",");

    useEffect(() => {
        if (!symbolsKey) return;
        setHistory([]); // selection changed — start a fresh report
        let disposed = false;

        // A single request per second returns all selected coins at once.
        async function samplePrices() {
            try {
                const livePrices = await coinService.getLivePrices(symbolsKey.split(","));
                if (disposed) return;
                const point: PricePoint = {
                    time: new Date().toLocaleTimeString(),
                    prices: Object.fromEntries(
                        Object.entries(livePrices).map(([symbol, price]) => [symbol, price.USD])
                    ),
                };
                setHistory(prev => [...prev, point].slice(-maxHistoryPoints));
            } catch {
                // A missed second is fine — the next tick will retry.
            }
        }

        samplePrices();
        const interval = setInterval(samplePrices, 1000);
        return () => {
            disposed = true;
            clearInterval(interval);
        };
    }, [symbolsKey]);

    const latestPoint = history[history.length - 1];

    // Prices span orders of magnitude (BTC vs DOGE), so raw values on one
    // axis flatten every line. Each coin is indexed to its first price in
    // the visible window and plotted as % change — one shared axis, and
    // every coin's live movement stays visible. Tiles and tooltips still
    // show the actual USD price.
    const basePrice = (symbol: string): number | undefined =>
        history.find(point => point.prices[symbol] !== undefined)?.prices[symbol];

    const chartData = {
        labels: history.map(point => point.time),
        datasets: symbols.map((symbol, index) => {
            const base = basePrice(symbol);
            return {
                label: symbol,
                data: history.map(point => {
                    const price = point.prices[symbol];
                    if (price === undefined || !base) return null;
                    return (price / base - 1) * 100;
                }),
                borderColor: seriesColors[index],
                backgroundColor: seriesColors[index],
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 4,
                tension: 0.3,
                spanGaps: true,
            };
        }),
    };

    const chartOptions: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
            legend: {
                position: "top",
                labels: { usePointStyle: true, boxWidth: 8, boxHeight: 8, color: "#52514e" },
            },
            tooltip: {
                callbacks: {
                    label: context => {
                        const symbol = context.dataset.label ?? "";
                        const price = history[context.dataIndex]?.prices[symbol];
                        const change = context.parsed.y;
                        if (price === undefined || change === null) return "";
                        const sign = change >= 0 ? "+" : "";
                        return ` ${symbol}: ${formatUsd(price)} (${sign}${change.toFixed(3)}%)`;
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "#898781", maxTicksLimit: 8, maxRotation: 0 },
                grid: { display: false },
            },
            y: {
                title: { display: true, text: "Change since window start (%)", color: "#898781" },
                ticks: {
                    color: "#898781",
                    maxTicksLimit: 7,
                    callback: value => `${Number(value) >= 0 ? "+" : ""}${Number(value).toFixed(2)}%`,
                },
                grid: { color: "#e1e0d9" },
            },
        },
    };

    return (
        <div className="Reports">

            <div className="ReportsHeader">
                <Typography className="ReportsTitle">Live Report</Typography>
                <Typography className="ReportsSubtitle">
                    USD prices, refreshed every second
                </Typography>
            </div>

            {selectedCoins.length === 0 ? (
                <div className="ReportsEmpty">
                    <div className="ReportsEmptyIcon">
                        <svg width="44" height="44" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1.6"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3v18h18" />
                            <path d="M6 15l4-5 4 3 5-7" />
                        </svg>
                    </div>
                    <Typography className="ReportsEmptyTitle">
                        Nothing to report yet
                    </Typography>
                    <Typography className="ReportsEmptyText">
                        Select coins on the Home page and their live USD
                        prices will be charted here in real time.
                    </Typography>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={() => navigate("/home")}
                    >
                        Browse Coins
                    </Button>
                </div>
            ) : (
                <>
                    <div className="ReportsTiles">
                        {symbols.map((symbol, index) => (
                            <div className="ReportsTile" key={symbol}>
                                <span
                                    className="ReportsTileDot"
                                    style={{ backgroundColor: seriesColors[index] }}
                                />
                                <span className="ReportsTileSymbol">{symbol}</span>
                                <span className="ReportsTilePrice">
                                    {latestPoint?.prices[symbol] !== undefined
                                        ? formatUsd(latestPoint.prices[symbol])
                                        : "—"}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="ReportsChart">
                        {history.length === 0 ? (
                            <Typography className="ReportsWaiting">
                                Waiting for live prices...
                            </Typography>
                        ) : (
                            <Line data={chartData} options={chartOptions} />
                        )}
                    </div>
                </>
            )}

        </div>
    );
}
