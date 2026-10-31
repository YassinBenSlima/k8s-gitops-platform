import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  AwardIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  StarIcon,
  EditIcon,
  SaveIcon,
  XIcon,
  TrophyIcon,
  UsersIcon,
  ClockIcon,
  CheckCircle2Icon,
  SparklesIcon,
  BookOpenIcon,
  TargetIcon,
  TrendingUpIcon,
  HeartIcon } from
'lucide-react';
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  // Mock data for the doctor's profile
  const doctorProfile = {
    name: 'Dr. Sophie Dupont',
    email: 'sophie.dupont@smartortho.fr',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    specialization: 'Orthodontie',
    yearsOfExperience: 12,
    patientsServed: 1250,
    successRate: 98,
    bio: "Orthodontiste passionnée avec plus de 12 ans d'expérience dans le traitement des malocclusions complexes. Spécialisée dans l'orthodontie invisible et les techniques modernes.",
    certificates: [
    {
      id: 1,
      title: "Diplôme d'État de Docteur en Chirurgie Dentaire",
      institution: 'Université Paris Descartes',
      year: 2011,
      type: 'degree'
    },
    {
      id: 2,
      title: "Certificat d'Études Cliniques Spéciales en Orthodontie",
      institution: 'Université Paris Diderot',
      year: 2014,
      type: 'specialization'
    },
    {
      id: 3,
      title: 'Formation Invisalign Diamond Provider',
      institution: 'Align Technology',
      year: 2018,
      type: 'certification'
    },
    {
      id: 4,
      title: 'Certification en Orthodontie Linguale',
      institution: 'European Society of Lingual Orthodontics',
      year: 2019,
      type: 'certification'
    }],

    conferences: [
    {
      id: 1,
      name: "Congrès International d'Orthodontie",
      location: 'Paris, France',
      date: 'Septembre 2023',
      role: 'Conférencier',
      topic: 'Innovations en orthodontie invisible'
    },
    {
      id: 2,
      name: 'European Orthodontic Society Annual Meeting',
      location: 'Londres, UK',
      date: 'Juin 2023',
      role: 'Participant',
      topic: null
    },
    {
      id: 3,
      name: "Symposium sur l'Orthodontie Digitale",
      location: 'Lyon, France',
      date: 'Mars 2023',
      role: 'Conférencier',
      topic: "L'intelligence artificielle au service de l'orthodontie"
    },
    {
      id: 4,
      name: 'World Congress of Orthodontics',
      location: 'Tokyo, Japon',
      date: 'Octobre 2022',
      role: 'Participant',
      topic: null
    }],

    skills: [
    {
      category: 'Techniques Orthodontiques',
      items: [
      {
        name: 'Invisalign',
        level: 95
      },
      {
        name: 'Brackets Métalliques',
        level: 90
      },
      {
        name: 'Orthodontie Linguale',
        level: 85
      },
      {
        name: 'Brackets Céramiques',
        level: 92
      }]

    },
    {
      category: 'Technologies',
      items: [
      {
        name: 'Scanner Intra-oral',
        level: 98
      },
      {
        name: 'Imagerie 3D',
        level: 95
      },
      {
        name: 'Planification Digitale',
        level: 90
      },
      {
        name: 'Intelligence Artificielle',
        level: 80
      }]

    },
    {
      category: 'Compétences Cliniques',
      items: [
      {
        name: 'Diagnostic Orthodontique',
        level: 98
      },
      {
        name: 'Traitement des Adultes',
        level: 95
      },
      {
        name: 'Orthodontie Pédiatrique',
        level: 90
      },
      {
        name: 'Gestion des Cas Complexes',
        level: 92
      }]

    }],

    achievements: [
    {
      id: 1,
      title: 'Diamond Provider Invisalign',
      description: 'Reconnu pour plus de 500 cas traités avec Invisalign',
      year: 2023,
      icon: TrophyIcon,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 2,
      title: "Prix d'Excellence en Orthodontie",
      description: "Décerné par la Société Française d'Orthodontie",
      year: 2022,
      icon: AwardIcon,
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 3,
      title: 'Innovation en Santé Digitale',
      description: "Pour l'intégration de l'IA dans le diagnostic",
      year: 2023,
      icon: SparklesIcon,
      color: 'from-blue-500 to-cyan-600'
    }]

  };
  const getCertificateIcon = (type) => {
    switch (type) {
      case 'degree':
        return GraduationCapIcon;
      case 'specialization':
        return AwardIcon;
      case 'certification':
        return CheckCircle2Icon;
      default:
        return BookOpenIcon;
    }
  };
  const getCertificateColor = (type) => {
    switch (type) {
      case 'degree':
        return 'from-blue-500 to-indigo-600';
      case 'specialization':
        return 'from-purple-500 to-pink-600';
      case 'certification':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-gray-500 to-slate-600';
    }
  };
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">

        <div className="relative p-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}>
            </div>
          </div>
          <div className="relative flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <motion.div
              initial={{
                scale: 0,
                rotate: -180
              }}
              animate={{
                scale: 1,
                rotate: 0
              }}
              transition={{
                type: 'spring',
                duration: 0.8
              }}
              className="relative">

              <div className="h-40 w-40 rounded-full bg-gradient-to-br from-white to-blue-100 p-2 shadow-2xl">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <UserIcon className="h-20 w-20 text-white" />
                </div>
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-4 border-white flex items-center justify-center shadow-lg">

                <CheckCircle2Icon className="h-6 w-6 text-white" />
              </motion.div>
            </motion.div>
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <motion.h1
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.2
                }}
                className="text-3xl md:text-4xl font-bold text-white mb-2">

                {doctorProfile.name}
              </motion.h1>
              <motion.p
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.3
                }}
                className="text-blue-100 text-lg mb-4">

                {doctorProfile.specialization}
              </motion.p>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.4
                }}
                className="flex flex-wrap justify-center md:justify-start gap-4 text-white text-sm mb-6">

                <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
                  <MailIcon className="h-4 w-4 mr-2" />
                  {doctorProfile.email}
                </div>
                <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  {doctorProfile.phone}
                </div>
                <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  {doctorProfile.location}
                </div>
              </motion.div>
              <motion.button
                initial={{
                  opacity: 0,
                  scale: 0.8
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  delay: 0.5
                }}
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">

                {isEditing ?
                <>
                    <SaveIcon className="h-5 w-5 mr-2" />
                    Enregistrer
                  </> :

                <>
                    <EditIcon className="h-5 w-5 mr-2" />
                    Modifier le profil
                  </>
                }
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
        {
          label: "Années d'expérience",
          value: doctorProfile.yearsOfExperience,
          icon: ClockIcon,
          color: 'from-blue-500 to-cyan-600',
          suffix: 'ans'
        },
        {
          label: 'Patients traités',
          value: doctorProfile.patientsServed,
          icon: UsersIcon,
          color: 'from-purple-500 to-pink-600',
          suffix: '+'
        },
        {
          label: 'Taux de réussite',
          value: doctorProfile.successRate,
          icon: TrendingUpIcon,
          color: 'from-green-500 to-emerald-600',
          suffix: '%'
        },
        {
          label: 'Satisfaction',
          value: 4.9,
          icon: HeartIcon,
          color: 'from-red-500 to-rose-600',
          suffix: '/5'
        }].
        map((stat, index) =>
        <motion.div
          key={stat.label}
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.6 + index * 0.1
          }}
          whileHover={{
            scale: 1.05,
            y: -5
          }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-100 dark:border-gray-700">

            <div
            className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>

              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
              {stat.suffix}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </motion.div>
        )}
      </div>
      {/* Bio Section */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.8
        }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-100 dark:border-gray-700">

        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
            À propos
          </h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {doctorProfile.bio}
        </p>
      </motion.div>
      {/* Achievements */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.9
        }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-100 dark:border-gray-700">

        <div className="flex items-center mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <TrophyIcon className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
            Distinctions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {doctorProfile.achievements.map((achievement, index) =>
          <motion.div
            key={achievement.id}
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 1 + index * 0.1
            }}
            whileHover={{
              scale: 1.05,
              y: -5
            }}
            className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-700 dark:to-gray-750 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600">

              <div
              className={`h-14 w-14 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-4`}>

                <achievement.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {achievement.description}
              </p>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                <CalendarIcon className="h-3 w-3 mr-1" />
                {achievement.year}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      {/* Certificates */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 1.1
        }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-100 dark:border-gray-700">

        <div className="flex items-center mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <GraduationCapIcon className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
            Diplômes & Certifications
          </h2>
        </div>
        <div className="space-y-4">
          {doctorProfile.certificates.map((cert, index) => {
            const Icon = getCertificateIcon(cert.type);
            return (
              <motion.div
                key={cert.id}
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 1.2 + index * 0.1
                }}
                whileHover={{
                  x: 5
                }}
                className="flex items-start p-4 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-700 dark:to-gray-750 rounded-xl border-2 border-gray-200 dark:border-gray-600">

                <div
                  className={`flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br ${getCertificateColor(cert.type)} flex items-center justify-center`}>

                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.institution}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mt-1">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {cert.year}
                  </div>
                </div>
              </motion.div>);

          })}
        </div>
      </motion.div>
      {/* Skills */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 1.3
        }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-100 dark:border-gray-700">

        <div className="flex items-center mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <TargetIcon className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
            Compétences
          </h2>
        </div>
        <div className="space-y-6">
          {doctorProfile.skills.map((skillCategory, catIndex) =>
          <motion.div
            key={skillCategory.category}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 1.4 + catIndex * 0.1
            }}>

              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                {skillCategory.category}
              </h3>
              <div className="space-y-3">
                {skillCategory.items.map((skill, skillIndex) =>
              <motion.div
                key={skill.name}
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 1.5 + catIndex * 0.1 + skillIndex * 0.05
                }}>

                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                    initial={{
                      width: 0
                    }}
                    animate={{
                      width: `${skill.level}%`
                    }}
                    transition={{
                      delay: 1.6 + catIndex * 0.1 + skillIndex * 0.05,
                      duration: 0.8
                    }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />

                    </div>
                  </motion.div>
              )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      {/* Conferences */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 1.5
        }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-100 dark:border-gray-700">

        <div className="flex items-center mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <BriefcaseIcon className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
            Conférences & Événements
          </h2>
        </div>
        <div className="space-y-4">
          {doctorProfile.conferences.map((conference, index) =>
          <motion.div
            key={conference.id}
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: 1.6 + index * 0.1
            }}
            whileHover={{
              x: 5
            }}
            className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border-2 border-indigo-200 dark:border-indigo-800">

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {conference.name}
                    </h3>
                    <span
                    className={`ml-3 px-3 py-1 rounded-full text-xs font-bold ${conference.role === 'Conférencier' ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-700' : 'bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700'}`}>

                      {conference.role}
                    </span>
                  </div>
                  {conference.topic &&
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 italic">
                      "{conference.topic}"
                    </p>
                }
                  <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <MapPinIcon className="h-3 w-3 mr-1" />
                      {conference.location}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {conference.date}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>);

};
export default Profile;