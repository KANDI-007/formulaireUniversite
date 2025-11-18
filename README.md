## Formulaire Résidents – Déploiement et collecte de données

Ce projet React/Vite recueille les informations des résidents de la cité UCAO. Il inclut un écran de chargement, une annonce d’événement et un formulaire multi-étapes. Cette documentation explique comment :

1. Configurer l’application en local.
2. Stocker les réponses dans **Supabase**.
3. Héberger le code sur **GitHub** et déployer sur **Netlify**.

---

### 1. Installation locale

```bash
npm install
npm run dev
```

Créez ensuite un fichier `.env` (non versionné) à la racine :

```
VITE_SUPABASE_URL=Votre-url.supabase.co
VITE_SUPABASE_ANON_KEY=Votre-cle-anon
```

---

### 2. Base de données Supabase

1. Rendez-vous sur [Supabase](https://supabase.com/dashboard/project/czoxfmhmzgabnuytdxwm).
2. Créez une table `resident_forms` (type `public`).

| Colonne            | Type    | Description                                        |
| ------------------ | ------- | -------------------------------------------------- |
| `id`               | uuid    | `uuid_generate_v4()` (primary key)                 |
| `first_name`       | text    | Prénom                                             |
| `last_name`        | text    | Nom                                                |
| `phone`            | text    | Téléphone                                          |
| `email`            | text    | Email optionnel                                    |
| `room_number`      | text    | Chambre                                            |
| `problems`         | jsonb   | Liste des problèmes signalés                       |
| `program_choices`  | jsonb   | Choix des programmes                               |
| `submitted_at`     | timestamptz | `now()` par défaut                            |

3. Copiez l’`URL` et la `Anon Key` du projet Supabase dans le fichier `.env`.

Le frontend utilise `@supabase/supabase-js` (voir `src/utils/supabaseClient.ts`) pour insérer les données via la fonction `handleSubmit` du composant `App.tsx`.

---

### 3. Dépôt GitHub

1. Initialisez Git (déjà fait) et associez le dépôt :
   ```bash
   git remote add origin https://github.com/lolopounie/formulaireCite.git
   git push -u origin master
   ```
   Si vous recevez une erreur 403, connectez-vous à GitHub via `git config --global credential.helper manager-core`
   puis relancez `git push` après authentification.

---

### 4. Déploiement Netlify

1. Sur [Netlify](https://app.netlify.com), créez un **New site from Git** et sélectionnez votre repo GitHub.
2. Paramètres de build :
   - Build command : `npm run build`
   - Publish directory : `dist`
3. Dans **Site settings → Environment variables**, ajoutez :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Si vous souhaitez utiliser Netlify Functions plus tard, créez un dossier `netlify/functions` puis exposez vos endpoints via `/.netlify/functions/...`.

---

### 5. Vérification après déploiement

1. Rendez-vous sur l’URL Netlify (par exemple `https://votre-site.netlify.app`).
2. Remplissez le formulaire (vous pouvez utiliser les 60 résidents prévus) et vérifiez l’insertion dans Supabase (`resident_forms`).
3. Pour exporter les données : dans Supabase, `Table Editor → resident_forms → Export`.

---

### 6. Dépannage

| Problème                                     | Solution                                                                 |
| -------------------------------------------- | ------------------------------------------------------------------------ |
| `Supabase n’est pas configuré`               | Vérifiez vos variables d’environnement en local et sur Netlify           |
| Erreur `403` lors du `git push`              | Authentifiez-vous auprès de GitHub ou utilisez un token personnel        |
| Netlify ne voit pas les nouvelles données    | Redéployez après avoir mis à jour les variables d’environnement          |
| Données non insérées dans Supabase           | Consultez la console navigateur (`Submission error`) pour le détail     |

---

Pour toute personnalisation supplémentaire (exports automatiques, e-mails, etc.), vous pouvez ajouter une **Netlify Function** ou un backend Supabase Edge Function pour traiter les données avant insertion.

