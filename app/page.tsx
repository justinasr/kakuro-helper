"use client";

import { useState } from "react";

export default function Home() {
  const [countInput, setCountInput] = useState("");
  const [sumInput, setSumInput] = useState("");
  const [exclude, setExclude] = useState<number[]>([]);
  const [include, setInclude] = useState<number[]>([]);
  const [results, setResults] = useState<number[][]>([]);
  const [emoji, setEmoji] = useState("");
  const [inAll, setInAll] = useState<number[]>([]); // Digits present in all results
  const [numbers, setNumbers] = useState<number[]>([]); // All digits used in results

  function handleClick() {
    if (!countInput || !sumInput) {
      setResults([]);
      setEmoji("");
      setInAll([]);
      setNumbers([]);
      return;
    }
    const count = parseInt(countInput);
    const sum = parseInt(sumInput);

    let res: number[][] = [[]];
    for (let i = 0; i < count; i++) {
      const arrs = res.filter((arr) => arr.length < count);
      res = [];
      for (const arr of arrs) {
        for (let j = 1; j <= 9; j++) {
          if (!arr.includes(j) && !exclude.includes(j)) {
            res.push(arr.concat([j]).sort());
          }
        }
      }
    }
    // Check include
    if (include.length) {
      res = res.filter((combination) =>
        include.every((i) => combination.includes(i))
      );
    }
    // Check sum
    res = res.filter(
      (combination) => combination.reduce((acc, curr) => acc + curr, 0) === sum
    );
    // Check duplicates
    res = res.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (t) => t.length === item.length && t.every((v, i) => v === item[i])
        )
    );

    if (res.length > 1) {
      // Find which numbers are available in all results
      setInAll(
        res.reduce(
          (acc, curr) => curr.filter((digit) => acc.includes(digit)),
          res[0].slice()
        )
      );
      // Find which numbers are used
      setNumbers(
        [...new Set(res.flatMap((combination) => combination))].sort()
      );
    } else {
      setInAll([]);
      setNumbers([]);
    }

    setResults(res);
    if (res.length === 0) {
      setEmoji("😞");
    } else if (res.length === 1) {
      setEmoji("🤯");
    } else if (res.length <= 3) {
      setEmoji("🥹");
    } else if (res.length <= 5) {
      setEmoji("😳");
    } else {
      setEmoji("😵‍💫");
    }
  }

  function handleClear() {
    setCountInput("");
    setSumInput("");
    setExclude([]);
    setInclude([]);
    setResults([]);
    setEmoji("");
    setInAll([]);
    setNumbers([]);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-2 
      bg-gradient-to-b from-amber-50 to-orange-100 
      dark:from-gray-900 dark:to-gray-800 transition-colors"
    >
      <main className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-4 w-full max-w-md flex flex-col gap-6 transition-colors">
        <h1 className="text-2xl font-semibold text-center text-amber-800 dark:text-amber-400">
          Kakuro Helper 🤓
        </h1>

        <div className="flex flex-col gap-4">
          <label className="font-medium text-gray-700 dark:text-gray-300">
            How many numbers?
            <input
              id="count"
              name="count"
              value={countInput}
              onChange={(e) => setCountInput(e.target.value)}
              onBlur={() => handleClick()}
              type="number"
              pattern="\d*"
              min="1"
              max="9"
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 
                p-2 bg-amber-50 dark:bg-gray-800 
                text-gray-900 dark:text-gray-100 
                focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
            />
          </label>

          <label className="font-medium text-gray-700 dark:text-gray-300">
            Sum of numbers?
            <input
              id="sum"
              name="sum"
              value={sumInput}
              onChange={(e) => setSumInput(e.target.value)}
              onBlur={() => handleClick()}
              type="number"
              pattern="\d*"
              min="1"
              max="100"
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 
                p-2 bg-amber-50 dark:bg-gray-800 
                text-gray-900 dark:text-gray-100 
                focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
            />
          </label>

          <label className="font-medium text-gray-700 dark:text-gray-300">
            Exclude?
            <input
              id="exclude"
              name="exclude"
              value={exclude.join("")}
              onChange={(e) =>
                setExclude(
                  [
                    ...new Set(
                      e.target.value
                        .split("")
                        .filter(Boolean)
                        .map(Number)
                        .filter(Boolean)
                    ),
                  ].sort()
                )
              }
              type="number"
              pattern="\d*"
              onBlur={() => handleClick()}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 
                p-2 bg-amber-50 dark:bg-gray-800 
                text-gray-900 dark:text-gray-100 
                focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors tracking-widest"
            />
          </label>

          <label className="font-medium text-gray-700 dark:text-gray-300">
            Include?
            <input
              id="include"
              name="include"
              value={include.join("")}
              onChange={(e) =>
                setInclude(
                  [
                    ...new Set(
                      e.target.value
                        .split("")
                        .filter(Boolean)
                        .map(Number)
                        .filter(Boolean)
                    ),
                  ].sort()
                )
              }
              type="number"
              pattern="\d*"
              onBlur={() => handleClick()}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 
                p-2 bg-amber-50 dark:bg-gray-800 
                text-gray-900 dark:text-gray-100 
                focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors tracking-widest"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleClick}
            className="w-full bg-green-600 text-white py-2 rounded-lg 
            hover:bg-green-700 dark:hover:bg-green-500 
            transition-colors font-bold shadow-md"
          >
            Compute
          </button>

          <button
            onClick={handleClear}
            className="w-full bg-red-700 text-white py-2 rounded-lg 
            hover:bg-red-800 dark:hover:bg-red-600 
            transition-colors font-bold shadow-md"
          >
            Clear
          </button>
        </div>

        {results.length > 0 ? (
          <div className="bg-amber-50 dark:bg-gray-800 border border-amber-200 dark:border-gray-700 rounded-lg p-4">
            <h2 className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-2">
              Results ({results.length}) {emoji}
            </h2>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
              {results.map((result, i) => (
                <li
                  key={`result-${i}`}
                  className="px-2 py-1 rounded-md bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  {result.map((digit, ii) => (
                    <span key={`digit-${i}-${ii}`}>
                      {inAll.includes(digit) ? (
                        <b className="text-green-600">{digit}</b>
                      ) : (
                        <span>{digit}</span>
                      )}
                      {ii < result.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
            {results.length > 1 ? (
              <>
                <h2 className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-2 mt-2">
                  Numbers ({numbers.length})
                </h2>
                <div className="leading-3">
                  {numbers.map((number, i) => (
                    <span key={`number-${i}-${number}`}>
                      {inAll.includes(number) ? (
                        <b className="text-green-600">{number}</b>
                      ) : (
                        <span>{number}</span>
                      )}
                      {i < numbers.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            No results yet — enter values and click <strong>Compute</strong>.
          </p>
        )}
      </main>
    </div>
  );
}
