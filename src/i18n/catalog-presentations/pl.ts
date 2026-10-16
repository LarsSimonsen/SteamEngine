import type { CatalogPresentationSet } from "../catalog-presentations";
import { batteryPresentationsFor, type BatteryTextDictionary } from "../battery-presentation-text";
import { modPresentationsFor, type ModTextDictionary } from "../mod-presentation-text";
import { materialPresentationsFor, type MaterialTextDictionary } from "../material-presentation-text";

export const batteryTexts: BatteryTextDictionary = {
    "battery.summary.removable": "Wyjmowane ogniwo wielokrotnego ładowania do kompatybilnych urządzeń.",
    "battery.summary.integrated": "Wewnętrzny pakiet akumulatorów w urządzeniu, a nie ogniwo wymieniane przez użytkownika.",
    "battery.note.approvedResearch": "Zatwierdzono 2026-08-13; zobacz powiązany rekord badawczy.",
    "battery.note.capacityBelowLabel": "Rzeczywista pojemność jest niższa niż sugeruje etykieta.",
    "battery.note.battery-71.evidence": "20 A, wartość ciągła; wartości impulsowe nie są używane.",
    "battery.note.battery-77.evidence":
        "20 A, konserwatywna, niezależna wartość porównawcza; istotne pozostają dokładny wariant "
        + "oznaczeń na koszulce ogniwa i wersja produkcyjna.",
    "battery.note.battery-78.evidence":
        "15 A, konserwatywna wartość z testów dokładnego modelu; "
        + "przetestowana wersja ze znakiem CCC pozostaje istotna.",
    "battery.note.battery-79.evidence":
        "45 A, niezależnie wyznaczona wartość prądu ciągłego dla testowanej wersji tabless; nie zastępuj "
        + "tej wartości wartościami impulsowymi.",
    "battery.note.battery-80.evidence": "36 A, rzeczywista wartość ciągła; wartość 56 A jest ograniczona temperaturowo.",
    "battery.note.battery-81.evidence":
        "40 A, wartość konserwatywna; testowane ogniwa wyglądały na "
        + "przedprodukcyjne i nie miały logo CCC.",
    "battery.note.battery-82.evidence":
        "13 A, zalecana wartość ciągła; 16,8 A to absolutne maksimum, "
        + "które nie jest przeznaczone do zapewnienia długiej żywotności.",
    "battery.note.battery-83.evidence":
        "40 A, wartość konserwatywna; 70 A ma ograniczenie temperaturowe, "
        + "a badane próbki były przedprodukcyjne.",
    "battery.note.battery-84.evidence":
        "40 A, wartość porównawcza ogniwa produkcyjnego; 70 A wymaga "
        + "kontroli temperatury.",
    "battery.note.battery-85.evidence":
        "40 A, wartość dla konkretnego wariantu oznaczeń na koszulce ogniwa; wartość 70 A obowiązuje "
        + "przy limicie temperatury 60 °C, a ogniwo testowano jako EVE 40PL sprzedawane pod inną marką.",
    "battery.note.battery-86.evidence":
        "19 A, wartość konserwatywna; dokładnie przetestowane próbki "
        + "wyglądały na przedprodukcyjne i nie miały znaków CCC.",
    "battery.note.battery-87.evidence":
        "40 A, wartość konserwatywna; 90 A ma ograniczenie temperaturowe, a testowane ogniwa wyglądały "
        + "na przedprodukcyjne.",
    "battery.note.battery-88.evidence":
        "40 A, wartość konserwatywna; 60 A jest ograniczone temperaturowo, "
        + "a ciągłość produkcji pozostaje nierozwiązana.",
    "battery.note.battery-89.evidence":
        "40 A, wartość konserwatywna; badane próbki miały niespójną "
        + "pojemność i nie miały znaków CCC/CE.",
    "battery.note.battery-90.evidence":
        "13 A, wartość konserwatywna; dokładnie przetestowane próbki "
        + "wyglądały na przedprodukcyjne i nie miały znaków CCC.",
    "battery.note.battery-91.evidence":
        "30 A, wartość ciągła oszacowana przez testera; maksymalna "
        + "wartość Reliance 50 A jest ograniczona temperaturą.",
    "battery.note.battery-92.evidence":
        "20 A, wartość ciągła z dwóch badanych partii związanych z produkcją; "
        + "30 A jest ograniczone temperaturowo.",
    "battery.note.battery-93.evidence":
        "12 A dla pracy ciągłej; 20 A wyłącznie impulsowo. Oznaczenia na koszulce testowanego ogniwa "
        + "zapisano jako SA110 / INR18650/40.",
    "battery.note.battery-94.evidence":
        "20 A, wartość dla konkretnego wariantu oznaczeń na koszulce ogniwa; tester zaleca prąd ciągły "
        + "poniżej 15 A. Vapehuset reklamuje 25 A w tytule, a późniejsze źródło ogniw sprzedawanych pod tą "
        + "marką lub wersje oznaczeń na koszulce mogą się różnić.",
    "battery.note.battery-95.evidence":
        "30 A, wartość dla konkretnego modelu; jest to ogniwo sprzedawane pod inną marką, a późniejsze "
        + "wersje oznaczeń na koszulce lub źródło samych ogniw mogą się różnić.",
    "battery.note.battery-96.evidence":
        "30 A, dokładna wartość rewizji z pięcioma wyprowadzeniami; wersje "
        + "z czterema wyprowadzeniami i późniejsze wersje z tym samym opakowaniem "
        + "znacznie się różnią i nie mogą dziedziczyć tego profilu.",
    "battery.safety.lowDrain": "Akumulator o małej zdolności rozładowania; nie nadaje się do wapowania.",
};

export const materialTexts: MaterialTextDictionary = {
    "material.profile": (displayName) => "Profil katalogowy dla " + displayName + ".",
    "material.safety.verifiedProfile":
        "Używaj zweryfikowanego profilu materiału i przestrzegaj "
        + "limitów temperatury oraz pracy urządzenia.",
};
export const modTexts: ModTextDictionary = {
    "mod.profile.regulated": (displayName) => "Profil regulowanego urządzenia do wapowania lub płytki sterującej: "
        + displayName + ".",
    "mod.preset-9.profile":
        "Billet Box Rev. 3a z wykończeniem z piaskowanego i "
        + "anodyzowanego aluminium; wprowadzony w maju 2014 r.",
    "mod.preset-10.profile":
        "Urządzenie Cloupor o mocy 30 W korzystające z chipsetu "
        + "klonującego DNA30 innej firmy, a nie autentyczna płyta "
        + "Evolv DNA-30D.",
    "mod.preset-231.profile":
        "Mod regulowany Dual-21700 z adapterami 18650; VAPORESSO "
        + "ocenia go na 220 W; testy zmierzyły 208 W, 8,979 V i 39 A.",
    "mod.preset-234.profile":
        "Mod regulowany Dual-18650; VAPORESSO ocenia go na 220 W; "
        + "testy zmierzyły 215 W, 9,08 V i 37 A.",
    "mod.preset-235.profile":
        "Mod regulowany z wbudowanym akumulatorem i deklarowaną mocą 100 W; w testach zmierzono 101 W, "
        + "29 A i co najmniej 7,97 V.",
    "mod.preset-236.profile":
        "Mod regulowany Single-18650 wykorzystujący AS Chip 4.0; "
        + "profil producenta to 100 W, 7,5 V, 32 A, 0,1–3 Ω.",
    "mod.preset-237.profile":
        "Mod na jedno ogniwo 21700 lub ogniwo 18650 z adapterem; Eleaf podaje 100 W, 9 V, 0,05–3,5 Ω; w "
        + "testach ustalono 30 A.",
    "mod.preset-238.profile":
        "Regulowany mod squonk na jedno ogniwo 21700, 20700 lub 18650 z adapterem, z konserwatywnym "
        + "profilem 95 W, 6 V, 34 A.",
};

export const presentations =  {
    "concepts":  {
        "concept-ohms-law":  {
            "displayName": "Prawo Ohma",
            "description": "Prawo Ohma łączy napięcie, prąd i rezystancję w obwodzie elektrycznym.",
            "summary": "Zależność między napięciem, prądem i rezystancją.",
            "sections": [ {
                    "id": "relationship",
                    "title": "Związek",
                    "paragraphs": ["Podstawowa zależność jest przydatna, gdy rezystancja elementu jest w przybliżeniu stała."],
                    "formulas": [ {
                            "expression": "V = I × R"
                        }],
                    "bullets": ["V to napięcie mierzone w woltach (V).", "I to prąd mierzony w amperach lub amperach (A).", "R to rezystancja mierzona w omach (\\u03a9)."]
                },  {
                    "id": "rearranged-formulas",
                    "title": "Zmienione formuły",
                    "paragraphs": ["Użyj wersji, która umieszcza wartość, którą chcesz znaleźć po lewej stronie:"],
                    "formulas": [ {
                            "expression": "I = V / R"
                        },  {
                            "expression": "R = V / I"
                        }],
                    "bullets": ["Zwiększanie napięcia zwiększa prąd, gdy rezystancja pozostaje taka sama.", "Zwiększanie rezystancji zmniejsza prąd, gdy napięcie pozostaje takie samo.", "Rezystancja zerowa \\u03a9 jest idealnym zwarciem i należy się z nią obchodzić osobno."]
                },  {
                    "id": "worked-examples",
                    "title": "Przepracowane przykłady",
                    "examples": [ {
                            "title": "Znajdź prąd",
                            "setup": "Źródło 4,2 V jest podłączone do obciążenia 1,0 \\u03a9.",
                            "formulas": ["Ja = 4,2 V / 1,0 \\u03a9 = 4,2 A"],
                            "conclusion": "Prąd obciążenia wynosi 4,2 A."
                        },  {
                            "title": "Znajdź opór",
                            "setup": "W obwodzie panuje napięcie 12 V i pobierany jest prąd 2 A.",
                            "formulas": ["R = 12 V / 2 A = 6 \\u03a9"],
                            "conclusion": "Rezystancja obwodu wynosi 6 \\u03a9."
                        },  {
                            "title": "Znajdź napięcie",
                            "setup": "Prąd 0,5 A przepływa przez rezystancję 10 \\u03a9.",
                            "formulas": ["V = 0,5 A × 10 Ω = 5 V"],
                            "conclusion": "Napięcie wynosi 5 V."
                        }]
                },  {
                    "id": "electrical-power",
                    "title": "Energia elektryczna",
                    "formulas": [ {
                            "expression": "P = V × I = I^2 × R = V^2 / R"
                        }],
                    "paragraphs": ["Prawo Ohma łączy się z zależnością mocy P = V × I. Moc P mierzy się w watach (W). W przypadku źródła 4,2 V i obciążenia 1,0 Ω idealna moc wynosi 17,64 W. Element potrzebuje wystarczającej pojemności cieplnej i zapasu mocy, aby bezpiecznie rozproszyć powstałe ciepło."]
                },  {
                    "id": "unit-conversions",
                    "title": "Konwersje jednostek",
                    "paragraphs": ["Przed obliczeniem zachowaj spójność jednostek:"],
                    "bullets": ["1 k\\u03a9 = 1000 \\u03a9", "1 M\\u03a9 = 1 000 000 \\u03a9", "1 mA = 0,001 A", "1 W = 1000 mW"]
                },  {
                    "id": "limits",
                    "title": "Granice modelu",
                    "paragraphs": ["Prawo Ohma jest modelem wyidealizowanym. Rzeczywiste komponenty mogą być nieomowe: ich rezystancja może zmieniać się wraz z temperaturą, napięciem, prądem, częstotliwością lub stanem pracy. W przypadku sieci szeregowych i równoległych należy stosować prawa Kirchhoffa razem z prawem Ohma."]
                }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Ohm%27s_law"
        },
        "concept-joule-heating":  {
            "displayName": "Ogrzewanie Joule'a",
            "description": "Ogrzewanie Joule'a opisuje konwersję energii elektrycznej na ciepło, gdy prąd przepływa przez opór.",
            "summary": "Jak prąd elektryczny zamienia opór w ciepło.",
            "sections": [ {
                    "id": "heating-power",
                    "title": "Moc grzewcza",
                    "paragraphs": ["Moc grzewcza elektryczna wynosi:"],
                    "formulas": [ {
                            "expression": "P = V × I"
                        },  {
                            "expression": "P = I^2 × R"
                        },  {
                            "expression": "P = V^2 / R"
                        }],
                    "bullets": ["P to moc w watach (W).", "V to napięcie w woltach (V).", "I jest prądem w amperach (A)."]
                },  {
                    "id": "worked-example",
                    "title": "Działający przykład",
                    "examples": [ {
                            "title": "Obciążenie rezystancyjne",
                            "setup": "Cewka 0,8 \\u03a9 przenosi 3 A.",
                            "formulas": ["P = I^2 × R = 3^2 × 0,8 = 7,2 W", "mi = P × t = 7,2 W × 10 s = 72 J"],
                            "conclusion": "Cewka przekształca energię w ciepło z szybkością 7,2 dżuli na sekundę, czyli 72 J w ciągu 10 sekund."
                        }]
                },  {
                    "id": "what-affects-heating",
                    "title": "Co wpływa na ogrzewanie",
                    "bullets": ["Przy stałym oporze podwojenie prądu daje czterokrotnie większą moc grzewczą.", "Przy stałym prądzie podwojenie rezystancji podwaja moc grzewczą.", "Przy stałym napięciu obniżenie rezystancji zwiększa moc grzewczą.", "Transfer ciepła do powietrza, cieczy i sprzętu określa rzeczywistą temperaturę."],
                    "paragraphs": ["Moc elektryczna to szybkość transferu energii, a nie temperatura. Pojemność cieplna i strumień ciepła określają, w jaki sposób energia zmienia temperaturę i jak szybko opuszcza powierzchnię."]
                },  {
                    "id": "practical-checks",
                    "title": "Kontrole praktyczne",
                    "paragraphs": ["Sprawdź, czy komponenty, połączenia i izolacja wytrzymują oczekiwany prąd i moc. Należy zachować odpowiedni zapas mocy, ponieważ rzeczywiste komponenty mogą nagrzewać się nierównomiernie, a rezystancja może zmieniać się wraz z temperaturą. Baterie i zasilacze również mają ciągłe ograniczenia prądu."]
                }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Joule_heating"
        },
        "concept-kirchhoffs-laws":  {
            "displayName": "Prawa Kirchhoffa",
            "description": "Prawa Kirchhoffa dotyczące prądu i napięcia opisują zachowanie w węzłach obwodów i wokół zamkniętych pętli.",
            "summary": "Jak zachowuje się prąd i napięcie w połączonych obwodach.",
            "sections": [ {
                    "id": "circuit-terms",
                    "title": "Warunki obwodu",
                    "paragraphs": ["Podstawowe terminy ułatwiają zrozumienie schematu obwodu:"],
                    "bullets": ["Węzeł to zbiór przewodów połączonych bez elementu pośredniczącego.", "Gałąź to ścieżka prądowa pomiędzy dwoma węzłami.", "Pętla to zamknięta ścieżka, która powraca do punktu początkowego.", "Połączenie szeregowe zapewnia prąd tylko jedną ścieżkę przez komponenty.", "Połączenie równoległe łączy gałęzie z tymi samymi dwoma węzłami."]
                },  {
                    "id": "current-law",
                    "title": "Aktualne prawo Kirchhoffa",
                    "formulas": [ {
                            "expression": "Σ I = 0"
                        },  {
                            "expression": "Σ I_in = Σ I_out"
                        }],
                    "paragraphs": ["Jeśli 8 A wchodzi do węzła, a jedna gałąź odprowadza 3 A, pozostałe gałęzie muszą łącznie przenieść 5 A. Wybierz aktualne kierunki przed rozwiązaniem; wynik ujemny oznacza, że ​​prąd rzeczywisty płynie w kierunku przeciwnym do założonego."]
                },  {
                    "id": "series-and-parallel",
                    "title": "Obwody szeregowe i równoległe",
                    "formulas": [ {
                            "expression": "I_total = I_1 = I_2 = ..."
                        },  {
                            "expression": "R_total = R_1 + R_2 + ..."
                        },  {
                            "expression": "I_total = I_1 + I_2 + ..."
                        },  {
                            "expression": "1 / R_total = 1 / R_1 + 1 / R_2 + ..."
                        }],
                    "examples": [ {
                            "title": "Rezystory szeregowe",
                            "setup": "Dwa rezystory 0,20 \\u03a9 połączone szeregowo z napięciem 8,0 V.",
                            "formulas": ["R_całkowita = 0,40 \\u03a9", "I = 8,0 V / 0,40 Ω = 20 A"],
                            "conclusion": "Przez oba rezystory przepływa to samo 20 A."
                        },  {
                            "title": "Rezystory równoległe",
                            "setup": "Dwie równe gałęzie 0,40 \\u03a9 są podłączone do 4,0 V.",
                            "formulas": ["R_całkowita = 0,20 \\u03a9", "I_całkowity = 4,0 V / 0,20 Ω = 20 A"],
                            "conclusion": "Przy jednakowej rezystancji gałęzi każda gałąź przenosi 10 A."
                        }]
                },  {
                    "id": "voltage-law",
                    "title": "Prawo napięciowe Kirchhoffa",
                    "formulas": [ {
                            "expression": "Σ V = 0"
                        },  {
                            "expression": "+8.0 V - V_1 - V_2 = 0"
                        },  {
                            "expression": "V_total = V_1 = V_2 = ... (parallel branches)"
                        }],
                    "paragraphs": ["Algebraiczna suma wzrostów i spadków napięcia w zamkniętej pętli wynosi zero. Wybierz jeden kierunek pętli i zachowaj spójność polaryzacji. Odwrócenie kierunku zmienia znaki, a nie rozwiązanie fizyczne. Większa rezystancja szeregowa powoduje większy spadek napięcia, ponieważ przez każdy element szeregowy przepływa ten sam prąd."]
                },  {
                    "id": "cells",
                    "title": "Ogniwa szeregowo i równolegle",
                    "formulas": [ {
                            "expression": "V_pack = V_1 + V_2 + ... (series)"
                        },  {
                            "expression": "C_pack = C_1 + C_2 + ... (parallel)"
                        }],
                    "bullets": ["Ogniwa szeregowe dodają napięcie, podczas gdy pojemność amperogodzinna pozostaje taka sama jak w przypadku jednego równego ogniwa.", "Ogniwa równoległe utrzymują to samo napięcie, podczas gdy pojemność i dostępny prąd zwiększają się w przybliżeniu.", "Podział prądu zależy od rezystancji wewnętrznej, styków, okablowania i przełączników.", "Szeregowe ładowanie litowo-jonowe wymaga monitorowania na poziomie ogniwa i odpowiedniego zrównoważenia lub zabezpieczenia."]
                },  {
                    "id": "solving-and-limits",
                    "title": "Rozwiązywanie rzeczywistych obwodów",
                    "bullets": ["Zaznacz napięcia w węzłach, prądy odgałęzień i przyjęte kierunki prądu.", "Zastosuj KCL w niezależnych węzłach i KVL wokół niezależnych pętli.", "Powiąż napięcie i prąd rezystora za pomocą V = I × R.", "Rozwiąż równania jednoczesne i sprawdź bilans mocy."],
                    "paragraphs": ["Uproszczony model może pomijać rezystancję wewnętrzną ogniwa, rezystancję styków, wydajność konwertera, wpływ temperatury, zachowanie w stanach przejściowych, obwody zabezpieczające i tolerancje komponentów. Uwzględnij każde pominięte zachowanie, które w istotny sposób wpływa na obwód wysokoprądowy."]
                }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Kirchhoff%27s_circuit_laws"
        },
        "concept-temperature-coefficient-of-resistance":  {
            "displayName": "Współczynnik temperaturowy rezystancji (TCR)",
            "description": "Współczynnik temperaturowy rezystancji szacuje, jak zmienia się rezystancja w miarę nagrzewania się lub ochładzania materiału.",
            "summary": "Jak zmienia się rezystancja materiału wraz z temperaturą.",
            "sections": [ {
                    "id": "linear-model",
                    "title": "Model liniowy",
                    "paragraphs": ["W przypadku małej lub umiarkowanej zmiany temperatury należy zastosować zależność pierwszego rzędu:"],
                    "formulas": [ {
                            "expression": "R_T = R_0 [1 + \\u03b1 (T - T_0)]"
                        }],
                    "bullets": ["R_0 to rezystancja w temperaturze odniesienia T_0.", "R_T to szacunkowa rezystancja w temperaturze T.", "\\u03b1 to współczynnik temperaturowy materiału wyrażony w 1/°C lub ppm/°C.", "Temperatury muszą używać tej samej skali i jednostek dla różnicy T - T_0."]
                },  {
                    "id": "positive-and-negative",
                    "title": "Dodatni i ujemny TCR",
                    "bullets": ["Dodatni TCR oznacza, że rezystancja rośnie wraz ze wzrostem temperatury; wiele metali zachowuje się w ten sposób.", "Ujemny TCR oznacza, że rezystancja maleje wraz ze wzrostem temperatury.", "TCR bliski zeru oznacza, że rezystancja zmienia się nieznacznie w określonym zakresie.", "Znak współczynnika ma znaczenie; zastąpienie wartości ujemnej jej wartością bezwzględną odwraca przewidywanie."]
                },  {
                    "id": "worked-example",
                    "title": "Działający przykład",
                    "examples": [ {
                            "title": "Gorący opór",
                            "setup": "Rezystancja 1,00 \\u03a9 jest określona w temperaturze 20 ° C, przy TCR 400 ppm/\\u00b0C.",
                            "formulas": ["\\u03b1 = 400 × 10^-6 / \\u00b0C = 0,0004 / \\u00b0C", "\\u0394T = 100 - 20 = 80 \\u00b0C", "R_T = 1,00 [1 + 0,0004 × 80] = 1,032 \\u03a9"],
                            "conclusion": "Szacowany opór wynosi 1,032 \\u03a9, około 3,2% powyżej jego wartości w 20 \\u00b0C."
                        }]
                },  {
                    "id": "power-and-limits",
                    "title": "TCR, moc i ograniczenia praktyczne",
                    "formulas": [ {
                            "expression": "I = V / R"
                        },  {
                            "expression": "P = V^2 / R = I^2 × R"
                        }],
                    "paragraphs": ["W przypadku rezystancji dodatniej TCR napędzanej stałym napięciem rosnąca temperatura zwiększa rezystancję i ma tendencję do zmniejszania prądu. W przypadku źródła prądu stałego ten sam wzrost rezystancji zwiększa moc.", "TCR producenta zwykle odnosi się do podanego zakresu temperatur i rezystancji. Gradienty temperatury, zmiany materiału, styki, naprężenia mechaniczne i samonagrzewanie mogą sprawić, że rzeczywisty wynik będzie różnił się od szacunków pierwszego rzędu."]
                }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Temperature_coefficient_of_resistance"
        },
        "concept-trigonometry":  {
            "displayName": "Trygonometria",
            "description": "Trygonometria wiąże kąty i długości i jest przydatna w przypadku wektorów, zależności fazowych i przebiegów.",
            "summary": "Zależności pomiędzy kątami i bokami trójkątów.",
            "sections": [ {
                    "id": "right-triangles",
                    "title": "Trójkąty prostokątne",
                    "paragraphs": ["W stosunku do kąta θ przeciwna strona znajduje się naprzeciwko niego, sąsiednia strona dotyka go z wyłączeniem przeciwprostokątnej, a przeciwprostokątna jest przeciwna do kąta prostego. SOH-CAH-TOA pomaga w zapamiętywaniu: sinus jest przeciwny do przeciwprostokątnej, cosinus przylega do przeciwprostokątnej, a styczna jest przeciwna do sąsiedniej."],
                    "formulas": [ {
                            "expression": "sin(θ) = opposite / hypotenuse"
                        },  {
                            "expression": "cos(θ) = adjacent / hypotenuse"
                        },  {
                            "expression": "tan(θ) = opposite / adjacent"
                        }]
                },  {
                    "id": "finding-sides-and-angles",
                    "title": "Znajdowanie nieznanych boków i kątów",
                    "examples": [ {
                            "title": "Znajdź stronę",
                            "setup": "Przeciwprostokątna o długości 10 cm napotyka kąt 30°.",
                            "formulas": ["naprzeciwko = 10 × sin(30°) = 5 cm", "sąsiadujący = 10 × cos(30°) ≈ 8,66 cm"],
                            "conclusion": "Użyj odwrotnej funkcji trygonometrycznej, gdy znane są długości boków."
                        }],
                    "formulas": [ {
                            "expression": "θ = sin^-1(opposite / hypotenuse)"
                        },  {
                            "expression": "θ = cos^-1(adjacent / hypotenuse)"
                        },  {
                            "expression": "θ = tan^-1(opposite / adjacent)"
                        }]
                },  {
                    "id": "degrees-and-radians",
                    "title": "Stopnie i radiany",
                    "formulas": [ {
                            "expression": "180° = π radians"
                        },  {
                            "expression": "θ_rad = θ_deg × π / 180"
                        }],
                    "paragraphs": ["Kalkulator musi znajdować się w trybie prawidłowego kąta. Użycie trybu stopni dla wartości radianów lub odwrotnie, daje inny wynik. Pełny cykl to 360° lub 2π radianów."]
                },  {
                    "id": "waveforms-and-identities",
                    "title": "Przebiegi i przydatne tożsamości",
                    "formulas": [ {
                            "expression": "x(t) = A × sin(2πft + φ)"
                        },  {
                            "expression": "ω = 2πf"
                        },  {
                            "expression": "sin^2(θ) + cos^2(θ) = 1"
                        },  {
                            "expression": "a^2 + b^2 = c^2"
                        }],
                    "bullets": ["A to amplituda, f to częstotliwość w hercach, t to czas w sekundach, a φ to kąt fazowy.", "Częstotliwość kątową ω mierzy się w radianach na sekundę.", "Zachowaj znak i ćwiartkę, gdy liczy się kierunek lub faza."]
                }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Trigonometry"
        },
        "concept-heat-capacity":  {
            "displayName": "Pojemność cieplna",
            "description": "Pojemność cieplna łączy przenoszoną energię ze zmianą temperatury obiektu lub materiału.",
            "summary": "Ile energii potrzebuje obiekt, aby zmienić temperaturę.",
            "sections": [ {
                    "id": "basic-relationships",
                    "title": "Podstawowe relacje",
                    "formulas": [ {
                            "expression": "C = Q / ΔT"
                        },  {
                            "expression": "Q = m × c × ΔT"
                        }],
                    "bullets": ["C to pojemność cieplna w J/K lub J/°C.", "Q to przekazana energia cieplna w dżulach (J).", "m to masa w kilogramach, a c to ciepło właściwe w J/(kg·K).", "Różnica temperatur wynosząca 1 K ma taką samą wielkość jak różnica 1°C."]
                },  {
                    "id": "worked-example",
                    "title": "Działający przykład",
                    "examples": [ {
                            "title": "Ogrzewanie wody",
                            "setup": "Podgrzej 0,20 kg wody od 20°C do 70°C stosując c = 4180 J/(kg·K).",
                            "formulas": ["ΔT = 70 - 20 = 50°C", "Q = 0,20 × 4180 × 50 = 41800 J"],
                            "conclusion": "Idealne zapotrzebowanie na energię wynosi 41,8 kJ; prawdziwy grzejnik potrzebuje więcej ze względu na straty."
                        }]
                },  {
                    "id": "electrical-heating",
                    "title": "Ogrzewanie energią elektryczną",
                    "formulas": [ {
                            "expression": "Q = P × t"
                        },  {
                            "expression": "t = m × c × ΔT / P"
                        }],
                    "examples": [ {
                            "title": "Idealny czas nagrzewania",
                            "setup": "Ogrzej przykład 41,8 kJ przy stałym źródle 100 W i bez strat.",
                            "formulas": ["t = 41 800 J / 100 W = 418 s"],
                            "conclusion": "Idealny czas to około 7,0 minut; przy sprawności transferu 80% wynosi to około 523 sekundy."
                        }]
                },  {
                    "id": "object-and-material",
                    "title": "Przedmiot kontra materiał",
                    "paragraphs": ["Pojemność cieplna należy do całego obiektu i zależy od ilości znajdującego się w nim materiału. Ciepło właściwe jest właściwością materiału. Podwojenie masy podwaja pojemność cieplną tego samego materiału."],
                    "formulas": [ {
                            "expression": "C_total = Σ m_i × c_i"
                        }]
                },  {
                    "id": "phase-changes-and-limits",
                    "title": "Przemiany fazowe i ograniczenia praktyczne",
                    "formulas": [ {
                            "expression": "Q = m × L"
                        }],
                    "paragraphs": ["Podczas topienia lub wrzenia dostarczona energia może zmienić stan materiału bez zmiany jego temperatury. L to ciepło właściwe utajone w J/kg.", "Proste równanie zakłada, że ciepło właściwe jest w przybliżeniu stałe. Straty ciepła, konwekcja, promieniowanie, parowanie, rezystancja styku i nierówna temperatura mogą sprawić, że rzeczywisty wynik będzie różnił się od idealnego."]
                }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_capacity"
        },
        "concept-heat-flux":  {
            "displayName": "Strumień ciepła",
            "description": "Strumień ciepła opisuje, jak szybko ciepło przepływa przez powierzchnię, niezależnie od całkowitej ilości materiału magazynującego ciepło.",
            "summary": "Szybkość przenikania ciepła przez jednostkę powierzchni.",
            "sections": [ {
                    "id": "definition",
                    "title": "Definicja",
                    "formulas": [ {
                            "expression": "q'' = Q_dot / A"
                        }],
                    "bullets": ["q'' to strumień ciepła w W/m².", "Q_dot to całkowity współczynnik przenikania ciepła w watach (W).", "A to powierzchnia, przez którą ciepło jest przekazywane w metrach kwadratowych (m²)."],
                    "paragraphs": ["Strumień ciepła różni się od pojemności cieplnej: pojemność cieplna opisuje zmagazynowaną energię na zmianę temperatury, podczas gdy strumień ciepła opisuje szybkość, z jaką ciepło przenika przez powierzchnię."]
                },  {
                    "id": "worked-example",
                    "title": "Działający przykład",
                    "examples": [ {
                            "title": "Średni strumień grzejnika",
                            "setup": "Grzejnik o mocy 100 W przekazuje ciepło przez powierzchnię 0,020 m².",
                            "formulas": ["q'' = 100 W / 0,020 m² = 5000 W/m²"],
                            "conclusion": "Średni strumień ciepła wynosi 5000 W/m², czyli 0,5 W/cm²."
                        }]
                },  {
                    "id": "conduction",
                    "title": "Przewodzenie przez płaską warstwę",
                    "formulas": [ {
                            "expression": "q'' = -k × ΔT / L"
                        },  {
                            "expression": "Q_dot = k × A × (T_hot - T_cold) / L"
                        }],
                    "bullets": ["k to przewodność cieplna w W/(m·K).", "ΔT jest różnicą temperatur w warstwie.", "L to grubość warstwy w metrach.", "Znak minus oznacza przepływ od temperatury wyższej do temperatury niższej."]
                },  {
                    "id": "convection-and-radiation",
                    "title": "Konwekcja i promieniowanie",
                    "formulas": [ {
                            "expression": "q'' = h × (T_s - T_∞)"
                        },  {
                            "expression": "q'' = ε × σ × (T_s^4 - T_sur^4)"
                        }],
                    "paragraphs": ["Konwekcja wykorzystuje współczynnik powierzchniowy h. Promieniowanie wykorzystuje emisyjność ε i stałą Stefana – Boltzmanna σ; temperatury w równaniu promieniowania muszą być temperaturami bezwzględnymi w stopniach Kelvina."]
                },  {
                    "id": "practical-checks",
                    "title": "Kontrole praktyczne",
                    "bullets": ["Przed użyciem W/m² przelicz powierzchnię na m².", "Odróżnij średni strumień ciepła od lokalnego szczytu; ogrzewanie może być nierówne.", "W razie potrzeby uwzględnij rezystancję styku, konwekcję, promieniowanie i straty ciepła.", "Strumień ciepła to szybkość przenikania, a nie temperatura; wykorzystuje pojemność cieplną do zmiany temperatury."]
                }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_flux"
        },
        "concept-si-system-and-imperial-units":  {
            "displayName": "Układ SI i miary imperialne",
            "description": "Międzynarodowy układ jednostek zapewnia spójne jednostki podstawowe, jednostki pochodne i skalowanie dziesiętne dla inżynierii.",
            "summary": "Jednostki, przedrostki i konwersje używane w obliczeniach inżynierskich.",
            "sections": [ {
                    "id": "base-units",
                    "title": "Typowe jednostki SI",
                    "table":  {
                        "headers": ["Ilość", "Jednostka SI", "Symbol"],
                        "rows": [["Długość", "metr", "m"], ["Msza św", "kilogram", "kg"], ["Czas", "drugi", "s"], ["Temperatura", "Kelwina", "K"], ["Prąd elektryczny", "amper", "A"], ["Ilość substancji", "kret", "mol"], ["Intensywność światła", "kandela", "płyta"]]
                    },
                    "bullets": ["Napięcie: wolty (V).", "Rezystancja: om (\\u03a9).", "Moc: wat (W).", "Energia: dżul (J).", "Siła: niuton (N).", "Ciśnienie: paskale (Pa).", "Częstotliwość: herc (Hz)."]
                },  {
                    "id": "decimal-prefixes",
                    "title": "Przedrostki dziesiętne",
                    "table":  {
                        "headers": ["Przedrostek", "Symbol", "Czynnik"],
                        "rows": [["kilo", "k", "1000 = 10^3"], ["mega", "M", "1 000 000 = 10^6"], ["mili", "m", "0,001 = 10^-3"], ["mikro", "μ", "0,000001 = 10^-6"], ["nano", "rz", "0,000000001 = 10^-9"]]
                    },
                    "paragraphs": ["Na przykład 2,2 k\\u03a9 równa się 2200 \\u03a9, a 15 mA równa się 0,015 A. Przed użyciem wzoru przekonwertuj wartości na zgodne jednostki."]
                },  {
                    "id": "length-conversions",
                    "title": "Cale i długość metryczna",
                    "formulas": [ {
                            "expression": "1 inch = 25.4 mm = 0.0254 m"
                        },  {
                            "expression": "1 foot = 12 inches = 0.3048 m"
                        },  {
                            "expression": "1 yard = 3 feet = 0.9144 m"
                        },  {
                            "expression": "1 in² = 645.16 mm²"
                        }],
                    "examples": [ {
                            "title": "Konwersja długości",
                            "setup": "Zamień 0,1 cala na milimetry i 5 mm na cale.",
                            "formulas": ["0,1 cala × 25,4 = 2,54 mm", "5 mm / 25,4 ≈ 0,19685 cala"],
                            "conclusion": "Do konwersji powierzchni i objętości wykorzystuje się współczynnik długości podniesiony do odpowiedniej potęgi."
                        }]
                },  {
                    "id": "other-conversions",
                    "title": "Inne popularne konwersje",
                    "bullets": ["1 funt ≈ 0,45359237 kg.", "1 funt siły ≈ 4,44822 N.", "1 psi ≈ 6894,76 Pa.", "°F = °C × 9/5 + 32.", "°C = (°F - 32) × 5/9.", "K = °C + 273,15."],
                    "paragraphs": ["Funt może odnosić się do masy (lb) lub siły (lbf), które są różnymi wielkościami. Podobnie cale, cale kwadratowe i cale sześcienne mierzą różne wymiary."]
                },  {
                    "id": "unit-checks",
                    "title": "Praktyczne sprawdzenie jednostek",
                    "bullets": ["Podczas obliczeń wpisz jednostkę obok każdej wartości.", "Sprawdź, czy obie strony równania mają zgodne wymiary.", "Konwertuj przed mnożeniem lub dzieleniem.", "Zaokrąglaj tylko na końcu, aby wyniki pośrednie zachowały przydatną precyzję."]
                }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/International_System_of_Units"
        },
        "concept-wire-gauges-awg-swg-bwg":  {
            "displayName": "Grubość drutu: AWG, SWG i BWG",
            "description": "Numer miernika opisuje rozmiar nominalny tylko wtedy, gdy wymieniony jest jego system mierników.",
            "summary": "Dlaczego numery przekrojów drutu wymagają nazwanego systemu i określonej średnicy.",
            "sections": [ {
                    "id": "gauge-systems",
                    "title": "Systemy pomiarowe",
                    "bullets": ["AWG to amerykański miernik drutu, znany również historycznie jako miernik Brown & Sharpe.", "SWG to Standard Wire Gauge, historyczny brytyjski system pomiaru grubości drutu i blachy.", "BWG to Birmingham Wire Gauge, historycznie używane do drutu żelaznego, rur i grubości blachy.", "Większy zwykły numer miernika zazwyczaj oznacza mniejszą średnicę; rozmiary powyżej skrajni 0 używają 00, 000 lub 0000."],
                    "paragraphs": ["SWG i BWG to systemy tabelaryczne i nie należy ich obliczać za pomocą wzoru AWG. Dlatego ten sam numer nie oznacza tej samej średnicy w różnych systemach."]
                },  {
                    "id": "awg-formula",
                    "title": "Średnica i powierzchnia AWG",
                    "formulas": [ {
                            "expression": "d_inch = 0.005 × 92^((36 - n) / 39)"
                        },  {
                            "expression": "d_mm = 0.127 × 92^((36 - n) / 39)"
                        },  {
                            "expression": "A = π × d^2 / 4"
                        }],
                    "paragraphs": ["Dla 1/0, 2/0, 3/0 i 4/0 użyj n = 0, -1, -2 i -3. AWG określa rozmiar przewodu, a nie uniwersalny prąd bezpieczny; obciążalność prądowa zależy również od materiału, izolacji, chłodzenia, instalacji i obowiązujących przepisów elektrycznych."]
                },  {
                    "id": "system-comparison",
                    "title": "Dlaczego nazwa systemu ma znaczenie",
                    "table":  {
                        "headers": ["Wskaźnik", "AWG", "Brytyjski SWG", "BWG"],
                        "rows": [["10", "2,588 mm", "3,251 mm", "3,404 mm"], ["20", "0,8128 mm", "0,9144 mm", "0,8890 mm"], ["30", "0,2540 mm", "0,3150 mm", "0,3048 mm"]]
                    },
                    "paragraphs": ["Wartości te są nominalne. Tolerancje produktu, powłoki, izolacja i konstrukcja linkowa mogą zmienić zmierzoną lub całkowitą średnicę."]
                },  {
                    "id": "resistance",
                    "title": "Wskaźnik, powierzchnia i rezystancja",
                    "formulas": [ {
                            "expression": "R = ρ × L / A"
                        }],
                    "paragraphs": ["Rezystancja zależy od długości przewodu L, pola przekroju poprzecznego A i rezystywności materiału ρ. Ponieważ powierzchnia zmienia się wraz z kwadratem średnicy, niewielka różnica średnicy może spowodować znaczną różnicę w rezystancji. W przypadku AWG zwiększenie grubości o trzy rozmiary w przybliżeniu zmniejsza powierzchnię o połowę i podwaja rezystancję na jednostkę długości dla tego samego materiału i temperatury."]
                },  {
                    "id": "practical-specification",
                    "title": "Praktyczna specyfikacja",
                    "bullets": ["Nazwij system, np. 24 AWG lub 24 British SWG.", "Jeżeli systemy mogą być pomylone, należy podać średnicę nominalną w milimetrach.", "Określ, czy wymiar dotyczy gołego przewodu, średnicy izolowanej, grubości blachy czy grubości ścianki rury.", "W przypadku przewodów linkowych należy uwzględnić konstrukcję żyły, gdy liczy się elastyczność i średnica całkowita.", "Określ pojemność prądową na podstawie danych produktu i przepisów elektrycznych, a nie na podstawie samego numeru miernika."]
                }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Wire_gauge"
        }
    },
    materials: materialPresentationsFor(materialTexts),
    batteries: batteryPresentationsFor(batteryTexts),
    mods: modPresentationsFor(modTexts)
} satisfies CatalogPresentationSet;
