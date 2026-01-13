<div align="center">

  **[English](README.md)** | **[简体中文](README.zh-CN.md)** | **[日本語](README.ja.md)** | **[한국어](README.ko.md)** | **[Español](README.es.md)** | **[Français](README.fr.md)** | **[Deutsch](README.de.md)**

  <p>

  # Tableau de Bord Z.AI Usage

  Un tableau de bord Next.js moderne pour surveiller l'utilisation de l'API Z.AI avec une analyse en temps réel et un support multilingue.

</div>

## Fonctionnalités

- **📈 Suivi de l'Utilisation en Temps Réel** - Surveillez les appels aux modèles, la consommation de tokens et les performances des outils
- **📊 Analyse Visuelle** - De magnifiques graphiques montrant les tendances d'utilisation au fil du temps
- **🔒 Sécurisé** - La clé API est stockée uniquement dans le localStorage du navigateur
- **🌙 Mode Sombre** - Design Material You avec basculement automatique de thème
- **🌍 Support Multilingue** - Disponible en 7 langues
- **📱 Responsive** - Fonctionne parfaitement sur bureau, tablette et mobile
- **⚡ Rapide** - Construit avec Next.js 16 et React 19 pour des performances optimales

## Capture d'Écran

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/CNSeniorious000/zai-coding-plan-dashboard/main/.github/screenshots/screenshot-fr-dark.webp">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/CNSeniorious000/zai-coding-plan-dashboard/main/.github/screenshots/screenshot-fr-light.webp">
  <img alt="Capture d'écran du Tableau de Bord Z.AI Usage" src="https://raw.githubusercontent.com/CNSeniorious000/zai-coding-plan-dashboard/main/.github/screenshots/screenshot-fr-dark.webp">
</picture>

## Stack Technique

| Technologie | Description |
|-----------|-------------|
| **Next.js 16** | Framework React avec App Router |
| **React 19** | React le plus récent avec Server Components |
| **TypeScript** | Développement avec sécurité des types |
| **Tailwind CSS v4** | Framework CSS utilitaire-first |
| **next-intl** | Framework d'internationalisation (i18n) |
| **Recharts** | Bibliothèque de visualisation de données |
| **Radix UI** | Bibliothèque de composants accessibles |
| **Fumadocs** | Système de documentation |

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/CNSeniorious000/zai-coding-plan-dashboard.git

# Naviguer vers le projet
cd zai-coding-plan-dashboard

# Installer les dépendances
npm install
# ou
yarn install
# ou
pnpm install

# Démarrer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Utilisation

1. **Obtenir Votre Clé API**
   - Visitez [Z.AI Platform](https://z.ai/manage-apikey/apikey-list)
   - Créez ou copiez votre clé API
   - Format：`32hexchars.16alphanumchars`

2. **Entrer Votre Clé API**
   - Collez votre clé API dans le tableau de bord
   - Cliquez sur "Récupérer" pour charger vos données d'utilisation

3. **Voir Vos Statistiques**
   - Résumé des quotas avec barres de progression
   - Répartition de l'utilisation des tokens par modèle
   - Utilisation des outils avec taux de succès/échec
   - Graphiques visuels des tendances

## Points de Terminaison API

Le tableau de bord utilise les APIs de surveillance officielles de Z.AI：

| Endpoint | Description |
|----------|-------------|
| `/api/monitor/usage/model-usage` | Statistiques d'utilisation des tokens par modèle |
| `/api/monitor/usage/tool-usage` | Performance des appels d'outils |
| `/api/monitor/usage/quota/limit` | Limites de quota actuelles |

## Structure du Projet

```
src/
├── app/
│   ├── [locale]/          # Routes localisées (en, zh-CN, ja, ko, es, fr, de)
│   │   ├── page.tsx       # Page principale du tableau de bord
│   │   └── docs/          # Pages de documentation
│   └── api/
│       └── usage/          # Proxy API backend
├── components/
│   ├── Dashboard.tsx      # Composant principal du tableau de bord
│   ├── UsageCharts.tsx    # Visualisation des données
│   └── ui/              # Composants UI réutilisables
├── i18n/                  # Configuration d'internationalisation
├── lib/                   # Utilitaires
└── messages/               # Fichiers de traduction
```

## Langues Prises en Charge

- 🇺🇸 [English](README.md)
- 🇨🇳 [简体中文](README.zh-CN.md)
- 🇯🇵 [日本語](README.ja.md)
- 🇰🇷 [한국어](README.ko.md)
- 🇪🇸 [Español](README.es.md)
- 🇫🇷 [Français](README.fr.md)
- 🇩🇪 [Deutsch](README.de.md)

## Documentation

La documentation complète est disponible dans `/docs` de l'application.

## Sécurité

- **Stockage de Clé API**：Votre clé API est stockée uniquement dans le `localStorage` de votre navigateur
- **Pas de Stockage Serveur**：L'application ne stocke ni ne transmet votre clé à aucun serveur sauf l'API officielle de Z.AI
- **Client Seulement**：Toute la récupération de données se produit directement depuis votre navigateur vers Z.AI

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à soumettre une Pull Request.

## Licence

Ce projet est privé.

---

<div align="center">

  Fait avec ❤️ pour la communauté Z.AI

  **[English](README.md)** | **[简体中文](README.zh-CN.md)** | **[日本語](README.ja.md)** | **[한국어](README.ko.md)** | **[Español](README.es.md)** | **[Français](README.fr.md)** | **[Deutsch](README.de.md)**

</div>
