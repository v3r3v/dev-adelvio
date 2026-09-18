"use client";
import {useEffect,useRef,useState} from "react";
import {Brand} from "./Brand";
import {ThemeToggle} from "./ThemeToggle";
import {Icon} from "./Icon";
import {useLanguage} from "../i18n/LanguageProvider";
import {useSiteLinks} from "./siteLinks";
import {advanceHeader,type HeaderScroll} from "./headerScroll";

export function SiteHeader({assetBase,page="home"}: {assetBase:string;page?:"home"|"contact"|"project"}) {
  const {language,setLanguage,t}=useLanguage();
  const routes=useSiteLinks(assetBase);
  const [open,setOpen]=useState(false);
  const [collapsed,setCollapsed]=useState(false);
  const header=useRef<HTMLElement>(null), panel=useRef<HTMLElement>(null), topbar=useRef<HTMLDivElement>(null), brand=useRef<HTMLButtonElement>(null);
  const openRef=useRef(false);
  const changeOpen=(value:boolean,returnFocus=false)=>{openRef.current=value;setOpen(value);if(returnFocus)brand.current?.focus({preventScroll:true});};
  const hidden=open||collapsed;
  const links=[[routes.work,"The work"],[routes.contact,"Contact"],[routes.project,"Your project"]] as const;
  useEffect(()=>{
    const el=header.current;if(!el)return;
    let frame=0,maximum=1,keyboard=false;
    let motion:HeaderScroll={y:Math.max(0,scrollY),travel:0,hidden:false};
    const update=()=>{
      frame=0;
      el.dataset.floating=String(scrollY>32);
      if(openRef.current||(keyboard&&topbar.current?.contains(document.activeElement))){motion={...motion,y:scrollY,travel:0};return;}
      motion=advanceHeader(motion,scrollY,maximum);setCollapsed(motion.hidden);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    const measure=()=>{
      const edge=innerWidth<=620?16:26;
      const origin=innerWidth<=620?16:parseFloat(getComputedStyle(el).left)-el.offsetWidth/2;
      el.style.setProperty("--dock-x",`${edge-origin}px`);
      maximum=Math.max(0,document.documentElement.scrollHeight-innerHeight);schedule();
      panel.current?.style.setProperty("--menu-page-y",`${scrollY}px`);
    };
    const pointer=(event:PointerEvent)=>{
      keyboard=false;
      if(topbar.current?.contains(event.target as Node)){motion={...motion,hidden:false,travel:0};setCollapsed(false);}
      if(openRef.current&&!panel.current?.contains(event.target as Node)&&!brand.current?.contains(event.target as Node)){openRef.current=false;setOpen(false);}
    };
    const key=(event:KeyboardEvent)=>{
      keyboard=true;
      if(event.key==="Escape"&&openRef.current){openRef.current=false;setOpen(false);brand.current?.focus({preventScroll:true});}
    };
    const resize=new ResizeObserver(measure);resize.observe(document.body);
    window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",measure);
    document.addEventListener("pointerdown",pointer,true);document.addEventListener("keydown",key);
    measure();
    return()=>{cancelAnimationFrame(frame);resize.disconnect();window.removeEventListener("scroll",schedule);window.removeEventListener("resize",measure);document.removeEventListener("pointerdown",pointer,true);document.removeEventListener("keydown",key);};
  },[]);
  useEffect(()=>{
    if(!open)return;
    panel.current?.style.setProperty("--menu-page-y",`${scrollY}px`);
    const frame=requestAnimationFrame(()=>panel.current?.querySelector<HTMLAnchorElement>(".ap-links a")?.focus({preventScroll:true}));
    return()=>cancelAnimationFrame(frame);
  },[open]);
  const tools=<><ThemeToggle/><button type="button" className="ap-language" lang={language==="es"?"en":"es"} aria-label={language==="es"?"Switch to English":"Cambiar a español"} onClick={()=>setLanguage(language==="es"?"en":"es")}>{language==="es"?"EN":"ES"}</button></>;
  return <>
    <header ref={header} className="aperture-header" data-collapsed={hidden} data-open={open} data-home={page==="home"} aria-label="Adelvio">
      <button ref={brand} type="button" className="ap-brand" aria-label={t(open?"Close navigation":"Open navigation")} aria-expanded={open} aria-controls="aperture-menu" onClick={()=>changeOpen(!open)}><Brand assetBase={assetBase}/></button>
      <div className="ap-topbar" ref={topbar} inert={hidden}>
        <nav className="ap-desktop" aria-label={t("Main navigation")}><a href={routes.work}>{t("The work")}</a><a href={routes.contact} aria-current={page==="contact"?"page":undefined}>{t("Contact")}</a><a className="ap-project" href={routes.project} aria-current={page==="project"?"page":undefined}>{t("Start a project")} <Icon/></a></nav>
        <div className="ap-tools">{tools}</div>
      </div>
    </header>
    <nav id="aperture-menu" ref={panel} className="ap-panel" data-open={open} inert={!open} aria-label={t("Expanded navigation")} onBlur={event=>{const next=event.relatedTarget;if(next instanceof Node&&!event.currentTarget.contains(next)&&!brand.current?.contains(next))changeOpen(false);}}
      onKeyDown={event=>{const items=[...event.currentTarget.querySelectorAll<HTMLAnchorElement>(".ap-links a")];const index=items.indexOf(document.activeElement as HTMLAnchorElement);if(index<0)return;const next=event.key==="ArrowDown"?(index+1)%3:event.key==="ArrowUp"?(index+2)%3:event.key==="Home"?0:event.key==="End"?2:null;if(next!==null){event.preventDefault();items[next].focus({preventScroll:innerHeight>300});}}}>
      <div className="ap-panel-top"><span>{t("Where shall we go?")}</span><button type="button" className="ap-close" aria-label={t("Close navigation")} onClick={()=>changeOpen(false,true)}><Icon name="close"/></button></div>
      <div className="ap-links">{links.map(([href,label],i)=><a key={label} href={href} onClick={()=>changeOpen(false)} aria-current={i===1&&page==="contact"||i===2&&page==="project"?"page":undefined}><span>{t(label)}</span><Icon/></a>)}</div>
      <div className="ap-panel-bottom"><a href={routes.home} onClick={()=>changeOpen(false)} aria-label={t("Adelvio, home")}>Adelvio / Puerto Rico</a><div className="ap-tools">{tools}</div></div>
    </nav>
  </>;
}
