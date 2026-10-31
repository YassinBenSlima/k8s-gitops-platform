
# 📅 Gestion des États des Rendez-vous (RDV)

> Documentation des règles de transition d'état pour les rendez-vous dans OrthoBizz.

---

## Vue d'ensemble

Chaque rendez-vous possède un **état** qui reflète son cycle de vie, de la planification initiale jusqu'à sa conclusion. Les transitions entre états sont **contrôlées** : seules certaines transitions sont autorisées depuis chaque état, afin de garantir la cohérence des données.

---

## États disponibles

| État | Clé interne | Couleur | Description |
|------|-------------|---------|-------------|
| 🔵 **Planifié** | `scheduled` | Bleu | RDV créé et confirmé, en attente de la date |
| 🟠 **En attente** | `pending` | Orange clair | Patient confirmé mais en attente (ex: salle d'attente) |
| 🔴 **En retard** | `late` | Orange foncé | L'heure du RDV est dépassée sans que le patient soit arrivé |
| 🩵 **En cours** | `in_progress` | Cyan | Le RDV est actuellement en cours de réalisation |
| 🟢 **Terminé** | `completed` | Vert | RDV réalisé avec succès — état **terminal** |
| ⛔ **Annulé** | `cancelled` | Rouge | RDV annulé avant ou pendant sa réalisation |
| 🟡 **Manqué** | `missed` | Jaune | Patient absent, RDV non honoré |

---

## Diagramme de transitions

```
                    ┌─────────────────────────────────────────┐
                    │              [CRÉATION]                  │
                    └──────────────────┬──────────────────────┘
                                       │
                                       ▼
                               ┌──────────────┐
                               │  🔵 Planifié  │ ◄──────────────────────┐
                               └──────┬───────┘                         │
                                      │                                  │
                    ┌─────────────────┼──────────────────┐              │
                    │                 │                   │              │
                    ▼                 ▼ (auto si heure    ▼              │
             ┌────────────┐          │  dépassée)  ┌──────────┐         │
             │ 🟠 En att. │          │             │ ⛔ Annulé │         │
             └─────┬──────┘          │             └──────────┘         │
                   │                 │                   ▲              │
          ┌────────┼──────┐          ▼                   │              │
          │        │      │   ┌─────────────┐            │   (reschedule)
          ▼        ▼      │   │ 🔴 En retard│────────────┘              │
    ┌──────────┐   │      │   └──────┬──────┘                           │
    │🔵Planifié│   │      │          │                                   │
    └──────────┘   │      │   ┌──────┴──────────────┐                   │
                   │      │   │                     │                   │
                   ▼      │   ▼                     ▼                   │
             ┌──────────┐ │  ┌──────────┐    ┌──────────┐              │
             │⛔ Annulé  │ │  │🩵 En cours│    │🟡 Manqué │              │
             └──────────┘ │  └────┬─────┘    └────┬─────┘              │
                          │       │                │                    │
                          └───────►               │   (reschedule)     │
                                  │               └────────────────────┘
                          ┌───────┴──────────┐
                          │                  │
                          ▼                  ▼
                   ┌──────────┐       ┌──────────┐
                   │🟢 Terminé │       │🟡 Manqué │
                   └──────────┘       └──────────┘
                   (TERMINAL)
```

---

## Règles de transition détaillées

### 🔵 Planifié (`scheduled`)

**Transitions autorisées :**
| Vers | Déclencheur | Condition |
|------|-------------|-----------|
| 🟠 En attente | Manuel | Patient arrivé en salle d'attente |
| 🩵 En cours | Manuel | Praticien démarre directement le RDV |
| ⛔ Annulé | Manuel | Annulation avant le RDV |
| 🔴 En retard | **Automatique** | `now > date + heure_début` |

**Transitions interdites :** Terminé, Manqué *(le RDV n'a pas encore eu lieu)*

---

### 🟠 En attente (`pending`)

**Transitions autorisées :**
| Vers | Déclencheur | Condition |
|------|-------------|-----------|
| 🔵 Planifié | Manuel | Retour à l'état initial (ex: erreur) |
| 🩵 En cours | Manuel | Patient appelé en cabinet |
| ⛔ Annulé | Manuel | Annulation pendant l'attente |

**Transitions interdites :** Terminé, Manqué, En retard *(géré automatiquement)*

---

### 🔴 En retard (`late`)

> ⚡ **Cet état est déclenché automatiquement** lorsque l'heure du RDV est dépassée et que le statut est encore `scheduled`.

**Transitions autorisées :**
| Vers | Déclencheur | Condition |
|------|-------------|-----------|
| 🩵 En cours | Manuel | Patient finalement arrivé (en retard) |
| 🟡 Manqué | Manuel | Patient absent, RDV non honoré |
| ⛔ Annulé | Manuel | Annulation après dépassement de l'heure |

**Transitions interdites :** Planifié, En attente, Terminé

---

### 🩵 En cours (`in_progress`)

**Transitions autorisées :**
| Vers | Déclencheur | Condition |
|------|-------------|-----------|
| 🟢 Terminé | Manuel | RDV réalisé avec succès |
| 🟡 Manqué | Manuel | Cas exceptionnel (patient parti avant la fin) |
| ⛔ Annulé | Manuel | Interruption du RDV |

**Transitions interdites :** Planifié, En attente, En retard

---

### 🟢 Terminé (`completed`) — État terminal

**Aucune transition manuelle autorisée.**

> Un RDV terminé est définitif. Pour modifier les informations, utiliser la fonction "Modifier le rendez-vous".

---

### ⛔ Annulé (`cancelled`)

**Transitions autorisées :**
| Vers | Déclencheur | Condition |
|------|-------------|-----------|
| 🔵 Planifié | Manuel | Replanification du RDV annulé |

> La replanification remet le RDV en état `scheduled`. Les informations (date, heure) doivent être mises à jour via le formulaire de modification.

---

### 🟡 Manqué (`missed`)

**Transitions autorisées :**
| Vers | Déclencheur | Condition |
|------|-------------|-----------|
| 🔵 Planifié | Manuel | Replanification après absence |

> Même logique que pour l'état Annulé : la replanification nécessite une mise à jour de la date/heure.

---

## Transition automatique : Planifié → En retard

Cette transition est gérée côté client via un `useEffect` React :

```typescript
useEffect(() => {
  if (!appointment) return
  if (appointment.status === 'scheduled') {
    const [year, month, day] = appointment.date.split('-').map(Number)
    const [hours, minutes] = appointment.startTime.split(':').map(Number)
    const appointmentDateTime = new Date(year, month - 1, day, hours, minutes)
    if (new Date() > appointmentDateTime) {
      setAppointment(prev => ({ ...prev, status: 'late' }))
    }
  }
}, [appointment?.date, appointment?.startTime, appointment?.status])
```

**Comportement :**
- Vérifié à chaque chargement de la page de détail
- Déclenché uniquement si le statut est `scheduled`
- Ne s'applique pas aux états `pending`, `in_progress`, etc.

---

## Implémentation technique

### Constante de transitions (`ALLOWED_TRANSITIONS`)

```typescript
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  scheduled:   ['pending', 'in_progress', 'cancelled'],
  pending:     ['scheduled', 'in_progress', 'cancelled'],
  late:        ['in_progress', 'missed', 'cancelled'],
  in_progress: ['completed', 'missed', 'cancelled'],
  completed:   [],
  cancelled:   ['scheduled'],
  missed:      ['scheduled'],
}
```

### Validation avant transition

```typescript
const canTransitionTo = (target: string): boolean => {
  if (!appointment) return false
  return (ALLOWED_TRANSITIONS[appointment.status] ?? []).includes(target)
}

const handleStatusChange = (newStatus: string) => {
  if (!appointment) return
  const allowed = ALLOWED_TRANSITIONS[appointment.status] ?? []
  if (!allowed.includes(newStatus)) return  // transition bloquée silencieusement
  setAppointment({ ...appointment, status: newStatus })
}
```

### Comportement visuel des boutons

| Condition | Apparence |
|-----------|-----------|
| État actif (état courant) | Bordure colorée + fond coloré |
| Transition autorisée | Fond blanc, hover coloré |
| Transition interdite | Opacité 50%, `cursor-not-allowed`, tooltip explicatif |

---

## Résumé des transitions autorisées

|  | → Planifié | → En attente | → En retard | → En cours | → Terminé | → Annulé | → Manqué |
|--|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Planifié** | — | ✅ | 🤖 auto | ✅ | ❌ | ✅ | ❌ |
| **En attente** | ✅ | — | ❌ | ✅ | ❌ | ✅ | ❌ |
| **En retard** | ❌ | ❌ | — | ✅ | ❌ | ✅ | ✅ |
| **En cours** | ❌ | ❌ | ❌ | — | ✅ | ✅ | ✅ |
| **Terminé** | ❌ | ❌ | ❌ | ❌ | — | ❌ | ❌ |
| **Annulé** | ✅ | ❌ | ❌ | ❌ | ❌ | — | ❌ |
| **Manqué** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | — |

> 🤖 = transition automatique uniquement | ✅ = autorisée | ❌ = interdite

---

*Dernière mise à jour : Février 2026 — OrthoBizz v2.0*
