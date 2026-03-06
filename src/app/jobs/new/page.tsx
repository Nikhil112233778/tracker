'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { JobStatus, JobSource } from '@/lib/types'

const STATUS_OPTIONS: JobStatus[] = [
  'Applied',
  'In Touch',
  'Follow Up',
  'Interview',
  'Offer',
  'Rejected',
  'Ghosted',
]

const SOURCE_OPTIONS: JobSource[] = [
  'LinkedIn',
  'Naukri',
  'Referral',
  'Company Site',
  'Indeed',
  'Other',
]

export default function NewJobPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    hr_name: '',
    hr_email: '',
    hr_phone: '',
    status: 'Applied' as JobStatus,
    source: '' as JobSource | '',
    notes: '',
    salary_info: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required'
    }

    if (!formData.hr_name.trim()) {
      newErrors.hr_name = 'HR contact name is required'
    }

    if (formData.hr_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.hr_email)) {
      newErrors.hr_email = 'Invalid email format'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: formData.source || null,
          hr_email: formData.hr_email || null,
          hr_phone: formData.hr_phone || null,
          notes: formData.notes || null,
          salary_info: formData.salary_info || null,
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        // Redirect to the new job's detail page
        router.push(`/jobs/${data.data.id}`)
      } else {
        alert(data.error || 'Failed to create job')
      }
    } catch (error) {
      console.error('Error creating job:', error)
      alert('Failed to create job')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background z-10 px-4 py-3 flex items-center border-b border-gray-100">
          <Link href="/">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </Link>
          <h1 className="text-lg font-semibold ml-2">Add New Job</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Company Name */}
          <div>
            <label htmlFor="company" className="label">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., Stripe"
              className={`input-field ${errors.company ? 'border-red-500' : ''}`}
            />
            {errors.company && (
              <p className="text-xs text-red-500 mt-1">{errors.company}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="label">
              Role / Position <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., Senior Frontend Engineer"
              className={`input-field ${errors.role ? 'border-red-500' : ''}`}
            />
            {errors.role && (
              <p className="text-xs text-red-500 mt-1">{errors.role}</p>
            )}
          </div>

          {/* HR Name */}
          <div>
            <label htmlFor="hr_name" className="label">
              HR / Recruiter Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="hr_name"
              name="hr_name"
              value={formData.hr_name}
              onChange={handleChange}
              placeholder="e.g., Priya Sharma"
              className={`input-field ${errors.hr_name ? 'border-red-500' : ''}`}
            />
            {errors.hr_name && (
              <p className="text-xs text-red-500 mt-1">{errors.hr_name}</p>
            )}
          </div>

          {/* HR Email */}
          <div>
            <label htmlFor="hr_email" className="label">
              HR Email
            </label>
            <input
              type="email"
              id="hr_email"
              name="hr_email"
              value={formData.hr_email}
              onChange={handleChange}
              placeholder="e.g., priya@stripe.com"
              className={`input-field ${errors.hr_email ? 'border-red-500' : ''}`}
            />
            {errors.hr_email && (
              <p className="text-xs text-red-500 mt-1">{errors.hr_email}</p>
            )}
          </div>

          {/* HR Phone */}
          <div>
            <label htmlFor="hr_phone" className="label">
              HR Phone
            </label>
            <input
              type="tel"
              id="hr_phone"
              name="hr_phone"
              value={formData.hr_phone}
              onChange={handleChange}
              placeholder="e.g., +91 98765 43210"
              className="input-field"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="label">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input-field"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Source */}
          <div>
            <label htmlFor="source" className="label">
              Source
            </label>
            <select
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select a source</option>
              {SOURCE_OPTIONS.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          {/* Salary Info */}
          <div>
            <label htmlFor="salary_info" className="label">
              Salary Info
            </label>
            <input
              type="text"
              id="salary_info"
              name="salary_info"
              value={formData.salary_info}
              onChange={handleChange}
              placeholder="e.g., ₹25-30L, discussed verbally"
              className="input-field"
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="label">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any initial notes..."
              rows={3}
              className="input-field resize-none"
            />
          </div>
        </form>

        {/* Sticky Bottom Save Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              {isSubmitting ? 'Saving...' : 'Save Job'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
