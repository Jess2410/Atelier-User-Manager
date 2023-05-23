/**
 * app.js - Fichier principal de l'application
 * A vous de le compléter pour implémenter les fonctionnalités
 */

const readLine = require("./lib/asyncReadLine");

/****************/
/* Utilisateurs */
/****************/

const users = []; // Vous devrez sotcker vos objets utilisateurs dans ce tableau

/*****************/
/* Constructeurs */
/*****************/
function User(lastname, firstname, email, phone) {
  this.lastname = String(lastname).trim();
  this.firstname = String(firstname).trim();
  this.email = email;
  this.phone = Number(phone).trim();
}

// TODO: Créer le/les contructeurs et prototypes nécessaires au bon fonctionnement de l'app

/********************/
/*  Fonctionnalités */
/********************/

const features = {
  /* Créer un utilisateur */

  // TODO: A compléter
  "user create": async function () {
    console.log("Saisissez les informations du nouvel utilisateur :");
    const firstname = await readLine("Prénom : ");
    const lastname = await readLine("Nom : ");
    const email = await readLine("Email : ");
    const phone = await readLine("Phone : ");
    const role = await readLine("Role : ");
    const premium = await readLine("Premium ? y ou n: ");

    console.log(firstname);
    console.log(lastname);
    console.log(email);
    console.log(phone);

    const user = new User(firstname, lastname, email, phone);
    let guid = () => {
      let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };
      return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
      );
    };
    Object.defineProperty(user, "id", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: guid(),
    });

    Object.defineProperty(user, "role", {
      configurable: false,
      enumerable: true,
      writable: true,
      value: role === "admin" ? role : "client",
    });

    Object.defineProperty(user, "premium", {
      configurable: false,
      enumerable: true,
      writable: true,
      value: premium === "y" ? true : false,
    });

    Object.defineProperty(user, "credits", {
      configurable: false,
      enumerable: true,
      writable: true,
      value: 0,
    });

    users.push(user);
    console.log("users", users);
  },

  /* Supprimer un utilisateur */ /* OK */
  "user delete": async function deleteUser() {
    const id = await readLine("Id client : ");
    const user_deleted = users.findIndex((element) => element.id == id);
    users.splice(user_deleted, 1);
    console.log("Utilisateur supprimé.", users);
  },

  /* Lister les utilisateurs */ /* OK */
  "user list": async function () {
    console.log(users);
    // TODO: A compléter
  },

  /* Afficher les détails d'un utilisateur */ /* OK */
  "user details": async function () {
    const id = await readLine("Id client : ");
    const user = users.findIndex((element) => element.id == id);
    console.log(users[user]);
  },

  /* Ajouter une méthode de salut spécifique à un utilisateur */ /* OK */
  "user set-custom-hello": async function () {
    const id = await readLine("Id client : ");
    const found = users.findIndex((element) => element.id == id);
    if (found === -1) {
      return "utilisateur introuvable";
    }
    if (!users[found].premium) {
      console.log(`Salut ${users[found].firstname} ${users[found].lastname}`);
    } else {
      console.log(
        `Salut ${users[found].firstname} ${users[found].lastname} Membre Premium`
      );
    }
  },

  /* Ajouter des crédits à un utilisateur */
  "user add-credits": async function () {
    const id = await readLine("Id client : ");
    const found = users.findIndex((element) => element.id == id);
    console.log("solde 1:", users[found].credits);
    const credits_to_add = await readLine("Combien de crédits ? ");
    users[found].credits += Number(credits_to_add);
    console.log("solde 2:", users[found].credits);
  },

  /* Vérifier le statut premium ou non d'un utilisateur */ /* OK */
  "user check-premium": async function () {
    const id = await readLine("Id client : ");
    const found = users.findIndex((element) => element.id == id);
    console.log(users[found].premium);
  },

  /* Changer le statut premium d'un utilisateur */ /* OK */
  "user set-premium": async function () {
    const id = await readLine("Id client : ");
    const found = users.findIndex((element) => element.id == id);
    if (users[found].premium) {
      const choix = await readLine(
        "L'utilisateur est premium. Voulez-vous le downgrade ? y or n "
      );
      if (choix === "y") {
        users[found].premium = false;
        return "downgrade ok";
      }
    } else {
      const choix = await readLine(
        "L'utilisateur n'est pas premium. Voulez-vous l'upgrade ? y or n "
      );
      if (choix === "y") {
        users[found].premium = true;
        return "upgrade ok";
      }
    }
  },

  /* Modifier le role par défaut */ /* OK */
  "set-default role": async function () {
    const id = await readLine("Id client : ");
    const found = users.findIndex((element) => element.id == id);
    if (users[found].role === "admin") {
      const choix = await readLine(
        "L'utilisateur est Admin. Voulez-vous le passer en client ? y or n "
      );
      if (choix === "y") {
        users[found].role = "client";
        return "role client ok";
      }
    } else {
      const choix = await readLine(
        "L'utilisateur n'est pas Admin. Voulez-vous le passer en Admin ? y or n "
      );
      if (choix === "y") {
        users[found].role = "admin";
        return "role admin ok";
      }
    }
  },

  /* Modifier la méthode de "salut" par défaut */ /* OK */
  "set-default": async function () {
    console.log(`Salut`);
  },
};

module.exports = features;
