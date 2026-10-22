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
  
  // 1. Myrrh (Commiphora myrrha) - Cartoon illustration
  if (id.includes("myrrhe") || id.includes("myrrh") || name.includes("myrrhe") || name.includes("myrrh") || bot.includes("myrrha")) {
    return "/images/myrrhe.jpg";
  }
  
  // 2. Patchouli (Pogostemon cablin) - Cartoon illustration
  if (id.includes("patchouli") || name.includes("patchouli") || bot.includes("patchouli") || bot.includes("cablin")) {
    return "/images/patchouli.jpg";
  }
  
  // 3. Wierook / Frankincense (Boswellia carterii) - Cartoon illustration
  if (id.includes("wierook") || name.includes("wierook") || id.includes("frankincense") || name.includes("frankincense") || bot.includes("boswellia")) {
    return "/images/wierook.jpg";
  }
  
  // 4. Jasmijn / Jasmine (Jasminum officinale) - Cartoon illustration
  if (id.includes("jasmijn") || name.includes("jasmijn") || id.includes("jasmine") || name.includes("jasmine") || bot.includes("jasminum")) {
    return "/images/jasmijn.jpg";
  }

  // 5. Lavendel / Lavender (Lavandula angustifolia) - Cartoon illustration
  if (id.includes("lavendel") || id.includes("lavender") || name.includes("lavendel") || name.includes("lavender") || bot.includes("lavandula")) {
    return "/images/lavendel.jpg";
  }

  // 6. Roos / Rose (Rosa damascena) - Cartoon illustration
  if (id.includes("roos") || id.includes("rose") || name.includes("roos") || name.includes("rose") || bot.includes("rosa")) {
    return "/images/roos.jpg";
  }

  // 7. Ylang Ylang (Cananga odorata) - Cartoon illustration
  if (id.includes("ylang") || name.includes("ylang") || bot.includes("cananga")) {
    return "/images/ylangylang.jpg";
  }

  // 8. Bergamot (Citrus bergamia) - Cartoon illustration
  if (id.includes("bergamot") || name.includes("bergamot") || bot.includes("bergamia")) {
    return "/images/bergamot.jpg";
  }

  // 9. Citroen-Eucalyptus / Lemon Eucalyptus - Cartoon illustration
  if (id.includes("citroeneuc") || id.includes("lemoneucalyptus") || name.includes("citroen-euc") || bot.includes("citriodora")) {
    return "/images/citroen-eucalyptus.jpg";
  }

  // 10. Sinaasappel / Sweet Orange / Tangerine (Citrus sinensis) - Cartoon illustration
  if (id.includes("sinaasappel") || id.includes("orange") || id.includes("tangerine") || name.includes("sinaasappel") || name.includes("orange") || name.includes("tangerine") || bot.includes("sinensis") || bot.includes("reticulata")) {
    return "/images/sinaasappel.jpg";
  }

  // 11. Citroen / Lemon (Citrus limon) - Cartoon illustration
  if (id.includes("lemon") || id.includes("citroen") || name.includes("lemon") || name.includes("citroen") || bot.includes("limon")) {
    return "/images/citroen.jpg";
  }

  // 12. Grapefruit (Citrus paradisi) - Cartoon illustration
  if (id.includes("grapefruit") || name.includes("grapefruit") || bot.includes("paradisi")) {
    return "/images/grapefruit.jpg";
  }

  // 13. Cederhout / Cedarwood (Cedrus atlantica) - Cartoon illustration
  if (id.includes("ceder") || id.includes("cedar") || name.includes("ceder") || name.includes("cedar") || bot.includes("cedrus") || bot.includes("cedrol")) {
    return "/images/cederhout.jpg";
  }

  // 14. Grove Den / Pine (Pinus sylvestris) - Cartoon illustration
  if (id.includes("den") || id.includes("pine") || name.includes("den") || name.includes("pine") || bot.includes("pinus")) {
    return "/images/groveden.jpg";
  }

  // 15. Sandelhout / Sandalwood (Santalum album) - Cartoon illustration
  if (id.includes("sandel") || id.includes("sandal") || name.includes("sandel") || name.includes("sandal") || bot.includes("santalum") || bot.includes("sandalore")) {
    return "/images/sandelhout.jpg";
  }

  // 15b. Cipres / Cypress - Cartoon illustration
  if (id.includes("cipres") || id.includes("cypress") || name.includes("cipres") || name.includes("cypress") || bot.includes("cupressus")) {
    return "/images/cipres.jpg";
  }

  // 15c. Vetiver - Cartoon illustration
  if (id.includes("vetiver") || name.includes("vetiver") || bot.includes("zizanioides")) {
    return "/images/vetiver.jpg";
  }

  // 15d. Copaiba - Cartoon illustration
  if (id.includes("copaiba") || name.includes("copaiba") || bot.includes("copaifera")) {
    return "/images/copaiba.jpg";
  }

  // 16. Anijs / Star Anise (Pimpinella anisum / Illicium verum) - Cartoon illustration
  if (id.includes("anijs") || id.includes("anise") || name.includes("anijs") || name.includes("anise") || bot.includes("anisum")) {
    return "/images/anijs.jpg";
  }

  // 17. Basilicum / Basil (Ocimum basilicum) - Cartoon illustration
  if (id.includes("basil") || name.includes("basil") || bot.includes("ocimum")) {
    return "/images/basilicum.jpg";
  }

  // 17b. Oregano - Cartoon illustration
  if (id.includes("oregano") || name.includes("oregano") || bot.includes("origanum")) {
    return "/images/oregano.jpg";
  }

  // 18. Rozemarijn / Rosemary (Rosmarinus officinalis) - Cartoon illustration
  if (id.includes("rozemarijn") || id.includes("rosemary") || name.includes("rozemarijn") || name.includes("rosemary") || bot.includes("rosmarinus")) {
    return "/images/rozemarijn.jpg";
  }

  // 19. Salie / Sage / Clary Sage (Salvia officinalis / Salvia sclarea) - Cartoon illustration
  if (id.includes("salie") || id.includes("sage") || name.includes("salie") || name.includes("sage") || bot.includes("salvia")) {
    return "/images/salie.jpg";
  }

  // 20. Eucalyptus (Eucalyptus globulus) - Cartoon illustration
  if (id.includes("eucalyptus") || name.includes("eucalyptus") || bot.includes("eucalyptus")) {
    return "/images/eucalyptus.jpg";
  }

  // 21. Pepermunt / Peppermint / Mint / Spearmint (Mentha piperita) - Cartoon illustration
  if (id.includes("pepermunt") || id.includes("peppermint") || id.includes("mint") || name.includes("pepermunt") || name.includes("peppermint") || name.includes("munt") || bot.includes("mentha")) {
    return "/images/pepermunt.jpg";
  }

  // 22. Kaneel / Cinnamon (Cinnamomum verum) - Cartoon illustration
  if (id.includes("kaneel") || id.includes("cinnamon") || name.includes("kaneel") || name.includes("cinnamon") || bot.includes("cinnamomum")) {
    return "/images/kaneel.jpg";
  }

  // 23. Kruidnagel / Clove (Syzygium aromaticum) - Cartoon illustration
  if (id.includes("kruidnagel") || id.includes("clove") || name.includes("kruidnagel") || name.includes("clove") || bot.includes("syzygium")) {
    return "/images/kruidnagel.jpg";
  }

  // 24. Zwarte Peper / Black Pepper (Piper nigrum) - Whole black peppercorns
  if (id.includes("peper") || id.includes("pepper") || name.includes("peper") || name.includes("pepper") || bot.includes("piper")) {
    return "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800";
  }

  // 25. Vanille / Vanilla (Vanilla planifolia) - Cartoon illustration
  if (id.includes("vanille") || id.includes("vanilla") || name.includes("vanille") || name.includes("vanilla") || bot.includes("vanilla")) {
    return "/images/vanille.jpg";
  }

  // 26. Tea Tree (Melaleuca alternifolia) - Cartoon illustration
  if (id.includes("teatree") || id.includes("tea tree") || name.includes("tea tree") || name.includes("teatree") || bot.includes("melaleuca")) {
    return "/images/teatree.jpg";
  }

  // 27. Kamille / Chamomile (Matricaria chamomilla) - Cartoon illustration
  if (id.includes("chamomile") || id.includes("kamille") || name.includes("chamomile") || name.includes("kamille") || bot.includes("matricaria")) {
    return "/images/kamille.jpg";
  }

  // 28a. Lemongrass - Cartoon illustration
  if (id.includes("lemongrass") || name.includes("lemongrass")) {
    return "/images/lemongrass.jpg";
  }

  // 28b. Citronella (Cymbopogon) - Cartoon illustration
  if (id.includes("citronella") || name.includes("citronella") || bot.includes("cymbopogon")) {
    return "/images/citronella.jpg";
  }

  // 28c. Kamfer (Cinnamomum camphora) - Cartoon illustration
  if (id.includes("kamfer") || id.includes("camphor") || name.includes("kamfer") || name.includes("camphor") || bot.includes("camphora")) {
    return "/images/kamfer.jpg";
  }

  // 28d. Neroli (Citrus aurantium flos) - Cartoon illustration
  if (id.includes("neroli") || name.includes("neroli")) {
    return "/images/neroli.jpg";
  }

  // 28e. Helichrysum (Helichrysum italicum) - Cartoon illustration
  if (id.includes("helichrysum") || name.includes("helichrysum") || name.includes("strobloem")) {
    return "/images/helichrysum.jpg";
  }

  // 29. Geranium (Pelargonium graveolens) - Cartoon illustration
  if (id.includes("geranium") || name.includes("geranium") || bot.includes("pelargonium")) {
    return "/images/geranium.jpg";
  }

  // 30. Leder / Leather - Cartoon illustration
  if (id.includes("leder") || id.includes("leather") || name.includes("leder") || name.includes("leather")) {
    return "/images/leder.jpg";
  }

  // 30b. Wilde Muskus - Cartoon illustration
  if (id.includes("wildemuskus") || name.includes("wilde muskus") || bot.includes("abelmoschus") || name.includes("muskus")) {
    return "/images/wildemuskus.jpg";
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

/* ==========================================================================
   ROOMSPRAY & GEURCOMBINATIES STUDIO MODELLEN & LOGICA
   ========================================================================== */

export interface RoomSprayIngredient {
  oilId: string;
  name: string;
  ratio: number; // Relatieve verhouding (bv. 3, 2, 1)
  noteType?: "Top" | "Midden" | "Basis";
}

export interface RoomSprayRecipe {
  id: string;
  name: string;
  subtitle: string;
  category: "Rust & Slaap" | "Focus & Werk" | "Fris & Zuiverend" | "Gezellig & Warm" | "Luxe & Hotel" | "Bloemig & Sensueel" | "Spa & Wellness";
  targetRoom: string; // bv. Slaapkamer & Kussen, Woonkamer & Hal, etc.
  description: string;
  mood: string;
  ingredients: RoomSprayIngredient[];
  usageTip: string;
  icon?: string;
  bottleSizeMl?: number;
}

export interface OilPairing {
  oilId: string;
  name: string;
  noteType: "Top" | "Midden" | "Basis";
  category: string;
  reason: string;
  harmonyType: string; // bv. "Citrus-Hout Harmonie", "Aardend & Bloemig"
}

export interface RoomSprayCalculation {
  bottleSizeMl: number;
  alcoholMl: number;
  alcoholPercent: number;
  distilledWaterMl: number;
  distilledWaterPercent: number;
  totalOilDrops: number;
  totalOilMl: number;
  totalOilPercent: number;
  ingredients: {
    oilId: string;
    name: string;
    drops: number;
    ratio: number;
    noteType?: "Top" | "Midden" | "Basis";
  }[];
}

/**
 * Populaire en beproefde roomspray geurcombinaties.
 * Elke formule is gebalanceerd in top-, midden- en basisnoten voor optimale diffusie en geurpersistentie.
 */
export const POPULAR_ROOM_SPRAYS: RoomSprayRecipe[] = [
  {
    id: "luxe-hotel",
    name: "Luxe 5-Sterren Hotel Lobby",
    subtitle: "Verfijnd, warm & uitnodigend boetiekhotel akkoord",
    category: "Luxe & Hotel",
    targetRoom: "Inkomhal & Woonkamer",
    description: "Een elegante signatuurgeur die meteen een gevoel van exclusieve gastvrijheid en serene weelde wekt. Frisse bergamot wordt gedragen door een warme houtbasis met een zweem van zachte vanille.",
    mood: "Gastvrij, chic, verwarmend en luxueus",
    icon: "✨",
    usageTip: "Spray 2 tot 3 maal in de inkomhal en op stoffen gordijnen om bezoekers te verwelkomen met een verfijnde geurbeleving.",
    ingredients: [
      { oilId: "nat-bergamot", name: "Bergamot", ratio: 4, noteType: "Top" },
      { oilId: "nat-cederhout", name: "Cederhout", ratio: 3, noteType: "Basis" },
      { oilId: "nat-vanille", name: "Vanille", ratio: 2, noteType: "Basis" },
      { oilId: "nat-rozemarijn", name: "Rozemarijn", ratio: 1, noteType: "Midden" }
    ]
  },
  {
    id: "slaap-dromen",
    name: "Diepe Nachtrust & Kussenspray",
    subtitle: "Kalmerende lavendel, zachte sinaasappel & aards cederhout",
    category: "Rust & Slaap",
    targetRoom: "Slaapkamer & Bedlinnen",
    description: "De ultieme rustgevende slaapformule. Lavendel verlaagt het stressniveau, zoete sinaasappel stilt piekergedachten en cederhout brengt een veilige, grondende basis.",
    mood: "Diepe kalmte, ontspanning en zachtheid",
    icon: "🌙",
    usageTip: "Spray 15 minuten voor het slapengaan op kussens en lakens vanaf 30 cm afstand voor een rustgevende cocon.",
    ingredients: [
      { oilId: "nat-lavendel", name: "Lavendel (Bio)", ratio: 5, noteType: "Midden" },
      { oilId: "nat-cederhout", name: "Cederhout", ratio: 3, noteType: "Basis" },
      { oilId: "nat-sinaasappel", name: "Sinaasappel", ratio: 2, noteType: "Top" }
    ]
  },
  {
    id: "fris-linnen",
    name: "Fris Gewassen Linnen & Zonneschijn",
    subtitle: "Knapperig schoon, natuurlijk wasgoed-gevoel",
    category: "Fris & Zuiverend",
    targetRoom: "Woonkamer, Slaapkamer & Dressing",
    description: "Laat je interieur ruiken alsof het net grondig is schoongemaakt en het linnengoed buiten in de frisse zeewind heeft gedroogd. Elimineert muffe luchtjes zonder synthetische parfums.",
    mood: "Kraakhelder, verkwikkend en puur",
    icon: "🧺",
    usageTip: "Ideaal om sofa's, spreien en kledingkasten mee te nevelen voor een onmiddellijke opfrisbeurt.",
    ingredients: [
      { oilId: "nat-lemongrass", name: "Lemongrass", ratio: 4, noteType: "Top" },
      { oilId: "nat-lavendel", name: "Lavendel (Bio)", ratio: 4, noteType: "Midden" },
      { oilId: "nat-eucalyptus", name: "Eucalyptus", ratio: 2, noteType: "Top" }
    ]
  },
  {
    id: "citrus-sunrise",
    name: "Zonnige Citrus Sunrise",
    subtitle: "Bruisende sinaasappel, grapefruit & pepermunt",
    category: "Focus & Werk",
    targetRoom: "Keuken, Eetruimte & Hal",
    description: "Een explosie van vrolijke zonnekracht! De frisse zuren van citrusfruit neutraliseren kookgeurtjes en tillen de sfeer in huis direct naar een zomers en energiek niveau.",
    mood: "Opwekkend, vrolijk, optimistisch en helder",
    icon: "☀️",
    usageTip: "Spray 's ochtends in de woonkamer of keuken om fris en vol motivatie aan de dag te beginnen.",
    ingredients: [
      { oilId: "nat-sinaasappel", name: "Sinaasappel", ratio: 4, noteType: "Top" },
      { oilId: "nat-grapefruit", name: "Grapefruit", ratio: 3, noteType: "Top" },
      { oilId: "nat-bergamot", name: "Bergamot", ratio: 2, noteType: "Top" },
      { oilId: "nat-pepermunt", name: "Pepermunt", ratio: 1, noteType: "Top" }
    ]
  },
  {
    id: "bosbad-dennen",
    name: "Zuiverend Bosbad (Shinrin-Yoku)",
    subtitle: "Frisse dennennaalden, ceder & alpenlucht",
    category: "Fris & Zuiverend",
    targetRoom: "Woonkamer & Badkamer",
    description: "Brengt de zuivere, regenererende kracht van een oud naaldbos naar binnen. Opent direct de luchtwegen, zuivert de lucht van microben en geeft het gevoel van een wandeling door ochtenddauw.",
    mood: "Natuurlijk, ademruimte gevend en zuiver",
    icon: "🌲",
    usageTip: "Uitstekend tijdens herfst en winter of wanneer iemand in huis behoefte heeft aan schone, vrije luchtwegen.",
    ingredients: [
      { oilId: "nat-groveden", name: "Grove Den", ratio: 4, noteType: "Midden" },
      { oilId: "nat-cederhout", name: "Cederhout", ratio: 3, noteType: "Basis" },
      { oilId: "nat-eucalyptus", name: "Eucalyptus", ratio: 2, noteType: "Top" },
      { oilId: "nat-citroeneuc", name: "Citroen-Euc.", ratio: 1, noteType: "Top" }
    ]
  },
  {
    id: "zen-jasmijn",
    name: "Zen Tempeltuin & Witte Bloesem",
    subtitle: "Betoverende jasmijn, bergamot & sandelhout",
    category: "Bloemig & Sensueel",
    targetRoom: "Woonkamer & Leeshoek",
    description: "Een verheven Oosterse bloementuin in volle bloei. De kostbare jasmijnbloesem vloeit harmonieus samen met crèmig sandelhout tot een zachte, tijdloos elegante ambiance.",
    mood: "Sereniteitsvol, liefdevol, ontspannen en zacht",
    icon: "🌸",
    usageTip: "Heerlijk om te verstuiven bij theemomenten, tijdens het lezen van een goed boek of bij rustige gesprekken.",
    ingredients: [
      { oilId: "nat-bergamot", name: "Bergamot", ratio: 4, noteType: "Top" },
      { oilId: "nat-jasmijn", name: "Jasmijn", ratio: 3, noteType: "Midden" },
      { oilId: "nat-sandelhout", name: "Sandelhout", ratio: 3, noteType: "Basis" }
    ]
  },
  {
    id: "knusse-haard",
    name: "Knusse Haard & Warme Specerijen",
    subtitle: "Rijke sinaasappel, kaneel, vanille & kruidnagel",
    category: "Gezellig & Warm",
    targetRoom: "Woonkamer & Eetkamer",
    description: "Het ultieme gevoel van thuiskomen. Warme specerijen roepen herinneringen op aan kruidige thee, open haarden en gezellige familieavonden tijdens koude dagen.",
    mood: "Geborgenheid, knus, warm en troostend",
    icon: "🍂",
    usageTip: "Spray 2 keer in het midden van de woonkamer zodra de avond valt voor directe gezelligheid.",
    ingredients: [
      { oilId: "nat-sinaasappel", name: "Sinaasappel", ratio: 5, noteType: "Top" },
      { oilId: "nat-kaneel", name: "Kaneel", ratio: 2, noteType: "Midden" },
      { oilId: "nat-vanille", name: "Vanille", ratio: 2, noteType: "Basis" },
      { oilId: "nat-kruidnagel", name: "Kruidnagel", ratio: 1, noteType: "Basis" }
    ]
  },
  {
    id: "focus-mind",
    name: "Mentale Focus & Scherpzinnigheid",
    subtitle: "Scherpe pepermunt, rozemarijn & kruidige basilicum",
    category: "Focus & Werk",
    targetRoom: "Studeerkamer & Thuiswerkplek",
    description: "Wetenschappelijk bewezen geurtonen om de cerebrale doorbloeding te stimuleren en vermoeidheid naar de achtergrond te verdrijven. Maakt het hoofd helder en verbetert geheugenfocus.",
    mood: "Scherp, alert, geconcentreerd en fris",
    icon: "💡",
    usageTip: "Spray omstreeks 14:00 uur over je werkplek om een middagdipje te voorkomen en geconcentreerd door te werken.",
    ingredients: [
      { oilId: "nat-pepermunt", name: "Pepermunt", ratio: 4, noteType: "Top" },
      { oilId: "nat-rozemarijn", name: "Rozemarijn", ratio: 4, noteType: "Midden" },
      { oilId: "nat-basilicum", name: "Basilicum", ratio: 2, noteType: "Midden" }
    ]
  },
  {
    id: "tempel-wierook",
    name: "Sacrale Meditatie & Wierook",
    subtitle: "Eeuwenoude wierook, myrrhe & cederhout",
    category: "Spa & Wellness",
    targetRoom: "Meditatie- & Yogaruimte",
    description: "Een mystieke compositie die al duizenden jaren wordt gewaardeerd in tempels. Brengt de ademhaling omlaag, ontspant de geest en schept een sacrale sfeer voor innerlijke verstilling.",
    mood: "Grondend, gewijd, diepzinnig en rustig",
    icon: "🕯️",
    usageTip: "Nevel lichtjes rond je yogamat of meditatiekussen vóór de sessie begint om een serene focusruimte te creëren.",
    ingredients: [
      { oilId: "nat-wierook", name: "Wierook", ratio: 4, noteType: "Basis" },
      { oilId: "nat-myrrhe", name: "Myrrhe", ratio: 3, noteType: "Basis" },
      { oilId: "nat-sinaasappel", name: "Sinaasappel", ratio: 2, noteType: "Top" },
      { oilId: "nat-cederhout", name: "Cederhout", ratio: 1, noteType: "Basis" }
    ]
  },
  {
    id: "spa-eucalyptus",
    name: "Scandinavische Spa & Eucalyptus Sauna",
    subtitle: "Intense eucalyptus, pepermunt & tea tree",
    category: "Spa & Wellness",
    targetRoom: "Badkamer & Wellness",
    description: "Transformeer je badkamer in een luxe Finse wellness sauna. De dampende kruidenaroma's verhelderen de zintuigen en zorgen voor een weldadig zuiverende nevel.",
    mood: "Revitaliserend, zuiverend en verfrissend",
    icon: "🧖",
    usageTip: "Spray 2 keer tegen de warme wand van de douchecabine net voordat je instapt voor een verkwikkende stoomsessie.",
    ingredients: [
      { oilId: "nat-eucalyptus", name: "Eucalyptus", ratio: 5, noteType: "Top" },
      { oilId: "nat-pepermunt", name: "Pepermunt", ratio: 2, noteType: "Top" },
      { oilId: "nat-teatree", name: "Tea Tree", ratio: 2, noteType: "Midden" },
      { oilId: "nat-lavendel", name: "Lavendel (Bio)", ratio: 1, noteType: "Midden" }
    ]
  },
  {
    id: "velvet-rose",
    name: "Fluwelen Rozentuin (Velvet Rose)",
    subtitle: "Rijke roos, exotische ylang ylang & sensuele patchouli",
    category: "Bloemig & Sensueel",
    targetRoom: "Slaapkamer & Dressing",
    description: "Een weelderig parfumakkoord van romantische bloesems en warme aardse tonen. Verzacht spanningen in het hart en creëert een intieme, verleidelijke ambiance.",
    mood: "Romantisch, zachtmoedig, zwoel en harmonieus",
    icon: "🌹",
    usageTip: "Nevel zachtjes over kussens of gordijnen voor een verleidelijke en luxe slaapkamersfeer.",
    ingredients: [
      { oilId: "nat-bergamot", name: "Bergamot", ratio: 3, noteType: "Top" },
      { oilId: "nat-roos", name: "Roos", ratio: 3, noteType: "Midden" },
      { oilId: "nat-ylangylang", name: "Ylang Ylang", ratio: 2, noteType: "Midden" },
      { oilId: "nat-patchouli", name: "Patchouli", ratio: 2, noteType: "Basis" }
    ]
  },
  {
    id: "stress-relief",
    name: "Anti-Stress & Harmonieuze Adem",
    subtitle: "Zachte lavendel, zoete sinaasappel, salie & cederhout",
    category: "Rust & Slaap",
    targetRoom: "Woonkamer & Slaapkamer",
    description: "Speciaal samengesteld om het overprikkelde zenuwstelsel gerust te stellen. Helpt fysieke spierspanning los te laten en brengt harmonie in een hectische dag.",
    mood: "Troostend, kalmerend en harmoniserend",
    icon: "🕊️",
    usageTip: "Spray over de zithoek na een drukke werkdag om samen rustig tot bezinning te komen.",
    ingredients: [
      { oilId: "nat-lavendel", name: "Lavendel (Bio)", ratio: 4, noteType: "Midden" },
      { oilId: "nat-sinaasappel", name: "Sinaasappel", ratio: 3, noteType: "Top" },
      { oilId: "nat-salie", name: "Salie", ratio: 2, noteType: "Midden" },
      { oilId: "nat-cederhout", name: "Cederhout", ratio: 1, noteType: "Basis" }
    ]
  },
  {
    id: "aards-mysterie",
    name: "Bohemian Amber & Hout",
    subtitle: "Diepe patchouli, romig sandelhout & zoete sinaasappel",
    category: "Gezellig & Warm",
    targetRoom: "Woonkamer, Bibliotheek & Salon",
    description: "Een rijk, tijdloos geurboeket dat doet denken aan warme bibliotheken, antieke meubels en Oosterse bazaars. Geeft karakter en zwoele diepte aan elke ruimte.",
    mood: "Warm, aards, mystiek en karaktervol",
    icon: "🪵",
    usageTip: "Perfect voor houten interieurs, leeshoeken en 's avonds bij warm kaarslicht.",
    ingredients: [
      { oilId: "nat-sinaasappel", name: "Sinaasappel", ratio: 3, noteType: "Top" },
      { oilId: "nat-patchouli", name: "Patchouli", ratio: 3, noteType: "Basis" },
      { oilId: "nat-sandelhout", name: "Sandelhout", ratio: 3, noteType: "Basis" },
      { oilId: "nat-zwartepeper", name: "Zwarte Peper", ratio: 1, noteType: "Basis" }
    ]
  },
  {
    id: "zomer-mojito",
    name: "Zomerse Mojito & Verfrissing",
    subtitle: "Bruisende munt, citroen & lemongrass",
    category: "Fris & Zuiverend",
    targetRoom: "Keuken, Terras & Gang",
    description: "Alsof je op een zonovergoten terras zit met een vers glas ijswater en munt. Verjaagt warmte, zware lucht en vervelende insecten met een verkoelende frisheid.",
    mood: "IJskoud verfrissend, levendig en helder",
    icon: "🍃",
    usageTip: "Ideaal tijdens hete zomerdagen of bij open deuren om insecten op afstand te houden.",
    ingredients: [
      { oilId: "nat-pepermunt", name: "Pepermunt", ratio: 4, noteType: "Top" },
      { oilId: "nat-lemongrass", name: "Lemongrass", ratio: 3, noteType: "Top" },
      { oilId: "nat-bergamot", name: "Bergamot", ratio: 3, noteType: "Top" }
    ]
  }
];

/**
 * Berekent de exacte verhoudingen voor een roomspray op basis van het flesformaat:
 * - Alcohol (70% - 96% of parfumeursalcohol): 25% van het volume (lost oliën op, conserveert, verdampt snel zonder vlekken)
 * - Etherische oliën: 1.5% (subtiel), 2.5% (gebalanceerd) of 3.5% (intens)
 * - Gedestilleerd water: het restant tot de hals van het flesje (~72.5%)
 */
export function calculateRoomSpray(
  bottleSizeMl: number,
  intensity: "subtiel" | "gebalanceerd" | "krachtig" = "gebalanceerd",
  selectedOils: { id: string; name: string; ratio: number; noteType?: "Top" | "Midden" | "Basis" }[]
): RoomSprayCalculation {
  const safeSize = Math.max(10, bottleSizeMl);

  // Concentraties: subtiel = ~1.5% (~3 druppels per 10ml), gebalanceerd = ~2.5% (~5 dr/10ml), krachtig = ~3.5% (~7 dr/10ml)
  const dropsMultiplier = intensity === "subtiel" ? 0.3 : intensity === "krachtig" ? 0.7 : 0.5;
  const targetTotalDrops = Math.max(selectedOils.length, Math.round(safeSize * dropsMultiplier));

  // Alcohol: exact 25% van het flesvolume
  const alcoholMl = Number((safeSize * 0.25).toFixed(1));
  const alcoholPercent = 25;

  // 1 ml etherische olie ≈ 20 druppels (1 druppel ≈ 0.05 ml)
  const totalOilMl = Number((targetTotalDrops * 0.05).toFixed(2));
  const totalOilPercent = Number(((totalOilMl / safeSize) * 100).toFixed(1));

  // Gedestilleerd water vult het restant aan
  const distilledWaterMl = Number(Math.max(0, safeSize - alcoholMl - totalOilMl).toFixed(1));
  const distilledWaterPercent = Number(((distilledWaterMl / safeSize) * 100).toFixed(1));

  // Verdeel druppels per olie over de relatieve ratio's
  const totalRatios = selectedOils.reduce((sum, o) => sum + (o.ratio || 1), 0) || 1;
  let remainingDrops = targetTotalDrops;

  const ingredientsWithDrops = selectedOils.map((oil, idx) => {
    if (idx === selectedOils.length - 1) {
      // Laatste olie krijgt restant zodat totaal exact klopt
      const drops = Math.max(1, remainingDrops);
      return {
        oilId: oil.id,
        name: oil.name,
        drops,
        ratio: oil.ratio || 1,
        noteType: oil.noteType
      };
    }
    const computedDrops = Math.max(1, Math.round(((oil.ratio || 1) / totalRatios) * targetTotalDrops));
    remainingDrops -= computedDrops;
    return {
      oilId: oil.id,
      name: oil.name,
      drops: computedDrops,
      ratio: oil.ratio || 1,
      noteType: oil.noteType
    };
  });

  return {
    bottleSizeMl: safeSize,
    alcoholMl,
    alcoholPercent,
    distilledWaterMl,
    distilledWaterPercent,
    totalOilDrops: targetTotalDrops,
    totalOilMl,
    totalOilPercent,
    ingredients: ingredientsWithDrops
  };
}

/**
 * Curated pairings mapping voor bekende etherische oliën.
 * Voor elke olie: ideale harmonische partners met geurverklaring.
 */
const CURATED_OIL_PAIRINGS: Record<string, { partnerNames: string[]; reasons: Record<string, string>; harmonyType: string }> = {
  "lavendel": {
    partnerNames: ["Bergamot", "Sinaasappel", "Cederhout", "Ylang Ylang", "Rozemarijn", "Vanille", "Grove Den"],
    reasons: {
      "Bergamot": "Creëert een verfijnde, zonnige rustgevendheid zonder loomheid.",
      "Sinaasappel": "Maakt de lavendel zoeter, warmer en vriendelijker voor kinderen.",
      "Cederhout": "Grondt de bloemige lavendel met warme houtdiepte voor diepe slaap.",
      "Rozemarijn": "Klassieke Provençaalse kruidenharmonie; zuivert het hoofd.",
      "Vanille": "Geeft een knusse, zachte balsemachtige noot aan de lavendel.",
      "Grove Den": "Brengt een alpine berggevoel; zuivert en ontspant de adem."
    },
    harmonyType: "Bloemig-Kruidige Rust & Gronding"
  },
  "sinaasappel": {
    partnerNames: ["Kaneel", "Cederhout", "Kruidnagel", "Vanille", "Lavendel", "Patchouli", "Wierook"],
    reasons: {
      "Kaneel": "Het ultieme warme herfst- en winterakkoord, gezellig en knus.",
      "Cederhout": "Combineert frisse zoetheid met mannelijke houtachtige elegantie.",
      "Kruidnagel": "Geeft een pittig, feestelijk en verwarmend karakter aan de citrus.",
      "Vanille": "Romige sinaasappeltoets, doet denken aan luxe bakkersaroma's.",
      "Patchouli": "Rijk bohemian contrast tussen vrolijke citrus en donkere aarde.",
      "Wierook": "Heilige warmte; Sinaasappel brengt licht in de diepe harsgeur."
    },
    harmonyType: "Zonnige Citrus-Warmte & Hout"
  },
  "bergamot": {
    partnerNames: ["Lavendel", "Jasmijn", "Cederhout", "Sandelhout", "Patchouli", "Rozemarijn", "Neroli"],
    reasons: {
      "Lavendel": "Luxe hotelkwaliteit; kalmeert stress en brengt elegantie.",
      "Jasmijn": "Heerlijk bloemig en verheven; de basis van vele nicheparfums.",
      "Cederhout": "Verfijnd houtakkoord met aristocratische Earl Grey toets.",
      "Sandelhout": "Zacht, romig en warm met een sprankelende citrusopening.",
      "Patchouli": "Chypre-akkoord: tijdloze klassieke parfumverhouding."
    },
    harmonyType: "Verheven Citrus-Chypre Harmonie"
  },
  "cederhout": {
    partnerNames: ["Lavendel", "Sinaasappel", "Bergamot", "Wierook", "Grove Den", "Rozemarijn", "Patchouli"],
    reasons: {
      "Lavendel": "Verlaagt spierspanning en brengt een solide aardende basis.",
      "Sinaasappel": "Verfrist het droge hout met vrolijke zonnekracht.",
      "Wierook": "Mediteerakkoord; verdiept de ademhaling en centreert de geest.",
      "Grove Den": "Echt naaldwoud-effect; robuust, mannelijk en fris groen.",
      "Rozemarijn": "Heldere bossfeer; stimuleert creativiteit en alertheid."
    },
    harmonyType: "Houtachtig Fixatief & Gronding"
  },
  "pepermunt": {
    partnerNames: ["Rozemarijn", "Eucalyptus", "Citroen", "Lavendel", "Lemongrass", "Grapefruit"],
    reasons: {
      "Rozemarijn": "Bewezen concentratiebooster; maakt het hoofd vlijmscherp.",
      "Eucalyptus": "Maximale ademruimte; verlost van verstopte luchtwegen.",
      "Citroen": "Verkwikkende frisheid; verdrijft zware of bedompte geuren.",
      "Lavendel": "Contrast tussen ijskoud menthol en warme bloemigheid; verzacht hoofdpijn.",
      "Lemongrass": "Exotische frisheid; verjaagt muggen en brengt energie."
    },
    harmonyType: "IJskoud Verfrissend & Mentaal Focus"
  },
  "rozemarijn": {
    partnerNames: ["Pepermunt", "Lavendel", "Cederhout", "Citroen", "Basilicum", "Grove Den"],
    reasons: {
      "Pepermunt": "Verhoogt alertheid en focus tijdens studeren en werken.",
      "Lavendel": "Kruidige wellnessbalans; brengt helderheid zonder stress.",
      "Cederhout": "Aards en krachtig; geeft een kruidige bosgeur aan je kantoor.",
      "Citroen": "Verfrissende opruimer voor keuken en werkruimtes.",
      "Basilicum": "Kruidige harmonie; ondersteunt het denkvermogen."
    },
    harmonyType: "Stimulerend Kruidig & Hersenactivatie"
  },
  "eucalyptus": {
    partnerNames: ["Pepermunt", "Grove Den", "Tea Tree", "Lavendel", "Citroen-Euc.", "Cederhout"],
    reasons: {
      "Pepermunt": "De klassieke saunageur; opent de neus en verkoelt de lucht.",
      "Grove Den": "Zuiverende boslucht; ideaal voor de herfst en winter.",
      "Tea Tree": "Sterkste antibacteriële en antivirale luchtzuivering.",
      "Lavendel": "Verzacht de scherpe menthol en maakt de spray kindvriendelijker."
    },
    harmonyType: "Luchtwegen & Luchtzuivering"
  },
  "wierook": {
    partnerNames: ["Myrrhe", "Sinaasappel", "Cederhout", "Sandelhout", "Lavendel", "Roos"],
    reasons: {
      "Myrrhe": "De oudste spirituele combinatie ter wereld; heilig en diep grondend.",
      "Sinaasappel": "Brengt licht en warmte in de sacrale balsem.",
      "Cederhout": "Versterkt het meditatieve karakter met stevig hout.",
      "Sandelhout": "Zachte, fluweelachtige wierookmist voor innerlijke stilte.",
      "Roos": "Hartverwarmend, troostend en spiritueel verheffend."
    },
    harmonyType: "Sacraal Hars & Meditatieve Gronding"
  },
  "myrrhe": {
    partnerNames: ["Wierook", "Patchouli", "Sinaasappel", "Sandelhout", "Lavendel"],
    reasons: {
      "Wierook": "Onovertroffen diepgang en spirituele rust.",
      "Patchouli": "Rijke, donkere aardenoot die urenlang in de kamer blijft hangen.",
      "Sinaasappel": "Verzacht de bittere rokerigheid van de hars met zachte citrus.",
      "Sandelhout": "Balsemachtige luxe; rustgevend voor de zintuigen."
    },
    harmonyType: "Diepe Balsem & Aardse Verdieping"
  },
  "jasmijn": {
    partnerNames: ["Bergamot", "Sandelhout", "Sinaasappel", "Roos", "Ylang Ylang", "Vanille"],
    reasons: {
      "Bergamot": "Verrijkt de zoete bloesem met sprankelende citrusfrisheid.",
      "Sandelhout": "Draagt de bedwelmende bloem met zachte, romige houtdiepte.",
      "Sinaasappel": "Maakt de bloemengeur speelser, zonniger en toegankelijker.",
      "Vanille": "Sensuele, warme zoetheid voor een verleidelijk parfum."
    },
    harmonyType: "Weelderig Bloemig & Sensueel"
  },
  "roos": {
    partnerNames: ["Patchouli", "Bergamot", "Sandelhout", "Lavendel", "Jasmijn", "Wierook"],
    reasons: {
      "Patchouli": "Klassiek nicheparfum-akkoord (chypre); donker aards ontmoet fluwelen roos.",
      "Bergamot": "Verfrist het zware honingachtige karakter van rozenblaadjes.",
      "Sandelhout": "Romig en warm; versterkt het hartopenende gevoel van de roos.",
      "Wierook": "Mystieke, koninklijke combinatie; troostend bij emotioneel verdriet."
    },
    harmonyType: "Koninklijk Bloemig & Emotioneel Herstel"
  },
  "patchouli": {
    partnerNames: ["Sinaasappel", "Roos", "Bergamot", "Cederhout", "Vanille", "Sandelhout"],
    reasons: {
      "Sinaasappel": "De ultieme match: vrolijke zoete citrus verzacht de donkere aarde.",
      "Roos": "Sensueel, romantisch en aristocratisch parfumakkoord.",
      "Bergamot": "Chique chypre-gevoel; complex en persistent.",
      "Cederhout": "Diepe bosgrond; stoer, warm en rustgevend.",
      "Vanille": "Maakt de patchouli fluweelzacht en chocolade-achtig warm."
    },
    harmonyType: "Bohemian Aards & Mystieke Fixatie"
  },
  "sandelhout": {
    partnerNames: ["Jasmijn", "Bergamot", "Roos", "Wierook", "Ylang Ylang", "Patchouli"],
    reasons: {
      "Jasmijn": "Crème-achtige bloemenweelde; tijdloos en rustgevend.",
      "Bergamot": "Zacht hout ontmoet heldere citrusopening.",
      "Roos": "Harmonieert het hart en brengt luxueuze warmte in de kamer.",
      "Wierook": "Ideaal voor meditatie, gebed en ademhalingsoefeningen."
    },
    harmonyType: "Romig Hout & Subtiele Luxe"
  },
  "ylangylang": {
    partnerNames: ["Bergamot", "Sinaasappel", "Patchouli", "Sandelhout", "Lavendel"],
    reasons: {
      "Bergamot": "Temt de intense tropische zoetheid met frisse Earl Grey accenten.",
      "Sinaasappel": "Vrolijk eilandgevoel vol sensualiteit en optimisme.",
      "Patchouli": "Diepe Oosterse verleiding; ideaal voor intieme avonden.",
      "Sandelhout": "Verzacht het bloemenboeket tot een zacht kussenparfum."
    },
    harmonyType: "Exotisch Tropisch & Zwoele Warmte"
  },
  "kaneel": {
    partnerNames: ["Sinaasappel", "Kruidnagel", "Vanille", "Cederhout", "Wierook"],
    reasons: {
      "Sinaasappel": "De gouden standaard voor knusse wintergezelligheid.",
      "Vanille": "Rondt de scherpe specerij af tot een heerlijk bakkerij-aroma.",
      "Cederhout": "Geeft een houtachtige basis zodat het niet te zoet wordt."
    },
    harmonyType: "Warme Specerijen & Gezellige Haard"
  },
  "vanille": {
    partnerNames: ["Sinaasappel", "Kaneel", "Lavendel", "Patchouli", "Cederhout", "Bergamot"],
    reasons: {
      "Sinaasappel": "Romige citrusdessert-geur; geliefd door jong en oud.",
      "Lavendel": "Zachte balsemachtige zoetheid; heerlijk voor een kussenspray.",
      "Patchouli": "Diepe chocolade- en ambertoets; mysterieus en rijk.",
      "Cederhout": "Maakt de vanille mannelijker en droger; luxe boetiekhotel."
    },
    harmonyType: "Fluweelzachte Balsem & Zoete Fixatie"
  },
  "teatree": {
    partnerNames: ["Eucalyptus", "Pepermunt", "Citroen", "Lavendel", "Grove Den"],
    reasons: {
      "Eucalyptus": "Maximale antibacteriële en schimmelwerende werking.",
      "Citroen": "Verfrist het medicinale karakter tot een aangename schoonmaakgeur.",
      "Lavendel": "Verzacht de scherpe geur en helpt bij huidverzorging en herstel."
    },
    harmonyType: "Medicinaal Zuiverend & Schone Lucht"
  },
  "groveden": {
    partnerNames: ["Cederhout", "Eucalyptus", "Citroen-Euc.", "Rozemarijn", "Lavendel"],
    reasons: {
      "Cederhout": "Volledig harmonisch bosakkoord; grondend en rustgevend.",
      "Eucalyptus": "Opent de borstkas en zuivert winterse ruimtes.",
      "Rozemarijn": "Verkwikkend bergklimaat voor actieve dagen."
    },
    harmonyType: "Naaldwoud & Vitale Adem"
  },
  "grapefruit": {
    partnerNames: ["Sinaasappel", "Rozemarijn", "Pepermunt", "Bergamot", "Cederhout"],
    reasons: {
      "Rozemarijn": "Verbetert mentale alertheid en humeur.",
      "Pepermunt": "Superfrisse energieboost voor de vroege ochtend.",
      "Cederhout": "Droog-fruitig akkoord met mannelijke elegantie."
    },
    harmonyType: "Bitter-Frisse Citrus & Vitaliteit"
  },
  "lemongrass": {
    partnerNames: ["Lavendel", "Eucalyptus", "Pepermunt", "Cederhout", "Sinaasappel"],
    reasons: {
      "Lavendel": "Heerlijk fris linnen-akkoord; zuivert beddengoed en kasten.",
      "Eucalyptus": "Krachtige verfrissing; weert muggen en insecten af.",
      "Cederhout": "Houdt de scherpe citroengrasgeur langer vast op stoffen."
    },
    harmonyType: "Exotisch Gras & Fris Linnen"
  }
};

/**
 * Zoekt en genereert voor ELKE olie in de app passende geurcombinaties en roomspray recepten.
 */
export function getOilFragrancePairings(oil: EssentialOil, allOils: EssentialOil[]) {
  const normName = oil.name.toLowerCase();
  const normCategory = oil.category.toLowerCase();
  const normNote = oil.noteType;

  // 1. Zoek eerst in de curated map
  let curatedKey = Object.keys(CURATED_OIL_PAIRINGS).find((k) => normName.includes(k));

  const pairings: OilPairing[] = [];
  const addedIds = new Set<string>();

  if (curatedKey) {
    const curated = CURATED_OIL_PAIRINGS[curatedKey];
    for (const partnerName of curated.partnerNames) {
      const match = allOils.find(
        (o) => o.id !== oil.id && (o.name.toLowerCase().includes(partnerName.toLowerCase()) || partnerName.toLowerCase().includes(o.name.toLowerCase()))
      );
      if (match && !addedIds.has(match.id)) {
        addedIds.add(match.id);
        const reason = curated.reasons[partnerName] || `Harmonieert uitstekend met ${oil.name} dankzij complementaire geurnoten.`;
        pairings.push({
          oilId: match.id,
          name: match.name,
          noteType: match.noteType,
          category: match.category,
          reason,
          harmonyType: curated.harmonyType
        });
      }
    }
  }

  // 2. Fallback / complementaire harmonie op basis van complementaire noten (Top - Midden - Basis)
  if (pairings.length < 4) {
    // Zoek complementaire noten
    const neededNotes = normNote === "Top" ? ["Midden", "Basis"] : normNote === "Basis" ? ["Top", "Midden"] : ["Top", "Basis"];
    
    for (const other of allOils) {
      if (pairings.length >= 6) break;
      if (other.id === oil.id || addedIds.has(other.id)) continue;

      if (neededNotes.includes(other.noteType)) {
        // Controleer of aroma's aansluiten
        const sharedAromas = other.aromaProfile.filter((a) => oil.aromaProfile.includes(a));
        const isComplementary =
          (normCategory.includes("citrus") && (other.category.includes("Hout") || other.category.includes("Bloemen"))) ||
          (normCategory.includes("bloem") && (other.category.includes("Citrus") || other.category.includes("Hout"))) ||
          (normCategory.includes("hout") && (other.category.includes("Citrus") || other.category.includes("Hars"))) ||
          (normCategory.includes("kruid") && (other.category.includes("Munt") || other.category.includes("Citrus"))) ||
          sharedAromas.length > 0;

        if (isComplementary) {
          addedIds.add(other.id);
          pairings.push({
            oilId: other.id,
            name: other.name,
            noteType: other.noteType,
            category: other.category,
            reason: `Verbindt ${oil.name} (${oil.noteType}noot) met een complementaire ${other.noteType}noot voor een gebalanceerde geurdriehoek.`,
            harmonyType: `${oil.category} & ${other.category} Balans`
          });
        }
      }
    }
  }

  // 3. Vind alle populaire roomspray recepten die deze olie bevatten
  const matchingRecipes = POPULAR_ROOM_SPRAYS.filter((rec) =>
    rec.ingredients.some(
      (ing) => ing.oilId === oil.id || ing.name.toLowerCase().includes(normName) || normName.includes(ing.name.toLowerCase())
    )
  );

  // 4. Snelle combinatiesuggesties als inspiratie
  const suggestedQuickBlends = [
    {
      name: `${oil.name} Balans & Zen`,
      description: `Een evenwichtige combinatie waarin ${oil.name} het geurhart vormt.`,
      oils: [
        { name: oil.name, dropsRatio: 4 },
        { name: pairings[0]?.name || "Lavendel", dropsRatio: 3 },
        { name: pairings[1]?.name || "Cederhout", dropsRatio: 2 }
      ]
    },
    {
      name: `${oil.name} Frisse Ochtendnevel`,
      description: `Een verkwikkende formule om je leefruimte energie en frisheid te geven.`,
      oils: [
        { name: oil.name, dropsRatio: 3 },
        { name: pairings[2]?.name || pairings[0]?.name || "Bergamot", dropsRatio: 3 },
        { name: pairings[3]?.name || pairings[1]?.name || "Sinaasappel", dropsRatio: 2 }
      ]
    }
  ];

  return {
    pairings,
    matchingRecipes,
    suggestedQuickBlends
  };
}


