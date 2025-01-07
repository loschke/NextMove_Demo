# Implementierung der Varianten-Erstellung für Prompt Formeln

## Aktuelle Situation

Die Prompt Formeln sind aktuell in `image_prompts.json` gespeichert, wobei die Platzhalter in der Legende als Text beschrieben sind. Diese Struktur ist für eine interaktive Eingabe nicht optimal, da:
- Platzhalter nicht maschinenlesbar strukturiert sind
- Keine Validierungsregeln oder Beispielwerte definiert sind
- Keine klare Trennung zwischen Platzhalter-Definition und Beschreibung existiert

## Vorgeschlagene JSON-Struktur

```json
{
  "Name": "Print Cover",
  "Beschreibung": "Erstellen Sie professionelle Print-Cover mit dieser Formel",
  "Prompt Formel": "A [Komposition und Perspektive] view of a [Printprodukt] with a cover showing [Thema]. The title is \"[Titel]\" and is written in [Schriftstil und Position]. [Zusätzliche Details]",
  "Platzhalter": [
    {
      "id": "komposition",
      "name": "Komposition und Perspektive",
      "beschreibung": "Die Art und Weise, wie das Printprodukt im Bild positioniert ist",
      "beispiele": ["Top-down view", "frontal view", "angled view"],
      "erforderlich": true,
      "typ": "select"
    },
    {
      "id": "printprodukt",
      "name": "Printprodukt",
      "beschreibung": "Das spezifische Printprodukt",
      "beispiele": ["book cover", "magazine cover", "trifold brochure"],
      "erforderlich": true,
      "typ": "select"
    },
    {
      "id": "thema",
      "name": "Thema",
      "beschreibung": "Das Hauptmotiv oder Thema auf dem Printprodukt",
      "beispiele": ["colorful fantasy world", "modern office design"],
      "erforderlich": true,
      "typ": "text"
    }
    // ... weitere Platzhalter
  ],
  "Beispiele": [
    // ... bestehende Beispiele
  ]
}
```

## UI/UX Konzept

### 1. Galerie-Ansicht
- "Neue Variante erstellen" Button in der rechten oberen Ecke jeder Bildkarte
- Hover-Effekt zeigt sowohl "Details anzeigen" als auch "Neue Variante erstellen"

### 2. Varianten-Editor
- Modal oder Slide-in Panel mit:
  - Vorschau der Formel
  - Dynamisch generierte Eingabefelder basierend auf Platzhaltern
  - Live-Vorschau des generierten Prompts
  - Generierungs-Button

### 3. Eingabefelder
- Verschiedene Feldtypen je nach Platzhalter-Definition:
  - Select-Felder für vordefinierte Optionen
  - Text-Felder für freie Eingabe
  - Textarea für längere Texte
  - Optional: Autocomplete mit Beispielwerten

## Technische Implementierung

### 1. Datenstruktur-Migration
1. Entwicklung eines Skripts zur Analyse der bestehenden Legenden
2. Extraktion der Platzhalter-Informationen
3. Konvertierung in das neue Format
4. Validierung der migrierten Daten

### 2. Backend-Komponenten
1. API-Endpoint für Prompt-Generierung
```typescript
// app/api/prompts/generate/route.ts
interface GeneratePromptRequest {
  formulaId: string;
  values: {
    [key: string]: string;
  };
}
```

2. Validierungs-Middleware
3. Integration mit Bild-KI Service

### 3. Frontend-Komponenten
1. VariantCreator Komponente
```typescript
// app/components/VariantCreator.tsx
interface VariantCreatorProps {
  formula: PromptFormula;
  onGenerate: (prompt: string) => Promise<void>;
}
```

2. Dynamische Formular-Generierung
3. Live-Preview des generierten Prompts
4. Fehlerbehandlung und Validierung

### 4. State Management
1. Formular-State mit Validierung
2. Generierungs-Status
3. Error-Handling

## Implementierungsschritte

1. **Phase 1: Datenstruktur**
   - [ ] JSON-Schema definieren
   - [ ] Migrations-Skript entwickeln
   - [ ] Daten migrieren und validieren

2. **Phase 2: Core-Komponenten**
   - [ ] VariantCreator Komponente
   - [ ] Formular-Logik
   - [ ] Prompt-Preview

3. **Phase 3: API & Integration**
   - [ ] API-Endpoints
   - [ ] Bild-KI Integration
   - [ ] Error-Handling

4. **Phase 4: UI/UX**
   - [ ] Design-System Anpassungen
   - [ ] Responsive Layout
   - [ ] Accessibility

5. **Phase 5: Testing & Optimierung**
   - [ ] Unit Tests
   - [ ] Integration Tests
   - [ ] Performance Optimierung

## Technische Anforderungen

- TypeScript für Type-Safety
- Zod für Schema-Validierung
- React Hook Form für Formulare
- API-Routes für Backend-Logik
- Optimistic UI Updates
- Error Boundary Implementation
- Responsive Design
- A11y Compliance

## Offene Fragen

1. Sollen generierte Varianten gespeichert werden?
2. Wie soll mit API-Limits umgegangen werden?
3. Sollen Nutzer eigene Beispielwerte hinzufügen können?
4. Wie detailliert soll die Validierung sein?

## Nächste Schritte

1. JSON-Schema finalisieren und mit Team abstimmen
2. Proof of Concept für VariantCreator entwickeln
3. API-Design dokumentieren
4. UI/UX Mockups erstellen
