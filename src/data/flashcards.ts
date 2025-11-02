export interface Letter {
  letter: string;
  term: string;
  explanation?: string;
}

export interface Flashcard {
  id: number;
  chapter: string;
  topic: string;
  acronym: string;
  breakdown?: Letter[];
  color: string;
}

export const flashcards: Flashcard[] = [
  {
    id: 1,
    chapter: "Chapter 3",
    topic: "Factors to consider in relation to the external environment",
    acronym: "CREATE GREAT LISTS",
    breakdown: [
      { letter: 'C', term: 'Commercial requirements' },
      { letter: 'R', term: 'Regulation and legislation' },
      { letter: 'E', term: 'Environmental issues' },
      { letter: 'A', term: 'Accounting standards' },
      { letter: 'T', term: 'Tax' },
      { letter: 'E', term: 'Economic outlook' },
      { letter: 'G', term: 'Governance' },
      { letter: 'R', term: 'Risk management requirements' },
      { letter: 'E', term: 'Experience overseas' },
      { letter: 'A', term: 'Adequacy of capital and solvency' },
      { letter: 'T', term: 'Trends – demographic' },
      { letter: 'L', term: 'Lifestyle considerations' },
      { letter: 'I', term: 'Institutional structure' },
      { letter: 'S', term: 'Social and cultural trends' },
      { letter: 'T', term: 'Technology' },
      { letter: 'S', term: 'State benefits' }
    ],
    color: "#FF6B6B"
  },
  {
    id: 2,
    chapter: "Chapter 4",
    topic: "Main functions of a regulator",
    acronym: "SERVICE",
    breakdown: [
      { letter: 'S', term: 'Setting sanctions' },
      { letter: 'E', term: 'Enforcing regulations' },
      { letter: 'R', term: 'Reviewing and influencing government policy' },
      { letter: 'V', term: 'Vetting and registering firms and individuals' },
      { letter: 'I', term: 'Investigating breaches' },
      { letter: 'C', term: 'Checking capital adequacy, management and conduct' },
      { letter: 'E', term: 'Educating consumers and the public' }
    ],
    color: "#4ECDC4"
  },
  {
    id: 3,
    chapter: "Chapter 10",
    topic: "Contract design factors",
    acronym: "AMPLE DIRECT FACTORS",
    breakdown: [
      { letter: 'A', term: 'Administration systems' },
      { letter: 'M', term: 'Marketability' },
      { letter: 'P', term: 'Profitability' },
      { letter: 'L', term: 'Level and form of benefits' },
      { letter: 'E', term: 'Early leaver benefits' },
      { letter: 'D', term: 'Discretionary benefits' },
      { letter: 'I', term: 'Interests and needs of customers' },
      { letter: 'R', term: 'Risk appetite' },
      { letter: 'E', term: 'Expenses v.s. charges' },
      { letter: 'C', term: 'Competition' },
      { letter: 'T', term: 'Terms and conditions of contract' },
      { letter: 'F', term: 'Financing requirements' },
      { letter: 'A', term: 'Accounting implications' },
      { letter: 'C', term: 'Consistency with other products' },
      { letter: 'T', term: 'Timing of contributions' },
      { letter: 'O', term: 'Options and guarantees' },
      { letter: 'R', term: 'Regulatory requirements' },
      { letter: 'S', term: 'Subsidies (cross)' }
    ],
    color: "#45B7D1"
  },
  {
    id: 4,
    chapter: "Chapter 10",
    topic: "Expenses incurred by a product provider",
    acronym: "RAPID COST",
    breakdown: [
      { letter: 'R', term: 'Renewal administration' },
      { letter: 'A', term: 'Asset management' },
      { letter: 'P', term: 'Profits' },
      { letter: 'I', term: 'Initial administration' },
      { letter: 'D', term: 'Design of the contract' },
      { letter: 'C', term: 'Commission' },
      { letter: 'O', term: 'Overheads' },
      { letter: 'S', term: 'Sales/advertising' },
      { letter: 'T', term: 'Terminal' }
    ],
    color: "#FFA07A"
  },
  {
    id: 5,
    chapter: "Chapter 12",
    topic: "Risk identification tools",
    acronym: "DR RUB",
    breakdown: [
      { letter: 'D', term: 'Desktop analysis' },
      { letter: 'R', term: 'Risk analysis at a high level' },
      { letter: 'R', term: 'Risk register / matrix' },
      { letter: 'U', term: 'Upside as well as downside risks' },
      { letter: 'B', term: 'Brainstorming' }
    ],
    color: "#98D8C8"
  },
  {
    id: 6,
    chapter: "Chapter 12",
    topic: "Possible categories of risks in any capital project",
    acronym: "Preston North End Football Club Plays Brilliantly",
    breakdown: [
      { letter: 'P', term: 'Political' },
      { letter: 'N', term: 'Natural' },
      { letter: 'E', term: 'Economic' },
      { letter: 'F', term: 'Financial' },
      { letter: 'C', term: 'Crime' },
      { letter: 'P', term: 'Project' },
      { letter: 'B', term: 'Business' }
    ],
    color: "#F7DC6F"
  },
  {
    id: 7,
    chapter: "Chapters 13-16",
    topic: "Investment and risk characteristics of markets",
    acronym: "SYSTEM T",
    breakdown: [
      { letter: 'S', term: 'Security (risk)' },
      { letter: 'Y', term: 'Yield' },
      { letter: 'S', term: 'Spread (diversification, volatility)' },
      { letter: 'T', term: 'Term' },
      { letter: 'E', term: 'Exchange rate / expenses / expertise' },
      { letter: 'M', term: 'Money markets or bond markets' },
      { letter: 'T', term: 'Tax treatment' }
    ],
    color: "#BB8FCE"
  },
  {
    id: 8,
    chapter: "Chapter 13",
    topic: "Benefits of investing in MMI for liquidity reasons",
    acronym: "POURS",
    breakdown: [
      { letter: 'P', term: 'Protection of monetary value' },
      { letter: 'O', term: 'Opportunities to invest in other assets' },
      { letter: 'U', term: 'Unexpected liabilities to meet' },
      { letter: 'R', term: 'Recently received cashflow' },
      { letter: 'S', term: 'Short-term liabilities to meet' }
    ],
    color: "#85C1E2"
  },
  {
    id: 9,
    chapter: "Chapter 13",
    topic: "Economic situations where return on MMI may be poor",
    acronym: "GRID",
    breakdown: [
      { letter: 'G', term: 'General economic uncertainty' },
      { letter: 'R', term: 'Recession expected' },
      { letter: 'I', term: 'Interest rates expected to rise' },
      { letter: 'D', term: 'Depreciation of domestic currency expected' }
    ],
    color: "#F8B739"
  },
  {
    id: 10,
    chapter: "Chapter 13",
    topic: "Theories of the yield curve",
    acronym: "LIME",
    breakdown: [
      { letter: 'L', term: 'Liquidity preference' },
      { letter: 'I', term: 'Inflation risk premium' },
      { letter: 'M', term: 'Market segmentation' },
      { letter: 'E', term: 'Expectations' }
    ],
    color: "#52BE80"
  },
  {
    id: 11,
    chapter: "Chapter 16",
    topic: "Factors on which a prime property will score highly",
    acronym: "CALL STreet",
    breakdown: [
      { letter: 'C', term: 'Comparable properties' },
      { letter: 'A', term: 'Age and condition and flexibility' },
      { letter: 'L', term: 'Location' },
      { letter: 'L', term: 'Lease structure' },
      { letter: 'S', term: 'Size' },
      { letter: 'T', term: 'Tenant quality' }
    ],
    color: "#EC7063"
  },
  {
    id: 12,
    chapter: "Chapter 19",
    topic: "Practical problems when investing overseas",
    acronym: "CATERPILLAR",
    breakdown: [
      { letter: 'C', term: 'Custodian needed' },
      { letter: 'A', term: 'Accounting standards differ' },
      { letter: 'T', term: 'Time delays and Tax' },
      { letter: 'E', term: 'Expenses incurred / Expertise needed' },
      { letter: 'R', term: 'Regulation poor' },
      { letter: 'P', term: 'Political instability' },
      { letter: 'I', term: 'Information harder to obtain' },
      { letter: 'L', term: 'Liquidity problems' },
      { letter: 'L', term: 'Language and cultural differences' },
      { letter: 'A', term: 'Administration more complex' },
      { letter: 'R', term: 'Restrictions on investment' }
    ],
    color: "#5DADE2"
  },
  {
    id: 13,
    chapter: "Chapter 19",
    topic: "The 3 main difficulties of overseas investment",
    acronym: "MTV",
    breakdown: [
      { letter: 'M', term: 'Mis-matching' },
      { letter: 'T', term: 'Tax' },
      { letter: 'V', term: 'Volatility of currency' }
    ],
    color: "#48C9B0"
  },
  {
    id: 14,
    chapter: "Chapter 19",
    topic: "Factors to consider when investing in emerging markets",
    acronym: "PIERCES & CREAMeR",
    breakdown: [
      { letter: 'P', term: 'Political stability' },
      { letter: 'I', term: 'Information' },
      { letter: 'E', term: 'Expected return' },
      { letter: 'R', term: 'Regulation' },
      { letter: 'C', term: 'Currency stability' },
      { letter: 'E', term: 'Extra diversification' },
      { letter: 'S', term: 'Small countries' },
      { letter: 'C', term: 'Communication problems' },
      { letter: 'R', term: 'Restrictions' },
      { letter: 'E', term: 'Economic growth' },
      { letter: 'A', term: 'Asset valuation' },
      { letter: 'M', term: 'Marketability' },
      { letter: 'R', term: 'Range of companies' }
    ],
    color: "#AF7AC5"
  },
  {
    id: 15,
    chapter: "Chapter 23",
    topic: "Ways of valuing individual investments",
    acronym: "SHAM FADS",
    breakdown: [
      { letter: 'S', term: 'Smoothed market value' },
      { letter: 'H', term: 'Historic book value' },
      { letter: 'A', term: 'Adjusted book value' },
      { letter: 'M', term: 'Market value' },
      { letter: 'F', term: 'Fair value' },
      { letter: 'A', term: 'Arbitrage value' },
      { letter: 'D', term: 'Discounted cashflow' },
      { letter: 'S', term: 'Stochastic models' }
    ],
    color: "#F1948A"
  },
  {
    id: 16,
    chapter: "Chapter 25",
    topic: "Factors influencing long-term investment strategy",
    acronym: "SOUNDER TRACTORS",
    breakdown: [
      { letter: 'S', term: 'Size of the assets' },
      { letter: 'O', term: 'Objectives' },
      { letter: 'U', term: 'Uncertainty of the liabilities' },
      { letter: 'N', term: 'Nature of the liabilities' },
      { letter: 'D', term: 'Diversification' },
      { letter: 'E', term: 'Existing asset portfolio' },
      { letter: 'R', term: 'Return (expected long term)' },
      { letter: 'T', term: 'Tax treatment' },
      { letter: 'R', term: 'Restriction – statutory / legal / voluntary' },
      { letter: 'A', term: 'Accrual of liabilities' },
      { letter: 'C', term: 'Currency of existing liabilities' },
      { letter: 'T', term: 'Term of existing liabilities' },
      { letter: 'O', term: 'Other funds strategies (competition)' },
      { letter: 'R', term: 'Risk appetite' },
      { letter: 'S', term: 'Solvency requirements' }
    ],
    color: "#76D7C4"
  },
  {
    id: 17,
    chapter: "Chapters 25-28",
    topic: "Regulatory influences on assets held",
    acronym: "TECH SCAM",
    breakdown: [
      { letter: 'T', term: 'Types of assets restricted' },
      { letter: 'E', term: 'Extent of mismatching allowed' },
      { letter: 'C', term: 'Currency matching requirement' },
      { letter: 'H', term: 'Hold certain assets' },
      { letter: 'S', term: 'Single counterparty maximum' },
      { letter: 'C', term: 'Custodianship of assets' },
      { letter: 'A', term: 'Additional requirements' },
      { letter: 'M', term: 'Matching requirements' }
    ],
    color: "#F8C471"
  },
  {
    id: 18,
    chapter: "Chapter 29",
    topic: "Requirements of a good model",
    acronym: "VARIABLE CRISPS CARD",
    breakdown: [
      { letter: 'V', term: 'Valid' },
      { letter: 'A', term: 'Adequately documented' },
      { letter: 'R', term: 'Rigorous' },
      { letter: 'I', term: 'Inputs to parameter values appropriate' },
      { letter: 'A', term: 'Arbitrage free' },
      { letter: 'B', term: 'Behaviour reasonable' },
      { letter: 'L', term: 'Likely outcomes tested' },
      { letter: 'E', term: 'Easy to understand and communicate' },
      { letter: 'C', term: 'Capable of development' },
      { letter: 'R', term: 'Reflects risks' },
      { letter: 'I', term: 'Independent verification' },
      { letter: 'S', term: 'Stable relationships' },
      { letter: 'P', term: 'Prudent assumptions' },
      { letter: 'S', term: 'Statistically sound' }
    ],
    color: "#85929E"
  },
  {
    id: 19,
    chapter: "Chapter 30",
    topic: "Possible sources of data",
    acronym: "TRAINERS",
    breakdown: [
      { letter: 'T', term: 'Tables (actuarial mortality tables)' },
      { letter: 'R', term: 'Regulatory returns and company accounts' },
      { letter: 'A', term: 'Abroad (overseas contracts)' },
      { letter: 'I', term: 'Industry data' },
      { letter: 'N', term: 'National statistics' },
      { letter: 'E', term: 'Experience investigations' },
      { letter: 'R', term: 'Reinsurers' },
      { letter: 'S', term: 'Similar contracts (own experience)' }
    ],
    color: "#AED6F1"
  },
  {
    id: 20,
    chapter: "Chapter 30",
    topic: "Different uses of data",
    acronym: "SIR MAPEMAP",
    breakdown: [
      { letter: 'S', term: 'Statutory returns' },
      { letter: 'I', term: 'Investment' },
      { letter: 'R', term: 'Risk management' },
      { letter: 'M', term: 'Management information and financial control' },
      { letter: 'A', term: 'Administration' },
      { letter: 'P', term: 'Pricing (premiums, contributions)' },
      { letter: 'E', term: 'Experience statistics and analyses' },
      { letter: 'M', term: 'Marketing' },
      { letter: 'A', term: 'Accounting' },
      { letter: 'P', term: 'Provisioning' }
    ],
    color: "#C39BD3"
  },
  {
    id: 21,
    chapter: "Chapter 30",
    topic: "Problems with industry data",
    acronym: "DR DONEQ",
    breakdown: [
      { letter: 'D', term: 'Detail insufficient' },
      { letter: 'R', term: 'Reporting formats differ' },
      { letter: 'D', term: 'Differences in target markets' },
      { letter: 'O', term: 'Out of date' },
      { letter: 'N', term: 'Not comparable' },
      { letter: 'E', term: 'Experience varies' },
      { letter: 'Q', term: 'Quality uncertain' }
    ],
    color: "#FAD7A0"
  },
  {
    id: 22,
    chapter: "Chapter 34",
    topic: "Factors when comparing options for discontinuing scheme",
    acronym: "CRISES E",
    breakdown: [
      { letter: 'C', term: 'Choice - does method give members choice?' },
      { letter: 'R', term: 'Risks - who takes on future risks?' },
      { letter: 'I', term: 'Investments need to be realised?' },
      { letter: 'S', term: 'Security and/or guarantees offered' },
      { letter: 'E', term: 'Expenses incurred' },
      { letter: 'S', term: 'Surplus or deficit crystallised?' },
      { letter: 'E', term: 'Expertise needed?' }
    ],
    color: "#A9CCE3"
  },
  {
    id: 23,
    chapter: "Chapter 37",
    topic: "Reasons why disclosure is important",
    acronym: "SIMMERS",
    breakdown: [
      { letter: 'S', term: 'Sponsor awareness of financial significance' },
      { letter: 'I', term: 'Informed decisions can be made' },
      { letter: 'M', term: 'Misleading beneficiaries avoided' },
      { letter: 'M', term: 'Manages expectations of members' },
      { letter: 'E', term: 'Encourages take up of non-State benefits' },
      { letter: 'R', term: 'Regulatory requirement' },
      { letter: 'S', term: 'Security improved - accountability' }
    ],
    color: "#F9E79F"
  },
  {
    id: 24,
    chapter: "Chapter 37",
    topic: "Information to be disclosed from a benefit scheme",
    acronym: "DISCLOSURE",
    breakdown: [
      { letter: 'D', term: "Directors' pension costs" },
      { letter: 'I', term: 'Investment strategy and performance' },
      { letter: 'S', term: 'Surplus / deficit' },
      { letter: 'C', term: 'Calculation methods and assumptions' },
      { letter: 'L', term: 'Liabilities accruing and accrued' },
      { letter: 'O', term: 'Options and guarantees' },
      { letter: 'S', term: "Sponsor's and members' contributions" },
      { letter: 'U', term: 'Uncertainties (risks)' },
      { letter: 'R', term: 'Rights on wind up' },
      { letter: 'E', term: 'Expense charges and entitlement' }
    ],
    color: "#D7BDE2"
  },
  {
    id: 25,
    chapter: "Chapter 37",
    topic: "When information from benefit scheme should be disclosed",
    acronym: "PRICE",
    breakdown: [
      { letter: 'P', term: 'Payment commencement' },
      { letter: 'R', term: 'Request' },
      { letter: 'I', term: 'Intervals' },
      { letter: 'C', term: 'Combination' },
      { letter: 'E', term: 'Entry' }
    ],
    color: "#ABEBC6"
  },
  {
    id: 26,
    chapter: "Chapter 38",
    topic: "Reasons for analysing surplus",
    acronym: "DIVERGENCE",
    breakdown: [
      { letter: 'D', term: 'Divergence of A v.s. E (financial effect)' },
      { letter: 'I', term: 'Information to management and accounts' },
      { letter: 'V', term: 'Variance equals sum of individual levers' },
      { letter: 'E', term: 'Experience monitoring feedback into ACC' },
      { letter: 'R', term: 'Reconcile values for successive years' },
      { letter: 'G', term: 'Group into one-off / recurring sources' },
      { letter: 'E', term: 'Executive renumeration schemes' },
      { letter: 'N', term: 'New business strain (show effects)' },
      { letter: 'C', term: 'Check on valuation assumptions' },
      { letter: 'E', term: 'Extra check on valuation data and process' }
    ],
    color: "#F8BBD0"
  },
  {
    id: 27,
    chapter: "Booklet 11",
    topic: "The principles (canons) of lending",
    acronym: "CASPAR",
    breakdown: [
      { letter: 'C', term: 'Character and ability of borrower' },
      { letter: 'A', term: 'Amount of the loan' },
      { letter: 'S', term: 'Security of loan / borrower' },
      { letter: 'P', term: 'Purpose of the loan' },
      { letter: 'A', term: 'Ability to repay the loan' },
      { letter: 'R', term: 'Risk v.s. reward' }
    ],
    color: "#B39DDB"
  },
  {
    id: 28,
    chapter: "Chapter 40",
    topic: "Possible causes of inappropriate advice",
    acronym: "CRIMES",
    breakdown: [
      { letter: 'C', term: 'Complicated products' },
      { letter: 'R', term: 'Rubbish (incompetent) advisor' },
      { letter: 'I', term: 'Integrity lacking' },
      { letter: 'M', term: 'Model or parameter errors' },
      { letter: 'E', term: 'Errors in data' },
      { letter: 'S', term: 'State-encouraged but inappropriate actions' }
    ],
    color: "#FFAB91"
  },
  {
    id: 29,
    chapter: "Chapter 41",
    topic: "Additional criteria for a risk to be insurable",
    acronym: "MUD PIeS",
    breakdown: [
      { letter: 'M', term: 'Moral hazards eliminated' },
      { letter: 'U', term: 'Ultimate limit on liability' },
      { letter: 'D', term: 'Data / information sufficient' },
      { letter: 'P', term: 'Probability of event relatively small' },
      { letter: 'I', term: 'Individual risk events independent' },
      { letter: 'S', term: 'Similar risks pooled' }
    ],
    color: "#A5D6A7"
  },
  {
    id: 30,
    chapter: "Chapter 44",
    topic: "Benefits of using ART relative to reinsurance",
    acronym: "DESCARTES",
    breakdown: [
      { letter: 'D', term: 'Diversification' },
      { letter: 'E', term: 'Effective provision of risk management' },
      { letter: 'S', term: 'Solvency management / source of capital' },
      { letter: 'C', term: 'Cheaper cover' },
      { letter: 'A', term: 'Available (when reinsurance may not be)' },
      { letter: 'R', term: 'Results stabilised' },
      { letter: 'T', term: 'Tax advantages' },
      { letter: 'E', term: 'Exploits risk as opportunity' },
      { letter: 'S', term: 'Security of payment greater' }
    ],
    color: "#FFE082"
  },
  {
    id: 31,
    chapter: "Chapter 45",
    topic: "Reasons providers underwrite",
    acronym: "SAFER",
    breakdown: [
      { letter: 'S', term: 'Substandard risks - identify and offer special terms' },
      { letter: 'A', term: 'Avoid anti-selection' },
      { letter: 'F', term: 'Financial underwriting' },
      { letter: 'E', term: 'Ensure claims experience follows pricing' },
      { letter: 'R', term: 'Risk classification for fairness' }
    ],
    color: "#90CAF9"
  },
  {
    id: 32,
    chapter: "Chapter 46",
    topic: "Reasons why financial providers need capital",
    acronym: "REGulatory CUSHION",
    breakdown: [
      { letter: 'R', term: 'Regulatory requirements' },
      { letter: 'E', term: 'Expenses of launching new products' },
      { letter: 'G', term: 'Guarantees (write business containing)' },
      { letter: 'C', term: 'Cashflow timing mismatch' },
      { letter: 'U', term: 'Unexpected events cushion' },
      { letter: 'S', term: 'Smooth profit' },
      { letter: 'H', term: 'Helps demonstrate financial strength' },
      { letter: 'I', term: 'Investment freedom to mismatch' },
      { letter: 'O', term: 'Opportunities (mergers and acquisitions)' },
      { letter: 'N', term: 'New business strain financing' }
    ],
    color: "#CE93D8"
  },
  {
    id: 33,
    chapter: "Chapter 46",
    topic: "Importance of risk reporting",
    acronym: "FRAUD CRIME",
    breakdown: [
      { letter: 'F', term: 'Financing (appropriate price and capital)' },
      { letter: 'R', term: 'Risk management' },
      { letter: 'A', term: 'Accountability' },
      { letter: 'U', term: 'Understanding risks' },
      { letter: 'D', term: 'Decision making' },
      { letter: 'C', term: 'Compliance' },
      { letter: 'R', term: 'Regulatory requirements' },
      { letter: 'I', term: 'Identifying emerging risks' },
      { letter: 'M', term: 'Monitoring effectiveness' },
      { letter: 'E', term: 'External stakeholder communication' }
    ],
    color: "#FA8072"
  }
];

export const chapters = Array.from(new Set(flashcards.map(card => card.chapter))).sort();
