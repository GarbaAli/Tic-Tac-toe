// On charge les informations utiles
const statut = document.querySelector("h5")
let jeuActif = true
let joueurActif = ""
let personne = "X"
let IA = "O"
let scoreX = 0
let scoreIA = 0 
let MatchId = ran()

let tab = [0,1,2,3,4,5,6,7,8]
//choix aleatoire du premier joueur
let min = tab[Math.floor(Math.random() * tab.length)] 
let max = tab[Math.floor(Math.random() * tab.length)] + 1
if(Randoms(2,8) % 2 == 0){
 joueurActif = personne
}else{
 joueurActif = IA
}
// console.log(Randoms(2,8) % 2)


//etat du jeu au depart
let etatJeu = ["", "", "", "", "", "", "", "", ""]

// On définit les conditions de victoire
const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Messages
const gagne = () => `Le joueur ${joueurActif} a gagné`
const egalite = () => "Egalité"
const tourJoueur = () => `C'est a <strong style="color:teal">${joueurActif}</strong> de jouer` 

// On affiche quel joueur commence
statut.innerHTML = tourJoueur()

//selectionner les scores des joueuers
const gagnantIa = document.getElementById('ia')
const gagnantPers = document.getElementById('pers')


//declenccher l'action de IA apres 3 secondes
if (joueurActif === IA) {
    setTimeout(() => {
     gestionIA(tab);
    }, 3000)
}

// On met en place les écouteurs d'évènements
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase))
document.querySelector("#rejouer").addEventListener("click", replay)




/**
 * Cette fonction gère le clic sur les cases du jeu
 */
function gestionClicCase(){
    // On récupère l'index de la case cliquée
    const indexCase = parseInt(this.dataset.index)
    
    // On vérifie si la case est déjà remplie ou le jeu terminé
    if(etatJeu[indexCase] !== "" || !jeuActif){
        return
    }

    // On écrit le symbole du joueur dans le tableau etatJeu et la case
    etatJeu[indexCase] = joueurActif
    this.innerHTML = joueurActif

    // On vérifie si le joueur a gagné
    verifGagne()

    if (!jeuActif) {
        var obj = {"matchId" : MatchId, 
        "boardState" : etatJeu,
        "LastMove" : {"char" : etatJeu[indexCase], "position": indexCase }
       }

       if (etatJeu[indexCase] == "X") {
            scoreX = scoreX+1
            gagnantPers.innerHTML = scoreX
       }else{
            scoreIA = scoreIA+1
            gagnant.innerHTML = scoreIA
       }
   }else{
    var obj = {"matchId" : MatchId, 
        "boardState" : etatJeu,
        // "LastMove" : {"char" : etatJeu[indexCase], "position": indexCase }
       }
   }

    console.log(obj)

    occuper(tab,indexCase)


//declenccher l'action de IA apres 3 secondes
    setTimeout(() => {
     gestionIA(tab);
    }, 3000)
}


/**
 * Cette fonction gère le clic de IA
 */
function gestionIA(tab){

    //recupere de facon aleatoire l'index de l'IA
    let randomIndex = tab[Math.floor(Math.random() * tab.length)]
    console.log(randomIndex)
    // On récupère l'index de la case cliquée
    const indexCase = randomIndex
    
    // On vérifie si la case est déjà remplie ou le jeu terminé
    if(etatJeu[indexCase] !== "" || !jeuActif){
        return
    }

   

    // On écrit le symbole du joueur dans le tableau etatJeu et la case
     etatJeu[indexCase] = "O"
    document.getElementById(indexCase).innerHTML = "O"
   
    // this.innerHTML = "O"

    // On vérifie si le joueur a gagné
    verifGagne()

    if (!jeuActif) {
        var obj = {"matchId" : MatchId, 
        "boardState" : etatJeu,
        "LastMove" : {"char" : etatJeu[indexCase], "position": indexCase }
       }

       if (etatJeu[indexCase] == "X") {
            scoreX = scoreX+1
            gagnantPers.innerHTML = scoreX
       }else{
            scoreIA = scoreIA+1
            gagnant.innerHTML = scoreIA
       }
   }else{
    var obj = {"matchId" : MatchId, 
        "boardState" : etatJeu,
        // "LastMove" : {"char" : etatJeu[indexCase], "position": indexCase }
       }
   }

    console.log(obj)

    occuper(tab,randomIndex)
    console.log(tab)
}




/**
 * Cette fonction vérifie si le joueur a gagné
 */
function verifGagne(){
    let tourGagnant = false

    // On parcourt toutes les conditions de victoire
    for(let conditionVictoire of conditionsVictoire){
        // On récupère les 3 cases de la condition de victoire
        let val1 = etatJeu[conditionVictoire[0]]
        let val2 = etatJeu[conditionVictoire[1]]
        let val3 = etatJeu[conditionVictoire[2]]

        // Si l'une des cases est vide
        if(val1 === "" || val2 === "" || val3 === ""){
            continue
        }

        // Si les 3 cases sont identiques
        if(val1 === val2 && val2 === val3){
            // On gagne
            tourGagnant = true
            break
        }
    }

    // Si on a gagné
    if(tourGagnant){
        statut.innerHTML = gagne()
        jeuActif = false
        return
    }

    // Si toutes les cases sont remplies
    if(!etatJeu.includes("")){
        statut.innerHTML = egalite()
        jeuActif = false
        return
    }

    // On change de joueur
    joueurActif = joueurActif === personne ? IA : personne
    statut.innerHTML = tourJoueur()
}

/**
 * Cette fonction réinitialise le jeu
 */
function replay(){
     let res = Randoms(1,1000) % 2 
     res === 0 ? joueurActif === IA : joueurActif === personne
    jeuActif = true
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    MatchId = ran()
    statut.innerHTML = tourJoueur()
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "")
}



//Ramdom
function Randoms(min, max)
{
 var valeur =  Math.floor(Math.random() * (max - min + 1)) + min
  return valeur
}

//Supprimer une valeur dans le tableau
function occuper(tabs, supprimer)
{
    tabs.splice(supprimer,1)
    return tabs
}

//generer l'MatchId
function ran(){
let resultat =  Math.random() * Math.random() + 1
return resultat
}