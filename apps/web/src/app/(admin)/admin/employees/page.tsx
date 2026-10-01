'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { roles, type Employee, type Role } from '@sportcomplex/core'
import { ActionButton } from '@/components/action-button'
import { ConfirmDialog, Modal } from '@/components/modal'
import { PageHeading } from '@/components/page-heading'
import { useApp } from '@/components/app-provider'
import { useEmployees } from '@/lib/stores'

export default function AdminEmployeesPage() {
  const { session, notify } = useApp()
  const [employees, setEmployees] = useEmployees()
  const [adding, setAdding] = useState(false)
  const [deleting, setDeleting] = useState<Employee | null>(null)
  const [form, setForm] = useState({ name: '', email: '', role: 'Empleado' as Role })

  const add = (event: React.FormEvent) => {
    event.preventDefault()
    const email = form.email.trim().toLowerCase()
    if (employees.some((employee) => employee.email === email)) { notify('Ya existe una persona con ese correo.', 'error'); return }
    setEmployees([...employees, { id: `e${Date.now()}`, name: form.name.trim(), email, role: form.role }])
    setAdding(false)
    notify('Empleado agregado.', 'success')
  }

  return <main className="section-shell app-page demo-page">
    <PageHeading eyebrow="ADMINISTRACIÓN" title="Empleados" description="Equipo del complejo y los roles de cada persona." action={<button className="action-button" onClick={() => { setForm({ name: '', email: '', role: 'Empleado' }); setAdding(true) }}><Plus size={16} /> Agregar empleado</button>} />
    <section className="demo-card"><div className="demo-card-heading"><div><h2>Equipo y roles</h2><p>Roles disponibles: Administrador, Cliente y Empleado.</p></div></div>
      <div className="demo-table-wrap"><table className="demo-table"><thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr></thead><tbody>
        {employees.length === 0 && <tr><td colSpan={4}>Aún no hay personas registradas.</td></tr>}
        {employees.map((employee) => <tr key={employee.id}><td>{employee.name}</td><td>{employee.email}</td>
          <td><select aria-label={`Rol de ${employee.name}`} value={employee.role} onChange={(event) => { setEmployees(employees.map((item) => item.id === employee.id ? { ...item, role: event.target.value as Role } : item)); notify('Rol actualizado.', 'success') }}>{roles.map((role) => <option key={role}>{role}</option>)}</select></td>
          <td><div className="row-actions"><button className="icon-action icon-danger" aria-label={`Eliminar a ${employee.name}`} onClick={() => employee.email === session?.email ? notify('No puedes eliminar tu propia cuenta.', 'error') : setDeleting(employee)}><Trash2 size={15} /></button></div></td></tr>)}
      </tbody></table></div>
    </section>
    {adding && <Modal title="Agregar empleado" description="Crea el registro y asígnale un rol." onClose={() => setAdding(false)}>
      <form onSubmit={add}>
        <label className="demo-field">Nombre completo<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
        <label className="demo-field">Correo<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
        <label className="demo-field">Rol<select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value as Role })}>{roles.map((role) => <option key={role}>{role}</option>)}</select></label>
        <div className="form-actions"><ActionButton secondary onClick={() => setAdding(false)}>Cancelar</ActionButton><ActionButton type="submit">Agregar</ActionButton></div>
      </form>
    </Modal>}
    {deleting && <ConfirmDialog title="Eliminar empleado" message={`¿Eliminar a ${deleting.name}? Perderá el acceso asignado a su rol.`} onCancel={() => setDeleting(null)} onConfirm={() => { setEmployees(employees.filter((item) => item.id !== deleting.id)); setDeleting(null); notify('Empleado eliminado.', 'success') }} />}
  </main>
}
