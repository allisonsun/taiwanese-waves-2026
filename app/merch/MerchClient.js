'use client'

import { useState } from 'react'
import Link from 'next/link'

const FILTERS = ['All', 'Apparel', 'Accessories', 'Media']

const PLACEHOLDER_ITEMS = [
  { id: 1, name: 'Taiwanese Waves tee', price: '$35', category: 'Apparel' },
  { id: 2, name: 'Festival hoodie', price: '$65', category: 'Apparel' },
  { id: 3, name: 'Tote bag', price: '$25', category: 'Accessories' },
  { id: 4, name: 'Cap', price: '$30', category: 'Accessories' },
  { id: 5, name: 'Poster', price: '$20', category: 'Media' },
  { id: 6, name: 'Playing cards', price: '$10', category: 'Media' },
]

export default function MerchClient() {
  const [active, setActive] = useState('All')


  const filtered = active === 'All'
    ? PLACEHOLDER_ITEMS
    : PLACEHOLDER_ITEMS.filter(i => i.category === active)

  return (
    <div className="merch-page">
      <nav className="merch-nav">
        <Link href="/" aria-label="Back to home">
          <img src="/logo.svg" alt="Taiwanese Waves" style={{ height: 32, display: 'block' }} />
        </Link>
        <Link href="/" className="merch-nav-link">Return to site</Link>
      </nav>

      <div className="merch-header">
        <h1>Shop Taiwanese Waves merch</h1>
      </div>

      <div className="merch-filters">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`merch-filter-btn${active === f ? ' merch-filter-btn--active' : ''}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="merch-grid">
        {filtered.map(item => (
          <div key={item.id} className="merch-card">
            <div className="merch-card-img">
              <span>Photo</span>
            </div>
            <div className="merch-card-info">
              <div className="merch-card-meta">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
              <button className="merch-card-btn">Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
