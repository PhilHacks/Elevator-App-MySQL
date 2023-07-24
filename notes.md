Steg 1: Skapa upp `Elevator`-klassen

1. Skapa upp `Elevator`-klassen med en constructor-metod - 15 min

Steg 2: Implementera metod för att flytta hissen

1. Implementera metod för att kontrollera om våningen finns - 15 min
2. Implementera metod för att kontrollera om hissen redan är på våningen - 15 min
3. Implementera metod för att ändra `ismoving`-status till `true` - 15 min
4. Använd `setTimeout` för att simulera hissrörelsen - 15 min

Steg 3: Skapa 3 elevator-objekt

1. Skapa `elevator1`, `elevator2`, och `elevator3` baserat på `Elevator`-klassen - 15 min

Steg 4: Implementera "Elevator Status"-funktion

1. Implementera funktionen för att hämta den nuvarande positionen för alla hissar - 15 min
   -hämta current floor och ismoving
2. console.log nuvarande positionen för alla hissar i terminalen - 15 min

Steg 5: Implementera "Call elevator to\_\_"-funktion

1. Implementera funktionen för att kalkylera den närmaste hissen till den kallade våningen - 15 min
2. Skicka den närmaste hissen för att flytta sig till den kallade våningen - 15 min

Steg 6: Implementera hantering av flera hisssamtal

1. Skapa ett kösystem (callsCue) för att hantera samtal när alla hissar är upptagna - 15 min
2. Ta den närmaste lediga hissen för att svara på nästa samtal i kön - 15 min
3. Ta bort kallet från kön när det har genomförts - 15 min

Steg 7: Implementera undvikande av duplicerade hisssamtal

1. Kontrollera om en hiss redan befinner sig på den kallade våningen - 15 min
2. Logga meddelandet "Elevator already at that floor" vid duplicerade samtal - 15 min
