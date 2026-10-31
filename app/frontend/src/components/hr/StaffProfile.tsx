import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  AwardIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  TrophyIcon,
  ClockIcon,
  CheckCircle2Icon,
  EditIcon,
  SaveIcon,
  TrendingUpIcon,
  HeartIcon,
  StarIcon,
  FileTextIcon,
  DollarSignIcon,
  TargetIcon,
  ActivityIcon,
  AlertCircleIcon,
  ThumbsUpIcon,
  MessageSquareIcon,
  BookOpenIcon,
  BadgeIcon,
  XIcon } from
'lucide-react';
// Mock initial data
const INITIAL_STAFF_DATA = {
  id: '1',
  name: 'Sarah Martin',
  role: 'Assistante dentaire',
  email: 'sarah.martin@orthobizz.com',
  phone: '+216 98 765 432',
  location: 'Tunis, Tunisie',
  joinDate: '15 Mars 2020',
  birthDate: '12 Juin 1995',
  address: '123 Avenue Habib Bourguiba, Tunis',
  emergencyContact: '+216 98 111 222',
  status: 'active',
  avatar: 'SM',
  contractType: 'CDI',
  salary: '2500 TND',
  workSchedule: 'Temps plein',
  bio: "Assistante dentaire passionnée et dévouée avec plus de 4 ans d'expérience. Excellente dans la gestion des patients et le support technique lors des interventions orthodontiques.",
  performance: {
    overall: 4.5,
    punctuality: 4.8,
    teamwork: 4.6,
    professionalism: 4.7,
    skills: 4.3
  },
  attendance: {
    totalDays: 250,
    presentDays: 242,
    absences: 5,
    lateArrivals: 3,
    attendanceRate: 96.8
  },
  leaveBalance: {
    annual: {
      total: 30,
      used: 12,
      remaining: 18
    },
    sick: {
      total: 15,
      used: 3,
      remaining: 12
    },
    personal: {
      total: 5,
      used: 2,
      remaining: 3
    }
  },
  certificates: [
  {
    id: 1,
    title: "Diplôme d'Assistante Dentaire",
    institution: 'Institut de Formation Dentaire de Tunis',
    year: 2019,
    type: 'degree'
  },
  {
    id: 2,
    title: 'Formation en Stérilisation',
    institution: 'Centre de Formation Médicale',
    year: 2020,
    type: 'certification'
  },
  {
    id: 3,
    title: 'Premiers Secours',
    institution: 'Croissant Rouge Tunisien',
    year: 2021,
    type: 'certification'
  }],

  skills: [
  {
    name: 'Assistance Clinique',
    level: 95
  },
  {
    name: 'Stérilisation',
    level: 98
  },
  {
    name: 'Gestion des Patients',
    level: 90
  },
  {
    name: 'Radiographie',
    level: 85
  },
  {
    name: 'Gestion du Stock',
    level: 88
  },
  {
    name: 'Communication',
    level: 92
  }],

  evaluations: [
  {
    id: 1,
    date: '15 Déc 2023',
    evaluator: 'Dr. Sophie Dupont',
    score: 4.5,
    strengths: [
    'Ponctualité',
    'Compétences techniques',
    'Relations patients'],

    improvements: ['Gestion du temps']
  },
  {
    id: 2,
    date: '15 Juin 2023',
    evaluator: 'Dr. Sophie Dupont',
    score: 4.3,
    strengths: ['Professionnalisme', "Travail d'équipe"],
    improvements: ['Organisation']
  }],

  feedback: [
  {
    id: 1,
    from: 'Dr. Sophie Dupont',
    date: '10 Jan 2024',
    comment:
    'Excellent travail sur le cas complexe de Mme Benali. Très professionnelle.',
    type: 'positive'
  },
  {
    id: 2,
    from: 'Marc Dubois',
    date: '5 Jan 2024',
    comment: 'Très bonne collaboration sur la gestion du planning.',
    type: 'positive'
  }],

  trainings: [
  {
    id: 1,
    title: 'Nouvelles Techniques de Stérilisation',
    date: 'Nov 2023',
    duration: '2 jours',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Gestion du Stress au Travail',
    date: 'Sep 2023',
    duration: '1 jour',
    status: 'completed'
  },
  {
    id: 3,
    title: 'Communication avec les Patients',
    date: 'Fév 2024',
    duration: '3 jours',
    status: 'planned'
  }]

};
const StaffProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staffMember, setStaffMember] = useState(INITIAL_STAFF_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(INITIAL_STAFF_DATA);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const handleEditProfile = () => {
    // Split name into firstName / lastName
    const nameParts = staffMember.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    navigate('/hr/staff/new', {
      state: {
        staffData: {
          firstName,
          lastName,
          dateOfBirth: staffMember.birthDate || '',
          email: staffMember.email,
          phone: staffMember.phone,
          address: staffMember.address || '',
          city: '',
          postalCode: '',
          emergencyContact: staffMember.emergencyContact || '',
          position: staffMember.role,
          department: '',
          startDate: '',
          contractType: staffMember.contractType || 'CDI',
          salary: staffMember.salary ?
          staffMember.salary.replace(/[^0-9.]/g, '') :
          '',
          workingHours: '40',
          workSchedule: staffMember.workSchedule || 'Temps plein',
          cin: '',
          socialSecurity: '',
          notes: '',
          bio: staffMember.bio || '',
          skills: staffMember.skills.map((s) => ({
            name: s.name,
            level: s.level
          })),
          certificates: staffMember.certificates.map((c) => ({
            title: c.title,
            institution: c.institution,
            year: c.year,
            type: c.type
          })),
          trainings: staffMember.trainings.map((t) => ({
            title: t.title,
            date: t.date,
            duration: t.duration,
            status: t.status
          }))
        }
      }
    });
  };
  // Sync editData when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setEditData(JSON.parse(JSON.stringify(staffMember)));
    }
  }, [isEditing, staffMember]);
  const handleBack = () => {
    navigate('/hr/staff');
  };
  const handleSave = () => {
    setStaffMember(editData);
    setIsEditing(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };
  const handleCancel = () => {
    setIsEditing(false);
    setEditData(JSON.parse(JSON.stringify(staffMember)));
  };
  const updateField = (field: string, value: any) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const updateNestedField = (parent: string, field: string, value: any) => {
    setEditData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value
      }
    }));
  };
  const updateDeepNestedField = (
  parent: string,
  child: string,
  field: string,
  value: any) =>
  {
    setEditData((prev) => {
      const parentObj = prev[parent as keyof typeof prev] as any;
      return {
        ...prev,
        [parent]: {
          ...parentObj,
          [child]: {
            ...parentObj[child],
            [field]: value
          }
        }
      };
    });
  };
  const updateArrayItem = (
  arrayName: string,
  index: number,
  field: string,
  value: any) =>
  {
    setEditData((prev) => {
      const newArray = [...(prev[arrayName as keyof typeof prev] as any[])];
      newArray[index] = {
        ...newArray[index],
        [field]: value
      };
      return {
        ...prev,
        [arrayName]: newArray
      };
    });
  };
  // Auto-calculate attendance rate
  useEffect(() => {
    if (isEditing) {
      const rate =
      editData.attendance.totalDays > 0 ?
      (
      editData.attendance.presentDays /
      editData.attendance.totalDays *
      100).
      toFixed(1) :
      0;
      if (rate !== editData.attendance.attendanceRate) {
        updateNestedField('attendance', 'attendanceRate', rate);
      }
    }
  }, [
  editData.attendance.presentDays,
  editData.attendance.totalDays,
  isEditing]
  );
  // Auto-calculate leave remaining
  useEffect(() => {
    if (isEditing) {
      ;['annual', 'sick', 'personal'].forEach((type) => {
        const balance =
        editData.leaveBalance[type as keyof typeof editData.leaveBalance];
        const remaining = balance.total - balance.used;
        if (remaining !== balance.remaining) {
          updateDeepNestedField('leaveBalance', type, 'remaining', remaining);
        }
      });
    }
  }, [
  editData.leaveBalance.annual.total,
  editData.leaveBalance.annual.used,
  editData.leaveBalance.sick.total,
  editData.leaveBalance.sick.used,
  editData.leaveBalance.personal.total,
  editData.leaveBalance.personal.used,
  isEditing]
  );
  const inputStyle =
  'w-full bg-white/10 dark:bg-gray-600 border-2 border-purple-300 dark:border-purple-500 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all';
  const headerInputStyle =
  'w-full bg-white/20 border border-white/40 rounded-lg px-3 py-1.5 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:outline-none transition-all';
  return (
    <div className="space-y-6 relative">
      {/* Success Toast */}
      <AnimatePresence>
        {showSaveSuccess &&
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
            x: '-50%'
          }}
          animate={{
            opacity: 1,
            y: 0,
            x: '-50%'
          }}
          exit={{
            opacity: 0,
            y: -20,
            x: '-50%'
          }}
          className="fixed top-24 left-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">

            <CheckCircle2Icon className="h-5 w-5" />
            <span className="font-medium">Profil mis à jour avec succès</span>
          </motion.div>
        }
      </AnimatePresence>

      {/* Back Button */}
      <motion.button
        initial={{
          opacity: 0,
          x: -20
        }}
        animate={{
          opacity: 1,
          x: 0
        }}
        onClick={handleBack}
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">

        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Retour au personnel
      </motion.button>

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
        className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-2xl shadow-xl overflow-hidden">

        <div className="relative p-8">
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

              <div className="h-40 w-40 rounded-full bg-gradient-to-br from-white to-purple-100 p-2 shadow-2xl">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">
                    {isEditing ? editData.avatar : staffMember.avatar}
                  </span>
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
                className={`absolute -bottom-2 -right-2 h-12 w-12 rounded-full border-4 border-white flex items-center justify-center shadow-lg ${(isEditing ? editData.status : staffMember.status) === 'active' ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-amber-400 to-orange-500'}`}>

                <CheckCircle2Icon className="h-6 w-6 text-white" />
              </motion.div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left w-full">
              {isEditing ?
              <div className="space-y-3 mb-4 max-w-md">
                  <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`${headerInputStyle} text-2xl font-bold`}
                  placeholder="Nom complet" />

                  <input
                  type="text"
                  value={editData.role}
                  onChange={(e) => updateField('role', e.target.value)}
                  className={headerInputStyle}
                  placeholder="Rôle" />

                  <select
                  value={editData.status}
                  onChange={(e) => updateField('status', e.target.value)}
                  className={`${headerInputStyle} bg-white/20 text-white`}>

                    <option value="active" className="text-gray-900">
                      Actif
                    </option>
                    <option value="vacation" className="text-gray-900">
                      En congé
                    </option>
                  </select>
                </div> :

              <>
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

                    {staffMember.name}
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
                  className="text-purple-100 text-lg mb-4">

                    {staffMember.role}
                  </motion.p>
                </>
              }

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
                  <MailIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                  {isEditing ?
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="bg-transparent border-none p-0 text-white placeholder-white/60 focus:ring-0 w-full" /> :


                  staffMember.email
                  }
                </div>
                <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
                  <PhoneIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                  {isEditing ?
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="bg-transparent border-none p-0 text-white placeholder-white/60 focus:ring-0 w-full" /> :


                  staffMember.phone
                  }
                </div>
                <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
                  <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                  {isEditing ?
                  <div className="flex items-center gap-1">
                      <span>Depuis le</span>
                      <input
                      type="text"
                      value={editData.joinDate}
                      onChange={(e) =>
                      updateField('joinDate', e.target.value)
                      }
                      className="bg-transparent border-none p-0 text-white placeholder-white/60 focus:ring-0 w-24" />

                    </div> :

                  `Depuis le ${staffMember.joinDate}`
                  }
                </div>
              </motion.div>

              <div className="flex gap-3 justify-center md:justify-start">
                {isEditing ?
                <>
                    <motion.button
                    whileHover={{
                      scale: 1.05
                    }}
                    whileTap={{
                      scale: 0.95
                    }}
                    onClick={handleSave}
                    className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-xl font-bold shadow-lg hover:bg-green-600 transition-all">

                      <SaveIcon className="h-5 w-5 mr-2" />
                      Enregistrer
                    </motion.button>
                    <motion.button
                    whileHover={{
                      scale: 1.05
                    }}
                    whileTap={{
                      scale: 0.95
                    }}
                    onClick={handleCancel}
                    className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-xl font-bold shadow-lg hover:bg-white/30 transition-all">

                      <XIcon className="h-5 w-5 mr-2" />
                      Annuler
                    </motion.button>
                  </> :

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
                  onClick={handleEditProfile}
                  className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">

                    <EditIcon className="h-5 w-5 mr-2" />
                    Modifier le profil
                  </motion.button>
                }
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
        {
          label: 'Performance',
          value: isEditing ?
          editData.performance.overall :
          staffMember.performance.overall,
          icon: TrendingUpIcon,
          color: 'from-blue-500 to-cyan-600',
          suffix: '/5'
        },
        {
          label: 'Présence',
          value: isEditing ?
          editData.attendance.attendanceRate :
          staffMember.attendance.attendanceRate,
          icon: ClockIcon,
          color: 'from-green-500 to-emerald-600',
          suffix: '%'
        },
        {
          label: 'Ancienneté',
          value: 4,
          icon: CalendarIcon,
          color: 'from-purple-500 to-pink-600',
          suffix: ' ans'
        },
        {
          label: 'Satisfaction',
          value: 4.6,
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
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
            À propos
          </h2>
        </div>

        {isEditing ?
        <textarea
          value={editData.bio}
          onChange={(e) => updateField('bio', e.target.value)}
          className={`${inputStyle} min-h-[100px] mb-4`}
          placeholder="Biographie..." /> :


        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {staffMember.bio}
          </p>
        }

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPinIcon className="h-4 w-4 mr-2 text-purple-500 flex-shrink-0" />
            <span className="font-medium mr-2 whitespace-nowrap">Adresse:</span>
            {isEditing ?
            <input
              type="text"
              value={editData.address}
              onChange={(e) => updateField('address', e.target.value)}
              className={inputStyle} /> :


            staffMember.address
            }
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <CalendarIcon className="h-4 w-4 mr-2 text-purple-500 flex-shrink-0" />
            <span className="font-medium mr-2 whitespace-nowrap">
              Date de naissance:
            </span>
            {isEditing ?
            <input
              type="text"
              value={editData.birthDate}
              onChange={(e) => updateField('birthDate', e.target.value)}
              className={inputStyle} /> :


            staffMember.birthDate
            }
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <PhoneIcon className="h-4 w-4 mr-2 text-purple-500 flex-shrink-0" />
            <span className="font-medium mr-2 whitespace-nowrap">
              Contact d'urgence:
            </span>
            {isEditing ?
            <input
              type="tel"
              value={editData.emergencyContact}
              onChange={(e) =>
              updateField('emergencyContact', e.target.value)
              }
              className={inputStyle} /> :


            staffMember.emergencyContact
            }
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <FileTextIcon className="h-4 w-4 mr-2 text-purple-500 flex-shrink-0" />
            <span className="font-medium mr-2 whitespace-nowrap">
              Type de contrat:
            </span>
            {isEditing ?
            <select
              value={editData.contractType}
              onChange={(e) => updateField('contractType', e.target.value)}
              className={inputStyle}>

                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
                <option value="Apprentissage">Apprentissage</option>
              </select> :

            staffMember.contractType
            }
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <DollarSignIcon className="h-4 w-4 mr-2 text-purple-500 flex-shrink-0" />
            <span className="font-medium mr-2 whitespace-nowrap">Salaire:</span>
            {isEditing ?
            <input
              type="text"
              value={editData.salary}
              onChange={(e) => updateField('salary', e.target.value)}
              className={inputStyle} /> :


            staffMember.salary
            }
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <ClockIcon className="h-4 w-4 mr-2 text-purple-500 flex-shrink-0" />
            <span className="font-medium mr-2 whitespace-nowrap">
              Horaires:
            </span>
            {isEditing ?
            <input
              type="text"
              value={editData.workSchedule}
              onChange={(e) => updateField('workSchedule', e.target.value)}
              className={inputStyle} /> :


            staffMember.workSchedule
            }
          </div>
        </div>
      </motion.div>

      {/* Performance Details */}
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
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <TrendingUpIcon className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
            Détails de Performance
          </h2>
        </div>
        <div className="space-y-4">
          {Object.entries(
            isEditing ? editData.performance : staffMember.performance
          ).map(([key, value], index) => {
            const labels = {
              overall: 'Performance Globale',
              punctuality: 'Ponctualité',
              teamwork: "Travail d'équipe",
              professionalism: 'Professionnalisme',
              skills: 'Compétences Techniques'
            };
            return (
              <motion.div
                key={key}
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 1 + index * 0.05
                }}>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {labels[key as keyof typeof labels]}
                  </span>
                  {isEditing ?
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={value}
                    onChange={(e) =>
                    updateNestedField(
                      'performance',
                      key,
                      parseFloat(e.target.value)
                    )
                    }
                    className={`${inputStyle} w-20 text-right`} /> :


                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {value}/5
                    </span>
                  }
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{
                      width: 0
                    }}
                    animate={{
                      width: `${value / 5 * 100}%`
                    }}
                    transition={{
                      delay: 1.1 + index * 0.05,
                      duration: 0.8
                    }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />

                </div>
              </motion.div>);

          })}
        </div>
      </motion.div>

      {/* Attendance & Leave */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance */}
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
              <ClockIcon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
              Présence
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Jours présents
              </span>
              <div className="flex items-center gap-2">
                {isEditing ?
                <>
                    <input
                    type="number"
                    value={editData.attendance.presentDays}
                    onChange={(e) =>
                    updateNestedField(
                      'attendance',
                      'presentDays',
                      parseInt(e.target.value)
                    )
                    }
                    className={`${inputStyle} w-20 text-right`} />

                    <span className="text-gray-400">/</span>
                    <input
                    type="number"
                    value={editData.attendance.totalDays}
                    onChange={(e) =>
                    updateNestedField(
                      'attendance',
                      'totalDays',
                      parseInt(e.target.value)
                    )
                    }
                    className={`${inputStyle} w-20 text-right`} />

                  </> :

                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {staffMember.attendance.presentDays}/
                    {staffMember.attendance.totalDays}
                  </span>
                }
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Absences
              </span>
              {isEditing ?
              <input
                type="number"
                value={editData.attendance.absences}
                onChange={(e) =>
                updateNestedField(
                  'attendance',
                  'absences',
                  parseInt(e.target.value)
                )
                }
                className={`${inputStyle} w-20 text-right`} /> :


              <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {staffMember.attendance.absences}
                </span>
              }
            </div>
            <div className="flex justify-between items-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Retards
              </span>
              {isEditing ?
              <input
                type="number"
                value={editData.attendance.lateArrivals}
                onChange={(e) =>
                updateNestedField(
                  'attendance',
                  'lateArrivals',
                  parseInt(e.target.value)
                )
                }
                className={`${inputStyle} w-20 text-right`} /> :


              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {staffMember.attendance.lateArrivals}
                </span>
              }
            </div>
          </div>
        </motion.div>

        {/* Leave Balance */}
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
            delay: 1.2
          }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-100 dark:border-gray-700">

          <div className="flex items-center mb-6">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <CalendarIcon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
              Solde de Congés
            </h2>
          </div>
          <div className="space-y-4">
            {Object.entries(
              isEditing ? editData.leaveBalance : staffMember.leaveBalance
            ).map(([key, data]) => {
              const labels = {
                annual: 'Congés Annuels',
                sick: 'Congés Maladie',
                personal: 'Congés Personnels'
              };
              return (
                <div
                  key={key}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {labels[key as keyof typeof labels]}
                    </span>
                    {isEditing ?
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          Restant: {data.remaining} /
                        </span>
                        <input
                        type="number"
                        value={data.total}
                        onChange={(e) =>
                        updateDeepNestedField(
                          'leaveBalance',
                          key,
                          'total',
                          parseInt(e.target.value)
                        )
                        }
                        className={`${inputStyle} w-16 text-right`}
                        placeholder="Total" />

                        <span className="text-xs text-gray-500">Utilisé:</span>
                        <input
                        type="number"
                        value={data.used}
                        onChange={(e) =>
                        updateDeepNestedField(
                          'leaveBalance',
                          key,
                          'used',
                          parseInt(e.target.value)
                        )
                        }
                        className={`${inputStyle} w-16 text-right`}
                        placeholder="Utilisé" />

                      </div> :

                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {data.remaining}/{data.total} jours
                      </span>
                    }
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"
                      style={{
                        width: `${data.remaining / data.total * 100}%`
                      }} />

                  </div>
                </div>);

            })}
          </div>
        </motion.div>
      </div>

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
          delay: 1.3
        }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-100 dark:border-gray-700">

        <div className="flex items-center mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <GraduationCapIcon className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
            Diplômes & Certifications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(isEditing ? editData.certificates : staffMember.certificates).map(
            (cert, index) =>
            <motion.div
              key={cert.id}
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                delay: 1.4 + index * 0.1
              }}
              className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border-2 border-indigo-200 dark:border-indigo-800">

                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-3 flex-shrink-0">
                    <BadgeIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    {isEditing ?
                  <>
                        <input
                      type="text"
                      value={cert.title}
                      onChange={(e) =>
                      updateArrayItem(
                        'certificates',
                        index,
                        'title',
                        e.target.value
                      )
                      }
                      className={inputStyle}
                      placeholder="Titre" />

                        <input
                      type="text"
                      value={cert.institution}
                      onChange={(e) =>
                      updateArrayItem(
                        'certificates',
                        index,
                        'institution',
                        e.target.value
                      )
                      }
                      className={inputStyle}
                      placeholder="Institution" />

                        <input
                      type="number"
                      value={cert.year}
                      onChange={(e) =>
                      updateArrayItem(
                        'certificates',
                        index,
                        'year',
                        parseInt(e.target.value)
                      )
                      }
                      className={inputStyle}
                      placeholder="Année" />

                      </> :

                  <>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {cert.institution}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {cert.year}
                        </div>
                      </>
                  }
                  </div>
                </div>
              </motion.div>

          )}
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
          delay: 1.5
        }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-100 dark:border-gray-700">

        <div className="flex items-center mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <TargetIcon className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
            Compétences
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(isEditing ? editData.skills : staffMember.skills).map(
            (skill, index) =>
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: 1.6 + index * 0.05
              }}>

                <div className="flex justify-between items-center mb-2">
                  {isEditing ?
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) =>
                  updateArrayItem('skills', index, 'name', e.target.value)
                  }
                  className={`${inputStyle} w-2/3`} /> :


                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {skill.name}
                    </span>
                }

                  {isEditing ?
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) =>
                  updateArrayItem(
                    'skills',
                    index,
                    'level',
                    parseInt(e.target.value)
                  )
                  }
                  className={`${inputStyle} w-20 text-right`} /> :


                <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                      {skill.level}%
                    </span>
                }
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
                    delay: 1.7 + index * 0.05,
                    duration: 0.8
                  }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />

                </div>
              </motion.div>

          )}
        </div>
      </motion.div>

      {/* Recent Evaluations & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evaluations */}
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
            delay: 1.7
          }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-100 dark:border-gray-700">

          <div className="flex items-center mb-6">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
              <TrophyIcon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
              Évaluations Récentes
            </h2>
          </div>
          <div className="space-y-4">
            {staffMember.evaluations.map((evaluation, index) =>
            <motion.div
              key={evaluation.id}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: 1.8 + index * 0.1
              }}
              className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl border border-rose-200 dark:border-rose-800">

                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {evaluation.evaluator}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {evaluation.date}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-amber-500 fill-current mr-1" />
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {evaluation.score}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Points forts:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {evaluation.strengths.map((strength) =>
                    <span
                      key={strength}
                      className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full">

                          {strength}
                        </span>
                    )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      À améliorer:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {evaluation.improvements.map((improvement) =>
                    <span
                      key={improvement}
                      className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full">

                          {improvement}
                        </span>
                    )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Feedback */}
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
            delay: 1.9
          }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-100 dark:border-gray-700">

          <div className="flex items-center mb-6">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <MessageSquareIcon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
              Retours Récents
            </h2>
          </div>
          <div className="space-y-4">
            {staffMember.feedback.map((item, index) =>
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: 2 + index * 0.1
              }}
              className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">

                <div className="flex items-start mb-2">
                  <ThumbsUpIcon className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.from}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.date}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {item.comment}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Training History */}
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
          delay: 2.1
        }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-gray-100 dark:border-gray-700">

        <div className="flex items-center mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <BookOpenIcon className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
            Historique de Formation
          </h2>
        </div>
        <div className="space-y-3">
          {(isEditing ? editData.trainings : staffMember.trainings).map(
            (training, index) =>
            <motion.div
              key={training.id}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: 2.2 + index * 0.1
              }}
              className="flex items-center justify-between p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-200 dark:border-violet-800">

                <div className="flex items-center flex-1 mr-4">
                  <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${training.status === 'completed' ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600'}`}>

                    {training.status === 'completed' ?
                  <CheckCircle2Icon className="h-5 w-5 text-white" /> :

                  <CalendarIcon className="h-5 w-5 text-white" />
                  }
                  </div>
                  <div className="w-full space-y-1">
                    {isEditing ?
                  <>
                        <input
                      type="text"
                      value={training.title}
                      onChange={(e) =>
                      updateArrayItem(
                        'trainings',
                        index,
                        'title',
                        e.target.value
                      )
                      }
                      className={inputStyle}
                      placeholder="Titre de la formation" />

                        <div className="flex gap-2">
                          <input
                        type="text"
                        value={training.date}
                        onChange={(e) =>
                        updateArrayItem(
                          'trainings',
                          index,
                          'date',
                          e.target.value
                        )
                        }
                        className={`${inputStyle} w-1/2`}
                        placeholder="Date" />

                          <input
                        type="text"
                        value={training.duration}
                        onChange={(e) =>
                        updateArrayItem(
                          'trainings',
                          index,
                          'duration',
                          e.target.value
                        )
                        }
                        className={`${inputStyle} w-1/2`}
                        placeholder="Durée" />

                        </div>
                      </> :

                  <>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {training.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {training.date} • {training.duration}
                        </p>
                      </>
                  }
                  </div>
                </div>

                {isEditing ?
              <select
                value={training.status}
                onChange={(e) =>
                updateArrayItem(
                  'trainings',
                  index,
                  'status',
                  e.target.value
                )
                }
                className={`${inputStyle} w-32`}>

                    <option value="completed">Complété</option>
                    <option value="planned">Planifié</option>
                  </select> :

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${training.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'}`}>

                    {training.status === 'completed' ? 'Complété' : 'Planifié'}
                  </span>
              }
              </motion.div>

          )}
        </div>
      </motion.div>
    </div>);

};
export default StaffProfile;