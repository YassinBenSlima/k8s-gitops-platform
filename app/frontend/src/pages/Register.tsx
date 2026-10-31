import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MailIcon, LockIcon, EyeIcon, EyeOffIcon,
    UserIcon, CheckIcon, InfoIcon, HeartIcon,
    ShieldCheckIcon, AlertCircleIcon, CheckCircleIcon,
} from 'lucide-react';
import { AppLogo } from '../components/common/AppLogo';
import { useAuth } from '../contexts/AuthContext';

type Role = 'Patient' | 'Cardiologist' | 'Secretary';

const ROLES: { value: Role; label: string; description: string; color: string }[] = [
    { value: 'Patient', label: 'Patient', description: 'Accéder à mes données de santé', color: 'from-blue-500 to-cyan-500' },
    { value: 'Cardiologist', label: 'Cardiologue', description: 'Gérer les patients et diagnostics', color: 'from-red-500 to-rose-500' },
    { value: 'Secretary', label: 'Secrétaire', description: 'Gérer les rendez-vous et dossiers', color: 'from-emerald-500 to-teal-500' },
];

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [step, setStep] = useState<1 | 2>(1);
    const [selectedRole, setSelectedRole] = useState<Role | ''>('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // ── Password strength ──────────────────────────────────────────────────────
    const passwordStrength = (() => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[@$!%*#?&]/.test(password)) score++;
        return score;
    })();
    const strengthLabel = ['', 'Faible', 'Correct', 'Bon', 'Fort'][passwordStrength];
    const strengthColor = ['bg-gray-200', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'][passwordStrength];

    const validateStep1 = () => {
        if (!selectedRole) { setErrors({ role: 'Veuillez choisir un rôle' }); return false; }
        setErrors({});
        return true;
    };

    const validateStep2 = () => {
        const e: Record<string, string> = {};
        if (!email || !/\S+@\S+\.\S+/.test(email)) e.email = 'Email invalide';
        if (password.length < 8) e.password = 'Minimum 8 caractères';
        if (!/[@$!%*#?&]/.test(password)) e.password = 'Doit contenir un caractère spécial (@$!%*#?&)';
        if (!/[0-9]/.test(password)) e.password = 'Doit contenir au moins un chiffre';
        if (password !== confirmPassword) e.confirmPassword = 'Les mots de passe ne correspondent pas';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep2()) return;
        setIsLoading(true);
        setApiError('');
        try {
            await register({ email, password, role: selectedRole as Role, firstName: firstName || undefined, lastName: lastName || undefined });
            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err: unknown) {
            setApiError(err instanceof Error ? err.message : 'Inscription échouée');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
                    <AppLogo size="lg" variant="full" animate={true} />
                    <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Créer un compte</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Rejoignez HealthPilot en quelques étapes</p>
                </motion.div>

                {/* Step indicators */}
                <div className="flex items-center mb-8">
                    {[1, 2].map((s, i) => (
                        <React.Fragment key={s}>
                            <div className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all ${step >= s ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-gray-100 text-gray-400 dark:bg-gray-800'}`}>
                                {step > s ? <CheckIcon className="h-4 w-4" /> : s}
                            </div>
                            {i < 1 && <div className={`flex-1 h-1 mx-2 rounded transition-all ${step > 1 ? 'bg-red-400' : 'bg-gray-100 dark:bg-gray-800'}`} />}
                        </React.Fragment>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {success ? (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircleIcon className="h-10 w-10 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Compte créé !</h2>
                            <p className="text-gray-500">Redirection vers votre tableau de bord...</p>
                        </motion.div>
                    ) : step === 1 ? (
                        /* ── Step 1: Role ────────────────────────────────────────────── */
                        <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quel est votre rôle ?</h2>
                            <div className="space-y-3 mb-6">
                                {ROLES.map(role => (
                                    <motion.button key={role.value} type="button" onClick={() => { setSelectedRole(role.value); setErrors({}); }}
                                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                                        className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${selectedRole === role.value ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center flex-shrink-0`}>
                                            <HeartIcon className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">{role.label}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{role.description}</div>
                                        </div>
                                        {selectedRole === role.value && <CheckIcon className="ml-auto h-5 w-5 text-red-600 flex-shrink-0" />}
                                    </motion.button>
                                ))}
                            </div>
                            {errors.role && <p className="mb-3 text-sm text-red-600 flex items-center gap-1"><InfoIcon className="h-4 w-4" />{errors.role}</p>}
                            <motion.button onClick={() => validateStep1() && setStep(2)}
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium shadow-lg hover:from-red-700 hover:to-rose-700 transition-all">
                                Continuer →
                            </motion.button>
                            <p className="mt-4 text-center text-sm text-gray-500">
                                Déjà un compte ?{' '}
                                <Link to="/login" className="text-red-600 font-medium hover:text-red-700">Se connecter</Link>
                            </p>
                        </motion.div>
                    ) : (
                        /* ── Step 2: Credentials ─────────────────────────────────────── */
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            {apiError && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
                                    <AlertCircleIcon className="h-4 w-4 flex-shrink-0" />{apiError}
                                </motion.div>
                            )}

                            <form onSubmit={handleRegister} className="space-y-4">
                                {/* Name row */}
                                <div className="grid grid-cols-2 gap-3">
                                    {[['Prénom', firstName, setFirstName, 'firstName'], ['Nom', lastName, setLastName, 'lastName']].map(([label, value, setter, key]) => (
                                        <div key={key as string}>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label as string}</label>
                                            <div className="relative">
                                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <input type="text" value={value as string} onChange={e => (setter as React.Dispatch<React.SetStateAction<string>>)(e.target.value)}
                                                    className="w-full pl-9 pr-3 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all"
                                                    placeholder={label as string} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                                            className={`w-full pl-9 pr-3 py-3 rounded-xl border-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-200 focus:outline-none transition-all ${errors.email ? 'border-red-300' : 'border-gray-200 dark:border-gray-600 focus:border-red-500'}`}
                                            placeholder="votre@email.com" />
                                    </div>
                                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mot de passe <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
                                            className={`w-full pl-9 pr-10 py-3 rounded-xl border-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-200 focus:outline-none transition-all ${errors.password ? 'border-red-300' : 'border-gray-200 dark:border-gray-600 focus:border-red-500'}`}
                                            placeholder="Min. 8 caractères" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {showPassword ? <EyeOffIcon className="h-4 w-4 text-gray-400" /> : <EyeIcon className="h-4 w-4 text-gray-400" />}
                                        </button>
                                    </div>
                                    {/* Strength bar */}
                                    {password && (
                                        <div className="mt-2">
                                            <div className="flex gap-1 mb-1">
                                                {[1, 2, 3, 4].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= passwordStrength ? strengthColor : 'bg-gray-200'}`} />)}
                                            </div>
                                            <p className="text-xs text-gray-500">Force : <span className="font-medium">{strengthLabel}</span></p>
                                        </div>
                                    )}
                                    {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                                </div>

                                {/* Confirm password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmer le mot de passe <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <ShieldCheckIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirmPassword: '' })); }}
                                            className={`w-full pl-9 pr-10 py-3 rounded-xl border-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-200 focus:outline-none transition-all ${errors.confirmPassword ? 'border-red-300' : confirmPassword && confirmPassword === password ? 'border-green-400' : 'border-gray-200 dark:border-gray-600 focus:border-red-500'}`}
                                            placeholder="Répéter le mot de passe" />
                                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {showConfirm ? <EyeOffIcon className="h-4 w-4 text-gray-400" /> : <EyeIcon className="h-4 w-4 text-gray-400" />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <motion.button type="button" onClick={() => setStep(1)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                        className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 dark:text-gray-300 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                                        ← Retour
                                    </motion.button>
                                    <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                        className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium shadow-lg hover:from-red-700 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
                                        {isLoading ? (
                                            <><svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Inscription...</>
                                        ) : (
                                            <><HeartIcon className="h-4 w-4" />Créer mon compte</>
                                        )}
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Register;
