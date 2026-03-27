# TP 2 — API REST 

## Contexte du projet

Ce TP a pour objectif de construire une **API REST complète** avec Node.js et Express permettant de gérer une liste d'utilisateurs. Les données sont stockées **en mémoire** (tableau JavaScript), ce qui permet de se concentrer sur la logique REST sans base de données.

L'API expose les opérations **CRUD** (Create, Read, Update, Delete) sur la ressource `/api/users`, et respecte les conventions REST en termes de méthodes HTTP et de codes de réponse.

### Stack technique

| Outil          | Rôle                                              |
| -------------- | ------------------------------------------------- |
| **Node.js**    | Environnement d'exécution JavaScript côté serveur |
| **Express 5**  | Framework HTTP pour créer les routes REST         |
| **ES Modules** | Syntaxe `import/export` native                    |

### Lancer le serveur

```bash
node server.js
# Serveur disponible sur http://localhost:3001
```

---

## Structure du projet

```
backend/
├── data/
│   └── users.js          # Données en mémoire (3 utilisateurs initiaux)
├── routes/
│   └── users.js          # Routes CRUD pour /api/users
├── screenshots/          # Captures des tests via Bruno/Insomnia
├── server.js             # Point d'entrée de l'application
└── package.json
```

---

## Endpoints disponibles

| Méthode  | Route            | Description                     | Code succès |
| -------- | ---------------- | ------------------------------- | ----------- |
| `GET`    | `/api/users`     | Récupérer tous les utilisateurs | 200         |
| `GET`    | `/api/users/:id` | Récupérer un utilisateur par ID | 200         |
| `POST`   | `/api/users`     | Créer un nouvel utilisateur     | 201         |
| `PUT`    | `/api/users/:id` | Modifier un utilisateur         | 200         |
| `DELETE` | `/api/users/:id` | Supprimer un utilisateur        | 204         |

### Codes d'erreur

| Code                        | Signification                                       |
| --------------------------- | --------------------------------------------------- |
| `400 Bad Request`           | Données invalides (ex : `name` ou `email` manquant) |
| `404 Not Found`             | Ressource introuvable (ID inexistant)               |
| `500 Internal Server Error` | Bug côté serveur                                    |

---

## Tâche 3.1 — Scénario de test complet

Les tests suivants doivent être exécutés **dans l'ordre**. Chaque étape s'appuie sur la précédente.

---

### Étape 1 — `GET /api/users` · Vérifier les 3 utilisateurs initiaux

**Requête :**

```
GET http://localhost:3001/api/users
```

**Résultat attendu :** Code `200 OK`, tableau de 3 utilisateurs (Hugo Tigre, Tommy Bonnes Pratiques, Simon l'échequier).

![GET /api/users → vérifiez que les 3 utilisateurs initiaux sont retournés (code 200)](./screenshots/GET_200.png)

---

### Étape 2 — `POST /api/users` · Créer un nouvel utilisateur

**Requête :**

```
POST http://localhost:3001/api/users
Content-Type: application/json

{
  "name": "No Role",
  "email": "j@cole.com",
  "role": "user"
}
```

**Résultat attendu :** Code `201 Created`, l'utilisateur créé est retourné avec son `id` (ici `4`). Notez cet `id` pour les étapes suivantes.

![POST /api/users → créez un nouvel utilisateur, notez l'id retourné (code 201)](./screenshots/POST_201.png)

---

### Étape 3 — `GET /api/users/:id` · Récupérer l'utilisateur créé

**Requête :**

```
GET http://localhost:3001/api/users/4
```

**Résultat attendu :** Code `200 OK`, retourne l'utilisateur avec l'`id: 4`.

![GET /api/users/:id → récupérez l'utilisateur créé avec son id (code 200)](./screenshots/GET_id_200.png)

---

### Étape 4 — `PUT /api/users/:id` · Modifier le rôle de l'utilisateur

**Requête :**

```
PUT http://localhost:3001/api/users/4
Content-Type: application/json

{
  "role": "admin"
}
```

**Résultat attendu :** Code `200 OK`, l'utilisateur est retourné avec le rôle mis à jour.

![PUT /api/users/:id → modifiez le rôle de l'utilisateur avec son id (code 200)](./screenshots/PUT_200.png)

---

### Étape 5 — `GET /api/users` · Vérifier que la liste contient 4 utilisateurs

**Requête :**

```
GET http://localhost:3001/api/users
```

**Résultat attendu :** Code `200 OK`, `"count": 4`.

![GET /api/users → vérifiez que la liste contient maintenant 4 utilisateurs (code 200)](./screenshots/GET_with_new_200.png)

---

### Étape 6 — `DELETE /api/users/:id` · Supprimer l'utilisateur créé

**Requête :**

```
DELETE http://localhost:3001/api/users/4
```

**Résultat attendu :** Code `204 No Content`, aucun corps de réponse.

![DELETE /api/users/:id → supprimez l'utilisateur créé (code 204)](./screenshots/DELETE_204.png)

---

### Étape 7 — `GET /api/users/:id` · Tenter de récupérer l'utilisateur supprimé

**Requête :**

```
GET http://localhost:3001/api/users/4
```

**Résultat attendu :** Code `404 Not Found`, message d'erreur `"Utilisateur non trouvé"`.

![GET /api/users/:id → tentez de récupérer l'utilisateur supprimé (code 404)](./screenshots/GET_id_404.png)

---

## Tâche 3.2 — Tests des cas d'erreur

Ces tests vérifient que l'API gère correctement les situations anormales.

---

### `POST` sans `name` ni `email` → doit retourner `400`

**Requête :**

```
POST http://localhost:3001/api/users
Content-Type: application/json

{
  "role": "admin"
}
```

**Résultat attendu :** Code `400 Bad Request`.

![POST sans name ni email → doit retourner 400](./screenshots/POST_400.png)

---

### `GET /api/users/9999` → doit retourner `404`

**Requête :**

```
GET http://localhost:3001/api/users/9999
```

**Résultat attendu :** Code `404 Not Found`, `{ "success": false, "message": "Utilisateur non trouvé" }`.

![GET /api/users/9999 — 404 Not Found](./screenshots/GET_404.png)

---

### `PUT /api/users/9999` → doit retourner `404`

**Requête :**

```
PUT http://localhost:3001/api/users/9999
Content-Type: application/json

{ "role": "admin" }
```

**Résultat attendu :** Code `404 Not Found`, `{ "success": false, "message": "Utilisateur non trouvé" }`.

![PUT /api/users/9999 → doit retourner 404](./screenshots/PUT_404.png)

---

### `DELETE /api/users/9999` → doit retourner `404`

**Requête :**

```
DELETE http://localhost:3001/api/users/9999
```

**Résultat attendu :** Code `404 Not Found`, `{ "success": false, "message": "Utilisateur non trouvé" }`.

![DELETE /api/users/9999 → doit retourner 404](./screenshots/DELETE_404.png)

---

## 4. Tests et Validation des API

Cette section détaille les tests fonctionnels réalisés pour valider les routes de l'API ainsi que la robustesse de la gestion des erreurs avec MongoDB.

---

### 4.1 — Scénario de test complet (Happy Path)
Ce scénario suit le cycle de vie standard d'une ressource utilisateur, de sa création à sa suppression.

| Étape | Méthode | Route | Résultat attendu | Capture d'écran |
| :--- | :---: | :--- | :--- | :--- |
| **1** | `GET` | `/api/users` | Liste initiale (3 users via seed) | ![GET All Initial](./screenshots/get_200.png) |
| **2** | `POST` | `/api/users` | Création réussie (Code 201 + `_id`) | ![POST User](./screenshots/post_200.png) |
| **3** | `GET` | `/api/users/:id` | Récupération par ID (Nom conforme) | ![GET By ID](./screenshots/get_id_200.png) |
| **4** | `PUT` | `/api/users/:id` | Modification du champ (Code 200) | ![PUT User](./screenshots/put_200.png) |
| **5** | `GET` | `/api/users` | Vérification du compte (count: 4) | ![GET All Final](./screenshots/get_4_200.png) |
| **6** | `DELETE`| `/api/users/:id` | Suppression réussie (Code 204) | ![DELETE User](./screenshots/delete_200.png) |
| **7** | `GET` | `/api/users/:id` | Vérification finale (Code 404) | ![GET 404 After Delete](./screenshots/get_id_404.png) |

---

### 4.2 — Tests des cas d'erreur MongoDB
Validation des mécanismes de sécurité et de gestion d'erreurs du serveur.

#### ❌ Conflit d'email (Doublon)
* **Action :** `POST` avec un email déjà existant en base de données.
* **Attendu :** Code `409 Conflict`.
* ![Erreur 409 - Email existant](./screenshots/post_409.png)

#### ❌ Format d'ID invalide
* **Action :** `GET` avec un ID malformé (ex: `123`).
* **Attendu :** Code `400 Bad Request` (ObjectId invalide).
* ![Erreur 400 - ID Invalide](./screenshots/get_id_400.png)

#### ❌ ID Introuvable
* **Action :** `GET` avec un ID au format valide mais inexistant (`000000000000000000000000`).
* **Attendu :** Code `404 Not Found`.
* ![Erreur 404 - ID Inexistant](./screenshots/get_id_404_2.png)

---

### 4.3 — Test de persistance ⭐
Ce test valide l'objectif principal : la sauvegarde réelle des données dans MongoDB.

1. **Étape 1 : Création de l'utilisateur**
   * Exécution d'un `POST` et récupération de l'_id généré.
   * ![Étape 1 - Création](./screenshots/test_persistence_1.png)

2. **Étape 2 : Redémarrage du serveur**
   * Arrêt manuel (`Ctrl+C`) et relance avec `node server.js`.
   * ![Étape 2 - Redémarrage serveur](./screenshots/test_persistence_2.png)

3. **Étape 3 : Vérification de la persistance**
   * Requête `GET /api/users/:id` avec l'ID précédemment créé.
   * **Résultat attendu :** L'utilisateur est toujours récupéré avec succès.
   * ![Étape 3 - Données persistées](./screenshots/test_persistence_3.png)

---

## 5. Tests et Validation du Frontend (React)

Cette section documente les tests fonctionnels de l'interface utilisateur et son intégration avec l'API Backend.

### 5.1 — Scénarios de test de l'interface
Chaque test valide une fonctionnalité clé du client React et sa communication avec le service Axios.

| Étape | Action | Résultat attendu | Capture d'écran |
| :--- | :--- | :--- | :--- |
| **1** | Lancer le frontend (`npm run dev`) | La liste des utilisateurs s'affiche (Données Séance 3) | ![Initial Load](./screenshots/tp4partie4/1.png) |
| **2** | Soumettre le formulaire valide | Nouvel utilisateur ajouté à la liste sans rechargement | ![Form Success](./screenshots/tp4partie4/2.png) |
| **3** | Cliquer sur "Supprimer" | L'utilisateur disparaît de la liste immédiatement | ![Delete Success](./screenshots/tp4partie4/3.png) |
| **4** | Soumettre avec un champ vide | Message d'erreur affiché, aucun appel API effectué | ![Validation Error](./screenshots/tp4partie4/4.png) |
| **5** | Soumettre un email existant | Erreur 409 de l'API affichée dans l'interface | ![API Error 409](./screenshots/tp4partie4/5.png) |
| **6** | Couper l'API Backend (`Ctrl+C`) | Message d'erreur de connexion affiché (pas de crash) | ![API Down](./screenshots/tp4partie4/6.png) |
| **7** | Redémarrer l'API et recharger | Les données sont persistantes (MongoDB) | ![Persistence Check](./screenshots/tp4partie4/7.png) |

---