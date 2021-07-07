# Tic Tac Toe-Garba Ali 

Principe de Fontionnement

#le choix du premier joueur est aleatoirement defini par le programme
#inspecter le code , dans laconsole pour voir les details de chaque actions


#Logique de Inteligence Artificiel
Au debut du jeu il existe un tableau compris entre 0 et 8, 
IA, delimiter par le tableau peut aleatoirement selectionner un indice et ainsi jouer sa partie

a chaque fois qu'une case du jeu est cliqué, le tableau de base est amputé de l'indice de case .

#exmemple
tab[0,1,2,3,4,5,6,7,8]
supposons que le joueur commence
-> 2;   // il clique sur la  case donc l'indice est 2

tab[0,1,2,3,4,5,6,7,8] => tab[0,1,3,4,5,6,7,8]  // On  supprime cette indice du tableau

IA a donc maintenant le choix de selectionner nimporte quel valeur compris dans tab actualiser.
  

