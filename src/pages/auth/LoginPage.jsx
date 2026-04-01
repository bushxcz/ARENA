import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import useForm from '../../hooks/useForm'
import useAuthStore from '../../store/useAuthStore'

function validate(values) {
  const errors = {}
  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  }
  if (!values.password.trim()) {
    errors.password = 'Password is required.'
  }
  return errors
}

function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const authError = useAuthStore((state) => state.error)
  const loading = useAuthStore((state) => state.loading)

  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    validate,
    async (formValues) => {
      const success = await login(formValues)
      if (success) {
        const user = useAuthStore.getState().user
        navigate('/profile')
      }
    },
  )

  return (
    <div>
      <h1 style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: 'clamp(1.5rem,2vw,1.75rem)', color: '#fff', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
        Welcome back
      </h1>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Authenticate // Resume your session
      </p>

      <form className="mt-8" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="captain@arena.dev"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          icon="solar:letter-linear"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
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
          {loading ? 'Signing in...' : 'Login'}
        </Button>
      </form>

      <p className="mt-6" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        New to the platform?{' '}
        <Link to="/auth/signup" className="hover:text-[#00FF88] transition-colors" style={{ color: '#00FF88' }}>
          Create an account
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
