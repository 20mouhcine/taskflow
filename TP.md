Q1 : Pourquoi <Navigate /> (composant) et pas Maps() (hook) ici ?On utilise le composant <Navigate /> car la redirection doit se faire au moment du rendu (le "render") du composant. Le hook useNavigate() renvoie une fonction que l'on utilise généralement dans un gestionnaire d'événements (comme un clic) ou dans un useEffect, mais pas directement dans le corps du return du composant.


Q2 : Quelle différence entre Maps(from) et Maps(from, { replace: true }) ?Maps(from) : Ajoute une nouvelle page à l'historique. Si l'utilisateur clique sur le bouton "Précédent", il revient sur la page de login.Maps(from, { replace: true }) : Remplace la page actuelle (Login) par la nouvelle (Dashboard) dans l'historique. L'utilisateur ne peut donc pas revenir en arrière sur le formulaire de connexion après s'être identifié.


Q3 : Après un POST, pourquoi fait-on setProjects(prev => [...prev, data]) plutôt qu'un re-fetch GET ?C'est une question d'optimisation:Rapidité : On met à jour l'affichage instantanément avec la réponse du serveur (data) sans attendre une deuxième requête réseau.Économie : On évite de recharger toute la liste depuis la base de données alors qu'on vient juste d'ajouter un seul élément que l'on possède déjà en mémoire.


Q4 : Analyse des scénarios de navigationa) /dashboard sans être connecté : Vous êtes redirigé vers /login grâce au ProtectedRoute.b) /projects/1 sans être connecté : Redirection vers /login également car cette route est aussi protégée.c) /nimportequoi : L'application vous redirige automatiquement vers /dashboard (via la route *).d) / (racine) : Redirection automatique vers /dashboard.e) Connecté puis bouton Retour : Si vous avez utilisé replace: true, vous resterez sur le Dashboard ou quitterez l'app. Sinon, vous reviendrez par erreur sur la page Login.


Q5 : Quelle différence entre <Link> et <NavLink> ? Pourquoi NavLink ici ?Différence : <NavLink> est une version améliorée de <Link> qui détecte si l'URL correspond à son lien.Pourquoi ici ? : Cela permet d'appliquer automatiquement une classe CSS .active (ex: texte en vert gras) pour montrer à l'utilisateur quel projet il est en train de consulter dans la barre latérale.


Q6 : Ce composant (ProjectForm) sert pour le POST ET le PUT. Qu'est-ce qui change ?Ce qui change, ce sont les Props envoyées au composant:Pour le POST : On passe des valeurs initiales vides et le label "Créer".Pour le PUT : On passe le nom et la couleur du projet existant (initialName, initialColor) pour pré-remplir le formulaire, et le label "Modifier".


Q7 : Arrêtez json-server et tentez un POST. Le message s'affiche ?Oui, le message d'erreur s'affichera. Le code utilise un bloc try/catch où l'erreur est capturée par Axios, puis stockée dans un état error qui est ensuite affiché dans le JSX.



Q8 : Avec fetch, un 404 ne lance PAS d'erreur. Avec Axios, que se passe-t-il ?Contrairement à fetch, Axios rejette automatiquement la promesse (il va directement dans le catch) si le code de statut HTTP est en dehors de la plage 2xx (comme un 404 ou un 500). Cela simplifie la gestion des erreurs car on n'a pas besoin de vérifier manuellement si response.ok est vrai.