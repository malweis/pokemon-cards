import Link from "next/link"
import { Boton } from "@/components/Boton"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { CardComponent
 } from "@/components/CardComponent"
export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
      <CardComponent pokemonName="charmander"/>
      </div>
      <div className="flex gap-4">
      <Boton text="Agregar Pokemon"  className={buttonVariants()}  />
       
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div>
    </section>
  )
}
