"use client";

import { useMemo, useState } from "react";

type Month = {
  rowId: string;
  before: string;
  beforeRate: string;
  after: string;
  afterRate: string;
  projected: string;
  projectedRate: string;
};
type PickerWindow = Window & {
  showOpenFilePicker?: (options?: unknown) => Promise<FileSystemFileHandle[]>;
  showSaveFilePicker?: (options?: unknown) => Promise<FileSystemFileHandle>;
};
const csvHeaders = ["Row ID", "System Cost", "Monthly Loan", "Total Months", "Before kWh", "Before Rate", "After kWh", "After Rate", "No Solar kWh", "No Solar Rate"];
const money = (value: number) =>
  `₱${Math.abs(value).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const blank = (rowId = ""): Month => ({
  rowId,
  before: "",
  beforeRate: "",
  after: "",
  afterRate: "",
  projected: "",
  projectedRate: "",
});
const parseCsvLine = (line: string) => {
  const values: string[] = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && line[index + 1] === '"') { value += '"'; index += 1; }
    else if (character === '"') quoted = !quoted;
    else if (character === "," && !quoted) { values.push(value); value = ""; }
    else value += character;
  }
  values.push(value);
  return values;
};

export function SolarTracker() {
  const [systemCost, setSystemCost] = useState("0");
  const [loan, setLoan] = useState("0");
  const [months, setMonths] = useState("0");
  const [rows, setRows] = useState<Month[]>([]);
  const [calculated, setCalculated] = useState(false);
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null);
  const [recordCount, setRecordCount] = useState(0);
  const totals = useMemo(
    () =>
      rows.filter((row) => row.before && row.beforeRate && row.after && row.afterRate).reduce(
        (total, row) => {
          const before = Number(row.before) * Number(row.beforeRate);
          const after = Number(row.after) * Number(row.afterRate);
          const projected =
            row.projected && row.projectedRate
              ? Number(row.projected) * Number(row.projectedRate)
              : before;
          return {
            before: total.before + (before || 0),
            after: total.after + (after || 0),
            projected: total.projected + (projected || 0),
          };
        },
        { before: 0, after: 0, projected: 0 },
      ),
    [rows],
  );
  const savings = totals.projected - totals.after;
  const summaryRows = rows.map((row, index) => {
    const before = Number(row.before) * Number(row.beforeRate);
    const after = Number(row.after) * Number(row.afterRate);
    const projected = row.projected && row.projectedRate ? Number(row.projected) * Number(row.projectedRate) : before;
    return { row, index, before: before || 0, after: after || 0, projected: projected || 0, savings: (projected || 0) - (after || 0) };
  }).filter(({ row }) => row.before && row.beforeRate && row.after && row.afterRate);
  const updateMonths = (value: string) => {
    const count = Math.min(120, Math.max(0, Number(value) || 0));
    setMonths(String(count));
    setRows(Array.from({ length: count }, (_, i) => rows[i] || blank(`month-${i + 1}`)));
    setCalculated(false);
  };
  const update = (index: number, field: keyof Month, value: string) =>
    setRows(
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  const totalMortgage = Number(loan || 0) * Number(months || 0);
  const interest = totalMortgage - Number(systemCost || 0);
  const averageSavings = summaryRows.length ? savings / summaryRows.length : 0;
  const netAfterLoan = savings - Number(loan || 0) * summaryRows.length;
  const percentSaved = totals.projected ? (savings / totals.projected) * 100 : 0;
  const paybackMonths = averageSavings > 0 ? Number(systemCost || 0) / averageSavings : 0;
  const remainingCost = Math.max(0, totalMortgage - savings);
  const quote = (value: string) => `"${value.replaceAll('"', '""')}"`;
  const saveRecord = async () => {
    if (!fileHandle) return;
    const lines = summaryRows.map(({ row, index }) => [row.rowId || `month-${index + 1}`, systemCost, loan, months, row.before, row.beforeRate, row.after, row.afterRate, row.projected, row.projectedRate].map(quote).join(","));
    const existing = await (await fileHandle.getFile()).text();
    const writable = await fileHandle.createWritable();
    await writable.write(`${existing || `${csvHeaders.join(",")}\n`}${lines.join("\n")}${lines.length ? "\n" : ""}`);
    await writable.close();
    setRecordCount((count) => count + summaryRows.length);
  };
  const createRecord = async () => {
    try {
      const handle = await (window as PickerWindow).showSaveFilePicker?.({ suggestedName: "solar-savings.csv", types: [{ description: "CSV Files", accept: { "text/csv": [".csv"] } }] });
      if (!handle) return;
      setFileHandle(handle);
      setRecordCount(0);
      const writable = await handle.createWritable();
      await writable.write(`${csvHeaders.join(",")}\n`);
      await writable.close();
    } catch (error) { if ((error as DOMException).name !== "AbortError") window.alert("Could not create the record file."); }
  };
  const openRecord = async () => {
    try {
      const handles = await (window as PickerWindow).showOpenFilePicker?.({ types: [{ description: "CSV Files", accept: { "text/csv": [".csv"] } }], multiple: false });
      const handle = handles?.[0];
      if (!handle) return;
      const fileText = await (await handle.getFile()).text();
      const csvLines = fileText.trim().split(/\r?\n/).filter(Boolean);
      const header = parseCsvLine(csvLines[0] || "");
      const lines = csvLines.slice(1);
      const values = lines.map(parseCsvLine);
      const oldFormat = header.includes("Before kWh") && header.includes("Before P/kWh");
      const hasRowIds = header[0] === "Row ID";
      if (values[0]) {
        const first = values[0];
        if (oldFormat) {
          setSystemCost(first[17] || "0"); setLoan(first[18] || "0"); setMonths(first[19] || "0");
          const count = Number(first[19]) || values.length;
          const loadedRows = Array.from({ length: count }, (_, index) => blank(`month-${index + 1}`));
          values.forEach((item, index) => {
            const savedId = item[1] || "";
            const monthNumber = Number(savedId.slice(0, 2));
            const yearGroup = Number(savedId.slice(2, 4));
            const rowIndex = monthNumber > 0 && yearGroup > 0 ? (yearGroup - 1) * 12 + monthNumber - 1 : index;
            if (rowIndex >= 0 && rowIndex < loadedRows.length) loadedRows[rowIndex] = { rowId: `month-${rowIndex + 1}`, before: item[5] || "", beforeRate: item[6] || "", after: item[8] || "", afterRate: item[9] || "", projected: item[11] || "", projectedRate: item[12] || "" };
          });
          setRows(loadedRows);
        } else {
          const offset = hasRowIds ? 1 : 0;
          setSystemCost(first[offset] || "0"); setLoan(first[offset + 1] || "0"); setMonths(first[offset + 2] || "0");
          const count = Number(first[offset + 2]) || values.length;
          const loadedRows = Array.from({ length: count }, (_, index) => blank(`month-${index + 1}`));
          values.forEach((item, index) => {
            const rowId = hasRowIds && /^month-\d+$/.test(item[0]) ? item[0] : `month-${index + 1}`;
            const rowIndex = Number(rowId.replace("month-", "")) - 1;
            if (rowIndex >= 0 && rowIndex < loadedRows.length) loadedRows[rowIndex] = { rowId, before: item[offset + 3] || "", beforeRate: item[offset + 4] || "", after: item[offset + 5] || "", afterRate: item[offset + 6] || "", projected: item[offset + 7] || "", projectedRate: item[offset + 8] || "" };
          });
          setRows(loadedRows);
        }
      }
      setFileHandle(handle); setRecordCount(lines.length);
    } catch (error) { if ((error as DOMException).name !== "AbortError") window.alert("Could not open the record file."); }
  };
  const calculate = async () => { if (!summaryRows.length) { window.alert("Enter at least one complete month first."); return; } setCalculated(true); await saveRecord(); };
  return (
    <div className="tracker">
      <section className="calc-panel record-panel">
        <div className="panel-heading">
          <span className="eyebrow">Local file only</span>
          <h2>Initialize record saving</h2>
          <p>Create a CSV record on your device, or load one you already started. Nothing is sent to a database.</p>
        </div>
        <div className="record-actions">
          {fileHandle ? <button className="button button-outline" type="button" onClick={openRecord}>Change record</button> : <><button className="button" type="button" onClick={createRecord}>Create new record</button><button className="button button-outline" type="button" onClick={openRecord}>Load existing record</button></>}
        </div>
        <p className={`record-status${fileHandle ? " is-connected" : " is-disconnected"}`}><span className="status-dot" aria-hidden="true" />{fileHandle ? `Connected: ${fileHandle.name} · ${recordCount} month${recordCount === 1 ? "" : "s"} saved` : "No record connected yet"}</p>
      </section>
      <section className="calc-panel">
        <div className="panel-heading">
          <span className="eyebrow">Scenario setup</span>
          <h2>Solar system details</h2>
        </div>
        <div className="scenario-grid">
          <label>
            System cost (₱)
            <input
              type="number"
              value={systemCost}
              onChange={(e) => setSystemCost(e.target.value)}
            />
          </label>
          <label>
            Monthly loan (₱)
            <input
              type="number"
              value={loan}
              onChange={(e) => setLoan(e.target.value)}
            />
          </label>
          <label>
            Total months
            <input
              type="number"
              value={months}
              min="0"
              max="120"
              onChange={(e) => updateMonths(e.target.value)}
            />
          </label>
        </div>
        <div className="mortgage-cards">
          <div>
            <span className="eyebrow">Total mortgage</span>
            <strong>{money(totalMortgage)}</strong>
          </div>
          <div>
            <span className="eyebrow">Interest</span>
            <strong>{money(interest)}</strong>
          </div>
        </div>
      </section>
      <section className="calc-panel">
        <div className="panel-heading">
          <span className="eyebrow">Monthly inputs</span>
          <h2>Compare each bill</h2>
          <p>
            Enter kWh and rate for before solar, after solar, and optional
            estimated no-solar use.
          </p>
        </div>
        <div className="table-wrap">
          <table className="input-table">
            <colgroup><col /><col className="before-column" /><col className="before-column" /><col className="after-column" /><col className="after-column" /><col className="no-solar-column" /><col className="no-solar-column" /></colgroup>
            <thead>
              <tr>
                <th>Month</th>
                <th>Before kWh</th>
                <th>₱/kWh</th>
                <th>After kWh</th>
                <th>₱/kWh</th>
                <th>No solar kWh</th>
                <th>₱/kWh</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>Month {index + 1}</td>
                  {(
                    [
                      "before",
                      "beforeRate",
                      "after",
                      "afterRate",
                      "projected",
                      "projectedRate",
                    ] as const
                  ).map((field) => (
                    <td key={field}>
                      <input
                        aria-label={`${field} month ${index + 1}`}
                        type="number"
                        step="any"
                        value={row[field]}
                        onChange={(e) => update(index, field, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="button" onClick={calculate}>
          Calculate savings {fileHandle ? "& save record" : "→"}
        </button>
      </section>
      {calculated && (
        <section className="results-card calc-panel">
          <div className="panel-heading"><span className="eyebrow">Savings summary</span><h2>What the numbers say</h2></div>
          <div className="results-grid">
            <div className="metric-before"><span className="eyebrow">Total before solar</span><strong>{money(totals.before)}</strong><small>Old bill estimate</small></div>
            <div className="metric-estimate"><span className="eyebrow">Est. without solar</span><strong>{money(totals.projected)}</strong><small>Projected baseline</small></div>
            <div className="metric-after"><span className="eyebrow">Total after solar</span><strong>{money(totals.after)}</strong><small>Actual solar bills</small></div>
            <div className="metric-savings"><span className="eyebrow">Est. Total Savings</span><strong>{money(savings)}</strong><small>Without solar minus after</small></div>
            <div className="metric-savings"><span className="eyebrow">Est. monthly savings</span><strong>{money(averageSavings)}</strong><small>Before loan payment</small></div>
            <div className="metric-loan"><span className="eyebrow">Total loan paid</span><strong>{money(Number(loan || 0) * summaryRows.length)}</strong><small>{money(loan ? Number(loan) : 0)} per month</small></div>
            <div className="metric-net"><span className="eyebrow">Net after loan</span><strong>{money(netAfterLoan)}</strong><small>Savings minus loan payments</small></div>
            <div className="metric-savings"><span className="eyebrow">Overall % saved</span><strong>{percentSaved.toFixed(1)}%</strong><small>Saved vs projected bills</small></div>
            <div className="payback-summary metric-estimate"><span className="eyebrow">Est. payback period</span><strong>{paybackMonths ? `${(paybackMonths / 12).toFixed(1)} yrs` : "—"}</strong><small>{paybackMonths ? `${Math.round(paybackMonths)} months` : "Enter positive savings"}</small></div>
            <div className="remaining-summary metric-before"><span className="eyebrow">Total cost remaining</span><strong>{money(remainingCost)}</strong><small>Total mortgage minus savings</small></div>
          </div>
          <div className="summary-section"><h3>Monthly comparison</h3><div className="comparison-legend"><span><i className="bar-before" />Before solar</span><span><i className="bar-projected" />Est. without solar</span><span><i className="bar-after" />After solar</span></div><div className="comparison-bars">{summaryRows.map((row) => { const rowMaximum = Math.max(row.before, row.projected, row.after, 1); return <div className="comparison-row" key={row.index}><span>Month {row.index + 1}</span><i className="bar-before" style={{ width: `${row.before / rowMaximum * 100}%` }}><b>{money(row.before)}</b></i><i className="bar-projected" style={{ width: `${row.projected / rowMaximum * 100}%` }}><b>{money(row.projected)}</b></i><i className="bar-after" style={{ width: `${row.after / rowMaximum * 100}%` }}><b>{money(row.after)}</b></i></div>; })}</div></div>
          <div className="summary-section"><h3>Month-by-month breakdown</h3><div className="table-wrap"><table><thead><tr><th>Month</th><th>Before solar</th><th>Est. no solar</th><th>After solar</th><th>Savings</th><th>Net vs loan</th></tr></thead><tbody>{summaryRows.map((row) => <tr key={row.index}><td>Month {row.index + 1}</td><td>{money(row.before)}</td><td>{money(row.projected)}</td><td>{money(row.after)}</td><td>{money(row.savings)}</td><td>{money(row.savings - Number(loan || 0))}</td></tr>)}</tbody></table></div></div>
          {fileHandle && <div className="record-summary"><span className="status-dot" aria-hidden="true" />This calculation is connected to <strong>{fileHandle.name}</strong> and saved locally.</div>}
        </section>
      )}
    </div>
  );
}
