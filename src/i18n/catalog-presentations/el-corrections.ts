import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./el";

type MutableExample = {
    title?: string;
    setup?: string;
    conclusion?: string;
    formulas?: string[];
};

type MutableSection = {
    id: string;
    title?: string;
    paragraphs?: string[];
    bullets?: string[];
    formulas?: Array<{ expression: string }>;
    examples?: MutableExample[];
    table?: { headers: string[]; rows: string[][] };
};

type MutableConcept = {
    displayName?: string;
    description?: string;
    summary?: string;
    sections: MutableSection[];
};

type MutablePresentationSet = {
    concepts: Record<string, MutableConcept>;
};

const corrected = JSON.parse(JSON.stringify(draftPresentations)) as MutablePresentationSet;

const getSection = (conceptId: string, sectionId: string): MutableSection => {
    const section = corrected.concepts[conceptId].sections.find((candidate) => candidate.id === sectionId);
    if (!section) {
        throw new Error("Greek catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (παράλληλοι κλάδοι)";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (σειρά)";
getSection("concept-kirchhoffs-laws", "cells").formulas![1].expression =
    "C_pack = C_1 + C_2 + ... (παράλληλα)";
getSection("concept-trigonometry", "degrees-and-radians").formulas![0].expression =
    "180° = π ακτίνια";

getSection("concept-heat-capacity", "worked-example").title = "Παράδειγμα υπολογισμού";
getSection("concept-heat-capacity", "worked-example").examples![0].title = "Θέρμανση νερού";
getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "Η ιδανική απαιτούμενη ενέργεια είναι 41,8 kJ· ένας πραγματικός θερμαντήρας χρειάζεται περισσότερη λόγω απωλειών.";
getSection("concept-heat-capacity", "basic-relationships").bullets![1] =
    "Το Q είναι η μεταφερόμενη θερμική ενέργεια σε τζάουλ (J).";
getSection("concept-heat-capacity", "object-and-material").paragraphs![0] =
    "Η θερμοχωρητικότητα αφορά ολόκληρο το αντικείμενο και εξαρτάται από την ποσότητα του υλικού. Η ειδική "
    + "θερμοχωρητικότητα είναι ιδιότητα του υλικού. Ο διπλασιασμός της μάζας διπλασιάζει τη θερμοχωρητικότητα για "
    + "το ίδιο υλικό.";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "Ο ιδανικός χρόνος είναι περίπου 7,0 λεπτά· με απόδοση μεταφοράς 80% είναι περίπου 523 δευτερόλεπτα.";

getSection("concept-heat-flux", "worked-example").title = "Παράδειγμα υπολογισμού";
getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "Σε σχέση με μια γωνία θ, η απέναντι πλευρά βρίσκεται στην άλλη πλευρά της γωνίας, η διπλανή πλευρά αγγίζει "
    + "τη γωνία χωρίς να είναι η υποτείνουσα και η υποτείνουσα βρίσκεται απέναντι από την ορθή γωνία. Το "
    + "SOH-CAH-TOA είναι βοήθημα μνήμης: ημίτονο = απέναντι / υποτείνουσα, συνημίτονο = διπλανή / υποτείνουσα "
    + "και εφαπτομένη = απέναντι / διπλανή.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "απέναντι = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "διπλανή = 10 × cos(30°) ≈ 8,66 cm";

getSection("concept-ohms-law", "worked-examples").title = "Παραδείγματα με λύση";
getSection("concept-ohms-law", "unit-conversions").bullets![3] = "1 W = 1.000 mW";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").title =
    "Παράδειγμα υπολογισμού";

getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![0].expression =
    "1 ίντσα = 25,4 mm = 0,0254 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 πόδι = 12 ίντσες = 0,3048 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 γιάρδα = 3 πόδια = 0,9144 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].conclusion =
    "Οι μετατροπές εμβαδού και όγκου χρησιμοποιούν τον συντελεστή μήκους υψωμένο στη σχετική δύναμη.";

getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").paragraphs![0] =
    "Για 1/0, 2/0, 3/0 και 4/0, χρησιμοποιήστε n = 0, -1, -2 και -3. Το AWG καθορίζει το μέγεθος του αγωγού, "
    + "όχι ένα γενικό ασφαλές ρεύμα. Η ικανότητα μεταφοράς ρεύματος εξαρτάται επίσης από το υλικό, τη μόνωση, "
    + "την ψύξη, την εγκατάσταση και τους ισχύοντες ηλεκτρικούς κανόνες.";
getSection("concept-heat-flux", "conduction").title = "Αγωγή μέσω επίπεδου στρώματος";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Ξεχωρίστε τη μέση πυκνότητα θερμικής ροής από μια τοπική μέγιστη τιμή· η θέρμανση μπορεί να είναι ανομοιόμορφη.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "Για αντίσταση με θετικό TCR και σταθερή τάση, η αύξηση της θερμοκρασίας αυξάνει την αντίσταση και τείνει να "
    + "μειώνει το ρεύμα. Σε πηγή σταθερού ρεύματος, η ίδια αύξηση της αντίστασης αυξάνει την ισχύ.";
getSection("concept-ohms-law", "limits").paragraphs![0] =
    "Ο νόμος του Ohm είναι ένα εξιδανικευμένο μοντέλο. Τα πραγματικά εξαρτήματα μπορεί να είναι μη ωμικά: η "
    + "αντίστασή τους μπορεί να αλλάξει με τη θερμοκρασία, την τάση, το ρεύμα, τη συχνότητα ή την κατάσταση λειτουργίας. "
    + "Για κυκλώματα σε σειρά και παράλληλα, χρησιμοποιήστε τους νόμους του Kirchhoff μαζί με τον νόμο του Ohm.";

getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "Το πηνίο μετατρέπει ενέργεια σε θερμότητα με ισχύ 7,2 W, δηλαδή 72 J σε 10 δευτερόλεπτα.";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "Η μεταφορά θερμότητας στον αέρα, στο υγρό και στον εξοπλισμό καθορίζει την πραγματική θερμοκρασία.";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = απέναντι πλευρά / υποτείνουσα";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = διπλανή πλευρά / υποτείνουσα";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = απέναντι πλευρά / διπλανή πλευρά";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(απέναντι πλευρά / υποτείνουσα)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(διπλανή πλευρά / υποτείνουσα)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(απέναντι πλευρά / διπλανή πλευρά)";

getSection("concept-heat-capacity", "basic-relationships").bullets![3] =
    "Μια διαφορά θερμοκρασίας 1 K ισούται με διαφορά 1 °C.";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "Ο ιδανικός χρόνος είναι περίπου 7,0 λεπτά· με απόδοση μεταφοράς 80% είναι περίπου 523 s.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "Κατά την τήξη ή τον βρασμό, η προσφερόμενη ενέργεια μπορεί να αλλάξει τη φάση του υλικού χωρίς να αλλάξει τη "
    + "θερμοκρασία του. Το L είναι η ειδική λανθάνουσα θερμότητα σε J/kg.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![1] =
    "Η απλή εξίσωση υποθέτει ότι η ειδική θερμοχωρητικότητα είναι περίπου σταθερή. Η απώλεια θερμότητας, η "
    + "συναγωγή, η ακτινοβολία, η εξάτμιση, η αντίσταση επαφής και η ανομοιόμορφη θερμοκρασία μπορούν να κάνουν ένα "
    + "πραγματικό αποτέλεσμα να διαφέρει από το ιδανικό.";

corrected.concepts["concept-heat-flux"].description =
    "Η πυκνότητα θερμικής ροής περιγράφει πόσο γρήγορα μεταφέρεται θερμότητα ανά μονάδα επιφάνειας, ανεξάρτητα από "
    + "τη συνολική ποσότητα υλικού που αποθηκεύει θερμότητα.";
corrected.concepts["concept-heat-flux"].summary = "Ο ρυθμός μεταφοράς θερμότητας ανά μονάδα επιφάνειας.";
getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' είναι η πυκνότητα θερμικής ροής σε W/m².";
getSection("concept-heat-flux", "definition").paragraphs![0] =
    "Η πυκνότητα θερμικής ροής διαφέρει από τη θερμοχωρητικότητα: η θερμοχωρητικότητα περιγράφει την αποθηκευμένη "
    + "ενέργεια ανά μεταβολή θερμοκρασίας, ενώ η πυκνότητα θερμικής ροής περιγράφει τον ρυθμό με τον οποίο η θερμότητα "
    + "διασχίζει μια επιφάνεια.";
getSection("concept-heat-flux", "worked-example").title = "Παράδειγμα υπολογισμού";
getSection("concept-heat-flux", "worked-example").examples![0].title =
    "Μέση πυκνότητα θερμικής ροής από θερμαντήρα";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "Η μέση πυκνότητα θερμικής ροής είναι 5.000 W/m² ή 0,5 W/cm².";
getSection("concept-heat-flux", "conduction").bullets![3] =
    "Το σύμβολο μείον υποδεικνύει θερμική ροή από υψηλότερη θερμοκρασία προς χαμηλότερη θερμοκρασία.";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "Η συναγωγή χρησιμοποιεί συντελεστή συναγωγής h. Η ακτινοβολία χρησιμοποιεί τον συντελεστή εκπομπής ε και τη "
    + "σταθερά Stefan–Boltzmann σ. Οι θερμοκρασίες στην εξίσωση ακτινοβολίας πρέπει να είναι απόλυτες θερμοκρασίες σε "
    + "Kelvin.";

const siBaseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siBaseUnits.rows[2][1] = "δευτερόλεπτο";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![3] =
    "Μια σύνδεση σε σειρά παρέχει στο ρεύμα μόνο μία διαδρομή μέσα από τα εξαρτήματα.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").paragraphs![0] =
    "Αυτές οι τιμές είναι ονομαστικές. Οι ανοχές του προϊόντος, οι επικαλύψεις, η μόνωση και η κατασκευή με κλώνους "
    + "μπορούν να αλλάξουν τη μετρούμενη ή τη συνολική διάμετρο.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![3] =
    "Για πολύκλωνους αγωγούς, συμπεριλάβετε την κατασκευή των κλώνων όταν η ευελιξία και η συνολική διάμετρος έχουν "
    + "σημασία.";

getSection("concept-ohms-law", "relationship").bullets![2] =
    "Το R είναι η αντίσταση, μετρημένη σε ωμ (Ω).";
getSection("concept-ohms-law", "worked-examples").examples![0].title =
    "Βρείτε την ένταση του ρεύματος";
getSection("concept-ohms-law", "worked-examples").examples![1].title =
    "Βρείτε την αντίσταση";
getSection("concept-joule-heating", "worked-example").title = "Παράδειγμα υπολογισμού";

getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].title = "Εύρεση μιας πλευράς";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "Μια υποτείνουσα μήκους 10 cm σχηματίζει γωνία 30°.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].conclusion =
    "Χρησιμοποιήστε αντίστροφη τριγωνομετρική συνάρτηση όταν είναι γνωστά τα μήκη των πλευρών.";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![0] =
    "Το A είναι το πλάτος, το f η συχνότητα σε hertz, το t ο χρόνος σε δευτερόλεπτα και το φ η γωνία φάσης.";

getSection("concept-heat-capacity", "electrical-heating").examples![0].setup =
    "Θερμάνετε το παράδειγμα των 41,8 kJ με σταθερή πηγή 100 W χωρίς απώλειες.";
getSection("concept-heat-capacity", "object-and-material").title = "Αντικείμενο και υλικό";
getSection("concept-heat-capacity", "phase-changes-and-limits").title =
    "Αλλαγές φάσης και πρακτικά όρια";

getSection("concept-heat-flux", "worked-example").examples![0].setup =
    "Ένας θερμαντήρας 100 W μεταφέρει θερμότητα μέσω επιφάνειας 0,020 m².";
getSection("concept-heat-flux", "practical-checks").title = "Πρακτικοί έλεγχοι";

getSection("concept-si-system-and-imperial-units", "base-units").title = "Βασικές μονάδες SI";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].formulas![0] =
    "0,1 ίντσα × 25,4 = 2,54 mm";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].formulas![1] =
    "5 mm / 25,4 ≈ 0,19685 ίντσα";
getSection("concept-si-system-and-imperial-units", "other-conversions").paragraphs![0] =
    "Μια λίβρα μπορεί να αναφέρεται σε μάζα (lb) ή δύναμη (lbf), που είναι διαφορετικά μεγέθη. Ομοίως, η ίντσα, η "
    + "τετραγωνική ίντσα και η κυβική ίντσα αναφέρονται σε διαφορετικές διαστάσεις.";

corrected.concepts["concept-wire-gauges-awg-swg-bwg"].description =
    "Ένας αριθμός διαμετρήματος περιγράφει ονομαστική διάσταση μόνο όταν δηλώνεται το σύστημα διαμετρήματος.";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].summary =
    "Γιατί οι αριθμοί διαμετρήματος σύρματος απαιτούν ονομασμένο σύστημα και δηλωμένη διάμετρο.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").title =
    "Συστήματα μέτρησης διαμέτρου";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").title =
    "Διαμέτρημα, εμβαδόν και αντίσταση";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").formulas![0].expression =
    "R = ρ × L / A";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").title =
    "Πρακτική προδιαγραφή";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![0] =
    "Αναφέρετε το σύστημα, για παράδειγμα 24 AWG ή 24 British SWG.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Προσδιορίστε την ικανότητα μεταφοράς ρεύματος από τα στοιχεία του προϊόντος και τους ηλεκτρικούς κανονισμούς, "
    + "όχι μόνο από τον αριθμό διαμετρήματος.";

getSection("concept-ohms-law", "relationship").bullets![0] =
    "Το V είναι η τάση, μετρημένη σε volt (V).";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "Ο νόμος του Ohm συνδυάζεται με τη σχέση ισχύος P = V × I. Η ισχύς P μετριέται σε watt (W). Για πηγή 4,2 V "
    + "και φορτίο 1,0 Ω, η ιδανική ισχύς είναι 17,64 W. Το εξάρτημα χρειάζεται επαρκή θερμοχωρητικότητα και περιθώριο "
    + "ασφαλείας για να απομακρύνει με ασφάλεια τη θερμότητα που παράγεται.";

getSection("concept-joule-heating", "what-affects-heating").bullets![0] =
    "Σε σταθερή αντίσταση, ο διπλασιασμός του ρεύματος τετραπλασιάζει τη θερμική ισχύ.";
getSection("concept-joule-heating", "what-affects-heating").bullets![1] =
    "Σε σταθερό ρεύμα, ο διπλασιασμός της αντίστασης διπλασιάζει τη θερμική ισχύ.";
getSection("concept-joule-heating", "what-affects-heating").bullets![2] =
    "Σε σταθερή τάση, η μείωση της αντίστασης αυξάνει τη θερμική ισχύ.";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "Η ηλεκτρική ισχύς είναι ρυθμός μεταφοράς ενέργειας, όχι θερμοκρασία. Η θερμοχωρητικότητα και η πυκνότητα θερμικής "
    + "ροής καθορίζουν πώς η ενέργεια μεταβάλλει τη θερμοκρασία και πόσο γρήγορα απομακρύνεται από την επιφάνεια.";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Ελέγξτε ότι τα εξαρτήματα, οι συνδέσεις και η μόνωση αντέχουν το αναμενόμενο ρεύμα και την ισχύ. Αφήστε επαρκές "
    + "περιθώριο ασφαλείας, επειδή τα πραγματικά εξαρτήματα μπορεί να θερμαίνονται ανομοιόμορφα και η αντίστασή τους "
    + "μπορεί να μεταβάλλεται με τη θερμοκρασία. Οι μπαταρίες και τα τροφοδοτικά έχουν επίσης όρια συνεχούς ρεύματος.";

getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![0] =
    "Ένας κόμβος είναι σύνολο αγωγών που συνδέονται χωρίς ενδιάμεσο εξάρτημα.";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "Οι κυψέλες σε σειρά προσθέτουν τάση, ενώ η χωρητικότητα σε αμπέρ-ώρες παραμένει περίπου ίση με εκείνη μίας κυψέλης.";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "Οι παράλληλες κυψέλες διατηρούν την ίδια τάση, ενώ η χωρητικότητα και το διαθέσιμο ρεύμα αθροίζονται περίπου.";
getSection("concept-kirchhoffs-laws", "cells").bullets![2] =
    "Η κατανομή του ρεύματος εξαρτάται από την εσωτερική αντίσταση, τις επαφές, την καλωδίωση και τους διακόπτες.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").title = "Ανάλυση πραγματικών κυκλωμάτων";

getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "Το TCR του κατασκευαστή ισχύει συνήθως για ένα δηλωμένο εύρος θερμοκρασίας και αντίστασης. Οι θερμοκρασιακές "
    + "κλίσεις, οι αλλαγές υλικού, οι επαφές, η μηχανική καταπόνηση και η αυτοθέρμανση μπορούν να κάνουν ένα πραγματικό "
    + "αποτέλεσμα να διαφέρει από την εκτίμηση πρώτης τάξης.";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![3] =
    "Οι θερμοκρασίες πρέπει να χρησιμοποιούν την ίδια κλίμακα και τις ίδιες μονάδες για τη διαφορά T - T_0.";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![1] =
    "Η γωνιακή συχνότητα ω εκφράζεται σε ακτίνια ανά δευτερόλεπτο.";

getSection("concept-heat-capacity", "electrical-heating").title = "Ηλεκτρική θέρμανση";
getSection("concept-heat-flux", "practical-checks").bullets![0] =
    "Μετατρέψτε το εμβαδόν σε m² πριν χρησιμοποιήσετε το W/m².";
getSection("concept-heat-flux", "practical-checks").bullets![2] =
    "Συμπεριλάβετε την αντίσταση επαφής, τη συναγωγή, την ακτινοβολία και τις απώλειες θερμότητας όταν χρειάζεται.";
getSection("concept-heat-flux", "conduction").bullets![0] =
    "k είναι η θερμική αγωγιμότητα σε W/(m·K).";
getSection("concept-heat-flux", "conduction").bullets![1] =
    "ΔT είναι η διαφορά θερμοκρασίας μεταξύ των δύο πλευρών του στρώματος.";

siBaseUnits.rows[3][1] = "κέλβιν";
getSection("concept-si-system-and-imperial-units", "other-conversions").bullets![0] =
    "1 lb ≈ 0,45359237 kg.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![1] =
    "Συμπεριλάβετε την ονομαστική διάμετρο σε χιλιοστά όταν τα συστήματα ενδέχεται να συγχέονται.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![2] =
    "Δηλώστε εάν η διάσταση αφορά γυμνό αγωγό, μονωμένη διάμετρο, πάχος φύλλου ή πάχος τοιχώματος σωλήνα.";
getSection("concept-heat-flux", "conduction").bullets![2] =
    "Το L είναι το πάχος του στρώματος, σε μέτρα.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Οι νόμοι ρεύματος και τάσης του Kirchhoff περιγράφουν τη διατήρηση φορτίου στους κόμβους και ενέργειας στους " +
    "κλειστούς βρόχους.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8,0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Ο θερμοκρασιακός συντελεστής της αντίστασης περιγράφει πώς μεταβάλλεται η αντίσταση ενός εξαρτήματος με τη " +
    "θερμοκρασία.";
corrected.concepts["concept-heat-flux"].displayName = "Πυκνότητα θερμικής ροής";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Καθορίστε την ικανότητα μεταφοράς ρεύματος από τα δεδομένα του προϊόντος και τους ηλεκτρικούς κανονισμούς, όχι " +
    "μόνο από τον αριθμό gauge.";

getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "Η ηλεκτρική ισχύς είναι ρυθμός μεταφοράς ενέργειας, όχι θερμοκρασία. Η θερμοχωρητικότητα και η πυκνότητα θερμικής " +
    "ροής καθορίζουν πώς αυτή η ενέργεια μεταβάλλει τη θερμοκρασία και πόσο γρήγορα απομακρύνεται από την επιφάνεια.";
getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "Σε σχέση με μια γωνία θ, η απέναντι πλευρά βρίσκεται απέναντι από τη γωνία, η παρακείμενη πλευρά αγγίζει τη γωνία " +
    "χωρίς να είναι η υποτείνουσα και η υποτείνουσα βρίσκεται απέναντι από την ορθή γωνία. Το SOH-CAH-TOA είναι " +
    "βοήθημα μνήμης: το ημίτονο είναι η απέναντι πλευρά προς την υποτείνουσα, το συνημίτονο η παρακείμενη πλευρά " +
    "προς την υποτείνουσα και η εφαπτομένη η απέναντι πλευρά προς την παρακείμενη.";
getSection("concept-trigonometry", "right-triangles").formulas = [
    { expression: "sin(θ) = απέναντι πλευρά / υποτείνουσα" },
    { expression: "cos(θ) = παρακείμενη πλευρά / υποτείνουσα" },
    { expression: "tan(θ) = απέναντι πλευρά / παρακείμενη πλευρά" }
];
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "απέναντι πλευρά = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "παρακείμενη πλευρά = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas = [
    { expression: "θ = sin^-1(απέναντι πλευρά / υποτείνουσα)" },
    { expression: "θ = cos^-1(παρακείμενη πλευρά / υποτείνουσα)" },
    { expression: "θ = tan^-1(απέναντι πλευρά / παρακείμενη πλευρά)" }
];
getSection("concept-trigonometry", "degrees-and-radians").formulas![0].expression = "180° = π ακτίνια";
getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "Η ιδανική ενεργειακή απαίτηση είναι 41,8 kJ. Μια πραγματική θερμάστρα χρειάζεται περισσότερα λόγω απωλειών.";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "Ο ιδανικός χρόνος είναι περίπου 7,0 λεπτά. Με απόδοση μεταφοράς 80% είναι περίπου 523 δευτερόλεπτα.";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![0].expression =
    "1 ίντσα = 25,4 mm = 0,0254 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 πόδι = 12 ίντσες = 0,3048 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 γιάρδα = 3 πόδια = 0,9144 m";

export const presentations = corrected as unknown as CatalogPresentationSet;
