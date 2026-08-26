'use client';

import { useState } from 'react';

type Appliance = { name: string; watts: number; hours: number; days: number };
const peso = (value: number) => `₱${value.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function ApplianceCalculator() {
  const [items, setItems] = useState<Appliance[]>([]);
  const [name, setName] = useState('');
  const [watts, setWatts] = useState('');
  const [hours, setHours] = useState('');
  const [days, setDays] = useState('30');
  const [rate, setRate] = useState('10');
  const add = () => { if (!watts || !hours) return; setItems([...items, { name: name || 'Appliance', watts: Number(watts), hours: Number(hours), days: Number(days) || 30 }]); setName(''); setWatts(''); setHours(''); };
  const totals = items.reduce((sum, item) => sum + (item.watts * item.hours * item.days) / 1000, 0);
  return <div className="calculator-layout"><section className="calc-panel"><div className="panel-heading"><span className="eyebrow">Inputs</span><h2>Add an appliance</h2></div><div className="form-grid"><label>Name<input value={name} onChange={e => setName(e.target.value)} placeholder="Refrigerator" /></label><label>Watts<input type="number" value={watts} onChange={e => setWatts(e.target.value)} placeholder="800" /></label><label>Hours/day<input type="number" value={hours} onChange={e => setHours(e.target.value)} placeholder="8" /></label><label>Days/month<input type="number" value={days} onChange={e => setDays(e.target.value)} /></label></div><button className="button" onClick={add}>Add appliance +</button><label className="rate-field">Electricity rate (₱/kWh)<input type="number" value={rate} onChange={e => setRate(e.target.value)} /></label></section><section className="calc-panel"><div className="panel-heading"><span className="eyebrow">Your list</span><h2>Monthly estimate</h2></div>{items.length === 0 ? <p className="empty-state">No appliances yet. Add one above to see the estimate.</p> : <div className="table-wrap"><table><thead><tr><th>Appliance</th><th>kWh/mo</th><th>Cost/mo</th><th /></tr></thead><tbody>{items.map((item, index) => { const kwh = item.watts * item.hours * item.days / 1000; return <tr key={`${item.name}-${index}`}><td>{item.name}</td><td>{kwh.toFixed(2)}</td><td>{peso(kwh * Number(rate || 0))}</td><td><button className="text-button" onClick={() => setItems(items.filter((_, i) => i !== index))}>Remove</button></td></tr>; })}</tbody></table></div>}<div className="total-strip"><span>Total estimated use</span><strong>{totals.toFixed(2)} kWh / month</strong><b>{peso(totals * Number(rate || 0))}</b></div></section></div>;
}
