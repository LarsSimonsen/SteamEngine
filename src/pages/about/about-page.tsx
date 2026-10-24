import type { ReactElement } from "react";
import "../../shared/styles/foundation.css";
import { SiteLayout } from "../../shared/ui/site-layout";
import "./about.css";

export const AboutPage = (): ReactElement => (
    <SiteLayout basePath="./" currentRoute="about" rootHref=".">
        <main id="main" className="page-content about-page">
            <header className="about-page__header">
                <p className="eyebrow">Steam Engine</p>
                <h1>About</h1>
                <p>
                    A collection of free, browser-based calculators for rebuilding and DIY
                    vaping.
                </p>
            </header>
            <div className="about-page__grid">
                <section className="about-card" aria-labelledby="about-story">
                    <h2 id="about-story">
                        About <small>Steam Engine</small>
                    </h2>
                    <p>
                        In <time dateTime="2014-02">February 2014</time>, I got into
                        rebuilding. I searched for an online coil wrapping calculator, but
                        all I could find was spreadsheets and Ohm's law calculators. So I
                        created this site.
                    </p>
                    <p>
                        The tool was initially called <em>vape calc</em> due to a lack of
                        imagination. Within the first month, the name was changed to{" "}
                        <em>Steam Engine</em>.
                    </p>
                    <h3>
                        Author <small>of bugs and glitches</small>
                    </h3>
                    <p>
                        Steam Engine is built and stoked by a Norwegian vaping code monkey.
                    </p>
                    <p>Thanks to Ben Davis for designing the logo.</p>
                </section>
                <section className="about-card" aria-labelledby="about-links">
                    <h2 id="about-links">
                        Links <small>inbound and outbound</small>
                    </h2>
                    <p>
                        Feel free to link to Steam Engine from your own website. I would
                        prefer that you link to the main page,
                        <a href="https://www.steam-engine.org">
                            <code>https://www.steam-engine.org</code>
                        </a>
                        , but you can link wherever you like.
                    </p>
                    <h3>Translations</h3>
                    <p>
                        The calculators and the catalog are available in several languages;
                        choose yours from the language menu. This page is in English only.
                        The calculators are designed to work as ordinary web pages without
                        requiring an account.
                    </p>
                </section>
                <section className="about-card" aria-labelledby="about-source">
                    <h2 id="about-source">
                        Source code <small>open, mostly</small>
                    </h2>
                    <p>
                        The website itself, its translations and the catalog data are
                        published on GitHub at{" "}
                        <a href="https://github.com/LarsSimonsen/SteamEngine">
                            <code>github.com/LarsSimonsen/SteamEngine</code>
                        </a>
                        . The calculations are done by a separate service that is not
                        open source and is not part of that repository.
                    </p>
                    <p>
                        Found a bug, a wrong value in the catalog or an awkward translation?{" "}
                        <a href="https://github.com/LarsSimonsen/SteamEngine/issues/new/choose">
                            Open an issue on GitHub
                        </a>
                        . Translation fixes and code contributions are welcome as pull requests;
                        see the{" "}
                        <a href="https://github.com/LarsSimonsen/SteamEngine/blob/master/CONTRIBUTING.md">
                            contribution guide
                        </a>
                        .
                    </p>
                </section>
                <section className="about-card" aria-labelledby="about-safety">
                    <h2 id="about-safety">
                        Safety <small>please vape responsibly</small>
                    </h2>
                    <p>
                        There are dangers associated with lithium-ion batteries and
                        nicotine. Inform yourself about battery and nicotine safety before
                        you begin rebuilding or DIY mixing.
                    </p>
                    <p>
                        After you make a coil, always measure its resistance before use. Be
                        conscious of your batteries' limitations and double-check
                        calculations using different tools.
                    </p>
                    <p>
                        Concentrated nicotine can be lethal. Take the necessary precautions,
                        and check your calculations carefully.
                    </p>
                    <p>
                        Inform yourself about the health effects of any flavoring agents you
                        use. Something being safe to eat does not mean it is safe to inhale.
                    </p>
                </section>
                <section
                    className="about-card about-card--small"
                    aria-labelledby="about-disclaimer"
                >
                    <h2 id="about-disclaimer">
                        Disclaimer <small>it wasn't me</small>
                    </h2>
                    <p>
                        While I make every effort to deliver high-quality calculators, I do
                        not guarantee that they are free from defects. The calculators are
                        provided “as is,” and you use them at your own risk.
                    </p>
                    <p>
                        I make no warranties as to accuracy, sanity, fitness for a
                        particular purpose, or any other warranties, whether expressed or
                        implied. No communication or information provided by me shall create
                        a warranty.
                    </p>
                    <p>
                        Under no circumstances shall I be liable for direct, indirect,
                        special, incidental, or consequential damages resulting from use,
                        misuse, or inability to use these calculators.
                    </p>
                    <h3>
                        More legalese <small>the fine print</small>
                    </h3>
                    <p>
                        Copyright © 2014–2026 Lars Simonsen. The website code and translations are
                        licensed under the{" "}
                        <a href="https://github.com/LarsSimonsen/SteamEngine/blob/master/LICENSE">
                            MIT License
                        </a>
                        , and the catalog data under{" "}
                        <a href="https://github.com/LarsSimonsen/SteamEngine/blob/master/DATA-LICENSE.md">
                            CC BY 4.0
                        </a>
                        . The calculation service and the Steam Engine name and logo are not
                        covered by these licences.
                    </p>
                </section>
            </div>
        </main>
    </SiteLayout>
);
