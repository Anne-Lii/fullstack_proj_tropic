# Tropic Reef - Lagerhanteringssystem

Anne-Lii Hansen anha2324@student.miun.se

## Om projektet
Tropic Reef är en fiktiv butik för import av saltvattensfiskar. De behövde ett lagerhanteringssystem där man kan lista alla produkter, skapa nya produkter, uppdatera befintliga produkter, ta bort produkter samt ändra antal i lager.  Även lägga till och ta bort kategorier.  I frontend applikationen finns även funktionalitet för att söka och filtrera på produkter. Detta är frontend applikationen i systemet.

## Tech
* Frontend: Vue.js
* Routing: Vue Router
* Autentisering: JSON Web Token (JWT)
* HTTP-bibliotek: Axios
* CSS Framework Bootstrap

## Funktionalitet
* Visa en lista med produkter och deras detaljer (namn, kategori, pris, lagerstatus).
* Lägga till nya produkter
* Uppdatera befintliga produkter
* Ta bort produkter
* Justera lagersaldo för varje produkt
* Visa en lista med kategorier
* Lägga till nya kategorier
* Ta bort kategorier
* Dynamisk filtrering av produkter baserat på sökord och kategori
* Användarinloggning och JWT-token för autentisering
* Modal för att redigera produktinformation

## Installation 

```sh
'git clone https://github.com/Webbutvecklings-programmet/projekt---klient-applikation-Anne-Lii.git'

cd projekt---klient-applikation-Anne-Lii
```

Installera beroenden:
```sh
npm install
```
Starta utvecklingsserver:
```sh
npm run dev
```

## Användning av API
Denna applikation kommunicerar med ett redan publicerat backend-API, som du hittar på följande URL:
https://projekt-webbtjanst-api-anne-lii.onrender.com/

 För att kommunicera med API:t används Axios för att göra HTTP-anrop:

* GET /products: Hämta alla produkter
* GET /categories: Hämta alla kategorier
* POST /products: Skapa en ny produkt
* POST /categories: Skapa en ny kategori
* PUT /products/{id}: Uppdatera en produkt
* DELETE /products/{id}: Ta bort en produkt
* DELETE /category/{id}: Ta bort en kategori
* PATCH /products/{id}/stock: Justera lagersaldo för en produkt