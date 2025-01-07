# Marketing AI Assistant - Konfigurations-Guide

## Assistenten Konfiguration

Die Konfiguration der Assistenten erfolgt über die `marketingAssistants.json` Datei. Hier wird die Struktur und alle verfügbaren Optionen erklärt.

### Grundstruktur

```json
{
    "categories": ["Array der Kategorien"],
    "assistants": ["Array der Assistenten"]
}
```

### Kategorien

Kategorien werden als String-Array definiert:
```json
"categories": [
    "All",
    "Content Marketing",
    "Social Media",
    "Email & Ads",
    "SEO & Analytics",
    "Brand & Business",
    "Sales & Conversion"
]
```

### Assistenten

Jeder Assistent wird als Objekt mit folgenden Eigenschaften definiert:

```json
{
    "title": "Name des Assistenten",
    "description": "Beschreibung der Funktionalität",
    "category": "Zugehörige Kategorie",
    "icon": "Emoji oder Icon-Referenz",
    "inputs": [Array der Eingabefelder]
}
```

### Eingabefelder

Verfügbare Feldtypen:

1. **Text Input**
```json
{
    "id": "uniqueId",
    "label": "Feldbezeichnung",
    "type": "text",
    "placeholder": "Platzhaltertext",
    "required": true/false
}
```

2. **Textarea**
```json
{
    "id": "uniqueId",
    "label": "Feldbezeichnung",
    "type": "textarea",
    "placeholder": "Platzhaltertext",
    "required": true/false
}
```

3. **Select (Dropdown)**
```json
{
    "id": "uniqueId",
    "label": "Feldbezeichnung",
    "type": "select",
    "options": ["Option 1", "Option 2", "Option 3"],
    "default": "Option 1",
    "required": true/false
}
```

4. **Checkbox**
```json
{
    "id": "uniqueId",
    "label": "Feldbezeichnung",
    "type": "checkbox",
    "default": false
}
```

## Beispiel-Konfiguration

```json
{
    "title": "Blog Headlines",
    "description": "Create attention-grabbing headlines for your articles",
    "category": "Content Marketing",
    "icon": "📝",
    "inputs": [
        {
            "id": "topic",
            "label": "Blog Topic",
            "type": "text",
            "placeholder": "Enter your blog topic",
            "required": true
        },
        {
            "id": "tone",
            "label": "Writing Tone",
            "type": "select",
            "options": [
                "Professional",
                "Casual",
                "Humorous",
                "Serious"
            ],
            "default": "Professional"
        }
    ]
}
```

## Neue Assistenten Hinzufügen

1. JSON-Datei öffnen: `app/data/marketingAssistants.json`
2. Neuen Assistenten zum `assistants`-Array hinzufügen
3. Sicherstellen, dass:
   - Alle IDs eindeutig sind
   - Die Kategorie in der `categories`-Liste existiert
   - Alle erforderlichen Felder ausgefüllt sind
   - Die Input-Typen korrekt sind

## Best Practices

1. **Eindeutige IDs**
   - Verwenden Sie beschreibende, eindeutige IDs
   - Folgen Sie einem konsistenten Namensschema

2. **Validierung**
   - Markieren Sie wichtige Felder als `required: true`
   - Setzen Sie sinnvolle Standardwerte

3. **Benutzerfreundlichkeit**
   - Schreiben Sie klare, hilfreiche Beschreibungen
   - Verwenden Sie aussagekräftige Platzhaltertexte
   - Gruppieren Sie zusammengehörige Eingabefelder

4. **Wartbarkeit**
   - Kommentieren Sie komplexe Konfigurationen
   - Strukturieren Sie die JSON übersichtlich
   - Dokumentieren Sie Änderungen
