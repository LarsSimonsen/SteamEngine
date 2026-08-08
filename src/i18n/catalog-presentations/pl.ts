import type { CatalogPresentationSet } from "../catalog-presentations";

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
    "materials":  {
        "ka1":  {
            "displayName": "Kanthal A1 / APM",
            "description": "Profil katalogowy dla Kanthal A1 / APM.",
            "summary": "Profil katalogowy dla Kanthal A1 / APM."
        },
        "ka":  {
            "displayName": "Kanthal A / AE / AF",
            "description": "Profil katalogowy dla Kanthal A / AE / AF.",
            "summary": "Profil katalogowy dla Kanthal A / AE / AF."
        },
        "kd":  {
            "displayName": "Kanthal D",
            "description": "Profil katalogowy dla Kanthal D.",
            "summary": "Profil katalogowy dla Kanthal D."
        },
        "n20":  {
            "displayName": "Nichrome N20",
            "description": "Profil katalogowy dla Nichrome N20.",
            "summary": "Profil katalogowy dla Nichrome N20."
        },
        "n40":  {
            "displayName": "Nichrome N40",
            "description": "Profil katalogowy dla Nichrome N40.",
            "summary": "Profil katalogowy dla Nichrome N40."
        },
        "n60":  {
            "displayName": "Nichrome N60 (C)",
            "description": "Profil katalogowy dla Nichrome N60 (C).",
            "summary": "Profil katalogowy dla Nichrome N60 (C)."
        },
        "n70":  {
            "displayName": "Nichrome N70 (B)",
            "description": "Profil katalogowy dla Nichrome N70 (B).",
            "summary": "Profil katalogowy dla Nichrome N70 (B)."
        },
        "n80":  {
            "displayName": "Nichrome N80 (A)",
            "description": "Profil katalogowy dla Nichrome N80 (A).",
            "summary": "Profil katalogowy dla Nichrome N80 (A)."
        },
        "ss304":  {
            "displayName": "SS 304",
            "description": "Profil katalogowy dla SS 304.",
            "summary": "Profil katalogowy dla SS 304."
        },
        "ss316":  {
            "displayName": "SS 316",
            "description": "Profil katalogowy dla SS 316.",
            "summary": "Profil katalogowy dla SS 316."
        },
        "ss316l":  {
            "displayName": "SS 316L / Elite",
            "description": "Profil katalogowy dla SS 316L / Elite.",
            "summary": "Profil katalogowy dla SS 316L / Elite."
        },
        "ss317l":  {
            "displayName": "SS 317L / Haywire",
            "description": "Profil katalogowy dla SS 317L / Haywire.",
            "summary": "Profil katalogowy dla SS 317L / Haywire."
        },
        "ss430":  {
            "displayName": "SS 430",
            "description": "Profil katalogowy dla SS 430.",
            "summary": "Profil katalogowy dla SS 430."
        },
        "ti1":  {
            "displayName": "Titanium 1",
            "description": "Profil katalogowy dla Titanium 1.",
            "summary": "Profil katalogowy dla Titanium 1."
        },
        "ti2":  {
            "displayName": "Titanium 2 (R50400)",
            "description": "Profil katalogowy dla Titanium 2 (R50400).",
            "summary": "Profil katalogowy dla Titanium 2 (R50400)."
        },
        "tie":  {
            "displayName": "Titanium ready (e-SG)",
            "description": "Profil katalogowy dla Titanium ready (e-SG).",
            "summary": "Profil katalogowy dla Titanium ready (e-SG)."
        },
        "w":  {
            "displayName": "Tungsten",
            "description": "Profil katalogowy dla Tungsten.",
            "summary": "Profil katalogowy dla Tungsten."
        },
        "nio":  {
            "displayName": "Niobium alloy",
            "description": "Profil katalogowy dla Niobium alloy.",
            "summary": "Profil katalogowy dla Niobium alloy."
        },
        "ni200":  {
            "displayName": "Nickel 200 / Ni200 (UNS N02200)",
            "description": "Profil katalogu dla Nickel 200 / Ni200 (UNS N02200).",
            "summary": "Profil katalogu dla Nickel 200 / Ni200 (UNS N02200)."
        },
        "nife30":  {
            "displayName": "NiFe30 (Resistherm - TFR)",
            "description": "Profil katalogowy dla NiFe30 (Resistherm - TFR).",
            "summary": "Profil katalogowy dla NiFe30 (Resistherm - TFR)."
        },
        "dicodes":  {
            "displayName": "NiFe30 (Resistherm - TCR)",
            "description": "Profil katalogowy dla NiFe30 (Resistherm - TCR).",
            "summary": "Profil katalogowy dla NiFe30 (Resistherm - TCR)."
        },
        "reactor":  {
            "displayName": "NiFe (Reactor Wire)",
            "description": "Profil katalogowy dla NiFe (Reactor Wire).",
            "summary": "Profil katalogowy dla NiFe (Reactor Wire)."
        },
        "nife30stealth":  {
            "displayName": "NiFe30 (StealthVape)",
            "description": "Profil katalogowy dla NiFe30 (StealthVape).",
            "summary": "Profil katalogowy dla NiFe30 (StealthVape)."
        },
        "nft70":  {
            "displayName": "Nifethal 70 (Alloy120)",
            "description": "Profil katalogowy dla Nifethal 70 (Alloy120).",
            "summary": "Profil katalogowy dla Nifethal 70 (Alloy120)."
        },
        "nft52":  {
            "displayName": "Nifethal 52 (Alloy52)",
            "description": "Profil katalogowy dla Nifethal 52 (Alloy52).",
            "summary": "Profil katalogowy dla Nifethal 52 (Alloy52)."
        },
        "zr":  {
            "displayName": "Zirconium (pure)",
            "description": "Profil katalogowy dla Zirconium (pure).",
            "summary": "Profil katalogowy dla Zirconium (pure)."
        },
        "n90":  {
            "displayName": "Nichrome N90 (Ni90Cr10)",
            "description": "Profil katalogowy dla Nichrome N90 (Ni90Cr10).",
            "summary": "Profil katalogowy dla Nichrome N90 (Ni90Cr10)."
        },
        "ss904l":  {
            "displayName": "SS 904L (UNS N08904)",
            "description": "Profil katalogowy dla SS 904L (UNS N08904).",
            "summary": "Profil katalogowy dla SS 904L (UNS N08904)."
        }
    },
    "batteries":  {
        "battery-1":  {
            "displayName": "AW IMR 14500",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-2":  {
            "displayName": "AW IMR 14500",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-3":  {
            "displayName": "AW IMR 16340",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-4":  {
            "displayName": "AW IMR 18350",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-5":  {
            "displayName": "AW IMR 18350",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-6":  {
            "displayName": "AW IMR 18490",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-7":  {
            "displayName": "AW IMR 18490",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-8":  {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-9":  {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-10":  {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-11":  {
            "displayName": "AWT 26650 4500mAh 75A",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-12":  {
            "displayName": "EH IMR 18350",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-13":  {
            "displayName": "EH IMR 18500",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-14":  {
            "displayName": "EH IMR 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-15":  {
            "displayName": "EH IMR 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-16":  {
            "displayName": "Efest IMR 18350",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-17":  {
            "displayName": "Efest IMR 18350",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-18":  {
            "displayName": "Efest IMR 18490",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-19":  {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-20":  {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-21":  {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-22":  {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-23":  {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-24":  {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-25":  {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-26":  {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-27":  {
            "displayName": "Efest IMR 18650 35A",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-28":  {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-29":  {
            "displayName": "Efest IMR 26650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-30":  {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": undefined,
            "summary": "Wewnętrzny akumulator w urządzeniu, a nie ogniwo wymieniane przez użytkownika.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-31":  {
            "displayName": "Innokin iTaste VV v3",
            "description": undefined,
            "summary": "Wewnętrzny akumulator w urządzeniu, a nie ogniwo wymieniane przez użytkownika.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-32":  {
            "displayName": "Keeppower IMR26650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-33":  {
            "displayName": "LG 18650HB6",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-34":  {
            "displayName": "LG 18650HE2",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-35":  {
            "displayName": "LG 18650HG2",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-36":  {
            "displayName": "MNKE IMR 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-37":  {
            "displayName": "MNKE IMR 26650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-38":  {
            "displayName": "MXJO IMR 18650 35A",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-39":  {
            "displayName": "MXJO IMR 18650 20A",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-40":  {
            "displayName": "Nitecore NL188",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-41":  {
            "displayName": "Orbtronic 18650 PD2900",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-42":  {
            "displayName": "Orbtronic 18650 SX22",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-43":  {
            "displayName": "Orbtronic 18650 SX30",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-44":  {
            "displayName": "Orbtronic 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-45":  {
            "displayName": "Orbtronic CGR18650CH",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-46":  {
            "displayName": "Orbtronic NCR18650A",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-47":  {
            "displayName": "Panasonic CGR18650CH",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-48":  {
            "displayName": "Panasonic NCR18650A",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-49":  {
            "displayName": "Panasonic NCR18650B",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-50":  {
            "displayName": "Panasonic NCR18650BD",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-51":  {
            "displayName": "Panasonic NCR18650PF",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-52":  {
            "displayName": "Panasonic CGR26650A",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-53":  {
            "displayName": "Samsung ICR18650-26F",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-54":  {
            "displayName": "Panasonic NCR18650PD",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-55":  {
            "displayName": "Samsung INR18650-20R",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-56":  {
            "displayName": "Samsung INR18650-25R",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-57":  {
            "displayName": "Samsung INR18650-20Q",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-58":  {
            "displayName": "Samsung INR18650-30Q",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-59":  {
            "displayName": "Sanyo UR16650ZTA",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-60":  {
            "displayName": "Sanyo UR18650EX",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-61":  {
            "displayName": "Sanyo UR18650F",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": "Akumulator o niskim poborze prądu; nie nadaje się do wapowania."
        },
        "battery-62":  {
            "displayName": "Sibeile IMR 18500",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-63":  {
            "displayName": "Sibeile IMR 18500",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-64":  {
            "displayName": "Sony US18650VTC3",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-65":  {
            "displayName": "Sony US18650VTC4",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-66":  {
            "displayName": "Sony US18650VTC5",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-67":  {
            "displayName": "Sony US18650v3",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-68":  {
            "displayName": "Sony US26650VT",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-69":  {
            "displayName": "Torchy IMR 18350",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-70":  {
            "displayName": "Vappower IMR 26650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-71":  {
            "displayName": "Vamped 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["20 A ocena ciągła; wartości tętna nie są używane."],
            "safetyText": undefined
        },
        "battery-72":  {
            "displayName": "UltraFire BRC 18650 4000mAh li-ion",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["Rzeczywista pojemność jest niższa niż sugeruje etykieta."],
            "safetyText": undefined
        },
        "battery-73":  {
            "displayName": "UltraFire XSL 18350 1200mAh",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["Rzeczywista pojemność jest niższa niż sugeruje etykieta."],
            "safetyText": undefined
        },
        "battery-74":  {
            "displayName": "Vamped 26650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-75":  {
            "displayName": "Xtar IMR 18350",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-76":  {
            "displayName": "Xtar IMR 18500",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-77":  {
            "displayName": "EVE INR18650/30P",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["20 Konserwatywna, niezależna wartość porównawcza; dokładne opakowanie i rewizja produkcji pozostają aktualne."],
            "safetyText": undefined
        },
        "battery-78":  {
            "displayName": "EVE INR18650/25P",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["15 Konserwatywna wartość z testów dokładnego modelu; przetestowana wersja oznaczona znakiem CCC pozostaje aktualna."],
            "safetyText": undefined
        },
        "battery-79":  {
            "displayName": "EVE INR18650/30PL",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["45 Niezależna wartość ciągła dla rewizji testowanych tabel; nie zastępuj wartości tętna."],
            "safetyText": undefined
        },
        "battery-80":  {
            "displayName": "Ampace JP30P1",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["36 Prawdziwa wartość ciągła; liczba 56 A jest ograniczona temperaturowo."],
            "safetyText": undefined
        },
        "battery-81":  {
            "displayName": "Tenpower INR18650-30XG",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["40 Wartość konserwatywna; testowane ogniwa wyglądały na przedprodukcyjne i brakowało im logo CCC."],
            "safetyText": undefined
        },
        "battery-82":  {
            "displayName": "EVE INR21700/58E",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["13 Zalecana wartość ciągła; 16,8 A to absolutne maksimum, które nie jest przeznaczone dla cyklu życia."],
            "safetyText": undefined
        },
        "battery-83":  {
            "displayName": "Reliance INR21700-RS40",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["40 Wartość konserwatywna; 70 A ma ograniczenie temperaturowe, a badane próbki były przedprodukcyjne."],
            "safetyText": undefined
        },
        "battery-84":  {
            "displayName": "Reliance INR21700-RS50",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["40 Wartość porównawcza ogniwa produkcyjnego; 70 A wymaga kontroli temperatury."],
            "safetyText": undefined
        },
        "battery-85":  {
            "displayName": "Vapcell S41",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["40 Wartość dokładnego opakowania; 70 A jest ograniczone do 60 C i testowane jako opakowanie EVE 40PL."],
            "safetyText": undefined
        },
        "battery-86":  {
            "displayName": "BAK 21700-65E",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["19 Wartość konserwatywna; dokładnie przetestowane próbki wyglądały na przedprodukcyjne i nie posiadały znaków CCC."],
            "safetyText": undefined
        },
        "battery-87":  {
            "displayName": "Tenpower INR21700-50XG",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["40 Wartość konserwatywna; 90 A ma ograniczenie temperaturowe, a testowane ogniwa pojawiły się przed produkcją."],
            "safetyText": undefined
        },
        "battery-88":  {
            "displayName": "Tenpower INR21700-60XG",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["40 Wartość konserwatywna; 60 A jest ograniczone temperaturowo, a ciągłość produkcji pozostaje nierozwiązana."],
            "safetyText": undefined
        },
        "battery-89":  {
            "displayName": "Great Power 50Q",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["40 Wartość konserwatywna; badane próbki miały różną pojemność i brakowało im znaków CCC/CE."],
            "safetyText": undefined
        },
        "battery-90":  {
            "displayName": "FEB 21700-68E",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["13 Wartość konserwatywna; dokładnie przetestowane próbki wyglądały na przedprodukcyjne i nie posiadały znaków CCC."],
            "safetyText": undefined
        },
        "battery-91":  {
            "displayName": "Reliance INR21700-RS60",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["30 Wartość ciągła oszacowana przez testera; Maksymalna wartość Reliance 50 A jest ograniczona temperaturą."],
            "safetyText": undefined
        },
        "battery-92":  {
            "displayName": "Reliance INR21700-RH60",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["20 Wartość ciągła z dwóch badanych partii produkcyjnych; 30 A jest ograniczone temperaturowo."],
            "safetyText": undefined
        },
        "battery-93":  {
            "displayName": "Amprius INR18650/40 (SA110)",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["12 A ciągły; 20 A jest tylko impulsowe. Dokładne przetestowane opakowanie jest rejestrowane jako SA110 / INR18650/40."],
            "safetyText": undefined
        },
        "battery-94":  {
            "displayName": "Vapcell B30 18650",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["20 Wartość dokładnego opakowania; tester zaleca poniżej 15 A ciągłego. Vapehuset reklamuje 25 A w tytule, a późniejsze źródła przepakowania lub wersje opakowania mogą się różnić."],
            "safetyText": undefined
        },
        "battery-95":  {
            "displayName": "Golisi S35 21700",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["30 A wartość dokładnie modelowa; jest to przeróbka i późniejsze wersje opakowania lub źródła mogą się różnić."],
            "safetyText": undefined
        },
        "battery-96":  {
            "displayName": "iJoy 20700 3000mAh five-leg",
            "description": undefined,
            "summary": "Wyjmowany akumulator używany w kompatybilnych urządzeniach.",
            "notes": ["30 Dokładna wartość rewizji dla pięciu nóg; wersje czteronożne i późniejsze, w których zastosowano tę samą owijkę, znacznie się od siebie różnią i nie mogą dziedziczyć tego profilu."],
            "safetyText": undefined
        }
    },
    "mods":  {
        "preset-1":  {
            "displayName": "AceSmok Ace 50",
            "description": "Regulowany profil urządzenia waporyzującego dla AceSmok Ace 50.",
            "summary": "Regulowany profil urządzenia waporyzującego dla AceSmok Ace 50."
        },
        "preset-2":  {
            "displayName": "Ante Meridiem Axis",
            "description": "Regulowany profil urządzenia waporyzującego dla Ante Meridiem Axis.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Ante Meridiem Axis."
        },
        "preset-3":  {
            "displayName": "Anyvape AnyMOD",
            "description": "Regulowany profil urządzenia waporyzującego dla Anyvape AnyMOD.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Anyvape AnyMOD."
        },
        "preset-4":  {
            "displayName": "Arrow 100W",
            "description": "Regulowany profil urządzenia waporyzującego dla Arrow 100W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Arrow 100W."
        },
        "preset-5":  {
            "displayName": "Artisan Supermax",
            "description": "Regulowany profil urządzenia waporyzującego dla Artisan Supermax.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Artisan Supermax."
        },
        "preset-6":  {
            "displayName": "Asmodus Snow Wolf 200W",
            "description": "Regulowany profil urządzenia waporyzującego dla Asmodus Snow Wolf 200W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Asmodus Snow Wolf 200W."
        },
        "preset-7":  {
            "displayName": "Aspire CF Sub Ohm",
            "description": "Regulowany profil urządzenia waporyzującego dla Aspire CF Sub Ohm.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Aspire CF Sub Ohm."
        },
        "preset-8":  {
            "displayName": "Beastmode Industries BMI 100 Watt V.1",
            "description": "Regulowany profil urządzenia waporyzującego dla Beastmode Industries BMI 100 Watt V.1.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Beastmode Industries BMI 100 Watt V.1."
        },
        "preset-9":  {
            "displayName": "Billet Box rev. 3a",
            "description": "Billet Box Rev. 3a z wykończeniem z piaskowanego i anodyzowanego aluminium; wprowadzony w maju 2014 r.",
            "summary": "Pudełko na kęsy Rev."
        },
        "preset-10":  {
            "displayName": "Cloupor DNA-30",
            "description": "Urządzenie Cloupor o mocy 30 W korzystające z chipsetu klonującego DNA30 innej firmy, a nie autentyczna płyta Evolv DNA-30D.",
            "summary": "Urządzenie Cloupor o mocy 30 W korzystające z chipsetu klonującego DNA30 innej firmy, a nie autentyczna płyta Evolv DNA-30D."
        },
        "preset-11":  {
            "displayName": "Cloupor DNA-50",
            "description": "Regulowany profil urządzenia waporyzującego dla Cloupor DNA-50.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Cloupor DNA-50."
        },
        "preset-12":  {
            "displayName": "Cloupor GT",
            "description": "Regulowany profil urządzenia waporyzującego dla Cloupor GT.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Cloupor GT."
        },
        "preset-13":  {
            "displayName": "Cloupor Mini",
            "description": "Regulowany profil urządzenia waporyzującego dla Cloupor Mini.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Cloupor Mini."
        },
        "preset-14":  {
            "displayName": "Cloupor T5",
            "description": "Regulowany profil urządzenia waporyzującego dla Cloupor T5.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Cloupor T5."
        },
        "preset-15":  {
            "displayName": "Cloupor T6",
            "description": "Regulowany profil urządzenia waporyzującego dla Cloupor T6.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Cloupor T6."
        },
        "preset-16":  {
            "displayName": "Cloupor T8",
            "description": "Regulowany profil urządzenia do waporyzacji dla Cloupor T8.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Cloupor T8."
        },
        "preset-17":  {
            "displayName": "Cloupor ZNA50",
            "description": "Regulowany profil urządzenia waporyzującego dla Cloupor ZNA50.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Cloupor ZNA50."
        },
        "preset-18":  {
            "displayName": "C-Tratech Smart Box 50W",
            "description": "Regulowany profil urządzenia waporyzującego dla C-Tratech Smart Box 50W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla C-Tratech Smart Box 50W."
        },
        "preset-19":  {
            "displayName": "Dicodes Dani Extreme",
            "description": "Regulowany profil urządzenia waporyzującego dla Dicodes Dani Extreme.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Dicodes Dani Extreme."
        },
        "preset-20":  {
            "displayName": "Dicodes Dani Extreme v2 / Pipeline Pro v2",
            "description": "Regulowany profil urządzenia waporyzującego dla Dicodes Dani Extreme v2 / Pipeline Pro v2.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Dicodes Dani Extreme v2 / Pipeline Pro v2."
        },
        "preset-21":  {
            "displayName": "DJK Wood Mods The Nerd VV",
            "description": "Regulowany profil urządzenia do waporyzacji dla DJK Wood Mods The Nerd VV.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla DJK Wood Mods The Nerd VV."
        },
        "preset-22":  {
            "displayName": "Dovpo DT-50",
            "description": "Regulowany profil urządzenia waporyzującego dla Dovpo DT-50.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Dovpo DT-50."
        },
        "preset-23":  {
            "displayName": "Dovpo E-LVT",
            "description": "Regulowany profil urządzenia waporyzującego dla Dovpo E-LVT.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Dovpo E-LVT."
        },
        "preset-24":  {
            "displayName": "Dovpo E-Mech",
            "description": "Regulowany profil urządzenia waporyzującego dla Dovpo E-Mech.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Dovpo E-Mech."
        },
        "preset-25":  {
            "displayName": "Dovpo TC 50",
            "description": "Regulowany profil urządzenia waporyzującego dla Dovpo TC 50.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Dovpo TC 50."
        },
        "preset-26":  {
            "displayName": "eGo Twist",
            "description": "Regulowany profil urządzenia waporyzującego dla eGo Twist.",
            "summary": "Regulowany profil urządzenia waporyzującego dla eGo Twist."
        },
        "preset-27":  {
            "displayName": "eGo-V V3",
            "description": "Regulowany profil urządzenia waporyzującego dla eGo-V V3.",
            "summary": "Regulowany profil urządzenia waporyzującego dla eGo-V V3."
        },
        "preset-28":  {
            "displayName": "Evod V v3",
            "description": "Regulowany profil urządzenia waporyzującego dla Evod V v3.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evod V v3."
        },
        "preset-29":  {
            "displayName": "Evolv DNA-20D",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-20D.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-20D."
        },
        "preset-30":  {
            "displayName": "Evolv DNA-30D",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-30D.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-30D."
        },
        "preset-31":  {
            "displayName": "Evolv DNA-40 (std. wire)",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-40 (std. wire).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-40 (std."
        },
        "preset-32":  {
            "displayName": "Evolv DNA-40 (Ni 200)",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-40 (Ni 200).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-40 (Ni 200)."
        },
        "preset-33":  {
            "displayName": "Evolv DNA60 (non-color)",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA60 (non-color).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA60 (non-color)."
        },
        "preset-34":  {
            "displayName": "Evolv DNA-75",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-75.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-75."
        },
        "preset-35":  {
            "displayName": "Evolv DNA-200 (2 cells, DNA-133)",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-200 (2 cells, DNA-133).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-200 (2 cells, DNA-133)."
        },
        "preset-36":  {
            "displayName": "Evolv DNA-200 (3 cells)",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-200 (3 cells).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-200 (3 cells)."
        },
        "preset-37":  {
            "displayName": "Evolv DNA-200 (TC mode)",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-200 (TC mode).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-200 (TC mode)."
        },
        "preset-38":  {
            "displayName": "Evolv DNA-250 (2 cells, DNA-166)",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-250 (2 cells, DNA-166).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-250 (2 cells, DNA-166)."
        },
        "preset-39":  {
            "displayName": "Evolv DNA-250 (3 cells)",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-250 (3 cells).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA-250 (3 cells)."
        },
        "preset-40":  {
            "displayName": "Evolv Kick 2",
            "description": "Regulowany profil urządzenia do waporyzacji dla Evolv Kick 2.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Evolv Kick 2."
        },
        "preset-41":  {
            "displayName": "Eleaf iStick",
            "description": "Regulowany profil urządzenia waporyzującego dla Eleaf iStick.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Eleaf iStick."
        },
        "preset-42":  {
            "displayName": "Eleaf iStick 30W",
            "description": "Regulowany profil urządzenia waporyzującego dla Eleaf iStick 30W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Eleaf iStick 30W."
        },
        "preset-43":  {
            "displayName": "Eleaf iStick 40W TC",
            "description": "Regulowany profil urządzenia waporyzującego dla Eleaf iStick 40W TC.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Eleaf iStick 40W TC."
        },
        "preset-44":  {
            "displayName": "Eleaf iStick 50W",
            "description": "Regulowany profil urządzenia do waporyzacji dla Eleaf iStick 50W.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Eleaf iStick 50W."
        },
        "preset-45":  {
            "displayName": "Eleaf iStick 100W",
            "description": "Regulowany profil urządzenia waporyzującego dla Eleaf iStick 100W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Eleaf iStick 100W."
        },
        "preset-46":  {
            "displayName": "Gossmods The Duke",
            "description": "Regulowany profil urządzenia waporyzującego dla Gossmods The Duke.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Gossmods The Duke."
        },
        "preset-47":  {
            "displayName": "Grand Innovations GI2",
            "description": "Regulowany profil urządzenia waporyzującego dla Grand Innovations GI2.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Grand Innovations GI2."
        },
        "preset-48":  {
            "displayName": "Heatvape Invader Mini",
            "description": "Regulowany profil urządzenia waporyzującego dla Heatvape Invader Mini.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Heatvape Invader Mini."
        },
        "preset-49":  {
            "displayName": "Heatvape Invader Mini (TC mode)",
            "description": "Regulowany profil urządzenia waporyzującego dla Heatvape Invader Mini (TC mode).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Heatvape Invader Mini (TC mode)."
        },
        "preset-50":  {
            "displayName": "iJoy A160",
            "description": "Regulowany profil urządzenia waporyzującego dla iJoy A160.",
            "summary": "Regulowany profil urządzenia waporyzującego dla iJoy A160."
        },
        "preset-51":  {
            "displayName": "Innokin Cool Fire II",
            "description": "Regulowany profil urządzenia waporyzującego dla Innokin Cool Fire II.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Innokin Cool Fire II."
        },
        "preset-52":  {
            "displayName": "Innokin Cool Fire IV",
            "description": "Regulowany profil urządzenia waporyzującego dla Innokin Cool Fire IV.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Innokin Cool Fire IV."
        },
        "preset-53":  {
            "displayName": "Innokin Disrupter",
            "description": "Regulowany profil urządzenia waporyzującego dla Innokin Disrupter.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Innokin Disrupter."
        },
        "preset-54":  {
            "displayName": "Innokin iTaste 134 / iTaste 134 mini",
            "description": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste 134 / iTaste 134 mini.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste 134 / iTaste 134 mini."
        },
        "preset-55":  {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste MVP 2.0.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste MVP 2.0."
        },
        "preset-56":  {
            "displayName": "Innokin iTaste MVP 20 Watt",
            "description": "Regulowany profil urządzenia do waporyzacji dla Innokin iTaste MVP 20 Watt.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Innokin iTaste MVP 20 Watt."
        },
        "preset-57":  {
            "displayName": "Innokin iTaste MVP 3.0",
            "description": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste MVP 3.0.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste MVP 3.0."
        },
        "preset-58":  {
            "displayName": "Innokin iTaste MVP 3 Pro",
            "description": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste MVP 3 Pro.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste MVP 3 Pro."
        },
        "preset-59":  {
            "displayName": "Innokin iTaste SVD",
            "description": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste SVD.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste SVD."
        },
        "preset-60":  {
            "displayName": "Innokin iTaste SVD2",
            "description": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste SVD2.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste SVD2."
        },
        "preset-61":  {
            "displayName": "Innokin iTaste VTR",
            "description": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste VTR.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste VTR."
        },
        "preset-62":  {
            "displayName": "Innokin iTaste VV V3.0",
            "description": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste VV V3.0.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Innokin iTaste VV V3.0."
        },
        "preset-63":  {
            "displayName": "Joy4life Beyang 30W",
            "description": "Regulowany profil urządzenia waporyzującego dla Joy4life Beyang 30W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Joy4life Beyang 30W."
        },
        "preset-64":  {
            "displayName": "Joyetech eCom Supreme",
            "description": "Regulowany profil urządzenia waporyzującego dla Joyetech eCom Supreme.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Joyetech eCom Supreme."
        },
        "preset-65":  {
            "displayName": "Joyetech eVic",
            "description": "Regulowany profil urządzenia waporyzującego dla Joyetech eVic.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Joyetech eVic."
        },
        "preset-66":  {
            "displayName": "Joyetech eVic VT",
            "description": "Regulowany profil urządzenia waporyzującego dla Joyetech eVic VT.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Joyetech eVic VT."
        },
        "preset-67":  {
            "displayName": "Joyetech eVic VT (TC mode)",
            "description": "Regulowany profil urządzenia waporyzującego dla Joyetech eVic VT (TC mode).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Joyetech eVic VT (TC mode)."
        },
        "preset-68":  {
            "displayName": "Joyetech eVic Supreme",
            "description": "Regulowany profil urządzenia waporyzującego dla Joyetech eVic Supreme.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Joyetech eVic Supreme."
        },
        "preset-69":  {
            "displayName": "J Well Alesia",
            "description": "Regulowany profil urządzenia waporyzującego dla J Well Alesia.",
            "summary": "Regulowany profil urządzenia waporyzującego dla J Well Alesia."
        },
        "preset-70":  {
            "displayName": "J Well Troca",
            "description": "Regulowany profil urządzenia waporyzującego dla J Well Troca.",
            "summary": "Regulowany profil urządzenia waporyzującego dla J Well Troca."
        },
        "preset-71":  {
            "displayName": "Kanger e-Power v3",
            "description": "Regulowany profil urządzenia waporyzującego dla Kanger e-Power v3.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Kanger e-Power v3."
        },
        "preset-72":  {
            "displayName": "Kanger IPOW 2",
            "description": "Regulowany profil urządzenia waporyzującego dla Kanger IPOW 2.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Kanger IPOW 2."
        },
        "preset-73":  {
            "displayName": "Kanger KBOX",
            "description": "Regulowany profil urządzenia waporyzującego dla Kanger KBOX.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Kanger KBOX."
        },
        "preset-74":  {
            "displayName": "Kanger KBOX Mini / SUBOX Mini",
            "description": "Regulowany profil urządzenia waporyzującego dla Kanger KBOX Mini / SUBOX Mini.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Kanger KBOX Mini / SUBOX Mini."
        },
        "preset-75":  {
            "displayName": "Kanger K-Simar 20",
            "description": "Regulowany profil urządzenia waporyzującego dla Kanger K-Simar 20.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Kanger K-Simar 20."
        },
        "preset-76":  {
            "displayName": "Kangside e-Huge",
            "description": "Regulowany profil urządzenia waporyzującego dla Kangside e-Huge.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Kangside e-Huge."
        },
        "preset-77":  {
            "displayName": "Kamry 20",
            "description": "Regulowany profil urządzenia waporyzującego dla Kamry 20.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Kamry 20."
        },
        "preset-78":  {
            "displayName": "Kamry 60W",
            "description": "Regulowany profil urządzenia waporyzującego dla Kamry 60W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Kamry 60W."
        },
        "preset-79":  {
            "displayName": "Kamry God Box",
            "description": "Regulowany profil urządzenia waporyzującego dla Kamry God Box.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Kamry God Box."
        },
        "preset-80":  {
            "displayName": "KangXin VF clone v3",
            "description": "Regulowany profil urządzenia waporyzującego dla KangXin VF clone v3.",
            "summary": "Regulowany profil urządzenia waporyzującego dla KangXin VF clone v3."
        },
        "preset-81":  {
            "displayName": "KangXin KX5-50W",
            "description": "Regulowany profil urządzenia waporyzującego dla KangXin KX5-50W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla KangXin KX5-50W."
        },
        "preset-82":  {
            "displayName": "Koopor Mini KP60",
            "description": "Regulowany profil urządzenia waporyzującego dla Koopor Mini KP60.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Koopor Mini KP60."
        },
        "preset-83":  {
            "displayName": "Koopor Mini KP60 (TC)",
            "description": "Regulowany profil urządzenia waporyzującego dla Koopor Mini KP60 (TC).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Koopor Mini KP60 (TC)."
        },
        "preset-84":  {
            "displayName": "KSD 30",
            "description": "Regulowany profil urządzenia waporyzującego dla KSD 30.",
            "summary": "Regulowany profil urządzenia waporyzującego dla KSD 30."
        },
        "preset-85":  {
            "displayName": "KSD Kmax (single battery)",
            "description": "Regulowany profil urządzenia do waporyzacji dla KSD Kmax (single battery).",
            "summary": "Regulowany profil urządzenia do waporyzacji dla KSD Kmax (single battery)."
        },
        "preset-86":  {
            "displayName": "KSD Kmax (stacked)",
            "description": "Regulowany profil urządzenia waporyzującego dla KSD Kmax (stacked).",
            "summary": "Regulowany profil urządzenia waporyzującego dla KSD Kmax (stacked)."
        },
        "preset-87":  {
            "displayName": "L-Rider Lambo 6.0",
            "description": "Regulowany profil urządzenia waporyzującego dla L-Rider Lambo 6.0.",
            "summary": "Regulowany profil urządzenia waporyzującego dla L-Rider Lambo 6.0."
        },
        "preset-88":  {
            "displayName": "L-Rider Lavatube",
            "description": "Regulowany profil urządzenia waporyzującego dla L-Rider Lavatube.",
            "summary": "Regulowany profil urządzenia waporyzującego dla L-Rider Lavatube."
        },
        "preset-89":  {
            "displayName": "Lotus Jellyfish",
            "description": "Regulowany profil urządzenia waporyzującego dla Lotus Jellyfish.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Lotus Jellyfish."
        },
        "preset-90":  {
            "displayName": "Lotus LE80",
            "description": "Regulowany profil urządzenia waporyzującego dla Lotus LE80.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Lotus LE80."
        },
        "preset-91":  {
            "displayName": "Luxyoun Smaug",
            "description": "Regulowany profil urządzenia waporyzującego dla Luxyoun Smaug.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Luxyoun Smaug."
        },
        "preset-92":  {
            "displayName": "Majesty 150W",
            "description": "Regulowany profil urządzenia waporyzującego dla Majesty 150W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Majesty 150W."
        },
        "preset-93":  {
            "displayName": "Megatron 260",
            "description": "Regulowany profil urządzenia waporyzującego dla Megatron 260.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Megatron 260."
        },
        "preset-94":  {
            "displayName": "Naos Raptor 10A",
            "description": "Regulowany profil urządzenia waporyzującego dla Naos Raptor 10A.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Naos Raptor 10A."
        },
        "preset-95":  {
            "displayName": "Naos Raptor 20A",
            "description": "Regulowany profil urządzenia waporyzującego dla Naos Raptor 20A.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Naos Raptor 20A."
        },
        "preset-96":  {
            "displayName": "Nivel V3",
            "description": "Regulowany profil urządzenia do waporyzacji dla Nivel V3.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Nivel V3."
        },
        "preset-97":  {
            "displayName": "Notcigs VV",
            "description": "Regulowany profil urządzenia waporyzującego dla Notcigs VV.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Notcigs VV."
        },
        "preset-98":  {
            "displayName": "OKL2-T/20-W12",
            "description": "Regulowany profil urządzenia waporyzującego dla OKL2-T/20-W12.",
            "summary": "Regulowany profil urządzenia waporyzującego dla OKL2-T/20-W12."
        },
        "preset-99":  {
            "displayName": "OKR-T10",
            "description": "Regulowany profil urządzenia waporyzującego dla OKR-T10.",
            "summary": "Regulowany profil urządzenia waporyzującego dla OKR-T10."
        },
        "preset-100":  {
            "displayName": "Pioneer4You/Green Leaf P-Max",
            "description": "Regulowany profil urządzenia do waporyzacji dla Pioneer4You/Green Leaf P-Max.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Pioneer4You/Green Leaf P-Max."
        },
        "preset-101":  {
            "displayName": "ProVari 2, ProVari 2.5",
            "description": "Regulowany profil urządzenia waporyzującego dla ProVari 2, ProVari 2.5.",
            "summary": "Regulowany profil urządzenia waporyzującego dla ProVari 2, ProVari 2.5."
        },
        "preset-102":  {
            "displayName": "ProVari P3 beta",
            "description": "Regulowany profil urządzenia waporyzującego dla ProVari P3 beta.",
            "summary": "Regulowany profil urządzenia waporyzującego dla ProVari P3 beta."
        },
        "preset-103":  {
            "displayName": "ProVari P35",
            "description": "Regulowany profil urządzenia waporyzującego dla ProVari P35.",
            "summary": "Regulowany profil urządzenia waporyzującego dla ProVari P35."
        },
        "preset-104":  {
            "displayName": "Psmoke GI2",
            "description": "Regulowany profil urządzenia do waporyzacji dla Psmoke GI2.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Psmoke GI2."
        },
        "preset-105":  {
            "displayName": "RainbowHeaven Arrow",
            "description": "Regulowany profil urządzenia waporyzującego dla RainbowHeaven Arrow.",
            "summary": "Regulowany profil urządzenia waporyzującego dla RainbowHeaven Arrow."
        },
        "preset-106":  {
            "displayName": "Robbot Tech ZNA50",
            "description": "Regulowany profil urządzenia waporyzującego dla Robbot Tech ZNA50.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Robbot Tech ZNA50."
        },
        "preset-107":  {
            "displayName": "Sigelei 20W",
            "description": "Regulowany profil urządzenia waporyzującego dla Sigelei 20W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Sigelei 20W."
        },
        "preset-108":  {
            "displayName": "Sigelei 50W",
            "description": "Regulowany profil urządzenia waporyzującego dla Sigelei 50W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Sigelei 50W."
        },
        "preset-109":  {
            "displayName": "Sigelei 75W TC",
            "description": "Regulowany profil urządzenia waporyzującego dla Sigelei 75W TC.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Sigelei 75W TC."
        },
        "preset-110":  {
            "displayName": "Sigelei 150W",
            "description": "Regulowany profil urządzenia do waporyzacji dla Sigelei 150W.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Sigelei 150W."
        },
        "preset-111":  {
            "displayName": "Sigelei Fuchai 213 Plus",
            "description": "Regulowany profil urządzenia waporyzującego dla Sigelei Fuchai 213 Plus.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Sigelei Fuchai 213 Plus."
        },
        "preset-112":  {
            "displayName": "Sigelei Kick",
            "description": "Regulowany profil urządzenia waporyzującego dla Sigelei Kick.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Sigelei Kick."
        },
        "preset-113":  {
            "displayName": "Sigelei Legend v2",
            "description": "Regulowany profil urządzenia waporyzującego dla Sigelei Legend v2.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Sigelei Legend v2."
        },
        "preset-114":  {
            "displayName": "Sigelei Vmax",
            "description": "Regulowany profil urządzenia do waporyzacji dla Sigelei Vmax.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Sigelei Vmax."
        },
        "preset-115":  {
            "displayName": "Sigelei Zmax V3",
            "description": "Regulowany profil urządzenia waporyzującego dla Sigelei Zmax V3.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Sigelei Zmax V3."
        },
        "preset-116":  {
            "displayName": "Sigelei Zmax V5",
            "description": "Regulowany profil urządzenia waporyzującego dla Sigelei Zmax V5.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Sigelei Zmax V5."
        },
        "preset-117":  {
            "displayName": "Simeiyue God 180",
            "description": "Regulowany profil urządzenia do waporyzacji dla Simeiyue God 180.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Simeiyue God 180."
        },
        "preset-118":  {
            "displayName": "Simeiyue God 180s",
            "description": "Regulowany profil urządzenia do waporyzacji dla Simeiyue God 180s.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Simeiyue God 180s."
        },
        "preset-119":  {
            "displayName": "Simeiyue God 260",
            "description": "Regulowany profil urządzenia waporyzującego dla Simeiyue God 260.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Simeiyue God 260."
        },
        "preset-120":  {
            "displayName": "Smok Ace",
            "description": "Regulowany profil urządzenia waporyzującego dla Smok Ace.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Smok Ace."
        },
        "preset-121":  {
            "displayName": "Smok BEC Pro",
            "description": "Regulowany profil urządzenia waporyzującego dla Smok BEC Pro.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Smok BEC Pro."
        },
        "preset-122":  {
            "displayName": "Smok G-Priv 220W",
            "description": "Regulowany profil urządzenia waporyzującego dla Smok G-Priv 220W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Smok G-Priv 220W."
        },
        "preset-123":  {
            "displayName": "Smok Sid",
            "description": "Regulowany profil urządzenia waporyzującego dla Smok Sid.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Smok Sid."
        },
        "preset-124":  {
            "displayName": "Smok X Cube II",
            "description": "Regulowany profil urządzenia waporyzującego dla Smok X Cube II.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Smok X Cube II."
        },
        "preset-125":  {
            "displayName": "Smok X Pro BT50",
            "description": "Regulowany profil urządzenia waporyzującego dla Smok X Pro BT50.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Smok X Pro BT50."
        },
        "preset-126":  {
            "displayName": "Smok X Pro M36",
            "description": "Regulowany profil urządzenia waporyzującego dla Smok X Pro M36.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Smok X Pro M36."
        },
        "preset-127":  {
            "displayName": "Smok X Pro M50",
            "description": "Regulowany profil urządzenia waporyzującego dla Smok X Pro M50.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Smok X Pro M50."
        },
        "preset-128":  {
            "displayName": "Smok X Pro M80",
            "description": "Regulowany profil urządzenia waporyzującego dla Smok X Pro M80.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Smok X Pro M80."
        },
        "preset-129":  {
            "displayName": "Smok Zmax",
            "description": "Regulowany profil urządzenia waporyzującego dla Smok Zmax.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Smok Zmax."
        },
        "preset-130":  {
            "displayName": "Smok Zmax Mini",
            "description": "Regulowany profil urządzenia waporyzującego dla Smok Zmax Mini.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Smok Zmax Mini."
        },
        "preset-131":  {
            "displayName": "SMY 260W",
            "description": "Regulowany profil urządzenia waporyzującego dla SMY 260W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla SMY 260W."
        },
        "preset-132":  {
            "displayName": "SMY 50TC",
            "description": "Regulowany profil urządzenia waporyzującego dla SMY 50TC.",
            "summary": "Regulowany profil urządzenia waporyzującego dla SMY 50TC."
        },
        "preset-133":  {
            "displayName": "SMY GOD 180",
            "description": "Regulowany profil urządzenia waporyzującego dla SMY GOD 180.",
            "summary": "Regulowany profil urządzenia waporyzującego dla SMY GOD 180."
        },
        "preset-134":  {
            "displayName": "Steam STM-1 / STM-2",
            "description": "Regulowany profil urządzenia do waporyzacji dla Steam STM-1 / STM-2.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Steam STM-1 / STM-2."
        },
        "preset-135":  {
            "displayName": "Sunzip Vapmod Deezel",
            "description": "Regulowany profil urządzenia waporyzującego dla Sunzip Vapmod Deezel.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Sunzip Vapmod Deezel."
        },
        "preset-136":  {
            "displayName": "Taifun The Eye",
            "description": "Regulowany profil urządzenia waporyzującego dla Taifun The Eye.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Taifun The Eye."
        },
        "preset-137":  {
            "displayName": "Taifun The Eye (updated)",
            "description": "Regulowany profil urządzenia do waporyzacji dla Taifun The Eye (updated).",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Taifun The Eye (updated)."
        },
        "preset-138":  {
            "displayName": "Tesla",
            "description": "Regulowany profil urządzenia do waporyzacji dla Tesla.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Tesla."
        },
        "preset-139":  {
            "displayName": "Tesla 120W",
            "description": "Regulowany profil urządzenia waporyzującego dla Tesla 120W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Tesla 120W."
        },
        "preset-140":  {
            "displayName": "Tesla 2 Sub Mod",
            "description": "Regulowany profil urządzenia waporyzującego dla Tesla 2 Sub Mod.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Tesla 2 Sub Mod."
        },
        "preset-141":  {
            "displayName": "Tesla Spider",
            "description": "Regulowany profil urządzenia waporyzującego dla Tesla Spider.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Tesla Spider."
        },
        "preset-142":  {
            "displayName": "Tobeco ZNA 36",
            "description": "Regulowany profil urządzenia waporyzującego dla Tobeco ZNA 36.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Tobeco ZNA 36."
        },
        "preset-143":  {
            "displayName": "Vamo 35W (clone)",
            "description": "Regulowany profil urządzenia waporyzującego dla Vamo 35W (clone).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Vamo 35W (clone)."
        },
        "preset-144":  {
            "displayName": "Vamo V1 / V2 / V3 / V5",
            "description": "Regulowany profil urządzenia do waporyzacji dla Vamo V1 / V2 / V3 / V5.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Vamo V1 / V2 / V3 / V5."
        },
        "preset-145":  {
            "displayName": "Vamo V7",
            "description": "Regulowany profil urządzenia waporyzującego dla Vamo V7.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Vamo V7."
        },
        "preset-146":  {
            "displayName": "VaporFi Vox II",
            "description": "Regulowany profil urządzenia waporyzującego dla VaporFi Vox II.",
            "summary": "Regulowany profil urządzenia waporyzującego dla VaporFi Vox II."
        },
        "preset-147":  {
            "displayName": "Vicious Ant VariAnt 120W",
            "description": "Regulowany profil urządzenia waporyzującego dla Vicious Ant VariAnt 120W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Vicious Ant VariAnt 120W."
        },
        "preset-148":  {
            "displayName": "Vicious Ant VariAnt 250W",
            "description": "Regulowany profil urządzenia waporyzującego dla Vicious Ant VariAnt 250W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Vicious Ant VariAnt 250W."
        },
        "preset-149":  {
            "displayName": "Vision Spinner / Spinner II",
            "description": "Regulowany profil urządzenia waporyzującego dla Vision Spinner / Spinner II.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Vision Spinner / Spinner II."
        },
        "preset-150":  {
            "displayName": "Vision X.Fir/X.Gun",
            "description": "Regulowany profil urządzenia do waporyzacji dla Vision X.Fir/X.Gun.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Vision X.Fir/X.Gun."
        },
        "preset-151":  {
            "displayName": "Volcano Lavatube",
            "description": "Regulowany profil urządzenia waporyzującego dla Volcano Lavatube.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Volcano Lavatube."
        },
        "preset-152":  {
            "displayName": "Volcano Lavatube v2.5",
            "description": "Regulowany profil urządzenia waporyzującego dla Volcano Lavatube v2.5.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Volcano Lavatube v2.5."
        },
        "preset-153":  {
            "displayName": "Wismec Reuleaux RX200S (4.10)",
            "description": "Regulowany profil urządzenia waporyzującego dla Wismec Reuleaux RX200S (4.10).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Wismec Reuleaux RX200S (4.10)."
        },
        "preset-154":  {
            "displayName": "YiHi SX130",
            "description": "Regulowany profil urządzenia do waporyzacji dla YiHi SX130.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla YiHi SX130."
        },
        "preset-155":  {
            "displayName": "YiHi SX130 v1.5",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX130 v1.5.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX130 v1.5."
        },
        "preset-156":  {
            "displayName": "YiHi SX130H",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX130H.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX130H."
        },
        "preset-157":  {
            "displayName": "YiHi SX220",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX220.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX220."
        },
        "preset-158":  {
            "displayName": "YiHi SX300",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX300.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX300."
        },
        "preset-159":  {
            "displayName": "YiHi SX330 V1 35W",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX330 V1 35W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX330 V1 35W."
        },
        "preset-160":  {
            "displayName": "YiHi SX330 V2 50W",
            "description": "Regulowany profil urządzenia do waporyzacji dla YiHi SX330 V2 50W.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla YiHi SX330 V2 50W."
        },
        "preset-161":  {
            "displayName": "YiHi SX330 V2C 70W",
            "description": "Regulowany profil urządzenia do waporyzacji dla YiHi SX330 V2C 70W.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla YiHi SX330 V2C 70W."
        },
        "preset-162":  {
            "displayName": "YiHi SX330 V2 S 60W",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX330 V2 S 60W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX330 V2 S 60W."
        },
        "preset-163":  {
            "displayName": "YiHi SX330 V3 100W",
            "description": "Regulowany profil urządzenia do waporyzacji dla YiHi SX330 V3 100W.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla YiHi SX330 V3 100W."
        },
        "preset-164":  {
            "displayName": "YiHi SX330 V3 150W",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX330 V3 150W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX330 V3 150W."
        },
        "preset-165":  {
            "displayName": "YiHi SX330 V3S 150W",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX330 V3S 150W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX330 V3S 150W."
        },
        "preset-166":  {
            "displayName": "YiHi SX330-V3Si 200W",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX330-V3Si 200W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX330-V3Si 200W."
        },
        "preset-167":  {
            "displayName": "YiHi SX330 V4S 100W",
            "description": "Regulowany profil urządzenia do waporyzacji dla YiHi SX330 V4S 100W.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla YiHi SX330 V4S 100W."
        },
        "preset-168":  {
            "displayName": "YiHi SX350 30W",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX350 30W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX350 30W."
        },
        "preset-169":  {
            "displayName": "YiHi SX350 50W",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX350 50W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX350 50W."
        },
        "preset-170":  {
            "displayName": "YiHi SX350 100W",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX350 100W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX350 100W."
        },
        "preset-171":  {
            "displayName": "YiHi SX350J VJ mode",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX350J VJ mode.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX350J VJ mode."
        },
        "preset-172":  {
            "displayName": "YiHi SX350J VW/single batt mode",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX350J VW/single batt mode.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX350J VW/single batt mode."
        },
        "preset-173":  {
            "displayName": "YiHi SX350J VW/dual batt mode",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX350J VW/dual batt mode.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX350J VW/dual batt mode."
        },
        "preset-174":  {
            "displayName": "YiHi SX470",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX470.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX470."
        },
        "preset-175":  {
            "displayName": "YiHi SX450",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX450.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX450."
        },
        "preset-176":  {
            "displayName": "YiHi SXMini",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SXMini.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SXMini."
        },
        "preset-177":  {
            "displayName": "Beyond Vape Solara",
            "description": "Regulowany profil urządzenia do waporyzacji dla Beyond Vape Solara.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Beyond Vape Solara."
        },
        "preset-178":  {
            "displayName": "Cana Modz",
            "description": "Regulowany profil urządzenia waporyzującego dla Cana Modz.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Cana Modz."
        },
        "preset-179":  {
            "displayName": "Craving Vapor HexOhm",
            "description": "Regulowany profil urządzenia waporyzującego dla Craving Vapor HexOhm.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Craving Vapor HexOhm."
        },
        "preset-180":  {
            "displayName": "Craving Vapor HexOhm V2",
            "description": "Regulowany profil urządzenia waporyzującego dla Craving Vapor HexOhm V2.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Craving Vapor HexOhm V2."
        },
        "preset-181":  {
            "displayName": "Hana Modz V3",
            "description": "Regulowany profil urządzenia waporyzującego dla Hana Modz V3.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Hana Modz V3."
        },
        "preset-182":  {
            "displayName": "Hana Modz DNA 40",
            "description": "Regulowany profil urządzenia waporyzującego dla Hana Modz DNA 40.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Hana Modz DNA 40."
        },
        "preset-183":  {
            "displayName": "Lost Vape Therion DNA 75",
            "description": "Regulowany profil urządzenia waporyzującego dla Lost Vape Therion DNA 75.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Lost Vape Therion DNA 75."
        },
        "preset-184":  {
            "displayName": "Lost Vape Therion DNA 133",
            "description": "Regulowany profil urządzenia do waporyzacji dla Lost Vape Therion DNA 133.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Lost Vape Therion DNA 133."
        },
        "preset-185":  {
            "displayName": "Lost Vape Therion DNA 166",
            "description": "Regulowany profil urządzenia waporyzującego dla Lost Vape Therion DNA 166.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Lost Vape Therion DNA 166."
        },
        "preset-186":  {
            "displayName": "Notcigs Buzz Pro",
            "description": "Regulowany profil urządzenia waporyzującego dla Notcigs Buzz Pro.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Notcigs Buzz Pro."
        },
        "preset-187":  {
            "displayName": "Pioneer4You/Green Leaf Seven 22",
            "description": "Regulowany profil urządzenia do waporyzacji dla Pioneer4You/Green Leaf Seven 22.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Pioneer4You/Green Leaf Seven 22."
        },
        "preset-188":  {
            "displayName": "Pioneer4You/Green Leaf Seven 30W",
            "description": "Regulowany profil urządzenia do waporyzacji dla Pioneer4You/Green Leaf Seven 30W.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Pioneer4You/Green Leaf Seven 30W."
        },
        "preset-189":  {
            "displayName": "Pioneer4You/Green Leaf IPV",
            "description": "Regulowany profil urządzenia do waporyzacji dla Pioneer4You/Green Leaf IPV.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Pioneer4You/Green Leaf IPV."
        },
        "preset-190":  {
            "displayName": "Pioneer4You/Green Leaf IPV D2",
            "description": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV D2.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV D2."
        },
        "preset-191":  {
            "displayName": "Pioneer4You/Green Leaf IPV Mini",
            "description": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV Mini.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV Mini."
        },
        "preset-192":  {
            "displayName": "Pioneer4You/Green Leaf IPV Mini 2",
            "description": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV Mini 2.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV Mini 2."
        },
        "preset-193":  {
            "displayName": "Pioneer4You/Green Leaf IPV V2",
            "description": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV V2.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV V2."
        },
        "preset-194":  {
            "displayName": "Pioneer4You/Green Leaf IPV V2S",
            "description": "Regulowany profil urządzenia do waporyzacji dla Pioneer4You/Green Leaf IPV V2S.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Pioneer4You/Green Leaf IPV V2S."
        },
        "preset-195":  {
            "displayName": "Pioneer4You/Green Leaf IPV V3 100W",
            "description": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV V3 100W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV V3 100W."
        },
        "preset-196":  {
            "displayName": "Pioneer4You/Green Leaf IPV V3 150W",
            "description": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV V3 150W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV V3 150W."
        },
        "preset-197":  {
            "displayName": "Pioneer4You/Green Leaf IPV V3 200W",
            "description": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV V3 200W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV V3 200W."
        },
        "preset-198":  {
            "displayName": "Pioneer4You/Green Leaf IPV V4 100W",
            "description": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV V4 100W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Pioneer4You/Green Leaf IPV V4 100W."
        },
        "preset-199":  {
            "displayName": "Protovapor XPV DNA-20D",
            "description": "Regulowany profil urządzenia waporyzującego dla Protovapor XPV DNA-20D.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Protovapor XPV DNA-20D."
        },
        "preset-200":  {
            "displayName": "Protovapor XPV DNA-30D",
            "description": "Regulowany profil urządzenia waporyzującego dla Protovapor XPV DNA-30D.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Protovapor XPV DNA-30D."
        },
        "preset-201":  {
            "displayName": "Protovapor XPV DNA-40D",
            "description": "Regulowany profil urządzenia waporyzującego dla Protovapor XPV DNA-40D.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Protovapor XPV DNA-40D."
        },
        "preset-202":  {
            "displayName": "Raffmods Ranger",
            "description": "Regulowany profil urządzenia waporyzującego dla Raffmods Ranger.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Raffmods Ranger."
        },
        "preset-203":  {
            "displayName": "Reo VV Grand/Woodvil",
            "description": "Regulowany profil urządzenia do waporyzacji dla Reo VV Grand/Woodvil.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Reo VV Grand/Woodvil."
        },
        "preset-204":  {
            "displayName": "Sigelei 30W",
            "description": "Regulowany profil urządzenia waporyzującego dla Sigelei 30W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Sigelei 30W."
        },
        "preset-205":  {
            "displayName": "Sigelei Raptor",
            "description": "Regulowany profil urządzenia waporyzującego dla Sigelei Raptor.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Sigelei Raptor."
        },
        "preset-206":  {
            "displayName": "Sigelei 100W",
            "description": "Regulowany profil urządzenia waporyzującego dla Sigelei 100W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Sigelei 100W."
        },
        "preset-207":  {
            "displayName": "Sigelei Mini",
            "description": "Regulowany profil urządzenia waporyzującego dla Sigelei Mini.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Sigelei Mini."
        },
        "preset-208":  {
            "displayName": "SvoëMesto Semovar",
            "description": "Regulowany profil urządzenia waporyzującego dla SvoëMesto Semovar.",
            "summary": "Regulowany profil urządzenia waporyzującego dla SvoëMesto Semovar."
        },
        "preset-209":  {
            "displayName": "Vapor Flask v1/v2 DNA 30",
            "description": "Regulowany profil urządzenia do waporyzacji dla Vapor Flask v1/v2 DNA 30.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Vapor Flask v1/v2 DNA 30."
        },
        "preset-210":  {
            "displayName": "Vapor Flask v2 DNA 40",
            "description": "Regulowany profil urządzenia waporyzującego dla Vapor Flask v2 DNA 40.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Vapor Flask v2 DNA 40."
        },
        "preset-211":  {
            "displayName": "Vapor Shark DNA",
            "description": "Regulowany profil urządzenia waporyzującego dla Vapor Shark DNA.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Vapor Shark DNA."
        },
        "preset-212":  {
            "displayName": "Vapor Shark DNA/rDNA 30",
            "description": "Regulowany profil urządzenia waporyzującego dla Vapor Shark DNA/rDNA 30.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Vapor Shark DNA/rDNA 30."
        },
        "preset-213":  {
            "displayName": "Vapor Shark rDNA 40",
            "description": "Regulowany profil urządzenia do waporyzacji dla Vapor Shark rDNA 40.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Vapor Shark rDNA 40."
        },
        "preset-214":  {
            "displayName": "Geekvape Aegis Legend 5",
            "description": "Regulowany profil urządzenia waporyzującego dla Geekvape Aegis Legend 5.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Geekvape Aegis Legend 5."
        },
        "preset-215":  {
            "displayName": "Evolv DNA60C",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA60C.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA60C."
        },
        "preset-216":  {
            "displayName": "Evolv DNA100C",
            "description": "Regulowany profil urządzenia do waporyzacji dla Evolv DNA100C.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Evolv DNA100C."
        },
        "preset-217":  {
            "displayName": "Evolv DNA250C (2S)",
            "description": "Regulowany profil urządzenia do waporyzacji dla Evolv DNA250C (2S).",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Evolv DNA250C (2S)."
        },
        "preset-218":  {
            "displayName": "Evolv DNA250C (3S, US firmware)",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA250C (3S, US firmware).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA250C (3S, US firmware)."
        },
        "preset-219":  {
            "displayName": "Evolv DNA250C (3S, international firmware)",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA250C (3S, international firmware).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA250C (3S, international firmware)."
        },
        "preset-220":  {
            "displayName": "Evolv DNA250C (4S)",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA250C (4S).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA250C (4S)."
        },
        "preset-221":  {
            "displayName": "VOOPOO DRAG 6",
            "description": "Regulowany profil urządzenia waporyzującego dla VOOPOO DRAG 6.",
            "summary": "Regulowany profil urządzenia waporyzującego dla VOOPOO DRAG 6."
        },
        "preset-222":  {
            "displayName": "YiHi SXmini MQ Class",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SXmini MQ Class.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla YiHi SXmini MQ Class."
        },
        "preset-223":  {
            "displayName": "Evolv DNA80C",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA80C.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA80C."
        },
        "preset-224":  {
            "displayName": "Evolv DNA75C",
            "description": "Regulowany profil urządzenia waporyzującego dla Evolv DNA75C.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Evolv DNA75C."
        },
        "preset-225":  {
            "displayName": "YiHi SX600H",
            "description": "Regulowany profil urządzenia waporyzującego dla YiHi SX600H.",
            "summary": "Regulowany profil urządzenia waporyzującego dla YiHi SX600H."
        },
        "preset-226":  {
            "displayName": "Craving Vapor HexOhm V3",
            "description": "Regulowany profil urządzenia do waporyzacji dla Craving Vapor HexOhm V3.",
            "summary": "Regulowany profil urządzenia do waporyzacji dla Craving Vapor HexOhm V3."
        },
        "preset-227":  {
            "displayName": "VOOPOO VINCI Spark220",
            "description": "Regulowany profil urządzenia waporyzującego dla VOOPOO VINCI Spark220.",
            "summary": "Regulowany profil urządzenia waporyzującego dla VOOPOO VINCI Spark220."
        },
        "preset-228":  {
            "displayName": "Dovpo x TVC Topside Dual",
            "description": "Regulowany profil urządzenia do waporyzacji dla Dovpo x TVC Topside Dual.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Dovpo x TVC Topside Dual."
        },
        "preset-229":  {
            "displayName": "VOOPOO DRAG 5",
            "description": "Regulowany profil urządzenia waporyzującego dla VOOPOO DRAG 5.",
            "summary": "Regulowany profil urządzenia waporyzującego dla VOOPOO DRAG 5."
        },
        "preset-230":  {
            "displayName": "Geekvape L200 Classic",
            "description": "Regulowany profil urządzenia waporyzującego dla Geekvape L200 Classic.",
            "summary": "Regulowany profil urządzenia waporyzującego dla Geekvape L200 Classic."
        },
        "preset-231":  {
            "displayName": "VAPORESSO ARMOUR MAX",
            "description": "Mod regulowany Dual-21700 z adapterami 18650; VAPORESSO ocenia go na 220 W; testy zmierzyły 208 W, 8,979 V i 39 A.",
            "summary": "Mod regulowany Dual-21700 z adapterami 18650; VAPORESSO ocenia go na 220 W; testy zmierzyły 208 W, 8,979 V i 39 A."
        },
        "preset-232":  {
            "displayName": "Geekvape Aegis Legend 2 (L200)",
            "description": "Regulowany profil urządzenia waporyzującego dla Geekvape Aegis Legend 2 (L200).",
            "summary": "Regulowany profil urządzenia waporyzującego dla Geekvape Aegis Legend 2 (L200)."
        },
        "preset-233":  {
            "displayName": "ProVape ProVari Radius 40 W",
            "description": "Regulowany profil urządzenia waporyzującego dla ProVape ProVari Radius 40 W.",
            "summary": "Regulowany profil urządzenia waporyzującego dla ProVape ProVari Radius 40 W."
        },
        "preset-234":  {
            "displayName": "VAPORESSO GEN MAX",
            "description": "Mod regulowany Dual-18650; VAPORESSO ocenia go na 220 W; testy zmierzyły 215 W, 9,08 V i 37 A.",
            "summary": "Mod regulowany Dual-18650; VAPORESSO ocenia go na 220 W; testy zmierzyły 215 W, 9,08 V i 37 A."
        },
        "preset-235":  {
            "displayName": "VAPORESSO ARMOUR ULTRA",
            "description": "Wbudowany mod regulowany akumulatorem o mocy 100 W; testy zmierzyły 101 W, 29 A i co najmniej 7,97 V.",
            "summary": "Wbudowany mod regulowany akumulatorem o mocy 100 W; testy zmierzyły 101 W, 29 A i co najmniej 7,97 V."
        },
        "preset-236":  {
            "displayName": "Geekvape Aegis Solo 3",
            "description": "Mod regulowany Single-18650 wykorzystujący AS Chip 4.0; profil producenta to 100 W, 7,5 V, 32 A, 0,1–3 Ω.",
            "summary": "Mod regulowany Single-18650 wykorzystujący AS Chip 4.0; profil producenta to 100 W, 7,5 V, 32 A, 0,1–3 Ω."
        },
        "preset-237":  {
            "displayName": "Eleaf iStick Pico 21700",
            "description": "Mod adaptera jednokomórkowego 21700/18650; Eleaf określa 100 W, 9 V, 0,05–3,5 Ω; testy wykazały 30 A.",
            "summary": "Mod adaptera jednokomórkowego 21700/18650; Eleaf określa 100 W, 9 V, 0,05–3,5 Ω; testy wykazały 30 A."
        },
        "preset-238":  {
            "displayName": "Vandy Vape Pulse V2",
            "description": "Jednokomórkowy regulowany mod squonk dla ogniw 21700, 20700 lub dostosowanych ogniw 18650 z konserwatywnym profilem 95 W, 6 V, 34 A.",
            "summary": "Jednokomórkowy regulowany mod squonk dla ogniw 21700, 20700 lub dostosowanych ogniw 18650 z konserwatywnym profilem 95 W, 6 V, 34 A."
        }
    }
} satisfies CatalogPresentationSet;
