import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchRates() {
            try {
                const res = await fetch(
                    `https://open.er-api.com/v6/latest/${currency.toUpperCase()}`
                );

                const json = await res.json();

                // API gives all rates inside json.rates
                if (json.result === "success") {
                    setData(json.rates);
                } else {
                    setData({});
                }
            } catch (e) {
                console.error("Currency API error:", e);
                setData({});
            }
        }

        fetchRates();
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
