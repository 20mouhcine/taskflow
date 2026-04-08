Q1 : Pourquoi <Navigate /> (composant) et pas Maps() (hook) ici ?On utilise le composant <Navigate /> car la redirection doit se faire au moment du rendu (le "render") du composant. Le hook useNavigate() renvoie une fonction que l'on utilise généralement dans un gestionnaire d'événements (comme un clic) ou dans un useEffect, mais pas directement dans le corps du return du composant.


Q2 : Quelle différence entre Maps(from) et Maps(from, { replace: true }) ?Maps(from) : Ajoute une nouvelle page à l'historique. Si l'utilisateur clique sur le bouton "Précédent", il revient sur la page de login.Maps(from, { replace: true }) : Remplace la page actuelle (Login) par la nouvelle (Dashboard) dans l'historique. L'utilisateur ne peut donc pas revenir en arrière sur le formulaire de connexion après s'être identifié.


Q3 : Après un POST, pourquoi fait-on setProjects(prev => [...prev, data]) plutôt qu'un re-fetch GET ?C'est une question d'optimisation:Rapidité : On met à jour l'affichage instantanément avec la réponse du serveur (data) sans attendre une deuxième requête réseau.Économie : On évite de recharger toute la liste depuis la base de données alors qu'on vient juste d'ajouter un seul élément que l'on possède déjà en mémoire.


Q4 : Analyse des scénarios de navigationa) /dashboard sans être connecté : Vous êtes redirigé vers /login grâce au ProtectedRoute.b) /projects/1 sans être connecté : Redirection vers /login également car cette route est aussi protégée.c) /nimportequoi : L'application vous redirige automatiquement vers /dashboard (via la route *).d) / (racine) : Redirection automatique vers /dashboard.e) Connecté puis bouton Retour : Si vous avez utilisé replace: true, vous resterez sur le Dashboard ou quitterez l'app. Sinon, vous reviendrez par erreur sur la page Login.


Q5 : Quelle différence entre <Link> et <NavLink> ? Pourquoi NavLink ici ?Différence : <NavLink> est une version améliorée de <Link> qui détecte si l'URL correspond à son lien.Pourquoi ici ? : Cela permet d'appliquer automatiquement une classe CSS .active (ex: texte en vert gras) pour montrer à l'utilisateur quel projet il est en train de consulter dans la barre latérale.


Q6 : Ce composant (ProjectForm) sert pour le POST ET le PUT. Qu'est-ce qui change ?Ce qui change, ce sont les Props envoyées au composant:Pour le POST : On passe des valeurs initiales vides et le label "Créer".Pour le PUT : On passe le nom et la couleur du projet existant (initialName, initialColor) pour pré-remplir le formulaire, et le label "Modifier".


Q7 : Arrêtez json-server et tentez un POST. Le message s'affiche ?Oui, le message d'erreur s'affichera. Le code utilise un bloc try/catch où l'erreur est capturée par Axios, puis stockée dans un état error qui est ensuite affiché dans le JSX.



Q8 : Avec fetch, un 404 ne lance PAS d'erreur. Avec Axios, que se passe-t-il ?Contrairement à fetch, Axios rejette automatiquement la promesse (il va directement dans le catch) si le code de statut HTTP est en dehors de la plage 2xx (comme un 404 ou un 500). Cela simplifie la gestion des erreurs car on n'a pas besoin de vérifier manuellement si response.ok est vrai.


########################### Seance 4 ###########################

Q1. Zéro ligne de CSS externe. Tout le style est inline via les props sx={{}} directement dans le JSX. En comparaison, un Header.module.css classique contient plus de 40 lignes

Q2. MUI contient beaucoup de sx={{}} par contre Bootstrap contient des classes css
donc Bootsrap est plus lisible et plus court

Q3. Je préfère sx={{}} car le style est directement lié au composant, ce qui facilite la maintenance. Je n'ai pas besoin de jongler entre un fichier JSX et un fichier CSS.

Q4. Material UI:    
            Installation-> 4 packages
            Nb de composants utilisés -> 10
            Lignes de CSS écrites -> 0
            Système de style -> sx={{}}
            Personnalisation couleur -> via sx
            Responsive -> oui
            Lisibilité du code -> Moyenne
            Documentation -> excellente
            Préférence -> Pour apps complexes
    
    React-Bootstrap:
            Installation -> 2 packages
            Nb de composants utilisés -> 7
            Lignes de CSS écrites -> 0
            Système de style -> classes CSS
            Personnalisation couleurs -> via css
            Responsive -> Oui (grids)
            Lisibilité du code -> Bonne
            Documentation -> Bonne
            Préférence -> Pour prototypes rapides

    Choix = Material UI car elle offre des composants complexes prets à l'emploi et un design professionnel

    a) Firebase : React -> Firebase services -> Firestore(base de données)
    b)  Express + MongoDB : React -> axios -> express -> Mongodb

Q5. React s'exécute dans le navigateur et le code sera lisible via les DevTools
Q6. Aucune sécurité : tout le monde peut faire DELETE /users/1 sans aucune authentification
    Pas scalable : la "base de données" est un fichier JSON chargé en RAM
    Pas de logique métier : impossible d'ajouter du hachage de mots de passe (bcrypt),de valider des règles complexes, de gérer des transactions. C'est un CRUD brut sans aucune intelligence.

Q7. Firebase a conçu un SDK JavaScript spécifiquement pour tourner dans le navigateur. Ce SDK communique avec les serveurs Google via HTTPS, un protocole que les navigateurs comprennent parfaitement. La sécurité n'est pas assurée par un backend Express, mais par les Security Rules de Firebase

Q8.  Passer en prod, c'est essentiellement remplacer json-server par un vrai backend (Express + BDD), sécuriser l'auth avec JWT et bcrypt, passer tout en HTTPS, gérer les secrets dans des variables d'environnement, puis déployer sur des hébergeurs dédiés.

Q9 — Les deux risques majeurs sont la taille du bundle (MUI ajoute ~400 KB) qui ralentit le chargement, et les mises à jour cassantes entre versions majeures qui peuvent imposer une réécriture partielle de l'app. On y ajoute le risque d'abandon du projet par ses mainteneurs.

Q10. Pour une app en production avec beaucoup d'utilisateurs, Express + Socket.io donne plus de contrôle et coûte moins cher à l'usage.

##################### Seance 5 #################################
Q6. 2 composants se re-rendent, Sidebar et MainContent, le composant MainContent ne devraient pas se re-rendre

Q7. React.memo empêche le re-render du composant enfant quand les props restent identiques
React.memo compare les props du composant Si toutes les props sont identiques → Pas de re-render

Q8.useMemo retourne une valeur mémoïsée, useCallback retourne une fonction mémoïsée,