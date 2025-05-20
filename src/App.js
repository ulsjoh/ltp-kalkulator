import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LTPBeregnForan() {
  const [tillattAksellastForan, setTillattAksellastForan] = useState(0)
  const [egenvektForan, setEgenvektForan] = useState(0)
  const [egenvektBak, setEgenvektBak] = useState(0)
  const [totalAksellastBak, setTotalAksellastBak] = useState(0)
  const [sjaforVekt, setSjaforVekt] = useState(0)
  const [akselavstandBak1, setAkselavstandBak1] = useState(0)
  const [akselavstandBak2, setAkselavstandBak2] = useState(0)
  const [resultat, setResultat] = useState(null)

  const beregn = () => {
    const midtpunktBak = akselavstandBak1 + (akselavstandBak2 / 2)
    const nyttelastForan = tillattAksellastForan - egenvektForan - sjaforVekt
    const nyttelastBak = totalAksellastBak - egenvektBak
    const totalNyttelast = nyttelastForan + nyttelastBak
    const ltp = (nyttelastForan * midtpunktBak) / totalNyttelast
    setResultat({
      nyttelastForan,
      nyttelastBak,
      totalNyttelast,
      ltp: ltp.toFixed(1),
      midtpunktBak,
      visning: `${nyttelastForan.toLocaleString("no-NO")} × ${midtpunktBak.toLocaleString("no-NO")} ÷ ${totalNyttelast.toLocaleString("no-NO")} = ${ltp.toFixed(1)} cm`
    })
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">LTP-beregning – plassering foran bakaksel</h1>

      <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 text-sm rounded">
        <p><strong>Tips:</strong> Ved boggi regner du akselavstanden til midt mellom bakakslene.</p>
        <p>Start med å hente akseltrykk og egenvekt fra vognkort, og juster etter vegliste hvis nødvendig (BK10).</p>
        <p>LTP (lastens tyngdepunkt) er avstanden fra bakaksel til der lasten må plasseres for riktig fordeling.</p>
      </div>

      <label>Avstand fra foraksel til første bakaksel (cm):</label>
      <Input type="number" value={akselavstandBak1} onChange={e => setAkselavstandBak1(+e.target.value)} className="mb-2" />

      <label>Avstand mellom bakakslene (cm):</label>
      <Input type="number" value={akselavstandBak2} onChange={e => setAkselavstandBak2(+e.target.value)} className="mb-2" />

      <label>Tillatt aksellast foran (kg):</label>
      <Input type="number" value={tillattAksellastForan} onChange={e => setTillattAksellastForan(+e.target.value)} className="mb-2" />

      <label>Egenvekt foran (kg):</label>
      <Input type="number" value={egenvektForan} onChange={e => setEgenvektForan(+e.target.value)} className="mb-2" />

      <label>Vekt sjåfør (kg):</label>
      <Input type="number" value={sjaforVekt} onChange={e => setSjaforVekt(+e.target.value)} className="mb-2" />

      <label>Total tillatt aksellast bak (kg):</label>
      <Input type="number" value={totalAksellastBak} onChange={e => setTotalAksellastBak(+e.target.value)} className="mb-2" />

      <label>Egenvekt bak (kg):</label>
      <Input type="number" value={egenvektBak} onChange={e => setEgenvektBak(+e.target.value)} className="mb-4" />

      <Button onClick={beregn}>Beregn LTP</Button>

      {resultat && (
        <div className="mt-6 p-4 border rounded shadow">
          <p><strong>Midtpunkt mellom bakakslene:</strong> {resultat.midtpunktBak} cm</p>
          <p><strong>Nyttelast foran:</strong> {resultat.nyttelastForan.toLocaleString("no-NO")} kg</p>
          <p><strong>Nyttelast bak:</strong> {resultat.nyttelastBak.toLocaleString("no-NO")} kg</p>
          <p><strong>Total nyttelast:</strong> {resultat.totalNyttelast.toLocaleString("no-NO")} kg</p>
          <p><strong>Plasser tyngdepunktet:</strong> {resultat.ltp} cm foran bakerste aksel</p>
          <p className="mt-2 text-sm text-gray-700 italic">({resultat.visning})</p>
          <div className="mt-6 relative h-10 w-full bg-gray-200 rounded">
            <div className="absolute top-0 w-full flex justify-between text-xs px-1">
              <span>0 cm (bakaksel)</span>
              <span>{resultat.midtpunktBak} cm (foraksel)</span>
            </div>
            <div
              className="absolute top-4 w-0.5 h-6 bg-red-500"
              style={{
                left: `${Math.min((resultat.ltp / resultat.midtpunktBak) * 100, 100)}%`,
                transform: "translateX(-50%)"
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}
