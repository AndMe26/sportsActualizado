'use client'

import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { formatDate, formatMoney, type Membership, type MembershipPeriod } from '@sportcomplex/core'
import { ActionButton } from '@/components/action-button'
import { ConfirmDialog, Modal } from '@/components/modal'
import { PageHeading } from '@/components/page-heading'
import { useApp } from '@/components/app-provider'
import { useMemberships } from '@/lib/stores'
import { useToday } from '@/lib/persistent-state'

const periods: MembershipPeriod[] = ['Mensual', 'Trimestral', 'Anual']
const blank: Membership = { id: '', name: '', period: 'Mensual', price: 0, expires: '', active: true }

export default function AdminMembershipsPage() {
  const { notify } = useApp()
  const [plans, setPlans] = useMemberships()
  const today = useToday()
  const [editing, setEditing] = useState<Membership | null>(null)
  const [deleting, setDeleting] = useState<Membership | null>(null)

  const save = (event: React.FormEvent) => {
    event.preventDefault()
    if (!editing) return
    const plan = { ...editing, name: editing.name.trim() }
    if (plan.id) { setPlans(plans.map((entry) => entry.id === plan.id ? plan : entry)); notify('Membresía actualizada.', 'success') }
    else { setPlans([...plans, { ...plan, id: `m${Date.now()}` }]); notify('Membresía agregada.', 'success') }
    setEditing(null)
  }

  return <main className="section-shell app-page demo-page">
    <PageHeading eyebrow="ADMINISTRACIÓN" title="Membresías" description="Planes disponibles y su vigencia." action={<button className="action-button" onClick={() => setEditing({ ...blank, expires: today })}><Plus size={16} /> Agregar membresía</button>} />
    <section className="demo-card"><div className="demo-card-heading"><div><h2>Planes y vigencias</h2><p>{plans.length} {plans.length === 1 ? 'plan' : 'planes'} registrados.</p></div></div>
      {plans.length === 0 && <div className="demo-record"><div><b>Aún no hay membresías</b><span>Agrega el primer plan.</span></div></div>}
      {plans.map((plan) => {
        const expired = !!today && plan.expires < today
        return <div className="demo-record" key={plan.id}><div><b>{plan.name} · {plan.period.toLowerCase()} · {formatMoney(plan.price)} COP</b><span>{expired ? 'Plan vencido' : 'Vence'} el {formatDate(plan.expires, { day: 'numeric', month: 'short', year: 'numeric' })}</span><small className={`demo-status ${plan.active ? 'demo-status-active' : ''}`}>{plan.active ? 'Activa' : 'Inactiva'}</small></div>
          <div className="row-actions"><button className="calendar-shortcut" onClick={() => { setPlans(plans.map((entry) => entry.id === plan.id ? { ...entry, active: !entry.active } : entry)); notify(plan.active ? 'Membresía desactivada.' : 'Membresía activada.', 'success') }}>{plan.active ? 'Desactivar' : 'Activar'}</button><button className="icon-action" aria-label={`Editar ${plan.name}`} onClick={() => setEditing(plan)}><Pencil size={15} /></button><button className="icon-action icon-danger" aria-label={`Eliminar ${plan.name}`} onClick={() => setDeleting(plan)}><Trash2 size={15} /></button></div></div>
      })}
    </section>
    {editing && <Modal title={editing.id ? 'Editar membresía' : 'Agregar membresía'} description="Define el plan y su fecha de vencimiento." onClose={() => setEditing(null)}>
      <form onSubmit={save}>
        <label className="demo-field">Nombre del plan<input required value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} placeholder="Ej. Esencial" /></label>
        <div className="form-row">
          <label className="demo-field">Periodicidad<select value={editing.period} onChange={(event) => setEditing({ ...editing, period: event.target.value as MembershipPeriod })}>{periods.map((period) => <option key={period}>{period}</option>)}</select></label>
          <label className="demo-field">Precio (COP)<input required type="number" min="0" step="1000" value={editing.price} onChange={(event) => setEditing({ ...editing, price: Number(event.target.value) })} /></label>
        </div>
        <label className="demo-field">Vence el<input required type="date" value={editing.expires} onChange={(event) => setEditing({ ...editing, expires: event.target.value })} /></label>
        <label className="demo-check"><input type="checkbox" checked={editing.active} onChange={(event) => setEditing({ ...editing, active: event.target.checked })} /> Plan activo</label>
        <div className="form-actions"><ActionButton secondary onClick={() => setEditing(null)}>Cancelar</ActionButton><ActionButton type="submit">{editing.id ? 'Guardar cambios' : 'Agregar'}</ActionButton></div>
      </form>
    </Modal>}
    {deleting && <ConfirmDialog title="Eliminar membresía" message={`¿Eliminar el plan «${deleting.name}»?`} onCancel={() => setDeleting(null)} onConfirm={() => { setPlans(plans.filter((entry) => entry.id !== deleting.id)); setDeleting(null); notify('Membresía eliminada.', 'success') }} />}
  </main>
}
