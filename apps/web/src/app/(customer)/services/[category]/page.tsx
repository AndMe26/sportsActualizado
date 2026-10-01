'use client'

import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, MapPin, Users } from 'lucide-react'
import { categoryBySlug, formatMoney } from '@sportcomplex/core'
import { categoryIcons } from '@/components/category-icons'
import { IconBox } from '@/components/icon-box'
import { useCatalog } from '@/lib/stores'

export default function CategoryCatalogPage() {
  const { category: slug } = useParams<{ category: string }>()
  const category = categoryBySlug(slug)
  const [catalog] = useCatalog()
  if (!category) notFound()
  const items = catalog.filter((item) => item.category === category.slug)
  const Icon = categoryIcons[category.icon]

  return <main className="section-shell app-page">
    <Link href="/services" className="back-link"><ArrowLeft size={15} /> Todos los servicios</Link>
    <div className="booking-heading catalog-heading"><IconBox icon={Icon} tone={category.tone} className="booking-icon" /><div><div className="eyebrow">CATÁLOGO</div><h1>{category.name}</h1><p>{category.description} · {items.length} {items.length === 1 ? 'espacio' : 'espacios'}</p></div></div>
    {items.length === 0
      ? <div className="dashboard-empty"><span className="empty-icon"><Icon size={21} /></span><div><b>Aún no hay espacios en esta categoría</b><p>Vuelve pronto: estamos sumando nuevas opciones.</p></div></div>
      : <div className="catalog-grid">{items.map((item) => {
        const available = item.status === 'Disponible'
        const card = <>
          <div className="catalog-card-image"><img src={item.image || '/images/club-hero.png'} alt={item.name} loading="lazy" onError={(event) => { event.currentTarget.src = '/images/club-hero.png' }} /><span className={`catalog-status catalog-image-status ${available ? '' : 'catalog-status-off'}`}>{available ? 'Disponible' : 'No disponible'}</span></div>
          <div className="catalog-card-content">
            <h3>{item.name}</h3><p>{item.description}</p>
            <div className="catalog-meta"><span><MapPin size={13} /> {item.sede}</span><span><Users size={13} /> Hasta {item.capacity}</span></div>
            <div className="category-bottom"><span>{formatMoney(item.price)} / {category.unit}</span>{available && <span className="round-arrow"><ArrowRight size={15} /></span>}</div>
          </div>
        </>
        return available
          ? <Link key={item.id} href={`/services/${category.slug}/${item.id}`} className="category-card">{card}</Link>
          : <div key={item.id} className="category-card catalog-card-off" aria-disabled="true">{card}</div>
      })}</div>}
  </main>
}
