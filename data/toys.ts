import type { StaticImageData } from "next/image";
import ballerinaBunny from "@/assets/toys/ballerina-bunny.png";
import blueDolphin from "@/assets/toys/blue-dolphin.png";
import blueFuzzyMonsterBunny from "@/assets/toys/blue-fuzzy-monster-bunny.png";
import brownSloth from "@/assets/toys/brown-sloth.png";
import crochetCarrotSet from "@/assets/toys/crochet-carrot-set.png";
import crochetCrow from "@/assets/toys/crochet-crow.png";
import giraffeOveralls from "@/assets/toys/giraffe-overalls.png";
import grayCat from "@/assets/toys/gray-cat.png";
import grayElephant from "@/assets/toys/gray-elephant.png";
import greenWhale from "@/assets/toys/green-whale.png";
import navyFuzzyMonsterBunny from "@/assets/toys/navy-fuzzy-monster-bunny.png";
import orangeFox from "@/assets/toys/orange-fox.png";
import otterWithShell from "@/assets/toys/otter-with-shell.png";
import purpleDragon from "@/assets/toys/purple-dragon.png";
import redCrab from "@/assets/toys/red-dress-doll.png";
import redDressDoll from "@/assets/toys/red-crab.png";
import redHairedGardenDoll from "@/assets/toys/red-haired-garden-doll.png";
import smilingOrange from "@/assets/toys/smiling-orange.png";
import whiteLamb from "@/assets/toys/white-lamb.png";
import yellowBunnyWithScarf from "@/assets/toys/yellow-bunny-with-scarf.png";

export type Toy = {
  name: string;
  price: string;
  image: StaticImageData;
  alt: string;
};

export const toys: Toy[] = [
  {
    name: "Ballerina Bunny",
    price: "$28.00",
    image: ballerinaBunny,
    alt: "White crocheted bunny in a pink ballerina dress",
  },
  {
    name: "Giraffe",
    price: "$30.00",
    image: giraffeOveralls,
    alt: "Yellow crocheted giraffe wearing green overalls",
  },
  {
    name: "Fox",
    price: "$28.00",
    image: orangeFox,
    alt: "Orange crocheted fox toy",
  },
  {
    name: "Dragon",
    price: "$32.00",
    image: purpleDragon,
    alt: "Purple and mint crocheted dragon toy",
  },
  {
    name: "Lamb",
    price: "$26.00",
    image: whiteLamb,
    alt: "White crocheted lamb toy with a gingham bow",
  },
  {
    name: "Elephant",
    price: "$28.00",
    image: grayElephant,
    alt: "Gray crocheted elephant toy in pink overalls",
  },
  {
    name: "Garden Doll",
    price: "$34.00",
    image: redHairedGardenDoll,
    alt: "Red-haired crocheted garden doll",
  },
  {
    name: "Crab",
    price: "$22.00",
    image: redCrab,
    alt: "Red crocheted crab toy",
  },
  {
    name: "Dolphin",
    price: "$24.00",
    image: blueDolphin,
    alt: "Blue crocheted dolphin toy",
  },
  {
    name: "Cat",
    price: "$28.00",
    image: grayCat,
    alt: "Gray crocheted cat toy",
  },
  {
    name: "Orange",
    price: "$18.00",
    image: smilingOrange,
    alt: "Smiling crocheted orange toy",
  },
  {
    name: "Otter",
    price: "$30.00",
    image: otterWithShell,
    alt: "Brown crocheted otter holding a shell",
  },
  {
    name: "Yellow Bunny",
    price: "$27.00",
    image: yellowBunnyWithScarf,
    alt: "Yellow crocheted bunny with a scarf",
  },
  {
    name: "Crow",
    price: "$24.00",
    image: crochetCrow,
    alt: "Black crocheted crow toy",
  },
  {
    name: "Red Dress Doll",
    price: "$34.00",
    image: redDressDoll,
    alt: "Crocheted doll wearing a red dress",
  },
  {
    name: "Blue Bunny",
    price: "$29.00",
    image: blueFuzzyMonsterBunny,
    alt: "Blue fuzzy crocheted monster bunny toy",
  },
  {
    name: "Navy Bunny",
    price: "$29.00",
    image: navyFuzzyMonsterBunny,
    alt: "Navy fuzzy crocheted monster bunny toy",
  },
  {
    name: "Whale",
    price: "$24.00",
    image: greenWhale,
    alt: "Green crocheted whale toy",
  },
  {
    name: "Carrot Set",
    price: "$20.00",
    image: crochetCarrotSet,
    alt: "Set of crocheted carrots",
  },
  {
    name: "Sloth",
    price: "$30.00",
    image: brownSloth,
    alt: "Brown crocheted sloth toy",
  },
];

export const featuredToys = [toys[3], toys[0], toys[1], toys[2], toys[4]];

export function getToySlug(toy: Toy) {
  return toy.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getToyBySlug(slug: string) {
  return toys.find((toy) => getToySlug(toy) === slug);
}
