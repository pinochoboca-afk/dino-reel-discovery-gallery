import tyrannosaurus from "@/assets/dinos/tyrannosaurus.jpg";
import velociraptor from "@/assets/dinos/velociraptor.jpg";
import spinosaurus from "@/assets/dinos/spinosaurus.jpg";
import giganotosaurus from "@/assets/dinos/giganotosaurus.jpg";
import triceratops from "@/assets/dinos/triceratops.jpg";
import stegosaurus from "@/assets/dinos/stegosaurus.jpg";
import brachiosaurus from "@/assets/dinos/brachiosaurus.jpg";
import ankylosaurus from "@/assets/dinos/ankylosaurus.jpg";
import parasaurolophus from "@/assets/dinos/parasaurolophus.jpg";
import argentinosaurus from "@/assets/dinos/argentinosaurus.jpg";
import carnotaurus from "@/assets/dinos/carnotaurus.jpg";
import pteranodon from "@/assets/dinos/pteranodon.jpg";
import mosasaurus from "@/assets/dinos/mosasaurus.jpg";
import allosaurus from "@/assets/dinos/allosaurus.jpg";
import diplodocus from "@/assets/dinos/diplodocus.jpg";
import pachycephalosaurus from "@/assets/dinos/pachycephalosaurus.jpg";
import dilophosaurus from "@/assets/dinos/dilophosaurus.jpg";
import iguanodon from "@/assets/dinos/iguanodon.jpg";

export type Category = "depredadores" | "gigantes" | "acorazados" | "pico-de-pato" | "cielo-mar" | "argentinos";

export type Dinosaur = {
  slug: string;
  name: string;
  meaning: string;
  period: string;
  diet: "Carnívoro" | "Herbívoro" | "Piscívoro";
  length: string;
  weight: string;
  place: string;
  summary: string;
  description: string;
  facts: string[];
  image: string;
  categories: Category[];
};

export const categories: { id: Category; title: string }[] = [
  { id: "depredadores", title: "Grandes depredadores" },
  { id: "argentinos", title: "Dinosaurios argentinos" },
  { id: "gigantes", title: "Gigantes de cuello largo" },
  { id: "acorazados", title: "Cuernos, placas y armaduras" },
  { id: "pico-de-pato", title: "Manadas herbívoras" },
  { id: "cielo-mar", title: "Reyes del cielo y del mar" },
];

export const dinosaurs: Dinosaur[] = [
  {
    slug: "tyrannosaurus-rex",
    name: "Tyrannosaurus rex",
    meaning: "Rey lagarto tirano",
    period: "Cretácico superior · hace 68–66 millones de años",
    diet: "Carnívoro",
    length: "12 m",
    weight: "8 toneladas",
    place: "Norteamérica",
    summary: "El depredador más famoso de todos los tiempos, con una mordida capaz de triturar huesos.",
    description:
      "El T. rex fue uno de los carnívoros terrestres más grandes que existieron. Tenía una cabeza enorme, dientes del tamaño de una banana y una mordida mucho más fuerte que la de cualquier animal vivo hoy. Sus brazos eran cortos pero muy musculosos, y tenía un gran sentido del olfato para encontrar presas a kilómetros.",
    facts: ["Sus dientes medían hasta 30 cm con raíz", "Podía ver en profundidad, como un águila", "Vivió hasta el final de la era de los dinosaurios"],
    image: tyrannosaurus,
    categories: ["depredadores"],
  },
  {
    slug: "giganotosaurus",
    name: "Giganotosaurus",
    meaning: "Lagarto gigante del sur",
    period: "Cretácico superior · hace 99–97 millones de años",
    diet: "Carnívoro",
    length: "13 m",
    weight: "7 toneladas",
    place: "Neuquén, Argentina",
    summary: "Un gigante patagónico, incluso más largo que el T. rex.",
    description:
      "Descubierto en 1993 en Neuquén por un aficionado, el Giganotosaurus es uno de los carnívoros más grandes jamás encontrados. Tenía un cráneo largo y estrecho con dientes como cuchillas, ideales para cortar carne. Es probable que cazara a enormes saurópodos herbívoros.",
    facts: ["Su cráneo medía cerca de 1,6 m", "Su cerebro era del tamaño de una banana", "Fue hallado en Villa El Chocón"],
    image: giganotosaurus,
    categories: ["depredadores", "argentinos"],
  },
  {
    slug: "spinosaurus",
    name: "Spinosaurus",
    meaning: "Lagarto con espinas",
    period: "Cretácico · hace 99–93 millones de años",
    diet: "Piscívoro",
    length: "15 m",
    weight: "7 toneladas",
    place: "Norte de África",
    summary: "El carnívoro más largo conocido, con una vela en la espalda y vida semiacuática.",
    description:
      "El Spinosaurus pasaba gran parte de su vida en ríos y pantanos, cazando peces enormes. Su hocico era largo como el de un cocodrilo y su cola tenía forma de remo para nadar. La gran vela de su espalda podía medir más de 1,5 m de alto.",
    facts: ["Es el carnívoro más largo descubierto", "Tenía huesos densos para sumergirse", "Su cola le servía para nadar"],
    image: spinosaurus,
    categories: ["depredadores", "cielo-mar"],
  },
  {
    slug: "velociraptor",
    name: "Velociraptor",
    meaning: "Ladrón veloz",
    period: "Cretácico superior · hace 75–71 millones de años",
    diet: "Carnívoro",
    length: "2 m",
    weight: "15 kg",
    place: "Mongolia",
    summary: "Pequeño, emplumado y muy inteligente, con una garra en forma de hoz.",
    description:
      "En la vida real el Velociraptor era del tamaño de un pavo grande y estaba cubierto de plumas. Tenía una garra curva en cada pie que usaba para sujetar a sus presas. Era rápido, ágil y uno de los dinosaurios con el cerebro más grande en proporción a su cuerpo.",
    facts: ["Tenía plumas como un ave", "Su garra medía unos 6,5 cm", "Corría hasta 40 km/h"],
    image: velociraptor,
    categories: ["depredadores"],
  },
  {
    slug: "carnotaurus",
    name: "Carnotaurus",
    meaning: "Toro carnívoro",
    period: "Cretácico superior · hace 72–69 millones de años",
    diet: "Carnívoro",
    length: "8 m",
    weight: "1,5 toneladas",
    place: "Chubut, Argentina",
    summary: "El toro de la Patagonia: cuernos sobre los ojos y patas de corredor.",
    description:
      "El Carnotaurus tenía dos cuernos sobre los ojos y brazos diminutos, aún más cortos que los del T. rex. Sus patas largas y su cola musculosa lo convertían en uno de los dinosaurios grandes más veloces. Se encontraron impresiones de su piel, cubierta de escamas.",
    facts: ["Podía correr muy rápido", "Se conoce cómo era su piel", "Sus brazos casi no tenían uso"],
    image: carnotaurus,
    categories: ["depredadores", "argentinos"],
  },
  {
    slug: "allosaurus",
    name: "Allosaurus",
    meaning: "Lagarto diferente",
    period: "Jurásico superior · hace 155–145 millones de años",
    diet: "Carnívoro",
    length: "9,5 m",
    weight: "2,3 toneladas",
    place: "Norteamérica y Portugal",
    summary: "El gran cazador del Jurásico, que atacaba con su mandíbula como un hacha.",
    description:
      "El Allosaurus fue el depredador dominante del Jurásico, millones de años antes que el T. rex. Tenía crestas pequeñas sobre los ojos y brazos fuertes con tres garras. Abría mucho la boca y golpeaba a sus presas con la mandíbula superior como si fuera un hacha.",
    facts: ["Vivió 80 millones de años antes que el T. rex", "Tenía tres dedos con garras", "Se hallaron más de 40 esqueletos"],
    image: allosaurus,
    categories: ["depredadores"],
  },
  {
    slug: "dilophosaurus",
    name: "Dilophosaurus",
    meaning: "Lagarto de dos crestas",
    period: "Jurásico inferior · hace 193 millones de años",
    diet: "Carnívoro",
    length: "7 m",
    weight: "400 kg",
    place: "Arizona, EE. UU.",
    summary: "Famoso por sus dos crestas en la cabeza, uno de los primeros grandes carnívoros.",
    description:
      "El Dilophosaurus tenía dos crestas finas en forma de media luna sobre la cabeza, probablemente para lucirse ante otros de su especie. Aunque en las películas escupe veneno y tiene una gola, no hay pruebas de eso: era un cazador ágil y bastante grande para su época.",
    facts: ["Las crestas eran delgadas y frágiles", "No escupía veneno", "Era el más grande de su tiempo"],
    image: dilophosaurus,
    categories: ["depredadores"],
  },
  {
    slug: "argentinosaurus",
    name: "Argentinosaurus",
    meaning: "Lagarto de Argentina",
    period: "Cretácico superior · hace 94–97 millones de años",
    diet: "Herbívoro",
    length: "35 m",
    weight: "70 toneladas",
    place: "Neuquén, Argentina",
    summary: "Uno de los animales terrestres más grandes que jamás pisaron la Tierra.",
    description:
      "El Argentinosaurus era tan grande como tres colectivos en fila y pesaba lo mismo que diez elefantes. Solo sus vértebras medían más de 1,5 m. Comía enormes cantidades de plantas todos los días y sus crías salían de huevos del tamaño de una pelota de fútbol.",
    facts: ["Pesaba como 10 elefantes", "Sus vértebras medían 1,5 m", "Sus huevos eran del tamaño de una pelota"],
    image: argentinosaurus,
    categories: ["gigantes", "argentinos"],
  },
  {
    slug: "brachiosaurus",
    name: "Brachiosaurus",
    meaning: "Lagarto brazo",
    period: "Jurásico superior · hace 154–150 millones de años",
    diet: "Herbívoro",
    length: "22 m",
    weight: "40 toneladas",
    place: "Norteamérica",
    summary: "Patas delanteras más largas que las traseras para comer en la copa de los árboles.",
    description:
      "A diferencia de otros saurópodos, el Brachiosaurus tenía las patas delanteras más largas que las traseras, como una jirafa gigante. Así podía alcanzar hojas a más de 12 metros de altura, donde ningún otro herbívoro llegaba.",
    facts: ["Alcanzaba 12 m de altura", "Comía unos 200 kg de plantas al día", "Su nombre viene de sus 'brazos' largos"],
    image: brachiosaurus,
    categories: ["gigantes"],
  },
  {
    slug: "diplodocus",
    name: "Diplodocus",
    meaning: "Doble viga",
    period: "Jurásico superior · hace 154–152 millones de años",
    diet: "Herbívoro",
    length: "26 m",
    weight: "15 toneladas",
    place: "Norteamérica",
    summary: "Cuello y cola larguísimos: su cola podía chasquear como un látigo.",
    description:
      "El Diplodocus era muy largo pero liviano para su tamaño. Su cola tenía unas 80 vértebras y terminaba en una punta fina que quizá podía chasquear como un látigo para asustar a los depredadores. Comía plantas bajas y helechos moviendo su largo cuello de lado a lado.",
    facts: ["Su cola tenía 80 vértebras", "Sus dientes eran como lápices", "Era más largo que una cancha de básquet"],
    image: diplodocus,
    categories: ["gigantes"],
  },
  {
    slug: "triceratops",
    name: "Triceratops",
    meaning: "Cara con tres cuernos",
    period: "Cretácico superior · hace 68–66 millones de años",
    diet: "Herbívoro",
    length: "9 m",
    weight: "9 toneladas",
    place: "Norteamérica",
    summary: "Tres cuernos y una gran gola ósea para defenderse del T. rex.",
    description:
      "El Triceratops tenía dos cuernos largos sobre los ojos, uno corto en la nariz y una enorme gola de hueso detrás de la cabeza. Convivió con el T. rex y se han encontrado fósiles de Triceratops con marcas de mordidas de tiranosaurio.",
    facts: ["Su cráneo medía hasta 2,5 m", "Tenía un pico como de loro", "Convivió con el T. rex"],
    image: triceratops,
    categories: ["acorazados"],
  },
  {
    slug: "stegosaurus",
    name: "Stegosaurus",
    meaning: "Lagarto con tejado",
    period: "Jurásico superior · hace 155–150 millones de años",
    diet: "Herbívoro",
    length: "9 m",
    weight: "5 toneladas",
    place: "Norteamérica y Portugal",
    summary: "Placas en la espalda y una cola con cuatro púas afiladas.",
    description:
      "El Stegosaurus es fácil de reconocer por las grandes placas que tenía en el lomo y las cuatro púas de su cola, llamadas 'thagomizer'. Usaba la cola como arma contra depredadores como el Allosaurus. Curiosamente, su cerebro era del tamaño de una nuez.",
    facts: ["Su cerebro era del tamaño de una nuez", "Las púas de la cola medían 90 cm", "Tenía 17 placas en la espalda"],
    image: stegosaurus,
    categories: ["acorazados"],
  },
  {
    slug: "ankylosaurus",
    name: "Ankylosaurus",
    meaning: "Lagarto fusionado",
    period: "Cretácico superior · hace 68–66 millones de años",
    diet: "Herbívoro",
    length: "8 m",
    weight: "6 toneladas",
    place: "Norteamérica",
    summary: "Un tanque viviente con armadura de hueso y un mazo en la cola.",
    description:
      "El Ankylosaurus tenía el cuerpo cubierto de placas de hueso, incluso los párpados. Al final de la cola llevaba un enorme mazo óseo capaz de romper los huesos de un atacante. Era bajo y ancho, muy difícil de voltear.",
    facts: ["Hasta sus párpados tenían armadura", "Su mazo podía romper huesos", "Era tan ancho como un auto"],
    image: ankylosaurus,
    categories: ["acorazados"],
  },
  {
    slug: "pachycephalosaurus",
    name: "Pachycephalosaurus",
    meaning: "Lagarto de cabeza gruesa",
    period: "Cretácico superior · hace 70–66 millones de años",
    diet: "Herbívoro",
    length: "4,5 m",
    weight: "450 kg",
    place: "Norteamérica",
    summary: "Con un cráneo de 25 cm de grosor, ideal para chocar cabezas.",
    description:
      "El Pachycephalosaurus tenía la parte de arriba del cráneo en forma de cúpula, con hueso de hasta 25 cm de espesor, rodeada de pequeños bultos y púas. Los científicos creen que lo usaba para empujarse con otros machos, como hacen hoy las cabras montesas.",
    facts: ["Su cráneo tenía 25 cm de grosor", "Caminaba en dos patas", "Tenía púas alrededor de la cabeza"],
    image: pachycephalosaurus,
    categories: ["acorazados", "pico-de-pato"],
  },
  {
    slug: "parasaurolophus",
    name: "Parasaurolophus",
    meaning: "Casi lagarto con cresta",
    period: "Cretácico superior · hace 76–73 millones de años",
    diet: "Herbívoro",
    length: "9,5 m",
    weight: "2,5 toneladas",
    place: "Norteamérica",
    summary: "Su cresta hueca funcionaba como una trompeta para comunicarse.",
    description:
      "El Parasaurolophus tenía una larga cresta curva y hueca en la cabeza. El aire pasaba por dentro y producía sonidos graves, como una trompeta, que servían para llamar a la manada o avisar de peligros. Vivía en grupos y tenía un pico como de pato.",
    facts: ["Su cresta medía casi 2 m", "Emitía sonidos como trompeta", "Vivía en grandes manadas"],
    image: parasaurolophus,
    categories: ["pico-de-pato"],
  },
  {
    slug: "iguanodon",
    name: "Iguanodon",
    meaning: "Diente de iguana",
    period: "Cretácico inferior · hace 126–122 millones de años",
    diet: "Herbívoro",
    length: "10 m",
    weight: "3 toneladas",
    place: "Europa",
    summary: "Uno de los primeros dinosaurios descubiertos, con un pulgar en forma de púa.",
    description:
      "El Iguanodon fue el segundo dinosaurio en recibir nombre, en 1825. Tenía un pulgar con una púa cónica que quizá usaba para defenderse o abrir frutos. Podía caminar en dos o en cuatro patas y vivía en manadas.",
    facts: ["Fue nombrado en 1825", "Su púa del pulgar medía 15 cm", "Caminaba en 2 o 4 patas"],
    image: iguanodon,
    categories: ["pico-de-pato"],
  },
  {
    slug: "pteranodon",
    name: "Pteranodon",
    meaning: "Alado y sin dientes",
    period: "Cretácico superior · hace 86–84 millones de años",
    diet: "Piscívoro",
    length: "7 m de alas",
    weight: "25 kg",
    place: "Norteamérica",
    summary: "Un reptil volador gigante que planeaba sobre el mar pescando.",
    description:
      "El Pteranodon no era un dinosaurio, sino un pterosaurio, un primo volador. Sus alas eran de piel estirada y podían medir 7 metros de punta a punta. No tenía dientes: atrapaba peces con su largo pico mientras planeaba sobre el océano.",
    facts: ["No era un dinosaurio, sino un pterosaurio", "No tenía dientes", "Sus alas medían 7 m"],
    image: pteranodon,
    categories: ["cielo-mar"],
  },
  {
    slug: "mosasaurus",
    name: "Mosasaurus",
    meaning: "Lagarto del río Mosa",
    period: "Cretácico superior · hace 82–66 millones de años",
    diet: "Carnívoro",
    length: "17 m",
    weight: "15 toneladas",
    place: "Océanos de todo el mundo",
    summary: "El terror de los mares: un reptil marino gigante con dos filas de dientes.",
    description:
      "El Mosasaurus tampoco era un dinosaurio: era un reptil marino emparentado con los lagartos y serpientes actuales. Dominaba los océanos del Cretácico, comiendo peces, tortugas y hasta otros reptiles marinos. Tenía una segunda fila de dientes en el paladar para que sus presas no escaparan.",
    facts: ["Tenía dientes también en el paladar", "Respiraba aire como las ballenas", "Era pariente de los lagartos"],
    image: mosasaurus,
    categories: ["cielo-mar"],
  },
];

export function getDinosaur(slug: string) {
  return dinosaurs.find((d) => d.slug === slug);
}

export function byCategory(id: Category) {
  return dinosaurs.filter((d) => d.categories.includes(id));
}
