/* eslint-disable @next/next/no-img-element -- Original supplied brand asset, shared by static builds. */
/** Preserve the supplied symbol; the wordmark stays crisp at every size. */
export function Brand({ assetBase }: { assetBase: string }) {
  return <span className="brand-lockup"><img src={assetBase + "adelvio-new-logo.png"} alt="" width={48} height={48} decoding="async" /><span>adelvio</span></span>;
}
