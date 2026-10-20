export interface EssentialOil {
  id: string;
  name: string; // Dutch name
  botanicalName: string; // Botanical/Latin name
  category: string; // Bloemen, Kruiden, Citrus, Houtachtig, Hars, etc.
  aromaProfile: string[]; // e.g. ["Bloemig", "Zoet", "Kruidig"]
  properties: string[]; // e.g. ["Kalmerend", "Slaapbevorderend"]
  applications: string[]; // e.g. ["Diffuser", "Massage", "Inhalatie", "Bad"]
  noteType: "Top" | "Midden" | "Basis";
  safetyPrecautions: string[]; // Safe usage advisories
  description: string;
  rating: number; // 1-5 stars
  stock: "Voldoende" | "Bijna op" | "Op" | "Niet in bezit";
  volumeMl: number; // e.g., 5, 10, 15
  brand: string; // e.g. Chi, Physalis, doTERRA
  notes: string; // Personal thoughts/review
  colorHex: string; // Aesthetic theme color
  icon: string; // Emoji like 🪵, 🌿
  type: "Natuurlijk" | "Synthetisch"; 
  photoUrl?: string; // Optional custom photo URL of the bottle
}

export const CATEGORIES = [
  "Bloemen",
  "Kruiden",
  "Citrus",
  "Houtachtig",
  "Hars",
  "Specerijen",
  "Muntachtig",
  "Aards",
  "Moleculair",
  "Amber",
  "Muskus/Hout",
  "Balsem",
  "Medicinaal",
  "Leer",
  "Andere"
];

export const NOTE_TYPES = ["Top", "Midden", "Basis"] as const;

export const STOCK_STATUSES = ["Voldoende", "Bijna op", "Op", "Niet in bezit"] as const;

export const ALL_AROMAS = [
  "Bloemig",
  "Fris",
  "Kruidig",
  "Warm",
  "Muntachtig",
  "Houtachtig",
  "Citrus",
  "Medicinaal",
  "Zoet",
  "Aards",
  "Scherp",
  "Exotisch",
  "Balsamico",
  "Moleculair",
  "Amber",
  "Ziltig",
  "Muskus",
  "Rokerig",
  "Leder"
];

export const ALL_PROPERTIES = [
  "Kalmerend",
  "Ontspannend",
  "Slaapbevorderend",
  "Verzachtend",
  "Verfrissend",
  "Energie-opwekkend",
  "Focus verhogend",
  "Verkoelend",
  "Luchtwegen openend",
  "Zuiverend",
  "Stimulerend",
  "Antibacterieel",
  "Huidherstellend",
  "Opvrolijkend",
  "Concentratie",
  "Geheugen stimulerend",
  "Verkwikkend",
  "Angstverminderend",
  "Warm",
  "Meditatief",
  "Grondend",
  "Huidverjongend",
  "Sensueel",
  "Bloeddrukverlagend",
  "Harmoniserend",
  "Krampstillend",
  "Kracht-gevend",
  "Romantisch",
  "Intens zoet",
  "Heet",
  "Gezellig",
  "Bitter-fris",
  "Fluweelzacht",
  "Modern",
  "Luxe",
  "Natte aarde",
  "Chic",
  "Reinigend",
  "Stoer",
  "Robuust"
];

export const ALL_APPLICATIONS = [
  "Diffuser",
  "Massage",
  "Inhalatie",
  "Bad",
  "Huidverzorging",
  "Schoonmaak",
  "Parfum",
  "Luchtverfrisser"
];

export const SYMPTOMS_MAP = [
  {
    name: "Slaap & Ontspanning",
    description: "Moeite met in slaap vallen of behoefte aan diepe rust.",
    matchingProperties: ["Kalmerend", "Ontspannend", "Slaapbevorderend", "Angstverminderend", "Harmoniserend"]
  },
  {
    name: "Focus & Concentratie",
    description: "Tijdens werk, studie of momenten die helderheid vereisen.",
    matchingProperties: ["Focus verhogend", "Concentratie", "Geheugen stimulerend", "Verfrissend"]
  },
  {
    name: "Luchtwegen & Verkoudheid",
    description: "Om vrijer te ademen en de lucht te zuiveren.",
    matchingProperties: ["Luchtwegen openend", "Zuiverend", "Antibacterieel", "Verfrissend", "Medicinaal"]
  },
  {
    name: "Energie & Stemming",
    description: "Voor een opgewekt gevoel en tegen vermoeidheid.",
    matchingProperties: ["Energie-opwekkend", "Opvrolijkend", "Verkwikkend", "Stimulerend", "Bitter-fris"]
  },
  {
    name: "Huid & Verzorging",
    description: "Natuurlijke ondersteuning bij wondjes, acne of droge huid.",
    matchingProperties: ["Huidherstellend", "Antibacterieel", "Verzachtend", "Huidverjongend"]
  },
  {
    name: "Meditatie & Gronding",
    description: "Voor yoga, mindfulness of spirituele rust.",
    matchingProperties: ["Meditatief", "Grondend", "Kracht-gevend", "Kalmerend", "Warm"]
  }
];

export const INITIAL_OILS: EssentialOil[] = [
  // 🌿 NATUURLIJK (24 ESSENTIAL OILS)
  {
    id: "nat-myrrhe",
    name: "Myrrh",
    botanicalName: "Commiphora myrrha",
    category: "Hars",
    aromaProfile: ["Aards", "Warm", "Balsamico", "Rokerig"],
    properties: ["Warm", "Meditatief", "Kalmerend", "Zuiverend"],
    applications: ["Diffuser", "Bad", "Huidverzorging", "Massage"],
    noteType: "Basis",
    safetyPrecautions: ["Voorzichtig doseren", "Niet gebruiken tijdens zwangerschap"],
    description: "Warm, rokerig en diep meditatief. Myrrhe is een heilige hars die al duizenden jaren wordt gebruikt om de geest te kalmeren, de focus te verdiepen en de sfeer te verrijken met mystieke warmte.\n\nDe Wetenschap achter de Magie: Werking en Voordelen\nMyrrhe is een heilige hars met een warm, balsemachtig en licht rokerig aroma. Het bevat bioactieve stoffen zoals sesquiterpenen, die een kalmerende en aardende werking hebben op het limbisch systeem. Het wordt al duizenden jaren gebruikt in meditaties om de geest te zuiveren en emotionele balans te herstellen. Het heeft ook ontstekingsremmende en samentrekkende eigenschappen, wat het nuttig maakt voor de huidverzorging.\n\n🌿 Praktische Toepassing en Voorzorgsmaatregelen\n- Diffuser: 3-4 druppels voor een diepe, spirituele en aardende sfeer.\n- Huidverzorging: 1 druppel op 10 ml draagolie (bijv. jojoba) voor een zuiverende en huidherstellende werking, ideaal voor een onzuivere of rijpere huid.\n- Meditatie: Enkele druppels op een wattenschijfje naast je kussen om de focus te verdiepen.\n- Belangrijke Voorzorgsmaatregelen: Niet gebruiken tijdens zwangerschap.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 5,
    brand: "Oshadhi",
    notes: "Heerlijke combinatie met wierook en sinaasappel voor meditatie.",
    colorHex: "#be9b7b",
    icon: "🪵",
    type: "Natuurlijk"
  },
  {
    id: "nat-patchouli",
    name: "Patchouli",
    botanicalName: "Pogostemon cablin",
    category: "Aards",
    aromaProfile: ["Aards", "Warm", "Exotisch"],
    properties: ["Kalmerend", "Grondend", "Sensueel", "Ontspannend"],
    applications: ["Diffuser", "Massage", "Huidverzorging", "Parfum"],
    noteType: "Basis",
    safetyPrecautions: ["Sterke, dominante geur; matig doseren"],
    description: "Diep, donker en sensueel. Patchouli brengt een intense, rijke aardse noot. Het is een fantastische fixateur die mengsels een mystiek oosters karakter geeft en onrustige geesten grondt.\n\nDe Wetenschap achter de Magie: Werking en Voordelen\nPatchouli heeft een kenmerkend diep, aards en muskusachtig aroma dat rijk is aan patchoulol. Deze stof staat bekend om zijn kalmerende en antidepressieve eigenschappen. Het is een uitstekende fixateur in parfums en werkt grondend op overactieve gedachten. Daarnaast heeft het schimmelwerende en huidregenererende eigenschappen, wat het een veelzijdige huidolie maakt.\n\n🌿 Praktische Toepassing en Voorzorgsmaatregelen\n- Diffuser: 1-2 druppels (de geur is zeer dominant) voor een aardse, ontspannen sfeer.\n- Huidverzorging: 2 druppels op 10 ml draagolie voor een evenwichtige en gereinigde huid, of tegen droge, gebarsten huid.\n- Parfum: Uitstekende basisnoot die andere geuren bij elkaar houdt en een oosters, mysterieus karakter geeft.\n- Belangrijke Voorzorgsmaatregelen: Matig doseren vanwege de sterke geur, verder zeer veilig.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Physalis",
    notes: "Zeer aards. Een druppeltje is al genoeg om een blend urenlang body te geven.",
    colorHex: "#a0522d",
    icon: "🌿",
    type: "Natuurlijk"
  },
  {
    id: "nat-wierook",
    name: "Wierook",
    botanicalName: "Boswellia carterii",
    category: "Hars",
    aromaProfile: ["Houtachtig", "Warm", "Balsamico", "Aards"],
    properties: ["Meditatief", "Kalmerend", "Grondend", "Huidverjongend"],
    applications: ["Diffuser", "Inhalatie", "Huidverzorging", "Massage"],
    noteType: "Basis",
    safetyPrecautions: ["Algemeen veilig, altijd verdunnen op de huid"],
    description: "De 'koning der oliën'. Frankincense / Wierook heeft een zacht houtachtig, balsemachtig aroma dat diepe ademhaling stimuleert, angst vermindert en de huid intens herstelt en verjongt.\n\nDe Wetenschap achter de Magie: Werking en Voordelen\nWierook, of Frankincense, bevat boswellinezuur, een krachtige ontstekingsremmer. Aromatisch werkt het verheffend en stimuleert het de aanmaak van serotonine, wat diepe rust en meditatieve helderheid bevordert. Voor de huid is het een krachtige celregenerator die de verschijning van fijne lijntjes en littekens kan verminderen.\n\n🌿 Praktische Toepassing en Voorzorgsmaatregelen\n- Diffuser: 3-5 druppels voor een spirituele, kalmerende en zuiverende ruimte.\n- Huidverjonging: 1-2 druppels gemengd in je nachtcrème of 5 ml arganolie voor een verstevigend en verjongend effect.\n- Inhalatie: Direct uit de fles of met stoom voor rustige, diepe ademhaling.\n- Belangrijke Voorzorgsmaatregelen: Altijd verdunnen op de huid, verder algemeen veilig.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "doTERRA",
    notes: "Ultieme spirituele geur. Perfect voor meditatie of yoga.",
    colorHex: "#fbcfe8",
    icon: "⛪",
    type: "Natuurlijk"
  },
  {
    id: "nat-jasmijn",
    name: "Jasmijn",
    botanicalName: "Jasminum officinale",
    category: "Bloemen",
    aromaProfile: ["Bloemig", "Zoet", "Exotisch"],
    properties: ["Romantisch", "Intens zoet", "Sensueel", "Opvrolijkend"],
    applications: ["Diffuser", "Massage", "Parfum", "Bad"],
    noteType: "Midden",
    safetyPrecautions: ["Extreem intens; overmatig gebruik kan hoofdpijn veroorzaken"],
    description: "Romantisch en intens zoet. Jasmijn is goud waard in natuurlijke parfummengsels. Het verheft de emoties, verdrijft somberheid en wekt direct een gevoel van sensualiteit en euforie op.\n\nDe Wetenschap achter de Magie: Werking en Voordelen\nJasmijn is een van de meest kostbare bloemenoliën. De geur is intens zoet, warm en honingachtig, gedragen door moleculen zoals jasmone en benzylacetaat. Het werkt sterk antidepressief en euforisch: het verhoogt het gevoel van welzijn en sensualiteit. Het is een krachtige olie voor het verlichten van lusteloosheid and emotionele blokkades.\n\n🌿 Praktische Toepassing en Voorzorgsmaatregelen\n- Diffuser: 1-2 druppels (de geur is extreem intens) voor een romantische, vrolijke en zintuiglijke sfeer.\n- Parfum: Een parel in natuurlijke parfums; één druppel geeft een heel mengsel een luxueus, diep bloemenboeket.\n- Massage: 1 druppel in 10 ml draagolie voor een sensuele, ontspannende massage.\n- Belangrijke Voorzorgsmaatregelen: Overmatig gebruik kan hoofdpijn veroorzaken; zeer spaarzaam doseren.",
    rating: 5,
    stock: "Bijna op",
    volumeMl: 2,
    brand: "Primavera",
    notes: "Kostbaar maar ongelofelijk mooi. Geeft een luxueus, honingachtig warm bloemenboeket.",
    colorHex: "#fdf2f8",
    icon: "🌸",
    type: "Natuurlijk"
  },
  {
    id: "nat-lavendel",
    name: "Lavendel (Bio)",
    botanicalName: "Lavandula angustifolia",
    category: "Bloemen",
    aromaProfile: ["Bloemig", "Fris", "Kruidig"],
    properties: ["Ontspannend", "Slaapbevorderend", "Kalmerend", "Verzachtend"],
    applications: ["Diffuser", "Inhalatie", "Bad", "Huidverzorging", "Massage"],
    noteType: "Midden",
    safetyPrecautions: ["Zeer veilige olie voor het hele gezin"],
    description: "Ontspannend en heerlijk fris-kruidig. Onze biologische echte Lavendel brengt pure rust en harmoniseert de zenuwen. Perfect om de dag af te sluiten en een diepe, natuurlijke slaap te bevorderen.\n\nDe Wetenschap achter de Magie: Werking en Voordelen\nLavendel bevat linalool en linalylacetaat, die een bewezen kalmerend, angstverminderend en slaapbevorderend effect hebben op het zenuwstelsel. Het is ook een mild pijnstillend, ontstekingsremmend en huidherstellend middel, waardoor het perfect is voor brandwondjes, insectenbeten en een onrustige huid.\n\n🌿 Praktische Toepassing en Voorzorgsmaatregelen\n- Slaap: Enkele druppels op je kussen of in een diffuser voor een diepe, rustgevende nachtrust.\n- Huid: 3-5 druppels op 10 ml basisolie voor verzorging bij een droge, geïrriteerde huid of acne.\n- Bad: 5-8 druppels gemengd met een emulgator (zoals melk) in het badwater voor totale ontspanning.\n- Belangrijke Voorzorgsmaatregelen: Zeer veilige olie, zelfs voor kinderen (in zeer lage dosering). Niet inwendig gebruiken.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 15,
    brand: "Chi",
    notes: "Mijn absolute nummer één voor ontspanning en bij het slapengaan.",
    colorHex: "#e0d3f5",
    icon: "💜",
    type: "Natuurlijk"
  },
  {
    id: "nat-roos",
    name: "Roos",
    botanicalName: "Rosa damascena",
    category: "Bloemen",
    aromaProfile: ["Bloemig", "Zoet", "Warm"],
    properties: ["Luxe", "Zacht", "Harmoniserend", "Sensueel"],
    applications: ["Diffuser", "Parfum", "Huidverzorging", "Bad"],
    noteType: "Midden",
    safetyPrecautions: ["Uiterst geconcentreerd, milde dosering aanbevolen"],
    description: "Luxe, honingachtig en weelderig zacht. Rozenolie is de ultieme geur van liefde en mededogen. Het verzacht emotionele pijn, harmoniseert het hart en is een fantastische anti-aging verzorging voor de huid.\n\nDe Wetenschap achter de Magie: Werking en Voordelen\nDe kracht van rozenolie zit hem in de unieke combinatie van bioactieve stoffen, waaronder citronellol, geraniol en flavonoïden. Deze samenstelling zorgt voor een breed scala aan effecten:\n\n- Emotioneel Welzijn: De olie staat bekend om haar kalmerende en stemmingsverbeterende werking. Studies tonen aan dat het kan helpen bij het verminderen van angst, stress en depressieve gevoelens. In aromatherapie wordt het gebruikt om een gevoel van rust en emotioneel evenwicht te bevorderen, wat perfect aansluit bij de beschrijving van het verzachten van emotionele pijn.\n\n- Huidverzorging en Anti-Aging: De regenererende en antioxiderende eigenschappen zijn uitstekend voor de huid. De olie kan helpen de tekenen van veroudering tegen te gaan, de huid te hydrateren en roodheid te verminderen. Wetenschappelijk onderzoek bij ratten heeft aangetoond dat rozenolie bescherming kan bieden tegen UV-schade, een van de hoofdoorzaken van huidveroudering.\n\n- Overige Therapeutische Toepassingen: De olie heeft ook aangetoonde ontstekingsremmende, pijnstillende en antibacteriële eigenschappen. Er wordt onderzoek gedaan naar de mogelijke toepassing bij uiteenlopende aandoeningen, van het verlichten van menstruatieklachten tot het ondersteunen van de spijsvertering. Let op: een recente studie naar het effect bij PMS toonde aan dat de verbetering niet significant groter was dan bij een placebo, wat aangeeft dat het effect deels niet-specifiek kan zijn.\n\n🌹 Praktische Toepassing en Voorzorgsmaatregelen\nOm optimaal en veilig van deze kostbare olie te genieten, is het belangrijk om een paar richtlijnen te volgen:\n\n- Verdunning is Essentieel: Rozenolie is zeer geconcentreerd en mag nooit onverdund op de huid worden aangebracht. Verdun het altijd in een neutrale plantaardige olie (zoals jojoba of amandelolie) of in een crème.\n\n- Aanbevolen Dosering:\n  * Huidverzorging: Voor een anti-aging of regenererend effect wordt vaak een zeer lage dosering van maximaal 0,01% aanbevolen in je dagelijkse crème of serum. Andere bronnen geven een iets hogere richtlijn van 0,5% (ongeveer 3 druppels op 10 ml basisolie) voor algemeen huidgebruik.\n  * Massage: Voor een ontspannende massage kun je 1 druppel olie toevoegen aan 50 ml massageolie.\n  * Aromatherapie: Voeg 1 tot 2 druppels toe aan een diffuser om een kalmerende sfeer te creëren.\n\n- Belangrijke Voorzorgsmaatregelen:\n  * Zwangerschap: Gebruik de olie niet tijdens de eerste drie maanden van de zwangerschap.\n  * Allergie: Sommige natuurlijke bestanddelen in de olie (zoals citronellol en geraniol) kunnen een allergische reactie veroorzaken. Test de verdunde olie daarom altijd eerst op een klein stukje huid (bijvoorbeeld in de armholte) en wacht 48 uur.\n  * Algemeen: Houd de olie buiten bereik van kinderen en vermijd contact met de ogen. Raadpleeg bij twijfel of specifieke medische vragen altijd een arts of gekwalificeerde therapeut.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 2,
    brand: "Oshadhi",
    notes: "Pure roos is kostbaar maar de geur is onovertroffen zacht en fluweelachtig.",
    colorHex: "#fecdd3",
    icon: "🌹",
    type: "Natuurlijk"
  },
  {
    id: "nat-ylangylang",
    name: "Ylang Ylang",
    botanicalName: "Cananga odorata",
    category: "Bloemen",
    aromaProfile: ["Bloemig", "Zoet", "Exotisch"],
    properties: ["Exotisch", "Romig", "Euforisch", "Sensueel", "Ontspannend"],
    applications: ["Diffuser", "Massage", "Bad", "Parfum"],
    noteType: "Basis",
    safetyPrecautions: ["Kan bij te hoge concentratie hoofdpijn triggeren. Gebruik 1 of 2 druppels."],
    description: "Exotisch en romig-zoet aromaboeket. Ylang Ylang brengt een eilandgevoel, verlaagt de bloeddruk, kalmeert frustraties en stimuleert speelsheid en passie in intieme blends.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 5,
    brand: "Chi",
    notes: "Heel zacht en romig, maar wees er uiterst zuinig mee in de diffuser.",
    colorHex: "#fae8ff",
    icon: "🌺",
    type: "Natuurlijk"
  },
  {
    id: "nat-bergamot",
    name: "Bergamot",
    botanicalName: "Citrus bergamia",
    category: "Citrus",
    aromaProfile: ["Citrus", "Fris", "Bloemig"],
    properties: ["Fris", "Opvrolijkend", "Kalmerend", "Angstverminderend"],
    applications: ["Diffuser", "Inhalatie", "Parfum", "Bad"],
    noteType: "Top",
    safetyPrecautions: ["Uiterst fototoxisch: ga na gebruik op de huid 12 tot 24 uur niet de felle zon in."],
    description: "Fris en geliefd als smaakmaker van Earl Grey thee. Bergamot is uniek: het opent de zintuigen met een zonnige citrusfrisheid, terwijl het tegelijkertijd diep angstverminderend en kalmerend werkt op de zenuwen.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Oshadhi",
    notes: "Mijn favoriete citrusvrucht. Heerlijk om angsten of spanningen mee op te lossen.",
    colorHex: "#d9f99d",
    icon: "🍋",
    type: "Natuurlijk"
  },
  {
    id: "nat-citroeneuc",
    name: "Citroen-Euc.",
    botanicalName: "Eucalyptus citriodora",
    category: "Citrus",
    aromaProfile: ["Fris", "Citrus", "Medicinaal"],
    properties: ["Insectenwerend", "Zeer fris", "Zuiverend"],
    applications: ["Diffuser", "Schoonmaak", "Luchtverfrisser", "In de auto"],
    noteType: "Top",
    safetyPrecautions: ["Sterk citroen-achtig aroma, kan gevoelige huid licht irriteren"],
    description: "Insectenwerend en extreem fris. Citroen-eucalyptus combineert de stimulerende kracht van citrus met de weldoende kwaliteiten van eucalyptus. Ideaal in de zomerdagen om muggen te verdrijven en de lucht krachtig te zuiveren.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Physalis",
    notes: "Werkt perfect tegen muggen en ruikt heerlijk fris en schoon in huis.",
    colorHex: "#a7f3d0",
    icon: "🍃",
    type: "Natuurlijk"
  },
  {
    id: "nat-sinaasappel",
    name: "Sinaasappel",
    botanicalName: "Citrus sinensis",
    category: "Citrus",
    aromaProfile: ["Citrus", "Zoet", "Warm"],
    properties: ["Vrolijk", "Zoet", "Fruitig", "Ontspannend", "Opvrolijkend"],
    applications: ["Diffuser", "Bad", "Schoonmaak", "Luchtverfrisser"],
    noteType: "Top",
    safetyPrecautions: ["Licht fototoxisch (milder dan citroen)"],
    description: "Vrolijk, zoet en sprankelend fruitig. Sinaasappelolie vult elke ruimte met een zonnige, gemoedelijke sfeer. Het is de ultieme geur om angst los te laten en vermindert somberheid bij jong en oud.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 15,
    brand: "Pranarôm",
    notes: "Combineert uitstekend met kruidige geuren zoals kaneel voor een knusse herfst/wintersfeer.",
    colorHex: "#ffedd5",
    icon: "🍊",
    type: "Natuurlijk"
  },
  {
    id: "nat-cederhout",
    name: "Cederhout",
    botanicalName: "Cedrus atlantica",
    category: "Houtachtig",
    aromaProfile: ["Houtachtig", "Warm", "Aards"],
    properties: ["Droog", "Warm", "Grondend", "Rustgevend", "Zuiverend"],
    applications: ["Diffuser", "Massage", "Huidverzorging", "In de auto"],
    noteType: "Basis",
    safetyPrecautions: ["Niet gebruiken tijdens zwangerschap"],
    description: "Droog, balsemachtig warm en rustgevend houtaroma. Cederhout schenkt standvastigheid en een gevoel van veiligheid bij hectiek. Het helpt gedachten tot rust te brengen en te aarden.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Jacob Hooy",
    notes: "Rijke mannelijke bosachtige toon. Geweldige basis van elke blend.",
    colorHex: "#eeddc5",
    icon: "🌲",
    type: "Natuurlijk"
  },
  {
    id: "nat-groveden",
    name: "Grove Den",
    botanicalName: "Pinus sylvestris",
    category: "Houtachtig",
    aromaProfile: ["Fris", "Houtachtig"],
    properties: ["Verkwikkend", "Boslucht", "Luchtwegen openend", "Energie-opwekkend"],
    applications: ["Diffuser", "Inhalatie", "Bad", "Schoonmaak"],
    noteType: "Top",
    safetyPrecautions: ["Kan op de huid irriteren als de olie al oud of geoxideerd is"],
    description: "Pure boslucht in een flesje. Grove Den is een aromatische injectie van zuurstof en vitaliteit. Het opent de luchtwegen, stimuleert de geest en verkwikt bij vermoeidheid.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Chi",
    notes: "Geeft echt het gevoel alsof je door een vochtig naaldbos wandelt. Erg zuiverend.",
    colorHex: "#bdf0d4",
    icon: "🏔️",
    type: "Natuurlijk"
  },
  {
    id: "nat-sandelhout",
    name: "Sandelhout",
    botanicalName: "Santalum album",
    category: "Houtachtig",
    aromaProfile: ["Houtachtig", "Zoet", "Warm"],
    properties: ["Romig", "Zacht", "Kostbaar", "Meditatief", "Sensueel"],
    applications: ["Diffuser", "Massage", "Huidverzorging", "Parfum"],
    noteType: "Basis",
    safetyPrecautions: ["Zeldzaam en kostbaar; spaarzaam gebruiken"],
    description: "Romig, fluweelzacht en spiritueel diep. Sandelhout is geliefd om haar rustgevende en harmoniserende werking die spanningen in de onderbuik en psyche wegneemt en meditatieve staten verdiept.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 5,
    brand: "Oshadhi",
    notes: "Buitengewoon romig en zacht. Blijft dagenlang hoorbaar in de achtergrond.",
    colorHex: "#f5e6d3",
    icon: "🪵",
    type: "Natuurlijk"
  },
  {
    id: "nat-anijs",
    name: "Anijs",
    botanicalName: "Pimpinella anisum",
    category: "Specerijen",
    aromaProfile: ["Kruidig", "Zoet"],
    properties: ["Dropachtig", "Warm", "Verzachtend", "Krampstillend"],
    applications: ["Diffuser", "Inhalatie", "Massage"],
    noteType: "Midden",
    safetyPrecautions: ["Sparing gebruiken", "Niet geschikt bij gevoelige huid of voor jonge kinderen"],
    description: "Een warm, zoet drop-achtig kruidenaroma. Anijs werkt verwarmend, verzachtend voor de ademhaling en ondersteunt een ontspannen spijsvertering en gemoedsrust.",
    rating: 3,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Physalis",
    notes: "Knus en dropachtig. Warmt een koude herfstdag heerlijk op.",
    colorHex: "#fed7aa",
    icon: "🍬",
    type: "Natuurlijk"
  },
  {
    id: "nat-basilicum",
    name: "Basilicum",
    botanicalName: "Ocimum basilicum",
    category: "Kruiden",
    aromaProfile: ["Kruidig", "Fris", "Zoet"],
    properties: ["Groen", "Mediterraans", "Focus verhogend", "Concentratie"],
    applications: ["Diffuser", "Inhalatie", "Massage"],
    noteType: "Top",
    safetyPrecautions: ["Niet gebruiken tijdens zwangerschap", "Kan de huid prikkelen: altijd zeer sterk verdunnen"],
    description: "Fris groen en heerlijk mediterraans. Basilicum is een uitstekende olie bij mentale uitputting. Het verscherpt de logische focus, bevordert de concentratie tijdens examens of werk en opent de ademhaling.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Chi",
    notes: "Ideaal om te verdampen in de werkkamer met citroen als je moet focussen.",
    colorHex: "#cbd5e1",
    icon: "🌿",
    type: "Natuurlijk"
  },
  {
    id: "nat-rozemarijn",
    name: "Rozemarijn",
    botanicalName: "Rosmarinus officinalis",
    category: "Kruiden",
    aromaProfile: ["Kruidig", "Fris", "Houtachtig"],
    properties: ["Stimulerend", "Helder hoofd", "Focus verhogend", "Geheugen stimulerend"],
    applications: ["Diffuser", "Massage", "Huidverzorging", "Inhalatie"],
    noteType: "Top",
    safetyPrecautions: ["Vermijden bij hoge bloeddruk of epilepsie", "Niet gebruiken bij jonge kinderen of tijdens zwangerschap"],
    description: "De legendarische olie voor intellectuele focus. Rozemarijn pept het geheugen en de alertheid direct op door de bloedsomloop in de hersenen te stimuleren. Geeft hernieuwde mentale veerkracht.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Chi",
    notes: "Super stimulans voor de hoofdhuid, helpt ook om 's ochtends makkelijker wakker te worden.",
    colorHex: "#f1f5f9",
    icon: "🪴",
    type: "Natuurlijk"
  },
  {
    id: "nat-salie",
    name: "Salie",
    botanicalName: "Salvia officinalis",
    category: "Kruiden",
    aromaProfile: ["Kruidig", "Fris", "Scherp"],
    properties: ["Reinigend", "Scherp-kruidig", "Zuiverend", "Kalmerend"],
    applications: ["Diffuser", "Schoonmaak", "Luchtverfrisser"],
    noteType: "Midden",
    safetyPrecautions: ["Bevat thujon: spaarzaam doseren", "Niet gebruiken tijdens zwangerschap, borstvoeding, of bij epilepsie"],
    description: "Energetisch reinigend en scherp-kruidig. Salie staat bekend om haar krachtige ontsmettende kwaliteiten. Het zuivert oude lucht en zware sferen uit een ruimte, en brengt een hernieuwde balans.",
    rating: 3,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Jacob Hooy",
    notes: "Sterke, medicinale kruidige toon. Ideaal voor het opruimen van muffe luchtjes.",
    colorHex: "#e2e8f0",
    icon: "🕯️",
    type: "Natuurlijk"
  },
  {
    id: "nat-eucalyptus",
    name: "Eucalyptus",
    botanicalName: "Eucalyptus globulus",
    category: "Muntachtig",
    aromaProfile: ["Fris", "Medicinaal", "Scherp"],
    properties: ["Luchtwegen openend", "Zuiverend", "Verkoelend", "Antibacterieel"],
    applications: ["Diffuser", "Inhalatie", "Bad", "Schoonmaak"],
    noteType: "Top",
    safetyPrecautions: ["Niet voor inwendig gebruik", "Niet geschikt voor baby's en jonge kinderen direct onder de neus"],
    description: "De klassieke hulp bij verkoudheid. Eucalyptus bevat een hoog gehalte cineol dat de luchtwegen snel en krachtig opent. Het zuivert de lucht van ziektekiemen en versterkt de weerstand.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Physalis",
    notes: "Perfect om mee te stomen of te verdampen in de slaapkamer bij een naderende griep.",
    colorHex: "#ccfbf1",
    icon: "❄️",
    type: "Natuurlijk"
  },
  {
    id: "nat-kamfer",
    name: "Kamfer",
    botanicalName: "Cinnamomum camphora",
    category: "Muntachtig",
    aromaProfile: ["Fris", "Medicinaal", "Scherp"],
    properties: ["Krachtig", "Verkoelend", "Verkwikkend", "Stimulerend"],
    applications: ["Diffuser", "Inhalatie", "Massage"],
    noteType: "Top",
    safetyPrecautions: ["Zeer krachtig; matig doseren", "Vermijd bij zwangerschap en epilepsie"],
    description: "Intens krachtig en ijskoud verkoelend. Kamfer stimuleert de bloedsomloop en biedt directe verlichting aan vermoeide of stramme spieren onder de douche of in massageolie.",
    rating: 3,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Oshadhi",
    notes: "Zwak medicinale maar zeer effectieve verfrisser.",
    colorHex: "#e0f2fe",
    icon: "🌡️",
    type: "Natuurlijk"
  },
  {
    id: "nat-pepermunt",
    name: "Pepermunt",
    botanicalName: "Mentha piperita",
    category: "Muntachtig",
    aromaProfile: ["Muntachtig", "Fris", "Scherp"],
    properties: ["IJzig", "Energie-boost", "Focus verhogend", "Verkoelend"],
    applications: ["Diffuser", "Inhalatie", "Massage", "In de auto"],
    noteType: "Top",
    safetyPrecautions: ["Niet gebruiken bij kinderen onder de 6 jaar vanwege het intense mentholgehalte", "Goed weghouden bij de ogen"],
    description: "IJzige cooling en een instant energie-injectie. Pepermunt prikkelt vliegensvlug de geest, opent verstopte luchtwegen, helpt tegen misselijkheid en verlicht zware spanningen in het hoofd.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Pranarôm",
    notes: "Geweldig om mee wakker te worden. Ook koelend bij warme zomerdagen.",
    colorHex: "#f0fdf4",
    icon: "🍃",
    type: "Natuurlijk"
  },
  {
    id: "nat-kaneel",
    name: "Kaneel",
    botanicalName: "Cinnamomum verum",
    category: "Specerijen",
    aromaProfile: ["Kruidig", "Warm", "Zoet"],
    properties: ["Gezellig", "Heet", "Kruidig", "Stimulerend", "Warm"],
    applications: ["Diffuser", "Luchtverfrisser"],
    noteType: "Midden",
    safetyPrecautions: ["Sterk huidprikkelend (dermotoxisch): NOOIT onverdund op de huid toepassen", "Uiterst spaarzaam doseren in de diffuser"],
    description: "Gezelligheid en vurige warmte in een potje. Kaneelolie stimuleert de bloedsomloop, verwarmt de ziel op koude winterdagen en verdrijft melancholie door een knusse, veilige sfeer te scheppen.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 5,
    brand: "Chi",
    notes: "Slechts één druppel samen met 5 druppels sinaasappel creëert direct een heerlijk warme winterse sfeer.",
    colorHex: "#ffedd5",
    icon: "🍂",
    type: "Natuurlijk"
  },
  {
    id: "nat-kruidnagel",
    name: "Kruidnagel",
    botanicalName: "Syzygium aromaticum",
    category: "Specerijen",
    aromaProfile: ["Kruidig", "Warm", "Scherp"],
    properties: ["Intens", "Antibacterieel", "Verwarmend", "Huidherstellend"],
    applications: ["Diffuser", "Bad", "Schoonmaak"],
    noteType: "Midden",
    safetyPrecautions: ["Huidprikkelend: altijd zéér sterk verdunnen", "Niet gebruiken bij jonge kinderen"],
    description: "Intens, warm en ongekend krachtig antibacterieel. Kruidnagelolie heeft een rijke geschiedenis als natuurlijke pijnstiller (bij kiespijn) en is een hoeksteen van zuiverende herfstmelanges en natuurlijke reinigers.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Physalis",
    notes: "Zeer krachtig. Perfect om de mondhygiëne te ondersteunen of te verstuiven bij verkoudheid.",
    colorHex: "#fed7aa",
    icon: "📍",
    type: "Natuurlijk"
  },
  {
    id: "nat-zwartepeper",
    name: "Zwarte Peper",
    botanicalName: "Piper nigrum",
    category: "Specerijen",
    aromaProfile: ["Kruidig", "Scherp", "Warm"],
    properties: ["Pittig", "Stimulerend", "Warm"],
    applications: ["Diffuser", "Massage", "Parfum"],
    noteType: "Midden",
    safetyPrecautions: ["Huidprikkelend bij overdosering: zorg voor een goede verdunning"],
    description: "Geeft pit en karakter aan elke blend. Zwarte Peper heeft een droog, heet aroma dat de microcirculatie in de spieren stimuleert en mentale vermoeidheid verdrijft door een actieve 'bite' te geven.",
    rating: 3,
    stock: "Voldoende",
    volumeMl: 5,
    brand: "Pranarôm",
    notes: "Interessant akkoord om diepte te geven aan houtachtige en citrusmengsels.",
    colorHex: "#f0f5ff",
    icon: "🫑",
    type: "Natuurlijk"
  },
  {
    id: "nat-vanille",
    name: "Vanille",
    botanicalName: "Vanilla planifolia",
    category: "Zoet",
    aromaProfile: ["Zoet", "Warm", "Balsamico"],
    properties: ["Troostend", "Romig", "Ontspannend", "Kalmerend", "Warm"],
    applications: ["Diffuser", "Bad", "Parfum", "Massage"],
    noteType: "Basis",
    safetyPrecautions: ["Lieve en milde geur, uiterst veilig en zacht"],
    description: "Huiselijke troost en romige warmte. Vanille-extract werkt verzachtend bij woede, frustratie of verdriet. Haar zoete aroma roept direct herinneringen op aan gebak, jeugdigheid en geborgen slaap.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 5,
    brand: "Oshadhi",
    notes: "Zalig zoet. Heeft een extreem brede aantrekkingskracht en verzacht scherpe kanten in mengsels.",
    colorHex: "#fef3c7",
    icon: "🍦",
    type: "Natuurlijk"
  },

  // 🧪 SYNTHETISCH & SPECIAAL (10 FRAGRANCES)
  {
    id: "syn-isoe-super",
    name: "Iso E Super",
    botanicalName: "Moleculair aroma (7-acetyl-1,2,3,4,5,6,7,8-octahydro-1,1,6,7-tetramethylnaphthalene)",
    category: "Moleculair",
    aromaProfile: ["Houtachtig", "Warm", "Amber"],
    properties: ["Fluweelzacht", "Modern", "Luxe"],
    applications: ["Parfum", "Diffuser"],
    noteType: "Basis",
    safetyPrecautions: ["Synthetisch parfummolecuul, niet voor inwendig gebruik", "Altijd verdunnen in ethanol of een neutrale olie"],
    description: "Het ultieme fluweelzachte diffusor-molecuul. Iso E Super brengt een droge, houtachtige, ceder-achtige nuance die bijna ongrijpbaar is. Het reageert op de warmte van de menselijke huid en fungeert als een ongelofelijke glansversterker voor omliggende geuren.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 15,
    brand: "Parfumeursgilde",
    notes: "Mijn favoriete parfum-booster. Het vult de ruimte met een subtiele, fluwelige houttoonglans.",
    colorHex: "#f1f5f9",
    icon: "✨",
    type: "Synthetisch"
  },
  {
    id: "syn-ambroxide",
    name: "Ambroxide",
    botanicalName: "Synthetisch Ambergris-molecuul (Ambroxan)",
    category: "Amber",
    aromaProfile: ["Warm", "Aards", "Met ziltige facetten"],
    properties: ["Modern", "Ziltig", "Luxe", "Grondend"],
    applications: ["Parfum", "Parfum"],
    noteType: "Basis",
    safetyPrecautions: ["Alleen bestemd voor cosmetisch gebruik, niet inslikken"],
    description: "Modern, ziltig en intens luxueus. Ambroxide imiteert de legendarische grijze amber (ambergris). Het brengt een zachte warmte, een ziltige zeewind-sensatie en blijft dagenlang op de huid en kleding stralen.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Kostbare geur van pure schone luxe. Heeft een onvoorstelbare levenskracht.",
    colorHex: "#f8fafc",
    icon: "🌊",
    type: "Synthetisch"
  },
  {
    id: "syn-cashmeran",
    name: "Cashmeran",
    botanicalName: "Speciaal syntheet (6,7-dihydro-1,1,2,3,3-pentamethyl-4(5H)-indanone)",
    category: "Muskus/Hout",
    aromaProfile: ["Houtachtig", "Amber", "Muskus"],
    properties: ["Warm", "Stoer", "Robuust"],
    applications: ["Parfum", "Diffuser"],
    noteType: "Basis",
    safetyPrecautions: ["Spaarzaam doseren, erg intens en donker synthetisch aroma"],
    description: "De poetische warmte van 'wol en beton'. Cashmeran is een veelzijdig molecuul dat de zachtheid van muskus verbindt met de stoere, droge geur van dennen, amber en natte stenen. Brengt een unieke moderne textuur.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Givaudan",
    notes: "Heel gezellige, bijna wol-achtige knusse ondertoon in kamerparfums.",
    colorHex: "#ebdcd0",
    icon: "🧶",
    type: "Synthetisch"
  },
  {
    id: "syn-copaiba",
    name: "Copaiba",
    botanicalName: "Copaifera officinalis",
    category: "Balsem",
    aromaProfile: ["Balsamico", "Warm", "Houtachtig"],
    properties: ["Kalmerend", "Verzachtend", "Harmoniserend"],
    applications: ["Diffuser", "Massage", "Huidverzorging"],
    noteType: "Basis",
    safetyPrecautions: ["Uitsluitend cosmetisch gebruik", "Zacht voor de huid"],
    description: "Een natuurlijke, rustige harsbalsem die geuren perfect bindt en fixeert. Copaiba heeft een mild, zoetig-houtachtig aroma en is ideaal om scherpe of overactieve geurelementen in te dammen en langer vast te houden.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Pranarôm",
    notes: "Zeer zacht en rustgevend. Werkt fantastisch als fixatief in al mijn blends.",
    colorHex: "#f3e8ff",
    icon: "🪵",
    type: "Synthetisch"
  },
  {
    id: "syn-vetiver",
    name: "Vetiver",
    botanicalName: "Chrysopogon zizanioides",
    category: "Aards",
    aromaProfile: ["Aards", "Rokerig", "Houtachtig"],
    properties: ["Grondend", "Kalmerend"],
    applications: ["Diffuser", "Massage", "Parfum"],
    noteType: "Basis",
    safetyPrecautions: ["Olie is extreem stroperig en dik; verwarm eventueel het flesje au-bain-marie voor doseren"],
    description: "Natte aarde en diepgeroerd mos. Vetiver is een van de meest stabiele natuurlijke geuren op aarde. Haar intens grondende en geruststellende werking maakt het tot een gewild fundament onder zware mannengeuren.",
    rating: 5,
    stock: "Bijna op",
    volumeMl: 5,
    brand: "Oshadhi",
    notes: "Extreem aards en rokerig. Perfect om 'snelle' geuren af te remmen en diepte te geven.",
    colorHex: "#ededdd",
    icon: "🌾",
    type: "Synthetisch"
  },
  {
    id: "syn-neroli",
    name: "Neroli",
    botanicalName: "Citrus aurantium flos",
    category: "Bloemen",
    aromaProfile: ["Bloemig", "Citrus", "Fris"],
    properties: ["Ontspannend", "Opvrolijkend", "Chic"],
    applications: ["Diffuser", "Parfum", "Bad", "Huidverzorging"],
    noteType: "Top",
    safetyPrecautions: ["Algemeen veilig, kostbaar ingrediënt"],
    description: "Chique, stralende oranjebloesem-frisheid. Neroli wordt gedestilleerd uit de bloesems van de bittere sinaasappelboom. Het is een extreem elegante trooster die zware nerveuze spanningen weghaalt en hoop schenkt.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 2,
    brand: "Primavera",
    notes: "Onbeschrijfelijk chic en fris-bloemig. De koningin der bloesems.",
    colorHex: "#ffedd5",
    icon: "🍊",
    type: "Synthetisch"
  },
  {
    id: "syn-teatree",
    name: "Tea Tree",
    botanicalName: "Melaleuca alternifolia",
    category: "Medicinaal",
    aromaProfile: ["Medicinaal", "Kruidig", "Fris"],
    properties: ["Zuiverend", "Antibacterieel", "Reinigend"],
    applications: ["Schoonmaak", "Huidverzorging", "Inhalatie"],
    noteType: "Top",
    safetyPrecautions: ["Cosmetisch gebruik, niet drinken", "Kan de huid uitdrogen bij overmatig onverdund gebruik"],
    description: "De ultieme zuiverende werking. Tea Tree heeft een scherpe, medicinale en kruidige geur die korte metten maakt met ongewenste bacteriën en schimmels. Verfrist de sfeer grondig van energetische of fysieke ballast.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 15,
    brand: "doTERRA",
    notes: "Altijd in bezit voor eerste hulp bij huidplekjes, muggenbulten en schoonmaak.",
    colorHex: "#f0fdf4",
    icon: "🌿",
    type: "Synthetisch"
  },
  {
    id: "syn-helichrysum",
    name: "Helichrysum",
    botanicalName: "Helichrysum italicum (Strobloem)",
    category: "Kruidig",
    aromaProfile: ["Kruidig", "Warm", "Zoet"],
    properties: ["Huidherstellend", "Warm"],
    applications: ["Huidverzorging", "Massage", "Diffuser"],
    noteType: "Midden",
    safetyPrecautions: ["Altijd goed verdunnen op de huid"],
    description: "Een dromerige geur van warme honing, droog stro en stralende mediterrane zonneschijn. Helichrysum is wereldwijd beroemd om haar fabelachtige herstellende vermogen op de geprikkelde of beurse huid.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 5,
    brand: "Oshadhi",
    notes: "Ruikt heerlijk warm naar gedroogd gras en honing op een zomerse namiddag.",
    colorHex: "#fef9c3",
    icon: "🌼",
    type: "Synthetisch"
  },
  {
    id: "syn-grapefruit",
    name: "Grapefruit",
    botanicalName: "Citrus paradisi",
    category: "Citrus",
    aromaProfile: ["Citrus", "Fris"],
    properties: ["Bitter-fris", "Energie-opwekkend", "Verkwikkend", "Opvrolijkend"],
    applications: ["Diffuser", "Bad", "Luchtverfrisser"],
    noteType: "Top",
    safetyPrecautions: ["Fototoxisch: vermijd de zon tot 12 uur na huidapplicatie"],
    description: "Bitter-fris en boordevol opbeurende vitaliteit. Grapefruitolie stimuleert de afvoer van stoffen en ontwaakt een vrolijke, vastberaden energie. Zeer prettig om ochtendmoeheid te verdrijven.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Physalis",
    notes: "Fantastische geur om vrolijk en energiek aan je dag te beginnen. Heel verkwikkend.",
    colorHex: "#fdf2f8",
    icon: "🍈",
    type: "Synthetisch"
  },
  {
    id: "syn-leder",
    name: "Leder",
    botanicalName: "Parfumakkoord (Leather Accord)",
    category: "Leer",
    aromaProfile: ["Rokerig", "Leder", "Warm"],
    properties: ["Stoer", "Robuust"],
    applications: ["Parfum"],
    noteType: "Basis",
    safetyPrecautions: ["Uitsluitend voor cosmetisch gebruik in cosmetica en huisparfums"],
    description: "Stoer, robuust en diep karaktervol. Dit speciale geurakkoord herinnert aan vers gelooid suède en zacht zadelleder. Het brengt een masculiene, rijke en ietwat mysterieuze diepgang aan complexere parfummengsels.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Givaudan",
    notes: "Super stoere basis. Perfect te combineren met cederhout en een klein beetje sinaasappel.",
    colorHex: "#ebdcd0",
    icon: "👜",
    type: "Synthetisch"
  },
  // 🌿 EXTRA NATUURLIJKE OLIËN IN BEZIT
  {
    id: "nat-lavendel-std",
    name: "Lavendel",
    botanicalName: "Lavandula angustifolia",
    category: "Bloemen",
    aromaProfile: ["Bloemig", "Fris", "Kruidig"],
    properties: ["Ontspannend", "Slaapbevorderend", "Kalmerend"],
    applications: ["Diffuser", "Bad", "Massage"],
    noteType: "Midden",
    safetyPrecautions: ["Zeer veilige olie"],
    description: "Klassieke Franse lavendel. Biedt de geliefde, rustgevende en harmoniserende geurervaring die direct spanningen en stress doet wegvloeien.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Physalis",
    notes: "Onze betrouwbare standaard lavendel voor dagelijks gebruik.",
    colorHex: "#cbd5e1",
    icon: "🌿",
    type: "Natuurlijk"
  },
  {
    id: "nat-lemongrass",
    name: "Lemongrass",
    botanicalName: "Cymbopogon flexuosus",
    category: "Citrus",
    aromaProfile: ["Fris", "Citrus", "Kruidig"],
    properties: ["Verfrissend", "Energie-opwekkend", "Focus verhogend"],
    applications: ["Diffuser", "Schoonmaak", "Massage"],
    noteType: "Top",
    safetyPrecautions: ["Kan de gevoelige huid irriteren, altijd goed verdunnen"],
    description: "Verfrissend en intens citrusachtig. Lemongrass zuivert de omgevingslucht, schudt de zintuigen wakker en verhoogt onmiddellijk de mentale alertheid.",
    rating: 5,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Pranarôm",
    notes: "Heerlijk verkwikkend in de ochtend.",
    colorHex: "#fef08a",
    icon: "🍋",
    type: "Natuurlijk"
  },
  {
    id: "nat-wildemuskus",
    name: "Wilde Muskus",
    botanicalName: "Abelmoschus moschatus extract",
    category: "Aards",
    aromaProfile: ["Warm", "Sensueel", "Zoet", "Poederachtig"],
    properties: ["Kalmerend", "Sensueel", "Grondend"],
    applications: ["Parfum", "Diffuser"],
    noteType: "Basis",
    safetyPrecautions: ["Alleen voor cosmetisch gebruik, mild doseren"],
    description: "Zacht, sensueel en poederachtig warm. Wilde Muskus brengt een zachte, warme, en troostende omsluiering die geurmengsels een subliem, intiem karakter geeft.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 5,
    brand: "Chi",
    notes: "Zeer sensuele, luxueuze drager.",
    colorHex: "#fed7aa",
    icon: "✨",
    type: "Natuurlijk"
  },
  // 🧪 EXTRA SYNTHETISCHE GEUREN
  {
    id: "syn-pineneedles",
    name: "Pine Needles",
    botanicalName: "Pinus sylvestris reconstructie",
    category: "Houtachtig",
    aromaProfile: ["Fris", "Houtachtig", "Naaldbos"],
    properties: ["Verkwikkend", "Zuiverend", "Boslucht"],
    applications: ["Diffuser", "Luchtverfrisser"],
    noteType: "Top",
    safetyPrecautions: ["Niet voor inwendig gebruik"],
    description: "De heldere en frisse geur van knisperende dennennaalden. Herinnert onmiddellijk aan een wandeling door een diep, schaduwrijk naaldbos in de vroege ochtend.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Mooie, stabile dennengeur die heerlijk fris verstuift.",
    colorHex: "#bbf7d0",
    icon: "🌲",
    type: "Synthetisch"
  },
  {
    id: "syn-lemon",
    name: "Lemon",
    botanicalName: "Citrus limon reconstructie",
    category: "Citrus",
    aromaProfile: ["Citrus", "Scherp", "Fris"],
    properties: ["Zuiverend", "Energie-boost", "Helderheid"],
    applications: ["Diffuser", "Schoonmaak"],
    noteType: "Top",
    safetyPrecautions: ["Buiten bereik van kinderen houden"],
    description: "Sprankelende, schone citroengeur. Perfect om muffe geurtjes te maskeren en de focus op dynamische wijze te scherpen.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Zeer fris en perfect voor schoonmaaksites.",
    colorHex: "#fef08a",
    icon: "🍋",
    type: "Synthetisch"
  },
  {
    id: "syn-juniperberry",
    name: "Juniper Berry",
    botanicalName: "Juniperus communis reconstructie",
    category: "Houtachtig",
    aromaProfile: ["Fris", "Houtachtig", "Kruidig", "Ziltig"],
    properties: ["Zuiverend", "Vitaliserend", "Grondend"],
    applications: ["Diffuser", "Parfum"],
    noteType: "Midden",
    safetyPrecautions: ["Cosmetisch gebruik, niet inslikken"],
    description: "Aromatisch en licht harsachtig. Dit jeneverbesakkoord voegt een unieke, droge, en licht ziltige nuance toe aan kruidige en houtachtige parfummengsels.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Prachtige, geraffineerde noot voor cologne-achtige mengsels.",
    colorHex: "#ddd6fe",
    icon: "🫐",
    type: "Synthetisch"
  },
  {
    id: "syn-spearmint",
    name: "Spearmint",
    botanicalName: "Mentha spicata reconstructie",
    category: "Muntachtig",
    aromaProfile: ["Muntachtig", "Zoet", "Fris"],
    properties: ["Verfrissend", "Opvrolijkend", "Concentratie"],
    applications: ["Diffuser", "Inhalatie"],
    noteType: "Top",
    safetyPrecautions: ["Cosmetisch gebruik"],
    description: "Huiselijke milde pepermunt. Dit zoetige spearmint-akkoord verfrist op een subtiele, lichte manier en helpt bij het behouden van een heldere geest.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Zachter en zoeter dan de scherpe pepermunt.",
    colorHex: "#dcfce7",
    icon: "🌿",
    type: "Synthetisch"
  },
  {
    id: "syn-patchouli",
    name: "Patchouli (Synthetisch)",
    botanicalName: "Patchouli reconstructie akkoord",
    category: "Aards",
    aromaProfile: ["Aards", "Warm", "Intens"],
    properties: ["Grondend", "Fixatief"],
    applications: ["Parfum"],
    noteType: "Basis",
    safetyPrecautions: ["Alleen voor cosmetisch parfumgebruik"],
    description: "Een betrouwbare, constante patchouligeur. Biedt de iconische en grondende diepe, donkere, aardse warmte zonder de schommelingen van biologische oogsten.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Givaudan",
    notes: "Ideaal als krachtige fixateur in zware, oosterse parfums.",
    colorHex: "#fed7aa",
    icon: "🌿",
    type: "Synthetisch"
  },
  {
    id: "syn-chamomile",
    name: "Chamomile",
    botanicalName: "Matricaria chamomilla reconstructie",
    category: "Bloemen",
    aromaProfile: ["Bloemig", "Zoet", "Kruidig"],
    properties: ["Kalmerend", "Rustgevend"],
    applications: ["Diffuser", "Bad"],
    noteType: "Midden",
    safetyPrecautions: ["Cosmetische doeleinden"],
    description: "Een uiterst rustgevend, appelachtig zoet bloemenaroma. Ideaal om sfeer te verzachten, onrustige geesten te kalmeren en een goede nachtrust in te luiden.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Zalige, rustgevende thee-achtige nuance.",
    colorHex: "#fef9c3",
    icon: "🌼",
    type: "Synthetisch"
  },
  {
    id: "syn-basil",
    name: "Basil (Synthetisch)",
    botanicalName: "Ocimum basilicum reconstructie",
    category: "Kruiden",
    aromaProfile: ["Kruidig", "Groen", "Fris"],
    properties: ["Concentratie", "Focus verhogend"],
    applications: ["Parfum", "Diffuser"],
    noteType: "Top",
    safetyPrecautions: ["Met mate doseren"],
    description: "Peperig, anijsachtig groen basilicumakkoord. Handig als constante component om frisse, kruidige en aromatische geurharten te structureren.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Givaudan",
    notes: "Uitstekende stabiliteit in blends.",
    colorHex: "#cbd5e1",
    icon: "🌿",
    type: "Synthetisch"
  },
  {
    id: "syn-citronella",
    name: "Citronella",
    botanicalName: "Cymbopogon nardus reconstructie",
    category: "Citrus",
    aromaProfile: ["Citrus", "Fris", "Scherp"],
    properties: ["Insectenwerend", "Verfrissend"],
    applications: ["Diffuser", "Luchtverfrisser"],
    noteType: "Top",
    safetyPrecautions: ["Alleen verdampen, niet op beschadigde huid smeren"],
    description: "Herkenbare, scherpe en citrusachtige citronellageur. Zeer geliefd om buitenshuis en binnenshuis muggen effectief te weren en een hygiënische frisse noot te verspreiden.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "De klassieke insectenverjager voor de zomeravonden.",
    colorHex: "#fef08a",
    icon: "🍋",
    type: "Synthetisch"
  },
  {
    id: "syn-clarysage",
    name: "Clary Sage",
    botanicalName: "Salvia sclarea reconstructie",
    category: "Kruiden",
    aromaProfile: ["Kruidig", "Bloemig", "Warm", "Zoet"],
    properties: ["Kalmerend", "Inspirerend", "Euforisch"],
    applications: ["Parfum", "Diffuser"],
    noteType: "Midden",
    safetyPrecautions: ["Kan in zeldzame gevallen dromerigheid veroorzaken; vermijden met alcohol"],
    description: "Een complex, kruidachtig en nootachtig zoet scharleisalieroma. Werkt diepgaand harmoniserend, wekt een gevoel van lichte euforie op en stimuleert de verbeeldingskracht.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Prachtige zoet-kruidige noot, heel chique in cologne-akkoorden.",
    colorHex: "#e2e8f0",
    icon: "🌿",
    type: "Synthetisch"
  },
  {
    id: "syn-eucalyptus",
    name: "Eucalyptus (Synthetisch)",
    botanicalName: "Eucalyptus globulus reconstructie",
    category: "Muntachtig",
    aromaProfile: ["Fris", "Medicinaal", "Scherp"],
    properties: ["Zuiverend", "Luchtwegen openend"],
    applications: ["Diffuser", "Schoonmaak"],
    noteType: "Top",
    safetyPrecautions: ["Alleen voor verdamping"],
    description: "Een stimulerende, heldere reconstructie van eucalyptus die de kamerinstant vult met een schone, hygiënische sfeer en een open ademhaling stimuleert.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Altijd handig voor diffusie in grote ruimtes.",
    colorHex: "#ccfbf1",
    icon: "❄️",
    type: "Synthetisch"
  },
  {
    id: "syn-jasmine",
    name: "Jasmine (Synthetisch)",
    botanicalName: "Jasminum officinale reconstructie",
    category: "Bloemen",
    aromaProfile: ["Bloemig", "Zoet", "Rijk"],
    properties: ["Romantisch", "Luxueus"],
    applications: ["Parfum", "Diffuser"],
    noteType: "Midden",
    safetyPrecautions: ["Niet drinken"],
    description: "Uiterst weelderig, rijk en romantisch jasmijn-akkoord. Perfect om bloemenharten in parfums een zware, zoete en weelderige diepgang te geven.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Givaudan",
    notes: "Brengt een koninklijke, honingzoete sensualiteit.",
    colorHex: "#fdf2f8",
    icon: "🌸",
    type: "Synthetisch"
  },
  {
    id: "syn-cypress",
    name: "Cypress",
    botanicalName: "Cupressus sempervirens reconstructie",
    category: "Houtachtig",
    aromaProfile: ["Houtachtig", "Fris", "Harsig"],
    properties: ["Grondend", "Balanserend"],
    applications: ["Diffuser", "Parfum"],
    noteType: "Midden",
    safetyPrecautions: ["Cosmetische doeleinden"],
    description: "Cipresgeur met een fris, harsachtig karakter dat direct doet denken aan de majestueuze, zonovergoten beboste heuvels van Toscane.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Grondend en kalmerend, brengt drogere elegantie.",
    colorHex: "#f5e6d3",
    icon: "🌲",
    type: "Synthetisch"
  },
  {
    id: "syn-lemongrass",
    name: "Lemongrass (Synthetisch)",
    botanicalName: "Cymbopogon flexuosus reconstructie",
    category: "Citrus",
    aromaProfile: ["Fris", "Citrus", "Scherp"],
    properties: ["Energie-boost", "Zuiverend"],
    applications: ["Diffuser"],
    noteType: "Top",
    safetyPrecautions: ["Met zorg verdampen"],
    description: "Intens citroengrasakkoord dat een stimulerende en actieve citrusenergie verspreidt, zeer geschikt voor grotere diffuserconcepten.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Zeer krachtige, doordringende citrusnoot.",
    colorHex: "#fef08a",
    icon: "🍋",
    type: "Synthetisch"
  },
  {
    id: "syn-vanilla",
    name: "Vanilla",
    botanicalName: "Vanilline reconstructie",
    category: "Zoet",
    aromaProfile: ["Zoet", "Warm", "Romig"],
    properties: ["Troostend", "Huiselijk"],
    applications: ["Parfum", "Diffuser"],
    noteType: "Basis",
    safetyPrecautions: ["Mild en veilig"],
    description: "Perfect zoet, romig and intens warm. Dit pure gesynthetiseerde vanille-akkoord (vanilline) roept een onmiddellijke sfeer van knusheid en geborgenheid op.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Givaudan",
    notes: "Geweldig om scherpe kruidengeuren af te romen.",
    colorHex: "#fef3c7",
    icon: "🍬",
    type: "Synthetisch"
  },
  {
    id: "syn-lemoneucalyptus",
    name: "Lemon Eucalyptus",
    botanicalName: "Eucalyptus citriodora reconstructie",
    category: "Citrus",
    aromaProfile: ["Fris", "Citrus", "Kruidig"],
    properties: ["Verfrissend", "Insectenwerend"],
    applications: ["Diffuser"],
    noteType: "Top",
    safetyPrecautions: ["Cosmetisch gebruik"],
    description: "Combineert de levendige, verkwikking van pure citrus met de diepe, schone aspecten van de eucalyptusplant. Perfect voor een heldere ruimte.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Ideaal om de lucht te ontdoen van muffe tonen.",
    colorHex: "#fef08a",
    icon: "🍋",
    type: "Synthetisch"
  },
  {
    id: "syn-peppermint",
    name: "Peppermint (Synthetisch)",
    botanicalName: "Mentha piperita reconstructie",
    category: "Muntachtig",
    aromaProfile: ["Muntachtig", "Fris", "IJzig"],
    properties: ["Energie-boost", "Verkoelend"],
    applications: ["Diffuser"],
    noteType: "Top",
    safetyPrecautions: ["Weg houden bij de ogen"],
    description: "Een ijskoud, stimulerend muntakkoord met een hoog mentholgevoel dat de zintuigen direct een weldadige frisheid en energie geeft.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Zeer verfrissend, ideaal voor de vroege morgen.",
    colorHex: "#ccfbf1",
    icon: "❄️",
    type: "Synthetisch"
  },
  {
    id: "syn-oregano",
    name: "Oregano",
    botanicalName: "Origanum vulgare reconstructie",
    category: "Kruiden",
    aromaProfile: ["Scherp", "Kruidig", "Warm"],
    properties: ["Zuiverend", "Intens"],
    applications: ["Diffuser"],
    noteType: "Midden",
    safetyPrecautions: ["Alleen verdampen, zeer heet aroma"],
    description: "Een extreem kruidig, pikant en heet aroma. Oregano staat bekend om zijn onbuigzame, hygiënische zuivering bij griep en verkoudheid.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Zeer krachtig kruidenakkoord.",
    colorHex: "#cbd5e1",
    icon: "🌿",
    type: "Synthetisch"
  },
  {
    id: "syn-cedarwood",
    name: "Cedarwood (Synthetisch)",
    botanicalName: "Cedrol / Wood Accord",
    category: "Houtachtig",
    aromaProfile: ["Houtachtig", "Droog", "Warm"],
    properties: ["Grondend", "Modern"],
    applications: ["Parfum"],
    noteType: "Basis",
    safetyPrecautions: ["Cosmetisch parfumgebruik"],
    description: "Een droge, uiterst geraffineerde houtnoot. Het synthetische cederhout-akkoord blinkt uit in stabiliteit en is de ruggengraat van chique, mannelijke parfums.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Givaudan",
    notes: "Prachtige, moderne houtnoot voor verfijnde fixatie.",
    colorHex: "#f5e6d3",
    icon: "🌲",
    type: "Synthetisch"
  },
  {
    id: "syn-sweetorange",
    name: "Sweet Orange",
    botanicalName: "Citrus sinensis reconstructie",
    category: "Citrus",
    aromaProfile: ["Citrus", "Zoet", "Vrolijk"],
    properties: ["Opvrolijkend", "Vrolijk"],
    applications: ["Diffuser"],
    noteType: "Top",
    safetyPrecautions: ["Buiten zon houden op de huid"],
    description: "Honingzoete en sappige sinaasappelreconstructie. Vult de leefomgeving met een zonnige, lichte energie die angst en somberheid doet wegsmelten.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Kinderlijke geliefde zoetheid.",
    colorHex: "#ffedd5",
    icon: "🍊",
    type: "Synthetisch"
  },
  {
    id: "syn-sandalwood",
    name: "Sandalwood (Synthetisch)",
    botanicalName: "Sandalore / Javanol Accord",
    category: "Houtachtig",
    aromaProfile: ["Houtachtig", "Romig", "Warm"],
    properties: ["Grondend", "Luxe"],
    applications: ["Parfum"],
    noteType: "Basis",
    safetyPrecautions: ["Cosmetisch gebruik"],
    description: "Uiterst romig, zacht and persistent sandelhout-akkoord. Legt een fluweelzachte, warme en uiterst geraffineerde basis onder bloemige en oosterse geurmengsels.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Givaudan",
    notes: "Fantastische, langhoudende musk-achtige zachte houttoon.",
    colorHex: "#ebdcd0",
    icon: "🪵",
    type: "Synthetisch"
  },
  {
    id: "syn-rosemary",
    name: "Rosemary (Synthetisch)",
    botanicalName: "Rosmarinus officinalis reconstructie",
    category: "Kruiden",
    aromaProfile: ["Kruidig", "Fris", "Kruidachtig"],
    properties: ["Mentaal helder", "Helder hoofd"],
    applications: ["Diffuser"],
    noteType: "Top",
    safetyPrecautions: ["Matig doseren"],
    description: "Verkwikkend en kruidachtig rozemarijn-akkoord. Perfect om overmande of vermoeide geesten overdag een frisse, stimulerende oppepper te geven.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Lekker helder en stimulerend.",
    colorHex: "#f1f5f9",
    icon: "🪴",
    type: "Synthetisch"
  },
  {
    id: "syn-lavendel",
    name: "Lavendel (Synthetisch)",
    botanicalName: "Lavandula angustifolia reconstructie",
    category: "Bloemen",
    aromaProfile: ["Bloemig", "Kruidig", "Fris"],
    properties: ["Rustgevend", "Kalmerend"],
    applications: ["Diffuser"],
    noteType: "Midden",
    safetyPrecautions: ["Niet inslikken"],
    description: "Herkenbare, serene en frisse bloemige lavendelgeur. Brengt onmiddellijk harmonie, balans en een zacht gevoel van diepe ontspanning.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Stabiel en betrouwbaar voor dagelijkse diffusie.",
    colorHex: "#e0d3f5",
    icon: "💜",
    type: "Synthetisch"
  },
  {
    id: "syn-bergamot",
    name: "Bergamot (Synthetisch)",
    botanicalName: "Citrus bergamia reconstructie",
    category: "Citrus",
    aromaProfile: ["Citrus", "Fris", "Bloemig"],
    properties: ["Opvrolijkend", "Chic"],
    applications: ["Parfum"],
    noteType: "Top",
    safetyPrecautions: ["Alleen voor uitwendig gebruik"],
    description: "Zonnige, elegante citrus-bloemenfrisheid. Dit constante synthetische akkoord biedt de luxe bergamotervaring zonder zonlichtgevoeligheid (fototoxiciteit).",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Givaudan",
    notes: "Elegant en onmisbaar in elk cologne- en chypreparfum.",
    colorHex: "#d9f99d",
    icon: "🍋",
    type: "Synthetisch"
  },
  {
    id: "syn-turmeric",
    name: "Turmeric",
    botanicalName: "Curcuma longa reconstructie",
    category: "Specerijen",
    aromaProfile: ["Aards", "Warm", "Kruidig"],
    properties: ["Grondend", "Verwarmend"],
    applications: ["Diffuser"],
    noteType: "Midden",
    safetyPrecautions: ["Cosmetische doeleinden"],
    description: "Een aards en gekruid warm kurkumageur-akkoord. Voegt een herkenbare, diepe Oosterse sfeer en een warm grondend karakter toe aan herfstblends.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Interessante specerij-toon voor warme melanges.",
    colorHex: "#fbcfe8",
    icon: "🪵",
    type: "Synthetisch"
  },
  {
    id: "syn-myrrh",
    name: "Myrrh (Synthetisch)",
    botanicalName: "Commiphora myrrha reconstructie",
    category: "Hars",
    aromaProfile: ["Aards", "Rokerig", "Balsamico"],
    properties: ["Rustgevend", "Meditatief"],
    applications: ["Parfum"],
    noteType: "Basis",
    safetyPrecautions: ["Alleen parfumgebruik"],
    description: "Een diepe, rokerige en droge harsreconstructie van mirre. Ideaal voor het overbrengen van een gewijde, rustige en herstellende meditatieve ambiance.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Givaudan",
    notes: "Zheavy, balsemachtige noot die geuren langdurig tempert.",
    colorHex: "#ffd7aa",
    icon: "🪵",
    type: "Synthetisch"
  },
  {
    id: "syn-frankincense",
    name: "Frankincense (Synthetisch)",
    botanicalName: "Boswellia carterii reconstructie",
    category: "Hars",
    aromaProfile: ["Houtachtig", "Warm", "Balsamico"],
    properties: ["Meditatief", "Kalmerend"],
    applications: ["Parfum"],
    noteType: "Basis",
    safetyPrecautions: ["Cosmetisch gebruik"],
    description: "Een constante en droge wierookgeur. Biedt de klassieke, zilverachtig balsemachtige noot die alMillennia lang gebruikt wordt voor het sferisch zuiveren van ruimtes.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Givaudan",
    notes: "Mijn favoriete spirituele parfumcomponent.",
    colorHex: "#fbcfe8",
    icon: "⛪",
    type: "Synthetisch"
  },
  {
    id: "syn-ylangylang",
    name: "Ylang Ylang (Synthetisch)",
    botanicalName: "Cananga odorata reconstructie",
    category: "Bloemen",
    aromaProfile: ["Bloemig", "Zoet", "Exotisch"],
    properties: ["Sensueel", "Ontspannend"],
    applications: ["Parfum"],
    noteType: "Basis",
    safetyPrecautions: ["Spaarzaam doseren"],
    description: "Rijk, nectarachtig zoet en exotisch bloemenfeest. Dit synthetische ylang-akkoord creëert een dromerige, sensuele, en euforische sfeer.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Givaudan",
    notes: "Zeer luxueuze eilandbloem.",
    colorHex: "#fae8ff",
    icon: "🌺",
    type: "Synthetisch"
  },
  {
    id: "syn-tangerine",
    name: "Tangerine",
    botanicalName: "Citrus reticulata reconstructie",
    category: "Citrus",
    aromaProfile: ["Citrus", "Zoet", "Fris", "Fruitig"],
    properties: ["Opvrolijkend", "Vrolijk", "Verfrissend"],
    applications: ["Diffuser", "Bad"],
    noteType: "Top",
    safetyPrecautions: ["Fototoxisch mijd felle zon"],
    description: "Een heerlijk sappig, honingzoet en supervrolijk mandarijnaroma. Brengt een stralende, onbezorgde zonneschijn in het hart en kalmeert nerveuze onrust.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Lief, zoet en geliefd door jong en oud.",
    colorHex: "#ffd7aa",
    icon: "🍊",
    type: "Synthetisch"
  },
  {
    id: "syn-geranium",
    name: "Geranium",
    botanicalName: "Pelargonium graveolens reconstructie",
    category: "Bloemen",
    aromaProfile: ["Bloemig", "Groen", "Fris", "Rozig"],
    properties: ["Harmoniserend", "Balanserend", "Opvrolijkend"],
    applications: ["Diffuser", "Parfum"],
    noteType: "Midden",
    safetyPrecautions: ["Cosmetisch gebruik, mild doseren"],
    description: "Een frisgroen bloemenakkoord met fijne rozige kanten. Geranium werkt diepgaand harmoniserend op de geest en ondersteunt het loslaten van opgekropte tension.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Parfumeursgilde",
    notes: "Brengt balance in elke zoete of houtachtige blend.",
    colorHex: "#fbcfe8",
    icon: "🌸",
    type: "Synthetisch"
  },
  {
    id: "syn-rose",
    name: "Rose (Synthetisch)",
    botanicalName: "Rosa damascene reconstructie",
    category: "Bloemen",
    aromaProfile: ["Bloemig", "Zoet", "Rijk"],
    properties: ["Luxueus", "Zacht", "Harmoniserend"],
    applications: ["Parfum", "Diffuser"],
    noteType: "Midden",
    safetyPrecautions: ["Alleen voor uitwendig geurgebruik"],
    description: "Een weelderig, honingzoet en fluweelzacht rozenakkoord. Laat je omgeven met luxe en zachte liefdevolle tederheid zonder de hoge kostprijs van rozenolie.",
    rating: 4,
    stock: "Voldoende",
    volumeMl: 10,
    brand: "Givaudan",
    notes: "Geurt geweldig persistent en romig-rozig.",
    colorHex: "#fecdd3",
    icon: "🌹",
    type: "Synthetisch"
  }
];

export const SUGGESTED_SYNERGIES = [
  {
    name: "Diepe Slaap & Rust",
    purpose: "Voor een heerlijk ontspannen sfeer voor het slapengaan.",
    recipe: [
      { id: "nat-lavendel", drops: 3, name: "Lavendel (Bio)" },
      { id: "nat-sinaasappel", drops: 2, name: "Sinaasappel" },
      { id: "nat-cederhout", drops: 1, name: "Cederhout" }
    ],
    instructions: "Voeg deze druppels toe aan de diffuser 30 minuten voor het slapengaan."
  },
  {
    name: "Maximale Focus & Mentaal Werk",
    purpose: "Ideaal tijdens werk, studie of creatieve bezigheden.",
    recipe: [
      { id: "nat-pepermunt", drops: 3, name: "Pepermunt" },
      { id: "nat-rozemarijn", drops: 2, name: "Rozemarijn" },
      { id: "nat-basilicum", drops: 2, name: "Basilicum" }
    ],
    instructions: "Gebruik dit overdag in de diffuser of verdamp op een sieraad."
  },
  {
    name: "Modern Fluweel (Parfum)",
    purpose: "Een chic parfumakkoord dat verfijning, warmte en ziltigheid uitstraalt.",
    recipe: [
      { id: "syn-isoe-super", drops: 5, name: "Iso E Super" },
      { id: "syn-ambroxide", drops: 2, name: "Ambroxide" },
      { id: "syn-neroli", drops: 1, name: "Neroli" }
    ],
    instructions: "Meng in 10ml alcohol of jojoba-olie voor een sensationeel minimalistisch parfum."
  },
  {
    name: "Gezellige Winteravond",
    purpose: "Warmt het huis op en wekt een knus gevoel van geborgenheid op.",
    recipe: [
      { id: "nat-sinaasappel", drops: 4, name: "Sinaasappel" },
      { id: "nat-kaneel", drops: 1, name: "Kaneel" },
      { id: "nat-vanille", drops: 2, name: "Vanille" }
    ],
    instructions: "Heerlijk om te verstuiven tijdens donkere of kille winteravonden."
  },
  {
    name: "Aardse Meditatie & Wierook",
    purpose: "Voor diepe gronding, mindfulness of spirituele sessies.",
    recipe: [
      { id: "nat-wierook", drops: 3, name: "Wierook" },
      { id: "nat-myrrhe", drops: 2, name: "Myrrhe" },
      { id: "syn-vetiver", drops: 1, name: "Vetiver" }
    ],
    instructions: "Verstuif tijdens meditatie, ademhalingsoefeningen of yoga."
  },
  {
    name: "Chique Huidverzorging & Troost",
    purpose: "Verlicht irritaties van de huid en kalmeert een beurse stemming.",
    recipe: [
      { id: "nat-lavendel", drops: 2, name: "Lavendel (Bio)" },
      { id: "syn-helichrysum", drops: 1, name: "Helichrysum" },
      { id: "nat-roos", drops: 1, name: "Roos" }
    ],
    instructions: "Meng met 20ml calendula- of amandelolie voor een herstellende zachte huidolie."
  }
];

/**
 * Returns an authentic, high-resolution botanical photograph precisely matching
 * the specific essential oil, plant, blossom, resin, wood, or spice.
 */
export function getOilPhoto(oil: EssentialOil): string {
  if (oil.photoUrl && oil.photoUrl.trim() !== "") {
    return oil.photoUrl;
  }

  const id = (oil.id || "").toLowerCase();
  const name = (oil.name || "").toLowerCase();
  const bot = (oil.botanicalName || "").toLowerCase();
  
  // 1. Myrrh (Commiphora myrrha) - Sacred golden aromatic resin tears
  if (id.includes("myrrhe") || id.includes("myrrh") || name.includes("myrrhe") || name.includes("myrrh") || bot.includes("myrrha")) {
    return "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800";
  }
  
  // 2. Patchouli (Pogostemon cablin) - Earthy botanical patchouli leaves & oil
  if (id.includes("patchouli") || name.includes("patchouli") || bot.includes("patchouli") || bot.includes("cablin")) {
    return "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800";
  }
  
  // 3. Wierook / Frankincense (Boswellia carterii) - Sacred golden resin tears & oil
  if (id.includes("wierook") || name.includes("wierook") || id.includes("frankincense") || name.includes("frankincense") || bot.includes("boswellia")) {
    return "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800";
  }
  
  // 4. Jasmijn / Jasmine (Jasminum officinale) - Fragrant star-shaped white jasmine blossoms
  if (id.includes("jasmijn") || name.includes("jasmijn") || id.includes("jasmine") || name.includes("jasmine") || bot.includes("jasminum")) {
    return "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&q=80&w=800";
  }

  // 5. Lavendel / Lavender (Lavandula angustifolia) - Vibrant purple lavender blossoms in field
  if (id.includes("lavendel") || id.includes("lavender") || name.includes("lavendel") || name.includes("lavender") || bot.includes("lavandula")) {
    return "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80&w=800";
  }

  // 6. Roos / Rose (Rosa damascena) - Luxurious pink damask rose petals
  if (id.includes("roos") || id.includes("rose") || name.includes("roos") || name.includes("rose") || bot.includes("rosa")) {
    return "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800";
  }

  // 7. Ylang Ylang (Cananga odorata) - Tropical exotic floral essence
  if (id.includes("ylang") || name.includes("ylang") || bot.includes("cananga")) {
    return "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800";
  }

  // 8. Bergamot (Citrus bergamia) - Green bergamot citrus fruit & peel
  if (id.includes("bergamot") || name.includes("bergamot") || bot.includes("bergamia")) {
    return "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=800";
  }

  // 9. Citroen-Eucalyptus / Lemon Eucalyptus
  if (id.includes("citroeneuc") || id.includes("lemoneucalyptus") || name.includes("citroen-euc") || bot.includes("citriodora")) {
    return "https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&q=80&w=800";
  }

  // 10. Sinaasappel / Sweet Orange / Tangerine (Citrus sinensis) - Fresh citrus slices
  if (id.includes("sinaasappel") || id.includes("orange") || id.includes("tangerine") || name.includes("sinaasappel") || name.includes("orange") || name.includes("tangerine") || bot.includes("sinensis") || bot.includes("reticulata")) {
    return "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800";
  }

  // 11. Citroen / Lemon (Citrus limon) - Bright fresh yellow lemons
  if (id.includes("lemon") || id.includes("citroen") || name.includes("lemon") || name.includes("citroen") || bot.includes("limon")) {
    return "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&q=80&w=800";
  }

  // 12. Grapefruit (Citrus paradisi) - Fresh ruby pink grapefruit
  if (id.includes("grapefruit") || name.includes("grapefruit") || bot.includes("paradisi")) {
    return "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&q=80&w=800";
  }

  // 13. Cederhout / Cedarwood (Cedrus atlantica) - Ancient aromatic cedar forest
  if (id.includes("ceder") || id.includes("cedar") || name.includes("ceder") || name.includes("cedar") || bot.includes("cedrus") || bot.includes("cedrol")) {
    return "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800";
  }

  // 14. Grove Den / Pine (Pinus sylvestris) - Crisp evergreen pine needles & cones
  if (id.includes("den") || id.includes("pine") || name.includes("den") || name.includes("pine") || bot.includes("pinus")) {
    return "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800";
  }

  // 15. Sandelhout / Sandalwood (Santalum album) - Sacred sandalwood essence
  if (id.includes("sandel") || id.includes("sandal") || name.includes("sandel") || name.includes("sandal") || bot.includes("santalum") || bot.includes("sandalore")) {
    return "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800";
  }

  // 16. Anijs / Star Anise (Pimpinella anisum / Illicium verum) - Star anise spice
  if (id.includes("anijs") || id.includes("anise") || name.includes("anijs") || name.includes("anise") || bot.includes("anisum")) {
    return "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=800";
  }

  // 17. Basilicum / Basil (Ocimum basilicum) - Fresh sweet basil leaves
  if (id.includes("basil") || name.includes("basil") || bot.includes("ocimum")) {
    return "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=800";
  }

  // 18. Rozemarijn / Rosemary (Rosmarinus officinalis) - Fresh rosemary sprigs
  if (id.includes("rozemarijn") || id.includes("rosemary") || name.includes("rozemarijn") || name.includes("rosemary") || bot.includes("rosmarinus")) {
    return "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?auto=format&fit=crop&q=80&w=800";
  }

  // 19. Salie / Sage / Clary Sage (Salvia officinalis / Salvia sclarea)
  if (id.includes("salie") || id.includes("sage") || name.includes("salie") || name.includes("sage") || bot.includes("salvia")) {
    return "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=800";
  }

  // 20. Eucalyptus (Eucalyptus globulus) - Fresh eucalyptus foliage
  if (id.includes("eucalyptus") || name.includes("eucalyptus") || bot.includes("eucalyptus")) {
    return "https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&q=80&w=800";
  }

  // 21. Pepermunt / Peppermint / Mint / Spearmint (Mentha piperita) - Fresh mint leaves
  if (id.includes("pepermunt") || id.includes("peppermint") || id.includes("mint") || name.includes("pepermunt") || name.includes("peppermint") || name.includes("munt") || bot.includes("mentha")) {
    return "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&q=80&w=800";
  }

  // 22. Kaneel / Cinnamon (Cinnamomum verum) - Rolled cinnamon sticks
  if (id.includes("kaneel") || id.includes("cinnamon") || name.includes("kaneel") || name.includes("cinnamon") || bot.includes("cinnamomum")) {
    return "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800";
  }

  // 23. Kruidnagel / Clove (Syzygium aromaticum) - Aromatic cloves
  if (id.includes("kruidnagel") || id.includes("clove") || name.includes("kruidnagel") || name.includes("clove") || bot.includes("syzygium")) {
    return "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=800";
  }

  // 24. Zwarte Peper / Black Pepper (Piper nigrum) - Whole black peppercorns
  if (id.includes("peper") || id.includes("pepper") || name.includes("peper") || name.includes("pepper") || bot.includes("piper")) {
    return "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800";
  }

  // 25. Vanille / Vanilla (Vanilla planifolia) - Warm vanilla pods
  if (id.includes("vanille") || id.includes("vanilla") || name.includes("vanille") || name.includes("vanilla") || bot.includes("vanilla")) {
    return "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800";
  }

  // 26. Tea Tree (Melaleuca alternifolia)
  if (id.includes("teatree") || id.includes("tea tree") || name.includes("tea tree") || name.includes("teatree") || bot.includes("melaleuca")) {
    return "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800";
  }

  // 27. Kamille / Chamomile (Matricaria chamomilla)
  if (id.includes("chamomile") || id.includes("kamille") || name.includes("chamomile") || name.includes("kamille") || bot.includes("matricaria")) {
    return "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=800";
  }

  // 28. Lemongrass / Citronella (Cymbopogon)
  if (id.includes("lemongrass") || id.includes("citronella") || name.includes("lemongrass") || name.includes("citronella") || bot.includes("cymbopogon")) {
    return "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?auto=format&fit=crop&q=80&w=800";
  }

  // 29. Geranium (Pelargonium graveolens)
  if (id.includes("geranium") || name.includes("geranium") || bot.includes("pelargonium")) {
    return "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800";
  }

  // 30. Leder / Leather
  if (id.includes("leder") || id.includes("leather") || name.includes("leder") || name.includes("leather")) {
    return "https://images.unsplash.com/photo-1550985543-f47f38aeee65?auto=format&fit=crop&q=80&w=800";
  }

  // 31. Molecular synthetics (Iso E Super, Ambroxide, Cashmeran)
  if (id.startsWith("syn-") || oil.category === "Moleculair" || oil.category === "Amber" || oil.type === "Synthetisch") {
    return "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800";
  }

  // 32. Category fallbacks
  if (oil.category === "Bloemen") {
    return "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800";
  }
  if (oil.category === "Citrus") {
    return "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800";
  }
  if (oil.category === "Houtachtig") {
    return "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800";
  }
  if (oil.category === "Kruiden") {
    return "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?auto=format&fit=crop&q=80&w=800";
  }
  if (oil.category === "Specerijen") {
    return "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800";
  }
  if (oil.category === "Muntachtig") {
    return "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&q=80&w=800";
  }
  if (oil.category === "Hars" || oil.category === "Aards" || oil.category === "Balsem") {
    return "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800";
  }
  
  // Generic high-quality botanical essence fallback
  return "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800";
}

