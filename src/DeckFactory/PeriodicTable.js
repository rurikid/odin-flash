import { DifficultyConstants } from "./DeckFactory.js";

const PeriodicTable = ['Ø', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F',
  'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti',
  'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br',
  'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd',
  'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm',
  'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W',
  'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr',
  'Ra', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm',
  'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh',
  'Fl', 'Mc', 'Lv', 'Ts', 'Og'];

const PeriodicPrompts = {
  Metals: "Metals",
  Metalloids: "Metalloids",
  Nonmetals: "Nonmetals",
  AlkaliMetals: "Alkali Metals",
  AlkalineEarthMetals: "Alkaline Earth Metals",
  Lanthanoids: "Lanthanoids",
  Actinoids: "Actinoids",
  TransitionMetals: "Transition Metals",
  PostTransitionMetals: "Post-transition Metals",
  ReactiveNonmetals: "Reactive Nonmetals",
  NobleGases: "Noble Gases",
  UnknownCategory: "Unknown Category"
}

const Metals = [
  { Start: 3, End: 4 },
  { Start: 11, End: 13 },
  { Start: 19, End: 31 },
  { Start: 37, End: 50 },
  { Start: 55, End: 84 },
  { Start: 87, End: 108 }
];

const Metalloids = [
  { Start: 5, End: 5 },
  { Start: 14, End: 14 },
  { Start: 32, End: 33 },
  { Start: 51, End: 52 },
  { Start: 85, End: 85 }
];

const Nonmetals = [
  { Start: 1, End: 2 },
  { Start: 6, End: 10 },
  { Start: 15, End: 18 },
  { Start: 34, End: 36 },
  { Start: 53, End: 54 },
  { Start: 86, End: 86 }
];

const AlkaliMetals = [
  { Start: 3, End: 3 },
  { Start: 11, End: 11 },
  { Start: 19, End: 19 },
  { Start: 37, End: 37 },
  { Start: 55, End: 55 },
  { Start: 87, End: 87 },
];

const AlkalineEarthMetals = [
  { Start: 4, End: 4 },
  { Start: 12, End: 12 },
  { Start: 20, End: 20 },
  { Start: 38, End: 38 },
  { Start: 56, End: 56 },
  { Start: 88, End: 88 },
];

const Lanthanoids = [
  { Start: 57, End: 71 },
];

const Actinoids = [
  { Start: 89, End: 103 },
];

const TransitionMetals = [
  { Start: 21, End: 30 },
  { Start: 39, End: 48 },
  { Start: 72, End: 80 },
  { Start: 104, End: 108 },
];

const PostTransitionMetals = [
  { Start: 13, End: 13 },
  { Start: 31, End: 31 },
  { Start: 49, End: 50 },
  { Start: 81, End: 84 },
];

const ReactiveNonmetals = [
  { Start: 1, End: 1 },
  { Start: 6, End: 9 },
  { Start: 15, End: 17 },
  { Start: 34, End: 35 },
  { Start: 53, End: 53 },
];

const NobleGases = [
  { Start: 2, End: 2 },
  { Start: 10, End: 10 },
  { Start: 18, End: 18 },
  { Start: 36, End: 36 },
  { Start: 54, End: 54 },
  { Start: 86, End: 86 },
];

const UnknownCategory = [
  { Start: 109, End: 118 },
];