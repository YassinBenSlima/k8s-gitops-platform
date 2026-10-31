import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../node_modules/react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import {
  CheckCircleIcon,
  UsersIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  SmartphoneIcon,
  ShieldIcon,
  ArrowLeftIcon,
  InfoIcon,
  KeyIcon,
  CheckIcon,
  ZapIcon,
  StarIcon,
  AwardIcon,
  HeartIcon,
  BrainIcon,
  ActivityIcon
} from
  'lucide-react';
import { AppLogo } from '../components/common/AppLogo';
import { useAuth } from '../contexts/AuthContext';
const Login = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const { login, verifyMfa } = useAuth();
  const [mfaToken, setMfaToken] = useState<string>('');
  const [serverError, setServerError] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [mfaMethod, setMfaMethod] = useState<'code' | 'qr'>('code');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    mfa: ''
  });
  const [completedFields, setCompletedFields] = useState({
    email: false,
    password: false
  });
  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      mfa: ''
    };
    let isValid = true;
    if (!email) {
      newErrors.email = 'Email requis';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email invalide';
      isValid = false;
    }
    if (!password) {
      newErrors.password = 'Mot de passe requis';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setCompletedFields((prev) => ({
      ...prev,
      email: !!(value && /\S+@\S+\.\S+/.test(value))
    }));
    if (errors.email)
      setErrors((prev) => ({
        ...prev,
        email: ''
      }));
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setCompletedFields((prev) => ({
      ...prev,
      password: !!(value && value.length >= 6)
    }));
    if (errors.password)
      setErrors((prev) => ({
        ...prev,
        password: ''
      }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setServerError('');
    try {
      const result = await login(email, password);
      if (result.mfaRequired && result.mfaToken) {
        setMfaToken(result.mfaToken);
        setShowMFA(true);
      } else {
        navigate('/dashboard');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Identifiants incorrects';
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleMFASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaCode.length !== 6) {
      setErrors(prev => ({ ...prev, mfa: 'Code à 6 chiffres requis' }));
      return;
    }
    setIsLoading(true);
    setErrors(prev => ({ ...prev, mfa: '' }));
    try {
      await verifyMfa(mfaToken, mfaCode);
      navigate('/dashboard');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Code MFA invalide';
      setErrors(prev => ({ ...prev, mfa: message }));
    } finally {
      setIsLoading(false);
    }
  };
  const handleBackToLogin = () => {
    setShowMFA(false);
    setMfaCode('');
    setErrors({
      ...errors,
      mfa: ''
    });
  };
  const features = [
    {
      icon: ActivityIcon,
      title: 'ECG & Imagerie',
      description: 'Analyse ECG et imagerie cardiaque avancée',
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: BrainIcon,
      title: 'IA Cardiaque',
      description: 'Score de risque AFib/IC assisté par IA',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ShieldIcon,
      title: 'Suivi Complet',
      description: 'Protocoles de soins et suivi personnalisé',
      color: 'from-emerald-500 to-teal-500'
    }];

  const progressPercentage =
    (completedFields.email ? 50 : 0) + (completedFields.password ? 50 : 0);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <motion.div
          initial={{
            opacity: 0,
            x: -50
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            duration: 0.6
          }}
          className="w-full max-w-md">

          <div className="mb-8">
            <motion.div
              initial={{
                opacity: 0,
                y: -10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.5
              }}
              className="mb-6">

              <AppLogo size="lg" variant="full" animate={true} />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {showMFA ? 'Vérification de sécurité' : 'Bienvenue !'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {showMFA ?
                'Protégez votre compte avec la vérification en deux étapes' :
                'Connectez-vous pour accéder à votre tableau de bord cardiologie'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!showMFA ?
              <motion.div
                key="login"
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -20
                }}
                transition={{
                  duration: 0.3
                }}>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Progression
                    </span>
                    <span className="text-sm font-bold text-red-600 dark:text-red-400">
                      {progressPercentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{
                        width: 0
                      }}
                      animate={{
                        width: `${progressPercentage}%`
                      }}
                      transition={{
                        duration: 0.5,
                        ease: 'easeOut'
                      }}
                      className="h-full bg-gradient-to-r from-red-500 to-rose-600 rounded-full" />

                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Server error banner */}
                  {serverError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                      <InfoIcon className="h-4 w-4 flex-shrink-0" />
                      {serverError}
                    </motion.div>
                  )}
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MailIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={handleEmailChange}
                        className={`appearance-none block w-full pl-10 pr-10 py-3 rounded-xl border-2 transition-all dark:bg-gray-800 dark:text-white ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : completedFields.email ? 'border-green-300 focus:border-green-500 focus:ring-green-200' : 'border-gray-200 focus:border-red-500 focus:ring-red-200 dark:border-gray-600'} focus:ring-2 focus:outline-none placeholder-gray-400`}
                        placeholder="votre@email.com" />

                      {completedFields.email && !errors.email &&
                        <motion.div
                          initial={{
                            scale: 0
                          }}
                          animate={{
                            scale: 1
                          }}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center">

                          <CheckIcon className="h-5 w-5 text-green-500" />
                        </motion.div>
                      }
                    </div>
                    {errors.email &&
                      <motion.p
                        initial={{
                          opacity: 0,
                          y: -10
                        }}
                        animate={{
                          opacity: 1,
                          y: 0
                        }}
                        className="mt-2 text-sm text-red-600 flex items-center">

                        <InfoIcon className="h-4 w-4 mr-1" />
                        {errors.email}
                      </motion.p>
                    }
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                      Mot de passe <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={`appearance-none block w-full pl-10 pr-10 py-3 rounded-xl border-2 transition-all dark:bg-gray-800 dark:text-white ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : completedFields.password ? 'border-green-300 focus:border-green-500 focus:ring-green-200' : 'border-gray-200 focus:border-red-500 focus:ring-red-200 dark:border-gray-600'} focus:ring-2 focus:outline-none placeholder-gray-400`}
                        placeholder="••••••••" />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center">

                        {showPassword ?
                          <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" /> :

                          <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        }
                      </button>
                    </div>
                    {errors.password &&
                      <motion.p
                        initial={{
                          opacity: 0,
                          y: -10
                        }}
                        animate={{
                          opacity: 1,
                          y: 0
                        }}
                        className="mt-2 text-sm text-red-600 flex items-center">

                        <InfoIcon className="h-4 w-4 mr-1" />
                        {errors.password}
                      </motion.p>
                    }
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />

                      <span className="ml-2 block text-sm text-gray-700 dark:text-gray-300 font-medium">
                        Se souvenir de moi
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">

                      Mot de passe oublié?
                    </a>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all">

                    {isLoading ?
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24">

                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4" />

                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />

                        </svg>
                        Connexion en cours...
                      </span> :

                      <>
                        <HeartIcon className="h-5 w-5 mr-2" />
                        Se connecter
                      </>
                    }
                  </motion.button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Pas encore de compte?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/register')}
                      className="font-medium text-red-600 dark:text-red-400 hover:text-red-700 transition-colors underline">
                      Créer un compte
                    </button>
                  </p>
                </div>
              </motion.div> :

              <motion.div
                key="mfa"
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  x: -20
                }}
                transition={{
                  duration: 0.3
                }}>

                <motion.button
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  onClick={handleBackToLogin}
                  className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 mb-6">

                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Retour
                </motion.button>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <motion.button
                    whileHover={{
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                    type="button"
                    onClick={() => setMfaMethod('code')}
                    className={`p-4 rounded-xl border-2 transition-all ${mfaMethod === 'code' ? 'border-red-500 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>

                    <KeyIcon
                      className={`h-6 w-6 mx-auto mb-2 ${mfaMethod === 'code' ? 'text-red-600' : 'text-gray-400'}`} />

                    <span
                      className={`text-sm font-medium ${mfaMethod === 'code' ? 'text-red-900 dark:text-red-200' : 'text-gray-700 dark:text-gray-300'}`}>

                      Code
                    </span>
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                    type="button"
                    onClick={() => setMfaMethod('qr')}
                    className={`p-4 rounded-xl border-2 transition-all ${mfaMethod === 'qr' ? 'border-red-500 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>

                    <SmartphoneIcon
                      className={`h-6 w-6 mx-auto mb-2 ${mfaMethod === 'qr' ? 'text-red-600' : 'text-gray-400'}`} />

                    <span
                      className={`text-sm font-medium ${mfaMethod === 'qr' ? 'text-red-900 dark:text-red-200' : 'text-gray-700 dark:text-gray-300'}`}>

                      QR Code
                    </span>
                  </motion.button>
                </div>

                <form onSubmit={handleMFASubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="mfa-code"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

                      Code de vérification
                    </label>
                    <input
                      type="text"
                      id="mfa-code"
                      maxLength={6}
                      value={mfaCode}
                      onChange={(e) =>
                        setMfaCode(e.target.value.replace(/\D/g, ''))
                      }
                      className="block w-full px-4 py-3 text-center text-2xl font-mono tracking-widest rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all"
                      placeholder="000000" />

                  </div>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-all">

                    {isLoading ? 'Vérification...' : 'Vérifier'}
                  </motion.button>
                </form>
              </motion.div>
            }
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-red-700 via-rose-600 to-pink-700 relative overflow-hidden">
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

        <motion.div
          animate={{
            rotate: -360
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl" />


        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <motion.div
            initial={{
              opacity: 0,
              y: 50
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.2
            }}
            className="text-center mb-12">

            <motion.div
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="inline-block mb-6">

              <div className="h-24 w-24 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center border border-white/30">
                <HeartIcon className="h-12 w-12 text-white" />
              </div>
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">
              Bienvenue sur CardioSuite
            </h2>
            <p className="text-xl text-red-100">
              La plateforme tout-en-un pour les cardiologues
            </p>
          </motion.div>

          <div className="space-y-6 w-full max-w-md">
            {features.map((feature, index) =>
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  x: 50
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.1
                }}
                whileHover={{
                  scale: 1.05,
                  x: 10
                }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">

                <div className="flex items-start">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mr-4 flex-shrink-0`}>

                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                    <p className="text-red-100 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.8
            }}
            className="grid grid-cols-3 gap-8 mt-12 w-full max-w-md">

            {[
              {
                icon: UsersIcon,
                value: '5K+',
                label: 'Patients'
              },
              {
                icon: AwardIcon,
                value: '99%',
                label: 'Précision IA'
              },
              {
                icon: StarIcon,
                value: '4.9',
                label: 'Note moyenne'
              }].
              map((stat, index) =>
                <motion.div
                  key={stat.label}
                  whileHover={{
                    scale: 1.1
                  }}
                  className="text-center">

                  <div className="h-12 w-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mx-auto mb-2 border border-white/30">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-red-100">{stat.label}</div>
                </motion.div>
              )}
          </motion.div>
        </div>
      </div>
    </div>);

};
export default Login;