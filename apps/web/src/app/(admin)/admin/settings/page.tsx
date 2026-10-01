'use client'

import { useState } from 'react'
import { Activity } from 'lucide-react'
import { PageHeading } from '@/components/page-heading'
import { useApp } from '@/components/app-provider'
import { defaultSettings, useSettings } from '@/lib/stores'

export default function AdminSettingsPage() {
  const { notify } = useApp()
  const [saved, setSaved] = useSettings()
  const [draft, setDraft] = useState<typeof defaultSettings | null>(null)
  const form = draft ?? saved

  return <main className="section-shell app-page demo-page">
    <PageHeading eyebrow="ADMINISTRACIÓN" title="Configuración" description="Datos generales del complejo." />
    <form className="demo-card demo-settings" onSubmit={(event) => { event.preventDefault(); setSaved(form); setDraft(null); notify('Configuración guardada.', 'success') }}><div className="demo-card-heading"><div><h2>Configuración del complejo</h2><p>Ajustes generales de Altura Club.</p></div><Activity size={19} /></div>
      <label className="demo-field">Nombre del complejo<input value={form.businessName} onChange={(event) => setDraft({ ...form, businessName: event.target.value })} required /></label>
      <label className="demo-field">Horario de atención<input value={form.businessHours} onChange={(event) => setDraft({ ...form, businessHours: event.target.value })} required /></label>
      <label className="demo-check"><input type="checkbox" checked={form.bookingsOpen} onChange={(event) => setDraft({ ...form, bookingsOpen: event.target.checked })} /> Permitir reservas en línea</label>
      <button type="submit" className="action-button">Guardar ajustes</button></form>
  </main>
}
