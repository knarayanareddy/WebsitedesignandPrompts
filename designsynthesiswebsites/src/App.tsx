import { useEffect, useState } from "react";
import Home from "./Home";
import Geptral from "./sites/geptral";
import Aether from "./sites/aether";
import Nocturne from "./sites/nocturne";
import Forma from "./sites/forma";
import Ember from "./sites/ember";
import Ledgr from "./sites/ledgr";
import { Switcher } from "./shared/ui";
import { SITES } from "./shared/sites";

const PAGES: Record<string, () => React.JSX.Element> = {
  geptral: Geptral,
  aether: Aether,
  nocturne: Nocturne,
  forma: Forma,
  ember: Ember,
  ledgr: Ledgr,
};

function parse() {
  const h = window.location.hash.replace(/^#\/?/, "").split(/[?#]/)[0];
  return h;
}

export default function App() {
  const [route, setRoute] = useState(parse());

  useEffect(() => {
    const onHash = () => {
      setRoute(parse());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const site = SITES.find((s) => s.slug === route);
    document.title = site ? `${site.name} — ${site.domain}` : "Six Worlds — A Cinematic Web Design Collection";
  }, [route]);

  const Page = PAGES[route];
  if (!Page) return <Home />;
  return (
    <>
      <Page key={route} />
      <Switcher current={route} />
    </>
  );
}
