import { getCompanyAvatarColor, getCompanyInitials } from '@/lib/utils'

interface AvatarProps {
  company: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-16 h-16 text-xl',
  lg: 'w-20 h-20 text-2xl',
}

export function Avatar({ company, size = 'sm' }: AvatarProps) {
  const initials = getCompanyInitials(company)
  const backgroundColor = getCompanyAvatarColor(company)

  return (
    <div
      className={`${sizeClasses[size]} rounded-xl flex items-center justify-center font-bold text-white`}
      style={{ backgroundColor }}
    >
      {initials}
    </div>
  )
}
