\# 🍽️ Calculateur PGL



Application iPhone de calcul et suivi nutritionnel — Protéines / Glucides / Lipides.



Style comic 80s, installable en PWA, fonctionne hors-ligne.



\---



\## ✨ Fonctionnalités



\### 🧮 Calculateur



\- Calcul PGL + calories pour un ingrédient (base de 73 aliments pour 100 g)

\- Unités pratiques : g, cl, verre, c.à.s, tranche, pot, œuf…

\- Recherche d'aliments sur la base USDA FoodData Central (filtre aliments bruts)

\- Ajout manuel d'aliments custom (marques, plats maison…)

\- Dictionnaire FR → EN intégré (\~230 entrées), extensible

\- Gestion de la base : masquer, restaurer, supprimer



\### 📖 Recettes



\- Construction de recettes multi-ingrédients

\- Zone d'étapes de préparation sauvegardée avec la recette

\- Sauvegarde nommable, liste réutilisable

\- Ajout direct d'une recette au journal dans n'importe quel repas



\### 📓 Journal



\- 4 repas fixes : Petit-déj / Déjeuner / Dîner / Collation

\- Navigation par jour ← →

\- Objectif kcal quotidien avec barre de progression

\- Répartition PGL en % (barre tricolore)

\- Aliments récents (10 derniers, ajout en 1 tap)

\- Historique figé (les valeurs ne changent pas si un aliment est supprimé)



\### 💾 Données



\- Export / Import JSON de toutes les données

\- Tout est stocké en localStorage (aucun serveur)



\---



\## 🚀 Installation



\### Prérequis



\- Un navigateur moderne (Safari iOS, Chrome, Edge)

\- Python 3 (pour le serveur local de dev)

\- Une clé API USDA (gratuit) : https://fdc.nal.usda.gov/api-key-signup.html



\### Setup



```bash

git clone https://github.com/stengercorinne-droid/Calcul-pgl.git

cd Calcul-pgl



\# Créer le fichier config.js avec la clé API

cp config.example.js config.js

\# Éditer config.js et y coller la clé

