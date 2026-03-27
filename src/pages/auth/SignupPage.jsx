import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import useForm from '../../hooks/useForm'
import useAuthStore from '../../store/useAuthStore'

function validate(values) {
  const errors = {}
  if (!values.name.trim()) {
    errors.name = 'Name is required.'
  }
  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  }
  if (values.password.trim().length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }
  return errors
}

function SignupPage() {
  const navigate = useNavigate()
  const signup = useAuthStore((state) => state.signup)
  const authError = useAuthStore((state) => state.error)
  const loading = useAuthStore((state) => state.loading)

  const { values, errors, handleChange, handleSubmit } = useForm(
    { name: '', email: '', password: '' },
    validate,
    async (formValues) => {
      const success = await signup(formValues)
      if (success) {
        navigate('/dashboard')
      }
    },
  )

  return (
    <div>
      <h1 style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: 'clamp(1.5rem,2vw,1.75rem)', color: '#fff', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
        Create your account
      </h1>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Deploy as participant // Join a team anytime
      </p>

      <form className="mt-8" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          name="name"
          placeholder="Bushra Khan"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          icon="solar:user-linear"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@arena.dev"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          icon="solar:letter-linear"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Minimum 6 characters"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          icon="solar:lock-keyhole-linear"
        />

        {authError ? (
          <div className="flex items-center gap-2" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#ff4444' }}>
            <iconify-icon icon="solar:danger-triangle-linear" />
            {authError}
          </div>
        ) : null}

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>

      <p className="mt-6" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Already have access?{' '}
        <Link to="/auth/login" className="hover:text-[#00FF88] transition-colors" style={{ color: '#00FF88' }}>
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default SignupPage
