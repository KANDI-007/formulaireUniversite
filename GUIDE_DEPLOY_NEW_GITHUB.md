# Guide - Déployer vers le nouveau dépôt GitHub

## Problème d'authentification

Vous essayez de pousser vers `KANDI-007/formulaireCite` mais vous êtes authentifié avec le compte `lolopounie`.

## Solutions

### Solution 1 : Utiliser un Personal Access Token (Recommandé)

1. **Créer un token GitHub** :
   - Allez sur GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Cliquez sur "Generate new token (classic)"
   - Donnez un nom (ex: "Netlify Deploy")
   - Cochez la permission `repo` (accès complet aux dépôts)
   - Cliquez sur "Generate token"
   - **COPIEZ LE TOKEN** (vous ne pourrez plus le voir après)

2. **Pousser avec le token** :
   ```bash
   git push https://VOTRE_TOKEN@github.com/KANDI-007/formulaireCite.git master
   ```
   Remplacez `VOTRE_TOKEN` par le token que vous avez copié.

3. **Configurer pour les prochaines fois** :
   ```bash
   git remote set-url origin https://VOTRE_TOKEN@github.com/KANDI-007/formulaireCite.git
   ```
   ⚠️ **Attention** : Le token sera visible dans `.git/config`. Pour plus de sécurité, utilisez la Solution 2.

### Solution 2 : Utiliser SSH (Plus sécurisé)

1. **Générer une clé SSH** (si vous n'en avez pas) :
   ```bash
   ssh-keygen -t ed25519 -C "votre_email@example.com"
   ```

2. **Ajouter la clé SSH à GitHub** :
   - Copiez le contenu de `~/.ssh/id_ed25519.pub`
   - GitHub → Settings → SSH and GPG keys → New SSH key
   - Collez la clé et sauvegardez

3. **Changer le remote en SSH** :
   ```bash
   git remote set-url origin git@github.com:KANDI-007/formulaireCite.git
   git push -u origin master
   ```

### Solution 3 : Se connecter avec le bon compte GitHub

1. **Déconnecter les credentials Windows** :
   - Ouvrez "Gestionnaire d'identifiants Windows"
   - Cherchez "github.com"
   - Supprimez les entrées liées à GitHub

2. **Réessayer le push** :
   ```bash
   git push -u origin master
   ```
   - Windows vous demandera de vous connecter
   - Connectez-vous avec le compte `KANDI-007`

### Solution 4 : Utiliser GitHub CLI

1. **Installer GitHub CLI** :
   ```bash
   winget install GitHub.cli
   ```

2. **Se connecter** :
   ```bash
   gh auth login
   ```
   - Suivez les instructions pour vous connecter avec le compte `KANDI-007`

3. **Pousser** :
   ```bash
   git push -u origin master
   ```

## Après avoir poussé le code

Une fois le code poussé vers `KANDI-007/formulaireCite`, vous devrez :

1. **Reconnecter Netlify au nouveau dépôt** :
   - Netlify Dashboard → Site settings → Build & deploy → Continuous Deployment
   - Cliquez sur Repository → Edit
   - Sélectionnez le nouveau dépôt `KANDI-007/formulaireCite`

2. **Vérifier les variables d'environnement** :
   - Assurez-vous que `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` sont toujours configurées dans Netlify

3. **Redéployer** :
   - Netlify devrait déclencher un nouveau déploiement automatiquement

