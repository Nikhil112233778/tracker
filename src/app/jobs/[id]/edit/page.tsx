'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import type { JobStatus, JobSource, Job } from '@/lib/types'

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

export default function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [id, setId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
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

  useEffect(() => {
    params.then(p => {
      setId(p.id)
      loadJob(p.id)
    })
  }, [params])

  const loadJob = async (jobId: string) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`)
      const data = await res.json()

      if (data.success) {
        const job: Job = data.data.job
        setFormData({
          company: job.company,
          role: job.role,
          hr_name: job.hr_name,
          hr_email: job.hr_email || '',
          hr_phone: job.hr_phone || '',
          status: job.status,
          source: (job.source as JobSource) || '',
          notes: job.notes || '',
          salary_info: job.salary_info || '',
        })
      }
    } catch (error) {
      console.error('Error loading job:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.company.trim()) newErrors.company = 'Company name is required'
    if (!formData.role.trim()) newErrors.role = 'Role is required'
    if (!formData.hr_name.trim()) newErrors.hr_name = 'HR contact name is required'
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
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
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
        router.push(`/jobs/${id}`)
      } else {
        alert(data.error || 'Failed to update job')
      }
    } catch (error) {
      console.error('Error updating job:', error)
      alert('Failed to update job')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (res.ok && data.success) {
        router.push('/')
      } else {
        alert(data.error || 'Failed to delete job')
      }
    } catch (error) {
      console.error('Error deleting job:', error)
      alert('Failed to delete job')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background z-10 px-4 py-3 flex items-center border-b border-gray-100">
          <Link href={`/jobs/${id}`}>
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </Link>
          <h1 className="text-lg font-semibold ml-2">Edit Job</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* All form fields - same as NewJobPage */}
          <div>
            <label htmlFor="company" className="label">Company Name <span className="text-red-500">*</span></label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={`input-field ${errors.company ? 'border-red-500' : ''}`} />
            {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
          </div>

          <div>
            <label htmlFor="role" className="label">Role <span className="text-red-500">*</span></label>
            <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} className={`input-field ${errors.role ? 'border-red-500' : ''}`} />
            {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
          </div>

          <div>
            <label htmlFor="hr_name" className="label">HR Name <span className="text-red-500">*</span></label>
            <input type="text" id="hr_name" name="hr_name" value={formData.hr_name} onChange={handleChange} className={`input-field ${errors.hr_name ? 'border-red-500' : ''}`} />
            {errors.hr_name && <p className="text-xs text-red-500 mt-1">{errors.hr_name}</p>}
          </div>

          <div>
            <label htmlFor="hr_email" className="label">HR Email</label>
            <input type="email" id="hr_email" name="hr_email" value={formData.hr_email} onChange={handleChange} className={`input-field ${errors.hr_email ? 'border-red-500' : ''}`} />
            {errors.hr_email && <p className="text-xs text-red-500 mt-1">{errors.hr_email}</p>}
          </div>

          <div>
            <label htmlFor="hr_phone" className="label">HR Phone</label>
            <input type="tel" id="hr_phone" name="hr_phone" value={formData.hr_phone} onChange={handleChange} className="input-field" />
          </div>

          <div>
            <label htmlFor="status" className="label">Status <span className="text-red-500">*</span></label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className="input-field">
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="source" className="label">Source</label>
            <select id="source" name="source" value={formData.source} onChange={handleChange} className="input-field">
              <option value="">Select a source</option>
              {SOURCE_OPTIONS.map((source) => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="salary_info" className="label">Salary Info</label>
            <input type="text" id="salary_info" name="salary_info" value={formData.salary_info} onChange={handleChange} className="input-field" />
          </div>

          <div>
            <label htmlFor="notes" className="label">Notes</label>
            <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} className="input-field resize-none" />
          </div>

          {/* Delete Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowDeleteDialog(true)}
              className="text-red-600 hover:text-red-700 font-medium text-sm"
            >
              Delete Job
            </button>
          </div>
        </form>

        {/* Sticky Bottom Save Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto">
            <button onClick={handleSubmit} disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={handleDelete}
          title="Delete Job?"
          message="This will delete the job and all its conversations and reminders. This action cannot be undone."
          confirmText="Delete"
          confirmButtonClass="bg-red-600 hover:bg-red-700"
        />
      </div>
    </div>
  )
}
