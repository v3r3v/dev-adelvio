"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { Icon } from "./Icon";
import { useSiteLinks } from "./siteLinks";
import { useReducedMotion } from "./useReducedMotion";

type Direction = "web" | "shop" | "design";
const directions: Direction[] = ["web", "shop", "design"];
const services = [
  {name:"Web development",first:"A website",second:"that does more.",description:"A presence made for your business, designed for the people who visit it."},
  {name:"Web design",first:"Make it feel",second:"like you.",description:"Hierarchy, composition and identity. An experience that gives your business character."},
  {name:"Domains",first:"Your place",second:"on the internet.",description:"Your own domain, connected to your website. A clear address where people can find you."},
  {name:"Maintenance",first:"Ready for",second:"what comes next.",description:"Ongoing care, adjustments and updates. A presence that keeps pace with your business."},
  {name:"Shopify",first:"From discovery",second:"to purchase.",description:"A Shopify store that presents your products with intention and makes shopping easier."},
] as const;

function ConceptPreview({kind}: {kind: Direction}) {
  const {t} = useLanguage();
  if (kind === "web") return <div className="fh-mini fh-web-mini" aria-hidden="true"><div className="fh-mini-top"><b>ESTUDIO / FORMA</b><span>{t("Spaces to live in")}</span></div><div className="fh-mini-body"><div><small>{t("Architecture & interiors")}</small><h3>{t("Live")}<br/><i>{t("better.")}</i></h3><span className="fh-mini-action">{t("Explore spaces")} <Icon/></span></div><div className="fh-architecture"><span/><span/><span/></div></div><div className="fh-mini-bottom">{t("Light. Material. Space.")}<span>{t("Interface concept")}</span></div></div>;
  if (kind === "shop") return <div className="fh-mini fh-shop-mini" aria-hidden="true"><div className="fh-mini-top"><b>OBJETO.</b><span>{t("Design for every day")}</span></div><div className="fh-shop-body"><div className="fh-vase"><span/></div><div><small>{t("Studio collection")}</small><h3>{t("Fewer things.")}<br/><i>{t("More intention.")}</i></h3><span className="fh-mini-action">{t("View collection")} <Icon/></span></div></div><div className="fh-mini-bottom">{t("Objects that stay.")}<span>{t("Store concept")}</span></div></div>;
  return <div className="fh-mini fh-design-mini" aria-hidden="true"><div className="fh-mini-top"><b>OTRO / RITMO</b><span>{t("A moment for you")}</span></div><div className="fh-design-body"><h3>{t("Make space")}<br/>{t("to")} <i>{t("feel.")}</i></h3><div className="fh-petal-art"><span/><span/><span/></div></div><div className="fh-mini-bottom">{t("An experience with character.")}<span>{t("Visual concept")}</span></div></div>;
}

export function FusionHome({assetBase}: {assetBase: string}) {
  const {t} = useLanguage();
  const links = useSiteLinks(assetBase);
  const reduced = useReducedMotion();
  const [selected,setSelected] = useState(0);
  const [rotation,setRotation] = useState(0);
  const [work,setWork] = useState<Direction>("web");
  const [reelIndex,setReelIndex] = useState(0);
  const reel = useRef<HTMLDivElement>(null);
  const selectedRef = useRef(0);
  const drag = useRef<{x:number;y:number}|null>(null);
  const service = services[selected];
  function selectService(index:number) {
    const next = (index + services.length) % services.length;
    let delta = next - selectedRef.current;
    if (delta > 2) delta -= services.length;
    if (delta < -2) delta += services.length;
    selectedRef.current = next; setSelected(next); setRotation(value => value - delta*72);
  }
  useEffect(() => {
    const el = reel.current;
    if (!el) return;
    let frame = 0;
    let pointer: {id:number;x:number;start:number}|null = null;
    const sync = () => {
      frame = 0;
      const left = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft);
      const slides = [...el.children] as HTMLElement[];
      const distances = slides.map(slide => Math.abs(slide.getBoundingClientRect().left-left));
      setReelIndex(distances.indexOf(Math.min(...distances)));
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(sync); };
    const down = (event:PointerEvent) => {
      if(event.pointerType!=="mouse" || event.button!==0) return;
      pointer = {id:event.pointerId,x:event.clientX,start:el.scrollLeft}; el.setPointerCapture(event.pointerId);
    };
    const move = (event:PointerEvent) => {
      if(!pointer || pointer.id!==event.pointerId) return;
      const delta = event.clientX-pointer.x;
      if(Math.abs(delta)>5) el.dataset.dragging="true";
      if(el.dataset.dragging==="true") el.scrollLeft=pointer.start-delta;
    };
    const release = () => { pointer=null; delete el.dataset.dragging; };
    el.addEventListener("scroll",scroll,{passive:true}); el.addEventListener("pointerdown",down); el.addEventListener("pointermove",move);
    el.addEventListener("pointerup",release); el.addEventListener("pointercancel",release); el.addEventListener("lostpointercapture",release);
    const observer = new ResizeObserver(scroll); observer.observe(el); sync();
    return () => { cancelAnimationFrame(frame);observer.disconnect();el.removeEventListener("scroll",scroll);el.removeEventListener("pointerdown",down);el.removeEventListener("pointermove",move);el.removeEventListener("pointerup",release);el.removeEventListener("pointercancel",release);el.removeEventListener("lostpointercapture",release); };
  },[]);
  function moveReel(step:number) {
    const el = reel.current; if(!el) return;
    const next = Math.max(0,Math.min(2,reelIndex+step));
    const slide = el.children[next] as HTMLElement;
    const left = el.scrollLeft+slide.getBoundingClientRect().left-el.getBoundingClientRect().left-parseFloat(getComputedStyle(el).paddingLeft);
    el.scrollTo({left,behavior:reduced?"instant":"smooth"});
  }
  const captions = [t("An editorial presence"),t("A store with intention"),t("An identity you can feel")];
  return <div className="fusion-home" data-reduced={reduced}>
    <section className="fh-sequence-hero">
      <div className="fh-sequence-heading"><h1>{t("Digital.")}<br/><i>{t("A different perspective.")}</i></h1><div><p>{t("Websites and experiences")}<br/>{t("that invite you to stay.")}</p><a className="fh-text-link" href="#reel">{t("Explore the ideas")} <Icon name="arrow-down"/></a></div></div>
      <div className="fh-hero-reel" id="reel" ref={reel} role="region" aria-roledescription={t("Carousel")} aria-label={t("Visual concepts")} tabIndex={0} onKeyDown={event=>{if(event.key==="ArrowLeft"||event.key==="ArrowRight"){event.preventDefault();moveReel(event.key==="ArrowRight"?1:-1);}}}>
        {directions.map((kind,i)=><article className="fh-reel-slide" key={kind} aria-label={`${i+1} / 3: ${captions[i]}`}><ConceptPreview kind={kind}/><div className="fh-reel-caption"><span>{captions[i]}</span><span>{t("Interface concept")}</span></div></article>)}
      </div>
      <div className="fh-reel-bottom"><div className="fh-reel-track" aria-hidden="true" style={{"--reel-index":reelIndex} as CSSProperties}><span/></div><p>{t("Different expressions. The same care.")}</p><div className="fh-reel-controls"><button type="button" disabled={reelIndex===0} aria-label={t("Previous concept")} onClick={()=>moveReel(-1)}><Icon name="chevron-left"/></button><span className="fh-reel-position" aria-live="polite">0{reelIndex+1} / 03</span><button type="button" disabled={reelIndex===2} aria-label={t("Next concept")} onClick={()=>moveReel(1)}><Icon name="chevron-right"/></button></div></div>
      <a className="fh-section-seam" href="#services">{t("What we can create")} <Icon name="arrow-down"/></a>
    </section>
    <section id="services" className="fh-wheel-section" aria-label={t("Explore our services")}>
      <div className="fh-wheel-layout"><div className="fh-service-copy"><span className="fh-service-count">0{selected+1} / 05</span><div aria-live="polite" aria-atomic="true"><h2 key={selected} className="fh-service-title">{t(service.first)}<br/>{t(service.second)}</h2><p className="fh-service-description">{t(service.description)}</p></div><a className="fh-text-link" href={links.project}>{t("Tell us about your idea")} <Icon/></a></div>
      <div className="fh-wheel-stage" role="group" aria-label={t("Service wheel. Use left and right arrows, or swipe.")} tabIndex={0} onKeyDown={event=>{if(["ArrowLeft","ArrowRight","Home","End"].includes(event.key)){event.preventDefault();selectService(event.key==="Home"?0:event.key==="End"?4:selectedRef.current+(event.key==="ArrowRight"?1:-1));}}}
        onPointerDown={event=>{drag.current={x:event.clientX,y:event.clientY};event.currentTarget.setPointerCapture(event.pointerId);}} onPointerCancel={()=>drag.current=null} onPointerUp={event=>{if(!drag.current)return;const dx=event.clientX-drag.current.x,dy=event.clientY-drag.current.y;drag.current=null;if(Math.abs(dx)>35&&Math.abs(dx)>Math.abs(dy))selectService(selectedRef.current+(dx<0?1:-1));}}>
        <div className="fh-wheel-rotor" aria-hidden="true" style={{"--rotation":`${rotation}deg`} as CSSProperties}>{services.map((s,i)=><div className="fh-wheel-spoke" key={s.name} data-active={i===selected} style={{"--i":i} as CSSProperties}><span>{t(s.name)}</span></div>)}<div className="fh-wheel-hub">adelvio<span>{t("Ideas in motion")}</span></div></div><div className="fh-wheel-pointer" aria-hidden="true"/><span className="fh-wheel-hint">{t("Drag. Find your direction.")}</span>
      </div></div>
      <div className="fh-wheel-bottom"><div className="fh-service-tabs" role="group" aria-label={t("Choose a service")}>{services.map((s,i)=><button type="button" key={s.name} aria-pressed={i===selected} onClick={()=>selectService(i)}>{t(s.name)}</button>)}</div><div className="fh-carousel-controls"><button type="button" aria-label={t("Previous service")} onClick={()=>selectService(selectedRef.current-1)}><Icon name="chevron-left"/></button><button type="button" aria-label={t("Next service")} onClick={()=>selectService(selectedRef.current+1)}><Icon name="chevron-right"/></button></div></div>
    </section>
    <section className="fh-work-section" id="work" aria-labelledby="fusion-work-title"><div className="fh-work-intro"><h2 id="fusion-work-title">{t("Not just seen.")}<br/><i>{t("Experienced.")}</i></h2><p>{t("Choose a visual direction.")}<br/>{t("The same attention to detail.")}</p><div className="fh-work-switch" role="group" aria-label={t("Visual direction")}>{directions.map((kind,i)=><button type="button" key={kind} aria-pressed={work===kind} onClick={()=>setWork(kind)}>{t(["Editorial","Commerce","Expressive"][i])}</button>)}</div></div>
      <div className="fh-work-stage"><div className="fh-work-orbit" aria-hidden="true"/><div className="fh-work-preview"><ConceptPreview key={work} kind={work}/></div><div className="fh-responsive-preview" aria-hidden="true" data-version={work}><div className="fh-phone-speaker"/><span className="fh-phone-brand">{work==="web"?"FORMA /":work==="shop"?"OBJETO.":"OTRO / RITMO"}</span><h3>{t(work==="web"?"Live":work==="shop"?"Fewer things.":"Make space")}<br/><i>{t(work==="web"?"better.":work==="shop"?"More intention.":"to feel.")}</i></h3><div className="fh-phone-art"><span/><span/><span/></div><span className="fh-phone-action">{t(work==="shop"?"View collection":work==="design"?"Discover":"Explore spaces")} <Icon/></span></div><span className="fh-concept-note">{t("Original design concepts, not completed client projects.")}</span></div>
    </section>
    <section className="fh-closing"><h2>{t("Your idea deserves")}<br/><i>{t("a space of its own.")}</i></h2><p>{t("A website, a store, a new way to present your business.")}</p><a className="fh-big-link" href={links.project}>{t("Give it shape")} <Icon/></a></section>
  </div>;
}
export { services as fusionServices };
