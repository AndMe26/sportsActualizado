'use client'

import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { formatMoney, makeId, sedes, serviceCategories, type CatalogItem } from '@sportcomplex/core'
import { ActionButton } from '@/components/action-button'
import { ConfirmDialog, Modal } from '@/components/modal'
import { PageHeading } from '@/components/page-heading'
import { useApp } from '@/components/app-provider'
import { useCatalog } from '@/lib/stores'

const blank: CatalogItem = { id: '', category: 'canchas', name: '', description: '', price: 0, sede: sedes[0], capacity: 1, status: 'Disponible' }

function CatalogForm({ initial, onSave, onClose }: { initial: CatalogItem; onSave: (item: CatalogItem) => void; onClose: () => void }) {
  const [form, setForm] = useState(initial)
  const set = <K extends keyof CatalogItem>(key: K, value: CatalogItem[K]) => setForm({ ...form, [key]: value })
  return <Modal title={initial.id ? 'Editar servicio' : 'Agregar al catálogo'} description="Este espacio aparecerá en el catálogo que ven los clientes." onClose={onClose}>
    <form onSubmit={(event) => { event.preventDefault(); onSave({ ...form, name: form.name.trim(), description: form.description.trim() }) }}>
      <label className="demo-field">Nombre<input required value={form.name} onChange={(event) => set('name', event.target.value)} placeholder="Ej. Cancha de pádel · Cancha 2" /></label>
      <label className="demo-field">Categoría<select value={form.category} onChange={(event) => set('category', event.target.value as CatalogItem['category'])}>{serviceCategories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}</select></label>
      <label className="demo-field">Descripción<input value={form.description} onChange={(event) => set('description', event.target.value)} placeholder="Breve descripción del espacio" /></label>
      <div className="form-row">
        <label className="demo-field">Precio (COP)<input required type="number" min="0" step="1000" value={form.price} onChange={(event) => set('price', Number(event.target.value))} /></label>
        <label className="demo-field">Capacidad<input required type="number" min="1" value={form.capacity} onChange={(event) => set('capacity', Number(event.target.value))} /></label>
      </div>
      <div className="form-row">
        <label className="demo-field">Sede<select value={form.sede} onChange={(event) => set('sede', event.target.value)}>{sedes.map((sede) => <option key={sede}>{sede}</option>)}</select></label>
        <label className="demo-field">Disponibilidad<select value={form.status} onChange={(event) => set('status', event.target.value as CatalogItem['status'])}><option>Disponible</option><option>Mantenimiento</option></select></label>
      </div>
      <div className="form-actions"><ActionButton secondary onClick={onClose}>Cancelar</ActionButton><ActionButton type="submit">{initial.id ? 'Guardar cambios' : 'Agregar'}</ActionButton></div>
    </form>
  </Modal>
}

export default function AdminCatalogPage() {
  const { notify } = useApp()
  const [catalog, setCatalog] = useCatalog()
  const [editing, setEditing] = useState<CatalogItem | null>(null)
  const [deleting, setDeleting] = useState<CatalogItem | null>(null)

  const save = (item: CatalogItem) => {
    if (item.id) { setCatalog(catalog.map((entry) => entry.id === item.id ? item : entry)); notify('Servicio actualizado.', 'success') }
    else { setCatalog([...catalog, { ...item, id: makeId(item.name) }]); notify('Servicio agregado al catálogo.', 'success') }
    setEditing(null)
  }

  return <main className="section-shell app-page demo-page">
    <PageHeading eyebrow="ADMINISTRACIÓN" title="Catálogo" description="Servicios y espacios que los clientes pueden reservar." action={<button className="action-button" onClick={() => setEditing(blank)}><Plus size={16} /> Agregar al catálogo</button>} />
    <section className="demo-card"><div className="demo-card-heading"><div><h2>Servicios del catálogo</h2><p>{catalog.length} {catalog.length === 1 ? 'servicio' : 'servicios'} registrados.</p></div></div>
      <div className="demo-table-wrap"><table className="demo-table"><thead><tr><th>Servicio</th><th>Categoría</th><th>Sede</th><th>Precio</th><th>Disponibilidad</th><th>Acciones</th></tr></thead><tbody>
        {catalog.length === 0 && <tr><td colSpan={6}>Aún no hay servicios. Agrega el primero.</td></tr>}
        {catalog.map((item) => <tr key={item.id}><td>{item.name}</td><td>{serviceCategories.find((category) => category.slug === item.category)?.name}</td><td>{item.sede}</td><td>{formatMoney(item.price)} COP</td><td><span className={`demo-status ${item.status === 'Disponible' ? 'demo-status-active' : ''}`}>{item.status}</span></td>
          <td><div className="row-actions"><button className="text-link" onClick={() => { setCatalog(catalog.map((entry) => entry.id === item.id ? { ...entry, status: item.status === 'Disponible' ? 'Mantenimiento' : 'Disponible' } : entry)); notify(item.status === 'Disponible' ? 'Servicio pausado.' : 'Servicio activado.', 'success') }}>{item.status === 'Disponible' ? 'Pausar' : 'Activar'}</button><button className="icon-action" aria-label={`Editar ${item.name}`} onClick={() => setEditing(item)}><Pencil size={15} /></button><button className="icon-action icon-danger" aria-label={`Eliminar ${item.name}`} onClick={() => setDeleting(item)}><Trash2 size={15} /></button></div></td></tr>)}
      </tbody></table></div>
    </section>
    {editing && <CatalogForm initial={editing} onSave={save} onClose={() => setEditing(null)} />}
    {deleting && <ConfirmDialog title="Eliminar servicio" message={`¿Eliminar «${deleting.name}» del catálogo? Dejará de mostrarse a los clientes.`} onCancel={() => setDeleting(null)} onConfirm={() => { setCatalog(catalog.filter((entry) => entry.id !== deleting.id)); setDeleting(null); notify('Servicio eliminado.', 'success') }} />}
  </main>
}
