import { useState, useEffect } from "react";
import InputBox from "../components/InputBox";
import useCurrencyInfo from "../hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(fromCurrency);
  const options = Object.keys(currencyInfo);

  // Reusable convert function
  const convert = (val = amount, to = toCurrency) => {
    const rate = currencyInfo[to];
    if (!rate) return;
    setConvertedAmount(val * rate);
  };

  // Input amount typed by user
  const handleAmountChange = (val) => {
    setAmount(val);
    convert(val);
  };

  // When FROM currency changes → auto-adjust amount + converted amount
  const handleFromCurrencyChange = (newCurrency) => {
    const oldToNewRate = currencyInfo[newCurrency];
    if (!oldToNewRate) return;

    // Convert OLD amount into NEW base currency
    const newAmount = amount * oldToNewRate;

    setFromCurrency(newCurrency);
    setAmount(newAmount);
  };

  // Auto update convertedAmount when API loads new rates
  useEffect(() => {
    convert(amount);
  }, [currencyInfo]);

  // Swap both currencies + amounts cleanly
  const swap = () => {
    const tempFrom = fromCurrency;
    const tempAmount = convertedAmount;

    setFromCurrency(toCurrency);
    setToCurrency(tempFrom);

    setAmount(tempAmount);
  };

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={handleFromCurrencyChange}
                  selectCurrency={fromCurrency}
                  onAmountChange={handleAmountChange}
                />
              </div>

              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  Swap
                </button>
              </div>

              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => {
                    setToCurrency(currency);
                    convert(amount, currency);
                  }}
                  selectCurrency={toCurrency}
                  amountDisable={true}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
