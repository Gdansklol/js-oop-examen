# JS-2 OOP examen

## Objektorienterad programmering - Tamagotchi

## Projekt beskrivning

Det här projektet är ett virtuellt husdjurs-spel där användaren kan skapa upp till fyra olika Tamagotchis, som kan utföra olika aktiviteter. 

Spelet är byggt i JavaScript med objektorienterad programmering.

### Godkänt-krav:

- Användaren ska kunna skapa ett husdjur som kan utföra aktiviteter.
- Varje husdjur ska ha egenskaperna:
  - `name`, `animalType`, `energy`, `fullness`, `happiness`
- Djurtypen (`animalType`) ska kunna väljas mellan fyra förvalda typer.
- Alla värden (energy, fullness, happiness) ska vara mellan 0–100 och starta på 50.
- Aktiviteterna uppdaterar egenskaperna enligt:
  - **nap**: +40 energy, −10 happiness, −10 fullness
  - **play**: +30 happiness, −10 energy, −10 fullness
  - **eat**: +30 fullness, +5 happiness, −15 energy
- Ett meddelande ska visas vid varje aktivitet, t.ex. "You played with Maya!"
- En textruta ska visa en historik över alla aktiviteter.

###  Väl Godkänt-krav:

- Användaren ska kunna skapa flera husdjur (max 4 st).
- Om ett värde når 0 → husdjuret springer iväg (tas bort från DOM:en).
- Varje husdjur startar en timer vid skapande.
  - Var 10:e sekund minskar `energy`, `fullness` och `happiness` med 15.

## Arbetsprocessen

- Parallellt arbete: Grupprojekt (Hakim Livs) + Eget projekt (Tamagotchi)
-  Fokusväxling:
  - Prioritering beroende på tid och behov
  - Växlade mellan produktsida/inloggning och spelprojekt
-  Planering:
  - Först Godkänt, sen Väl Godkänt
  - Tänkte ut klassstruktur och logik innan kodning

  - SoC (Separation of concerns)

---

## Utmaningar

-  Tidsbalans:
  - Två projekt samtidigt
  - Bestämma vad som är mest akut
-  Multi-Tamagotchi:
  - Hur hanterar man flera instanser?
  - Begränsa till max 4 st
-  Misskötsel-logik:
  - När ska ett djur "springa iväg"?
  - Hur tar man bort det från DOM:en snyggt?

---

## Lärdomar

-  OOP-struktur:
  - Föräldraklass (Animal), statisk Game-klass
  - Instansbaserad logik
-  Tidsstyrd förändring:
  - `setInterval()` → nedräkning av värden var 10:e sekund
-  Begränsning och hantering:
  - Kontrollera max 4 djur
  - `runAway()` → rensar timer + tar bort från DOM
-  Lokala interaktioner:
  - `nap()`, `play()`, `eat()` – påverkar attribut och UI
-  Asynkron förståelse:
  - Hur `setTimeout`, `setInterval`, och `Promise` kan användas


## Deploy

link : (https://gdansklol.github.io/js-oop-examen/)
