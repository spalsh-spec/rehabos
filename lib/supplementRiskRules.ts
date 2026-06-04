import { SupplementArticle } from "./types";

export const SUPPLEMENT_SAFETY_NOTICE =
  "Supplements can interact with medicines and medical conditions. Check with a doctor, pharmacist, or dietitian before taking any supplement. No supplement heals injuries. Imported, unverified, or contaminated products can be dangerous — buy only from regulated sources and check local regulatory listings (e.g. ARTG in Australia).";

export const SUPPLEMENT_ARTICLES: SupplementArticle[] = [
  {
    id: "protein",
    title: "Protein intake",
    category: "Higher evidence for general sport recovery",
    summary:
      "Adequate daily protein supports muscle repair and maintenance during training and rehab. Food sources usually cover needs; powders are a convenience, not a requirement.",
    keyPoints: [
      "Most active people can meet protein needs through normal food",
      "Spreading protein across the day appears sensible",
      "Protein supports muscle maintenance when training is reduced",
    ],
    cautions: ["People with kidney conditions should get professional advice before increasing protein"],
    regulatoryStatus: "Food / listed supplement — check ARTG or local register for specific products",
  },
  {
    id: "creatine",
    title: "Creatine monohydrate",
    category: "Higher evidence for general sport recovery",
    summary:
      "One of the most studied sport supplements. Evidence supports strength and training capacity benefits in many people. It is not an injury treatment.",
    keyPoints: [
      "Well studied for strength and high intensity training support",
      "Plain creatine monohydrate is the studied form",
      "Does not repair injured tissue",
    ],
    cautions: ["Check with a doctor if you have kidney disease", "Avoid unverified imported blends"],
    regulatoryStatus: "Check ARTG or local register for specific products",
  },
  {
    id: "omega3",
    title: "Omega 3 fatty acids",
    category: "Limited evidence",
    summary:
      "Omega 3s from fish or supplements are discussed for general health and inflammation. Evidence for sport injury recovery specifically is limited.",
    keyPoints: ["Dietary fish intake is the first option", "Research on injury recovery is mixed"],
    cautions: ["Can interact with blood thinning medicines — ask a pharmacist"],
    regulatoryStatus: "Check ARTG or local register for specific products",
  },
  {
    id: "vitamin-d",
    title: "Vitamin D",
    category: "Limited evidence",
    summary:
      "Important for bone and muscle health. Supplementing mainly helps people who are actually deficient — a blood test through your doctor answers that.",
    keyPoints: ["Deficiency is best confirmed by a doctor", "Sunlight and diet contribute"],
    cautions: ["Very high doses can be harmful — do not self-prescribe large doses"],
    regulatoryStatus: "Check ARTG or local register for specific products",
  },
  {
    id: "collagen",
    title: "Collagen",
    category: "Limited evidence",
    summary:
      "Some early research explores collagen with vitamin C before tendon loading exercise. Evidence is early and mixed — interesting, not proven.",
    keyPoints: ["Research is early stage", "Any effect appears tied to combining it with exercise, not replacing it"],
    cautions: ["Do not delay proper rehab in favour of supplements"],
    regulatoryStatus: "Check ARTG or local register for specific products",
  },
  {
    id: "magnesium",
    title: "Magnesium",
    category: "Insufficient evidence",
    summary:
      "Popular for cramps and sleep, but evidence in people with normal magnesium levels is weak. Diet usually provides enough.",
    keyPoints: ["Evidence for performance or recovery benefit is weak", "Deficiency is uncommon with a varied diet"],
    cautions: ["High doses commonly cause stomach upset", "Can interact with some antibiotics and other medicines"],
    regulatoryStatus: "Check ARTG or local register for specific products",
  },
  {
    id: "curcumin",
    title: "Curcumin (turmeric extract)",
    category: "Insufficient evidence",
    summary:
      "Studied for soreness and inflammation with mixed, low certainty results. Product quality varies widely.",
    keyPoints: ["Study quality is mixed", "Absorption and dosing vary hugely between products"],
    cautions: ["Can interact with blood thinners", "Rare liver issues reported with some concentrated products"],
    regulatoryStatus: "Check ARTG or local register for specific products",
  },
  {
    id: "ashwagandha",
    title: "Ashwagandha",
    category: "Potentially risky",
    summary:
      "Marketed for stress and recovery. Evidence is limited and there are reports of liver injury and interactions. Treat with caution.",
    keyPoints: ["Evidence for injury recovery is poor", "Quality control across products is inconsistent"],
    cautions: ["Reported liver injury cases", "Interacts with thyroid, sedative, and immune medicines", "Avoid in pregnancy"],
    regulatoryStatus: "Check ARTG or local register — many products sold online are not listed",
  },
  {
    id: "peptides",
    title: "Peptides (e.g. BPC-157)",
    category: "Potentially risky",
    summary:
      "Injectable or oral peptides are promoted online for healing. Human evidence is lacking, products are often unregulated, and use may breach anti-doping rules.",
    keyPoints: ["No solid human evidence for injury healing", "Often sold from unregulated sources"],
    cautions: ["Banned in most tested sport (WADA)", "Unknown long term safety", "Contamination risk is real"],
    regulatoryStatus: "Generally not approved for human use — high caution",
  },
  {
    id: "sarms",
    title: "SARMs",
    category: "Potentially risky",
    summary:
      "Selective androgen receptor modulators are sold illegally as muscle builders. They carry serious health risks and are banned in sport. Do not use.",
    keyPoints: ["Not approved for human use", "Linked to liver injury and hormone suppression"],
    cautions: ["Banned by WADA", "Products frequently mislabelled or contaminated", "Serious health risks"],
    regulatoryStatus: "Not approved — sale for human use is illegal in many countries",
  },
  {
    id: "painkillers",
    title: "Painkillers",
    category: "Need professional advice",
    summary:
      "Pain medicines can mask warning signals and have real side effects. Use them as advised by a doctor or pharmacist, not as a way to push through training.",
    keyPoints: ["Masking pain to train can worsen injury", "A pharmacist can advise on safe short term options"],
    cautions: ["Do not combine multiple pain medicines without advice", "Avoid using painkillers to play sport on an injury"],
    regulatoryStatus: "Regulated medicines — follow professional advice",
  },
  {
    id: "anti-inflammatories",
    title: "Anti inflammatory overuse",
    category: "Need professional advice",
    summary:
      "Anti inflammatory medicines may ease short term pain, but routine or long term use has stomach, kidney, and heart risks, and may affect early tissue healing.",
    keyPoints: ["Short term use questions belong with a pharmacist or doctor", "Inflammation is part of normal early healing"],
    cautions: ["Risks rise with regular use", "Interact with blood pressure medicines and others"],
    regulatoryStatus: "Regulated medicines — follow professional advice",
  },
];

export const EVIDENCE_ORDER = [
  "Higher evidence for general sport recovery",
  "Limited evidence",
  "Insufficient evidence",
  "Potentially risky",
  "Need professional advice",
] as const;
