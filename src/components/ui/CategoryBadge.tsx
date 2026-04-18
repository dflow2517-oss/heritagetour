import { CATEGORY_COLORS } from '../../lib/constants'
import type { Category } from '../../lib/types'

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className="type-font text-xs tracking-widest uppercase px-3 py-1 border-2 border-ink"
      style={{ background: CATEGORY_COLORS[category], color: '#f5ecd7' }}
    >
      {category}
    </span>
  )
}
