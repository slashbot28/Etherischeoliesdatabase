import { EssentialOil } from "../data";

export interface OilSubstitution {
  oil: EssentialOil;
  score: number;
  matchReasons: string[];
  inStock: boolean;
}

/**
 * Finds the smartest substitutes for an oil from the user's current inventory.
 * Evaluates: Note Type, Category, Aroma Profile, and Therapeutic Properties.
 */
export function findOilSubstitutes(
  targetOil: EssentialOil | undefined,
  allOils: EssentialOil[],
  maxResults = 3
): OilSubstitution[] {
  if (!targetOil) return [];

  const candidates = allOils.filter((o) => o.id !== targetOil.id);
  const scored: OilSubstitution[] = [];

  for (const candidate of candidates) {
    let score = 0;
    const matchReasons: string[] = [];

    // 1. Note Type Match (Top, Midden, Basis is crucial for blend evaporation rate)
    if (candidate.noteType === targetOil.noteType) {
      score += 35;
      matchReasons.push(`Zelfde ${candidate.noteType}noot verdamping`);
    }

    // 2. Category Match
    if (candidate.category === targetOil.category) {
      score += 25;
      matchReasons.push(`Zelfde categorie (${candidate.category})`);
    }

    // 3. Aroma Profile Overlap
    const targetAromas = targetOil.aromaProfile || [];
    const sharedAromas = (candidate.aromaProfile || []).filter((a) =>
      targetAromas.includes(a)
    );
    if (sharedAromas.length > 0) {
      score += sharedAromas.length * 15;
      matchReasons.push(`Geurfacetten: ${sharedAromas.slice(0, 2).join(", ")}`);
    }

    // 4. Therapeutic Properties Overlap
    const targetProps = targetOil.properties || [];
    const sharedProps = (candidate.properties || []).filter((p) =>
      targetProps.includes(p)
    );
    if (sharedProps.length > 0) {
      score += sharedProps.length * 10;
      matchReasons.push(`Werking: ${sharedProps.slice(0, 2).join(", ")}`);
    }

    // 5. Stock Status bonus: prioritize oils actually available in user's cabinet
    const inStock = candidate.stock === "Voldoende" || candidate.stock === "Bijna op";
    if (inStock) {
      score += 30;
    }

    if (score > 30) {
      scored.push({
        oil: candidate,
        score,
        matchReasons,
        inStock,
      });
    }
  }

  // Sort by inStock first, then score descending
  scored.sort((a, b) => {
    if (a.inStock !== b.inStock) {
      return a.inStock ? -1 : 1;
    }
    return b.score - a.score;
  });

  return scored.slice(0, maxResults);
}
